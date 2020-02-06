import React from "react";
import { Text, View } from "react-native";

const ListItem = ({ name }) => (
  <View>
    <Text style={{ fontSize: 35 }}>ListItem - {name}</Text>
  </View>
);

export default ListItem;
