import React, { Component } from "react";
import { Text, View, AsyncStorage, Button } from "react-native";
import axios from "axios";

// API_URL
const API_URL = "http://10.0.0.11:4000/api";
export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedRequests: null
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      `${API_URL}/user/nikhilrwadekar@gmail.com/requests/received`
    );

    await AsyncStorage.setItem(
      "receivedRequests",
      JSON.stringify(response.data)
    );

    const receivedRequests = await AsyncStorage.getItem("receivedRequests");
    this.setState({ reliefCentersWithRequests: JSON.parse(receivedRequests) });
  }

  render() {
<<<<<<< HEAD
    return (
      <View style={styles.carouselContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImageCarousel txt={"jkk"} imageUri={pic} />
          <ImageCarousel txt={"jkk"} imageUri={pic} />
          <ImageCarousel txt={"jkk"} imageUri={pic} />
        </ScrollView>

        {/* <AvailabilityTimePreferenceComponent
          timeLabel={"Start Time"}
          timeTextPlaceHolder={"8.00"}
          onPressTime={"vv"}  
        /> */}
=======
    // Deconstruct State!
    const { reliefCentersWithRequests } = this.state;

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
>>>>>>> 86351bdbc0d0df4f54be96d740ce28ac896d50be
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
