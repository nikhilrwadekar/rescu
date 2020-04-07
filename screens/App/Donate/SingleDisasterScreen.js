import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 300;

export default class SingleDisasterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disaster_description: "",
      disaster_image: "",
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <>
        <View key={index} style={styles.slide}>
          {/* <Text style={styles.title}>{item.title}</Text> */}
          <Image
            source={{ uri: item }}
            style={styles.slideInnerContainer}
            // style={{ width: 300, height: 300 }}
          />
        </View>
      </>
    );
  };

  // componentDidMount() {
  //   const { params } = this.props.navigation.state;
  //   const { disaster_description, disaster_image } = params;

  //   this.setState({ disaster_description, disaster_image });
  // }

  render() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    const { disaster_description, disaster_image, disaster_title } = params;

    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7", paddingTop: 20 }}>
        <ScrollView>
          {/* <Text> Single Disaster Screen </Text> */}

          <Carousel
            layout={"default"}
            // layoutCardOffset={100}
            ref={(c) => {
              this._carousel = c;
            }}
            data={disaster_image}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            loop
            // enableSnap
            autoplay
            // autoplayDelay={0}
            // autoplayInterval={2000}
          />

          <Text
            style={{
              paddingRight: 50,
              fontFamily: "OpenSans-Light",
              marginBottom: 0,
              fontSize: 24,
              paddingLeft: 30,
              paddingRight: 30,
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            {disaster_title}
          </Text>
          <UpdateButtonProfileComponent
            buttonText="Donate"
            customStyle={{
              marginTop: 20,
              marginBottom: 20,
            }}
            onPressUpdate={() => {
              const { params } = this.props.navigation.state;
              const { type } = params;

              if (type == "withoutID")
                navigation.navigate("DonatePaymentWithoutID", {
                  type: "withoutID",
                });
              else if (type == "withID")
                navigation.navigate("DonatePaymentWithID", { type: "withID" });
            }}
            style={{ marginTop: 0 }}
          />
          <Text
            style={{
              paddingRight: 50,
              fontFamily: "OpenSans-Light",
              marginBottom: 0,
              fontSize: 16,
              paddingLeft: 30,
              paddingRight: 30,
              // marginTop: 5,
              // marginBottom: 5
            }}
          >
            {disaster_description}
          </Text>

          {/* <Button
          title="Donate"
          onPress={() => {
            navigation.navigate("Donate");
          }}
        /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    // fontWeight: "bold",
    backgroundColor: "white",
    paddingTop: 12,
    // paddingBottom: 12,
    paddingLeft: 15,
    fontFamily: "Quicksand-Medium",
    fontSize: 19,
    paddingBottom: 12,
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    // paddingHorizontal: horizontalMargin,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },

  slideInnerContainer: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
});
