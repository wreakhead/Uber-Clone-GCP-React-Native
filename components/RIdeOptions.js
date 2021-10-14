import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInfo, setDestination } from "../slices/navSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native";
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
  {
    id: "0001",
    title: "UberX",
    rate: "1",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_877,h_493/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png",
  },
  {
    id: "0002",
    title: "UberXL",
    rate: "1.2",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_877,h_493/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png",
  },
  {
    id: "0003",
    title: "UberLUX",
    rate: "1.75",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_877,h_493/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png",
  },
];
const SURGE_CHARGE = 2;
const BOOKING_FEE = 50;
const RIdeOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const travelTimeInfo = useSelector(selectTravelTimeInfo);
  return (
    <View>
      <TouchableOpacity
        style={tw`absolute pt-4 pl-3`}
        onPress={() => navigation.navigate("MapNavigationCard")}
      >
        <Icon name="chevron-left" type="fontawesome" />
      </TouchableOpacity>
      <Text
        style={tw`mt-4 text-center text-lg items-center font-semibold mb-4`}
      >
        Select a Ride - {travelTimeInfo?.distance?.text}
      </Text>
      <FlatList
        style={tw`p-2`}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
            style={tw`flex-row justify-between items-center bg-white mt-1 px-5 ${
              item.id === selected?.id && "bg-gray-100"
            }`}
          >
            <Image
              style={{ width: 100, height: 80, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View>
              <Text style={tw`text-lg font-bold`}>{item.title}</Text>
              <Text>Total Time - {travelTimeInfo?.duration?.text}</Text>
            </View>
            <Text style={tw`text-lg font-semibold`}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(
                (travelTimeInfo?.duration?.value * SURGE_CHARGE * item.rate) /
                  100 +
                  BOOKING_FEE
              )}
            </Text>
          </TouchableOpacity>
        )}
      ></FlatList>
      <TouchableOpacity
        disabled={!selected}
        style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
      >
        <Text style={tw`text-center text-white text-xl`}>
          Choose {selected?.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RIdeOptions;
