import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../common/Header";
import Search from "../tabs/Search";
import EventScreen from "../tabs/EventScreen";
import About from "../tabs/About";
import Profile from "../tabs/Profile";
import HomeScreen from "../tabs/HomeScreen";
import { ScrollView } from "react-native";
import BottomNavigator from "../Bottom/BottomNavigator";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 flex-col relative bg-[#1F1F39]">
      {/* Homescreen body section starts here */}

      {/* Bottom Navigator section */}

      <BottomNavigator />
    </SafeAreaView>
  );
};

export default Home;
