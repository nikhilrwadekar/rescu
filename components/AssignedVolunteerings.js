import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from "react-native";

const AssignedVolunteerings = () => {
  return (
    <View>
      <TouchableHighlight style={styles.touchable}>
        <View style={styles.touchableView}>
          <Text style={styles.buttonText}>Assigned Opportunities</Text>
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
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15
  },
  touchableView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
    // alignContent:"center"
  },
  buttonText: {
    color: "black",
    fontSize: 22,
    marginLeft: 15
  },
  nextIcon: {
    width: 20,
    height: 20,
    marginRight: 25,
    alignSelf: "flex-end"
  }
});
