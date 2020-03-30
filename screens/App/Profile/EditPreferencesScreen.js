import React, { Component } from "react";

// Get API URL
import { API_URL } from "../../../API";

// Custom Components
import PreferencesScreenOneComponent from "../../../components/PreferencesScreenOneComponent";
import PreferencesScreenTwoComponent from "../../../components/PreferencesScreenTwoComponent";

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, AsyncStorage, Alert } from "react-native";
import Axios from "axios";
export default class EditPreferencesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // User ID
      id: "",
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
      termsCheck: true,
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

    // Updating nested state.. currently React does not support direct nested update
    var userDetails = { ...this.state.userDetails };
    userDetails.availability.schedule = timePreferences;
    this.setState({ userDetails });
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

    // Updating nested state.. currently React does not support direct nested update
    var userDetails = { ...this.state.userDetails };
    userDetails.availability.type = preference;
    this.setState({ userDetails });
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

    // Updating nested state.. currently React does not support direct nested update
    var userDetails = { ...this.state.userDetails };
    userDetails.preferences.volunteering_type = selectedVolunteeringTypes;
    this.setState({ userDetails });
  };

  handleAdditionalSkillOrService = val => {
    this.setState({ additionalSkill: val });

    // Updating nested state.. currently React does not support direct nested update
    var userDetails = { ...this.state.userDetails };
    userDetails.preferences.additional_skills = additionalSkill;
    this.setState({ userDetails });
  };

  handleTermsAndConditionsCheckChange = () =>
    this.setState({ termsCheck: !this.state.termsCheck });

  // Update User in the DB
  handleEditProfileSave = () => {
    const { id, userDetails } = this.state;

    // Serialize back into Async Storage
    AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Update User based on ID in DB
    Axios.put(`${API_URL}/user/id/${id}`, { ...userDetails })
      .then(res => {
        if (res.status == 200)
          Alert.alert("Success", "Preferences were updated.");
      })
      .catch(err => console.log(err));
  };
  // Get User Data on Mount
  componentDidMount = async () => {
    // Email Login Details

    await AsyncStorage.getItem("userDetails", (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        // Parse User Details
        const userDetails = JSON.parse(result);

        // Map it to the desired state key + save userDetails
        this.setState({
          id: userDetails._id,
          preference: userDetails.availability.type,
          addressLine: userDetails.address.street,
          city: userDetails.address.city,
          postalCode: userDetails.address.postal_code,
          country: userDetails.address.country,
          province: userDetails.address.province,
          selectedVolunteeringTypes: userDetails.preferences.volunteering_type,
          timePreferences: userDetails.availability.schedule,
          additionalSkill: userDetails.preferences.additional_skills,
          userDetails
        });
      }
    });
  };

  // Render Function
  render() {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
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
            onPressUpdate={this.handleEditProfileSave}
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
