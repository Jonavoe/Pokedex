import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { getPokemonApi } from "../api/pokemon";

export default function Pokedex() {
  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
    console.log("hola mundo");
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <Text>Pokedex</Text>
    </SafeAreaView>
  );
}
