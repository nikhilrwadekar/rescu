import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import NotificationConfirmButton from "./NotificationConfirmButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Test Comment
const AssignedTaskCardComponent = ({
  jobType,
  date,
  location,
  time,
  buttonText,
  onPressOptOut,
  newKey,
}) => (
  <View style={styles.container}>
    <View style={styles.Rone}>
      <Text style={styles.jobType}>{jobType}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AntDesign
          name="calendar"
          size={18}
          color="#F27821"
          style={styles.nextIcon}
        />
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>

    <Text style={styles.location}>{location}</Text>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="ios-timer"
          size={18}
          color="#F27821"
          style={styles.nextIcon}
        />
        <Text style={styles.time}>{time}</Text>
      </View>
      <NotificationConfirmButton
        buttonText="Opt Out"
        onPressUpdate={onPressOptOut}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 2,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
  Rone: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },

  jobType: {
    // fontFamily: "Segoe UI"
    // color:"red"
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    color: "#383940",
  },
  date: {
    // color: "#3672BC"
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15,
    paddingLeft: 5,
  },
  btn: {
    color: "white",

    height: 40,
    width: 80,
  },
  location: {
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15,
  },
  time: {
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15,
    paddingLeft: 5,
  },
});

export default AssignedTaskCardComponent;
