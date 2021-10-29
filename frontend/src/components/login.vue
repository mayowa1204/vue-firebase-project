<template>
  <v-container style=" height 100%">
    <v-card style="height: 50%; width: 50%">
      <v-card-title> Login </v-card-title>
      <v-card-text>
        <v-form v-model="isLoginValid" action="submit" @submit.prevent="login">
          <v-text-field
            :rules="[rules.required, rules.email]"
            label="Email Address"
            v-model="userLoginDto.emailAddress"
          >
          </v-text-field>
          <v-text-field
            :rules="[rules.required]"
            hide-details="auto"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="userLoginDto.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
          <div>
            <v-btn
              x-large
              :disabled="!isLoginValid"
              class="button-md"
              type="submit"
              >Log In</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { defineComponent, ref, reactive } from "@vue/composition-api";
import isEmail from "validator/es/lib/isEmail";

export default defineComponent({
  setup() {
    const isLoginValid = ref(false);
    const showPassword = ref(false);
    const userLoginDto = reactive({
      emailAddress: "",
      password: "",
    });
    const rules = reactive({
      required: (v) => !!v || "Required",
      email: (v) => isEmail(v) || "E-mail must be valid",
    });
    async function login() {
      alert("Welcome!");
    }
    return { isLoginValid, userLoginDto, rules, showPassword, login };
  },
});
</script>
<style scoped></style>
