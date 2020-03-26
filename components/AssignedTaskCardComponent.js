import React from "react";
import { Text, View, StyleSheet } from "react-native";
import GradientButton from "react-native-gradient-buttons";

// Test Comment
const AssignedTaskCardComponent = ({
  jobType,
  date,
  location,
  time,
  buttonText,
  onPressOptOut,
  newKey
}) => (
  <View style={styles.container}>
    <View style={styles.Rone}>
      <Text style={styles.jobType}>{jobType}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>

    <Text style={styles.location}>{location}</Text>

    <View style={styles.RTwo}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.optOutButton}>
        <GradientButton
          gradientBegin="#f27821"
          gradientEnd="#ef3830"
          gradientDirection="diagonal"
          text={buttonText}
          onPress={onPressOptOut}
          style={styles.btn}
          textStyle={{ fontSize: 15 }}
          radius={15}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "gray",
    margin: 5
  },
  Rone: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10
  },
  RTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  jobType: {
    // fontFamily: "Segoe UI"
    // color:"red"
  },
  date: {
    color: "#3672BC"
  },
  btn: {
    color: "white",

    height: 40,
    width: 80
  }
  // optOutButton: {
  //   borderRadius: 10,
  //   borderWidth: 0.5,
  //   borderColor: "#d6d7da"
  // }
});

export default AssignedTaskCardComponent;
