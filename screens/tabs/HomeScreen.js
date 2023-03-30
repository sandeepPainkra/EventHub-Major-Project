import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const Data = [
    {
      id: 1,
      src: "../../assets/gec.jpg",
    },
    {
      id: 2,
      src: "../../assets/audy.jpg",
    },
    {
      id: 3,
      src: "../../assets/robo.jpg",
    },
  ];
  return (
    <View className="flex-1 h-full ">
      <Header
        // leftIcon={require("../../assets/icons/menu.png")}
        leftIcon={require("../../assets/icons/menu.png")}
        rightIcon={require("../../assets/icons/user.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View className="flex-row h-[500px] justify-center items-center "></View>
    </View>
  );
};

export default HomeScreen;
