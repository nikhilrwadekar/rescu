import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

export default class CustomHeader extends React.Component {
  state = {
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    // translateXTabOne: new Animated.Value(0),
    // translateXTabTwo: new Animated.Value(width),
    // translateY: -1000
  };

  handleSlide = (type) => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      // translateXTabOne,
      // translateXTabTwo
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
  };

  render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      // translateXTabOne,
      // translateXTabTwo,
      // translateY
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
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
              onPress={() =>
                this.setState({ active: 0 }, () => this.handleSlide(xTabOne))
              }
            >
              <Text
                style={{
                  color: active === 0 ? "#fff" : "#A9A9A9",
                  fontFamily: "Quicksand-Bold",
                }}
              >
                Upcoming Tasks
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

                // borderTopWidth: 0,
                // borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onLayout={(event) =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))
              }
            >
              <Text
                style={{
                  color: active === 1 ? "#fff" : "#A9A9A9",
                  fontFamily: "Quicksand-Bold",
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
