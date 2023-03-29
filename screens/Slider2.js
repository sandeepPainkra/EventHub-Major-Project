import { View, Text, ScrollView, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { slider2 } from "../assets/index.js";
import { TouchableOpacity } from "react-native";

const Slider2 = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#1F1F39]">
      <ScrollView>
        <View className="h-[800px] px-6">
          <View className="w-full my-7 ">
            <Text className="justify-center text-right  my-6 text-[17px] text-gray-400">
              skip
            </Text>
          </View>
          {/* Banner section  */}

          <View>
            <View className=" flex justify-center items-center">
              <Image className="w-[60%] object-cover " source={slider2} />
            </View>
            <Text className="text-white text-center text-[26px] font-semibold mt-8">
              Where passion meets creativity,events come to life
            </Text>
            <Text className="text-white text-[17px] text-center px-8 my-3">
              Attention to detail is the difference between a good event and a
              great one
            </Text>
          </View>
          <View className="w-full flex flex-row justify-between items-center px-7">
            <TouchableOpacity
              onPress={() => navigation.navigate("Landing Screen")}
            >
              <View className="w-[50px] h-[50px]  text-center justify-center items-center border-2 borde-l-1 border-r-0 border-t-0 border-b-0 border-gray-700 rounded-[100px] ">
                <FontAwesome name="chevron-left" size={24} color="darkgray" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Slider3")}>
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
            <View className="w-[10px] rounded-[100px] h-[10px] bg-gray-600"></View>
            <View className="w-[10px] rounded-[100px] h-[10px] bg-green-600 mx-4"></View>
            <View className="w-[10px] rounded-[100px] h-[10px] bg-gray-600"></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Slider2;
