import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";

import client from "../SanityClient";
const Categories = () => {
  const [Categories, setCategories] = useState([]);

  /* when the component render  */
  useEffect(() => {
    client
      .fetch(
        `*[_type =="category"]{
  ...,
     
  }
  `
      )
      .then(data => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      {Categories.map(cat => {
        return <Category key={cat._id} imgUri={cat.image} title={cat.name} />;
      })}
    </ScrollView>
  );
};

export default Categories;
