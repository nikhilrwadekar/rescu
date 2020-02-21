import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

// Test Comment
const AssignedTaskCardComponent = ({
  jobType,
  date,
  location,
  time,
  buttonText,
  onPressOptOut
}) => (
 
       <View style={styles.container}>

<View style={styles.Rone}>
    <Text style={styles.jobType}>{jobType}</Text>
    <Text style={styles.date}>{date}</Text>
</View>


    <Text style={styles.location}>{location}</Text>

    <View style={styles.RTwo}>
    <Text style={styles.time}>{time}</Text>
    <View style={styles.optOutButton}><Button title={buttonText} onPress={onPressOptOut} /></View>
 </View>
    </View>
 
);

const styles = StyleSheet.create({
    container:{
        width:"100%",   
        padding:10,
    },
    Rone:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom: 10
    },
    RTwo:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop: 10

    },
    optOutButton:{
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
  
});
export default AssignedTaskCardComponent;
