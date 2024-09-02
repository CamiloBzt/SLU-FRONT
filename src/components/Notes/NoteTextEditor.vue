<template>
  <div class="AddNotesComponent">
    <div class="CreateNote">
      <Mentionable
        :keys="['@']"
        :items="mentionsObject"
        offset="6"
        insert-space
        @open="loadIssues()"
        @search="loadIssues($event)"
        @apply="apply"
        filtering-disabled
      >
        <textarea class="textNote" v-model="text" />
        <template #no-result>
          <div class="dim">
            {{ loading ? "Loading..." : "No result" }}
          </div>
        </template>

        <template #item-@="{ item }">
          <div class="user">
            {{ item.name }}
            <span class="dim"> {{ item.last_name }} </span>
          </div>
        </template>
      </Mentionable>
      <v-btn
        @click="showData()"
        class="AddNewNoteButton"
        rounded
        depressed
        text
      >
        <v-icon class="mr-2"> mdi-send-circle </v-icon>

        Send Note
      </v-btn>
    </div>
  </div>
</template>
<script>
import VTooltip from "v-tooltip";
import { Mentionable } from "vue-mention";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    VTooltip,
    Mentionable,
  },
  data() {
    return {
      text: "",
      items: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["mentionsObject", "subscription_id", "user"]),
  },
  methods: {
    ...mapActions(["usersName", "registerIdSubscription", "saveNote"]),
    ...mapMutations(["setLoading"]),
    async showData() {
      if (this.text) {
        this.setLoading();

        const users_ids = this.items.filter((item, index) => {
          return this.items.indexOf(item) === index;
        });

        if (this.subscription_id != null) {
          this.saveNote({
            description: this.text,
            subscription_id: this.subscription_id,
            users_ids,
          })
            .then((res) => {
              if (res) {
                this.text = "";
                this.items = [];
              }
              this.setLoading();
              this.$forceUpdate();
            })
            .catch((e) => {
              this.setLoading();
            });
        } else {
          this.setLoading();
          this.addNotification({
            type: "warning",
            text: "Please create the submission before sending notes.",
          });
          // await this.registerIdSubscription({}).finally(() => {
          //   this.saveNote({
          //     description: this.text,
          //     subscription_id: this.subscription_id,
          //     users_ids
          //   })
          //     .then((res) => {
          //       if (res) {
          //         this.text = '';
          //         this.items = []
          //       }
          //       this.setLoading();
          //       this.$forceUpdate();
          //     })
          //     .catch((e) => {
          //       this.setLoading();
          //     });
          // });
        }
      }
    },
    async loadIssues(searchText = "") {
      this.loading = true;
      await this.usersName({ name: searchText });
      this.loading = false;
    },
    apply(item) {
      this.items.push(item.id);
    },
  },
};
</script>
<style lang="less">
@import "~@/assets/style/mentions.less";
//CREAR NOTA
.AddNotesComponent {
  width: 100%;
  height: auto;
  position: relative;
  margin-top: 15px;
  flex-wrap: wrap;

  .CreateNote {
    width: 100%;
    height: auto;
    .mentionable {
      width: 100%;
      height: auto;
      position: relative !important;
      .textNote {
        width: 100% !important;
        min-height: 120px;
        resize: none;
        border: solid 1px #547fa9;
        border-radius: 15px !important;
        padding-left: 15px;
        padding-top: 5px;
      }
      .textNote:focus {
        outline: none !important;
      }
    }
  }

  .AddNewNoteButton {
    text-transform: none;
    color: #003d6d;
    i {
      color: inherit !important;
      font-size: 26px !important;
    }
  }
}

.btn {
  text-transform: none;
  color: #003d6d;
  font-weight: 500 !important;
  letter-spacing: normal;
}

@media (max-width: 640px) {
  .AddNotesComponent {
    margin-top: 15px;
    i {
      color: red;
    }
  }
}
</style>
