import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({ leftIcon, rightIcon, onClickLeftIcon }) => {
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View className="bg-[#2F2F42] flex-row justify-between items-center w-full h-[60px] px-[20px]">
      <TouchableOpacity
        onPress={() => {
          onClickLeftIcon();
        }}
      >
        <Image
          className="w-[35px] h-[35px] "
          tintColor="white"
          source={leftIcon}
        />
      </TouchableOpacity>
      <View>
        <Text className=" italic text-white text-[28px] font-lighter tracking-[3px] ">
          EventHub
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Logout();
        }}
      >
        <Image
          className="w-[35px] h-[35px] "
          // tintColor="white"
          source={rightIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
