import React, { Component } from "react";

// Custom Components
import PreferencesScreenOneComponent from "../../components/PreferencesScreenOneComponent";
import { SafeAreaView, Text, Alert, AsyncStorage } from "react-native";
export default class PreferencesScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      profile_picture_url: "https://source.unsplash.com/7uSrOyY1U0I/400x400",
      addressLine: "",
      city: "",
      province: "",
      postalCode: "",
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

    this.setState({ timePreferences });
  };

  // Handle Delete Preference
  handleDeletePreference = preferenceKey => {
    let timePreferences = this.state.timePreferences;
    let updatedTimePreferences = timePreferences.filter(timePreference => {
      let isPreferenceLocal = !!timePreference.key;
      let isPreferenceFromDB = !!timePreference._id;

      if (isPreferenceLocal) return timePreference.key !== preferenceKey;

      if (isPreferenceFromDB) return timePreference._id !== preferenceKey;
    });

    this.setState({ timePreferences: updatedTimePreferences });
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
    if (
      !!this.state.addressLine &&
      !!this.state.city &&
      !!this.state.province &&
      !!this.state.postalCode
    ) {
      this.props.navigation.navigate("PreferencesScreenTwo", {
        // This is structured the way Mongo anticipates it
        email: this.state.email,
        password: this.state.password,
        profile_picture_url: this.state.profile_picture_url,
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
    } else {
      Alert.alert("Incomplete Details", "Please fill in all fields.");
    }
  };

  // When it mounts, check if it has data from navigation params (While Signing Up)
  async componentDidMount() {
    // Check Sign Up Type
    if ((await AsyncStorage.getItem("signUpType")) == "google") {
      // If Google Sign Up..
      const { params } = this.props.navigation.state;
      const { user, refreshToken, accessToken, idToken } = params;
      const { email, familyName, givenName, id, name, photoUrl } = user;
      // Get Google ID?, Email, Name, handle skipping the password..
      if (!!name && !!email) {
        this.setState({ name, email, profile_picture_url: photoUrl });
      }

      Alert.alert(
        `Hello, ${name}!`,
        `Before we get started, please fill in a few details.`
      );
    } else if ((await AsyncStorage.getItem("signUpType")) == "facebook") {
      // If Facebook Sign Up..
      const { params } = this.props.navigation.state;
      const { email, name, profile_picture_url } = params;

      // Get Facebook ID?, Email, Name, handle skipping the password..
      if (!!name && !!email) {
        this.setState({ name, email, profile_picture_url });
      }

      Alert.alert(
        `Hello, ${name}!`,
        `Before we get started, please fill in a few details.`
      );
    } else if ((await AsyncStorage.getItem("signUpType")) == "email") {
      // If Email Sign Up
      const { params } = this.props.navigation.state;
      const { name, email, password } = params;
      if (!!name && !!email && !!password) {
        this.setState({ name, email, password });
      }

      Alert.alert(
        `Hello, ${name}!`,
        `Before we get started, please fill in a few details.`
      );
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
      currentModalLabel,
      onPressNext
    } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: "#f7f7f7", flex: 1 }}>
        {/* <Text>{JSON.stringify(this.state.timePreferences)}</Text> */}
        <PreferencesScreenOneComponent
          onDeletePreference={this.handleDeletePreference}
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
          addMorePreferences={this.addMorePreferences}
          preference={preference}
          isModalVisible={isModalVisible}
          handleSetPreference={this.handleSetPreference}
          timePreferences={timePreferences}
          toggleModal={this.toggleModal}
          currentModalLabel={currentModalLabel}
          onChange={this.onChange}
          onPressNext={this.handleGoToFinalSignUpScreen}
          isNextVisible={true}
        />
      </SafeAreaView>
    );
  }
}
