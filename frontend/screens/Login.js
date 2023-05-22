import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../redux/actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const LoginAccount = async () => {
    fetch("http://10.0.2.2:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data);
          setEmail("");
          setPassword("");
          dispatch(getUserProfile(data.user));
          const token = data.user.token;
          const user = JSON.stringify(data.user);
          // console.log("JsonValue Token is :", token);
          AsyncStorage.setItem("token", token);
          AsyncStorage.setItem("user", user);
          Alert.alert(data.message);
          navigation.navigate("Parent");
        } else {
          Alert.alert(data.message);
        }
      })
      .catch((err) => console.log("Error is :", err));
  };
  return (
    <SafeAreaView className="flex-1 bg-[#1F1F39]">
      <View className="pt-6 pb-3 mt-9 px-5">
        <Text className="text-white text-[40px] font-lighter">Log In</Text>
      </View>
      <View className="w-full h-[85%] bg-[#2F2F42] px-6 py-8 rounded-t-[20px]  ">
        <View>
          <Text className="text-[18px] text-gray-500 ">Your Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter your email id"
            className="  text-[19px] px-4 py-3 placeholder-gray-500 text-white bg-[#3E3E55] rounded-[10px]  "
          />
        </View>
        <View className="mt-10">
          <Text className="text-[18px] text-gray-500 ">Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            className="  text-[19px] px-4 py-3 text-white bg-[#3E3E55] rounded-[10px]   placeholder-white "
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity>
          <Text className="text-gray-500 text-[15px] text-right mt-1 ">
            Reset Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("MobileVerification");
            LoginAccount();
          }}
          className="w-full bg-[#3D5CFF]  rounded-lg mt-8"
        >
          <Text className="text-white text-[20px] text-center py-4 ">
            Log In
          </Text>
        </TouchableOpacity>

        <View className="w-full flex flex-row justify-center items-center mt-7 ">
          <Text className="text-[16px] text-gray-400">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text className="text-blue-600">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
