import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Verified = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("Parent");
  //   }, 2000);
  // }, []);
  return (
    <SafeAreaView className="w-full flex-1 justify-center items-center bg-[#1F1F39]">
      <View className="w-[80%] p-11 px-6 rounded-lg flex flex-col justify-center items-center bg-[#2F2F42]">
        <View className="bg-[#3D5CFF] p-3 rounded-[30px] mb-3">
          <Feather name="check" size={37} color="white" />
        </View>
        <Text className=" text-[20px] text-gray-300 ">Success</Text>
        <Text className="text-[15px] my-2 text-center text-gray-300">
          Congratulations, you have completed your registration!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="bg-blue-500 w-[85%] rounded-lg"
        >
          <Text className="text-white text-center text-[23px] py-3 ">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Verified;
