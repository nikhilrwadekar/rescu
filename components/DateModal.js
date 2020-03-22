import React, { Component } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import AvailabilityDateComponent from "./AvailabilityDateComponent";

export default class DateModal extends Component {
  render() {
    const {
      toggleModal,
      dateSelected,
      label,
      show,
      onButtonPress,
      isModalVisible,
      onChange,
      displayText,
      mode
    } = this.props;
    return (
      <View style={styles.container}>
        {/* Label to Choose Date */}
        <Text style={styles.chooseDateText}>{label}</Text>

        {/* Button - Showing Current OR Selected Date */}
        <Button title={displayText} onPress={toggleModal} />

        {/* Modal: Visible only after above button is clicked */}
        <Modal isVisible={isModalVisible}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* Custom Component for selecting Date */}
            <AvailabilityDateComponent
              onChange={onChange}
              date={dateSelected}
              mode={mode}
              show={show}
            />

            {/* Button to close the Modal */}
            <Button title="Done" onPress={toggleModal} />
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20
  },
  chooseDateText: {
    textAlign: "center",
    fontSize: 20
  }
});
