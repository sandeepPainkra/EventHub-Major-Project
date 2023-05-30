import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";

const OtherEvents = ({ item }) => {
  const { _id } = item;
  const navigation = useNavigation();
  const [pic, setPic] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [OtherEventData, setOtherEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //   console.log("Your id in Other Events", _id);

  const SelectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadUrl = await uploadImageAsync(result.assets[0].uri);
      setPic(uploadUrl);
    }
  };
  // console.log("your Avesh pic is : ", pic);

  // upload image to firebase storage
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(
        storage,
        `Images/Event-Category/Avesh/image-${Date.now()}`
      );
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      Alert.alert(`Error : ${error}`);
    }
  };

  // Getting all the Event categories of Avesh from database
  useEffect(() => {
    if (_id) {
      fetch(`http://192.168.84.147:5000/api/post/v1/eventcategory/get/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            // console.log("Your result  data is :", data.eventCategory);
            setOtherEventData(data.eventCategory.OtherEvent);
          }
        })
        .catch((err) => {
          console.log(
            "Error in Event category for avesh in frontend is: ",
            err
          );
        });
    }
  }, [_id]);
  //   console.log("Other Event DAta is12  :", OtherEventData);

  return (
    <View className="flex-1 h-full bg-[#1F1F39] px-2">
      <View className="flex-row justify-between items-center px-3">
        <Text className="text-[39px] text-gray-600 font-light ">
          {item?.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // setModalVisible(!modalVisible);
            navigation.navigate("Form_OtherEvents", { _id });
          }}
        >
          <Image
            style={{ tintColor: "white" }}
            className="w-[30px] h-[30px]"
            source={require("../../assets/addition.png")}
          />
        </TouchableOpacity>
      </View>

      <View className="w-full h-[1px] bg-gray-600"></View>

      <ScrollView className="h-full">
        <TouchableOpacity>
          <View className="w-[50%] pb-3 border-2 border-slate-600 my-5 rounded-lg relative left-16 ml-4">
            <Image
              className="w-[100%] h-[150px] items-stretch"
              source={require("../../assets/audy.jpg")}
            />
            <Text className="text-white text-[22px] mt-2 text-center">
              Technical Events
            </Text>
            <Text className=" text-gray-300 text-[15px] mt-2 text-center ">
              Space Trex,Galaxy Soccr,Cosmic Combat...
            </Text>
          </View>
        </TouchableOpacity>
        {OtherEventData?.map((item, index) => {
          console.log(item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OtherEvent_details", { index, _id, item });
                // console.log(index);
              }}
              key={index}
            >
              <View className="w-[50%] pb-3 border-2 border-slate-600 my-5 rounded-lg relative left-16 ml-4">
                <Image
                  className="w-[100%] h-[150px] items-stretch"
                  source={{ uri: item?.image }}
                />
                <Text className="text-white text-[22px] mt-2 text-center">
                  {item?.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default OtherEvents;
