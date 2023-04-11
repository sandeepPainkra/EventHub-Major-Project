import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

const Register = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
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
            placeholder="Enter name"
            className="  text-[19px] px-4 py-3 placeholder-gray-500 text-white bg-[#3E3E55] rounded-[10px]  "
          />
        </View>
        <View className="mt-6">
          <Text className="text-[18px] text-gray-500 ">
            Enter Your Email Id
          </Text>
          <TextInput
            placeholder="Enter email id"
            className="  text-[19px] px-4 py-3 placeholder-gray-500 text-white bg-[#3E3E55] rounded-[10px]  "
          />
        </View>

        <View className="mt-6">
          <Text className="text-[18px] text-gray-500 ">Password</Text>
          <TextInput
            placeholder="Password"
            className="  text-[19px] px-4 py-3 text-white bg-[#3E3E55] rounded-[10px]   placeholder-white "
            secureTextEntry={true}
          />
        </View>
        <View className="mt-6">
          <Text className="text-[18px] text-gray-500 ">Confirm Password</Text>
          <TextInput
            placeholder="Password"
            className="  text-[19px] px-4 py-3 text-white bg-[#3E3E55] rounded-[10px]   placeholder-white "
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          className="w-full bg-[#3D5CFF]  rounded-lg mt-8"
        >
          <Text className="text-white text-[20px] text-center py-4 ">
            Create Account
          </Text>
        </TouchableOpacity>
        {/* <View>
          <Text>
            By creating an account you have to agree with our them &
            condication.
          </Text>
        </View> */}
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
