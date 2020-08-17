import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({ currentWeather }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWeather;

  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.cityName}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={[styles.textPrimary]}>{temp}°</Text>
      <Text style={[styles.weatherDescription, styles.textSecondary]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
    color: PRIMARY_COLOR,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  cityName: {
    color: PRIMARY_COLOR,
    fontSize: 25,
  },
  textPrimary: {
    fontSize: 45,
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    fontWeight: "400",
  },
});
