import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { setDestination, setOrigin } from "../slices/navSlice";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "Noor Nagar, Okhla, New Delhi, Delhi, India",
    coords: { lat: 28.5561498, lng: 77.28720609999999 },
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    destination: "Hauz Khas, New Delhi, India",
    coords: { lat: 28.5478897, lng: 77.2031247 },
  },
];

const FavBar = ({ type }) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "lightgray", height: 0.5 }}></View>
      )}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { location, destination, icon, coords } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-3`}
          onPress={() => {
            if (type == "homescreen") {
              dispatch(
                setOrigin({
                  location: coords,
                  description: destination,
                })
              );
            }
            if (type == "mapscreen") {
              dispatch(
                setDestination({ location: coords, description: destination })
              );
              navigator.navigate("RIdeOptions");
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-bold text-gray-500 text-lg `}>{location}</Text>
            <Text style={tw`text-gray-400`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

export default FavBar;

const styles = StyleSheet.create({});
