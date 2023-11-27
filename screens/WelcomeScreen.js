import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import styled from "../styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from "react-native-reanimated";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, API_KEY } from "@env";
const WelcomeScreen = () => {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSelected, setSelection] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const imagePosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [-height/1.29, 0])
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
    }
  })
  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [250, 0]
    )
    return {
      opacity: withTiming(imagePosition.value, { duration: 1000 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  })
  const closeBottomContainerStyle =useAnimatedStyle(() => {
    const interpolation2 = interpolate(
      imagePosition.value,
      [0, 1],
      [0, -height / 1.29]
    );
     const interpolation = interpolate(
       imagePosition.value,
       [0, 1],
       [180, 360]
     );
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 600 }),
      
      transform: [
        { translateY: withTiming(interpolation2, { duration: 1000 }) },
        { rotate: withTiming(interpolation + "deg", { duration: 600 }) },
      ],
    };
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, {duration: 800})) : withTiming(0, { duration:300}),
    }
  })
  const loginHandler = () => {
    imagePosition.value = 0
  }
    const registerHandler = () => {
      imagePosition.value = 0;
    };


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
        .post("http://172.20.10.2:8080/login", user)
        .then((response) => {
          const token = response.data.token;
          AsyncStorage.setItem("authToken", token);
          navigation.replace("Main");
        })
        .catch((error) => {
          Alert.alert("Login Error", "Invalid Email");
          console.log(error);
        });
    };
  return (
    <View style={styled.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width} style={styled.svg}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            style={styled.img}
            href={require("../assets/welcome2.jpg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
          {/* <Image
            style={styled.img}
            href={require("../assets/welcome1.jpg")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          /> */}
        </Svg>
      </Animated.View>

      <View style={styled.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <View>
            <Text
              style={{
                fontSize: 45,
                fontWeight: "bold",
                padding: 10,
                color: "#fff",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginBottom: 5,
                textShadowColor: "#238282",
                textShadowRadius: 5,
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                padding: 10,
                color: "#fff",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginBottom: 10,
                textShadowColor: "#238282",
                textShadowRadius: 5,
              }}
            >
              Get anything{"\n"}Services from thousands of expert
            </Text>
          </View>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable
            style={styled.button1}
            onPress={loginHandler}
          >
            <Text style={styled.buttonText1}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable
            style={styled.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styled.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable
            style={styled.bottom}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.text}>Terms of Service</Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[styles.closeBottomContainer, closeBottomContainerStyle]}
        >
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
        <Animated.View style={[styles.login, formAnimatedStyle]}>
          <ScrollView>
            <View style={{ paddingTop: 70, paddingBottom: 10 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "600",
                  marginBottom: 10,
                  color: "#000",
                  shadowColor: "#000",
                  shadowRadius: 6.27,
                  elevation: 5,
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                }}
              >
                Welcome back! Login
              </Text>
            </View>

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
                onPress={() => navigation.navigate("Forgot")}
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
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 20 }}
              >
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
              <Text
                style={{
                  textAlign: "center",
                  color: "#85B8B9",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login with Google
              </Text>
            </Pressable>
            <Pressable style={styles.buttonlogin1}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#85B8B9",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Log in with Facebook
              </Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#85B8B9",
    letterSpacing: 0.5,
    textShadowColor: "black",
    textShadowRadius: 5,
    // marginTop: 20,
  },

  login: {
    marginHorizontal: 20,
    marginVertical: 10,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: "center",
  },
  logintext: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "500",
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
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    alignSelf: "center",
    color: "red",
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
    borderWidth: 1,
    borderColor: "#85B8B9",
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
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
  closeBottomContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowRadius: 6.27,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    top: -440
  }
});
