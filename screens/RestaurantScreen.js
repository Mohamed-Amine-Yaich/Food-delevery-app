import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../SanityClient";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import restaurant from "../delevroo-clone/schemas/restaurant";

const RestaurantScreen = () => {
  const {
    params: {
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
    },
  } = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const handelPressback = () => {
    navigation.goBack();
  };

  return (
    <>
      <BasketIcon />
      <ScrollView>
        {/* img and back button container */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View
          className="relative" /*  style={{ top: -StatusBar.currentHeight }} */
        >
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 "
          />
          <Pressable
            className="bg-red-400 p-2 absolute top-5 left-5 bg-gray-100 rounded-full "
            onPress={handelPressback}
          >
            <ArrowLeftIcon size={20} color={"#00ccbb"} />
          </Pressable>
        </View>

        {/* name of the restaurant and some details  */}

        <View className="px-4 py-5 bg-white">
          <Text className="font-bold text-3xl ">{title}</Text>
          <View className="space-x-1 my-1 flex-row items-center">
            {/* rating .offers adress */}
            <StarIcon size={15} color={"green"} opacity={0.5} />
            <Text className="text-xs text-green-600">{rating} . offers</Text>
            <MapPinIcon size={15} color={"green"} opacity={0.5} />
            <Text className="text-xs text-green-600">Nearby . {address}</Text>
          </View>
          {/* description */}
          <Text className="text-xl text-green-600 b">{short_desc}</Text>
        </View>

        {/* pressable for alergic people */}
        <TouchableOpacity className=" bg-white space-x-2 flex-row items-center p-4 border-y border-gray-300 ">
          <QuestionMarkCircleIcon size={20} color={"gray"} opacity={0.6} />
          <Text className="font-bold text-xl flex-1"> Have a food alergy?</Text>
          <ChevronRightIcon size={20} color={"#00ccbb"} />
        </TouchableOpacity>

        {/* Menu */}

        <ScrollView className="mb-40">
          <Text className="px-4 pt-6 pb-4 font-bold text-xl "> Menu </Text>

          {/* render restaurant dishes */}

          {dishes.map(dish => {
            return <DishRow key={dish._id} dish={dish} />;
          })}
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
