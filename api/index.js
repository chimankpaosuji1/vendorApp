const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://@cluster0.ecflc39.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => console.log("Server is running on port 8080"));

const User = require("./models/user");

const sendVerificationEmail = async (email, name, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "GOTUP SERVICES",
    to: email,
    subject: "Email Verification",
    html: `<!DOCTYPE html>
              <html lang="en" >
              <head>
              <meta charset="UTF-8">
              <title>Gotup Service - OTP Email Template</title>


              </head>
              <body>
              <!-- partial:index.partial.html -->
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #85B8B9;text-decoration:none;font-weight:600">Gotup Services</a>
                </div>
                <p style="font-size:1.1em">Hi, ${name}</p>
                <p>Thank you for choosing Gotup Services. Please click the button below to verify your account</p>
                <a style="text-decoration:none" href="http://192.168.43.220:8080/verify/${verificationToken}" target="_blank"><button style="background: #85B8B9;margin: 0 auto;width: max-content;padding: 10px; color: #fff;border-radius: 4px; font-size:1.2em;">Verify</button></a>
                <p style="font-size:0.9em;">Regards,<br />Gotup Services </p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Gotup Services Inc</p>
                  <p>Lekki Phase 2, Lagos</p>
                  <p>Nigeria</p>
                </div>
              </div>
              </div>
              <!-- partial -->

              </body>
              </html>`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Register a new user
// ... existing imports and setup ...

app.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      phoneNumber,
      password,
      countryName,
      stateName,
      cityName,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      username,
      phoneNumber,
      password,
      countryName,
      stateName,
      cityName,
    });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.name, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

 const sendEmail = async ( email, OTP ) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gotupservices@gmail.com",
        pass: "oteziqeaavusjxeu",
      },
    });

    const mail_configs = {
      from: "GoService",
      to: email,
      subject: "PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
              <html lang="en" >
              <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>


              </head>
              <body>
              <!-- partial:index.partial.html -->
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #85B8B9;text-decoration:none;font-weight:600">Gotup Services</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Gotup Services. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #85B8B9;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />Gotup Services </p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Gotup Services Inc</p>
                  <p>Lekki Phase 2, Lagos</p>
                  <p>Nigeria</p>
                </div>
              </div>
              </div>
              <!-- partial -->

              </body>
              </html>`,
    };

  // Send the email
  try {
    await transporter.sendMail(mail_configs);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("An error has occurred", error);
  }
};

app.get("/", (req, res) => {
  console.log("gotupservices@gmail.com");
});

app.post("/send_recovery_email", async (req, res) => {
   try {
  const { email, OTP } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  sendEmail(email, OTP)
    res.status(200).json({ message: "Password Reset successfully" });

    } catch (error) {
    res.status(500).json({ message: "Reset Failed" });
  }
});


//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the User id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the addresses" });
  }
});


//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});
