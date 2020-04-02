import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  Button,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Alert
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { adminSocket, clientSocket } from "../../../web-sockets";
import ConfirmDeclineNotificationComponent from "../../../components/ConfirmDeclineNotificationComponent";
import NotificationFromAdminComponent from "../../../components/NotificationFromAdminComponent";
// API_URL
import { API_URL } from "../../../API";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedRequests: [],
      confirmedRequests: [
        {
          type: "Cooking",
          location: "Some Relief Center Name",
          address: "West Vancouver Region",
          date: "02-05-2020",
          start_time: "10:00 AM",
          end_time: "12:00 PM",
          status: "Confirmed"
        },
        {
          type: "Shopping for Elderly",
          location: "Other Relief Center",
          address: "Vancouver Bay Area",
          date: "02-05-2020",
          start_time: "12:00 PM",
          end_time: "08:00 PM",
          status: "Declined"
        },
        {
          type: "Cooking",
          location: "Some Relief Center Name",
          address: "West Vancouver Region",
          date: "02-05-2020",
          start_time: "10:00 AM",
          end_time: "12:00 PM",
          status: "Confirmed"
        },
        {
          type: "Shopping for Elderly",
          location: "Other Relief Center",
          address: "Vancouver Bay Area",
          date: "02-05-2020",
          start_time: "12:00 PM",
          end_time: "08:00 PM",
          status: "Declined"
        },
        {
          type: "Cooking",
          location: "Some Relief Center Name",
          address: "West Vancouver Region",
          date: "02-05-2020",
          start_time: "10:00 AM",
          end_time: "12:00 PM",
          status: "Confirmed"
        },
        {
          type: "Shopping for Elderly",
          location: "Other Relief Center",
          address: "Vancouver Bay Area",
          date: "02-05-2020",
          start_time: "12:00 PM",
          end_time: "08:00 PM",
          status: "Declined"
        },
        {
          type: "Cooking",
          location: "Some Relief Center Name",
          address: "West Vancouver Region",
          date: "02-05-2020",
          start_time: "10:00 AM",
          end_time: "12:00 PM",
          status: "Confirmed"
        },
        {
          type: "Shopping for Elderly",
          location: "Other Relief Center",
          address: "Vancouver Bay Area",
          date: "02-05-2020",
          start_time: "12:00 PM",
          end_time: "08:00 PM",
          status: "Declined"
        }
      ]
    };
  }

  async componentDidMount() {
    // Get User Data
    const userDetails = await AsyncStorage.getItem("userDetails");
    this.setState({ userDetails: JSON.parse(userDetails) });

    // Listen to changes in Relief Centers
    clientSocket.on("reliefCenterDataChange", async data => {
      // Get the latest tasks
      this.getNotifications();
    });
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

                console.log("DONE");
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

  // Handle Refresh
  handleRefresh = () => {
    this.getNotifications();
  };

  render() {
    // Deconstruct State!
    const { receivedRequests, confirmedRequests } = this.state;

    // Requests from Admin!
    const renderedNotifications = receivedRequests.map(request => {
      return (
        <ConfirmDeclineNotificationComponent
          jobType={request.job_type}
          notificationTime={request.notificationTime}
          location={request.location}
          date={new Date(request.job_date).toDateString()}
          jobTime={`${request.job_start_time} to ${request.job_end_time}`}
          onPressConfirm={() => this.handleAcceptRequest(request.job_id)}
          onPressDecline={() => this.handleDeclineRequest(request.job_id)}
        />
      );
    });

    // Confirmation from Admin
    const renderedConfirmations = confirmedRequests.map(confirmation => {
      return (
        <NotificationFromAdminComponent
          jobType={confirmation.type}
          location={confirmation.location}
          date={confirmation.date}
          address={confirmation.address}
          confirmDeclineStatus={confirmation.status}
          // Giving color if the status is confirmed or declined
          confirmDeclineColor={{
            color:
              confirmation.status.toLowerCase() === "confirmed"
                ? "#F27821"
                : "#3672BC"
          }}
          // Checking if the status is confirmed or declined
          confirmDeclineIcon={
            confirmation.status.toLowerCase() === "confirmed" ? (
              // Rendering checked icon if status is confirmed
              <Feather name="check-circle" size={20} color="#F27821" />
            ) : (
              // Rendering cross icon if status is declined
              <AntDesign name="closecircleo" size={20} color="#3672BC" />
            )
          }
          jobTime={`${confirmation.start_time} to ${confirmation.end_time}`}
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
  title: "Your Notifications"
};
