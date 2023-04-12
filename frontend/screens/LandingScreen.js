import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { slider1 } from "../assets/index.js";
import Slider from "../components/Slider";

const LandingScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#1F1F39]">
      <ScrollView>
        <Slider
          imageSrc={slider1}
          heading="  Find Event & Schedule Planning"
          para="Where passion meets creativity, events come to life"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
