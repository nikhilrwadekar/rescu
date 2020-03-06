import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import AssignedTaskCardComponent from "../../../components/AssignedTaskCardComponent";
import { ScrollView } from "react-native-gesture-handler";

const UpcomingTasksComponent = () => (
  <ScrollView style={[styles.scene, { backgroundColor: "#fff" }]}>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <AssignedTaskCardComponent
        buttonText="Opt Out"
        date={new Date().toDateString()}
        jobType="Cooking"
        location="Surrey, BC"
        onPressOptOut={() => {
          Alert.alert(
            "Opt Out?",
            "You're about to opt out",
            [
              {
                text: "Yes, please.",
                onPress: () => console.log("Yes, please. pressed")
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
              // { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }}
      />
    ))}
  </ScrollView>
);

const HistoryComponent = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };
const renderScene = SceneMap({
  first: UpcomingTasksComponent,
  second: HistoryComponent
});
export default class TasksScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Upcoming Tasks" },
        { key: "second", title: "History" }
      ]
    };
  }

  render() {
    const { index, routes } = this.state;
    return (
      <>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={index => {
            this.setState({ index });
          }}
          initialLayout={initialLayout}
        />
      </>
    );
  }
}

TasksScreen.navigationOptions = {
  title: "Assigned Tasks"
};

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});
