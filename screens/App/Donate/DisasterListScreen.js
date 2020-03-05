import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class DisasterListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: "Amy Farha",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          subtitle: "Vice President"
        },
        {
          name: "Chris Jackson",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          subtitle: "Vice Chairman"
        }
      ]
    };
  }

  render() {
    const { list } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        {list.map((l, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate("SingleDisaster");
            }}
          >
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
