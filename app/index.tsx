import { Image, StyleSheet, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
export default function HomeScreen() {
  const api_key: string = "063e54db6553bd372bffc9fee653d5ae";
  const [city, setCity] = useState<string>("delhi");
  const [country_code, setCountry_code] = useState<string>("in");
  const [weather, setWeather] = useState<any>({});
  const [town, setTown] = useState<string>("delhi");
  const fetchdata = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&appid=${api_key}&units=metric`
      );

      setWeather(res.data);
      setTown(city);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Weather App</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Enter City Name</ThemedText>
        <TextInput
          style={{
            padding: 10,
            borderColor: "gray",
            borderWidth: 1,
            color: "white",
          }}
          onChangeText={(text) => setCity(text)}
          value={city}
        />
        <ThemedText type="defaultSemiBold">Enter Country Code</ThemedText>
        <TextInput
          style={{
            padding: 10,
            borderColor: "gray",
            borderWidth: 1,
            color: "white",
          }}
          onChangeText={(text) => setCountry_code(text)}
          value={country_code}
        />
        <Button title="Search" onPress={fetchdata} />
      </ThemedView>
      <ThemedView style={styles.weathercontainer}>
        <ThemedText type="defaultSemiBold" style={styles.description}>
          {town} Weather:
        </ThemedText>
        <ThemedText type="title">
          {weather.main && weather.main.temp}°C
        </ThemedText>
        <ThemedText type="subtitle" style={styles.description}>
          {weather.weather && weather.weather[0].description}
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          Humidity: {weather.main && weather.main.humidity}%
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          Wind Speed: {weather.wind && weather.wind.speed}m/s
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  weathercontainer: {
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 20,
  },
  description: {
    textTransform: "capitalize",
  },
});
