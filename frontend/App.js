import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen.js";
import Slider2 from "./screens/Slider2.js";
import Slider3 from "./screens/Slider3.js";
import Login from "./screens/Login.js";
import Register from "./screens/Register.js";
import MobileVerification from "./screens/MobileVerification.js";
import MobileOtp from "./screens/MobileOtp.js";
import Verified from "./screens/Verified.js";
import Parent from "./screens/Parent.js";
import AllEventCatogaries from "./screens/Extra-screens/AllEventCatogaries.js";

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
          <Stack.Screen name="Verified" component={Verified} />

          <Stack.Screen
            name="Parent"
            component={Parent}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
