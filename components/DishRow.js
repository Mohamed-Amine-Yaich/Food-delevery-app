import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../SanityClient";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsById,
} from "../features/basketSlice";

const DishRow = ({ dish }) => {
  /* dish object containe dish name , dish price , short_desc ,img*/

  const [IsPressed, setIsPressd] = useState(false);

  const items = useSelector(selectBasketItems);
  const itemsById = useSelector(state =>
    selectBasketItemsById(state, dish._id)
  );

  const dispatch = useDispatch();

  const HandelMinusPress = () => {
    //console.log(dish._id);
    dispatch(removeFromBasket({ id: dish._id }));
  };

  const HandelPlusPress = () => {
    dispatch(addToBasket({ ...dish }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressd(!IsPressed)}
        className={`bg-white flex-row items-center p-4   border border-gray-300 relative ${
          IsPressed && "border-b-0"
        } `}
      >
        <View className="space-y-2 flex-1">
          <Text className="text-xl">{dish.name}</Text>
          <Text className="text-[#00ccbb]">{dish.short_desc}</Text>
          <Text className="text-[#00ccbb]"> £ {dish.price}</Text>

          {/* plus and minus buttons */}
        </View>
        <Image
          source={{ uri: urlFor(dish.image).url() }}
          className="w-20 h-20"
        />
      </TouchableOpacity>
      {IsPressed ? (
        <View className="bg-white flex-row px-4 space-x-2 items-center ">
          <TouchableOpacity
            disabled={itemsById.length <= 0}
            onPress={HandelMinusPress}
          >
            <MinusCircleIcon
              size={40}
              color={itemsById.length <= 0 ? "#00bbbb" : "#00ccbb"}
            />
          </TouchableOpacity>
          <Text>{itemsById.length}</Text>
          <TouchableOpacity onPress={HandelPlusPress}>
            <PlusCircleIcon size={40} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default DishRow;
