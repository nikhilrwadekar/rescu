import React, { Component } from "react";

import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import PreferencesScreenTwoComponent from "../../components/PreferencesScreenTwoComponent";

export default class PreferencesScreenTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  // If Volunteering Options Change..
  onSelectionsChange = selectedVolunteeringTypes => {
    this.setState({ selectedVolunteeringTypes });
  };

  handleAdditionalSkillOrService = val => {
    this.setState({ additionalSkill: val });
  };

  handleTermsAndConditionsCheckChange = () =>
    this.setState({ termsCheck: !this.state.termsCheck });

  render() {
    const { navigation } = this.props;
    const { volunteeringTypes } = this.state;
    return (
      <SafeAreaView>
        <PreferencesScreenTwoComponent
          handleTermsAndConditionsCheckChange={
            this.handleTermsAndConditionsCheckChange
          }
          termsCheck={this.state.termsCheck}
          handleAdditionalSkillOrService={this.handleAdditionalSkillOrService}
          onSelectionsChange={this.onSelectionsChange}
          volunteeringTypes={this.state.volunteeringTypes}
          selectedVolunteeringTypes={this.state.selectedVolunteeringTypes}
          onPressUpdate={() => {
            if (
              this.state.termsCheck &&
              !!this.state.selectedVolunteeringTypes.length
            )
              this.props.navigation.navigate("Home");
            else if (!this.state.selectedVolunteeringTypes.length)
              Alert.alert(
                "Volunteering Types",
                "Please select at least one volunteering type of your choice."
              );
            else
              Alert.alert(
                "Terms and Conditions",
                "Please accept terms and conditions to continue."
              );
          }}
        />
      </SafeAreaView>
    );
  }
}
