import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import BannerSlider from "../../components/BannerSlider";
import { config } from "../../config";

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
      <View className="px-4">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AyamEvent_details", {
              id: "647108f2b69b881882c913aa",
            });
          }}
          className="w-full flex-row justify-start items-start mt-7 bg-[#242442] p-2 "
        >
          <View className="mr-4">
            <Image
              className="w-[110px] h-[70px] rounded-md"
              source={{
                uri: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
              }}
            />
          </View>
          <View>
            <Text className="text-[25px] mt-0 text-gray-500">Football</Text>
            <Text className="text-gray-500">
              Status : <Text className="text-green-500">upcoming</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Avesh Events");
          }}
          className="w-full flex-row justify-start items-start mt-7 bg-[#242442] p-2 "
        >
          <View className="mr-4">
            <Image
              className="w-[110px] h-[70px] rounded-md"
              source={{
                uri: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRlY2huaWNhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
            />
          </View>
          <View>
            <Text className="text-[25px] mt-0 text-gray-500">
              Technical Events
            </Text>
            <Text className="text-gray-500">
              Status : <Text className="text-green-500">upcoming</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="w-full flex-row justify-start items-start mt-7 bg-[#242442] p-2 ">
          <View className="mr-4">
            <Image
              className="w-[110px] h-[70px] rounded-md"
              source={{
                uri: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlc3MlMjBib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
            />
          </View>
          <View>
            <Text className="text-[25px] mt-0 text-gray-500">
              Imformal event
            </Text>
            <Text className="text-gray-500">
              Status : <Text className="text-green-500">upcoming</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="w-full flex-row justify-start items-start mt-7 bg-[#242442] p-2 ">
          <View className="mr-4">
            <Image
              className="w-[110px] h-[70px] rounded-md"
              source={{
                uri: "https://images.unsplash.com/photo-1591534180437-507029f6ee60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVtb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
            />
          </View>
          <View>
            <Text className="text-[25px] mt-0 text-gray-500">
              this is title
            </Text>
            <Text className="text-gray-500">
              Status : <Text className="text-green-500">status</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
