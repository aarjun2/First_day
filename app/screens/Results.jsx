import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { APIKEY } from '@env';

const Results = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, selectedDate, numberOfAdults } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigate = () => {
    navigation.navigate('Map', { mapData });
  };

  const formatSelectedDate = (dateString) => {
    const [year, month, day] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const [regionData, setRegionData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const endDate = formatSelectedDate(selectedDate.endDate);
  const startDate = formatSelectedDate(selectedDate.startDate);

  useEffect(() => {
    const fetchRegionByLocation = async () => {
      const url = `https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_US&query=${destination}&domain=US`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setRegionData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegionByLocation();
  }, []);

  useEffect(() => {
    const fetchHotelByLocation = async () => {
      const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?domain=US&sort_order=REVIEW&locale=en_US&checkout_date=${endDate}&region_id=${regionData?.data[0]?.gaiaId}&adults_number=${numberOfAdults}&checkin_date=${startDate}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setHotelData(result);
        if (result?.properties?.length > 0) {
          const mapData = result.properties.slice(0, 20).map((hotel) => ({
            id: hotel.id,
            name: hotel.name,
            latitude: hotel.mapMarker.latLong.latitude,
            longitude: hotel.mapMarker.latLong.longitude,
          }));
          setMapData(mapData);
        }
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading state to false even if there's an error
      }
    };

    if (regionData?.data && regionData.data.length > 0) {
      fetchHotelByLocation();
    }
  }, [regionData, numberOfAdults, selectedDate]);

  // Add a loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  return (
    <View style={tw`p-4 flex-1 bg-black`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={tw`text-blue-500`}>Go Back</Text>
        </TouchableOpacity>
        <Button onPress={handleNavigate} title="MAP" color="yellow" />
      </View>

      <Text style={tw`text-2xl font-bold text-yellow-500`}>Destination: {destination}</Text>
      <View style={tw`mt-4 flex-1`}>
        <ScrollView>
          {hotelData?.properties?.slice(0, 20).map((hotel) => (
            <View key={hotel.id} style={tw`border mb-3 p-3 rounded-lg bg-yellow-100`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Image source={{ uri: hotel.propertyImage.image.url }} style={tw`w-20 h-20 mr-4`} />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-black`}>{hotel.name}</Text>
                  <Text style={tw`text-yellow-500 mt-1`}>Price: {hotel.price.lead.amount}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Results;