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
// import DateTimeModal from "../../components/DateModal";

import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { Card } from "react-native-elements";

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
      currentModalLabel: "",
      currentKey: 1
    };
  }

  // When one of the preferences change.. update those!
  onChange = (event, date) => {
    const { timePreferences, currentKey, currentModalLabel } = this.state;

    const keyToUpdate =
      currentModalLabel == "Date"
        ? "date"
        : currentModalLabel == "Start Time"
        ? "start_time"
        : "end_time";

    // Find the preference concerned in the Array
    var foundIndex = timePreferences.findIndex(x => x.key == currentKey);

    timePreferences[foundIndex][keyToUpdate] = date;
    // Lastly.. update the set with the updated Array!
    this.setState({ timePreferences });
  };

  setCurrentPreferenceIndex = key => {
    console.log(key);
  };

  // Toggle Modal Function  from Jasmine's DateModal
  toggleModal = (key, label) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      currentModalLabel: label,
      currentKey: key
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
              {timePreferences.map((timePreference, index) => (
                // Preference - Date & Time
                <View key={timePreference.key}>
                  {/* Buttons for Date, Start Time, and End Time */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      title={
                        timePreference.date
                          ? `${new Date(timePreference.date).toDateString()} `
                          : new Date().toDateString()
                      }
                      onPress={() =>
                        this.toggleModal(timePreference.key, "Date")
                      }
                    />
                    <Button
                      title={new Date(
                        timePreference.start_time
                      ).toLocaleTimeString()}
                      onPress={() =>
                        this.toggleModal(timePreference.key, "Start Time")
                      }
                    />
                    <Button
                      title={new Date(
                        timePreference.end_time
                      ).toLocaleTimeString()}
                      onPress={() =>
                        this.toggleModal(timePreference.key, "End Time")
                      }
                    />
                  </View>

                  {/* The Modal that Conditionally Renders based on which Button is clicked */}
                  <Modal
                    onBackdropPress={this.toggleModal}
                    isVisible={this.state.isModalVisible}
                    style={{ flex: 1 }}
                  >
                    {/* View inside the Modal! */}
                    <View>
                      <Card>
                        {/* Dynamic Label - Date, Start Time OR End Time */}
                        <Text>{this.state.currentModalLabel}</Text>
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={
                            new Date(
                              this.state.currentModalLabel == "Date"
                                ? timePreference.date
                                : this.state.currentModalLabel == "Start Time"
                                ? timePreference.start_time
                                : timePreference.end_time
                            )
                          }
                          mode={
                            this.state.currentModalLabel == "Date"
                              ? "date"
                              : "time"
                          }
                          display="default"
                          onChange={this.onChange}
                        />
                      </Card>
                    </View>
                  </Modal>
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
