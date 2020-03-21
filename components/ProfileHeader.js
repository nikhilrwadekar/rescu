import React from "react";
import { Text, View, Button, TextInput, StyleSheet, Image } from "react-native";
import UpdateButtonProfileComponent from "./UpdateButtonProfileComponent";

// Test Comment
const ProfileHeader = ({ imageUrl, buttonText, onPressEditProfile, fName }) => (
  <View style={styles.header}>
    <Image
      style={styles.profileImage}
      source={imageUrl}
      style={styles.profileImage}
    />

    <Text style={styles.fName}>{fName}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  fName: {
    fontSize: 24
  },
  profileImage: {
    paddingBottom: 40,
    resizeMode: "cover",
    width: 150,
    height: 150,
    borderRadius: 150
  }
});
export default ProfileHeader;
