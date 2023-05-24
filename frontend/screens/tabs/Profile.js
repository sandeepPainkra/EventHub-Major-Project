import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      if (!value) {
        console.log("Token doesn't exist");
      } else {
        // console.log("Token in header :", value);
        setToken(value);
      }
    });
  }, []);
  const LogOut = async () => {
    await AsyncStorage.removeItem("token");
    await fetch("http://10.0.2.2:5000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("user");
          Alert.alert(data.message);
          navigation.navigate("Landing Screen");
        } else {
          Alert.alert(data.error);
        }
      })
      .catch((error) => console.log("Logout Error: ", error));
  };

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
      setProfilePic(uploadUrl);
    }
  };
  // console.log("Profile Image :", profilePic);
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
        `Images/User_Profile/image-${Date.now()}`
      );
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      alert(`Error : ${error}`);
    }
  };

  const UpdateProfile = async () => {
    await fetch("http://10.0.2.2:5000/api/user/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        bio: bio,
        image: profilePic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update Profile Data from frontend : ", data);
        if (data.status == "ok") {
          Alert.alert(data.message);
          setUpdatedData({
            name: data.user.name,
            bio: data.user.bio,
            image: data.user.image,
          });
          setModalVisible(false);
        } else {
          Alert.alert(data.error);
        }
      })
      .catch((error) =>
        console.log("Update Profile Error from frontend : ", error)
      );
  };
  return (
    <View className="flex-1 bg-[#1F1F39]">
      {/* Profile header  */}

      {/* Profile body section starts here */}

      <View className="flex-1 px-5">
        {/* profile image section  */}
        <View className="w-full justify-center items-center py-5">
          <TouchableOpacity className=" relative">
            <Image
              // style={{ tintColor: "" }}
              source={
                !updatedData.image
                  ? require("../../assets/icons/user.png")
                  : { uri: updatedData.image }
              }
              className="w-[150px] h-[150px] rounded-[75px]]"
            />
            <View className="bg-green-600 w-[50px] h-[50px] rounded-3xl justify-center items-center absolute bottom-[-10px] right-[0px]">
              <TouchableOpacity>
                <Image
                  style={{ tintColor: "#C4DFDF" }}
                  source={require("../../assets/icons/camera.png")}
                  className="w-[30px] h-[30px]"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        {/* bio section starts here */}
        <View className="w-[full ] justify-center items-center">
          <Text className="text-white text-[27px]">{updatedData.name}</Text>
          <Text className="text-white text-[19px] my-2">
            samdeeppainkra@gmail.com
          </Text>
          <Text className="text-white text-[15px]">{updatedData.bio}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            className="bg-blue-400 py-2 px-3 rounded-xl mt-2"
          >
            <Text className="text-center text-white">Edit Profile</Text>
          </TouchableOpacity>

          {/* Modal for Edit profile button start here */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View className=" flex-1 justify-center items-center bg-[#0009] ">
              <View className="w-[90%] bg-[#3D5CFF] py-7 px-4 rounded-xl">
                <Text className="text-white text-[35px]">Edit Profile</Text>

                <Text className="text-gray-300 text-[17px] mt-5 mb-2">
                  Name
                </Text>
                <TextInput
                  onChangeText={(text) => setName(text)}
                  value={name}
                  className="py-2 border-slate-300 border-2 rounded-lg px-3 text-[19px] text-white"
                  placeholder="Enter Name"
                />

                <Text className="text-gray-300 text-[17px] mt-5 mb-2">
                  Enter Your Bio
                </Text>
                <TextInput
                  onChangeText={(text) => setBio(text)}
                  value={bio}
                  className=" min-h-[90px] py-2 border-slate-300 border-2 rounded-lg px-3 text-[19px] text-white"
                  placeholder="Write Your Bio.."
                />
                {/* profile image  */}
                <View className="flex-row justify-between items-center mt-5 ">
                  <TouchableOpacity
                    onPress={() => {
                      SelectImage();
                    }}
                    className="w-[60%] py-4 border-slate-300 border-2 rounded-lg justify-center items-center mt-2"
                  >
                    <Text className="text-[18px] text-white">
                      Select Profile image
                    </Text>
                  </TouchableOpacity>
                  <Image
                    className="w-[80px] h-[80px] rounded-full mr-4"
                    source={{ uri: profilePic }}
                  />
                </View>
                <View className="  flex-row justify-center items-center mt-5">
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    className="w-[40%] mr-5 bg-red-500 justify-center items-center rounded-lg py-3"
                  >
                    <Text className="text-white text-[19px]">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      UpdateProfile();
                    }}
                    className="w-[40%] bg-green-500 justify-center items-center rounded-lg py-3"
                  >
                    <Text className="text-white text-[19px]">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Modal for Edit profile button Ends here */}
        </View>
        {/* Events which i have participated */}
        <View className="w-full h-[2px] bg-gray-700 mt-6 mb-2"></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Participated Events");
          }}
        >
          <View className="bg-[#2F2F42] px-4 py-4  rounded-xl flex-row items-center justify-between ">
            <View className="flex-row items-center justify-start">
              <Image
                className="w-[35px] h-[35px]"
                style={{ tintColor: "#678983" }}
                source={require("../../assets/icons/calendar.png")}
              />
              <Text className="text-[#678983] text-[19px] ml-2">
                Participated Events
              </Text>
            </View>
            <Image
              style={{ tintColor: "#678983" }}
              source={require("../../assets/icons/chevron_right.png")}
              className="w-[28px] h-[28px]"
            />
          </View>
        </TouchableOpacity>
        <View className="w-full h-[2px] bg-gray-700 mt-2 mb-2"></View>

        <Text className="text-gray-500 text-[17px]">Others</Text>
        <TouchableOpacity className="mt-3">
          <View className="bg-[#2F2F42] px-4 py-4  rounded-xl flex-row items-center justify-between ">
            <View className="flex-row items-center justify-start">
              <Image
                className="w-[35px] h-[35px]"
                style={{ tintColor: "#678983" }}
                source={require("../../assets/icons/message.png")}
              />
              <Text className="text-[#678983] text-[19px] ml-2">
                Send App Feedback
              </Text>
            </View>
            <Image
              style={{ tintColor: "#678983" }}
              source={require("../../assets/icons/chevron_right.png")}
              className="w-[28px] h-[28px]"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-3"
          onPress={() => {
            LogOut();
          }}
        >
          <View className="bg-[#2F2F42] px-4 py-4  rounded-xl flex-row items-center justify-between ">
            <View className="flex-row items-center justify-start">
              <Image
                className="w-[35px] h-[35px]"
                style={{ tintColor: "#B70404" }}
                source={require("../../assets/icons/logout.png")}
              />
              <Text className="text-[#e13f36] text-[19px] ml-2">Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* Profile body section ends here */}
    </View>
  );
};

export default Profile;
