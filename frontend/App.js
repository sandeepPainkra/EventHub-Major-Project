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
import AllEventCategories from "./screens/AllEventCategories.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import EventCategory from "./screens/Extra-screens/EventCategory.js";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(null);
  const [Token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      if (value !== null) {
        setIsLoading(true);
        setToken(value);
        console.log(value);
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoading == null ? (
            <Stack.Screen name="Landing Screen" component={LandingScreen} />
          ) : isLoading === true ? (
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
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Slider2" component={Slider2} />
              <Stack.Screen name="Slider3" component={Slider3} />
            </>
          )}
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="MobileOtp" component={MobileOtp} />
          <Stack.Screen name="Verified" component={Verified} />
          <Stack.Screen
            name="Parent"
            component={Parent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllEventCategories"
            component={AllEventCategories}
          />
          <Stack.Screen
            name="EventCategory"
            options={{
              headerTitle: "Event Category",
              headerStyle: {
                backgroundColor: "#2F2F42",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "100",
              },
            }}
            component={EventCategory}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
