ConfirmDeclineNotificationComponent;

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import NotificationConfirmButton from "./NotificationConfirmButton";
import NotificationDeclineButton from "./NotificationDeclineButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ConfirmDeclineNotificationComponent = ({
  jobType,
  location,
  date,
  onPressConfirm,
  onPressDecline,
  jobTime,
  notificationTime
}) => (
  // Other container
  <View style={styles.container}>
    {/* Container one includes job type and notification time */}
    <View style={styles.Rone}>
      <Text style={styles.jobType}>{jobType}</Text>
      <Text style={styles.notificationTime}>{notificationTime}</Text>
    </View>

    {/* Location */}
    <Text style={styles.location}>{location}</Text>

    {/* Container two containing date and time */}
    <View style={styles.RTwo}>
      {/* Calendar icon and date */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
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

      {/* Time icon and job time */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <Ionicons
          name="ios-timer"
          size={18}
          color="#F27821"
          style={styles.nextIcon}
        />
        <Text style={styles.jobTime}>{jobTime}</Text>
      </View>
    </View>

    {/* Confirm and decline buttons */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12
      }}
    >
      {/* Decline button */}
      <View style={styles.button}>
        <NotificationDeclineButton
          buttonText="Decline"
          onPressUpdate={onPressDecline}
        />
      </View>

      {/* Confirm button */}
      <View style={styles.button}>
        <NotificationConfirmButton
          buttonText="Confirm"
          onPressUpdate={onPressConfirm}
        />
      </View>
    </View>
  </View>
);

// Styles
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
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.4
  },
  Rone: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8
  },
  RTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8
  },
  button: {
    paddingBottom: 8
  },
  jobType: {
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    color: "#383940"
  },
  notificationTime: {
    fontFamily: "OpenSans-Light",
    color: "#383940"
  },
  location: {
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15
  },
  jobTime: {
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15,
    paddingLeft: 5
  },
  date: {
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15,
    paddingLeft: 5
  }
});
export default ConfirmDeclineNotificationComponent;
