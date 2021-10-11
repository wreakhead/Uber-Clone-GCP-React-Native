import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const optionData = [
  {
    id: "1",
    title: "Get a ride",
    image: "https://image.flaticon.com/icons/png/512/649/649492.png",
    screen: "MapScreen",
  },
  {
    id: "2",
    title: "Order food",
    image: "https://image.flaticon.com/icons/png/512/890/890018.png",
    screen: "FoodScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      horizontal
      data={optionData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-4 pb-8 m-2 bg-gray-200`}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={{
                uri: item.image,
              }}
            />
            <Text style={{ marginTop: 10 }}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
