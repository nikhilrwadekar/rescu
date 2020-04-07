import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

export default class CustomHeader extends React.Component {
  state = {
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
  };

  handleSlide = (type) => {
    let { translateX } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
  };

  // Keep listening for the current Tab Index
  componentDidUpdate() {
    if (this.props.currentTab == 0) this.handleSlide(this.state.xTabOne);
    if (this.props.currentTab == 1) this.handleSlide(this.state.xTabTwo);
  }

  render() {
    let { xTabOne, xTabTwo, translateX } = this.state;
    return (
      <View style={{ backgroundColor: "#fff" }}>
        {/* Removed flex: 1 */}
        <View
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              marginBottom: 20,
              height: 40,
              position: "relative",
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                width: "50%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundColor: "#F27821",
                borderRadius: 10,
                transform: [
                  {
                    translateX,
                  },
                ],
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#F27821",
                borderRadius: 10,
                borderRightWidth: 0,
                // borderLeftWidth: 0,
                // borderTopWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onLayout={(event) =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                })
              }
              onPress={() => {
                // Set the index back in the Task Screen
                this.props.onTabHeaderPress(0);
                this.handleSlide(xTabOne);
              }}
            >
              <Text
                style={{
                  // Update colors based on current Tab
                  color: this.props.currentTab === 0 ? "#fff" : "#A9A9A9",
                  fontFamily:
                    this.props.currentTab === 0
                      ? "Quicksand-Bold"
                      : "Quicksand-Medium",
                  fontSize: 18,
                }}
              >
                Upcoming
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#F27821",
                borderRadius: 10,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onLayout={(event) =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() => {
                // Set the index back in the Task Screen
                this.props.onTabHeaderPress(1);
                this.handleSlide(xTabTwo);
              }}
            >
              <Text
                style={{
                  // Update colors based on current Tab
                  color: this.props.currentTab === 1 ? "#fff" : "#A9A9A9",
                  fontFamily:
                    this.props.currentTab === 1
                      ? "Quicksand-Bold"
                      : "Quicksand-Medium",
                  fontSize: 18,
                }}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
