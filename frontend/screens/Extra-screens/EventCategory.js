import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const EventCategory = ({ route }) => {
  const { item } = route.params;
  return (
    <View className="flex-1 bg-[#1F1F39] px-2">
      <Text className="text-[39px] text-gray-600 font-light ">
        {item.title}
      </Text>
      <View className="w-full h-[1px] bg-gray-600"></View>

      <ScrollView></ScrollView>
    </View>
  );
};

export default EventCategory;
