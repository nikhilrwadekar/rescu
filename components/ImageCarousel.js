import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ImageCarousel = ({ txt, imageUri }) => (
  <View style={styles.conatiner}>
    <View style={styles.subContainer}>
      <Image source={imageUri} style={styles.img} />
    </View>
  </View>
);
const styles = StyleSheet.create({
  conatiner: {
    marginTop: 20,
    height: 250,
    width: 320,
    marginLeft: 20
  },
  subContainer: {
    flex: 1
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
});
export default ImageCarousel;
