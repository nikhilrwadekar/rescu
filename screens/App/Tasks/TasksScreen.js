import React, { Component } from "react";

// React Native
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  AsyncStorage
} from "react-native";

// Third Party Components/Libraries
import axios from "axios"; // Axios
import { TabView, SceneMap } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";

// Import Sockets
import { clientSocket } from "../../../web-sockets";

// Custom Outreach Components
import AssignedTaskCardComponent from "../../../components/AssignedTaskCardComponent";

// Left Tab: Upcoming
class UpcomingTasksComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenterGroupedTasks: []
    };
  }

  componentDidMount() {
    // Listen to changes in Relief Centers
    clientSocket.on("reliefCenterDataChange", data => {
      // Get the latest tasks
      this.getTasks();
    });

    this.getTasks();
  }

  getTasks = async () => {
    const tasks = await axios.get(
      `${API_URL}/user/nikhilrwadekar@gmail.com/tasks`
    );
    this.setState({ reliefCenterGroupedTasks: tasks.data });
  };

  // Handle Opt Out
  handleOptOut = async taskID => {
    console.log(`${API_URL}/user/nikhilrwadekar@gmail.com/optout/${taskID}`);
    await axios.post(
      `${API_URL}/user/nikhilrwadekar@gmail.com/optout/${taskID}`
    );
  };

  render() {
    const { reliefCenterGroupedTasks } = this.state;
    return (
      <ScrollView style={[styles.scene, { backgroundColor: "#fff" }]}>
        {reliefCenterGroupedTasks &&
          reliefCenterGroupedTasks.map(reliefCenter => {
            const { name, location } = reliefCenter;
            return reliefCenter.tasks.map(
              (task, taskIndex) => (
                <AssignedTaskCardComponent
                  newKey={taskIndex}
                  buttonText="Opt Out"
                  date={
                    new Date(task.date).toDateString() +
                    ` from ${task.time.start} to ${task.time.end} `
                  }
                  jobType={`${task.type} at ${name}`}
                  location={location}
                  onPressOptOut={() => {
                    Alert.alert(
                      "Opt Out?",
                      "You're about to opt out",
                      [
                        {
                          text: "Yes, please.",
                          onPress: () => this.handleOptOut(task._id)
                        },
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                />
              ),
              // Pass First Map's Data Into the Other Map
              { name, location }
            );
          })}
      </ScrollView>
    );
  }
}

// Right Tab: History
const HistoryComponent = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };
const renderScene = SceneMap({
  first: UpcomingTasksComponent,
  second: HistoryComponent
});

const API_URL = "http://localhost:4000/api";

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

  async componentDidMount() {
    console.log("Root Tasks was mounted.");
    const tasks = await axios.get(
      `${API_URL}/user/nikhilrwadekar@gmail.com/tasks`
    );
    const tasksGroupedByReliefCenters = JSON.stringify(tasks.data);
    await AsyncStorage.setItem("tasks", tasksGroupedByReliefCenters);
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
