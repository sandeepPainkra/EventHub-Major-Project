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

const MobileOtp = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-[#1F1F39]">
      <View className="w-full h-[100%] bg-[#2F2F42] px-2 py-8 ">
        <View className="flex flex-row justify-center item-center mt-12">
          <Text className="text-center text-gray-500 text-[17px]">
            Enter Your Mobile Number
          </Text>
          <Text className="text-gray-500 text-[16px] ml-2 ">6269642365</Text>
        </View>
        {/* otp box */}
        <View className="flex flex-row justify-center item-center space-x-3 mt-8 mb-8">
          <TextInput
            placeholder=""
            keyboardType="numeric"
            className=" w-[50px] text-white border-[2px] border-gray-500 text-center text-[20px] pt-[10px] pb-[10px] rounded-[20px]"
          />
          <TextInput
            placeholder=""
            keyboardType="numeric"
            className=" w-[50px] text-white border-[2px] border-gray-500 text-center text-[20px] pt-[10px] pb-[10px] rounded-[20px]"
          />
          <TextInput
            placeholder=""
            keyboardType="numeric"
            className=" w-[50px] text-white border-[2px] border-gray-500 text-center text-[20px] pt-[10px] pb-[10px] rounded-[20px]"
          />
          <TextInput
            placeholder=""
            keyboardType="numeric"
            className=" w-[50px] text-white border-[2px] border-gray-500 text-center text-[20px] pt-[10px] pb-[10px] rounded-[20px]"
          />
        </View>

        <View>
          <Text className="text-gray-500 text-center">
            Didn't receive code?
            <Text className="text-blue-700">Request again</Text>
          </Text>
        </View>
        <View className="flex justify-center items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Verified")}
            className=" w-[70%]  mt-11 bg-[#3D5CFF] rounded-lg "
          >
            <Text className="text-[18px]  text-white py-3 px-2 text-center ">
              Verify and Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MobileOtp;
