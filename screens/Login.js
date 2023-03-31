import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#1F1F39]">
      <View className="pt-6 pb-3 mt-9 px-5">
        <Text className="text-white text-[40px] font-lighter">Log In</Text>
      </View>
      <View className="w-full h-[85%] bg-[#2F2F42] px-6 py-8 rounded-t-[20px]  ">
        <View>
          <Text className="text-[18px] text-gray-500 ">Your Email</Text>
          <TextInput
            placeholder="Enter your email id"
            className="  text-[19px] px-4 py-3 placeholder-gray-500 text-white bg-[#3E3E55] rounded-[10px]  "
          />
        </View>
        <View className="mt-10">
          <Text className="text-[18px] text-gray-500 ">Password</Text>
          <TextInput
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
          onPress={() => navigation.navigate("MobileVerification")}
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
