import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollViewComponent
} from "react-native";
import CardList from "react-native-card-animated-modal";
// import { Button } from "react-native-elements";

_signOutAsync = async () => {
  await AsyncStorage.clear();
  this.props.navigation.navigate("Auth");
};

const now = new Date();
const CARDS = [
  {
    // image source for Image component
    image: {
      uri:
        "https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    // Height for the card
    height: 0,
    // Will be used when you want to render different contents per card.
    renderDetails: ({ item, index }) => (
      <View style={{ paddingTop: 35 }}>
        <Text style={{ flex: 1, padding: 10 }}>
          Tonari Gumi is a grassroots community organization serving Japanese
          Canadian seniors and other members of the community. A home-away-from
          home, a place to meet friends, and a place to find support, Tonari
          Gumi serves the Metro Vancouver area. Visit us today!
        </Text>
        <Text style={{ flex: 1, padding: 10 }}>
          Tonari Gumi is a grassroots community organization serving Japanese
          Canadian seniors and other members of the community. A home-away-from
          home, a place to meet friends, and a place to find support, Tonari
          Gumi serves the Metro Vancouver area. Visit us today!
        </Text>
        <Text style={{ flex: 1, padding: 10 }}>
          Tonari Gumi is a grassroots community organization serving Japanese
          Canadian seniors and other members of the community. A home-away-from
          home, a place to meet friends, and a place to find support, Tonari
          Gumi serves the Metro Vancouver area. Visit us today!
        </Text>
        <Text style={{ flex: 1, padding: 10 }}>
          Tonari Gumi is a grassroots community organization serving Japanese
          Canadian seniors and other members of the community. A home-away-from
          home, a place to meet friends, and a place to find support, Tonari
          Gumi serves the Metro Vancouver area. Visit us today!
        </Text>
        <Text style={{ flex: 1, padding: 10 }}>
          Tonari Gumi is a grassroots community organization serving Japanese
          Canadian seniors and other members of the community. A home-away-from
          home, a place to meet friends, and a place to find support, Tonari
          Gumi serves the Metro Vancouver area. Visit us today!
        </Text>
      </View>
    )
  },
  {
    image: {
      uri:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    height: 0
  },
  {
    image: {
      uri:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    height: 0
  },
  {
    image: {
      uri:
        "https://images.unsplash.com/photo-1557660559-42497f78035b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    height: 0
  },
  {
    image: {
      uri:
        "https://images.unsplash.com/photo-1541532108062-73f2181a08c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    height: 0
  }
];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const username = this.props.navigation.getParam("username");
    const user = this.props.navigation.getParam("user");
    return (
      <CardList
        cardContainerStyle={{
          backgroundColor: "#fff"
        }}
        detailsContainerStyle={{}}
        listContainerStyle={{}}
        safeAreaStyle={{ backgroundColor: "rgb(250,250,250)" }}
        listProps={{
          ListHeaderComponent: () => (
            <View style={{ padding: 16, paddingBottom: 0 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                {user ? `Hello, ${user.name}` : now.toDateString()}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Volunteering Options Near You
              </Text>
            </View>
          )
        }}
        data={CARDS}
        renderItem={({ item, index }) => {
          /* Render card per item */
          if (item.renderItem) return item.renderItem({ item, index });

          /* Default card when not specified */
          return (
            <View
              style={{
                padding: 20,
                borderBottomLeftRadius: 10,
                bottomBottomRightRadius: 10
                // backgroundColor: "#fff"
                // backgroundColor: "red"
              }}
            >
              {/* <Text
                style={{
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Volunteering Option #{index + 1}
              </Text> */}
              <Text
                style={{
                  fontSize: 25,
                  color: "rgba(0, 0, 0, 0.75)"
                }}
              >
                Lattitude Global Volunteering - Canada
              </Text>
              <Text
                style={{
                  fontSize: 12,

                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                15 minutes away
              </Text>
              <Text
                style={{
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: 16
                }}
              >
                needs 2 Volunteers
              </Text>
            </View>
          );
        }}
        renderDetails={({ item, index }) => {
          /* Render card per item */
          if (item.renderDetails)
            return (
              <View
                style={{
                  // paddingRight: 25,
                  // paddingLeft: 25,

                  padding: 10
                }}
              >
                <Button title="REQUEST TO VOLUNTEER" color="#D54425" />
                {item.renderDetails({ item, index })}
              </View>
            );

          /* You can also provide custom content per item */
          return (
            <View style={{ paddingVertical: 100, paddingHorizontal: 0 }}>
              <Text
                style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: 18, flex: 1 }}
              >
                Sorry, No custom content was provided!
              </Text>
              <Button title="REQUEST TO VOLUNTEER" raised color="white" />
            </View>
          );
        }}
      />
      // </View>
    );
  }
}

// Navigator Options for the Screen, In this example we've set the Title
HomeScreen.navigationOptions = {
  title: "Home",
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  user: {
    fontSize: 25,
    flex: 1,
    textAlign: "center"
  },
  userImage: {
    width: 200,
    height: 200,
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  }
});
