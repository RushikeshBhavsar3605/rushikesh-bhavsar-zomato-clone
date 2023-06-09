import { ScrollView, Text, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { s } from "react-native-wind";
import RestaurentCard from "./RestaurentCard";
import { useEffect, useState } from "react";
import sanityClient from "../sanity";
import { useSelector } from "react-redux";
import { searchString } from "../features/basketSlice";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  const search = useSelector(searchString);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);

  return (
    <View>
      <View style={s`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={s`font-bold text-lg`}>{title}</Text>
        <ArrowRightIcon color="#E33342" />
      </View>

      <Text style={s`text-xs text-gray-500 px-4`}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={s`pt-4`}
      >
        {restaurants?.map((restaurant) => {
          if (
            search &&
            !restaurant.name.toLowerCase().includes(search.toLowerCase())
          )
            return null;

          return (
            <RestaurentCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              address={restaurant.address}
              title={restaurant.name}
              dishes={restaurant.dishes}
              rating={restaurant.rating}
              short_description={restaurant.short_description}
              genre={restaurant.type?.name}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
