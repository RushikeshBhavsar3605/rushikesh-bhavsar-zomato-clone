import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { useEffect, useMemo, useState } from "react";
import SafeViewAndroid from "../SafeViewAndroid";
import { s } from "react-native-wind";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { useStripe } from "@stripe/stripe-react-native";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const stripe = useStripe();

  const placeOrder = async () => {
    const response = await fetch(
      "https://rushikesh-bhavsar-zomato-clone-backend.vercel.app/payment",
      {
        method: "POST",
        body: JSON.stringify({
          amount: Math.floor((basketTotal + 40) * 100),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) return Alert.alert(data.message);

    const clientSecret = data.clientSecret;

    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Merchant Name",
    });

    if (initSheet.error) return Alert.alert(initSheet.error.message);

    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });

    if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    else {
      navigation.navigate("PreparingOrderScreen");
    }
  };

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, s`flex-1 bg-white`]}>
      <View style={s`flex-1 bg-gray-100`}>
        <View style={s`p-5 border-b border-red-500 bg-white shadow-xs`}>
          <View>
            <Text style={s`text-lg font-bold text-center`}>Basket</Text>
            <Text style={s`text-center text-gray-400`}>{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            style={s`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon color="#E33342" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View
          style={s`flex-row items-center space-x-4 px-4 py-2 bg-white my-5`}
        >
          <Image
            source={require("../assets/zomato-rider.png")}
            style={s`h-14 w-14 bg-gray-300 rounded-full`}
          />
          <Text style={s`flex-1 pl-3`}>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text style={s`text-red-500`}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={s`divide-y divide-gray-200`}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={s`flex-row items-center space-x-3 bg-white py-2 px-5`}
            >
              <Text style={s`pr-2 text-red-500`}>{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                style={s`h-12 w-12 rounded-full`}
              />
              <Text style={s`flex-1 pl-2`}>{items[0]?.name}</Text>

              <Text style={s`text-gray-600 pr-5`}>
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>

              <TouchableOpacity>
                <Text
                  style={s`text-red-500 text-xs`}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={s`p-5 bg-white mt-5 space-y-4`}>
          <View style={s`flex-row justify-between pb-5`}>
            <Text style={s`text-gray-400`}>Subtotal</Text>
            <Text style={s`text-gray-400`}>
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>

          <View style={s`flex-row justify-between pb-5`}>
            <Text style={s`text-gray-400`}>Delivery Fee</Text>
            <Text style={s`text-gray-400`}>
              <Currency quantity={40} currency="INR" />
            </Text>
          </View>

          <View style={s`flex-row justify-between pb-5`}>
            <Text>Order Total</Text>
            <Text style={s`font-extrabold`}>
              <Currency quantity={basketTotal + 40} currency="INR" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={placeOrder}
            style={s`rounded-lg bg-red-500 p-4`}
          >
            <Text style={s`text-center text-white text-lg font-bold`}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
