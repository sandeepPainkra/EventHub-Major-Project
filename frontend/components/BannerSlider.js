import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const BannerSlider = ({ src }) => {
  return (
    <View>
      <Image className="w-[350px] h-full rounded-3xl mr-3 ml-4" source={src} />
    </View>
  );
};

export default BannerSlider;
