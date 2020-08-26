import React from "react";
// React Native
import {
  Text,
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

// Custom Components
import AddressInput from "./AdressInput";
import PostalCode from "./PostalCode";
import TimeAvailability from "./TimeAvailability";
import ButtonLink from "./ButtonLink";

// import DateTimeModal from "./DateModal";

import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { Card } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Left } from "native-base";

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
  onPressNext,
  onDeletePreference,
  isNextVisible
}) => {
  return (
    <SafeAreaView>
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
        <View style={{ marginBottom: 30 }}>
          <PostalCode
            postalCode={postalCode}
            onPostalCodeChange={onPostalCodeChange}
          />
        </View>

        {/* <ButtonLink text="Next" onPress={onPressNext} /> */}

        {/* Select Preference */}
        <TimeAvailability
          setPreference={handleSetPreference}
          preference={preference}
        />

        {/* If Preference is 'preferred' Show DateTimePicker */}
        {preference == "preferred" && (
          <View
            style={{
              backgroundColor: "white",
              // borderWidth: 1,
              // borderColor: "#383940",
              borderRadius: 10,
              marginTop: 10,
              marginLeft: 40,
              marginRight: 40
            }}
          >
            <Text
              style={{
                marginTop: 5,
                paddingTop: 10,
                paddingLeft: 10,
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                fontWeight: "100"
              }}
            >
              {" "}
              Preferred Availability{" "}
            </Text>
            {/* Map Date Modal */}
            {timePreferences.map((timePreference, index) => (
              // Preference - Date & Time
              <View key={timePreference.key || timePreference._id}>
                {/* Buttons for Date, Start Time, and End Time */}
                <View
                  style={{
                    flex: 1,
                    // flexDirection: "row",
                    justifyContent: "flex-start",
                    padding: 10
                  }}
                >
                  <View
                    style={{
                      marginTop: 20,
                      justifyContent: "flex-start",
                      alignContent: "flex-start",
                      flexDirection: "column"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row"
                        }}
                      >
                        <AntDesign
                          name="calendar"
                          size={18}
                          color="#F27821"
                          style={{ paddingLeft: 10 }}
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontFamily: "OpenSans-Regular",
                            fontSize: 15
                          }}
                        >
                          Date
                        </Text>
                      </View>

                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            onDeletePreference(
                              timePreference._id || timePreference.key
                            )
                          }
                        >
                          <AntDesign
                            name="delete"
                            size={18}
                            color="#F27821"
                            style={{ paddingLeft: 10 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ textAlign: "left" }}>
                      <Button
                        title={
                          timePreference.date
                            ? `${new Date(timePreference.date).toDateString()} `
                            : new Date().toDateString()
                        }
                        onPress={() =>
                          toggleModal(
                            timePreference.key || timePreference._id,
                            "Date"
                          )
                        }
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 10,
                      marginTop: 8
                    }}
                  >
                    <View styles={{}}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center"
                        }}
                      >
                        <Ionicons
                          name="ios-timer"
                          size={18}
                          color="#F27821"
                          // style={{ paddingLeft: 10 }}
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontFamily: "OpenSans-Regular",
                            fontSize: 15
                          }}
                        >
                          Start time
                        </Text>
                      </View>
                      <Button
                        title={
                          timePreference.start_time
                            ? `${new Date(
                                timePreference.start_time
                              ).toLocaleTimeString()} `
                            : new Date().toLocaleTimeString()
                        }
                        onPress={() =>
                          toggleModal(
                            timePreference.key || timePreference._id,
                            "Start Time"
                          )
                        }
                      />
                    </View>

                    <View styles={{}}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center"
                        }}
                      >
                        <Ionicons
                          name="ios-timer"
                          size={18}
                          color="#F27821"
                          // style={{ paddingLeft: 10 }}
                        />
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontFamily: "OpenSans-Regular",
                            fontSize: 15,
                            marginBottom: 0
                          }}
                        >
                          End time
                        </Text>
                      </View>
                      <Button
                        title={
                          timePreference.end_time
                            ? `${new Date(
                                timePreference.end_time
                              ).toLocaleTimeString()} `
                            : new Date().toLocaleTimeString()
                        }
                        onPress={() =>
                          toggleModal(
                            timePreference.key || timePreference._id,
                            "End Time"
                          )
                        }
                      />
                    </View>
                  </View>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 13
              }}
            >
              <Button title="Add More" onPress={addMorePreferences} />
              <AntDesign
                name="pluscircleo"
                size={18}
                color="#F27821"
                // style={{ paddingLeft: 10 }}
              />
            </View>
          </View>
        )}

        {/* Add Sign In Condition here */}

        {isNextVisible && (
          <ButtonLink
            text="Next"
            onPress={onPressNext}
            customStyle={{ marginTop: 110, paddingBottom: 20 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
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
