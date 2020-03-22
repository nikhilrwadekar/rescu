import React from "react";
import { View, Button, StyleSheet, Image, Text } from "react-native";
// Test Comment
const ProfileHeader = ({ imageUrl, buttonText, onPressEditProfile, fName }) => (
  <View style={styles.header}>
    <Image style={styles.profileImage} source={imageUrl} />

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
