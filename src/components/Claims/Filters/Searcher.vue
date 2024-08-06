<template>
  <div class="text-center">
    <v-menu z-index="3000" offset-x left :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <div class="cont d-flex justify-center align-center">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon> mdi-magnify </v-icon>
          </v-btn>
        </div>
      </template>

      <!-- Buscador 1 -->
      <div class="SearchBackground">
        <div class="SearchForm">

          <div class="SearchForm__Filters d-flex justify-center align-center">
            <v-select
              class="SearchForm__Filters__Select"
              v-model="value1"
              :items="filterItems"
              @change="$v.search1.$model = ''"
            />
          </div>

          <div class="SearchForm__Searcher">
            <div class="InputCnt">
              <v-menu
                v-if="value1 == 's.created_at'"
                v-model="showDatePicker"
                :close-on-content-click="false"
                transition="scale-transition"

                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="Date__Container">
                    <v-text-field
                      v-model.trim="$v.search1.$model"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </div>
                </template>
                <v-date-picker
                  v-model="datePicker"
                  @input="inputDate1"
                ></v-date-picker>
              </v-menu>

              <input
                v-else
                class="input"
                placeholder="Search"
                v-model.trim="$v.search1.$model"
                @input="isTyping = true"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- Buscador 2 -->
      <div class="SearchBackground" v-if="search1.length > 0">
        <div class="SearchForm">

          <div class="SearchForm__Filters d-flex justify-center align-center">
            <v-select
              class="SearchForm__Filters__Select"
              v-model="value2"
              :items="filterItems"
              @change="$v.search2.$model = ''"
            />
          </div>

          <div class="SearchForm__Searcher">
            <div class="InputCnt">
              <v-menu
                v-if="value2 == 's.created_at'"
                v-model="showDatePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="Date__Container">
                    <v-text-field
                      v-model.trim="$v.search2.$model"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </div>
                </template>
                <v-date-picker
                  v-model="datePicker"
                  @input="inputDate2"
                ></v-date-picker>
              </v-menu>

              <input
                v-else
                class="input"
                placeholder="Search"
                v-model.trim="$v.search2.$model"
                @input="isTyping = true"
              />
            </div>
          </div>

        </div>
      </div>

      <div class="SearchBackground">
        <div class="SearchForm" style="justify-content: end;padding-top: 0px;height: 40px;">
          <v-btn
            class="loadMoreButton"
            rounded
            depressed
            color="#003D6D"
            @click="clean"
          >
              Clean
          </v-btn>
        </div>
      </div>
    </v-menu>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

import { required } from 'vuelidate/lib/validators';
import { debounce } from 'lodash';

export default {
  name: 'Searcher',
  data() {
    return {
      chip1: true,
      chip2: true,
      chip3: true,
      search1: '',
      search2: '',
      datePicker: '',
      isTyping: false,
      selectedFilters: [],
      value1: 's.reference',
      value2: 's.reference',
      showDatePicker: false,
      filterItems: [
        { value: 's.reference', text: 'Ref Number' },
        { value: 'ct.description', text: 'Country' },
        { value: 'rt.description', text: 'Line of Risk' },
        { value: 'sm."insured_name"', text: 'Name' },
        { value: 'b."name"', text: 'Broker' },
        { value: 'c."name"', text: 'Cedent' },
        { value: 's.created_at', text: 'Date' },
        { value: 'sts.description', text: 'Status' },
      ],
      pagination: {
        limit: 10,
        offset: 0,
      },
      positionedMenu: true
    };
  },
  validations: {
    search1: { required },
    search2: { required },
  },
  watch: {
    search1: debounce(function () {
      this.isTyping = false;
    }, 1000),
    search2: debounce(function () {
      this.isTyping = false;
    }, 1000),
    selectedFilters: {
      deep: true,
      handler() {
        this.isTyping = true;
      },
    },
    isTyping: function (value) {
      if (!value) {
        /* aquí va el método de búsqueda */
        this.getList();
      }
    },
  },
  methods: {
    ...mapActions(['getClaimsHistoryList']),
    // addValue() {
    //   const isIncluded = this.selectedFilters.includes(this.value);
    //   if (!isIncluded) this.selectedFilters.push(this.value);
    //   this.$nextTick(() => {
    //     this.value = null;
    //     this.isTyping = false;
    //   });
    // },
    removeChip(index) {
      this.selectedFilters.splice(index, 1);
      this.getList();
    },
    async getList() {
      if (this.search1?.length > 0) {
        const data = {
          ...this.pagination,
          query1: this.search1,
          filterSearch1: this.value1
        };

        if (this.search2?.length > 0) {
          data.query2 = this.search2
          data.filterSearch2 = this.value2
        }

        await this.getClaimsHistoryList(data);
      }
      else {
        await this.getClaimsHistoryList(this.pagination);
      }
    },
    clean() {
      this.search1 = ''
      this.search2 = ''

      this.getList();
    },
    setMenuPosition () {
      if (this.positionedMenu) {
        setTimeout(() => {
          const searcher = document.querySelector('.v-menu__content')
          const menuDespegable = document.querySelector('.v-autocomplete__content')

          const menuPosition = parseInt(menuDespegable.style.left)
          const searcherPosition = parseInt(searcher.style.left)

          const newMenuPosition = `${(menuPosition - ((menuPosition - searcherPosition) * 0.3))}px`

          menuDespegable.style.left = newMenuPosition

          this.positionedMenu = false
        }, 100);
      }
    },
    inputDate1() {
      this.showDatePicker = false

      const [year, month, day] = this.datePicker.split('-')

      this.search1 = `${day} - ${month} - ${year}`

      this.getList()
    },
    inputDate2() {
      this.showDatePicker = false

      const [year, month, day] = this.datePicker.split('-')

      this.search2 = `${day} - ${month} - ${year}`

      this.getList()
    }
  },
};
</script>
<style lang="less">
@import '~@/assets/style/MenuActions.less';

.loadMoreButton{
  // width: 217px;
  // height: 40px;
  text-transform: none;
  color: white !important;
  text-transform: none;

  letter-spacing: normal !important;
  font-size: 15px !important;;
  font-weight: 500 !important;;
}

.SearchBackground {

  .SearchForm {
    width: 600px !important;
    height: 80px;
    background: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;

    //Filtros de busqueda
    &__Filters{
      width: 27%;
      height: 100%;
      background: #edf2f8;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      
      box-sizing: border-box !important;
      padding-left:10px;
      padding-right: 10px;
      &__Select{
        height: 30px;
        //Color de texto del  filtro
        .v-select__selection--comma{
          color: #547FA9;
        }
      }
    }

    //Input de busqueda
    &__Searcher{
      width: calc(73% - 10px);
      height: 100%;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .InputCnt {
        width: 89%;
        height: 100%;
        .v-text-field {
          padding-top: 6px;
        }
        .input {
          width: 100%;
          height: 100%;
        }
        .input:focus {
          outline: none;
        }
      }
    }
    

  }

  /*mofica estilos de vuetify*/
  .v-text-field {
    margin-top: 0px !important;
    padding-top: 0px !important;
  }
  .v-text-field > .v-input__control > .v-input__slot:before {
    border: none !important;
  }
  .v-text-field > .v-input__control > .v-input__slot:after {
    border: none !important;
  }
}

.Date__Container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .v-text-field__slot{
    margin-top: 25px;
  }
}





@media (max-width: 650px) {
  .SearchBackground {
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: auto !important;
    padding-top: 10%;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .SearchForm {
      width: 83% !important;
      border-radius: 15px;
      z-index: 1000;
    }
  }

  /*
	Estilos de vuetify para el modal
  */
  .v-menu__content {
    left: 0 !important;
    top: 0 !important;
    max-width: 100% !important;
  }
}
</style>
