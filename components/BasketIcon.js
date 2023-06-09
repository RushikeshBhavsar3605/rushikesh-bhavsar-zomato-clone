import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { s } from "react-native-wind";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View style={s`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={s`mx-5 bg-red-500 p-4 rounded-lg flex-row items-center space-x-1`}
      >
        <Text style={s`text-white font-extrabold text-lg bg-red-700 py-1 px-2`}>
          {items.length}
        </Text>
        <Text style={s`flex-1 text-white font-extrabold text-lg text-center`}>
          View Basket
        </Text>
        <Text style={s`text-lg text-white font-extrabold`}>
          <Currency quantity={basketTotal} currency="INR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
