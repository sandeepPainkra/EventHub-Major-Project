import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./drawer/Home";
import DrawerNavigator from "./drawer/DrawerNavigator";

const Drawer = createDrawerNavigator();

const Parent = () => {
  return (
    <View className="flex-1">
      <DrawerNavigator />
    </View>
  );
};

export default Parent;
