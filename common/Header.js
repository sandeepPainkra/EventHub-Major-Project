import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header = ({ leftIcon, rightIcon, onClickLeftIcon }) => {
  return (
    <View className="bg-[#3D5CFF] flex-row justify-between items-center w-full h-[60px] px-[20px]">
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
      <TouchableOpacity>
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
