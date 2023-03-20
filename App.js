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
import MobileVerification from "./src/screens/MobileVerification.js";
import MobileOtp from "./src/screens/MobileOtp.js";

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
          <Stack.Screen
            name="MobileVerification"
            component={MobileVerification}
            options={{
              headerTitle: "Continue With Phone",
              headerStyle: {
                backgroundColor: "#1F1F39",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "100",
              },
            }}
          />
          <Stack.Screen name="MobileOtp" component={MobileOtp} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
