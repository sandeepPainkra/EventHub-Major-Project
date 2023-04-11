import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const Notification = ({ navigation }) => {
  const [notification, setNotification] = useState();
  return (
    <View className="flex-1 bg-[#1F1F39]">
      {/* Notification header  */}

      <View className="bg-[#2F2F42] flex-row justify-start py-3 px-2">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View className="w-[40px] h-[40px] justify-center items-center">
            <AntDesign name="arrowleft" size={35} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="flex-1  text-center text-[26px] text-white">
          Notification
        </Text>
      </View>

      {/* Notification Body  */}

      <View className="w-full mt-7 px-2 ">
        <TouchableOpacity className=" bg-white w-[80px] h-[40px] justify-center items-center rounded-3xl">
          <Text className="text-[18px]">All</Text>
        </TouchableOpacity>

        <View className="w-full mt-4">
          <View>
            {!notification ? (
              <Text className="text-[40px] text-center mt-11 text-gray-600">
                Zero Notification
              </Text>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Notification;
