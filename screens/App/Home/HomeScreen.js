import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
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
  componentDidMount() {
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

    return (
      <SafeAreaView>
        <Text>Hello! Data was Loaded!</Text>
        <Text>{JSON.stringify(this.state.reliefCenters)}</Text>
      </SafeAreaView>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
HomeScreen.navigationOptions = {
  title: "Home",
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
