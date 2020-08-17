import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/index";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  BORDER_COLOR,
  SECONDARY_COLOR_DETAILS,
} = colors;
export default function WeatherDetails({ currentWeather, unitSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
    sys: { sunrise, sunset },
  } = currentWeather;

  const date = new Date(sunrise * 1000).toLocaleTimeString();

  const windSpeed =
    unitSystem === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;
  return (
    <LinearGradient
      // Linear Gradient
      // colors={["#3F58A7", "#31356e"]}
      colors={["#6376ce", "#354699"]}
      // style={{ flex: 1 }}
    >
      <View style={styles.weatherDetails}>
        <View style={styles.weatherDetailsRow}>
          <View
            style={{
              ...styles.weatherDetailsBox,
              // borderRightWidth: 1,
              // borderRightColor: BORDER_COLOR,
            }}
          >
            <View style={styles.weatherDetailsRow}>
              <FontAwesome5
                name="temperature-low"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text style={styles.weatherDetailsTitleItems}>Sensação:</Text>
                <Text style={styles.textSecondary}>{feels_like}°</Text>
              </View>
            </View>
          </View>
          <View style={styles.weatherDetailsBox}>
            <View style={styles.weatherDetailsRow}>
              <MaterialCommunityIcons
                name="water"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text style={styles.weatherDetailsTitleItems}>Umidade:</Text>
                <Text style={styles.textSecondary}>{humidity}%</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styles.weatherDetailsRow,
            // borderTopWidth: 1,
            // borderTopColor: BORDER_COLOR,
          }}
        >
          <View
            style={{
              ...styles.weatherDetailsBox,
              // borderRightWidth: 1,
              // borderRightColor: BORDER_COLOR,
            }}
          >
            <View style={styles.weatherDetailsRow}>
              <MaterialCommunityIcons
                name="weather-windy"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text style={styles.weatherDetailsTitleItems}>
                  Velocidade do Vento:
                </Text>
                <Text style={styles.textSecondary}>{windSpeed}</Text>
              </View>
            </View>
          </View>
          <View style={styles.weatherDetailsBox}>
            <View style={styles.weatherDetailsRow}>
              <MaterialCommunityIcons
                name="speedometer"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text style={styles.weatherDetailsTitleItems}>
                  Pressão atmosférica:
                </Text>
                <Text style={styles.textSecondary}>{pressure} hPa</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styles.weatherDetailsRow,
            // borderTopWidth: 1,
            // borderTopColor: BORDER_COLOR,
          }}
        >
          <View
            style={{
              ...styles.weatherDetailsBox,
              // borderRightWidth: 1,
              // borderRightColor: BORDER_COLOR,
            }}
          >
            <View style={styles.weatherDetailsRow}>
              <MaterialCommunityIcons
                name="weather-sunset-up"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text style={styles.weatherDetailsTitleItems}>
                  Nascer do Sol:
                </Text>
                <Text style={styles.textSecondary}>
                  {new Date(sunrise * 1000).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.weatherDetailsBox}>
            <View style={styles.weatherDetailsRow}>
              <MaterialCommunityIcons
                name="weather-sunset-down"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text style={styles.weatherDetailsTitleItems}>Pôr do Sol:</Text>
                <Text style={styles.textSecondary}>
                  {new Date(sunset * 1000).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: "auto",
    // margin: 15,
    // borderWidth: 2,
    // borderColor: BORDER_COLOR,
    // borderRadius: 10,
    // backgroundColor: "rgba(255,255,255,0.4)",
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  weatherDetailsItems: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  weatherDetailsTitleItems: {
    // color: "rgba(255,255,255,0.4)",
    color: "#edeef2",
    fontWeight: "100",
  },
  textSecondary: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    fontWeight: "700",
    margin: 2,
  },
});
