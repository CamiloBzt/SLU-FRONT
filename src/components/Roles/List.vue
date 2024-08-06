<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    
    <div class="TableTitle d-flex justify-space-between align-center">
      <!--TITULO-->
      <div class="title">
        SLU Roles
      </div>
      <div class="finishButtonCont mt-4 d-flex justify-end align-center">
        <v-btn
          rounded
          outlined
          large
          class="finishBtn"
          @click="goToCreate()"
        >
          Create Role
        </v-btn>
      </div>

      <div class="TableControlsCont ShowFlexOnMovil justify-space-between align-center">
        <div @click="moveLeftTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-left</v-icon>
        </div>

      </div>
    </div>
    
    <div class="TableContent">
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent mt-5 d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName row1 d-flex justify-start align-center">
          ID
        </div>
        <div class="TableHeadName row2 d-flex justify-start align-center">
          Role
        </div>
        <div class="TableHeadName row3 d-flex justify-start align-center">
          Description
        </div>
        <div class="TableHeadName row4 d-flex justify-start align-center">
          Actions
        </div>
      </div>

      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4">
        <!--
			AQUI EMPIEZA EL CICLO A ITERAR 
			PARA MOSTRAR LAS FILAS DE LA TABLA
		-->
        <div class="TableContentInner scrollable">
          <div v-for="(item, i) in list" :key="i" class="TableBodyContSn d-flex justify-start align-start">
            <!--INFORMACIÓN DE LA TABLA-->
            <div class="TableBodyTextLink d-flex row1 justify-start align-center">
              {{ item.id ? item.id : 'N/A' }}
            </div>
            <div class="TableBodyText d-flex row2 justify-start align-center">
              {{ item.role ? item.role : 'N/D' }}
            </div>
            <div class="TableBodyText d-flex row3 justify-start align-center">
              {{ item.description ? item.description : 'N/D' }}
            </div>
            <div class="TableBodyText row4 d-flex justify-start align-center">
              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="Button__Action"
                    @click="goToCreate(item)"
                    v-bind="attrs" v-on="on"
                    icon
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </div>
                </template>

                <span class="white--text">Edit Role</span>
              </v-tooltip>

              <v-tooltip right color="#003D6D">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="Button__Action"
                    @click="dialog = true, role = item"
                    v-bind="attrs" v-on="on"
                    icon
                  >
                    <v-icon>
                      mdi-delete-outline
                    </v-icon>
                  </div>
                </template>

                <span class="white--text">Delete Role</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template>
       <v-dialog
          v-model="dialog"
          max-width="500"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete role?
            </v-card-title>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                rounded
                depressed
                class="btn-secondary"
                @click="deleteRole(role), dialog= false"
              >
                Yes
              </v-btn>

              <v-btn
                rounded
                depressed
                class="btn-finish"
                @click="dialog = false"
              >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
  </div>
  
</template>


<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Utils from '../../lib/utils';
import moment from 'moment';

export default {
  name: 'RolesList',
  data() {
    return {
      dialog: false,
      role: {},
      pagination: {
        limit: 10,
        offset: 0,
      },
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.roles.list,
    }),
  },
  methods: {
    ...mapActions(['getAllRoles', 'deleteRole']),
    ...mapMutations(['setActionRole']),
    moveRightTable() {
      this.sideScroll('right', 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll('left', 25, 100, 10);
    },
    goToCreate(item = undefined) {
      this.setActionRole({isNew: item ? false:  true })
      this.$router.push({ name: 'create-role', query: {roleId: item ? item.id : 0} })
    },
    sideScroll(direction, speed, distance, step) {
      var container = document.querySelector('.TableContent');
      var scrollAmount = 0;
      var slideTimer = setInterval(function() {
        if (direction == 'left') {
          container.scrollLeft -= step;
        } else {
          container.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    },
    formatDateMoment(dateToFormat) {
      if (dateToFormat) {
        const date = moment(dateToFormat);
        const day = date.format('DD');
        const month = date.format('MM');
        const year = date.format('YYYY');
        const hour = date.format('HH:mm').toUpperCase();
        return `${day} - ${month} - ${year}`;
      } else {
        return dateToFormat;
      }
    },
  },
  beforeMount() {
    this.$emit("startLoading");
    this.getAllRoles().then().
      finally(() => {
        this.$emit("finishLoading", "loading");
      });
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/style/Subscription/Table.less';
.title{
  min-width: 150px;
  font-weight: 700;
  font-size: 23px;
}
.row1{
  width: 5% !important;
  padding-left: 15px;
}
.row2{
  width: 15% !important;
}
.row3{
  width: 35% !important;
}
.row4{
  width: 23% !important;
  i {
    color: #D2DEED !important;
  }
}

.Button__Action{
  height: 100%;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
