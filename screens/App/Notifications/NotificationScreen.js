import React, { Component } from "react";
import { Text, View, AsyncStorage, Button, StyleSheet } from "react-native";
import axios from "axios";
import { adminSocket, clientSocket } from "../../../web-sockets";
import { TrackingStateReason } from "expo/build/AR";
// API_URL
const API_URL = "http://localhost:4000/api";
export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedRequests: null,
      tasks: []
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

  // Get Notifications!
  getNotifications = async () => {
    const tasks = axios.get(`${API_URL}/user/nikhilrwadekar@gmail.com/tasks`);
    this.setState({ tasks: tasks.data });
  };

  render() {
    // Deconstruct State!
    const { reliefCentersWithRequests, tasks } = this.state;

    return (
      <View>
        <Text>{JSON.stringify(tasks)}</Text>
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
const styles = StyleSheet.create({
  carouselConatiner: {
    height: 130,
    marginTop: 20
  }
});
// Navigator Options for the Screen, In this example we've set the Title
NotificationScreen.navigationOptions = {
  title: "Your Notifications"
};
