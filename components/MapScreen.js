import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Map from "./Map";
import MapNavigationCard from "./MapNavigationCard";
import RIdeOptions from "./RIdeOptions";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="MapNavigationCard"
            component={MapNavigationCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RIdeOptions"
            component={RIdeOptions}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
