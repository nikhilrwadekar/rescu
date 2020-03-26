import React from "react";
// React Native
import {
  Text,
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Custom Components
import AddressInput from "./AdressInput";
import PostalCode from "./PostalCode";
import ButtonLink from "./ButtonLink";
import TimeAvailability from "./TimeAvailability";
// import DateTimeModal from "./DateModal";

import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { Card } from "react-native-elements";

const PreferencesScreenOneComponent = ({
  addressLine,
  onAddressLineChange,
  city,
  onCityChange,
  province,
  onProvinceChange,
  postalCode,
  onPostalCodeChange,
  country,
  onCountryChange,
  isModalVisible,
  handleSetPreference,
  timePreferences,
  toggleModal,
  currentModalLabel,
  onChange,
  addMorePreferences,
  preference,
  onPressNext
}) => {
  return (
    <ScrollView>
      {/* PreferencesScreenOne */}
      <Text style={styles.textHeader}> Preferences </Text>

      <AddressInput
        addressLine={addressLine}
        onAddressLineChange={onAddressLineChange}
        city={city}
        onCityChange={onCityChange}
        province={province}
        onProvinceChange={onProvinceChange}
        country={country}
        onCountryChange={onCountryChange}
      />
      <PostalCode
        postalCode={postalCode}
        onPostalCodeChange={onPostalCodeChange}
      />

      <ButtonLink text="Next" onPress={onPressNext} />

      {/* Select Preference */}
      <TimeAvailability
        setPreference={handleSetPreference}
        preference={preference}
      />

      {/* If Preference is 'preferred' Show DateTimePicker */}
      {preference == "preferred" && (
        <View>
          {/* Map Date Modal */}
          {timePreferences.map((timePreference, index) => (
            // Preference - Date & Time
            <View key={timePreference.key}>
              {/* Buttons for Date, Start Time, and End Time */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Button
                  title={
                    timePreference.date
                      ? `${new Date(timePreference.date).toDateString()} `
                      : new Date().toDateString()
                  }
                  onPress={() => toggleModal(timePreference.key, "Date")}
                />
                <Button
                  title={new Date(
                    timePreference.start_time
                  ).toLocaleTimeString()}
                  onPress={() => toggleModal(timePreference.key, "Start Time")}
                />
                <Button
                  title={new Date(timePreference.end_time).toLocaleTimeString()}
                  onPress={() => toggleModal(timePreference.key, "End Time")}
                />
              </View>

              {/* The Modal that Conditionally Renders based on which Button is clicked */}
              <Modal
                onBackdropPress={toggleModal}
                isVisible={isModalVisible}
                style={{ flex: 1 }}
              >
                {/* View inside the Modal! */}
                <View>
                  <Card>
                    {/* Dynamic Label - Date, Start Time OR End Time */}
                    <Text>{currentModalLabel}</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={
                        new Date(
                          currentModalLabel == "Date"
                            ? timePreference.date
                            : currentModalLabel == "Start Time"
                            ? timePreference.start_time
                            : timePreference.end_time
                        )
                      }
                      mode={currentModalLabel == "Date" ? "date" : "time"}
                      display="default"
                      onChange={onChange}
                    />
                  </Card>
                </View>
              </Modal>
            </View>
          ))}

          {/* Button to Add More Preferences */}
          <Button title="Add More" onPress={addMorePreferences} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 25,
    fontFamily: "Quicksand-Medium"
  }
});

export default PreferencesScreenOneComponent;
