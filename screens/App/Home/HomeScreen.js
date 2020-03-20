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
  Alert
} from "react-native";

import CardLayout from "./CardLayout";

import { clientSocket, adminSocket } from "../../../web-sockets";

const API_URL = "http://localhost:4000/api";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      reliefCenters: []
    };
  }

  getTasks = async () => {
    fetch(`${API_URL}/user/opportunities`)
      .then(response => response.json())
      .then(responseJson => {
        const reliefCenters = responseJson.map(reliefCenter => {
          return {
            image: {
              uri: reliefCenter.picture_url
            },
            reliefCenter
          };
        });

        this.setState({
          isLoading: false,
          reliefCenters: reliefCenters
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  };

  // From: https://medium.com/better-programming/handling-api-like-a-boss-in-react-native-364abd92dc3d
  async componentDidMount() {
    await AsyncStorage.getItem("googleSignInDetails", (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        this.setState({ googleDetails: result });
      }
    });

    // Logging when connected to Sockets
    clientSocket.on("connect", () => {
      console.log("Mobile Connected to Client Socket");
    });

    // Alert with Broadcast
    clientSocket.on("broadcastMessage", message =>
      Alert.alert("New Update from Admin", message.broadcast)
    );

    // Get Tasks
    this.getTasks();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }

    return <CardLayout reliefCenters={this.state.reliefCenters} />;
  }
}

// Navigator Options for the Screen, In this example we've set the Title
HomeScreen.navigationOptions = {
  title: "Home",
  header: null
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  user: {
    fontSize: 25,
    flex: 1,
    textAlign: "center"
  },
  userImage: {
    width: 200,
    height: 200,
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
