<template>
  <div style="height: 100%">
    <v-row style="width: 90%; height: 100%" class="mx-auto mt-10">
      <v-col
        style="height: 40%; width: 40%"
        v-for="item in items"
        :key="item.id"
      >
        <v-card style="height: 100%">
          <v-card-text style="height: 100%">
            <v-row style="height: 100%">
              <v-col cols="12" md="6">
                <v-img style="height: 100%" :src="item.image" />
              </v-col>
              <v-col cols="12" md="6">
                <div class="mt-10">
                  {{ item.name }} <br />
                  ${{ item.prices.price.price }}
                  <br />
                  <v-btn class="mt-8" @click="showItem(item)">Read More</v-btn>
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
import { itemsStore } from "../utils/itemsStore";
import axios from "axios";

export default defineComponent({
  setup() {
    const info = ref("hello");
    const items = ref([]);
    const currentItem = computed({
      get() {
        return itemsStore.state.item;
      },
      set(newValue) {
        itemsStore.state.item = newValue;
      },
    });
    async function getData() {
      const { data } = await axios.get(
        "https://dev.menu.ninja/api/menu/156?key=8j5vfe%24*pfb**rzt&pretty=1"
      );
      items.value = data.menu.items;
      console.log("test", items.value);
    }
    async function showItem(item) {
      currentItem.value = item;
      console.log(currentItem.value);
      alert("Welldone!");
    }
    onMounted(() => {
      getData();
    });
    return { info, getData, items, showItem };
  },
});
</script>

<style scoped></style>
