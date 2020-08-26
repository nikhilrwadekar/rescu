import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  Button,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { adminSocket, clientSocket } from "../../../web-sockets";
import ConfirmDeclineNotificationComponent from "../../../components/ConfirmDeclineNotificationComponent";
import NotificationFromAdminComponent from "../../../components/NotificationFromAdminComponent";
// API_URL
import { API_URL, apiCall } from "../../../API";

// Moment!
import moment from "moment";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedRequests: [],
      notifications: [],
    };
  }

  async componentDidMount() {
    // Get User Data
    const userDetails = await AsyncStorage.getItem("userDetails");
    this.setState({ userDetails: JSON.parse(userDetails) });

    // Listen to changes in Relief Centers
    clientSocket.on("notificationDataChange", async (data) => {
      // Get the latest tasks
      this.getNotifications();
    });
    this.getNotifications();
  }

  getNotifications = () => {
    // Get Notifications? Why are you getting requests :P

    apiCall(
      this.state.userDetails.accessToken,
      `/user/${this.state.userDetails.email}/requests/received`,
      "GET"
    ).then((res) => {
      this.setState({ receivedRequests: res.data });
    });

    apiCall(
      this.state.userDetails.accessToken,
      `/notification/volunteer/${this.state.userDetails.email}`,
      "GET"
    ).then((res) => {
      this.setState({ notifications: res.data });
    });
  };

  // Handle Decline
  handleDeclineRequest = async (taskID) => {
    Alert.alert("Decline Request", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Decline",
        onPress: () => {
          apiCall(
            this.state.userDetails,
            `/user/${this.state.userDetails.email}/decline/${taskID}`,
            "POST"
          ).then((res) => {
            if (res.status == 200) {
              const { receivedRequests } = this.state;
              const updatedRequests = receivedRequests.filter(
                (request) => request.job_id != taskID
              );
              this.setState({ receivedRequests: updatedRequests });

              console.log("DONE");
            }
          });
        },
        style: "destructive",
      },
    ]);
  };

  // Handle Opt In
  handleAcceptRequest = async (taskID) => {
    Alert.alert("Accept Request", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Accept",
        onPress: () => {
          apiCall(
            this.state.userDetails,
            `/user/${this.state.userDetails.email}/optin/${taskID}`,
            "POST"
          ).then((res) => {
            if (res.status == 200) {
              const { receivedRequests } = this.state;
              const updatedRequests = receivedRequests.filter(
                (request) => request.job_id != taskID
              );
              this.setState({ receivedRequests: updatedRequests });
            }
          });
        },
        style: "default",
      },
    ]);
  };

  // Handle Refresh
  handleRefresh = () => {
    this.getNotifications();
  };

  render() {
    // Deconstruct State!
    const { receivedRequests, notifications } = this.state;

    // Requests from Admin!
    const renderedNotifications = receivedRequests.map((request) => {
      return (
        <ConfirmDeclineNotificationComponent
          jobType={request.job_type}
          notificationTime={request.notificationTime}
          location={request.location}
          date={
            request.job_date
              ? moment(request.job_date).format("Do MMMM YYYY")
              : "Any time"
          }
          jobTime={
            request.job_date
              ? `${moment(request.job_start_time).format(
                  "hh:MM A"
                )} to ${moment(request.job_end_time).format("hh:MM A")}`
              : ""
          }
          onPressConfirm={() => this.handleAcceptRequest(request.job_id)}
          onPressDecline={() => this.handleDeclineRequest(request.job_id)}
        />
      );
    });

    // Confirmation from Admin
    const renderedConfirmations = notifications.map((notification) => {
      return (
        <NotificationFromAdminComponent
          jobType={notification.task_name}
          location={notification.location}
          date={moment(notification.date).format("Do MMMM YYYY")}
          address={notification.address}
          confirmDeclineStatus={notification.status}
          jobTime={`${moment(notification.start_time).format(
            "hh:MM A"
          )} to ${moment(notification.end_time).format("hh:MM A")}`}
        />
      );
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.handleRefresh} />
          }
          style={{ paddingTop: 20 }}
        >
          {renderedNotifications}
          {renderedConfirmations}
        </ScrollView>
      </View>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
NotificationScreen.navigationOptions = {
  title: "Your Notifications",
};
