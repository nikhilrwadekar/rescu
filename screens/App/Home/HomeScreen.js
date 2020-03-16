import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  SafeAreaView,
  AsyncStorage,
  TextInput
} from "react-native";
import io from "socket.io-client";

import CardLayout from "./CardLayout";

const API_URL = "http://localhost:4000/api";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      reliefCenters: []
    };
  }

  // From: https://medium.com/better-programming/handling-api-like-a-boss-in-react-native-364abd92dc3d
  async componentDidMount() {
    this.socket = io("http://127.0.0.1:5000");
    this.socket.on("volunteerToAdminRequest", () => {
      console.log(
        "Request has been sent and captured successfully by Socket.io!"
      );
    });

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

    await AsyncStorage.getItem("googleSignInDetails", (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        this.setState({ googleDetails: result });
      }
    });
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
