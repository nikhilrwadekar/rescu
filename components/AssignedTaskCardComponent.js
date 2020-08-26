import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Importing Outreach custom component
import OptOutButtonComponent from "./OptOutButtonComponent";

// Importing icons
import { AntDesign, Ionicons } from "@expo/vector-icons";

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
    {/* Title */}
    <View style={styles.Rone}>
      <Text style={styles.jobType}>{jobType}</Text>
    </View>

    {/* Location */}
    <Text style={styles.location}>{location}</Text>

    {/* Date Time Opt Out */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        paddingTop: 20,
      }}
    >
      {/* Date Time */}
      <View>
        {/* Date */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",

            paddingBottom: 0,
            marginBottom: 0,
          }}
        >
          <View style={{ width: 20, alignItems: "center" }}>
            <AntDesign
              name="calendar"
              size={18}
              color="#F27821"
              style={styles.nextIcon}
            />
          </View>

          <Text style={styles.date}>{date}</Text>
        </View>
        {/* Time */}
        {time !== "" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View style={{ width: 20, alignItems: "center" }}>
              <Ionicons
                name="ios-timer"
                size={18}
                color="#F27821"
                style={styles.nextIcon}
              />
            </View>

            <Text style={styles.time}>{time}</Text>
          </View>
        )}
      </View>

      {/* Opt Out */}
      {/* <OptOutButtonComponent
        buttonText="Opt Out"
        onPressUpdate={onPressOptOut}
      /> */}
    </View>
    {/* Opt Out */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      <OptOutButtonComponent
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
    // paddingBottom: 10,
  },

  jobType: {
    fontSize: 18,
    fontFamily: "OpenSans-Light",
    color: "#383940",
  },
  date: {
    fontFamily: "OpenSans-Light",
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
    fontFamily: "OpenSans-LightItalic",
    color: "#383940",
    fontSize: 15,
    opacity: 0.7,
  },
  time: {
    fontFamily: "OpenSans-Light",
    color: "#383940",
    fontSize: 15,
    paddingLeft: 5,
  },
});

export default AssignedTaskCardComponent;
