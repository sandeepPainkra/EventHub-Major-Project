import { View, Text, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { config } from "../config";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const RegisterAccount = async () => {
    fetch(`http://${config.IP_ADDRESS}:5000/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data);
          Alert.alert(data.message);
          navigation.navigate("Login");
        } else {
          Alert.alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView className="flex-1 bg-[#1F1F39]">
      <View className="pt-6 pb-3 mt-0 px-5">
        <Text className="text-white text-[40px] font-light">Sign Up</Text>
        <Text className="text-white mt-0">
          Enter your details below & free sign up
        </Text>
      </View>
      <View className="w-full h-[85%] bg-[#2F2F42] px-6 py-8 rounded-t-[20px]  ">
        <View>
          <Text className="text-[18px] text-gray-500 ">Enter Name</Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Enter name"
            className="  text-[19px] px-4 py-3 placeholder-gray-500 text-white bg-[#3E3E55] rounded-[10px]  "
          />
        </View>
        <View className="mt-6">
          <Text className="text-[18px] text-gray-500 ">
            Enter Your Email Id
          </Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter email id"
            className="  text-[19px] px-4 py-3 placeholder-gray-500 text-white bg-[#3E3E55] rounded-[10px]  "
          />
        </View>

        <View className="mt-6">
          <Text className="text-[18px] text-gray-500 ">Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            className="  text-[19px] px-4 py-3 text-white bg-[#3E3E55] rounded-[10px]   placeholder-white "
            secureTextEntry={true}
          />
        </View>
        <View className="mt-6">
          <Text className="text-[18px] text-gray-500 ">Confirm Password</Text>
          <TextInput
            onChangeText={(text) => setCpassword(text)}
            value={cpassword}
            placeholder="Password"
            className="  text-[19px] px-4 py-3 text-white bg-[#3E3E55] rounded-[10px]   placeholder-white "
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Login");
            RegisterAccount();
          }}
          className="w-full bg-[#3D5CFF]  rounded-lg mt-8"
        >
          <Text className="text-white text-[20px] text-center py-4 ">
            Create Account
          </Text>
        </TouchableOpacity>

        <View className="w-full flex flex-row justify-center items-center mt-7 ">
          <Text className="text-[16px] text-gray-400">
            Allredy have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text className="text-blue-600">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
