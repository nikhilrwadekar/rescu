import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView, Alert } from "react-native";
import axios from "axios";
import { adminSocket, clientSocket } from "../../../web-sockets";
import ConfirmDeclineNotificationComponent from "../../../components/ConfirmDeclineNotificationComponent";
// API_URL
import { API_URL } from "../../../API";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedRequests: []
    };
  }

  async componentDidMount() {
    // Get User Data
    if ((await AsyncStorage.getItem("loginType")) === "email") {
      const userDetails = await AsyncStorage.getItem("userDetails");
      this.setState({ userDetails: JSON.parse(userDetails) });
    }

    this.getNotifications();

    // // Connect to Sockets
    // clientSocket.connected
    //   ? console.log("Already Connected..")
    //   : clientSocket.connect();

    // adminSocket.connected
    //   ? console.log("Already Connected..")
    //   : adminSocket.connect();

    // adminSocket.on("acceptRequest", this.getNotifications);
  }

  getNotifications = () => {
    // Get Notifications? Why are you getting requests :P
    axios
      // https://outreach.nikhilwadekar.com/api/user/mkelso@tss.com/requests/received
      .get(`${API_URL}/user/${this.state.userDetails.email}/requests/received`)
      .then(res => {
        this.setState({ receivedRequests: res.data });
      });
  };

  // Handle Decline
  handleDeclineRequest = async taskID => {
    Alert.alert("Decline Request", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Decline",
        onPress: () => {
          axios
            .post(
              `${API_URL}/user/${this.state.userDetails.email}/decline/${taskID}`
            )
            .then(res => {
              if (res.status == 200) {
                const { receivedRequests } = this.state;
                const updatedRequests = receivedRequests.filter(
                  request => request.job_id != taskID
                );
                this.setState({ receivedRequests: updatedRequests });
              }
            });
        },
        style: "destructive"
      }
    ]);
  };

  // Handle Opt In
  handleAcceptRequest = async taskID => {
    Alert.alert("Accept Request", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Accept",
        onPress: () => {
          axios
            .post(
              `${API_URL}/user/${this.state.userDetails.email}/optin/${taskID}`
            )
            .then(res => {
              if (res.status == 200) {
                const { receivedRequests } = this.state;
                const updatedRequests = receivedRequests.filter(
                  request => request.job_id != taskID
                );
                this.setState({ receivedRequests: updatedRequests });
              }
            });
        },
        style: "default"
      }
    ]);
  };

  render() {
    // Deconstruct State!
    const { receivedRequests } = this.state;

    const renderedNotifications = receivedRequests.map(notification => {
      return (
        <ConfirmDeclineNotificationComponent
          jobType={notification.job_type}
          notificationTime={notification.notificationTime}
          location={notification.location}
          date={new Date(notification.job_date).toDateString()}
          jobTime={`${notification.job_start_time} to ${notification.job_end_time}`}
          onPressConfirm={() => this.handleAcceptRequest(notification.job_id)}
          onPressDecline={() => this.handleDeclineRequest(notification.job_id)}
        />
      );
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <ScrollView style={{ paddingTop: 20 }}>
          {renderedNotifications}
        </ScrollView>
      </View>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
NotificationScreen.navigationOptions = {
  title: "Your Notifications"
};
