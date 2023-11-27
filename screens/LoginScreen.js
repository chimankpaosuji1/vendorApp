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
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import CheckBox from "expo-checkbox";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";


const LoginScreen = () => {

  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

   useEffect(() => {
     const checkLoginStatus = async () => {
       try {
         const token = await AsyncStorage.getItem("authToken");

         if (token) {
           navigation.replace("Main");
         }
       } catch (err) {
         console.log("error message", err);
       }
     };
     checkLoginStatus();
   }, []);

   const handleLogin = () => {
     const user = {
       email: email,
       password: password,
     };

     axios
       .post("http://192.168.43.220:8080/login", user)
       .then((response) => {
         const token = response.data.token;
         AsyncStorage.setItem("authToken", token);
         Alert.alert("Login Successful", "Email validated");
         navigation.replace("Main");
       })
       .catch((error) => {
         Alert.alert("Login Error", "Invalid Email or Password");
         console.log(error);
       });
   };
  return (
    <ScrollView style={{ paddingTop: 55 }}>
      <View style={{ gap: 40, marginHorizontal: 20, marginVertical: 10 }}>
        <Pressable onPress={() => navigation.navigate("Welcome")}>
          <AntDesign name="caretleft" size={24} color="#85B8B9" />
        </Pressable>
        <Text style={styles.title}>Welcome back! Login</Text>
      </View>

      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <View style={{ flexDirection: "column", gap: 25 }}>
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

          <View>
            <Text style={styles.logintext}>Password:</Text>
            <View style={styles.loginView}>
              <AntDesign
                name="lock1"
                size={24}
                color="#85B8B9"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: "80%",
                  fontSize: 16,
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="enter your Password"
                placeholderTextColor="#85B8B9"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
              color={isSelected ? "#85B8B9" : undefined}
            />
            <Text>Remember Me</Text>
          </View>

          <Text
            onPress={() => navigation.navigate("Pass")}
            style={{ color: "#85B8B9", fontWeight: "600" }}
          >
            Forgot Password?
          </Text>
        </View>

        <View style={{ marginTop: 20 }} />

        <Pressable onPress={handleLogin} style={styles.buttonlogin}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              style={{ color: "#85B8B9", fontWeight: "600" }}
            >
              Register
            </Text>
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              height: 0.5,
              borderColor: "#85B8B9",
              borderWidth: 1,
              marginTop: 15,
              width: "40%",
            }}
          />
          <Text style={{ fontWeight: "600" }}>OR</Text>
          <Text
            style={{
              height: 0.5,
              borderColor: "#85B8B9",
              borderWidth: 1,
              marginTop: 15,
              width: "40%",
            }}
          />
        </View>

        <Pressable style={styles.buttonlogin1}>
          <Image
            style={styles.img}
            source={require("../assets/google.png")}
            width={50}
            height={50}
          />
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Login with Google
          </Text>
        </Pressable>
        <Pressable style={styles.buttonlogin1}>
          <FontAwesome5 name="facebook" size={30} color="#295ed9" />
          <Text
            style={{
              textAlign: "center",
              color: "#295ed9",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Log in with Facebook
          </Text>
        </Pressable>
      </View>
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

export default LoginScreen;

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
