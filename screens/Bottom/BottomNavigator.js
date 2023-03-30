import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../tabs/HomeScreen";
import Search from "../tabs/Search";
import EventScreen from "../tabs/EventScreen";
import Profile from "../tabs/Profile";
import Notification from "../tabs/Notification";

const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          zIndex: 222,
          backgroundColor: "#2F2F42",
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
        },
      }}
    >
      <Bottom.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                className="w-[32px] h-[32px] "
                style={{ tintColor: "#fff" }}
                source={
                  !tabInfo.focused
                    ? require("../../assets/icons/home.png")
                    : require("../../assets/icons/home_fill.png")
                }
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                className="w-[32px] h-[32px] "
                style={{ tintColor: "#fff" }}
                source={
                  !tabInfo.focused
                    ? require("../../assets/icons/search.png")
                    : require("../../assets/icons/search_fill.png")
                }
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                className="w-[32px] h-[32px] "
                style={{ tintColor: "#fff" }}
                source={
                  !tabInfo.focused
                    ? require("../../assets/icons/event.png")
                    : require("../../assets/icons/event_fill.png")
                }
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                className="w-[32px] h-[32px] "
                style={{ tintColor: "#fff" }}
                source={
                  !tabInfo.focused
                    ? require("../../assets/icons/bell.png")
                    : require("../../assets/icons/bell_fill.png")
                }
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                className="w-[32px] h-[32px] "
                style={{ tintColor: "#fff" }}
                source={
                  !tabInfo.focused
                    ? require("../../assets/icons/account.png")
                    : require("../../assets/icons/account_fill.png")
                }
              />
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
