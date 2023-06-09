import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { s } from "react-native-wind";
import SafeViewAndroid from "../SafeViewAndroid";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import { useDispatch } from "react-redux";
import { setSearchString } from "../features/basketSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "featured"] {..., restaurants[]->{..., dishes[]->}}`)
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  const handleSearch = (e) => {
    dispatch(setSearchString(e));
  };

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, s`bg-white pt-10`]}>
      <View style={s`flex-row pb-3 items-center mx-4 space-x-2`}>
        <View style={s`pr-2`}>
          <Image
            source={require("../assets/zomato-logo.png")}
            style={s`h-10 w-10 bg-gray-300 rounded-full`}
          />
        </View>

        <View style={s`flex-1`}>
          <Text style={s`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
          <Text style={s`font-bold text-xl`}>
            Current Location
            <ChevronDownIcon size={20} color="#E33342" />
          </Text>
        </View>

        <UserIcon size={35} color="#E33342" />
      </View>

      <View style={s`flex-row items-center space-x-2 pb-2 mx-4`}>
        <View style={s`flex-row space-x-2 items-center flex-1 bg-gray-200 p-3`}>
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Business"
            onChangeText={(e) => handleSearch(e)}
            keyboardType="default"
            style={s`pl-1`}
          />
        </View>

        <AdjustmentsVerticalIcon color="#E33342" />
      </View>

      <ScrollView
        style={s`bg-gray-100`}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
