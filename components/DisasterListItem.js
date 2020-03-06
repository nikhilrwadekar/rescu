import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const DisasterListItem = ({ imgDLIUrl, location, itemExcerpt, name }) => (
  <View style={styles.mDLIContainer}>
    <View style={styles.imgDLI}>
      <Image style={{ width: "100%", height: 100 }} source={imgDLIUrl}></Image>
    </View>
    <View style={styles.DisasterListItem}>
      <Text>{location}</Text>

      <Text style={styles.DisasterListItemHeader}>{name}</Text>

      <Text style={{ flexWrap: "wrap" }}>{itemExcerpt}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  DisasterListItem: {
    flex: 1,
    width: "100%"
  },
  DisasterListItemHeader: {
    fontSize: 20
  },
  imgDLI: {
    width: "20%",
    alignSelf: "center",
    marginRight: "2%"
  },

  mDLIContainer: {
    flexDirection: "row"
  }
});
export default DisasterListItem;
