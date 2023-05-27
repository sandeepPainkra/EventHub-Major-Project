import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Avesh_Event_details = ({ item }) => {
  const Id = useSelector((state) => state.getAveshCategoryIdReducer);
  const [AveshCategoryData, setAveshCategoryData] = useState([]);
  //   console.log("Data is here: ", AveshCategoryData);
  //   console.log("Id from Redux is here: ", Id);

  //   getting Avesh category events data by perticular Id
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://10.0.2.2:5000/api/post/v2/avesh-post/get/${Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
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
        <Text className=" text-gray-400 text-[24px]">All Another Event...</Text>
        <TouchableOpacity>
          <Image
            style={{ tintColor: "white" }}
            className="h-[33px] w-[33px]"
            source={require("../../assets/addition.png")}
          />
        </TouchableOpacity>
      </View>
      {AveshCategoryData.map((item, index) => {
        return (
          <View
            key={index._id}
            className="border-2 border-blue-900 pb-7 rounded-xl mb-7"
          >
            <Image
              className="h-[200px] w-[100%] mb-2 rounded-xl"
              source={{
                uri: item.image,
              }}
            />
            <Text className="text-[22px] text-white capitalize text-center">
              {item.title}
            </Text>
            <Text className="text-[16px] text-gray-400 capitalize text-center">
              {item.description}
            </Text>
            <Text className="text-[16px] mt-2 text-gray-400 capitalize text-center">
              date
            </Text>
            <View className="w-full px-4 flex-row justify-between items-center mt-5">
              <TouchableOpacity className=" bg-blue-500 justify-center items-center rounded-full">
                <Text className="text-white text-[22px] tracking-widest py-2 px-8 uppercase">
                  Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className=" bg-[#f209b8] justify-center items-center rounded-full">
                <Text className="text-white text-[22px] tracking-widest py-2 px-8 uppercase">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Avesh_Event_details;
