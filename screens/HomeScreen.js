import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

import client from "../SanityClient";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);

  /* when the component render  */
  useEffect(() => {
    client
      .fetch(
        `*[_type =="featured"]{
        ...,
          resturants[]->{
            ...,
            dishes[]->
          }  
        }`
      )
      .then(data => setFeaturedCategory(data));
  }, []);

  /* when layout render */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-3  flex-1 ">
      {/*  eader */}
      <View className="flex-row pb-3 mx-4 items-center space-x-2 px-4">
        <Image
          source={{
            uri: "https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/271248472_4638296892924409_4936450570907656593_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=z_I5isx_Dq4AX-zwcoI&_nc_ht=scontent.ftun10-1.fna&oh=00_AT82_4PO7ssossfKhNiuZ34GFu4aJV7DrW5Gs9xtiZmgdg&oe=6326927B",
          }}
          className="rounded-full h-7 w-7 bg-gray-300"
        />
        <View className="flex-1">
          <Text className="text-bold text-gray-400 text-xs">
            {" "}
            Delever now !
          </Text>

          <Text className="text-bold text-xl ">
            current Location
            <ChevronDownIcon color="#00ccbb" size={20} />
          </Text>
        </View>
        <UserIcon color="#00ccbb" size={20} />
      </View>
      {/* search  */}

      <View className="flex-row items-center mx-4 pb-2">
        <View className="flex-row items-center flex-1 bg-gray-200 p-3 space-x-2">
          <MagnifyingGlassIcon color="#00ccbb" size={20} />
          <TextInput
            placeholder="restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00ccbb" size={20} />
      </View>

      {/* body */}
      <ScrollView>
        {/* cathegories component  */}
        <Categories />

        {/* featured rows one for the near offers and one for the  */}
        {featuredCategory?.map(el => {
          return (
            <FeaturedRow
              key={el._id}
              id={el._id}
              title={el.name}
              description={el.short_disc}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
