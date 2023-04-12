import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [recent, setRecent] = useState([
    { name: "Cultural" },
    { name: "technical" },
    { name: "sports" },
  ]);
  return (
    <View className="flex-1 bg-[#1F1F39]">
      {/* search header */}
      <View className=" flex-row justify-center item-center  bg-[#2F2F42] py-3 mt-1 ">
        <View className=" justify-center items-center ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <TextInput
          value={searchInput}
          onChangeText={(e) => setSearchInput(e)}
          className="flex-1 text-[19px] text-gray-500 px-8 py-2 bg-[#1F1F39] rounded-[20px] mx-2"
          placeholder="Cultural,Technical.."
        />
        <TouchableOpacity onPress={() => setSearchInput("")}>
          <View className="w-[30px] h-[40px] justify-center items-center relative right-2">
            <Entypo name="cross" size={36} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="w-full py-4 px-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[20px] text-gray-500">Recent Searches</Text>
          <Text className="text-gray-500 text-[20px] uppercase">Clear</Text>
        </View>
        <View className="w-full h-[1px] bg-gray-800 mt-[.6px]"></View>

        <View className="w-full py-1 flex-row flex-wrap justify-around items-center">
          {recent.map(({ name }) => {
            return (
              <View
                key={name}
                className=" border-[2px] px-3 py-1 border-gray-800 rounded-xl mb-1"
              >
                <Text className="text-gray-500 text-[15px] tracking-[1px]">
                  {name}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Search Results */}

        <View className="w-full py-3">
          <Text className="text-[35px] font-thin text-gray-400">
            Search Results
          </Text>
          <View className="w-full h-[1px] bg-gray-800 mb-5"></View>
          <TouchableOpacity>
            <View className="w-full flex-row justify-start items-start ">
              <View className="mr-4">
                <Image
                  className="w-[100px] h-[80px]"
                  source={require("../../assets/technical.jpg")}
                />
              </View>
              <View>
                <Text className="text-[25px] mt-0 text-gray-500">
                  Football, Sport Event
                </Text>
                <Text className="text-gray-500">
                  Status : <Text className="text-green-500">Running</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Search;
