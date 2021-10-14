import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { PLACES_KEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import FavBar from "./FavBar";
import { Icon } from "react-native-elements";
const MapNavigationCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View>
      <Text style={tw`mt-4 text-center text-lg items-center font-semibold`}>
        Good Morning, Imran
      </Text>
      <View style={tw`border-t border-gray-200 mt-4`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            styles={inputStyle}
            query={{
              key: PLACES_KEY,
              language: "en",
            }}
            minLength={2}
            fetchDetails={true}
            returnKeyType={"search"}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RIdeOptions");
            }}
          />
        </View>
        <FavBar type="mapscreen" />
      </View>
      <View
        style={tw`flex-row justify-evenly mt-auto  border-t border-gray-200`}
      >
        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full mt-3`}
        >
          <Icon name="car" type="font-awesome" color="white" size={18} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full mt-3`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={18}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapNavigationCard;

const inputStyle = StyleSheet.create({
  container: {
    padding: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 16,
  },
});
