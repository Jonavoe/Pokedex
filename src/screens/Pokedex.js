import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { getPokemonApi, getPokemonDetailsByUrlApi } from "../api/pokemon";

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default function Pokedex() {
  const [apiPokemons, setApiPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadApiPokemons();
  }, [page]);

  useEffect(() => {
    loadPokemons(apiPokemons);
  }, [apiPokemons]);

  const loadApiPokemons = async () => {
    const response = await getPokemonApi(page);
    setApiPokemons(response.results);
  };

  const loadPokemons = async (apiPokemons) => {
    setPokemons([]);
    const newPokemons = await Promise.all(
      apiPokemons.map(async (pokemon) => {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        const newPokemon = {
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          imagen:
            pokemonDetails.sprites.other["official-artwork"].front_default,
        };
        return newPokemon;
      })
    );

    const uniquePokemons = newPokemons.filter(
      (newPokemon) => !pokemons.some((p) => p.id === newPokemon.id)
    );

    setPokemons((prevPokemons) => [...prevPokemons, ...uniquePokemons]);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.pokemonContainer}>
        {pokemons.map((pokemon, index) => (
          <View
            key={index}
            style={[
              styles.pokemonItem,
              { backgroundColor: typeColors[pokemon.type] || "#CCCCCC" },
            ]}
          >
            <Image
              source={{ uri: pokemon.imagen }}
              style={styles.pokemonImage}
            />
            <View>
              <Text>{pokemon.name}</Text>
              <Text>{pokemon.type}</Text>
              <Text>{pokemon.order}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.paginationContainer}>
        <Button
          title="Previous Page"
          onPress={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        />
        <Text>{page}</Text>
        <Button title="Next Page" onPress={() => setPage(page + 1)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  pokemonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pokemonItem: {
    width: 180,
    height: 180,
    margin: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
