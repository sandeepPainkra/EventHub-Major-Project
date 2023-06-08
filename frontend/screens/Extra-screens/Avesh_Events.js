import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getAveshEventIndexReducer } from "../../redux/reducer";
import { getAveshEventIndex } from "../../redux/actions";
import { set } from "react-native-reanimated";
import { config } from "../../config";

const Avesh_Events = ({ item }) => {
  const navigation = useNavigation();
  const Id = useSelector((state) => state.getAveshCategoryIdReducer);
  const [AveshCategoryData, setAveshCategoryData] = useState([]);
  const dispatch = useDispatch();
  const [Index, setIndex] = useState();
  const userData = useSelector((state) => state.userReducer);
  // console.log("Data is here: ", AveshCategoryData);
  // console.log("Id from Redux is here1: ", Id);

  //   getting Avesh category events data by perticular Id
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `http://${config.IP_ADDRESS}:5000/api/post/v2/avesh-post/get/${Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            // console.log("Your data is :", data);
            setAveshCategoryData(data?.singleAveshCategory.AveshEvent);
          } else {
            console.log(
              "Error in Event category for avesh in frontend is: ",
              err
            );
          }
        })
        .catch((err) => {
          console.log(
            "Error in Event category for avesh in frontend is: ",
            err
          );
        });
    };
    fetchData();
  }, [Id]);
  return (
    <View className="flex-1 bg-[#1F1F39]  border-t-2 border-gray-700 px-2">
      <View className="flex-row justify-between items-center px-2 py-4 border-b-2 border-blue-900 mb-7">
        <Text className=" text-gray-400 text-[24px]">All Events...</Text>
        {userData.admin === true ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Form_AveshEvent");
            }}
          >
            <Image
              style={{ tintColor: "white" }}
              className="h-[33px] w-[33px]"
              source={require("../../assets/addition.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView>
        {AveshCategoryData.map((item, index) => {
          return (
            <View
              key={index}
              className="border-2 border-blue-900 pb-7 rounded-xl mb-7"
            >
              <View className="relative w-[100%] h-[500px]">
                <Image
                  className="h-[100%] object-contain mb-2 rounded-xl"
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              <Text className="text-[22px] text-white capitalize text-center">
                {item.title}
              </Text>

              <View className="w-full px-4 flex-row justify-between items-center mt-5">
                <TouchableOpacity
                  onPress={() => {
                    // HandelNavigate();
                    // console.log(index);
                    // setIndex(index);
                    navigation.navigate("Avesh Events Details in Brief", {
                      index,
                    });
                  }}
                  className=" bg-blue-500 justify-center items-center rounded-full"
                >
                  <Text className="text-white text-[19px] tracking-widest py-2 px-5 uppercase">
                    View Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className=" bg-[#f209b8] justify-center items-center rounded-full">
                  <Text className="text-white text-[19px] tracking-widest py-2 px-5 uppercase">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Avesh_Events;
