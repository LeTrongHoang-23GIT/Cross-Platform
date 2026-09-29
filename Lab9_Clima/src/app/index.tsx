import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);

  const API_KEY = "d3d157e69905bf481b38d945d93702e9";

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      getCurrentLocation();
    }
  }, [locationPermission]);

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      await fetchWeatherByCoords(latitude, longitude);
    } catch (err) {
      setError("Could not get your location. Please search manually.");
      setLoading(false);
      console.log(err);
    }
  };

  const fetchWeatherByCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError("City not found. Please check the spelling.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      setCity(searchText);
      fetchWeatherByCity(searchText);
      setSearchText("");
    }
  };

  const handleRefresh = () => {
    if (locationPermission) {
      getCurrentLocation();
    } else if (city) {
      fetchWeatherByCity(city);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#00ffbb" />

      <View style={styles.header}>
        <Text style={styles.title}>Clima</Text>
        <Text style={styles.subtitle}>Weather App powered by React Native</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a city"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationButtonContainer}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={
            locationPermission ? getCurrentLocation : checkLocationPermission
          }
        >
          <Text style={styles.locationButtonText}>
            {locationPermission ? "Use My Location" : "Enable Location"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00d5ff" />
          <Text style={styles.loadingText}>Fetching weather data...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : weather ? (
        <ScrollView style={styles.weatherContainer}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {weather.name}, {weather.sys.country}
            </Text>
          </View>

          <View style={styles.weatherInfoContainer}>
            <View style={styles.mainWeatherContainer}>
              <Text style={styles.temperatureText}>
                {Math.round(weather.main.temp)}°C
              </Text>
              <View style={styles.weatherDescriptionContainer}>
                <Image
                  source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
                  style={styles.weatherIcon}
                />
                <Text style={styles.weatherDescription}>
                  {weather.weather[0].description}
                </Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Feels Like</Text>
                <Text style={styles.detailValue}>
                  {Math.round(weather.main.feels_like)}°C
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>
                  {weather.main.humidity}%
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>
                  {weather.wind.speed} m/s
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>
                  {weather.main.pressure} hPa
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleRefresh}
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.initialContainer}>
          <Text style={styles.initialText}>
            Search for a city or enable location services to get started
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: '#ff0004' }]}>Data powered by OpenWeatherMap</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  header: {
    backgroundColor: "#00ffbb",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e5eb",
  },
  input: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    marginRight: 8,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#000dff",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "600",
  },
  locationButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  locationButton: {
    backgroundColor: "#ffcc00",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  locationButtonText: {
    color: "#222",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
  },
  initialContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  initialText: {
    color: "#555",
    textAlign: "center",
  },
  weatherContainer: {
    flex: 1,
  },
  locationContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  weatherInfoContainer: {
    paddingHorizontal: 16,
  },
  mainWeatherContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  temperatureText: {
    fontSize: 64,
    fontWeight: "300",
    color: "#333",
  },
  weatherDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  weatherDescription: {
    fontSize: 18,
    color: "#666",
    textTransform: "capitalize",
  },
  detailsContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  refreshButton: {
    backgroundColor: "#8000ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "600",
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#999",
    fontSize: 12,
  },
});