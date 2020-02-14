import React from "react";
import { Text, View, Button, TextInput, StyleSheet, Image } from "react-native";

// Test Comment
const ProfileHeader = ({
  imageUrl,
  buttonText,
  onPressEditProfile
}) => (
  <View style={styles.header}>
    
    <Image
          style={{width: 70, height: 70}}
          source={imageUrl}
          style={styles.profileImage}
        />

    <View style={styles.editButton}>
      <Button title={buttonText} onPress={onPressEditProfile} />
      </View>
    </View>
 
);

const styles = StyleSheet.create({
    header:{
        marginTop:20,
        width:"100%",
        alignItems:"center"
    },
    profileImage:{
paddingBottom:40
    },
    editButton:{
        marginTop:30,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
  
});
export default ProfileHeader;
