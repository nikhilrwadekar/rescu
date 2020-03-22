import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from "react-native";

const AssignedVolunteerings = ({ buttonText, onOptionPressed }) => {
  return (
    <View>
      <TouchableHighlight style={styles.touchable} onPress={onOptionPressed}>
        <View style={styles.touchableView}>
          <Text style={styles.buttonText}>{buttonText}</Text>
          <Image
            source={require("../assets/images/next.png")}
            style={styles.nextIcon}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default AssignedVolunteerings;

const styles = StyleSheet.create({
  touchable: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 3,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    // borderWidth: 1,
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
  touchableView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
    // alignContent:"center"
  },
  buttonText: {
    color: "#383940",
    fontSize: 19,
    marginLeft: 15,
    fontFamily: "OpenSans-Regular"
  },
  nextIcon: {
    width: 20,
    height: 20,
    marginRight: 25,
    alignSelf: "flex-end",
    color: "#383940"
  }
});
