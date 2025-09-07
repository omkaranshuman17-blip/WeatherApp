import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

const API_KEY = 'f181fc95fa5b6536f549311367652f31';
const BASE_URL = 'http://api.weatherstack.com/current';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('New York');

  const fetchWeather = async () => {
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL, {
        params: {
          access_key: API_KEY,
          query: location,
          units: 'm',
        },
      });

      if (response.data && response.data.current) {
        setWeatherData(response.data);
      } else {
        Alert.alert('Error', 'No weather data available for this location');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {!loading && weatherData && (
        <ScrollView contentContainerStyle={styles.weatherContainer}>
          <Text style={styles.location}>{weatherData.location.name}, {weatherData.location.country}</Text>
          <Text style={styles.tempCurrent}>{weatherData.current.temperature}°C</Text>
          <Text style={styles.description}>{weatherData.current.weather_descriptions[0]}</Text>
          {weatherData.current.weather_icons[0] && (
            <Image source={{ uri: weatherData.current.weather_icons[0] }} style={styles.weatherIcon} />
          )}
          <View style={styles.details}>
            <Text>Humidity: {weatherData.current.humidity}%</Text>
            <Text>Precipitation: {weatherData.current.precip} mm</Text>
            <Text>Wind Speed: {weatherData.current.wind_speed} km/h</Text>
            <Text>Wind Direction: {weatherData.current.wind_dir}</Text>
            <Text>Pressure: {weatherData.current.pressure} mb</Text>
            <Text>Visibility: {weatherData.current.visibility} km</Text>
          </View>
        </ScrollView>
      )}
      {!loading && !weatherData && (
        <Text style={styles.errorText}>Enter a location and tap "Get Weather" to see the forecast.</Text>
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#004080',
  },
  tempCurrent: {
    fontSize: 48,
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
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  details: {
    width: '90%',
    backgroundColor: '#cce0ff',
    padding: 15,
    borderRadius: 10,
  },
  errorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;