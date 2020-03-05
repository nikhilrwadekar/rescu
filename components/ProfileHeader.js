import React from "react";
import { View, Button, StyleSheet, Image } from "react-native";
// Test Comment
const ProfileHeader = ({ imageUrl, buttonText, onPressEditProfile, fName }) => (
  <View style={styles.header}>
    <Image
      style={styles.profileImage}
      source={imageUrl}
      style={styles.profileImage}
    />

    <Text style={styles.fName}>{fName}</Text>
    <View style={styles.editButton}>
      <Button title={buttonText} onPress={onPressEditProfile} />
    </View>
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
  },
  editButton: {
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});
export default ProfileHeader;
