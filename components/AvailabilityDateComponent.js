import React from "react";
import { View } from "react-native";

// Get DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker";

// Destructure Props
const AvailabilityDateComponent = ({ date, mode, onChange }) => {
  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default AvailabilityDateComponent;
