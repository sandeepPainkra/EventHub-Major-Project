import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 h-full ">
      <Header
        // leftIcon={require("../../assets/icons/menu.png")}
        leftIcon={require("../../assets/icons/menu.png")}
        rightIcon={require("../../assets/icons/user.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <Text className="italic text-white text-[28px] ">HomeScreen</Text>
    </ScrollView>
  );
};

export default HomeScreen;
