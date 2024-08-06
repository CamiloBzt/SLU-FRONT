<template>
  <v-row justify="center">
    <v-dialog
      v-model="displayConfirmationModal"
      :persistent="persistent"
      max-width="390"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon text v-bind="attrs" v-on="on">
          <v-icon color="#9D9B9B"> mdi-close-circle-outline </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>{{ description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="Btn" rounded :color="disagreeColorText" text @click="closeModal()">
            {{ disagreeText }}
          </v-btn>
          <v-btn class="Btn" depressed rounded :color="acceptColorText" dark @click="acceptModal()">
            {{ acceptText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ConfirmationRateModal',
  data: () => ({
    displayConfirmationModal: false,
  }),
  props: {
    persistent: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Are you sure?',
    },
    description: {
      type: String,
      default: "This can't be restored.",
    },
    disagreeText: {
      type: String,
      default: 'Cancel',
    },
    disagreeColorText: {
      type: String,
      default: '#003D6D',
    },
    acceptText: {
      type: String,
      default: 'Delete',
    },
    acceptColorText: {
      type: String,
      default: '#003D6D',
    },
  },
  methods: {
    closeModal() {
      this.displayConfirmationModal = false;
      this.$emit('hideConfirmationModal');
    },
    acceptModal() {
      this.$emit('acceptConfirmationModal');
      this.closeModal();
    },
  },
};
</script>

<style scoped>

.Btn{
  width: 110px !important;
}
</style>