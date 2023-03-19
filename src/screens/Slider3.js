import { View, Text, ScrollView, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { slider3 } from "../../assets";
import { TouchableOpacity } from "react-native";

const Slider3 = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#1F1F39]">
      <ScrollView>
        <View className="h-[800px] px-6 mt-10">
          {/* navigate button on top  */}
          <View className="w-full flex flex-row justify-between items-center px-7">
            <TouchableOpacity onPress={() => navigation.navigate("Slider2")}>
              <View className="w-[50px] h-[50px]  text-center justify-center items-center border-2 borde-l-1 border-r-0 border-t-0 border-b-0 border-gray-700 rounded-[100px] ">
                <FontAwesome name="chevron-left" size={24} color="darkgray" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View className=" flex justify-center items-center">
              <Image className="w-[60%] object-cover " source={slider3} />
            </View>
            <Text className="text-white text-center text-[26px] font-semibold mt-5">
              Creating unforgettable experiences with events
            </Text>
            <Text className="text-white text-[17px] text-center px-8 my-3">
              Attention to detail is the difference between a good event and a
              great one
            </Text>
          </View>
          <View className="w-full  flex-row justify-center items-center my-8 ">
            <View className="w-[10px] rounded-[100px] h-[10px] bg-gray-600"></View>
            <View className="w-[10px] rounded-[100px] h-[10px] bg-gray-600 mx-4"></View>
            <View className="w-[10px] rounded-[100px] h-[10px] bg-green-600"></View>
          </View>
          {/* Login/Registration buttons */}
          <View className="w-full flex flex-row justify-between px-7">
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              className="w-[40%] bg-[#3D5CFF] h-[46px] flex justify-center items-center rounded-md "
            >
              <Text className=" text-gray-200 text-[20px]">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="w-[40%] bg-[#858597] h-[46px] flex justify-center items-center rounded-md "
            >
              <Text className=" text-gray-200 text-[20px]">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Slider3;
