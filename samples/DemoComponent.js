import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";

import Constants from "expo-constants";

function Separator() {
  return <View style={styles.separator} />;
}

export default class DemoComponent extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              alignSelf: "stretch",
              height: 50,
              backgroundColor: "powderblue"
            }}
          >
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <View
            style={{
              alignSelf: "stretch",
              height: 50,
              backgroundColor: "skyblue"
            }}
          >
            <TextInput style={styles.input} placeholder="Password" />
          </View>
          <View
            style={{
              alignSelf: "stretch"
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("HomeScreen")}
              underlayColor="#fff"
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    marginVertical: 8
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  button: {
    // marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#000",
    borderRadius: 10
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  logo: { width: 100, height: 100 },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchIcon: {
    padding: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242"
  }
});
