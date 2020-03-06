import React, { Component } from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

export default class SingleDisasterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [
        {
          title: "Beautiful and dramatic Antelope Canyon",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration: "https://i.imgur.com/UYiroysl.jpg"
        },
        {
          title: "Earlier this morning, NYC",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/UPrs1EWl.jpg"
        },
        {
          title: "White Pocket Sunset",
          subtitle: "Lorem ipsum dolor sit amet et nuncat ",
          illustration: "https://i.imgur.com/MABUbpDl.jpg"
        },
        {
          title: "Acrocorinth, Greece",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration: "https://i.imgur.com/KZsmUi2l.jpg"
        },
        {
          title: "The lone tree, majestic landscape of New Zealand",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/2nCt3Sbl.jpg"
        },
        {
          title: "Middle Earth, Germany",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/lceHsT6l.jpg"
        }
      ]
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={{ uri: item.illustration }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> Single Disaster Screen </Text>

        <Carousel
          layout={"default"}
          layoutCardOffset={`25`}
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={500}
          itemWidth={300}
          loop
          autoplay
          autoplayDelay={500}
          autoplayInterval={2000}
          // sliderWidth={sliderWidth}
          // itemWidth={itemWidth}
        />

        <Button
          title="Donate"
          onPress={() => {
            navigation.navigate("Donate");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
    // backgroundColor: "white"
  },
  slide: {
    backgroundColor: "red"
  }
});
