import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Alert,
  ScrollView
} from "react-native";
import SelectMultiple from "react-native-select-multiple";
import AdditionalSkillComponent from "../../components/AdditionalSkillComponent";
import AcceptTermsConditionsComponent from "../../components/AcceptTermsConditionsComponent";
import UpdateButtonProfileComponent from "../../components/UpdateButtonProfileComponent";

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
    const {
      volunteeringTypes,
      termsCheck,
      selectedVolunteeringTypes
    } = this.state;
    return (
      <View>
        <ScrollView>
          <Text style={styles.typestextLabel}>Types of Volunteering</Text>

          {/* Multiple Select for Volunteering Types */}
          <SelectMultiple
            labelStyle={styles.label}
            items={volunteeringTypes}
            selectedItems={this.state.selectedVolunteeringTypes}
            onSelectionsChange={this.onSelectionsChange}
          />

          {/* Additional Skill Section */}
          <AdditionalSkillComponent
            additionalSkillTextLabel="Additional Skill or Service"
            onGetText={this.handleAdditionalSkillOrService}
          />

          {/* Accept Terms And Conditions */}
          <AcceptTermsConditionsComponent
            textAcceptTermsConditions="I agree to the terms and conditions"
            checkboxValue={termsCheck}
            onCheckboxValueChange={this.handleTermsAndConditionsCheckChange}
          />

          {/* Save and Continue */}
          <UpdateButtonProfileComponent
            buttonText="Save"
            onPressUpdate={() => {
              if (termsCheck && !!selectedVolunteeringTypes.length)
                navigation.navigate("Home");
              else if (!selectedVolunteeringTypes.length)
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  typestextLabel: {
    textAlign: "left",
    marginTop: 22,
    fontSize: 17,
    fontFamily: "OpenSans-Light",
    marginLeft: 22
  },
  label: {
    fontFamily: "OpenSans-Light",
    fontSize: 15
  }
});
