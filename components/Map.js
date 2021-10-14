import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { PLACES_KEY } from "@env";
import axios from "axios";
const Map = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();

  useEffect(() => {
    if (!origin || !destination) {
      return;
    }
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) {
      return;
    }
    const getTravelData = async () => {
      const data = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&key=${PLACES_KEY}`
      );
      console.log(data.data.rows[0].elements[0]);
      dispatch(setTravelTimeInfo(data?.data.rows[0].elements[0]));
      // Object {
      //   "distance": Object {
      //     "text": "11.1 km",
      //     "value": 11055,
      //   },
      //   "duration": Object {
      //     "text": "24 mins",
      //     "value": 1450,
      //   },
      //   "status": "OK",
      // }
    };

    getTravelData();
  }, [origin, destination, PLACES_KEY]);
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1 p-0 m-0`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin.description}
          destination={destination.description}
          apikey={PLACES_KEY}
          strokeWidth={4}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
