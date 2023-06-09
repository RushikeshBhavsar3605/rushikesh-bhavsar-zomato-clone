import { Image, Text, TouchableOpacity, View } from "react-native";
import { s } from "react-native-wind";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={s`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View style={s`flex-row`}>
          <View style={s`flex-1 pr-2`}>
            <Text style={s`text-lg mb-1`}>{name}</Text>
            <Text style={s`text-gray-400`}>{description}</Text>
            <Text style={s`text-gray-400 mt-2`}>
              <Currency quantity={price} currency="INR" />
            </Text>
          </View>

          <View>
            <Image
              source={{
                uri: urlFor(image).url(),
              }}
              style={s`h-20 w-20 bg-gray-300 p-4 border border-[#F3F3F4]`}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={s`bg-white px-4`}>
          <View style={s`flex-row items-center space-x-2 pb-3`}>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#E33342" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#E33342" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
