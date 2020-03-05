import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const DonationListItem = ({ imgDLIUrl, location, itemExcerpt }) => (
  <View style={styles.mDLIContainer}>
    <View style={styles.imgDLI}>
      <Image style={{ width: 50, height: 50 }} source={imgDLIUrl}></Image>
    </View>
    <View style={styles.DonationaListItem}>
      <Text>{location}</Text>
      <Text style={{ flexWrap: "wrap" }}>{itemExcerpt}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  DonationListItem: {
    flex: 1,
    backgroundColor: "#0f0",
    width: "100%"
  },

  imgDLI: {
    alignSelf: "flex-start",
    marginRight: "2%"
  },

  mDLIContainer: {
    flexDirection: "row"
  }
});
export default DonationListItem;
