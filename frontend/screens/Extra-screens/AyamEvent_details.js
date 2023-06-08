import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { config } from "../../config";

const AyamEvent_details = (props) => {
  let Id = props.route.params.id;
  const [EventDetails, setEventDetails] = useState([]);

  //   getting Avesh category events data by perticular Id
  useEffect(() => {
    if (Id) {
      const fetchData = async () => {
        await fetch(
          `http://${config.IP_ADDRESS}:5000/api/post/v2/ayam-post/get/${Id}`,
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
              setEventDetails(data?.singleAyamCategory);
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
  console.log("first data is :", EventDetails);
  return (
    <ScrollView className="flex-1 bg-[#1F1F39]  border-t-2 border-gray-700">
      <View className="pb-4">
        <Image
          source={{
            uri: !EventDetails?.image
              ? "https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png"
              : EventDetails?.image,
          }}
          className="h-[400px] object-contain"
        />
        <View className="px-3 py-4">
          <Text className="text-gray-400 text-[24px] text-center">
            {EventDetails?.title}
          </Text>
          <Text className="text-gray-500 my-4 mt-1 text-[17px] text-center">
            {EventDetails?.description}
          </Text>
          <View className="flex-row justify-between items-center border-2 border-blue-800 px-2 py-3 rounded-lg">
            <View>
              <Text className="text-gray-400 text-[20px]">Status :</Text>
              <Text className="text-green-500 text-[17px]">
                {EventDetails?.status}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[20px]">Starting Date:</Text>
              <Text className="text-green-500 text-[17px]">
                {EventDetails?.startingDate}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[20px]">Closing Date:</Text>
              <Text className="text-green-500 text-[17px]">
                {EventDetails?.closingDate}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center  mt-4">
            <View>
              <Text className="text-gray-400 text-[20px]">
                Coordinator Name:
              </Text>
              <Text className="text-gray-600 text-[18px]">
                {EventDetails?.CoordinatorName}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[20px]">
                Coordinator Number:
              </Text>
              <Text className="text-gray-600 text-[18px]">
                {EventDetails?.CoordinatorNumber}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(EventDetails?.Registration_Link);
            }}
            className="bg-blue-500 justify-center items-center mt-5 rounded-lg"
          >
            <Text className="text-[22px] text-white py-3 uppercase tracking-[2px]">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AyamEvent_details;
