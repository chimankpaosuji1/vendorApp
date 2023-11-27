import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/MenuScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuScreen from '../screens/MenuScreen';
import OrderScreen from '../screens/OrderScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import VerifyPasswordScreen from '../screens/VerifyPasswordScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
const StackNavigator = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: "#85B8B9",
            position: "absolute",
            borderTopWidth: 0,
            borderTopColor: "gray",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#fff", fontWeight: "bold" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#fff" />
              ) : (
                <AntDesign name="home" size={24} color="gray" />
              ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={OrderScreen}
          options={{
            tabBarLabel: "Order",
            tabBarLabelStyle: { color: "#fff", fontWeight: "bold" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="purse" size={24} color="#fff" />
              ) : (
                <MaterialCommunityIcons
                  name="purse"
                  size={24}
                  color="gray"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            tabBarLabel: "Saved",
            tabBarLabelStyle: { color: "#fff", fontWeight: "bold" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="save" size={24} color="#fff" />
              ) : (
                <Ionicons name="save" size={24} color="gray" />
              ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarLabelStyle: { color: "#fff", fontWeight: "bold" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="search" size={24} color="#fff" />
              ) : (
                <Ionicons name="search" size={24} color="gray" />
              ),
          }}
        />

        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarLabel: "Menu",
            tabBarLabelStyle: { color: "#fff", fontWeight: "bold" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="settings" size={24} color="#fff" />
              ) : (
                <Ionicons name="settings" size={24} color="gray" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pass"
          component={PasswordResetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
          style={{ backgroundColor: "orange" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator

const styles = StyleSheet.create({})