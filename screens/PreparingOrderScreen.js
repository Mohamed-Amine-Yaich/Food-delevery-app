import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <View className="flex-1 bg-[#00ccbb] justify-center items-center ">
      <Animatable.Image
      
        animation="slideInUp"
        iterationCount={1}
        source={require("../assets/cycling-bicycle.gif")}
        className="h-80 w-80 bg-[#00ccbb]"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="font-bold text-lg my-10  text-white "
      >
        Waiting for restaurant to accept your Order
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </View>
  );
};

export default PreparingOrderScreen;
