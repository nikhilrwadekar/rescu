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
import ListItem from "../../../components/ListItem";

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
    const { navigation } = this.props;
    const username = this.props.navigation.getParam("username");
    const user = this.props.navigation.getParam("user");
    return (
      <View style={styles.container}>
        <Text style={styles.user}>Hello, {user ? user.givenName : ""}! 😃</Text>
        <Image
          style={styles.userImage}
          source={{
            uri: user
              ? user.photoUrl
              : "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user-300x296.png"
          }}
        />
        <ScrollView></ScrollView>

        <Button
          title="Go to Home Two"
          onPress={() => {
            navigation.navigate("HomeTwo");
          }}
        />

        <Button
          title="Sign Out"
          onPress={() => {
            navigation.navigate("SignIn");
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
  }
});
