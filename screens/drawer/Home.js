import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../common/Header";
import Search from "../tabs/Search";
import Faav from "../tabs/Faav";
import About from "../tabs/About";
import Profile from "../tabs/Profile";
import HomeScreen from "../tabs/HomeScreen";
import { ScrollView } from "react-native";

const Home = ({ navigation }) => {
  const [Selected, setSelectedTab] = useState(0);
  return (
    <SafeAreaView className="flex-1 flex-col relative bg-[#1F1F39]">
      {/* Header Section */}
      {/* <Header
        leftIcon={require("../../assets/icons/menu.png")}
        rightIcon={require("../../assets/icons/user.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      /> */}
      <View>
        {Selected == 0 ? (
          <HomeScreen />
        ) : Selected == 1 ? (
          <Search />
        ) : Selected == 2 ? (
          <Faav />
        ) : Selected == 3 ? (
          <About />
        ) : (
          <Profile />
        )}
      </View>

      {/* Homescreen body section starts here */}

      {/* Bottom Navigator section */}

      <View className=" absolute w-full h-[70px] bg-[#2F2F42] bottom-0 flex-row justify-between items-center px-[25px]">
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            className="w-[35px] h-[35px] "
            style={{ tintColor: "white" }}
            source={
              Selected == 0
                ? require("../../assets/icons/home_fill.png")
                : require("../../assets/icons/home.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image
            // className="w-[37px] h-[37px] "
            className={
              !Selected == 1 ? "w-[32px] h-[32px]" : "w-[37px] h-[37px]"
            }
            style={{ tintColor: "white" }}
            source={
              Selected == 1
                ? require("../../assets/icons/search_fill.png")
                : require("../../assets/icons/search.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}
        >
          <Image
            className="w-[35px] h-[35px] "
            style={{ tintColor: "white" }}
            source={require("../../assets/icons/home.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            className="w-[35px] h-[35px] "
            style={{ tintColor: "white" }}
            source={
              Selected == 3
                ? require("../../assets/icons/bell_fill.png")
                : require("../../assets/icons/bell.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(4);
          }}
        >
          <Image
            className="w-[35px] h-[35px] "
            style={{ tintColor: "white" }}
            source={
              Selected == 4
                ? require("../../assets/icons/account_fill.png")
                : require("../../assets/icons/account.png")
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
