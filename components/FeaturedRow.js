import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import RestaurantCard from "./RestaurantCard";
import restaurant from "../delevroo-clone/schemas/restaurant";
import client from "../SanityClient";

const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  /* get a  restaurent by id */
  useEffect(() => {
    client
      .fetch(
        `*[ _type =="featured" && _id == $id]{
        ...,
          resturants[]->{
            ...,
            dishes[]->
          }  
        }`,
        { id }
      )
      .then(data => setRestaurants(data[0].resturants));
  }, []);

  

  return (
    <View className="mx-4 space-y-1 ">
      {/* header of feature */}
      <View className="flex-row items-center justify-between mt-4 ">
        <Text className="text-xl font-bold">{title}</Text>
        <ArrowRightIcon color={"#00ccbb"} size={25} />
      </View>
      <Text className="text-xs text-gray-400  ">{description}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* restaurant card */}

        {restaurants.map(restaurant => {
          return (
            <RestaurantCard
              key={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={4.2}
              dishes={restaurant.dishes}
              address={restaurant.adress}
              short_desc={restaurant.short_desc}
              lat={restaurant.lat}
              long={restaurant.long}
              category={restaurant.category}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
