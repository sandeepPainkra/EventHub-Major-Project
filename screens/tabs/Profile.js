import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const Profile = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#1F1F39]">
      {/* Profile header  */}

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
          My Account
        </Text>
      </View>
    </View>
  );
};

export default Profile;
