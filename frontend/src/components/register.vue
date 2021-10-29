<template>
  <v-container style=" height 100%">
    <v-card style="height: 50%; width: 50%">
      <v-card-title> Register </v-card-title>
      <v-card-text>
        <v-form
          v-model="isRegisterValid"
          action="submit"
          @submit.prevent="register"
        >
          <v-text-field
            :rules="[
              rules.required,
              rules.nameMinimumLength2,
              rules.nameMaximumLength50,
            ]"
            v-model="registerUserDto.firstName"
            label="First Name"
            type="text"
          >
          </v-text-field>
          <v-text-field
            :rules="[
              rules.required,
              rules.nameMinimumLength2,
              rules.nameMaximumLength50,
            ]"
            v-model="registerUserDto.lastName"
            type="text"
            label="Last Name"
          >
          </v-text-field>
          <v-text-field
            :rules="[rules.required, rules.email, rules.emailMaximumLength]"
            label="Email Address"
            typr="email"
            v-model="registerUserDto.emailAddress"
          >
          </v-text-field>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                :rules="[
                  rules.required,
                  rules.passwordMinimumLength,
                  rules.passwordStrength,
                ]"
                :type="showPassword ? 'text' : 'password'"
                v-model="registerUserDto.password"
                name="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              >
              </v-text-field>
            </template>
            Password Strength:
            <v-progress-linear
              class="password-meter"
              :color="
                (passwordStrength / 30) * 100 >= 100 ? 'light-green' : 'orange'
              "
              :value="(passwordStrength / 30) * 100"
            ></v-progress-linear>
          </v-tooltip>

          <v-text-field
            :rules="[rules.required, rules.sameAsPassword]"
            class="input"
            type="password"
            name="retyped-password"
            label="Re-type Password"
          ></v-text-field>
          <div style="justify-content: center">
            <v-btn
              :disabled="!isRegisterValid"
              class="button-md"
              x-large
              type="submit"
              >Submit</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { defineComponent, computed, ref, reactive } from "@vue/composition-api";
import isEmail from "validator/es/lib/isEmail";
import isStrongPassword from "validator/es/lib/isStrongPassword";

export default defineComponent({
  setup() {
    const registerUserDto = reactive({
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    });
    const passwordStrength = computed(() => {
      return isStrongPassword(registerUserDto.password, {
        returnScore: true,
        pointsForContainingLower: 7,
        pointsForContainingUpper: 7,
        pointsForContainingNumber: 7,
        pointsForContainingSymbol: 7,
      });
    });
    const isRegisterValid = ref(false);
    const showPassword = ref(false);
    const rules = reactive({
      required: ref((v) => !!v || "Required"),
      email: ref((v) => isEmail(v) || "E-mail must be valid"),
      emailMaximumLength: ref(
        (v) => v.length < 320 || "Email must be shorter than 320 characters"
      ),
      nameMinimumLength2: ref(
        (v) => v.length > 2 || "Name must be longer than 2 characters"
      ),
      nameMaximumLength50: ref(
        (v) => v.length < 50 || "Name must be less than 50 characters"
      ),
      passwordMinimumLength: ref(
        (v) => v.length > 8 || "Password must be longer than 8 characters"
      ),
      passwordStrength: ref(
        () =>
          passwordStrength.value >= 30 ||
          "Password not strong enough, try adding a symbol"
      ),
      sameAsPassword: ref(
        (v) => v === registerUserDto.password || "Passwords must match"
      ),
    });
    async function register() {
      alert("Welldone");
    }
    return {
      passwordStrength,
      showPassword,
      rules,
      registerUserDto,
      isRegisterValid,
      register,
    };
  },
});
</script>
<style scoped></style>
