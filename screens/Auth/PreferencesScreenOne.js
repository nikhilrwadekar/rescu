import React, { Component } from "react";
import { Text, StyleSheet, View, Button, AsyncStorage } from "react-native";
import AddressInput from "../../components/AdressInput";
import PostalCode from "../../components/PostalCode";
import ButtonLink from "../../components/ButtonLink";
import TimeAvailability from "../../components/TimeAvailability";
import DateModal from "../../components/DateModal";
export default class PreferencesScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preference: "anytime"
    };
  }

  // Handle Set Preference
  handleSetPreference = preference => {
    this.setState({ preference });
  };

  // Render Function
  render() {
    const { navigation } = this.props;
    const { preference } = this.state;

    return (
      <View>
        {/* PreferencesScreenOne */}
        <Text style={styles.textHeader}> Preferences </Text>

        <AddressInput />
        <PostalCode />

        <ButtonLink
          text="Next"
          onPress={() => {
            navigation.navigate("PreferencesScreenTwo");
          }}
        />

        {/* Select Preference */}
        <TimeAvailability
          setPreference={this.handleSetPreference}
          preference={preference}
        />

        {/* If Preference is 'preferred' Show DateTimePicker */}

        {preference == "preferred" && <DateModal />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textHeader: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 25,
    fontFamily: "Quicksand-Medium"
  }
});
