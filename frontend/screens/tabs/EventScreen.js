import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const EventScreen = () => {
  // const navigation = useNavigation();
  return (
    <View className="flex-1 bg-[#1F1F39]">
      <Header
        leftIcon={require("../../assets/icons/menu.png")}
        rightIcon={require("../../assets/icons/user.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView className="h-full">
        <View className="flex-1 justify-center items-center py-9">
          <Text className="text-white text-[25px] font-light">
            All Event Programs
          </Text>
          <View className="w-[80%] h-[3px] bg-[#2F2F42]"></View>
        </View>
        <View className="w-full h-auto px-6 flex-row flex-wrap justify-between">
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center ">
            <Text className="text-center z-20 text-[20px] tracking-[2px]">
              Cultural
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/cultural.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Technical
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/technical.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Informal
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/informal.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Educational
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/educational.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-gray-900 font-medium">
              Placement
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/placement.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Alumni Talk
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/alumni.jpg")}
            />
          </TouchableOpacity>
        </View>

        <View className="w-full flex-row justify-center py-14 px-6">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllEventsCatogary");
            }}
            className="bg-[#3D5CFF] w-[50%] py-2 flex-row justify-center  items-center  rounded-md  "
          >
            <Text className="text-white text-[18px] ">More</Text>
            <Entypo name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventScreen;
