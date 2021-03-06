import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  SafeAreaView,
  AsyncStorage,
  TextInput,
  Alert,
} from "react-native";

import CardLayout from "./CardLayout";

// Connectivity
import axios from "axios";
import { clientSocket, adminSocket } from "../../../web-sockets";
import { API_URL, apiCall } from "../../../API";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      reliefCenters: [],
      userDetails: {},
    };
  }

  getTasks = async () => {
    apiCall(this.state.userDetails.accessToken, "/user/opportunities", "GET")
      .then((response) => response.data)
      .then((responseJson) => {
        const reliefCenters = responseJson.map((reliefCenter) => {
          return {
            image: {
              uri: reliefCenter.task_picture_url,
            },
            reliefCenter,
          };
        });

        this.setState({
          isLoading: false,
          reliefCenters: reliefCenters,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  };

  // From: https://medium.com/better-programming/handling-api-like-a-boss-in-react-native-364abd92dc3d
  async componentDidMount() {
    // Get User Details on login from Storage
    await AsyncStorage.getItem("userDetails", (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        this.setState({ userDetails: JSON.parse(result) });
      }
    });

    apiCall(this.state.userDetails.accessToken, "/user/opportunities", "GET")
      .then((res) => res.data)
      .then((data) => {
        const reliefCenters = data.map((reliefCenter) => {
          return {
            image: {
              uri: reliefCenter.task_picture_url,
            },
            reliefCenter,
          };
        });

        this.setState({
          isLoading: false,
          reliefCenters: reliefCenters,
        });
      })
      .catch((err) => console.log(err));

    try {
      // Logging when connected to Sockets
      clientSocket.on("connect", () => {
        console.log("Mobile Connected to Client Socket");
      });

      // Listen to changes in Relief Centers
      clientSocket.on("reliefCenterDataChange", async (data) => {
        // Get the latest tasks
        await this.getTasks();
      });

      // Alert with Broadcast
      clientSocket.on("broadcastMessage", (message) =>
        Alert.alert("New Update from Admin", message.broadcast)
      );
    } catch (error) {
      console.log("Client Socket Error:", error);
    }

    // Get Tasks
    this.getTasks();
  }

  // Handle Request Press
  handleRequestPressed = async (opportunity) => {
    // // Asking admin to get requests! via Web Sockets
    adminSocket.emit("getRequests", opportunity);

    // Do the usual updates
    apiCall(
      this.state.userDetails.accessToken,
      `/user/id/${this.state.userDetails.email}/volunteer/${opportunity.opportunity_id}`,
      "PUT"
    )
      .then((response) => {
        opportunity.opportunity_requested.push(this.state.userDetails.email);
        this.getTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <CardLayout
          onRequestPressed={this.handleRequestPressed}
          reliefCenters={this.state.reliefCenters}
        />
      </View>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
HomeScreen.navigationOptions = {
  title: "Home",
  header: null,
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  user: {
    fontSize: 25,
    flex: 1,
    textAlign: "center",
  },
  userImage: {
    width: 200,
    height: 200,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
