import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import BannerSlider from "../../components/BannerSlider";

const apiData = [
  {
    image: require("../../assets/Banner/coding.jpg"),
  },
  {
    image: require("../../assets/Banner/color.jpg"),
  },
  {
    image: require("../../assets/Banner/idea.jpg"),
  },
];

const WIDTH = Dimensions.get("window").width - 20;

const HomeScreen = () => {
  const navigation = useNavigation();
  const renderItem = ({ item, index }) => <BannerSlider src={item.image} />;
  return (
    <View className="flex-1 h-full bg-[#1F1F39] ">
      <Header
        leftIcon={require("../../assets/icons/menu.png")}
        rightIcon={require("../../assets/icons/user.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      {/* banner starts here */}

      <View className="h-[120px] mt-4 relative">
        <FlatList
          data={apiData}
          horizontal
          indicatorStyle={false}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
        />
      </View>
      {/* <BottomNavigator /> */}
    </View>
  );
};

export default HomeScreen;
