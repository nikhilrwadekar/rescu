import React from "react";

// React Native
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  ScrollView,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// Custom Components
import SelectMultiple from "react-native-select-multiple";
import AdditionalSkillComponent from "./AdditionalSkillComponent";
import AcceptTermsConditionsComponent from "./AcceptTermsConditionsComponent";
import UpdateButtonProfileComponent from "./UpdateButtonProfileComponent";

const PreferencesScreenTwoComponent = ({
  handleTermsAndConditionsCheckChange,
  handleAdditionalSkillOrService,
  onSelectionsChange,
  selectedVolunteeringTypes,
  volunteeringTypes,
  termsCheck,
  onPressUpdate,
}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f7f7f7",
        // paddingLeft: 40,
        // paddingRight: 40,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <ScrollView>
        <Text style={styles.typestextLabel}>Types of Volunteering</Text>

        {/* Multiple Select for Volunteering Types */}
        <SelectMultiple
          labelStyle={styles.label}
          items={volunteeringTypes}
          selectedItems={selectedVolunteeringTypes}
          onSelectionsChange={onSelectionsChange}
          style={{ borderRadius: 10 }}
        />

        {/* Additional Skill Section */}
        <AdditionalSkillComponent
          additionalSkillTextLabel="Additional Skill or Service"
          onGetText={handleAdditionalSkillOrService}
        />

        {/* Accept Terms And Conditions */}
        <AcceptTermsConditionsComponent
          textAcceptTermsConditions="I agree to the terms and conditions."
          checkboxValue={termsCheck}
          onCheckboxValueChange={handleTermsAndConditionsCheckChange}
        />

        {/* Save and Continue */}
        <UpdateButtonProfileComponent
          buttonText="Save"
          customStyle={{ marginTop: 10, marginBottom: 50 }}
          onPressUpdate={onPressUpdate}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesScreenTwoComponent;

const styles = StyleSheet.create({
  typestextLabel: {
    textAlign: "left",
    marginTop: 22,
    fontSize: 17,
    fontFamily: "OpenSans-Regular",
    marginBottom: 2,
    // marginLeft: 22
  },
  label: {
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
  },
});
