import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import ImageCarousel from "../../../components/ImageCarousel";
import AvailabilityTimePreferenceComponent from "../../../components/AvailabilityTimePreferenceComponent";

import pic from "../../../assets/images/profile.jpeg";

export default class NotificationScreen extends Component {
  render() {
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
