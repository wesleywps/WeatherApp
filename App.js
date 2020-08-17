// https://openweathermap.org/current

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import { AppLoading } from "expo";
import WeatherInfo from "./components/WeatherInfo";
import UnitUnitsPickersPicker from "./components/UnitsPicker";
import UnitsPicker from "./components/UnitsPicker";
import ReloadIcon from "./components/ReloadIcon";
import { colors } from "./utils";
import WeatherDetails from "./components/WeatherDetails";

const WEATHER_API_KEY = "6f050aacb14fb92d1a9d4c6df8de3d3b";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
const BASE_WEATHER_5DAYS_URL =
  "https://api.openweathermap.org/data/2.5/forecast?";
const LANGUAGE = "pt_br";

export default function App() {
  const [errorMEssage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    load();
  }, [unitSystem]);
  async function load() {
    // setCurrentWeather(null);
    // setErrorMessage(null);
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status != "granted") {
        setErrorMessage("Necessário permissão para acessar localização");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}&lang=${LANGUAGE}`;
      const weatherUrl5Days = `${BASE_WEATHER_5DAYS_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}&lang=${LANGUAGE}`;
      const responseAPI = await fetch(weatherUrl);
      const result = await responseAPI.json();
      // console.log(weatherUrl5Days);
      // console.log(result);

      if (responseAPI.ok) {
        console.log("API respondeu");
        setCurrentWeather(result);
      } else {
        console.log("API não respondeu");
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(errorMEssage.message);
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitSystem={unitSystem}
        />
      </View>
    );
  } else if (errorMEssage) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <ReloadIcon load={load} />
          <Text>{errorMEssage}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{ alignItems: "center" }}>Deu Ruim</Text>
        <ActivityIndicator size="large" color={colors.LOADING_COLOR} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#6376ce",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});
