import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView
} from "react-native";
import Carousel from "react-native-snap-carousel";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";

export default class SingleDisasterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [
        {
          title: "Beautiful and dramatic Antelope Canyon",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration: "https://i.imgur.com/UYiroysl.jpg",
          description:
            "Bushfires in Australia continue to burn, placing thousands of people and millions of animals in grave danger. As of January 11th, 28 people have died, homes have been reduced to rubble, and over 6.3 million hectares of land are estimated to have been burned."
        },
        {
          title: "Earlier this morning, NYC",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/UPrs1EWl.jpg",
          description:
            "Bushfires in Australia continue to burn, placing thousands of people and millions of animals in grave danger. As of January 11th, 28 people have died, homes have been reduced to rubble, and over 6.3 million hectares of land are estimated to have been burned."
        },
        {
          title: "White Pocket Sunset",
          subtitle: "Lorem ipsum dolor sit amet et nuncat ",
          illustration: "https://i.imgur.com/MABUbpDl.jpg",
          description:
            "Bushfires in Australia continue to burn, placing thousands of people and millions of animals in grave danger. As of January 11th, 28 people have died, homes have been reduced to rubble, and over 6.3 million hectares of land are estimated to have been burned."
        },
        {
          title: "Acrocorinth, Greece",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration: "https://i.imgur.com/KZsmUi2l.jpg",
          description:
            "Bushfires in Australia continue to burn, placing thousands of people and millions of animals in grave danger. As of January 11th, 28 people have died, homes have been reduced to rubble, and over 6.3 million hectares of land are estimated to have been burned."
        },
        {
          title: "The lone tree, majestic landscape of New Zealand",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
          description:
            "Bushfires in Australia continue to burn, placing thousands of people and millions of animals in grave danger. As of January 11th, 28 people have died, homes have been reduced to rubble, and over 6.3 million hectares of land are estimated to have been burned."
        },
        {
          title: "Middle Earth, Germany",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/lceHsT6l.jpg",
          description:
            "Bushfires in Australia continue to burn, placing thousands of people and millions of animals in grave danger. As of January 11th, 28 people have died, homes have been reduced to rubble, and over 6.3 million hectares of land are estimated to have been burned."
        }
      ],
      disaster_description: "",
      disaster_image: ""
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <>
        <View key={index} style={styles.slide}>
          {/* <Text style={styles.title}>{item.title}</Text> */}
          <Image source={{ uri: item }} style={{ width: 300, height: 300 }} />
          {/* <Text style={styles.title}>{item.title}</Text> */}
          {/* <Text style={styles.subtitle}>{item.subtitle}</Text> */}
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
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <ScrollView>
          {/* <Text> Single Disaster Screen </Text> */}

          <Carousel
            layout={"default"}
            layoutCardOffset={`25`}
            ref={c => {
              this._carousel = c;
            }}
            data={disaster_image}
            renderItem={this._renderItem}
            sliderWidth={500}
            itemWidth={300}
            loop
            autoplay
            autoplayDelay={500}
            autoplayInterval={2000}
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
              marginBottom: 5
            }}
          >
            {disaster_title}
          </Text>
          <UpdateButtonProfileComponent
            buttonText="Donate"
            customStyle={{
              marginTop: 20,
              marginBottom: 20
            }}
            onPressUpdate={() => {
              const { params } = this.props.navigation.state;
              const { type } = params;

              if (type == "withoutID")
                navigation.navigate("DonatePaymentWithoutID", {
                  type: "withoutID"
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
              paddingRight: 30
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
    paddingBottom: 12
  },
  slide: {
    // backgroundColor: "red"
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.4
  }
  // subtitle: {
  //   fontFamily: "OpenSans-LightItalic",
  //   paddingLeft: 15,
  //   fontSize: 14,
  //   paddingBottom: 12,
  //   paddingRight: 20
  // }
});
