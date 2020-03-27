import React, { Component } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AssignedVolunteerings = ({ buttonText, onOptionPressed }) => {
  return (
    <View>
      <TouchableHighlight style={styles.touchable} onPress={onOptionPressed}>
        <View style={styles.touchableView}>
          <Text style={styles.buttonText}>{buttonText}</Text>
          <AntDesign
            name="right"
            size={18}
            color="#F27821"
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
    marginBottom: 20,
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
  touchableView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  buttonText: {
    color: "#383940",
    fontSize: 19,
    marginLeft: 15,
    fontFamily: "OpenSans-Regular"
  },
  nextIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
    alignSelf: "center",
    color: "#F27821"
  }
});
