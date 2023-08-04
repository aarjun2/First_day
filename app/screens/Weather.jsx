import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, 
  ScrollView, ActivityIndicator, Image } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WEATHER } from '@env';
import { LocationContext } from './MainNavigator';

export default function WeatherScreen() {
  const [search, setSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { city} = useContext(LocationContext);

  useEffect(() => {
    console.log('City from Context:', city);
    if (city) {
      setLoading(true);
      fetchWeatherData(city)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
    }
  }, [city]);

  const handleLocation = () => {
    setLoading(true);
    fetchWeatherData(location)
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
        setSearch(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER}&q=${cityName}&days=10&aqi=no&alerts=no`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  return (
    <View style={tw`flex-1 relative bg-black p-4`}>
      <View
        style={
          search
            ? tw`flex-row justify-end items-center rounded-full bg-yellow-400 p-2`
            : tw`flex-row justify-end items-center rounded-full bg-transparent p-2`
        }
      >
        {search ? (
          <TextInput
            placeholder="Search city"
            placeholderTextColor="black"
            style={tw`pl-6 h-10 pb-1 flex-1 text-base text-black`}
            onChangeText={(text) => setLocation(text)}
            onSubmitEditing={handleLocation}
            value={location}
          />
        ) : null}
        <TouchableOpacity
          style={tw`rounded-full p-3 m-1 bg-stone-400`}
          onPress={() => {
            if (search && location) {
              handleLocation();
            }
            setSearch(!search);
          }}
        >
          <Ionicons name="search" size={25} color="black" /> 
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
      {weatherData && (
        <ScrollView>
          <View>
            <Text style={tw`text-white text-center text-2xl font-bold mt-5`}>
              {weatherData.location.name},{' '}
              <Text style={tw`text-lg font-semibold text-yellow-300`}>
                {weatherData.location.country}
              </Text>
            </Text>
          </View>

          
          <View style={tw`flex justify-center items-center mt-5`}>
            <Text style={tw`text-white text-4xl font-bold`}>
              {weatherData.current.condition.text}
            </Text>
            <Image
              source={{ uri: `http:${weatherData.current.condition.icon}` }}
              style={tw`w-50 h-50 mt-3`}
            />
            <View style={tw`flex-row items-center mt-3`}>
              <Text style={tw`text-white text-3xl font-semibold`}>
                {weatherData.current.temp_c}&#176;
              </Text>
              <View style={tw`ml-5`}>
                <View style={tw`flex-row`}>
                  <Text style={tw`text-yellow-300 text-base`}>Max:</Text>
                  <Text style={tw`text-yellow-300 text-base ml-2`}>
                    {weatherData.forecast.forecastday[0].day.maxtemp_c}&#176;
                  </Text>
                </View>
                <View style={tw`flex-row`}>
                  <Text style={tw`text-blue-300 text-base`}>Min:</Text>
                  <Text style={tw`text-blue-300 text-base ml-2`}>
                    {weatherData.forecast.forecastday[0].day.mintemp_c}&#176;
                  </Text>
                </View>
              </View>
            </View>
            </View>

          
          <View style={tw`mb-2 mt-5`}>
            <View style={tw`flex-row items-center mx-5 mb-2`}>
              <Ionicons name="time" size={22} color="white" /> 
              <Text style={tw`text-white text-base ml-2 font-bold`}>Hourly Forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                <View
                  key={index}
                  style={tw`flex justify-center items-center w-24 rounded-3xl py-3 mr-4`}
                >
                  <Text style={tw`text-white`}>{hour.time.slice(-5)}</Text>
                  <Image source={{ uri: `http:${hour.condition.icon}` }} style={tw`w-25 h-25 mt-2`} />
                  <Text style={tw`text-white text-xl font-semibold`}>{hour.temp_c}&#176;</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          
          <View style={tw`mb-2 mt-5`}>
            <View style={tw`flex-row items-center mx-5 mb-2`}>
              <Ionicons name="calendar" size={22} color="white" /> 
              <Text style={tw`text-white text-base ml-2 font-bold`}>Daily Forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weatherData.forecast.forecastday.map((day, index) => (
                <View
                  key={index}
                  style={tw`flex justify-center items-center w-24 rounded-3xl py-3 mr-4`}
                >
                  <Text style={tw`text-white`}>{day.date}</Text>
                  <Image source={{ uri: `http:${day.day.condition.icon}` }} style={tw`w-25 h-25 mt-2`} />
                  <Text style={tw`text-white text-xl font-semibold`}>
                    {day.day.maxtemp_c}&#176;
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
}