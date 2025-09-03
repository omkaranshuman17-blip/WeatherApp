import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';

const API_KEY = '4TZMBCL9AHM2BNZFCRHXRH9VG';
const LOCATION = 'Patna,India';
const BASE_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
  LOCATION
)}/today`;

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL, {
        params: {
          unitGroup: 'metric',
          key: API_KEY,
          contentType: 'json',
          include: 'days',
        },
      });

      if (response.data && response.data.days && response.data.days.length > 0) {
        setWeatherData(response.data.days[0]);
      } else {
        Alert.alert('Error', 'No weather data available');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Patna Weather - Today</Text>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {!loading && weatherData && (
        <ScrollView contentContainerStyle={styles.weatherContainer}>
          <Text style={styles.date}>{weatherData.datetime}</Text>
          <Text style={styles.temp}>
            Max: {Math.round(weatherData.tempmax)}°C | Min: {Math.round(weatherData.tempmin)}°C
          </Text>
          <Text style={styles.tempCurrent}>Avg Temp: {Math.round(weatherData.temp)}°C</Text>
          <Text style={styles.description}>{weatherData.conditions}</Text>
          <View style={styles.details}>
            <Text>Humidity: {weatherData.humidity}%</Text>
            <Text>Precipitation: {weatherData.precip} in</Text>
            <Text>Wind Speed: {weatherData.windspeed} mph</Text>
            <Text>UV Index: {weatherData.uvindex}</Text>
            <Text>Sunrise: {weatherData.sunrise}</Text>
            <Text>Sunset: {weatherData.sunset}</Text>
          </View>
        </ScrollView>
      )}
      {!loading && !weatherData && (
        <Text style={styles.errorText}>No weather data available.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#003366',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
    marginBottom: 10,
    color: '#004080',
  },
  temp: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
  },
  tempCurrent: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#0059b3',
  },
  description: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  details: {
    width: '80%',
    backgroundColor: '#cce0ff',
    padding: 15,
    borderRadius: 10,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
});

export default App;