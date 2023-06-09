import { SafeAreaView, View } from "react-native";
import { s } from "react-native-wind";
import SafeViewAndroid from "../SafeViewAndroid";
import * as Animatable from "react-native-animatable";
import { Circle } from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView
      style={[
        SafeViewAndroid.AndroidSafeArea,
        s`flex-1 justify-center items-center`,
        {
          backgroundColor: "#E33342",
        },
      ]}
    >
      <Animatable.Image
        source={require("../assets/zomato-loading-rider.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={s`h-96 w-96`}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={s`text-lg my-10 text-white font-bold text-center`}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
