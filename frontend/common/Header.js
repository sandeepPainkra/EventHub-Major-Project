import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { config } from "../config";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Header = ({ leftIcon, rightIcon, onClickLeftIcon }) => {
  const navigation = useNavigation();
  const [visible, setVisiblity] = useState(false);
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
    await fetch(`http://${config.IP_ADDRESS}:5000/api/user/logout`, {
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
    <View className="bg-[#2F2F42] flex-row justify-between items-center w-full h-[60px] px-[20px]">
      <TouchableOpacity
        onPress={() => {
          onClickLeftIcon();
        }}
      >
        <Image
          className="w-[35px] h-[35px] "
          tintColor="white"
          source={leftIcon}
        />
      </TouchableOpacity>
      <View>
        <Text className=" italic text-white text-[28px] font-lighter tracking-[3px] ">
          EventHub
        </Text>
      </View>
      <TouchableOpacity>
        <Image
          className="w-[35px] h-[35px] "
          // tintColor="white"
          source={rightIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
