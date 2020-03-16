import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";
import CardList from "react-native-card-animated-modal";
import { Button, SearchBar } from "react-native-elements";

import axios from "axios";
import io from "socket.io-client";
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

var socket = io.connect("localhost:5000", {
  transports: ["websocket"] // you need to explicitly tell it to use websockets
});

socket.on("connect", function() {
  socket.emit("message", "Mobile: connected to Mobile!");

  socket.on("message1", function(m) {
    console.log(m);
  });

  socket.on("message2", function(m) {
    console.log(m);
  });
});

socket.emit("connect", { msg: 1 });

socket.on("volunteerToAdminRequest", () => {
  console.log("Request has been sent and captured successfully by Socket.io!");
  socket.emit("hello", "can you hear me?", 1, 2, "abc");
});

socket.on("approveVolunteerRequest", () => {
  console.log("Deteceted ON MOBILE -- Admin trying to accept request!");
});

const API_URL = "http://10.0.0.11:4000/api/";
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
const OpportunitySingleView = ({ opportunity, onRequestPressed }) => {
  return (
    <View style={{ paddingVertical: 25, paddingHorizontal: 25 }}>
      <View style={{ position: "", bottom: 0, marginBottom: 20 }}>
        <Button
          title={
            !opportunity.opportunity_requested.includes(
              "nikhilrwadekar@gmail.com"
            ) &&
            !opportunity.opportunity_assigned.includes(
              "nikhilrwadekar@gmail.com"
            )
              ? "Request to Volunteer"
              : opportunity.opportunity_assigned.includes(
                  "nikhilrwadekar@gmail.com"
                )
              ? "Assigned"
              : "Requested"
          }
          // disabled={
          //   opportunity.opportunity_requested.includes(
          //     "nikhilrwadekar@gmail.com"
          //   ) ||
          //   opportunity.opportunity_assigned.includes(
          //     "nikhilrwadekar@gmail.com"
          //   )
          // }
          raised
          color="white"
          onPress={onRequestPressed}
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

    socket.on("connect", function() {
      socket.emit("message", "Message: sent by socket.emit");
    });

    socket.on("message1", function(m) {
      console.log(m);
    });

    socket.on("message2", function(m) {
      console.log(m);
    });

    this.state = {
      googleDetails: null
    };
  }

  async componentDidMount() {
    const google = await AsyncStorage.getItem("googleSignInDetails");

    let googleDetails = JSON.parse(google);

    this.setState({ googleDetails });
  }

  handleRequestPressed = async opportunity => {
    console.log("Request was pressed!");

    socket.emit("message2");
    // await axios
    //   .put(
    //     `${API_URL}/user/id/nikhilrwadekar@gmail.com/volunteer/${opportunity.opportunity_id}`
    //   )
    //   .then(response => {
    //     opportunity.opportunity_requested.push("nikhilrwadekar@gmail.com");
    //     socket.emit(
    //       "volunteerToAdminRequest",
    //       "Sent a request to volunteer to the Admin.. let's see if it does get detected!"
    //     );

    //     console.log("It did go through..");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

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
                this.state.googleDetails
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
          return (
            <OpportunitySingleView
              opportunity={item.reliefCenter}
              onRequestPressed={() =>
                this.handleRequestPressed(item.reliefCenter)
              }
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
