import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Button,
  StyleSheet,
  ScrollView
} from "react-native";
import axios from "axios";
import { adminSocket, clientSocket } from "../../../web-sockets";
import { TrackingStateReason } from "expo/build/AR";
import ConfirmDeclineNotificationComponent from "../../../components/ConfirmDeclineNotificationComponent";
// API_URL
import { API_URL } from "../../../API";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedRequests: null,
      tasks: [],

      // An array having the values of notification
      values: [
        {
          jobType: "Babysitting",
          notificationTime: "10 mins ago",
          location: "426 W Georgia St, Vancouver, BC, Canada, V5V4J2",
          date: "April 2, 2020",
          jobTime: "10:00 A.M. - 2:00 P.M.",
          declineButtonText: "Decline",
          confirmButtonText: "Confirm"
        },
        {
          jobType: "Eldery Help",
          notificationTime: "15 mins ago",
          location: "502 W Pender St, Vancouver, BC, Canada, V5W1Y4",
          date: "April 10, 2020",
          jobTime: "5:30 A.M. - 1:00 P.M.",
          declineButtonText: "Decline",
          confirmButtonText: "Confirm"
        },
        {
          jobType: "Grocery shopping for elderly",
          notificationTime: "1 day ago",
          location: "1055 Homer St, Vancouver, BC, Canada, V5X6R4",
          date: "March 31, 2020",
          jobTime: "9:00 A.M. - 2:30 P.M.",
          declineButtonText: "Decline",
          confirmButtonText: "Confirm"
        },
        {
          jobType: "Cooking",
          notificationTime: "2 weeks ago",
          location: "326 Main St, Vancouver, BC, Canada, V5V4J2",
          date: "March 20, 2020",
          jobTime: "10:00 A.M. - 2:00 P.M.",
          declineButtonText: "Decline",
          confirmButtonText: "Confirm"
        },
        {
          jobType: "Driving",
          notificationTime: "3 weeks ago",
          location: "426 W Georgia St, Vancouver, BC, Canada, V5V4J2",
          date: "March 15, 2020",
          jobTime: "10:00 A.M. - 2:00 P.M.",
          declineButtonText: "Decline",
          confirmButtonText: "Confirm"
        },
        {
          jobType: "Babysitting",
          notificationTime: "3 weeks ago",
          location: "426 W Georgia St, Vancouver, BC, Canada, V5V4J2",
          date: "March 10, 2020",
          jobTime: "11:00 A.M. - 2:30 P.M.",
          declineButtonText: "Decline",
          confirmButtonText: "Confirm"
        }
      ]
    };
  }

  async componentDidMount() {
    this.getNotifications();
    const response = await axios.get(
      `${API_URL}/user/nikhilrwadekar@gmail.com/requests/received`
    );

    await AsyncStorage.setItem(
      "receivedRequests",
      JSON.stringify(response.data)
    );

    const receivedRequests = await AsyncStorage.getItem("receivedRequests");
    this.setState({ reliefCentersWithRequests: JSON.parse(receivedRequests) });

    // Connect to Sockets
    clientSocket.connected
      ? console.log("Already Connected..")
      : clientSocket.connect();

    adminSocket.connected
      ? console.log("Already Connected..")
      : adminSocket.connect();

    adminSocket.on("acceptRequest", this.getNotifications);
  }

  render() {
    // Deconstruct State!
    const { reliefCentersWithRequests, tasks } = this.state;
    const { values } = this.state;
    const renderedNotifications = values.map(notification => {
      return (
        <ConfirmDeclineNotificationComponent
          jobType={notification.jobType}
          notificationTime={notification.notificationTime}
          location={notification.location}
          date={notification.date}
          jobTime={notification.jobTime}
          declineButtonText={notification.declineButtonText}
          confirmButtonText={notification.confirmButtonText}
        />
      );
    });

    return (
      <View style={{ paddingTop: 20, backgroundColor: "#f7f7f7" }}>
        <ScrollView>{renderedNotifications}</ScrollView>
      </View>
    );

    return (
      <View>
        {/* <Text>{JSON.stringify(this.state.reliefCentersWithRequests)}</Text> */}
        {reliefCentersWithRequests &&
          reliefCentersWithRequests.map(reliefCenter => {
            const { name, location } = reliefCenter;
            return reliefCenter.requests.map(
              (request, requestIndex) => (
                <>
                  <Text>{request.type}</Text>
                  <Text>{name}</Text>
                  <Text>{location}</Text>
                  <Text>
                    {new Date(request.date).toDateString()} from{" "}
                    {request.time.start} to {request.time.end}
                  </Text>
                  <Button title="Confirm" />
                  <Button title="Decline" />
                </>
              ),
              // Pass First Map's Data Into the Other Map
              { name, location }
            );
          })}
      </View>
    );
  }
}
const styles = StyleSheet.create({});
// Navigator Options for the Screen, In this example we've set the Title
NotificationScreen.navigationOptions = {
  title: "Your Notifications"
};
