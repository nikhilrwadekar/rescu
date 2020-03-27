import React, { Component } from "react";

// Custom Components
import PreferencesScreenOneComponent from "../../components/PreferencesScreenOneComponent";
import { SafeAreaView } from "react-native";
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
    const {
      preference,
      timePreferences,
      isModalVisible,
      currentModalLabel
    } = this.state;

    return (
      <SafeAreaView>
        <PreferencesScreenOneComponent
          addMorePreferences={this.addMorePreferences}
          preference={preference}
          isModalVisible={isModalVisible}
          handleSetPreference={this.handleSetPreference}
          timePreferences={timePreferences}
          toggleModal={this.toggleModal}
          currentModalLabel={currentModalLabel}
          onChange={this.onChange}
          onPressNext={() => {
            this.props.navigation.navigate("PreferencesScreenTwo");
          }}
        />
      </SafeAreaView>
    );
  }
}
