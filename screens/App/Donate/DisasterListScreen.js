import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import DonationListItem from "../../../components/DonationListItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export class DisasterListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgDLIUrl: { uri: "https://reactnative.dev/img/tiny_logo.png" },
      location: "8850 Osler St, Vancouver, BC V6P 4G2",
      itemExcerpt:
        "Buddhist Compassion Relief Tzu Chi Foundation, Canada is founded by its CEO, Mr. Gary Ho, in 1992 under the inspiration of Dharma Master Cheng Yen to inaugurate Tzu Chi’s good works in Canada"
    };
  }

  render() {
    const { itemExcerpt, imgDLIUrl, location } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SingleDisaster");
          }}
        >
          <DonationListItem
            itemExcerpt={itemExcerpt}
            imgDLIUrl={imgDLIUrl}
            location={location}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});

export default DisasterListScreen;
