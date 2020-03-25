import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ShareDonationLinkComponent from "./ShareDonationLinkButton";

const ShareDonationComponent = ({
  textButton,
  textStatement,
  onShareButtonPress,
  customStyle
}) => (
  <View style={{ marginTop: 22 }}>
    {/* Text to display the message */}
    <Text style={styles.text}>{textStatement}</Text>

    {/* Button for share */}
    <ShareDonationLinkComponent
      buttonText={textButton}
      onPressUpdate={onShareButtonPress}
      customButtonStyle={customStyle}
    />
  </View>
);

// Styles
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans-Light",
    color: "#383940"
  }
});

export default ShareDonationComponent;
