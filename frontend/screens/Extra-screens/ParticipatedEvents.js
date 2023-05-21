import { View, Text, Image } from "react-native";
import React from "react";
import ParticipatedEventComponent from "./ParticipatedEventComponent";

const ParticipatedEvents = () => {
  return (
    <View className="flex-1 px-4 bg-[#1F1F39]">
      <ParticipatedEventComponent
        image={require("../../assets/audy.jpg")}
        title="Football,Sport Event"
        status="close"
      />
      <ParticipatedEventComponent
        image={require("../../assets/audy.jpg")}
        title="Football,Sport Event"
        status="close"
      />
    </View>
  );
};

export default ParticipatedEvents;
