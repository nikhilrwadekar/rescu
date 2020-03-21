import React, { Component } from "react";

// React Native
import {
  Text,
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

// Custom Components
import AddressInput from "../../components/AdressInput";
import PostalCode from "../../components/PostalCode";
import ButtonLink from "../../components/ButtonLink";
import TimeAvailability from "../../components/TimeAvailability";
import DateTimeModal from "../../components/DateModal";

export default class PreferencesScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preference: "anytime",
      preferenceCount: 1,
      timePreferences: [
        { key: 1, date: Date(), start_time: Date(), end_time: Date() }
      ],
      // State Variables from Jasmine's DateModal
      isModalVisible: false,
      dateSelected: new Date(),
      lastPressedPreference: ""
    };
  }

  // When one of the preferences change.. update those!
  onChange = (event, date) => {
    // Get the Key for the Preference
    const key = this.state.lastPressedPreference.split(" ")[0];

    // Get which part of the Preference to update
    const keyToUpdate = this.state.lastPressedPreference.split(" ")[1];

    // Get the Preferences array from the state
    let timePreferences = this.state.timePreferences;

    // Find the preference concerned in the Array
    var foundIndex = timePreferences.findIndex(x => x.key == key);

    // If it's time we're updating, convert it to a human readable text first.
    // if (keyToUpdate != "date")
    //   timePreferences[foundIndex][keyToUpdate] = new Date(date)
    // .toLocaleString(
    //     "en-US",
    //     {
    //       hour: "numeric",
    //       minute: "numeric",
    //       hour12: true
    //     }
    //   );
    // Else just store the entire Data string
    // else
    timePreferences[foundIndex][keyToUpdate] = date;

    // Lastly.. update the set with the updated Array!
    this.setState({ timePreferences });
  };

  setCurrentPreferenceIndex = key => {
    console.log(key);
  };

  // Toggle Modal Function  from Jasmine's DateModal
  toggleModal = key => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      lastPressedPreference: key
    });
  };

  // ENDS
  // ======================
  // Handle Set Preference
  handleSetPreference = preference => {
    this.setState({ preference });
  };

  // Add More Preferences
  addMorePreferences = () => {
    this.setState({ preferenceCount: this.state.preferenceCount + 1 });
    let timePreferences = this.state.timePreferences;
    timePreferences.push({
      key: timePreferences.length + 1,
      date: Date(),
      start_time: Date(),
      end_time: Date()
    });
  };

  // Render Function
  render() {
    const { navigation } = this.props;
    const { preference, timePreferences } = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
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
          {preference == "preferred" && (
            <View>
              {/* Map Date Modal */}
              {timePreferences.map(timePreference => (
                // Preference - Date & Time
                <View key={timePreference.key}>
                  <DateTimeModal
                    key={`${timePreference.key} start_time`}
                    label="Start Time"
                    onChange={this.onChange}
                    toggleModal={() =>
                      this.toggleModal(`${timePreference.key} start_time`)
                    }
                    mode="time"
                    dateSelected={new Date(timePreference.start_time)}
                    displayText={timePreference.start_time.toLocaleString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                      }
                    )}
                    isModalVisible={this.state.isModalVisible}
                  />
                  <DateTimeModal
                    key={`${timePreference.key} end_time`}
                    label="End Time"
                    onChange={this.onChange}
                    toggleModal={() =>
                      this.toggleModal(`${timePreference.key} end_time`)
                    }
                    mode="time"
                    dateSelected={new Date(timePreference.end_time)}
                    displayText={timePreference.end_time.toLocaleString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                      }
                    )}
                    isModalVisible={this.state.isModalVisible}
                  />
                  <DateTimeModal
                    key={`${timePreference.key} date`}
                    label="Choose a Date"
                    onChange={this.onChange}
                    toggleModal={() =>
                      this.toggleModal(`${timePreference.key} date`)
                    }
                    mode="date"
                    dateSelected={new Date(timePreference.date)}
                    displayText={timePreference.date}
                    isModalVisible={this.state.isModalVisible}
                  />
                </View>
              ))}

              {/* Button to Add More Preferences */}
              <Button title="Add More" onPress={this.addMorePreferences} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
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
