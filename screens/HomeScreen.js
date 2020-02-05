import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollViewComponent
} from "react-native";
import ListItem from "../components/ListItem";

_signOutAsync = async () => {
  await AsyncStorage.clear();
  this.props.navigation.navigate("Auth");
};
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListItem name="Test" />
          <ListItem name="Test" />
          <ListItem name="Test" />
          <ListItem name="Test" />
          <ListItem name="Test" />
          <ListItem name="Test" />
        </ScrollView>

        <Button
          title="Go to Home Two"
          onPress={() => {
            this.props.navigation.navigate("HomeTwo");
          }}
        />
      </View>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
HomeScreen.navigationOptions = {
  title: "Home"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
