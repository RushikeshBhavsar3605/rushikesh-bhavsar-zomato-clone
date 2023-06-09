import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { s } from "react-native-wind";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View style={s`relative`}>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            style={s`w-full h-56 bg-gray-300 p-4`}
          />

          <TouchableOpacity
            onPress={navigation.goBack}
            style={s`absolute top-12 left-5 p-2 bg-gray-100 rounded-full`}
          >
            <ArrowLeftIcon size={20} color="#E33342" />
          </TouchableOpacity>
        </View>

        <View style={s`bg-white`}>
          <View style={s`px-4 pt-4`}>
            <Text style={s`text-3xl font-bold`}>{title}</Text>
            <View style={s`flex-row space-x-2 my-1`}>
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

            <Text style={s`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
          </View>

          <TouchableOpacity
            style={s`flex-row items-center space-x-2 p-4 border-t border-b border-gray-300`}
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text style={s`pl-2 flex-1 text-md font-bold`}>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#E33342" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingBottom: 144,
          }}
        >
          <Text style={s`px-4 pt-6 mb-3 font-bold text-xl`}>Menu</Text>

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
