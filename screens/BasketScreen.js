import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import { XCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectTotalItemsPrice,
} from "../features/basketSlice";
import { urlFor } from "../SanityClient";

const BasketScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const restaurant = useSelector(selectRestaurant);
  const total = useSelector(selectTotalItemsPrice);
  const items = useSelector(selectBasketItems);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  //how to access the prop of an object
  //Dot property accessor requires identifiers
  //Choose the dot property accessor when the property name is known ahead of time.
  //. Square brackets property accessor
  //Choose the square brackets property accessor when the property name is dynamic, i.e. determined at runtime.
  //Object destructuring
  //Choose the object destructuring when you'd like to create a variable having the property value.
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  //console.log(groupedItemsInBasket);
  const handelXIconPress = () => {
    navigation.goBack();
  };

  const handelRemovePress = key => {
    dispatch(removeFromBasket({ id: key }));
  };

  return (
    <View className="flex-1">
      <StatusBar hidden={true} />
      <View className="flex-row bg-white items-center p-2  ">
        <View className="flex-1 items-center ">
          <Text>basket</Text>
          <Text>{restaurant.title}</Text>
        </View>
        <TouchableOpacity onPress={handelXIconPress}>
          <XCircleIcon
            size={40}
            color="#00ccbb"
            className="absolute left-5 top-5"
          />
        </TouchableOpacity>
      </View>

      <View className="space-x-2 flex-row bg-white my-5 p-3 items-center">
        <Image
          source={{
            uri: "https://scontent.ftun10-1.fna.fbcdn.net/v/t1.6435-9/193452564_2908999485979695_509473682775650520_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yN3THCAdfm0AX8B8mPv&_nc_ht=scontent.ftun10-1.fna&oh=00_AT9eB_Mt3d0P8Z6l42w741EehsZ6lDEe58YWZHGiTqEO7g&oe=63465442",
          }}
          className="w-10 h-10 rounded-full"
        />
        <Text className="flex-1">delevery in 50-75 min</Text>
        <TouchableOpacity>
          <Text className="text-[#00ccbb]">change</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
        {groupedItemsInBasket
          ? Object.keys(groupedItemsInBasket).map(key => {
              return (
                <View
                  key={key}
                  className="space-x-2 flex-row bg-white border-b border-gray-200 p-3 items-center"
                >
                  <Text className="">{groupedItemsInBasket[key].length} X</Text>
                  <Image
                    source={{
                      uri: urlFor(groupedItemsInBasket[key][0].image).url(),
                    }}
                    className="w-14 h-14 rounded-full"
                  />
                  <Text className="flex-1">
                    {groupedItemsInBasket[key][0].name}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      handelRemovePress(groupedItemsInBasket[key][0]._id)
                    }
                  >
                    <Text className="text-[#00ccbb]">remove</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </ScrollView>
      <View className=" bg-white space-y-2 p-1">
        <View className="flex-row p-3">
          <Text className="text-[#00ccbb] flex-1">Subtotal</Text>
          <Text className="text-[#00ccbb]">£ {total}</Text>
        </View>
        <View className="flex-row p-3">
          <Text className="text-[#00ccbb] flex-1">Delevery Fee</Text>
          <Text className="text-[#00ccbb]">£ 2.5</Text>
        </View>
        <View className="flex-row p-3">
          <Text className="text-[#00ccbb] flex-1">Order Total</Text>
          <Text className="font-bold">£ {total + 2.5} </Text>
        </View>
        <View className="  w-full my-3 ">
          <TouchableOpacity
            className=" p-4 bg-[#00ccbb]  mx-5  rounded items-center"
            onPress={() => {
              navigation.navigate("preparingOrder");
            }}
          >
            <Text className=" text-white font-bold text-ellipsis">
              View basket
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasketScreen;
