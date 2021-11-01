<template>
  <v-container style=" height 100%">
    <div style="width: 100%">
      <v-snackbar
        :timeout="3000"
        v-model="response.isMessageSendAttempted"
        :color="response.snackbarColor"
        absolute
        center
        rounded="pill"
        top
      >
        <v-btn :color="response.buttonColor" fab x-small
          ><v-icon>{{ response.buttonIcon }}</v-icon></v-btn
        >
        <span class="ml-2">{{ response.text }} </span>
      </v-snackbar>
    </div>
    <v-card style="width: 70%; margin-top: 70px" class="mx-auto contact-card">
      <v-card-title style="justify-content: center"> Contact Us </v-card-title>
      <v-card-text style="80%">
        <v-form
          v-model="isFormValid"
          action="submit"
          @submit.prevent="sendMessage"
        >
          <v-text-field
            :rules="[
              rules.required,
              rules.nameMinimumLength2,
              rules.nameMaximumLength50,
            ]"
            v-model="messageDto.firstName"
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
            v-model="messageDto.lastName"
            type="text"
            label="Last Name"
          >
          </v-text-field>
          <v-text-field
            :rules="[rules.required, rules.email, rules.emailMaximumLength]"
            label="Email Address"
            typr="email"
            v-model="messageDto.emailAddress"
          >
          </v-text-field>
          <v-textarea
            maxlength="500"
            counter
            multi-line
            clearable
            auto-grow
            clear-icon="mdi-close-circle"
            :rules="[
              rules.required,
              rules.messageMinimumLength50,
              rules.messageMaximumLength500,
            ]"
            label="Message"
            type="text"
            v-model="messageDto.message"
          >
          </v-textarea>
          <div
            style="justify-content: center; text-align: center"
            class="mt-10"
          >
            <v-btn
              :disabled="!isFormValid"
              class="button-md mx-auto"
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
import { defineComponent, ref, reactive } from "@vue/composition-api";
import isEmail from "validator/es/lib/isEmail";
import { saveMessage } from "../firebase/firebase";
import { uuid } from "vue-uuid";

export default defineComponent({
  setup() {
    const messageDto = reactive({
      firstName: "",
      lastName: "",
      emailAddress: "",
      message: "",
    });
    const response = ref({
      isMessageSendAttempted: false,
      snackbarColor: "",
      buttonColor: "",
      buttonIcon: "",
      text: "",
    });
    const isMessageSendAttempted = ref(false);
    const isFormValid = ref(false);
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
      messageMinimumLength50: ref(
        (v) => v.length > 50 || "Name must be longer than 50 characters"
      ),
      messageMaximumLength500: ref(
        (v) => v.length < 500 || "Name must be less than 500 characters"
      ),
    });
    function resetDto() {
      messageDto.firstName = "";
      messageDto.lastName = "";
      messageDto.emailAddress = "";
      messageDto.message = "";
    }

    async function sendMessage() {
      try {
        await saveMessage(messageDto.v, uuid.v4())
          .then(() => {
            resetDto();
            response.value = {
              isMessageSendAttempted: true,
              snackbarColor: "blue-grey",
              buttonColor: "blue",
              buttonIcon: "mdi-checkbox-marked-circle",
              text: "Message Sent Successfully, a member of our team will be with you shortly",
            };
          })
          .catch(() => {
            response.value = {
              isMessageSendAttempted: true,
              snackbarColor: "#FF6347",
              buttonColor: "orange",
              buttonIcon: "mdi-alert-circle",
              text: "Action failed! Please try again.",
            };
          });
      } catch (error) {
        throw new error();
      }
    }
    return {
      rules,
      messageDto,
      isFormValid,
      sendMessage,
      isMessageSendAttempted,
      response,
    };
  },
});
</script>
<style scoped>
.contact-card {
}
</style>
