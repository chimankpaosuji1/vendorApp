import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
      <Text style={styles.forgotText}>Reset your password</Text>
      <View>
        <Text style={styles.logintext}>Code:</Text>
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
            value={code}
            onChangeText={(text) => setCode(text)}
            placeholder="Code"
            placeholderTextColor="#85B8B9"
          />
        </View>
      </View>
      <View>
        <Text style={styles.logintext}>Password:</Text>
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

      <Pressable
        style={styles.buttonlogin}
        onPress={() => navigation.navigate("Login")}
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
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  forgotText: {
    textAlign: "center",
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
});
