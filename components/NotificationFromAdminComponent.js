import React from "react";
import { Text, View, StyleSheet } from "react-native";
// import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const NotificationFromAdminComponent = ({
  jobType,
  location,
  date,
  address,
  confirmDeclineStatus,
  jobTime,
  confirmDeclineIcon
}) => (
  // Outer container
  <View style={styles.container}>
    {/* Container for icon and confim/decline status */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      {/* <Feather
        name="check-circle"
        size={20}
        color="#F27821"
        style={styles.checkIcon}
      /> */}

      <View>{confirmDeclineIcon}</View>

      <Text style={styles.confirmDeclineStatus}>{confirmDeclineStatus}</Text>
    </View>

    {/* Job type */}
    <Text style={styles.jobType}>{jobType}</Text>

    {/* Location - Name of the relief center */}
    <Text style={styles.location}>{location}</Text>

    {/* Address of the relief center*/}
    <Text style={styles.address}>{address}</Text>

    {/* Container two containing date and time */}
    <View style={styles.dateTimeContainer}>
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
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8
  },
  jobType: {
    fontSize: 17,
    fontFamily: "OpenSans-Regular",
    color: "#383940"
  },
  location: {
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    fontSize: 15
  },
  address: {
    fontFamily: "OpenSans-Regular",
    color: "#A9A9A9",
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
  },
  confirmDeclineStatus: {
    fontSize: 20,
    fontFamily: "Quicksand-Medium",
    // color: "#F27821",
    paddingLeft: 5
  }
});

// Exporting
export default NotificationFromAdminComponent;
