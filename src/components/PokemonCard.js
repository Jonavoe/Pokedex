import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function PokemonCard(props) {
  const { pokemon } = props;

  const goToPokemon = () => {
    console.log(`vamos al pokemon: ${pokemon.name}`);
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View>
        <View style={styles.spacing}>
          <View style={styles.bgStyle}>
            <Text>Name: {pokemon.name}</Text>
          </View>
        </View>

        <Text>Order: {pokemon.order}</Text>
        <Text>Element: {pokemon.type}</Text>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyle: {
    backgroundColor: "grey",
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
});
