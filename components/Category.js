import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../SanityClient";

const Category = ({ imgUri, title }) => {
  return (
    <TouchableOpacity className="relative mx-1">
      <Image
        source={{
          uri: urlFor(imgUri).url(),
        }}
        className="rounded w-20 h-20"
      />
      <Text className="absolute bottom-1 left-1 text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default Category;
