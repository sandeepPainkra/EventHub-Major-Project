import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import ParticipatedEvents from "./screens/Extra-screens/ParticipatedEvents.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store.js";
import { getUserProfile } from "./redux/actions.js";
import Avesh_Event_Details_brief from "./screens/Extra-screens/Avesh_Event_Details_brief.js";

import Avesh_Events from "./screens/Extra-screens/Avesh_Events.js";
import Form_AveshEvent from "./screens/Extra-screens/Form_AveshEvent.js";

// root Component here
const RootComponent = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchData = async () => {
      if (userData.token) {
        await AsyncStorage.setItem("token", userData.token);
        setToken(userData.token);
      } else {
        console.log("token does not exist!!");
      }
    };
    fetchData();
  }, [userData]);

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      if (!value) {
        console.log("Token doesn't exist");
      } else {
        setToken(value);
        console.log("Token does exist", value);
      }
    });
    const fetchUser = async () => {
      await AsyncStorage.getItem("user", (err, result) => {
        if (result) {
          console.log("User from asyncStorage :", result);
          dispatch(getUserProfile(JSON.parse(result)));
        } else {
          console.log("User doesn't exist");
        }
      });
    };
    fetchUser();
  }, []);
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!token ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
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
          )}
          <Stack.Screen name="Landing Screen" component={LandingScreen} />

          {/* <Stack.Screen
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
          /> */}

          <Stack.Screen name="Slider2" component={Slider2} />
          <Stack.Screen name="Slider3" component={Slider3} />

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
          <Stack.Screen
            name="Participated Events"
            component={ParticipatedEvents}
            options={{
              headerTitle: "All Participated Events",
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
          <Stack.Screen
            name="Avesh Events"
            component={Avesh_Events}
            options={{
              headerTitle: "Avesh Events",
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
          />
          <Stack.Screen
            name="Avesh Events Details in Brief"
            component={Avesh_Event_Details_brief}
            options={{
              headerTitle: "Event Details",
              headerStyle: {
                backgroundColor: "#2F2F42",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 22,
              },
            }}
          />
          <Stack.Screen
            name="Form_AveshEvent"
            component={Form_AveshEvent}
            options={{
              headerTitle: "Create Event",
              headerStyle: {
                backgroundColor: "#2F2F42",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 22,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}
