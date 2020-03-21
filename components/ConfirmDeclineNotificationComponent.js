ConfirmDeclineNotificationComponent;

import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const ConfirmDeclineNotificationComponent = ({
  jobType,
  location,
  date,
  confirmButtonText,
  onPressConfirm,
  onPressDecline,
  declineButtonText,
  jobTime,
  notificationTime
}) => (
  <View style={styles.container}>
    <View style={styles.Rone}>
      <Text style={styles.jobType}>{jobType}</Text>
      <Text style={styles.notificationTime}>{notificationTime}</Text>
    </View>

    <Text style={styles.location}>{location}</Text>

    <View style={styles.RTwo}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.jobTime}>{jobTime}</Text>
    </View>

    <View style={styles.RTwo}>
      <View style={styles.button}>
        <Button title={declineButtonText} onPress={onPressDecline} />
      </View>
      <View style={styles.button}>
        <Button title={confirmButtonText} onPress={onPressConfirm} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10
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
  button: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});
export default ConfirmDeclineNotificationComponent;
