import { View, Text, Image } from "react-native";
import React from "react";

const ParticipatedEventComponent = ({ image, title, status }) => {
  return (
    <View className="w-full flex-row justify-start items-start mt-7 ">
      <View className="mr-4">
        <Image className="w-[90px] h-[80px]  " source={image} />
      </View>
      <View>
        <Text className="text-[25px] mt-0 text-gray-500">{title}</Text>
        <Text className="text-gray-500">
          Status : <Text className="text-green-500">{status}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ParticipatedEventComponent;
