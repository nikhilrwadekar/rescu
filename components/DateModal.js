import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import AvailabilityDateComponent from "./AvailabilityDateComponent";

export default class DateModal extends Component {
  // Component State
  state = {
    isModalVisible: false,
    dateSelected: new Date()
  };

  onChange = (event, selectedDate) => {
    // Get Selected Date & Save it in the State
    const currentDate = selectedDate || date;
    this.setState({ dateSelected: currentDate });

    // If iOS, show DatePicker
    let showDatePicker = Platform.OS === "ios";
    this.setState({ show: showDatePicker });
  };

  // Toggle Modal Function
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Label to Choose Date */}
        <Text style={styles.chooseDateText}>Choose Date</Text>

        {/* Button - Showing Current OR Selected Date */}
        <Button
          title={this.state.dateSelected.toDateString()}
          onPress={this.toggleModal}
        />

        {/* Modal: Visible only after above button is clicked */}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Custom Component for selecting Date */}
            <AvailabilityDateComponent
              onChange={this.onChange}
              date={this.state.dateSelected}
              mode="date"
              show={this.state.show}
            />

            {/* Button to close the Modal */}
            <Button title="Done" onPress={this.toggleModal} />
          </View>
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
