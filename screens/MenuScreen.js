import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Button,
  Image,
  Platform,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
const MenuScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const { userId, setUserId } = useContext(UserType);
  const [image, setImage] = useState(null);
  
  // useEffect(() => {
  //   if (userId) {
  //     fetchUserProfile();
  //   }
  // }, [userId]);

  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://192.168.43.220:8080/profile/${userId}`
  //       );
  //       const { user } = response.data;
  //       console.log(user);
  //       setUser(user);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //     setUserId(userId);
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.43.220:8080/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Welcome");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.menuContainer}>
      <View
        style={{
          alignSelf: "flex-end",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <SimpleLineIcons name="settings" size={24} color="#85B8B9" />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        <Pressable onPress={pickImage} style={{ zIndex: 2 }}>
          <View
            style={{
              position: "absolute",
              top: 80,
              left: 10,
              backgroundColor: "#85B8B9",
              padding: 4,
              borderRadius: 15,
            }}
          >
            <Feather name="upload-cloud" size={16} color="#fff" />
          </View>
        </Pressable>
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "white",
            shadowColor: "#000000",
            shadowRadius: 6.34,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.34,
          }}
        />
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.infosub}>Hi, {user?.name}</Text>
        </View>
      </View>
      <View style={styles.order}>
        <View style={styles.orderContainer}>
          <View style={styles.orderIcon}>
            <MaterialIcons
              name="pending-actions"
              size={20}
              color="yellow"
              style={{ textAlign: "center" }}
            />
          </View>
          <View style={styles.orderText}>
            <Text style={styles.orderTextTitle}>418</Text>
            <Text style={styles.orderTextSubTitle}>Pending Orders</Text>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <View style={styles.orderIcon}>
            <Ionicons
              name="sync-circle-outline"
              size={20}
              color="blue"
              style={{ textAlign: "center" }}
            />
          </View>
          <View style={styles.orderText}>
            <Text style={styles.orderTextTitle}>26</Text>
            <Text style={styles.orderTextSubTitle}>Active Orders</Text>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <View style={styles.orderIcon}>
            <Ionicons
              name="checkmark"
              size={20}
              color="green"
              style={{ textAlign: "center" }}
            />
          </View>
          <View style={styles.orderText}>
            <Text style={styles.orderTextTitle}>29</Text>
            <Text style={styles.orderTextSubTitle}>Completed Orders</Text>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <View style={styles.orderIcon}>
            <Ionicons
              name="ios-bookmarks-outline"
              size={20}
              color="orange"
              style={{ textAlign: "center" }}
            />
          </View>
          <View style={styles.orderText}>
            <Text style={styles.orderTextTitle}>509</Text>
            <Text style={styles.orderTextSubTitle}>Total Orders</Text>
          </View>
        </View>
      </View>
      
      <Text
        style={{
          height: 0.5,
          borderColor: "#85B8B9",
          borderWidth: 3,
          marginTop: 15,
          width: "100%",
        }}
      />
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
            color: "gray",
            marginBottom: 15,
          }}
        >
          Personal information's
        </Text>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Email:</Text>
          <Text style={styles.infosub}>{user?.email}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>City:</Text>
          <Text style={styles.infosub}>{user?.cityName}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>State:</Text>
          <Text style={styles.infosub}>{user?.stateName}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Country:</Text>
          <Text style={styles.infosub}>{user?.countryName}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Phone Number:</Text>
          <Text style={styles.infosub}>{user?.phoneNumber}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Address:</Text>
          <Text style={styles.infosub}>{user?.addresses}</Text>
        </View>
      </View>
      <Text
        style={{
          height: 0.5,
          borderColor: "#85B8B9",
          borderWidth: 3,
          marginTop: 15,
          width: "100%",
        }}
      />
      <View>
        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <Ionicons name="briefcase-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.buttonText}>My Jobs</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>

        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <FontAwesome5 name="tasks" size={24} color="#fff" />
            </View>
            <Text style={styles.buttonText}>Job Request</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>

        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color="#fff"
              />
            </View>
            <Text style={styles.buttonText}>Support Tickets</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>

        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <Ionicons name="wallet-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.buttonText}>Wallet</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>

        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <Octicons name="checklist" size={24} color="#fff" />
            </View>
            <Text style={styles.buttonText}>My Report list</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>
        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color="#fff"
              />
            </View>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>

        <Pressable style={styles.button}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="shield-key-outline"
                size={24}
                color="#fff"
              />
            </View>
            <Text style={styles.buttonText}>Change Password</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>
        <Pressable style={styles.button1}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="account-cancel-outline"
                size={24}
                color="#fff"
              />
            </View>
            <Text style={styles.buttonText}>Delete Account</Text>
          </View>
          <AntDesign name="right" size={24} color="#85B8B9" />
        </Pressable>

        <Pressable onPress={logout} style={[styles.button2, styles.one]}>
          <View style={styles.buttonflow}>
            <View style={styles.icon}>
              <Ionicons name="log-out-outline" size={24} color="#fff" />
            </View>

            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  order: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: "#85B8B9",
    borderRadius: 5,
    width: 170,
    padding: 10,
    paddingRight: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    resizeMode: "contain",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  orderIcon: {
    padding: 7,
    backgroundColor: "#85B8B9",
    borderRadius: "100",
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  orderText: {
    gap: 2,
    fontWeight: "600",
    fontSize: 20,
  },
  orderTextTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  orderTextSubTitle: {
    color: "gray",
  },

  one: {
    marginBottom: 150,
  },
  menuContainer: {
    paddingTop: 44,
  },
  info: {
    flexDirection: "row",
    fontSize: 25,
    alignItems: "center",
    
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#85B8B9",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 15,
    marginTop: 15,
  },
  infosub: {
    textAlign: "right",
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#85B8B9",
  },
  button1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#85B8B9",
    borderTopWidth: 2,
    borderTopColor: "#85B8B9",
  },
  button2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  buttonflow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  buttonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 40,
    height: 40,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#85B8B9",
    borderRadius: 20,
  },
});
