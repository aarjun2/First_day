import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { APIKEY } from '@env';

const RestaurantResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cityVal, stateVal } = route.params;

  const [restaurantData, setRestaurantData] = useState(null);
  useEffect(() => {
    const fetchRestaurantbyLocation = async () => {
      const url = `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${stateVal}/city/${cityVal}/0`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setRestaurantData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantbyLocation();
  }, []);

  const renderRestaurantItems = () => {
    if (restaurantData?.restaurants) {
      return restaurantData.restaurants.slice(0, 10).map((restaurant, index) => (
        <TouchableOpacity key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: 'black', marginBottom: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'yellow' }}>{restaurant.restaurantName}</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>{restaurant.address}</Text>
          <Text style={{ fontSize: 14, color: 'yellow', textDecorationLine: 'underline' }}>{restaurant.website}</Text>
        </TouchableOpacity>
      ));
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView>
        {restaurantData && renderRestaurantItems()}
      </ScrollView>
    </View>
  );
};

export default RestaurantResults;