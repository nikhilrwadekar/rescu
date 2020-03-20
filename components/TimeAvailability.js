import React from "react";
import { View, StyleSheet } from "react-native";
// import { RadioButtons } from "react-native-radio-buttons";
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left
} from "native-base";

const styles = StyleSheet.create({
  inputStyle: {
    // backgroundColor: "red",
    height: 200
  },
  cont: {
    backgroundColor: "black"
  }
});

const TimeAvailability = ({ OnSelectOption }) => (
  // export class TimeAvailability extends React.Component {
  // state = {
  //   selectedOption: "anytime"
  // };

  // render() {
  //   return (
  <View style={styles.inputStyle}>
    <Text>Choose your availability</Text>
    <Container>
      {/* <Header /> */}
      <Content>
        <ListItem
          onPress={() => {
            this.setState({ selectedOption: "anytime" });
            var val = this.state.selectedOption;
            OnSelectOption(val);
          }}
          // onPress={() => this.setState({ selectedOption: "anytime" })}
        >
          <Left>
            <Text>Anytime</Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#f27821"}
              selected={this.state.selectedOption == "anytime"}
            />
          </Right>
        </ListItem>
        <ListItem
          onPress={() => {
            this.setState({ selectedOption: "anytime" });
            var val = this.state.selectedOption;
            OnSelectOption(val);
          }}
          // onPress={() => this.setState({ selectedOption: "preferred" })}
        >
          <Left>
            <Text>Discussion with Client</Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#f27821"}
              selected={this.state.selectedOption == "preferred"}
            />
          </Right>
        </ListItem>
      </Content>
    </Container>
  </View>
  //     );
  //   }
  // }
);

export default TimeAvailability;
