import { FontAwesome } from "@expo/vector-icons";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Slider = ({ imageSrc, heading, para }) => {
  const navigation = useNavigation();
  return (
    <View className="h-[800px] px-6">
      <View className="w-full my-7 ">
        <Text className="justify-center text-right  my-6 text-[17px] text-gray-400">
          skip
        </Text>
      </View>
      {/* Banner section  */}

      <View>
        <View className=" flex justify-center items-center">
          <Image className="w-[60%] object-cover " source={imageSrc} />
        </View>
        <Text className="text-white text-center text-[26px] font-semibold mt-8">
          {heading}
        </Text>
        <Text className="text-white text-[17px] text-center px-8 my-3">
          {para}
        </Text>
      </View>
      <View className="w-full flex flex-row  justify-end items-center">
        <TouchableOpacity onPress={() => navigation.navigate("Slider2")}>
          <View className="w-[50px] h-[50px]  text-center justify-center items-center border-2 border-l-0 border-t-0 border-b-0 border-gray-700 rounded-[100px] ">
            <FontAwesome
              name="chevron-right"
              size={24}
              color="darkgray"
              className=" font-thin"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-full  flex-row justify-center items-center my-8 ">
        <View className="w-[10px] rounded-[100px] h-[10px] bg-green-600"></View>
        <View className="w-[10px] rounded-[100px] h-[10px] bg-gray-600 mx-4"></View>
        <View className="w-[10px] rounded-[100px] h-[10px] bg-gray-600"></View>
      </View>
    </View>
  );
};

export default Slider;
