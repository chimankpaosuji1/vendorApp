import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, TextInput } from 'react-native'
import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
const ForgotPasswordScreen = () => {

   const steps = [
     { title: "Address", content: "Address Form" },
     { title: "Delivery", content: "Delivery Options" },
     { title: "Payment", content: "Payment Details" },
   ];
   const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
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
  }

   const resendOTP = () => {
     if (disable) return;
     axios
       .post("http://192.168.43.220:8080/send_recovery_email", {
         OTP: OTP,
         email: email,
       })
       .then(() => setDisable(true))
       .then(() => alert("A new OTP has successfully been sent to your email."))
       .then(() => setTimer(60))
       .catch(console.log);
   };

   const verfiyOTP = () => {
     if (parseInt(OTPinput) === OTP) {
       navigation.navigate("Reset");
       return;
     }
     alert(
       "The code you have entered is not correct, try again or re-send the link"
     );
     return;
   };
  return (
    <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
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
        <>
          <Text style={styles.forgotText}>Reset your password</Text>
          <View>
            <Text style={styles.logintext}>Email:</Text>
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
        </>
      )}
      {currentStep == 1 && (
        <>
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
            {/* <View style={styles.loginView}>
          <View style={styles.buttonVerify}>
            <TextInput
              style={{
                color: "gray",
                width: 40,
                height: 40,
                fontSize: 30,
                textAlign: "center",
              }}
              onChangeText={(e) =>
                setOTPinput([
                  e.target.value,
                  OTPinput[1],
                  OTPinput[2],
                  OTPinput[3],
                ])
              }
            />
          </View>
          <View style={styles.buttonVerify}>
            <TextInput
              style={{
                color: "gray",
                width: 40,
                height: 40,
                fontSize: 30,
                textAlign: "center",
              }}
              onChangeText={(e) =>
                setOTPinput([
                  OTPinput[0],
                  e.target.value,
                  OTPinput[2],
                  OTPinput[3],
                ])
              }
            />
          </View>

          <View style={styles.buttonVerify}>
            <TextInput
              style={{
                color: "gray",
                width: 40,
                height: 40,
                fontSize: 30,
                textAlign: "center",
              }}
              onChangeText={(e) =>
                setOTPinput([
                  OTPinput[0],
                  OTPinput[1],
                  e.target.value,
                  OTPinput[3],
                ])
              }
            />
          </View>
          <View style={styles.buttonVerify}>
            <TextInput
              style={{
                color: "gray",
                width: 40,
                height: 40,
                fontSize: 30,
                textAlign: "center",
              }}
              onChangeText={(e) =>
                setOTPinput([
                  OTPinput[0],
                  OTPinput[1],
                  OTPinput[2],
                  e.target.value,
                ])
              }
            />
          </View>
        </View> */}
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
        </>
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
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  forgotText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 40,
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
  logintext: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
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
});