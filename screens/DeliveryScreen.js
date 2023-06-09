import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeViewAndroid from "../SafeViewAndroid";
import { s } from "react-native-wind";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { Bar } from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { flex } from "react-native-wind/dist/styles/flex/flex";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <SafeAreaView
      style={[SafeViewAndroid.AndroidSafeArea, s`bg-red-500 flex-1`]}
    >
      <View style={s`z-50`}>
        <View style={s`flex-row justify-between items-center p-5`}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text style={s`font-light text-white text-lg`}>Order Help</Text>
        </View>

        <View style={s`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
          <View style={s`flex-row justify-between`}>
            <View>
              <Text style={s`text-lg text-gray-400`}>Estimated Arrival</Text>
              <Text style={s`text-4xl font-bold`}>45-55 Minutes</Text>
            </View>

            <Image
              source={require("../assets/zomato-rider.png")}
              style={s`h-20 w-20 rounded-full`}
            />
          </View>

          <Bar size={30} color="#E33342" indeterminate={true} />

          <Text style={s`mt-3 text-gray-500`}>
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{
          display: "flex",
          flex: 1,
          zIndex: 0,
          marginTop: -40,
        }}
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#E33342"
        />
      </MapView>

      <View style={s`bg-white flex-row items-center space-x-5 h-28`}>
        <Image
          source={require("../assets/zomato-rider.png")}
          style={s`h-16 w-16 bg-gray-300 p-4 rounded-full ml-5 mr-2`}
        />
        <View style={s`flex-1`}>
          <Text style={s`text-lg`}>Driver</Text>
          <Text style={s`text-gray-400`}>Your Rider</Text>
        </View>

        <Text style={s`text-red-500 text-lg mr-5 font-bold`}>Call</Text>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
