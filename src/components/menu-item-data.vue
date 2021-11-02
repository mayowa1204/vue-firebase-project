<template>
  <v-container>
    <section class="heading heading-section" style="height: 55vh">
      <v-row class="mx-auto heading" style="height: 55vh">
        <v-col cols="12" md="6" class="mx-auto image-col" style="height: 100%">
          <v-carousel
            :show-arrows="false"
            style="height: 90%; width: 90%"
            class="mx-auto mt-n2"
          >
            <v-carousel-item v-for="(image, i) in images" :key="i">
              <v-sheet
                class="mx-auto"
                tile
                height="100%"
                style="background-color: transparent"
              >
                <v-row
                  class="fill-height mx-auto"
                  align="center"
                  style="width: 100%; height: 100%"
                  justify="center"
                >
                  <img
                    contain
                    style="width: 80%"
                    class="picture mx-auto"
                    aspect-ratio="1"
                    :src="image"
                    alt=""
                  />
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" md="6" class="mx-auto text-col" style="height: 100%">
          <div
            class="mx-auto heading-text"
            style="width: 90%; height: 60%; margin-top: 150px"
          >
            <h2 style="line-height: 1.8">
              {{ currentMenuItem.name }} <br />
              ${{ currentMenuItem.prices.price.price }}
            </h2>
            <br />
            <p class="mt-n3" style="color: purple">
              {{ currentMenuItem.details }}
            </p>
            <p style="float: right; color: blue" class="mt-n3">
              Menu Item ID: {{ currentMenuItem.menuitemid }}
            </p>
          </div>
        </v-col>
      </v-row>
    </section>
    <section class="allergens" style="height: 30vh">
      <v-row class="mx-auto">
        <div style="height: 8vh; width: 100%" class="mt-10">
          <h3 style="color: blue">LifeStyle Advice:</h3>

          <p>
            {{
              currentMenuItem.dairyfree != 0 ? "Dairy Free," : "Not Dairy Free,"
            }}
            {{
              currentMenuItem.glutenfree != 0
                ? "Gluten Free,"
                : "Not Gluten Free,"
            }}
            {{
              currentMenuItem.vegeterian ? "Vegeterian," : " Not Vegeterian,"
            }}
            {{ currentMenuItem.vegan != 0 ? "Vegan" : "Not Vegan" }}
          </p>
        </div>
        <div>
          <h3 style="color: blue">Allergy Advice:</h3>
          <h4>Does not contain:</h4>
          <p>
            {{ currentMenuItem.celery == 0 ? "Celery," : "" }}
            {{ currentMenuItem.crustaceans == 0 ? "Crustaceans," : "" }}
            {{ currentMenuItem.eggs == 0 ? "Eggs," : "" }}
            {{ currentMenuItem.fish == 0 ? "Fish," : "" }}
            {{ currentMenuItem.lupin == 0 ? "Lupin," : "" }}
            {{ currentMenuItem.molluscs == 0 ? "Molluscs," : "" }}
            {{ currentMenuItem.mustard == 0 ? "Mustard," : "" }}
            {{ currentMenuItem.nuts == 0 ? "Nuts," : "" }}
            {{ currentMenuItem.peanuts == 0 ? "Peanuts," : "" }}
            {{ currentMenuItem.sesame == 0 ? "Sesame," : "" }}
            {{ currentMenuItem.soybeans == 0 ? "Soybeans," : "" }}
            {{ currentMenuItem.sulphurDioxide == 0 ? "Sulphur Dioxide," : "" }}
            {{ currentMenuItem.wheat == 0 ? "Wheat" : "" }}
          </p>
          <h4>Contains:</h4>
          <p>
            {{ currentMenuItem.celery == 1 ? "Celery," : "" }}
            {{ currentMenuItem.crustaceans == 1 ? "Crustaceans," : "" }}
            {{ currentMenuItem.eggs == 1 ? "Eggs," : "" }}
            {{ currentMenuItem.fish == 1 ? "Fish," : "" }}
            {{ currentMenuItem.lupin == 1 ? "Lupin," : "" }}
            {{ currentMenuItem.molluscs == 1 ? "Molluscs," : "" }}
            {{ currentMenuItem.mustard == 1 ? "Mustard," : "" }}
            {{ currentMenuItem.nuts == 1 ? "Nuts," : "" }}
            {{ currentMenuItem.peanuts == 1 ? "Peanuts," : "" }}
            {{ currentMenuItem.sesame == 1 ? "Sesame," : "" }}
            {{ currentMenuItem.soybeans == 1 ? "Soybeans," : "" }}
            {{ currentMenuItem.sulphurDioxide == 1 ? "Sulphur Dioxide," : "" }}
            {{ currentMenuItem.wheat == 1 ? "Wheat" : "" }}
          </p>
        </div>
      </v-row>
    </section>
    <section>
      <v-row class="mx-auto" style="width: 100%; height: 65vh">
        <v-col cols="12" class="mx-auto table" style="width: 70%">
          <div style="height: 10%; width: 100%">
            <h3 style="height: 10px">Nutritional Values:</h3>
          </div>
          <v-simple-table class="table-body">
            <template v-slot:default>
              <thead>
                <tr>
                  <th id="heading" class="text-left">Name</th>
                  <th id="heading" class="text-left">Per Meal</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style="height: 10px"
                  v-for="item in nutritionalLabelling"
                  :key="item.name"
                >
                  <td class="text-left">
                    {{ item.name }}
                  </td>
                  <td class="text-left">{{ item.value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </section>
    <section style="height: 10vh"></section>
  </v-container>
</template>
<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
} from "@vue/composition-api";
import router from "../router";
import { menuStore } from "../utils/menuStore";

export default defineComponent({
  name: "MenuItemData",
  setup() {
    onBeforeMount(() => {
      if (menuStore.state.item.name == undefined) {
        router.push("/");
      }
    });
    const currentMenuItem = computed({
      get() {
        return menuStore.state.item;
      },
      set(newValue) {
        menuStore.state.item = newValue;
      },
    });

    const nutritionalLabelling = ref([]);
    const images = ref([
      currentMenuItem.value.image,
      currentMenuItem.value.image2,
    ]);

    async function getNutritionalValues() {
      Object.keys(currentMenuItem.value.nutritionLabelling.Item).forEach(
        (key) => {
          if (key != "size" && key != "itemid")
            nutritionalLabelling.value.push({
              name: key,
              value: currentMenuItem.value.nutritionLabelling.Item[key],
            });
        }
      );
    }

    getNutritionalValues();
    return { currentMenuItem, images, nutritionalLabelling };
  },
});
</script>
<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  height: 30px;
}
.v-image.v-responsive.v-carousel__item.theme--light {
  height: 100% !important;
}
.heading-section {
  border: 2px solid red;
}
.table-body {
  border: 0.2px solid black !important;
  width: 70%;
  margin: auto;
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1020px) {
  .heading {
    height: 70vh !important;
  }
  .image-col {
    height: 70% !important;
  }
  .text-col {
    height: 30% !important;
  }
  .table {
    width: 90% !important;
  }
  .heading-text {
    margin-top: 10px !important;
  }
}
@media only screen and (max-width: 750px) {
  .heading {
    height: 95vh !important;
  }
  .allergens {
    height: 50vh !important;
  }
  .image-col {
    height: 60% !important;
  }
  .text-col {
    height: 40% !important;
  }
  .table {
    width: 90% !important;
  }
  .divider {
    width: 90vw;
  }
  .heading-text {
    margin-top: 25px !important;
  }
}
</style>
