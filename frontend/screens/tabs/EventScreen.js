import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EventScreen = () => {
  const [EventCategoriesData, setEventCategoriesData] = useState([]);
  const [title, setTitle] = useState("");
  const navigation = useNavigation();
  const [pic, setPic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  // console.log(pic);

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
        `Images/Event-Category/image-${Date.now()}`
      );
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      alert(`Error : ${error}`);
    }
  };

  const HandelUpload = () => {
    fetch("http://192.168.84.147/api/post/v1/eventcategory/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image: pic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "ok") {
          setModalVisible(!modalVisible);
          setTitle("");
          Alert.alert(data.message);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // fetch data
  useEffect(() => {
    fetch("http://192.168.84.147:5000/api/post/v1/eventcategory/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => {
        res.json().then((data) => {
          setEventCategoriesData(data.eventCategory);
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  // console.log("All Event Categories data is :", EventCategoriesData);
  return (
    <View className="flex-1 bg-[#1F1F39] pb-10">
      <Header
        leftIcon={require("../../assets/icons/menu.png")}
        rightIcon={require("../../assets/icons/user.png")}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView className="h-full">
        <View className="flex-1 justify-center items-center py-9">
          <View className="w-[78%] flex flex-row items-center justify-between">
            <Text className="text-white text-[25px] font-light">
              All Event Programs
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image
                style={{ tintColor: "white" }}
                className="w-[30px] h-[30px]"
                source={require("../../assets/addition.png")}
              />
            </TouchableOpacity>
          </View>
          <View className="w-[80%] h-[3px] bg-[#2F2F42] mt-2"></View>

          {/* create Event category Model starts*/}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View className="flex-1 justify-center items-center bg-[#2F2F42] ">
                <View className="w-[90%] bg-[#26264c] px-3 py-4 rounded-xl items-center ">
                  <View>
                    <Text className="text-[27px] capitalize text-gray-400 ">
                      Create A Event Category
                    </Text>
                    <View>
                      <Image
                        className="w-[300px] h-[150px] rounded-lg mt-7 mb-5"
                        source={{
                          uri: !pic
                            ? "https://plus.unsplash.com/premium_photo-1664053453717-6fbe70ea92ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                            : pic,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          SelectImage();
                        }}
                        className="bg-blue-400 flex justify-center items-center py-3 rounded-md"
                      >
                        <Text className="text-[20px] font-semibold text-white tracking-[2px]">
                          Sellect Image
                        </Text>
                      </TouchableOpacity>
                      <TextInput
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                        className="text-[19px] px-3 py-3 placeholder-gray-500 text-gray-800 bg-[#d3d3da] rounded-[10px] mt-2  "
                        placeholder="Title of Event Category"
                      />
                    </View>
                  </View>
                  <View className="w-[70%] mt-6 flex-row justify-between items-center">
                    <TouchableOpacity
                      onPress={() => {
                        HandelUpload();
                      }}
                      className="w-[45%] bg-blue-400 py-2 flex justify-center rounded-lg items-center"
                    >
                      <Text className="text-[22px] text-white ">Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setPic();
                      }}
                      className="w-[45%] bg-[#ed4b40] py-2 flex justify-center rounded-lg items-center"
                    >
                      <Text className="text-[22px] text-white ">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          {/* create Event category Model ends*/}
        </View>
        <View className="w-full h-auto px-6 flex-row flex-wrap justify-between">
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center ">
            <Text className="text-center z-20 text-[20px] tracking-[2px]">
              Cultural
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/cultural.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Technical
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/technical.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Informal
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/informal.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Educational
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/educational.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-gray-900 font-medium">
              Placement
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/placement.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]">
            <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
              Alumni Talk
            </Text>
            <Image
              className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
              source={require("../../assets/alumni.jpg")}
            />
          </TouchableOpacity>

          {EventCategoriesData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventCategory", {
                    item: item,
                  });
                }}
                key={index}
                className="relative w-[45%] h-[100px] justify-center item-center mt-8 rounded-[20px]"
              >
                <Text className="text-center z-20 text-[20px] tracking-[2px] text-white">
                  {item.title}
                </Text>
                <Image
                  className="w-[100%] absolute h-full top-0 bottom-0 rounded-[20px]"
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="w-full flex-row justify-center py-14 px-6">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllEventCategories");
            }}
            className="bg-[#3D5CFF] w-[50%] py-2 flex-row justify-center  items-center  rounded-md  "
          >
            <Text className="text-white text-[18px] ">More</Text>
            <Entypo name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventScreen;
