import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Button,
  Alert,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import CheckBox from "expo-checkbox";
import { BASE_URL, API_KEY } from "@env";
import { Country, State, City } from "country-state-city";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const PasswordResetScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [OTP, setOTP] = useState("");
 const navigation = useNavigation();
 const [timerCount, setTimer] = React.useState(60);
 const [OTPinput, setOTPinput] = useState("");
 const [disable, setDisable] = useState(true);


   const nagigateToOtp = () => {
     if (email) {
       const OTP = Math.floor(Math.random() * 9000 + 1000);
       console.log(OTP);
       setOTP(OTP);

       axios
         .post("http://192.168.43.220:8080/send_recovery_email", {
           OTP,
           email: email,
         })
         .then(() => setCurrentStep(1))
         .catch(console.log);

       return;
     }
     return alert("Please enter your email");
   };

     const resendOTP = () => {
       if (disable) return;
       axios
         .post("http://192.168.43.220:8080/send_recovery_email", {
           OTP: OTP,
           email: email,
         })
         .then(() => setDisable(true))
         .then(() =>
           alert("A new OTP has successfully been sent to your email.")
         )
         .then(() => setTimer(60))
         .catch(console.log);
     };

     const verfiyOTP = () => {
       if (parseInt(OTPinput) === OTP) {
         setCurrentStep(2);
         return;
       }
       alert(
         "The code you have entered is not correct, try again or re-send the link"
       );
       return;
     };
      const submit = () => {
       Alert.alert("Congratulation", "Password Reset Successfully");
       navigation.replace("Login");
      };

      React.useEffect(() => {
        let interval = setInterval(() => {
          setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            if (lastTimerCount <= 1) setDisable(false);
            if (lastTimerCount <= 0) return lastTimerCount;
            return lastTimerCount - 1;
          });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
      }, [disable]);
  return (
    <ScrollView style={{ paddingTop: 40 }}>
      <View style={{ gap: 40, marginHorizontal: 20, marginVertical: 10 }}>
        <Pressable onPress={() => navigation.navigate("Welcome")}>
          <AntDesign name="caretleft" size={24} color="#85B8B9" />
        </Pressable>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "yellow" },
                    index <= currentStep && { backgroundColor: "blue" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 80,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: "#f1f1f1",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#85B8B9",
                    shadowColor: "#000",
                    shadowRadius: 5,
                    elevation: 5,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.25,
                  },
                  index <= currentStep && { backgroundColor: "#85B8B9" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      { fontSize: 16, fontWeight: "bold", color: "black" },
                      index <= currentStep && { color: "#fff" },
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={styles.login}>
          <Text style={styles.forgotText}>Reset your password</Text>
          <View>
            <Text style={styles.logintext}>Enter your Email Address</Text>
            <View style={styles.loginView}>
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="#85B8B9"
              />

              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: "80%",
                  fontSize: 16,
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                placeholderTextColor="#85B8B9"
              />
            </View>
          </View>

          <Pressable onPress={nagigateToOtp} style={styles.buttonlogin}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Send
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 10 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
              Back to Sign in
            </Text>
          </Pressable>
        </View>
      )}
      {currentStep == 1 && (
        <View style={styles.login}>
          <Text style={styles.forgotText}>Email Verification</Text>
          <View>
            <Text style={styles.logintext}>
              We have sent a code to your email {email}
            </Text>
            {/* <Text style={styles.logintext}>Please enter it below.</Text> */}
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={styles.loginView1}>
                <TextInput
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: "80%",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                  value={OTPinput}
                  onChangeText={(text) => setOTPinput(text)}
                  placeholder="Enter your 4 digit Code"
                  placeholderTextColor="#85B8B9"
                />
              </View>
            </View>
            
          </View>

          <Pressable onPress={verfiyOTP} style={styles.buttonlogin}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Send
            </Text>
          </Pressable>

          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
              Didn't recieve code?{" "}
              <Text
                style={{
                  color: disable ? "gray" : "#85B8B9",
                  fontSize: 20,
                }}
                onPress={resendOTP}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </Text>
            </Text>
          </View>
        </View>
      )}

      {currentStep == 2 && (
        <View style={styles.login}>
          <Text style={styles.forgotText}>Reset your password</Text>
          <View>
            <Text style={styles.logintext1}>New Password:</Text>
            <View style={styles.loginView}>
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="#85B8B9"
              />

              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: "80%",
                  fontSize: 16,
                }}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter your new password"
                placeholderTextColor="#85B8B9"
              />
            </View>
          </View>
          <View>
            <Text style={styles.logintext1}>Confirm Password:</Text>
            <View style={styles.loginView}>
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="#85B8B9"
              />

              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: "80%",
                  fontSize: 16,
                }}
                secureTextEntry={true}
                placeholder="Confirm your new password"
                placeholderTextColor="#85B8B9"
              />
            </View>
          </View>

          <Pressable
            style={styles.buttonlogin}
            onPress={submit}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Submit
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 10 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
              Back to Sign in
            </Text>
          </Pressable>
        </View>
      )}

      <View
        style={{
          borderRadius: 475,
          width: 550,
          height: 550,
          backgroundColor: "red",
          // borderWidth: 5,
          borderColor: "yellow",
          position: "absolute",
          zIndex: -2,
          top: 660,
          right: 150,
        }}
      ></View>
      <View
        style={{
          borderRadius: 475,
          width: 550,
          height: 550,
          backgroundColor: "#85B8B9",
          // borderWidth: 5,
          borderColor: "#85B8B9",
          position: "absolute",
          zIndex: -1,
          top: 660,
          left: 150,
          shadowColor: "#000",
          shadowRadius: 6.34,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
        }}
      ></View>
    </ScrollView>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  bg: {
    width: 150,
    height: 150,
    backgroundColor: "blue",
    borderRadius: 75,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    textTransform: "uppercase",
  },
  login: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loginView1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#85B8B9",
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  forgotText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 40,
    color: "#85B8B9",
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    textTransform: "uppercase",
  },
  logintext: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 15,
    textAlign: "center",
  },
  logintext1: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
  },
  loginView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#85B8B9",
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  buttonlogin: {
    width: "100%",
    marginTop: 30,
    backgroundColor: "#85B8B9",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  buttonlogin1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#85B8B9",
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  dropdownText: {
    marginBottom: 15,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    backgroundColor: "#f1f1f1",
    borderColor: "#85B8B9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 25,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#85B8B9",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  checkbox: {
    alignSelf: "center",
    color: "red",
  },
  phoneInput: {
    height: 30,
    width: "100%",
    borderWidth: 0,
    borderColor: "#ccc",
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  countryButton: {
    marginBottom: 20,
  },
  countryPickerButton: {
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
  img: {
    width: 30,
    height: 30,
  },
  imgs: {
    position: "absolute",
    top: 600,
    left: 0,
    zIndex: -1,
    borderWidth: 2,
    borderColor: "#85B8B9",
  },
});
