import React from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { PLACES_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import FavBar from "../components/FavBar";
const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-4`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="where from?"
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 16,
            },
          }}
          onPress={(data, details = null) => {
            console.log(details.geometry.location, data.description);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          query={{
            key: PLACES_KEY,
            language: "en",
          }}
          debounce={400}
        />

        <NavOptions />
        <FavBar type="homescreen" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
