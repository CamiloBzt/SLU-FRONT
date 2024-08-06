<template>
  <div class="border-decoration">
    <div class="create-claim">
      <div class="account">
        <h2>{{ claimUserName }}</h2>
      </div>
      <div class="button-cont">
        <v-btn
          rounded
          large
          color="#003D6D"
          class="btn"
          :disabled="disabledSelect"
        >
          Create claim
        </v-btn>
      </div>
    </div>

    <div class="cards_claims">
      <v-card
        v-for="(claims, index) in listClaims"
        :key="claims.id"
        width="24%"
        height="12.5rem"
        class="margin_cards"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-wrap text-h6">Claim {{ claims.id }}</div>
            <v-list-item-subtitle>{{
              claims.updated_at | formattedDate
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn
            class="color_claims mx-auto"
            width="12rem"
            outlined
            rounded
            text
            color="white"
            @click="backHistoryTableToId(claims.id)"
          >
            See claim
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

<!-- 
  DESCOMENTAR PARA VER LAS SECCIONES DE CODUMENTOS Y BOTONES PARA GUARDAR Y EDITAR UN CLAIM
    <ClaimsDocuments @setEndorsementDocuments="setclaimsDocuments"  v-show="e1 == 1 || e1 == 3" />
    <button @click="saveClaim()" > save claim test </button>
    <ClaimsCorrespondence @setEndorsementDocuments="setclaimsCorrespondence"  v-show="e1 == 1 || e1 == 3" />
    <button @click="updateClaim()" > update claim text </button> -->


    <!-- DESCOMENTAR PARA PROVAR DESPUES EN MOVEMENT 0 (historia 003) 
      para cuando se recuperan los archivos en la parte de see claim se usan asi
    		<ClaimsDocuments
      	:idEndorsement="idClaim"
      	:endorsementDocuments="claimsDocuments"
      	:reloadFiles="reloadFiles"
      	v-if="seeClaim"
      	:key="claimsDocuments"
    /> 
    		<ClaimsCorrespondence
      	:idEndorsement="idClaim"
      	:endorsementDocuments="claimsCorrespondence"
      	:reloadFiles="reloadFiles"
      	v-if="seeClaim"
      	:key="claimsCorrespondence"
    />  

    obtenemos el claim y los documentos
    this.informationCard = await ClaimService.getClaimById(id)
    this.claimsDocuments = this.informationCard.claimsDocuments
    this.claimsCorrespondence = this.informationCard.claimsCorrespondence
  -->
  </div>
</template>

<script>
import moment from "moment";

//services
import claimsService from "./services/claim.service";

//components
import ClaimsCorrespondence from "./components/ClaimsCorrespondence.vue";
import ClaimsDocuments from "./components/ClaimsDocuments.vue";

export default {
  name: "ClaimsDashboardView",
  components: {
    ClaimsDocuments,
    ClaimsCorrespondence
  },
  props: {},
  data() {
    return {
      listClaims: [],
      claimUserName: "",
      subscriptionId: this.$route.params.id,
      disabledSelect: false,
      e1: 1,
      claimsDocuments: [],
      claimsCorrespondence:[],
      informationCard: {}
    };
  },

  methods: {
    async saveClaim () {
    //guardar registro del claim en data 
    await claimsService.addClaim({
      subscriptionId: this.subscriptionId,
      idUser: this.$store.state.auth.user.id,
      infoClaim: {
        dato1: 'test',
        dato2: 'test',
        dato3: 'test'
      },
      files: this.claimsDocuments,
      correspondence: this.claimsCorrespondence,
    });
  },

  async updateClaim () {
    //guardar registro del claim en data 
    await claimsService.updateClaim({
      subscriptionId: this.subscriptionId,
      idUser: this.$store.state.auth.user.id,
      infoClaim: {
        dato1: 'testUpdate',
        dato2: 'testUpdate',
        dato3: 'testUpdate'
      },
      idClaim: 5
    });
  },
    setclaimsDocuments({ files }) {
      this.claimsDocuments = files
    },
    setclaimsCorrespondence({ files }) {
      this.claimsCorrespondence = files
    },
  },

  filters: {
    formattedDate(date) {
      return moment(date).format("DD-MM-YYY");
    },
  },
  async beforeMount() {
    this.BarNavData = await BarNavData();
    this.CloseAccountData = await GetCloseAccount();
    this.listClaims =
      await claimsService.getClaimsBySubscriptionId(
        this.subscriptionId
      );
    console.log(this.listClaims)
    this.informationCard = await claimsService.getClaimById(6)
    console.log({informationCard:  this.informationCard})
    this.claimUserName = sessionStorage.getItem("ClaimUserName");
  },

  async mounted() {},
};
</script>

<style lang="less" scoped>
.ditrtibution-container {
  width: 100%;
  height: auto;

  @media (max-width: 650px) {
    overflow-x: hidden;
  }
}

.border-decoration {
  border-top: 1px solid #a8bfd9;
  margin-top: 20px;
}

.create-claim {
  display: flex;
  margin-top: 40px;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  padding: 40px 60px;
  border-radius: 15px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .account {
    margin-right: 100px;
  }

  .button-cont {
    margin-left: 20px;
    margin-top: 20;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn {
      color: white;
      width: 200px;
      height: 35px;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: normal;
      text-transform: capitalize;
    }

    .clear-btn {
      width: 200px;
      height: 35px;
    }
  }
}

.color_claims {
  background-color: #183d6d;
}

.cards_claims {
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.margin_cards {
  margin-bottom: 1rem;
}

.claims-title {
  font-weight: 800;
  font-size: 20px;
}

.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}

.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}

.stepper-btn {
  width: 100%;
  height: 40px;

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
}
.mt {
  margin-top: 30px;
}
</style>
