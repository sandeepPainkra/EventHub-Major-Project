import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchInput) {
      fetch(`http://192.168.84.147:5000/api/post/events/${searchInput}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            console.log("Result is :", data.events);
            setSearchResults(data.events);
          }
        })
        .catch((err) => console.log("Error in Search.js in Frontend", err));
    }
  }, [searchInput]);

  return (
    <ScrollView className="flex-1 bg-[#1F1F39] mb-10">
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
        <TouchableOpacity
          onPress={() => {
            setSearchInput("");
            setSearchResults([]);
          }}
        >
          <View className="w-[30px] h-[40px] justify-center items-center relative right-2">
            <Entypo name="cross" size={36} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="w-full py-4 px-4">
        {/* Search Results */}

        <View className="w-full py-3">
          <Text className="text-[35px] font-thin text-gray-400">
            Search Results
          </Text>
          <View className="w-full h-[1px] bg-gray-800 mb-5"></View>
          {searchResults.length === 0 && (
            <Text className="text-[25px] text-gray-500">No Results Found</Text>
          )}
          {searchResults.map((event, index) => {
            console.log("Event data is", event);
            return (
              <View key={index}>
                {event.AveshEvent.map((event, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Avesh Events Details in Brief", {
                          event,
                        });
                      }}
                      key={index}
                      className="my-3"
                    >
                      <View className="w-full flex-row justify-start items-start ">
                        <View className="mr-4">
                          <Image
                            className="w-[100px] h-[80px]"
                            source={{ uri: event?.image }}
                          />
                        </View>
                        <View>
                          <Text className="text-[25px] mt-0 text-gray-500">
                            {event?.title}
                          </Text>
                          <Text className="text-gray-500">
                            Status :
                            <Text className="text-green-500">
                              {event?.status}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
