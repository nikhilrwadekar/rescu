import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";

_signOutAsync = async () => {
  await AsyncStorage.clear();
  this.props.navigation.navigate("Auth");
};
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
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
