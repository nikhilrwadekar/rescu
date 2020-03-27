import React, { Component } from "react";

// Get API URL
import { API_URL } from "../../API";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  AsyncStorage
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
          postal_code: ""
        },
        availability: {
          type: "anytime",
          schedule: []
        },
        profile_picture_url: "https://source.unsplash.com/7uSrOyY1U0I/400x400",
        role: "volunteer", // Default
        name: "",
        email: "",
        password: "",
        contact_number: null,
        preferences: {
          volunteering_type: [],
          additional_skills: ""
        }
        // New User Ends
      },
      termsCheck: false,
      additionalSkill: "",
      selectedVolunteeringTypes: [],
      // Get these from the DB (Name, Picture)
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

  // If Volunteering Options Change..
  onSelectionsChange = selectedVolunteeringTypes => {
    this.setState({ selectedVolunteeringTypes });

    // Updating nested state.. currently React does not support direct nested update
    var newUser = { ...this.state.newUser };
    newUser.preferences.volunteering_type = selectedVolunteeringTypes;
    this.setState({ newUser });
  };

  handleAdditionalSkillOrService = additionalSkill => {
    this.setState({ additionalSkill });

    // Updating nested state.. currently React does not support direct nested update
    var newUser = { ...this.state.newUser };
    newUser.preferences.additional_skills = additionalSkill;
    this.setState({ newUser });
  };

  handleTermsAndConditionsCheckChange = () =>
    this.setState({ termsCheck: !this.state.termsCheck });

  // Finally save the user in the DB.. get the token and log him/her in!
  handleFinalSignUp = () => {
    if (
      this.state.termsCheck &&
      !!this.state.selectedVolunteeringTypes.length
    ) {
      // console.log(this.state.newUser);
      Axios.post(`${API_URL}/user/create`, {
        ...this.state.newUser
      })
        .then(async res => {
          const newUserData = res.data;
          // When the user is created.. navigate to home with those details! Save them into Async email
          AsyncStorage.setItem("userDetails", JSON.stringify(newUserData));
          AsyncStorage.setItem("loginType", "email");
          this.props.navigation.navigate("Home", { loginType: "email" });
        })
        .catch(err => {
          console.log(err);
          // Alert user that there was some error.. please try again.
          Alert.alert("Something went wrong", "Please try again");
        });
    } else if (!this.state.selectedVolunteeringTypes.length)
      Alert.alert(
        "Volunteering Types",
        "Please select at least one volunteering type of your choice."
      );
    else
      Alert.alert(
        "Terms and Conditions",
        "Please accept terms and conditions to continue."
      );
  };
  // When on the final screen for Sign Up..
  componentDidMount() {
    const { params } = this.props.navigation.state;
    // Get new user details from the previous screen and store it in the state
    // Updating nested state.. currently React does not support direct nested update
    var newUser = { ...this.state.newUser, ...params };
    this.setState({ newUser });
  }

  render() {
    const { navigation } = this.props;
    const { volunteeringTypes } = this.state;
    return (
      <SafeAreaView>
        {/* <Text>{JSON.stringify(this.state.newUser)}</Text>
        <Text>{JSON.stringify(this.state.selectedVolunteeringTypes)}</Text>
        <Text>{JSON.stringify(this.state.termsCheck)}</Text>
        <Text>{JSON.stringify(this.state.additionalSkill)}</Text> */}

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
