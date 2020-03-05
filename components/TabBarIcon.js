import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

import Colors from "../constants/Colors";

// Ionicon Library
function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

// Font Awesome Library
function TabBarFontAwesomeIcon(props) {
  return <FontAwesomeIcon icon="tasks" mask={["far", "circle"]} />;
}

export { TabBarIcon, TabBarFontAwesomeIcon };
