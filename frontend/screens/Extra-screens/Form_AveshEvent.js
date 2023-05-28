import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";

const Form_AveshEvent = () => {
  const navigation = useNavigation();
  const [pic, setPic] = useState(null);
  const Id = useSelector((state) => state.getAveshCategoryIdReducer);
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
    startingDate: "",
    closingDate: "",
    CoordinatorName: "",
    CoordinatorNumber: "",
    image: "",
  });
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
        `Images/Event-Category/Avesh/Events/image-${Date.now()}`
      );
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      Alert.alert(`Error : ${error}`);
    }
  };

  const CreateEvent = () => {
    const {
      title,
      description,
      status,
      startingDate,
      closingDate,
      CoordinatorName,
      CoordinatorNumber,
    } = input;
    fetch(`http://10.0.2.2:5000/api/post/v2/avesh-post/update/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        startingDate,
        closingDate,
        CoordinatorName,
        CoordinatorNumber,
        image: pic,
        Id: Id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          //   console.log(data);
          setInput({
            title: "",
            description: "",
            status: "",
            startingDate: "",
            closingDate: "",
            CoordinatorName: "",
            CoordinatorNumber: "",
            image: "",
          });
          Alert.alert("Event Created Successfully");
          navigation.navigate("Avesh Events");
        }
      })
      .catch((err) => console.log("Error while creating event : ", err));
  };
  return (
    <ScrollView className="flex-1 bg-[#1F1F39]">
      <Text className="text-[30px] px-2 font-light text-gray-500">
        Create Events....
      </Text>
      <View className="w-[100%] h-[1px] bg-gray-700 mb-6"></View>

      <View className="px-2 pb-10">
        <View>
          <Text className="text-gray-500 text-[20px]">Title for Event</Text>
          <TextInput
            onChangeText={(text) => setInput({ ...input, title: text })}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Title"
          />
        </View>
        <View>
          <Text className="text-gray-500 text-[20px] mt-3">Description</Text>
          <TextInput
            onChangeText={(text) => setInput({ ...input, description: text })}
            value={input.description}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Description"
          />
        </View>
        <View>
          <Text className="text-gray-500 text-[20px] mt-3">Status</Text>
          <TextInput
            onChangeText={(text) => setInput({ ...input, status: text })}
            value={input.status}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Status:Upcoming/Completed/Running"
          />
        </View>
        <View>
          <Text className="text-gray-500 text-[20px] mt-3">Starting Date</Text>
          <TextInput
            onChangeText={(text) => setInput({ ...input, startingDate: text })}
            value={input.startingDate}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Date"
          />
        </View>
        <View>
          <Text className="text-gray-500 text-[20px] mt-3">Closing Date</Text>
          <TextInput
            onChangeText={(text) => setInput({ ...input, closingDate: text })}
            value={input.closingDate}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Date"
          />
        </View>
        <View>
          <Text className="text-gray-500 text-[20px] mt-3">
            Coordinator Name
          </Text>
          <TextInput
            onChangeText={(text) =>
              setInput({ ...input, CoordinatorName: text })
            }
            value={input.CoordinatorName}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Name"
          />
        </View>
        <View>
          <Text className="text-gray-500 text-[20px] mt-3">
            Coordinator Number:
          </Text>
          <TextInput
            onChangeText={(text) =>
              setInput({ ...input, CoordinatorNumber: text })
            }
            value={input.CoordinatorNumber}
            className=" mt-1 bg-[#41416c] px-3 py-2 rounded-lg text-[20px] text-white"
            placeholder="Number"
          />
        </View>
        <View className="flex flex-row justify-between items-center mt-4">
          <Text className="text-gray-500 text-[20px]">
            Select Image for Event:
          </Text>
          <TouchableOpacity
            onPress={() => {
              SelectImage();
            }}
            className="bg-gray-600 px-3 py-2 flex-row justify-between items-center mr-4"
          >
            <Text className="text-white text-[18px]">Select Image</Text>
            {pic ? (
              <Image
                source={require("../../assets/icons/check-mark.png")}
                className="w-[20px] h-[20px] ml-2"
              />
            ) : null}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Avesh Events");
            }}
            className=" bg-red-600 px-3 py-2 rounded-lg mt-4"
          >
            <Text className="text-white text-[20px]">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              CreateEvent();
            }}
            className="ml-10 bg-[#216bda] px-3 py-2 rounded-lg mt-4"
          >
            <Text className="text-white text-[20px]">Create Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Form_AveshEvent;
