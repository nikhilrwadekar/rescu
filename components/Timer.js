//Referenec https://www.npmjs.com/package/react-native-simple-time-picker

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import TimePicker from "react-native-simple-time-picker";

// const Timer = () => {
//   state = {
//     selectedHours: 0,
//     selectedMinutes: 0
//   };

//   const { selectedHours, selectedMinutes } = this.state;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.txt}>
//         {selectedHours}:{selectedMinutes}
//       </Text>
//       <TimePicker
//         selectedHours={selectedHours}
//         selectedMinutes={selectedMinutes}
//         onChange={(hours, minutes) => (
//           (this.selectedHours = hours), (this.selectedMinutes = minutes)
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   txt: {
//     marginTop: 20,
//     color: "red"
//   }
// });
// export default Timer;

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import TimePicker from "react-native-simple-time-picker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class Timer extends Component {
  state = {
    selectedHours: 0,
    selectedMinutes: 0
  };

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          {selectedHours}:{selectedMinutes}
        </Text>
        <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) =>
            this.setState({ selectedHours: hours, selectedMinutes: minutes })
          }
        />
      </View>
    );
  }
}
