<script setup>
import axios from "axios";
import WelcomeItem from "./WelcomeItem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
</script>

<template>
  <WelcomeItem @click="getPokemon">
    <template #icon>
      <CommunityIcon />
    </template>
  </WelcomeItem>
  <h1 class="green">{{ pokemon }}</h1>
  <img :src="imagePath" alt="pokemon" />
</template>

<script>

export default {
  data() {
    return {
      pokemon: String,
      imagePath: String,
    };
  },

  mounted() {
    this.getPokemon();
  },

  methods: {
    async getPokemon() {
      let randId = Math.floor(Math.random() * 1000) + 1;
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${randId}`)
        .then((res) => {
          this.pokemon = res.data.name;
          this.imagePath = res.data.sprites.other["official-artwork"].front_default;
          console.log(`generated ${this.pokemon} path > `, this.imagePath);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}
</script>
