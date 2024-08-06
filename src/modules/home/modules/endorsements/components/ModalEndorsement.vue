<template>
  <div class="background-backdrop-filter">
    <div class="modal-container">
      <div class="modal-title">{{ modal.title }}</div>
      <div class="modal-body" v-html="modal.body"></div>
      <div class="modal-footer">
        <v-btn rounded large text class="blue-btn" @click="actionButton1">
          {{ modal.Button1 }}
        </v-btn>
        <v-btn
          rounded
          large
          outlined
          class="clear-btn"
          color="#003D6D"
          @click="actionButton2"
        >
          {{ modal.Button2 }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
/* services */
import { mapActions, mapGetters, mapMutations } from "vuex";
import AppMultipleFile from "@/application/components/AppMultipleFile";
import {
  getNatcatDocs,
  saveNatcatDocumentBD,
  saveEndorsementDocumentBD,
  uploadNatcatDocumentAWS,
  deleteNatcatDocumentAWSBD,
  getDocsEndorsements,
  getDocEndorsements,
} from "@/components/subscription/submission/services/fileSubmission/natcat-docs.service.js";

export default {
  name: "ModalEndorsement",
  components: {
    AppMultipleFile,
  },
  props: {
    modal: { type: Object },
    actionButton1: {
      type: Function,
    },
    actionButton2: {
      type: Function,
    },
  },
  data() {
    return {
      //OFA y NATCAT
      arrayFilesEndorsement: [],
      arrayFilesNatcat: [],
      subscription_id: null,
      limit: false,
      bigFile: false,
      e1: 1,
    };
  },
  async beforeMount() {
    this.subscription_id = Number(this.$route.params.id);
  },
  async mounted() {},
  computed: {},
  watch: {},
  methods: {
    cleanDragData(e) {},
  },
};
</script>
<style lang="less" scoped>
.background-backdrop-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: black;
  top: 0px;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}
.modal-container {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  padding: 33px;
}
.modal-title {
  width: 100%;
  color: rgb(0, 0, 0);
  font-weight: 700;
  border-bottom: 1px solid #a8bfd9;
  padding-bottom: 5px;
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
.modal-body {
  width: 100%;
  color: #547fa9;
  font-weight: 800;
  border: 1px solid #a8bfd9;
  border-radius: 16px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 90px;
  margin-bottom: 30px;
}
.modal-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.blue-btn {
  color: white;
  width: 200px;
  height: 35px;
  background: #003d6d;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: capitalize;
}
.clear-btn {
  width: 200px;
  height: 35px;
}
@media (max-width: 768px) {
  .modal-body {
    padding: 20px 60px;
  }
  .modal-footer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
