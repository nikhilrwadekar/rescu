import React from "react";
import { View, StyleSheet } from "react-native";
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
    height: 200
  },
  cont: {
    backgroundColor: "black"
  }
});

const TimeAvailability = ({ setPreference, preference }) => (
  <View style={styles.inputStyle}>
    <Text>Choose your availability</Text>
    <Container>
      {/* <Header /> */}
      <Content>
        <ListItem
          onPress={() => {
            setPreference("anytime");
          }}
        >
          <Left>
            <Text>Anytime</Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#f27821"}
              selected={preference == "anytime"}
            />
          </Right>
        </ListItem>
        <ListItem
          onPress={() => {
            setPreference("preferred");
          }}
        >
          <Left>
            <Text>Preferred</Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#f27821"}
              selected={preference == "preferred"}
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
