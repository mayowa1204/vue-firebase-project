<template>
  <div style="height: 100%" class="mt-6">
    <v-row style="width: 90%; height: 100%" class="mx-auto mt-10">
      <v-col
        style="height: 40%; width: 40%"
        v-for="item in items"
        :key="item.id"
        cols="6"
        lg="4"
      >
        <v-card style="height: 100%; border-radius: 20px">
          <v-card-text style="height: 100%">
            <v-row style="height: 100%">
              <v-col class="image-col" cols="12" md="8">
                <v-img class="mt-3" style="height: 90%" :src="item.image" />
              </v-col>
              <v-col cols="12" md="4" class="text-col">
                <div style="height: 95%">
                  <div style="height: 50%; width: 100%" class="mt-8">
                    <h2 style="line-height: 1.5" class="item-name">
                      {{ item.name }}
                    </h2>
                    <h3 class="mt-3">${{ item.prices.price.price }}</h3>
                  </div>
                  <div style="height: 30%; width: 100%" class="mt-5">
                    <v-tooltip
                      elevation="0"
                      top
                      color="#ddd5cc"
                      min-width="300px"
                      min-height=" 500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="red"
                          class="mt-5"
                          style="width: 100%"
                          @click="showItem(item)"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          Read More
                        </v-btn>
                      </template>
                      <v-row class="mx-auto mt-10" style="color: black">
                        <v-row class="mx-auto">
                          <h3 class="mb-n4">Description:</h3>
                          <br />
                          {{ item.details }}
                        </v-row>

                        <v-row class="mx-auto mt-7" style="height: 18vh">
                          <h4 style="color: black">LifeStyle Advice:</h4>
                          <br />
                          <p style="color: black" class="mt-n10">
                            {{
                              item.dairyfree != 0
                                ? "Dairy Free,"
                                : "Not Dairy Free,"
                            }}
                            {{
                              item.glutenfree != 0
                                ? "Gluten Free,"
                                : "Not Gluten Free,"
                            }}
                            {{
                              item.vegeterian
                                ? "Vegeterian,"
                                : " Not Vegeterian,"
                            }}
                            {{ item.vegan != 0 ? "Vegan" : "Not Vegan" }}
                          </p>
                        </v-row>
                      </v-row>
                    </v-tooltip>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from "@vue/composition-api";
import { menuStore } from "../utils/menuStore";
import router from "../router";
import axios from "axios";

export default defineComponent({
  setup() {
    const info = ref("hello");
    const items = ref([]);
    const currentItem = computed({
      get() {
        return menuStore.state.item;
      },
      set(newValue) {
        menuStore.state.item = newValue;
      },
    });
    async function getData() {
      const { data } = await axios.get(
        "https://dev.menu.ninja/api/menu/156?key=8j5vfe%24*pfb**rzt&pretty=1"
      );
      items.value = data.menu.items;
    }
    async function showItem(item) {
      currentItem.value = item;
      router.push("menu-item-data");
    }
    onMounted(() => {
      getData();
    });
    return { info, getData, items, showItem };
  },
});
</script>

<style scoped>
.v-tooltip__content {
  width: 200px;
  color: #ddd5cc;
}
.v-tooltip {
  background-color: red !important;
}
@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
  .image-col {
    width: 70% !important;
  }
  .text-col {
    width: 30% !important;
  }
}
@media only screen and (max-width: 750px) {
  .item-name {
    font-size: 14px;
  }
}
</style>
