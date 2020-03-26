import React, { Component } from "react";

// Custom Components
import PreferencesScreenOneComponent from "../../../components/PreferencesScreenOneComponent";
import PreferencesScreenTwoComponent from "../../../components/PreferencesScreenTwoComponent";

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, AsyncStorage } from "react-native";
export default class EditPreferencesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Screen One
      preference: "anytime",
      preferenceCount: 1,
      timePreferences: [
        { key: 1, date: Date(), start_time: Date(), end_time: Date() }
      ],
      isModalVisible: false,
      dateSelected: new Date(),
      currentModalLabel: "",
      currentKey: 1,

      // Screen Two
      termsCheck: false,
      selectedVolunteeringTypes: [],
      volunteeringTypes: [
        "Driving",
        "Swimming",
        "Medical Assistance",
        "Lifting Weight",
        "Cooking",
        "Babysitting",
        "Petsitting",
        "Elderly Care"
      ]
    };
  }

  // Address Input STARTS
  // onProvinceChange
  handleProvinceChange = province => this.setState({ province });

  // onAddressLineChange
  handleAddressLineChange = addressLine => this.setState({ addressLine });

  // onCityChange
  handleCityChange = city => this.setState({ city });

  // onPostalCodeChange
  handlePostalCodeChange = postalCode => this.setState({ postalCode });
  // Address Input ENDs

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

  // Modal for selected date/start time/end time
  toggleModal = (key, label) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      currentModalLabel: label,
      currentKey: key
    });
  };

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

  // Preferences Screen Two
  onSelectionsChange = selectedVolunteeringTypes => {
    this.setState({ selectedVolunteeringTypes });
  };

  handleAdditionalSkillOrService = val => {
    this.setState({ additionalSkill: val });
  };

  handleTermsAndConditionsCheckChange = () =>
    this.setState({ termsCheck: !this.state.termsCheck });

  // Get User Data on Mount
  componentDidMount = async () => {
    // Email Login Details
    if ((await AsyncStorage.getItem("loginType")) == "email") {
      await AsyncStorage.getItem("userDetails", (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          const userDetails = JSON.parse(result);
          this.setState({
            preference: userDetails.availability.type,
            addressLine: userDetails.address.street,
            city: userDetails.address.city,
            postalCode: userDetails.address.postal_code,
            country: userDetails.address.country,
            province: userDetails.address.province
          });
        }
      });
    }
  };

  // Render Function
  render() {
    const { navigation } = this.props;
    const {
      addressLine,
      city,
      province,
      postalCode,
      country,
      preference,
      timePreferences,
      isModalVisible,
      currentModalLabel
    } = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
          {/* Preferences Screen One - Componentized */}
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
            addMorePreferences={this.addMorePreferences}
            preference={preference}
            isModalVisible={isModalVisible}
            handleSetPreference={this.handleSetPreference}
            timePreferences={timePreferences}
            toggleModal={this.toggleModal}
            currentModalLabel={currentModalLabel}
            onChange={this.onChange}
            onPressNext={() => {}}
          />

          {/* Preferences Screen Two - Componentized */}
          <PreferencesScreenTwoComponent
            handleTermsAndConditionsCheckChange={
              this.handleTermsAndConditionsCheckChange
            }
            termsCheck={this.state.termsCheck}
            handleAdditionalSkillOrService={this.handleAdditionalSkillOrService}
            onSelectionsChange={this.onSelectionsChange}
            volunteeringTypes={this.state.volunteeringTypes}
            selectedVolunteeringTypes={this.state.selectedVolunteeringTypes}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
