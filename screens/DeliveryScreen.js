import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";

import { XMarkIcon } from "react-native-heroicons/solid";

import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const DeliveryScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const handelXPress = () => {
    navigation.navigate("Home");
  };
  return (
    <View className="flex-1 bg-[#00ccbb] pt-10  ">
      <View className="flex-row justify-between m-5 ">
        <TouchableOpacity onPress={handelXPress}>
          <XMarkIcon size={20} color="white" className="font-bold" />
        </TouchableOpacity>
        <Text className="text-white  text-lg">Order Help</Text>
      </View>
      <View className="z-50 mx-5 bg-white rounded-md shadow-md p-5 ">
        <View className="flex-row">
          <View className="flex-1 space-y-2">
            <Text className="font-bold  text-[#00ccbb]-100">
              Estimated Arrival
            </Text>
            <Text className="font-bold text-2xl">45-55 Minutes</Text>
          </View>
          <Image
            source={require("../assets/rappi-mensajero.gif")}
            className="w-20 h-20"
          />
        </View>
        <Progress.Bar
          progress={0.3}
          width={130}
          color="#00ccbb"
          indeterminate={true}
        />
        <Text>Your order at {restaurant.title} is being prepered</Text>
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="z-0 flex-1 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_desc}
        />
      </MapView>
      <SafeAreaView className="space-x-4 flex-row bg-white border-b border-gray-200 p-3 items-center">
        <Image
          source={{
            uri: "https://scontent.ftun10-1.fna.fbcdn.net/v/t1.6435-9/193452564_2908999485979695_509473682775650520_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=e4Sm0jmgmOYAX9GO1Ny&_nc_ht=scontent.ftun10-1.fna&oh=00_AT8c5juznPXHFrQGy4l3hd1z6dIVClRZhuE5zWgySQWjqw&oe=63465442",
          }}
          className="w-14 h-14 rounded-full ml-5"
        />
        <View className="flex-1 text-xl justify-center   ">
          <Text className=" text-xl">khayri saadi </Text>
          <Text className=" text-sm  text-[#00ccbb] ">your Rider</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text className="text-[#00ccbb] font-bold text-2xl">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
