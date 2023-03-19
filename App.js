import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen.js";
import Slider2 from "./src/screens/Slider2.js";
import Slider3 from "./src/screens/Slider3.js";
import Login from "./src/screens/Login.js";
import Register from "./src/screens/Register.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing Screen" component={LandingScreen} />
          <Stack.Screen name="Slider2" component={Slider2} />
          <Stack.Screen name="Slider3" component={Slider3} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
