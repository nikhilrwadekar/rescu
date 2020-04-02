import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList
} from "react-native";
import DisasterListItem from "../../../components/DisasterListItem";
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";

export class DisasterListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disasters: [
        {
          id: 1,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 2,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 3,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 4,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 5,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 6,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 7,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 8,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 9,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 10,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 11,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        },
        {
          id: 12,
          name: "Australian Bushfires",
          city: "Mallacoota, Victoria",
          country: "Australia",
          description:
            "Dozens of fires erupted in New South Wales, Australia, prompting the government to declare a state of emergency in November 2019. Fires rapidly spread across all states to become some of the most devastating on record. An area about the size of South Korea, roughly 25.5 million acres, has burned. At least 33 people are dead, including at least three volunteer firefighters, and more are missing. Around 3,000 homes have been destroyed or damaged. As blazes intensified in the days leading up to New Year’s Eve, thousands of people who were forced to evacuate sought shelter on beaches across New South Wales and Victoria.",
          image_url:
            "https://cdn.vox-cdn.com/thumbor/yEe8NmlUYsCpCeXlva6FoAsWZHQ=/0x0:3000x2000/1820x1213/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66021728/1184740878.jpg.0.jpg",
          donation: {
            goal: 200000,
            received: 110000
          }
        }
      ],
      imgDLIUrl: { uri: "https://reactnative.dev/img/tiny_logo.png" },
      location: "8850 Osler St, Vancouver, BC V6P 4G2",
      itemExcerpt:
        "Buddhist Compassion Relief Tzu Chi Foundation, Canada is founded by its CEO, Mr. Gary Ho, in 1992 under the inspiration of Dharma Master Cheng Yen to inaugurate Tzu Chi’s good works in Canada"
    };
  }

  render() {
    const { disasters } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 25,
            fontSize: 25,
            fontFamily: "Quicksand-Medium",
            color: "#383940"
          }}
        >
          Donate to a cause
        </Text>

        <FlatList
          style={{ flex: 1 }}
          keyExtractor={item => item.id.toString()}
          data={disasters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.DisasterItem}
              onPress={() => {
                const { params } = this.props.navigation.state;
                const { type } = params;
                if (type == "withID")
                  navigation.navigate("DonateSingleViewWithID", {
                    type: "withID"
                  });
                else if (type == "withoutID")
                  navigation.navigate("DonateSingleViewWithoutID", {
                    type: "withoutID"
                  });
              }}
            >
              <DisasterListItem
                name={item.name}
                itemExcerpt={item.description.substring(0, 90).concat("...")}
                imgDLIUrl={{ uri: item.image_url }}
                location={`${item.city}, ${item.country}`}
              />
            </TouchableOpacity>
          )}
        />
        {!!this.props.navigation.state.params.type !== "withID" && (
          <Button
            title="Cancel"
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#f7f7f7"
    // textAlign: "center"
  },
  DisasterItem: {
    marginVertical: 15,
    borderRadius: 10,
    borderColor: "black"
  }
});

DisasterListScreen.navigationOptions = {
  title: "Donate",
  header: null
};

export default DisasterListScreen;
