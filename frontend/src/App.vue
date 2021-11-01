<template>
  <v-app>
    <v-app-bar app color="#696969">
      <div
        class="d-flex align-center ml-10"
        style="font-family: Lucida Handwriting, cursive; font-size: 32px"
      >
        Bistro
      </div>

      <v-spacer></v-spacer>
      <router-link class="mr-2" to="/" style="color: white">Menu</router-link> |
      <router-link class="ml-2" to="/contact-us" style="color: white"
        >Contact Us</router-link
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
