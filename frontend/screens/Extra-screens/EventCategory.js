import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getAveshCategoryId } from "../../redux/actions";

const EventCategoriesForAvesh = (props) => {
  const item = props.item;
  const navigation = useNavigation();
  const [pic, setPic] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [AveshCategoryData, setAveshCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const HandelUpload = () => {
    fetch("http://192.168.84.147:5000/api/post/v2/avesh-post/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        image: pic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "ok") {
          Alert.alert(data.message);
          setLoading(true);
          setModalVisible(!modalVisible);
          setTitle("");
        }
      })
      .catch((err) => {
        console.log("Error is", err);
      });
  };

  // Getting all the Event categories of Avesh from database
  useEffect(() => {
    fetch("http://192.168.84.147:5000/api/post/v2/avesh-post/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // console.log("Your data is :", data.eventAvesh);
          setAveshCategoryData(data.eventAvesh);
        }
      })
      .catch((err) => {
        console.log("Error in Event category for avesh in frontend is: ", err);
      });
  }, [loading === true]);
  // console.log("data is :", AveshCategoryData);

  const HandelNavigate = (id) => {
    // console.log("id is ", id);
    navigation.navigate("Avesh Events");
    dispatch(getAveshCategoryId(id));
  };
  return (
    <View className="flex-1 h-full bg-[#1F1F39] px-2">
      <View className="flex-row justify-between items-center px-3">
        <Text className="text-[39px] text-gray-600 font-light ">
          {item.title}
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
      {/* Create avesh event category modal */}
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View className="flex-1 justify-center items-center bg-[#2F2F42] ">
            <View className="w-[90%] bg-[#26264c] px-3 py-4 rounded-xl items-center ">
              <View>
                <Text className="text-[27px] text-gray-400 ">
                  Create A Event Category
                </Text>
                <View>
                  <Image
                    className="w-[300px] h-[200px] rounded-lg mt-7 mb-5"
                    source={{
                      uri: !pic
                        ? "https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png"
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
                  <TextInput
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    className="text-[19px] px-3 py-3 placeholder-gray-500 text-gray-800 bg-[#d3d3da] rounded-[10px] mt-2  "
                    placeholder="Give some Description.."
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
      {/* create Avesh Event category Model ends*/}
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
        {AveshCategoryData?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                HandelNavigate(item._id);
              }}
              key={index}
            >
              <View className="w-[50%] pb-3 border-2 border-slate-600 my-5 rounded-lg relative left-16 ml-4">
                <Image
                  className="w-[100%] h-[150px] items-stretch"
                  source={{
                    uri: item?.image,
                  }}
                />
                <Text className="text-white text-[22px] mt-2 text-center">
                  {item?.title}
                </Text>
                <Text className=" text-gray-300 text-[15px] mt-2 text-center ">
                  {item?.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const EventCategory = ({ route }) => {
  const { item } = route.params;
  return (
    <View>
      {item?.title === "Avesh'23" ? (
        <EventCategoriesForAvesh item={item} />
      ) : (
        <View>
          <Text>This is no Avesh</Text>
        </View>
      )}
    </View>
  );
};

export default EventCategory;
