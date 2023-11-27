import { StyleSheet, Text, View, SafeAreaView, Platform,ScrollView, Image, Pressable, TextInput, } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const HomeScreen = () => {

  const images = [    
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
    "https://img.freepik.com/free-photo/african-american-female-worker-making-inventory-packages-organizing-delivery-schedule-digital-tablet-her-colleague-is-working-background_637285-2227.jpg?w=1380&t=st=1697720567~exp=1697721167~hmac=0e5a22620c47f0174f013569abe5bd898ce2206cf8e2772e92fcbfa104041185",
    "https://img.freepik.com/free-photo/smiling-mechanic-with-arms-crossed-spanner_1170-1699.jpg?w=1380&t=st=1697720764~exp=1697721364~hmac=7119ead52a452259c0c14ea4f1df84e7ea908fea6157d71ada094b1fd28ff44f",
    "https://img.freepik.com/free-photo/young-african-american-man-doing-laundry_273609-23249.jpg?w=1380&t=st=1697720853~exp=1697721453~hmac=aa31359b7d5e195a69f9972a467c7b0e693a9bbbe0a1dd42dbd2b0f26df9ec92",
    "https://img.freepik.com/free-photo/daily-domestic-chores-responsibilities_273609-50840.jpg?w=1380&t=st=1697720872~exp=1697721472~hmac=c5c2c77dde77a9c625f11ebc41c43886cd52329370cccbab712fd395b16424d3",
  ];
    const offers = [
      {
        id: "0",
        title: "Electronics",
        image:
          "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
        carouselImages: [
          "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
        ],
      },
      {
        id: "1",
        title: "Cleaning",
        image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
        carouselImages: [
          "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
        ],
      },
      {
        id: "2",
        title: "Home Move",
        image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
        carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      },
      {
        id: "3",
        title: "Car Repairs",
        image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
        carouselImages: [
          "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
          "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
          "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
        ],
      },
    ];
   const navigation = useNavigation();
   const [user, setUser] = useState();
   const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
      if (userId) {
        fetchUserProfile();
      }
    }, [userId]);

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.43.220:8080/profile/${userId}`
        );
        const { user } = response.data;
        console.log(user);
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    useEffect(() => {
      const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      };

      fetchUser();
    }, []);


  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            // marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <View style={{ gap: 5 }}>
            <Text style={{ color: "gray" }}>Welcome!</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {user?.name}
            </Text>
          </View>
          <View>
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: "contain",
                borderRadius: 35,
              }}
              source={{
                uri: "https://img.freepik.com/free-photo/close-up-delivery-person-with-parcel_23-2149095905.jpg?w=1380&t=st=1697716754~exp=1697717354~hmac=64453dfddb016db7ad48fa7fb16a182c18f8c827b6b323eabd64bdc42bd789af",
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
            alignItems: "center",
            // marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#f1f1f1",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderRadius: 3,
              height: 43,
              flex: 1,
              fontSize: 20,
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={16}
              color="#85B8B9"
            />
            <TextInput
              style={{
                color: "gray",
                // marginVertical: 10,
                width: "100%",
                fontSize: 16,
                fontWeight: "500",
              }}
              placeholder="Search Services"
              placeholderTextColor="#85B8B9"
            />
          </Pressable>
        </View>
        <Text
          style={{
            height: 0.2,
            borderColor: "#85B8B9",
            borderWidth: 1,
            marginTop: 25,
            marginBottom: 25,
            width: "100%",
          }}
        />
        <SliderBox
          // ImageComponent={FastImage}
          images={images}
          sliderBoxHeight={180}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={"resize"}
          resizeMode={"cover"}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)",
          }}
          ImageComponentStyle={{
            borderRadius: 15,
            width: "95%",
            shadowColor: "#000",
            shadowRadius: 7,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.4,
          }}
          imageLoadingColor="#2196F3"
        />
        <View style={styles.catContainer}>
          <Text style={styles.catTitle}>Browse categories</Text>
          <View style={styles.catFlow}>
            <Text style={styles.catSubTitle}>See all</Text>
            <AntDesign name="right" size={20} color="#85B8B9" />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <View style={{ gap: 20 }}>
              <View
                style={{
                  marginHorizontal: 10,
                  borderWidth: 1,
                  width: 100,
                  height: 100,
                  borderColor: "lightgray",
                  borderRadius: "15",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  justifyContent: "space-between",
                  shadowOffset: { width: -2, height: -4 },
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                  elevation: 10,
                  backgroundColor: "#fff",
                  shadowColor: "#85B8B9",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Image
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 3,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "gray",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.title}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* <Image
          source={{ uri: assets.uri }}
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
        /> */}
        <View style={styles.catContainer}>
          <Text style={styles.catTitle}>Top Booked Services</Text>
          <View style={styles.catFlow}>
            <Text style={styles.catSubTitle}>See all</Text>
            <AntDesign name="right" size={20} color="#85B8B9" />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <View style={{ gap: 20 }}>
              <View style={styles.bookedContainerBorder}>
                <View style={styles.booked}>
                  <Image
                    style={{ width: 80, height: 80, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />

                  <View
                    style={
                      {
                        // justifyContent: "center",
                        // alignItems: "center",
                        // marginTop: 3,
                      }
                    }
                  >
                    <View style={styles.bookedContainer}>
                      <Text style={styles.bookedText}>
                        Home Move Services from One City to Another City
                      </Text>
                      <Text style={styles.bookedTextSub}>
                        by:{" "}
                        <Text style={styles.bookedTextSeller}>Seller Two</Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.booked1}>
                  <Text style={styles.bookedTextSub}>
                    {" "}
                    Starts from:{" "}
                    <Text style={styles.bookedTextSellerPrice}>$21</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: "#f1f1f1",
                        borderRadius: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bookmark-multiple-outline"
                        size={24}
                        color="black"
                      />
                    </View>
                    <Pressable
                      style={{
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
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Book Now
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.catContainer}>
          <Text style={styles.catTitle}>Recently listed</Text>
          <View style={styles.catFlow}>
            <Text style={styles.catSubTitle}>See all</Text>
            <AntDesign name="right" size={20} color="#85B8B9" />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <View style={{ gap: 20, marginBottom: 50 }}>
              <View style={styles.bookedContainerBorder}>
                <View style={styles.booked}>
                  <Image
                    style={{ width: 80, height: 80, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />

                  <View
                    style={
                      {
                        // justifyContent: "center",
                        // alignItems: "center",
                        // marginTop: 3,
                      }
                    }
                  >
                    <View style={styles.bookedContainer}>
                      <Text style={styles.bookedText}>
                        Home Move Services from One City to Another City
                      </Text>
                      <Text style={styles.bookedTextSub}>
                        by:{" "}
                        <Text style={styles.bookedTextSeller}>Seller Two</Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.booked1}>
                  <Text style={styles.bookedTextSub}>
                    {" "}
                    Starts from:{" "}
                    <Text style={styles.bookedTextSellerPrice}>$21</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: "#f1f1f1",
                        borderRadius: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bookmark-multiple-outline"
                        size={24}
                        color="black"
                      />
                    </View>
                    <Pressable
                      style={{
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
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Book Now
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  catContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  catTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
  catFlow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  catSubTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#85B8B9",
  },
  booked: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "lightgray",
  },
  booked1: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookedContainer: {
    width: "90%",
    gap: 10,
    textAlign: "left",
  },
  bookedText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  bookedTextSub: {
    color: "gray",
  },
  bookedTextSeller: {
    color: "#000",
    fontWeight: "bold",
  },
  bookedTextSellerPrice: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  bookedContainerBorder: {
    width: 330,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: "lightgray",
    borderRadius: "15",
    borderWidth: 1,
    marginHorizontal: 10,
    shadowOffset: { width: -4, height: -6 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#85B8B9",
  },
});