<template>
  <div
    class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap"
  >
    <!--TITULO-->
    <div class="TitleSection d-flex justify-start align-center">
      <h4>Notifications</h4>
    </div>

    <div
      v-for="notification in sortedNotifications"
      :key="notification.id"
      @click="openDialog(notification)"
      class="ContentDashboard d-flex mb-6"
    >
      <div class="ImageCont d-flex justify-center align-center">
        <v-avatar size="40" class="AvatarCnt">
          <v-icon
            v-if="notification.status === 'REVIEW'"
            large
            color="rgb(0 61 109)"
            >mdi-checkbox-blank-circle-outline
          </v-icon>
          <v-icon
            v-else-if="notification.status === 'VALIDATING'"
            large
            color="yellow"
            >mdi-alert-circle-outline
          </v-icon>
          <v-icon
            v-else-if="notification.status === 'REJECTED'"
            large
            color="red"
            >mdi-close-circle-outline
          </v-icon>
          <v-icon
            v-else-if="notification.status === 'ACCEPTED'"
            large
            color="green"
            >mdi-check-circle-outline
          </v-icon>
        </v-avatar>
      </div>

      <div class="InfoCont flex-wrap">
        <div class="InfoLine">
          <b>{{ notification.reference }}</b>
          <br />
          <template
            v-if="
              notification.notifying_user_id === notification.reviewer_user_id
            "
          >
            Review has been
            {{ notification.status }}
          </template>
          <template v-else-if="isUnderwriter">
            You requested for a review by {{ notification.NotifyingUser.name }}
            {{ notification.NotifyingUser.last_name }}
          </template>
          <template v-else>
            You asked {{ notification.reviewer_user.name }}
            {{ notification.reviewer_user.last_name }} for a review
          </template>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" width="600">
      <v-card id="card-eye" class="pb-3">
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn
              @click="dialog = false"
              color="orange"
              dark
              small
              absolute
              fab
              right
            >
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </v-flex>
        </v-card-actions>
        <v-card-title class="font-weight-bold text-h5"
          >Four eyes law</v-card-title
        >
        <v-divider id="divisor"></v-divider>
        <div id="border-blue" class="mb-8">
          <v-card-text class="font-weight-bold text-h6 blue-text"
            >To be Defined</v-card-text
          >
          <v-divider id="divisor"></v-divider>

          <div
            class="ExchangeCalcCont d-flex justify-center flex-wrap align-center"
          >
            <div
              class="ExchangeCont d-flex justify-end align-content-start flex-wrap"
            >
              <div
                class="TitleCont d-flex justify-end align-content-center align-center"
              >
                <h5>Original currency</h5>
              </div>

              <div class="InputContent d-flex justify-end align-center mt-2">
                <span class="LabelInput"> Limited Insured</span>
                <div class="InputContainer">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.limitedInsured"
                    prefix="$"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div class="InputContent d-flex justify-end align-center">
                <span class="LabelInput"> SLU Share </span>
                <div class="InputContainer">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.sluShare"
                    suffix="%"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div class="InputContent d-flex justify-end align-center">
                <span class="LabelInput"> Limit SLU </span>

                <div class="InputContainer">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.limitSlu"
                    prefix="$"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div class="InputContent d-flex justify-end align-center">
                <span class="LabelInput"> Premium SLU </span>

                <div class="InputContainer">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.premiumSlu"
                    prefix="$"
                    readonly
                  ></v-text-field>
                </div>
              </div>
            </div>

            <div
              class="ExchangeCont d-flex justify-start align-content-start flex-wrap"
            >
              <div
                class="TitleCont d-flex justify-start align-content-center align-center"
              >
                <h5 class="TitleColRight">USD</h5>
              </div>

              <div class="InputContent d-flex justify-start align-center mt-2">
                <span class="LabelInput ShowFlexOnMovil">
                  Limited insured:
                </span>

                <div class="InputContainer inputRight">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.limitedInsuredUsd"
                    suffix="USD"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div class="InputContent d-flex justify-start align-center">
                <span class="LabelInput ShowFlexOnMovil"> SLU Share: </span>

                <div class="InputContainer inputRight">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.sluShare"
                    suffix="%"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div class="InputContent d-flex justify-start align-center">
                <span class="LabelInput ShowFlexOnMovil"> Limit SLU: </span>

                <div class="InputContainer inputRight">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.limitSluUsd"
                    suffix="USD"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div class="InputContent d-flex justify-start align-center">
                <span class="LabelInput ShowFlexOnMovil"> Premium SLU: </span>

                <div class="InputContainer inputRight">
                  <v-text-field
                    class="ml-3"
                    v-model="cleanSubscription.premiumSluUsd"
                    suffix="USD"
                    readonly
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>

          <v-card-text class="font-weight-bold text-h6 blue-text"
            >Four Eyes Law Validation</v-card-text
          >
          <v-divider id="divisor"></v-divider>
          <v-simple-table class="transparent-bg tabUnderwriters">
            <template v-slot:default>
              <v-card-text>
                <v-container fill-height>
                  <v-layout row>
                    <v-flex class="d-flex align-center">
                      <p
                        class="text-left font-weight-bold subtitle-1 black--text"
                      >
                        Validates quotation
                      </p>
                    </v-flex>
                    <v-flex class="box">
                      <v-container fluid>
                        <v-radio-group v-model="radioValidation" row>
                          <v-radio
                            label="Yes"
                            value="ACCEPTED"
                            color="primary"
                          ></v-radio>
                          <v-radio
                            label="No"
                            value="REJECTED"
                            color="primary"
                          ></v-radio>
                        </v-radio-group>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
                <p class="text-left font-weight-bold subtitle-1 black--text">
                  Validate by:
                  <span class="font-weight-regular">
                    {{ subscription.NotifyingUser.last_name }}
                  </span>
                </p>
                <p
                  class="text-left font-weight-bold subtitle-1 black--text d-flex"
                >
                  Account:
                  <span class="font-weight-regular">
                    {{ subscription.reference }}
                  </span>
                  <v-btn
                    class="d-flex mx-auto px-16 btnRequest"
                    elevation="2"
                    large
                    rounded
                    @click="goToAccount(subscription.subscription_id)"
                  >
                    Go to account
                  </v-btn>
                </p>
                <p class="text-left font-weight-bold subtitle-1 black--text">
                  Add comments:
                </p>
                <div>
                  <v-textarea
                    background-color="#EDF2F8"
                    height="120"
                    solo
                    flat
                    no-resize
                    class="textArea"
                    v-model="comment"
                    counter="150"
                    :readonly="disabled"
                  />
                </div>
                <p class="text-left"></p>
              </v-card-text>
            </template>
          </v-simple-table>
          <v-btn
            class="d-flex mx-auto px-16 mb-8 btnSend"
            @click="setUpdateNotification()"
            elevation="2"
            large
            rounded
            :disabled="disabled"
            >Send</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getUserType } from "@/store/actions/underwriters";
import subscription from "@/store/state/subscription";

export default {
  name: "NotificationsModal",
  data() {
    return {
      subscription: {
        quotation: {
          limitedInsured: "",
          sluShare: "",
          limitSlu: "",
          premiumSlu: "",
          limitedInsuredUsd: "",
          limitSluUsd: "",
          premiumSluUsd: "",
        },
        status: "",
      },
      dialog: false,
      exampleValue: 1234,
      comment: "",
      radioValidation: "ACCEPTED",
    };
  },
  computed: {
    ...mapGetters(["user", "socketNotificationList"]),
    sortedNotifications() {
      return this.socketNotificationList.slice().reverse();
    },
    isUnderwriter: async function () {
      const result = await getUserType(this.user.id);
      return result;
    },
    disabled: function () {
      return (
        this.subscription.status === "ACCEPTED" ||
        this.subscription.status === "REJECTED"
      );
    },
    cleanSubscription: function () {
      return {
        limitedInsured:
          this.subscription.quotation.limitedInsured?.replace("$", "") ?? 0,
        sluShare: this.subscription.quotation.sluShare?.replace("$", "") ?? 0,
        limitSlu: this.subscription.quotation.limitSlu?.replace("$", "") ?? 0,
        premiumSlu:
          this.subscription.quotation.premiumSlu?.replace("$", "") || 0,
        limitedInsuredUsd:
          this.subscription.quotation.limitedInsuredUsd?.replace("$", "") ?? 0,
        limitSluUsd:
          this.subscription.quotation.limitSluUsd?.replace("$", "") ?? 0,
        premiumSluUsd:
          this.subscription.quotation.premiumSluUsd?.replace("$", "") ?? 0,
      };
    },
    ...mapState({
      socket: (state) => state.socket.socketClient,
    }),
  },
  methods: {
    ...mapActions([
      "getNotificationsFourEye",
      "getToBeDefinedBySubscriptionId",
      "updateNotification",
      "getNotificationsFourEyeSuscriptor",
    ]),
    async openDialog(subscriptionData) {
      const { subscription_id } = subscriptionData;
      const isAUnderwriter = await this.isUnderwriter;
      if (isAUnderwriter) {
        const quotation = await this.getToBeDefinedBySubscriptionId(
          Number(subscription_id)
        );
        this.subscription = {
          ...subscriptionData,
          quotation: { ...quotation },
        };
        if (
          this.subscription.status == "ACCEPTED" ||
          this.subscription.status == "REJECTED"
        ) {
          this.comment = this.subscription.history[0]?.commentary;
        } else {
          this.comment = "";
        }
        this.dialog = true;
      } else {
        this.goToAccount(subscription_id);
      }
    },
    goToAccount(subscription_id) {
      this.$router.push(`/underwriting/${subscription_id}/submission`);
    },
    async setUpdateNotification() {
      const notification = this.subscription;
      const updateNotificationList = [];
      if (this.comment)
        updateNotificationList.push({
          column: "commentary",
          value: this.comment,
        });
      if (this.radioValidation)
        updateNotificationList.push({
          column: "status",
          value: this.radioValidation,
        });
      await this.updateNotification({
        id: Number(notification.id),
        input: updateNotificationList,
      });
      const { id } = this.user;
      const res = await this.getNotificationsFourEye(id);
      // console.log('🚀 ~ file: NotificationsModal.vue:274 ~ setUpdateNotification ~ res', res)
      this.dialog = false;
      try {
        this.socket.emit("send_notification", {
          idUser: notification.notifying_user_id,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    const { id } = this.user;
    await this.getNotificationsFourEye(id);
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/Dashboard/General.less";

.ContentDashboard {
  height: 80px;
  background-color: #fff;
  cursor: pointer;

  .ImageCont {
    width: 30%;
    height: 100%;
  }

  .InfoCont {
    width: 68%;
    height: 100%;
    margin-left: 2%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    //DATOS
    .InfoLine {
      font-size: 14px;
    }
  }
}

.ExchangeCalcCont {
  width: 100%;
  height: auto;

  //TITULO DEL COMPONENTE
  .TitleComponent {
    width: 100%;
    height: 50px;
    margin-top: 15px;

    h5 {
      font-size: 20px;
      color: black;
      font-weight: 600;
      text-transform: capitalize;
    }
  }

  .ExchangeCont {
    width: 45%;
    height: auto;
    padding-bottom: 40px;

    //TITULO
    .TitleCont {
      width: 100%;
      height: 60px;

      h5 {
        font-size: 20px;
        font-weight: 600;
        text-transform: capitalize;
        color: black;
        // width: 40%;
        text-align: center;

        @media (max-width: 650px) {
          font-size: 14px;
        }
      }

      .TitleColRight {
        text-align: center;
        margin-left: 7.5%;
      }
    }

    //INPUTS
    .InputContent {
      width: 100%;
      height: 50px;

      //LABEL
      .LabelInput {
        color: #547fa9;
        width: 40%;
        text-align: right;
        font-size: 16px;
      }

      .InputContainer {
        width: 100%;
      }

      .inputRight {
        margin-left: 5%;
      }

      .MiniInputContainer {
        width: 20%;
      }
    }

    .Total {
      font-size: 19px;
    }
  }

  //DIVISION VERTICAL
  .VerticalDiver {
    width: 1px;
    height: 490px;
    background: black;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
}

@media (max-width: 640px) {
  .ExchangeCalcCont {
    .ExchangeCont {
      width: 100%;
      padding: 0 !important;

      //TITULO
      .TitleCont {
        justify-content: flex-start !important;
      }

      //INPUTS
      .InputContent {
        .LabelInput {
          font-size: 14px;
          height: 55%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;

          // width: 38%;
          @media (max-width: 650px) {
            font-size: 12px;
          }
        }

        .InputContainer {
          width: 55%;
        }
      }

      //TOTAL
      .Total {
        font-size: 14px;
      }
    }
  }
}

#card-eye {
  border-radius: 20px;
}

#divisor {
  width: 92%;
  margin: auto;
  background-color: #a8bfd9;
}

#border-blue {
  margin: 20px;
  border: solid 2px #a8bfd9;
  border-radius: 20px;
}

.blue-text {
  color: #547fa9 !important;
}

.btnRequest {
  background-color: #003d6d !important;
  color: white;
  font-weight: 800;
}

.btnSend {
  background-color: white !important;
  color: #003d6d;
  font-weight: 800;
  border: solid 2px #003d6d;
}

.transparent-bg {
  background-color: transparent !important;
}
</style>
