import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { phoneHeroImg } from "../assets/index.js";

const MobileVerification = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#1F1F39] relative">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Verified");
        }}
      >
        <Text className="text-right mr-10 text-gray-500 text-[20px]">
          Skip..
        </Text>
      </TouchableOpacity>
      <View className="w-full  p-3  justify-center items-center  ">
        <Image className="w-[130px] h-[130px] mt-3  " source={phoneHeroImg} />
      </View>

      <View className="w-full h-[77%] bg-[#2F2F42] px-2 py-8 rounded-t-[20px] ">
        <Text className="text-center text-gray-500 text-[17px]">
          Enter Your Mobile Number
        </Text>
        <View className="w-full py-9 relative ">
          <TextInput
            className="w-full bg-[#3E3E55] text-[18px] text-gray-300 py-3 px-3 rounded-[20px] "
            keyboardType="numeric"
            placeholder="Enter mobile number"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("MobileOtp")}
            className="w-[150px] bg-blue-500 rounded-[20px] py-3 absolute right-0 top-9"
          >
            <Text className="text-white text-lg text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MobileVerification;
