import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";
import CardList from "react-native-card-animated-modal";
import { Button, SearchBar } from "react-native-elements";

import axios from "axios";

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

const API_URL = "http://localhost:4000/api/";
// Sign Out!
_signOutAsync = async () => {
  await AsyncStorage.clear();
  this.props.navigation.navigate("SignIn");
};

// Top Header for Home
const Header = ({ name }) => {
  return (
    <View style={{ padding: 16, paddingBottom: 0 }}>
      <Text
        style={{
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.5)"
        }}
      >
        Hello, {name}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Volunteering Opportunities For You
      </Text>
    </View>
  );
};

// OpportunityTaskCard Component
const OpportunityTaskCard = ({ opportunity }) => {
  return (
    <View
      style={{
        padding: 20,
        borderBottomLeftRadius: 10,
        bottomBottomRightRadius: 10
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "rgba(0, 0, 0, 0.75)"
        }}
      >
        {opportunity.opportunity_type}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "rgba(0, 0, 0, 0.75)"
        }}
      >
        from {opportunity.opportunity_time.start} to{" "}
        {opportunity.opportunity_time.end}
      </Text>
      <Text
        style={{
          fontSize: 12,

          color: "rgba(0, 0, 0, 0.5)"
        }}
      >
        {opportunity.name}
      </Text>
      <Text
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: 16
        }}
      >
        needs {opportunity.opportunity_required} volunteers on{" "}
        {new Date(opportunity.opportunity_date).getDate()}/
        {new Date(opportunity.opportunity_date).getMonth()}/
        {new Date(opportunity.opportunity_date).getFullYear()}
      </Text>
    </View>
  );
};

// OpportunityTaskCard's Single View - When you click on a card
const OpportunitySingleView = ({ opportunity }) => {
  return (
    <View style={{ paddingVertical: 25, paddingHorizontal: 25 }}>
      <View style={{ position: "", bottom: 0, marginBottom: 20 }}>
        <Button
          title={
            !opportunity.opportunity_requested.includes(
              "nikhilrwadekar@gmail.com"
            )
              ? "Request to Volunteer"
              : "Requested"
          }
          disabled={opportunity.opportunity_requested.includes(
            "nikhilrwadekar@gmail.com"
          )}
          raised
          color="white"
          onPress={() => {
            axios
              .put(
                `${API_URL}/user/id/nikhilrwadekar@gmail.com/volunteer/${opportunity.opportunity_id}`
              )
              .then(response => {
                opportunity.opportunity_requested.push(
                  "nikhilrwadekar@gmail.com"
                );
              });
          }}
        />
      </View>
      <Text style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: 18, flex: 1 }}>
        {opportunity.description}
      </Text>
    </View>
  );
};

// Main Component
export default class CardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleDetails: {}
    };
  }

  async componentDidMount() {
    const google = await AsyncStorage.getItem("googleSignInDetails");

    let googleDetails = JSON.parse(google);

    this.setState({ googleDetails });
  }

  render() {
    const { reliefCenters } = this.props;
    return (
      <CardList
        // Indivual OpportunityTaskCard Styles
        cardContainerStyle={{
          backgroundColor: "#fff"
        }}
        // Single View OpportunityTaskCard Styles
        detailsContainerStyle={{}}
        listContainerStyle={{}}
        safeAreaStyle={{ backgroundColor: "rgb(250,250,250)" }}
        // Header Is Rendered Here
        listProps={{
          ListHeaderComponent: () => (
            <Header
              name={
                this.state.googleDetails.user
                  ? this.state.googleDetails.user.name
                  : "Unknown User"
              }
            />
          )
        }}
        data={reliefCenters}
        renderItem={({ item, index }) => {
          /* Default card when not specified */
          return <OpportunityTaskCard opportunity={item.reliefCenter} />;
        }}
        renderDetails={({ item, index }) => {
          /* You can also provide custom content per item */
          return <OpportunitySingleView opportunity={item.reliefCenter} />;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
