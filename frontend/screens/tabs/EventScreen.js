import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const EventScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="flex-1 bg-[#1F1F39]">
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
                    <Text className="text-[27px] text-gray-400 ">
                      Create A Event Category
                    </Text>
                    <View>
                      <TextInput
                        className="text-[19px] px-3 py-2 placeholder-gray-500 text-gray-800 bg-[#d3d3da] rounded-[10px] mt-11  "
                        placeholder="Title of Event Category"
                      />
                    </View>
                  </View>
                  <View className="w-[70%] mt-6 flex-row justify-between items-center">
                    <TouchableOpacity className="w-[45%] bg-blue-400 py-2 flex justify-center rounded-lg items-center">
                      <Text className="text-[22px] text-white ">Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
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
        </View>

        <View className="w-full flex-row justify-center py-14 px-6">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllEventsCatogary");
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
