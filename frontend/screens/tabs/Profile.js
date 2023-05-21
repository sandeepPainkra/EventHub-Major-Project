import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

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
          Alert.alert(data.message);
          navigation.navigate("Landing Screen");
        } else {
          Alert.alert(data.error);
        }
      })
      .catch((error) => console.log("Logout Error: ", error));
  };

  return (
    <View className="flex-1 bg-[#1F1F39]">
      {/* Profile header  */}

      <View className="bg-[#2F2F42] flex-row justify-start py-3 px-2">
        <TouchableOpacity>
          <View className="w-[40px] h-[40px] justify-center items-center">
            <AntDesign name="arrowleft" size={35} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="flex-1  text-center text-[26px] text-white">
          My Account
        </Text>
      </View>

      {/* Profile body section starts here */}

      <View className="flex-1 px-5">
        {/* profile image section  */}
        <View className="w-full justify-center items-center py-5">
          <TouchableOpacity className=" relative">
            <Image
              // style={{ tintColor: "" }}
              source={require("../../assets/icons/user.png")}
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
          <Text className="text-white text-[27px]">Sandeep Painkra</Text>
          <Text className="text-white text-[19px] my-2">
            samdeeppainkra@gmail.com
          </Text>
          <Text className="text-white text-[15px]">
            You don't have a bio. yet..
          </Text>
          <TouchableOpacity className="bg-blue-400 py-2 px-3 rounded-xl mt-2">
            <Text className="text-center text-white">Edit Profile</Text>
          </TouchableOpacity>
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
