import React, { Component } from "react";
import { Text, StyleSheet, View, Button, AsyncStorage } from "react-native";
import AddressInput from "../../components/AdressInput";
import PostalCode from "../../components/PostalCode";

export default class PreferencesScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _retrieveData = async () => {
    try {
      const AddressInputState = await AsyncStorage.getItem("AddressInput");
      if (AddressInputState !== null) {
        // We have data!!
        console.log(AddressInputState);
        this.setState(JSON.parse(AddressInputState));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async componentDidMount() {
    this._retrieveData();
  }

  async componentDidUpdate() {
    // this._retrieveData();
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> Preferences One </Text>

        <AddressInput />
        <PostalCode />

        <Text>this is from AsyncStorage: {JSON.stringify(this.state)} </Text>
        <Button
          title="Next"
          onPress={() => {
            navigation.navigate("PreferencesScreenTwo");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
