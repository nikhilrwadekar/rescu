import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const DisasterListItem = ({ imgDLIUrl, location, itemExcerpt, name }) => (
  <View style={styles.mDLIContainer}>
    <View style={styles.imgDLI}>
      <Image
        style={{ width: "100%", height: 100, borderRadius: 10 }}
        source={imgDLIUrl}
      ></Image>
    </View>
    <View style={styles.DisasterListItem}>
      <Text style={styles.DisasterListItemHeader}>{name}</Text>

      <View style={styles.locationIcon}>
        <EvilIcons name="location" size={18} color="#F27821" />
        <Text
          style={{
            fontFamily: "OpenSans-LightItalic",
            fontSize: 13,
            alignSelf: "center",
            color: "#383940",
            fontSize: 14
          }}
        >
          {location}
        </Text>
      </View>

      <Text
        style={{
          flexWrap: "wrap",
          fontFamily: "OpenSans-Light",
          marginTop: 3,
          color: "#383940"
        }}
      >
        {itemExcerpt}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  DisasterListItem: {
    flex: 1,
    width: "100%"
  },
  DisasterListItemHeader: {
    fontSize: 19,
    fontFamily: "OpenSans-Regular",
    color: "#383940"
  },
  imgDLI: {
    width: "25%",
    alignSelf: "center",
    marginRight: "2%"
  },

  mDLIContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.4
  },
  locationIcon: {
    flex: 1,
    flexDirection: "row"
  }
});
export default DisasterListItem;
