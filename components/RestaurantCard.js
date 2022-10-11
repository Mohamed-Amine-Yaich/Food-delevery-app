import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../SanityClient";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  address,
  short_desc,
  dishes,
  long,
  lat,
  category,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="shodow rounded-sm bg-white mr-2 mb-1 shadow-2xl "
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          address,
          short_desc,
          dishes,
          long,
          lat,
          category,
        });
      }}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className=" w-64 h-36 rounded-sm"
      />
      <View className="p-3 space-y-1  ">
        <Text className="font-bold ">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon size={15} color={"green"} />
          <Text className="text-xs text-gray-400 items-center ">
            <Text className="text-xs text-green-600 items-center ">
              {rating}
            </Text>{" "}
            . Offers
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon size={15} color={"#00ccbb"} />
          <Text className="text-xs text-gray-400 ">Nearby {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
