<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="15" sm="9">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="totalPages"
            total-visible="8"
            @input="seeActual(page)"
          >
          </v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import subscription from "./service/get-susbcription-cont.service";
import { machine } from "os";
export default {
  name: "ShowMoreButton",
  data() {
    return {
      page: 1,
      pagination: {
        limit: 10,
        offset: 0,
        query: "",
        filter: "",
      },
      numberPage: 5,
      totalAccounnts: 0,
      totalPages: 0,
    };
  },
  methods: {
    ...mapActions(["getSubscriptionList"]),
    seeActual(page) {
      const stateTable = this.$store.state.subscription.table;

      this.pagination = {
        limit: stateTable.limit || 10,
        offset: (page - 1) * (stateTable.limit || 10),
        query1: stateTable.query1 || "",
        query2: stateTable.query2 || "",
        filterSearch1: stateTable.filterSearch1 || "s.reference",
        filterSearch2: stateTable.filterSearch2 || "s.reference",
      };

      this.getSubscriptionList(this.pagination).then(() => {
        var table = document.querySelector(".TableContentInner");
        if (table) table.scrollTop = table.clientHeight - table.scrollHeight;
      });
    },
  },
  async mounted() {
    this.totalAccounnts = await subscription();

    this.totalPages = Math.ceil(this.totalAccounnts / 10) - 1;
  },
};
</script>
<style lang="less" scoped>
.ShowMoreCont {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  .loadMoreButton {
    width: 2rem;
    height: 40px;
    color: white !important;
    text-transform: none;

    letter-spacing: normal !important;
    font-size: 15px !important;
    font-weight: 500 !important;
  }
}

@media (max-width: 600px) {
  .ShowMoreCont {
    .loadMoreButton {
      width: 90%;
    }
  }
}
</style>
