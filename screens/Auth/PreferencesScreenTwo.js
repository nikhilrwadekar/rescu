import React, { Component } from "react";

// Get API URL
import { API_URL, apiCall } from "../../API";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  AsyncStorage,
} from "react-native";
import PreferencesScreenTwoComponent from "../../components/PreferencesScreenTwoComponent";
import Axios from "axios";

export default class PreferencesScreenTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        // New User Starts - This will be updated with the Data provided from the previous screen
        address: {
          street: "",
          city: "",
          country: "Canada",
          province: "",
          postal_code: "",
        },
        availability: {
          type: "anytime",
          schedule: [],
        },
        profile_picture_url: "https://source.unsplash.com/7uSrOyY1U0I/400x400",
        role: "volunteer", // Default
        name: "",
        email: "",
        password: "",
        contact_number: null,
        preferences: {
          volunteering_type: [],
          additional_skills: "",
        },
        // New User Ends
      },
      termsCheck: false,
      additionalSkill: "",
      selectedVolunteeringTypes: [],
      // Get these from the DB (Name, Picture)
      volunteeringTypes: [],
    };
  }

  // If Volunteering Options Change..
  onSelectionsChange = (selectedVolunteeringTypes) => {
    this.setState({ selectedVolunteeringTypes });

    // Updating nested state.. currently React does not support direct nested update
    var newUser = { ...this.state.newUser };
    newUser.preferences.volunteering_type = selectedVolunteeringTypes;
    this.setState({ newUser });
  };

  handleAdditionalSkillOrService = (additionalSkill) => {
    this.setState({ additionalSkill });

    // Updating nested state.. currently React does not support direct nested update
    var newUser = { ...this.state.newUser };
    newUser.preferences.additional_skills = additionalSkill;
    this.setState({ newUser });
  };

  handleTermsAndConditionsCheckChange = () =>
    this.setState({ termsCheck: !this.state.termsCheck });

  // Get Voluteering Types from DB
  getVolunteeringTypesFromDB = () => {
    // Axios.get(`${API_URL}/volunteering-type`)
    apiCall("", "/volunteering-type", "GET")
      .then((res) => res.data)
      .then((volunteeringTypesFromDB) => {
        let volunteeringTypes = volunteeringTypesFromDB.map(
          (volunteeringType) => volunteeringType.name
        );
        this.setState({ volunteeringTypes });
      });
  };

  // Finally save the user in the DB.. get the token and log him/her in!
  handleFinalSignUp = async () => {
    if (this.state.termsCheck) {
      console.log("Trying to go past apiCall...");

      const response = await apiCall("", "/user/create", "POST", {
        ...this.state.newUser,
      });

      // const response = await Axios.post(`${API_URL}/user/create`, {
      //   ...this.state.newUser,
      // });

      console.log("Response:", response);
      const newUserData = response.data;
      // When the user is created.. navigate to home with those details! Save them into Async email
      await AsyncStorage.setItem("userDetails", JSON.stringify(newUserData));

      await AsyncStorage.setItem("loginType", "email");
      this.props.navigation.navigate("Home");
    } else
      Alert.alert(
        "Terms and Conditions",
        "Please accept terms and conditions to continue."
      );

    try {
    } catch (error) {
      console.log(error);
      // Alert user that there was some error.. please try again.
      Alert.alert("Something went wrong", "Please try again");
    }
  };

  // When on the final screen for Sign Up..
  async componentDidMount() {
    const { params } = this.props.navigation.state;
    // Get new user details from the previous screen and store it in the state
    // Updating nested state.. currently React does not support direct nested update
    var newUser = { ...this.state.newUser, ...params };

    // Get Volunteering Types
    this.getVolunteeringTypesFromDB();

    const userType = await AsyncStorage.getItem("signUpType");
    newUser.type = userType;
    this.setState({ newUser });
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#f7f7f7" }}>
        <Text>{this.state.type}</Text>
        <PreferencesScreenTwoComponent
          handleTermsAndConditionsCheckChange={
            this.handleTermsAndConditionsCheckChange
          }
          termsCheck={this.state.termsCheck}
          handleAdditionalSkillOrService={this.handleAdditionalSkillOrService}
          onSelectionsChange={this.onSelectionsChange}
          volunteeringTypes={this.state.volunteeringTypes}
          selectedVolunteeringTypes={this.state.selectedVolunteeringTypes}
          onPressUpdate={this.handleFinalSignUp}
        />
      </SafeAreaView>
    );
  }
}
