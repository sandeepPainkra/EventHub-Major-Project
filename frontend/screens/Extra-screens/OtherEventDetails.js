import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { config } from "../../config";

const OtherEventDetails = (props) => {
  let index = props.route.params.index;
  let _id = props.route.params._id;
  let item = props.route.params.item;
  console.log("first data is here: ", item);
  const Id = useSelector((state) => state.getAveshCategoryIdReducer);
  const [EventDetails, setEventDetails] = useState([]);

  //   getting Avesh category events data by perticular Id
  useEffect(() => {
    if (Id) {
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
              setEventDetails(data?.singleAveshCategory.AveshEvent);
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
    } else {
      console.log("Id is not found");
    }
  }, [Id]);

  // console.log("first data is here: ", EventDetails[index]);
  return (
    <View className="flex-1 bg-[#1F1F39]  border-t-2 border-gray-700">
      <View>
        <Image
          source={{
            uri: !item.image
              ? "https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png"
              : item.image,
          }}
          className="h-[350px] object-contain"
        />
        <View className="px-3 py-4">
          <Text className="text-gray-400 text-[24px] text-center">
            {item?.title}
          </Text>
          <Text className="text-gray-500 my-4 mt-1 text-[17px] text-center">
            {item?.description}
          </Text>
          <View className="flex-row justify-between items-center border-2 border-blue-800 px-2 py-3 rounded-lg">
            <View>
              <Text className="text-gray-400 text-[20px]">Status :</Text>
              <Text className="text-green-500 text-[17px]">{item?.status}</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[20px]">Starting Date:</Text>
              <Text className="text-green-500 text-[17px]">
                {item?.startingDate}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[20px]">Closing Date:</Text>
              <Text className="text-green-500 text-[17px]">
                {item?.closingDate}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center  mt-4">
            <View>
              <Text className="text-gray-400 text-[20px]">
                Coordinator Name:
              </Text>
              <Text className="text-gray-600 text-[18px]">
                {item?.CoordinatorName}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[20px]">
                Coordinator Number:
              </Text>
              <Text className="text-gray-600 text-[18px]">
                {item?.CoordinatorNumber}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="bg-blue-500 justify-center items-center mt-5 rounded-lg">
            <Text className="text-[22px] text-white py-3 uppercase tracking-[2px]">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtherEventDetails;
