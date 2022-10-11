import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectTotalItemsPrice,
} from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  /* restaurant state (keep track of the current restaurant) */
  const total = useSelector(selectTotalItemsPrice);

  const navigation = useNavigation();
  const handelNavigation = () => {
    navigation.navigate("Basket");
  };

  if (items.length <= 0) {
    return;
  }

  return (
    <View className="absolute z-50 bottom-10 w-full  ">
      <TouchableOpacity
        className="space-x-2 p-4 bg-[#00ccbb]  mx-5 flex-row rounded items-center"
        onPress={handelNavigation}
      >
        <Text className="p-2 bg-gray-600  text-white font-bold">
          {items.length}
        </Text>
        <Text className="flex-1  text-white font-bold">View basket</Text>
        <Text className=" text-white font-bold">£{total}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
