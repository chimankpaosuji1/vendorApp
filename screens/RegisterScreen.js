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

const RegisterScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  useEffect(() => {
    let response = Country.getAllCountries();
    var count = Object.keys(response).length;
    let countryArray = [];
    for (var i = 0; i < count; i++) {
      countryArray.push({
        value: response[i].isoCode,
        label: response[i].name,
      });
    }
    setCountryData(countryArray);
  }, []);

  const handleState = (countryCode) => {
    let res = State.getStatesOfCountry(countryCode);
    var count = Object.keys(res).length;
    let stateArray = [];
    for (var i = 0; i < count; i++) {
      stateArray.push({
        value: res[i].isoCode,
        label: res[i].name,
      });
    }
    setStateData(stateArray);
  };

  const handleCity = (countryCode, stateCode) => {
    let response = City.getCitiesOfState(countryCode, stateCode);

    var count = Object.keys(response).length;
    let cityArray = [];
    for (var i = 0; i < count; i++) {
      cityArray.push({
        value: response[i].latitude,
        label: response[i].name,
      });
    }
    setCityData(cityArray);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setSelectedCountry(country);
    setCountryPickerVisible(false);
  };

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  const handleRegister = () => {
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      countryName: countryName,
      stateName: stateName,
      cityName: cityName,
    };
    // send a POST  request to the backend API to register the user
    axios
      .post("http://192.168.43.220:8080/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "Please check your email for verification"
        );
        navigation.replace("Welcome");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };
  return (
    <ScrollView style={{ paddingTop: 40 }}>
      <View style={{ gap: 40, marginHorizontal: 20, marginVertical: 10 }}>
        <Pressable onPress={() => navigation.navigate("Welcome")}>
          <AntDesign name="caretleft" size={24} color="#85B8B9" />
        </Pressable>
        <Text style={styles.title}>Register to join us</Text>
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
          <View style={{ flexDirection: "column", gap: 25 }}>
            <View>
              <Text style={styles.logintext}>Full name:</Text>
              <View style={styles.loginView}>
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name="person"
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
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#85B8B9"
                />
              </View>
            </View>
            <View>
              <Text style={styles.logintext}>Username:</Text>
              <View style={styles.loginView}>
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name="person-circle"
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
                  value={username}
                  onChangeText={(text) => setUserName(text)}
                  placeholder="Enter your username"
                  placeholderTextColor="#85B8B9"
                />
              </View>
            </View>
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

            <Pressable
              style={styles.buttonlogin}
              onPress={() => setCurrentStep(1)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {currentStep == 1 && (
        <View style={styles.login}>
          <View style={{ flexDirection: "column", gap: 25 }}>
            <View>
              <Text style={styles.logintext}>Phone Number:</Text>
              <View style={styles.loginView}>
                <PhoneInput
                  value={phoneNumber}
                  onChangePhoneNumber={(number) => setPhoneNumber(number)}
                  onPressFlag={toggleCountryPicker}
                  style={styles.phoneInput}
                  placeholder="Enter password"
                  placeholderTextColor="#85B8B9"
                />
                <Button
                  title={
                    selectedCountry ? selectedCountry.name : "Select Country"
                  }
                  onPress={toggleCountryPicker}
                  style={styles.countryButton}
                />
                {countryPickerVisible && (
                  <CountryPicker
                    withFilter={true}
                    withFlagButton={false}
                    withCountryNameButton={false}
                    onSelect={onSelectCountry}
                    onClose={() => setCountryPickerVisible(false)}
                    visible={countryPickerVisible}
                    containerButtonStyle={styles.countryPickerButton}
                    closeButtonImageStyle={styles.countryPickerCloseButton}
                  />
                )}
              </View>
            </View>
            <View>
              <Text style={styles.logintext}>Password:</Text>
              <View style={styles.loginView}>
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="security"
                  size={24}
                  color="#85B8B9"
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
                  placeholder="Enter password"
                  placeholderTextColor="#85B8B9"
                />
              </View>
            </View>
            <View>
              <Text style={styles.logintext}>Repeat Password:</Text>
              <View style={styles.loginView}>
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="security"
                  size={24}
                  color="#85B8B9"
                />

                <TextInput
                  secureTextEntry={true}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: "80%",
                    fontSize: 16,
                  }}
                  placeholder="Enter password"
                  placeholderTextColor="#85B8B9"
                />
              </View>
            </View>

            <Pressable
              style={styles.buttonlogin}
              onPress={() => setCurrentStep(2)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {currentStep == 2 && (
        <View style={styles.login}>
          <View style={{ flexDirection: "column", gap: 25 }}>
            <View>
              <Text style={styles.dropdownText}>Choose country</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "#000" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countryData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select country" : "..."}
                searchPlaceholder="Search..."
                value={country}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCountry(item.value);
                  handleState(item.value);
                  setCountryName(item.label);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "black" : "#85B8B9"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              <Text style={styles.dropdownText}>Choose state</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={stateData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select state" : "..."}
                searchPlaceholder="Search..."
                value={state}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setState(item.value);
                  handleCity(country, item.value);
                  setStateName(item.label);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "#85B8B9"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              <Text style={styles.dropdownText}>Choose city</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cityData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select city" : "..."}
                searchPlaceholder="Search..."
                value={city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCity(item.value);
                  setCityName(item.label);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "#000" : "#85B8B9"}
                    name="Safety"
                    size={20}
                  />
                )}
              />

              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                  color={isSelected ? "#85B8B9" : undefined}
                />
                <Text style={{ fontWeight: "bold" }}>
                  I agree with terms and conditions
                </Text>
              </View>
            </View>

            <Pressable style={styles.buttonlogin} onPress={handleRegister}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 20 }}>
            Have an account?{" "}
            <Text style={{ color: "#85B8B9", fontWeight: "600" }}>Sign in</Text>
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
      {/* <Image style={styles.imgs} source={require("../assets/google.png")} /> */}
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

export default RegisterScreen;

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
    marginTop: 10,
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
