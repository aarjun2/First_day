import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

import Account from './Account';
import DetailsScreen from './DetailsScreen';
import WeatherScreen from './Weather';
import RestaurantStack from './RestaurantStack';
import HotelStack from './HotelStack';

const detailsName = "Details";
const settingsName = "Settings";
const weatherName = "Weather";
const restaurantName = "Restaurant";
const hotelName = "Hotel";

const Tab = createBottomTabNavigator();
export const LocationContext = React.createContext();

function MainContainer() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  return (
    <LocationContext.Provider value={{ city, setCity, state, setState }}>
      <Tab.Navigator
        initialRouteName={detailsName} 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color}) => {
            let iconName;
            let rn = route.name;

            if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            else if (rn === weatherName) {
                iconName = focused ? 'cloud' : 'cloud-outline';
            }
            else if (rn == restaurantName) {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
            }
            else if (rn == hotelName) {
                iconName = focused ? 'bed' : 'bed-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />; 
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 }, 
          tabBarStyle: { height: 70, paddingTop: 10, paddingBottom: 5 }, 
        })}
      >
        <Tab.Screen name={detailsName} component={DetailsScreen} options={{ headerShown: false }}/>
        <Tab.Screen name={settingsName} component={Account} />
        <Tab.Screen name={weatherName} component={WeatherScreen} options={{ headerShown: false }}/>
        <Tab.Screen name={restaurantName} component={RestaurantStack} options={{ headerShown: false }}/>
        <Tab.Screen name={hotelName} component={HotelStack} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </LocationContext.Provider>
  );
}

export default MainContainer;