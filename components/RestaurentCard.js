import { Image, Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { s } from "react-native-wind";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurentCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={s`bg-white mr-3 shadow`}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        style={s`h-36 w-64 rounded-sm`}
      />

      <View style={s`px-3 pb-4`}>
        <Text style={s`font-bold text-lg pt-2`}>{title}</Text>
        <View style={s`flex-row items-center space-x-1`}>
          <StarIcon color="#fcc203" opacity={0.5} size={22} />
          <Text style={s`text-xs text-gray-500`}>
            <Text style={s`text-yellow-500`}>{rating}</Text> . {genre}
          </Text>
        </View>

        <View style={s`flex-row items-center space-x-1`}>
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text style={s`text-xs text-gray-500`}>Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurentCard;
