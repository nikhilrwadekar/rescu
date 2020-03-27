import React, { Component } from "react";

// Custom Components
import PreferencesScreenOneComponent from "../../components/PreferencesScreenOneComponent";
import { SafeAreaView, Text } from "react-native";
export default class PreferencesScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      addressLine: "157 W, 49th Ave",
      city: "Vancouver",
      province: "British Columbia",
      postalCode: "V5Y2Z7",
      country: "Canada",
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

  // Toggle Modal Function from Jasmine's DateModal
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

  // Handle Address Change -- START
  handleAddressLineChange = addressLine => this.setState({ addressLine });
  handleCityChange = city => this.setState({ city });
  handleProvinceChange = province => this.setState({ province });
  handlePostalCodeChange = postalCode => this.setState({ postalCode });
  handleCountryChange = country => this.setState({ country });

  // Handle Address Change -- END

  // Handle Second Screen Navigation
  handleGoToFinalSignUpScreen = () => {
    this.props.navigation.navigate("PreferencesScreenTwo", {
      // This is structured the way Mongo anticipates it
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      availability: {
        type: this.state.preference,
        schedule: this.state.timePreferences
      },
      address: {
        street: this.state.addressLine,
        city: this.state.city,
        country: this.state.country,
        province: this.state.province,
        postal_code: this.state.postalCode
      }
    });
  };

  // When it mounts, check if it has data from navigation params (While Signing Up)
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { name, email, password } = params;
    if (!!name && !!email && !!password) {
      this.setState({ name, email, password });
    }
  }
  // Render Function
  render() {
    const { navigation } = this.props;
    const {
      addressLine,
      city,
      province,
      country,
      postalCode,
      preference,
      timePreferences,
      isModalVisible,
      currentModalLabel
    } = this.state;

    return (
      <SafeAreaView>
        {/* <Text>{JSON.stringify(this.state.timePreferences)}</Text> */}
        <PreferencesScreenOneComponent
          addressLine={addressLine}
          onAddressLineChange={this.handleAddressLineChange}
          city={city}
          onCityChange={this.handleCityChange}
          province={province}
          onProvinceChange={this.handleProvinceChange}
          postalCode={postalCode}
          onPostalCodeChange={this.handlePostalCodeChange}
          country={country}
          onCountryChange={this.handleCountryChange}
          onPressNext
          addMorePreferences={this.addMorePreferences}
          preference={preference}
          isModalVisible={isModalVisible}
          handleSetPreference={this.handleSetPreference}
          timePreferences={timePreferences}
          toggleModal={this.toggleModal}
          currentModalLabel={currentModalLabel}
          onChange={this.onChange}
          onPressNext={this.handleGoToFinalSignUpScreen}
        />
      </SafeAreaView>
    );
  }
}
