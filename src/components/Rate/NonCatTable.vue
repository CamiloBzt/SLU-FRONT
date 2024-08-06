<template>
  <div
    class="
      Cont
      d-flex
      justify-start
      align-center
      flex-wrap
      align-content-center
      mt-7
    "
  >
    <div class="Table">
      <!--CABECERA DE LA TABLA-->
      <div class="Line">
        <div class="Row Number" />
        <div class="Row Bold">Country / Zone</div>
        <div class="Row Bold Percentaje">%</div>
        <div class="Row Bold">Earthquake</div>
        <div class="Row Bold">Hidro-meteorlogical</div>
        <div class="Row Bold">Flood</div>
        <div class="Row Bold">Other</div>
        <div class="Row Bold Percentaje">Earthquake Rate</div>
        <div class="Row Bold Percentaje">Wind Rate</div>
        <div class="Row Bold Percentaje">Flood Rate</div>
        <div class="Row Bold Percentaje">Other Rate</div>
      </div>

      <div class="Line">
        <div class="Row Bold Number">1</div>
        <div class="Row">
          <v-text-field v-model="Country"> </v-text-field>
        </div>
        <div class="Row Percentaje">
          <v-text-field v-model="Rate"> </v-text-field>
        </div>
        <div class="Row">
          <v-select
            v-model.trim="Earthquake"
            :items="catTable"
            item-text="type"
            item-value="id"
            return-object
            @change="EarthquakeRate = Earthquake.Earthquake"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-select
            v-model.trim="Hidro"
            :items="catTable"
            item-text="type"
            item-value="id"
            return-object
            @change="WindRate = Hidro.hydrometeorological"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-select
            v-model.trim="Flood"
            :items="catTable"
            item-text="type"
            item-value="id"
            return-object
            @change="FloodRate = Flood.Flood"
          >
          </v-select>
        </div>
        <div class="Row">
          <v-select
            v-model.trim="Other"
            :items="catTable"
            item-text="type"
            item-value="id"
            return-object
            @change="OtherRate = Other.Other"
          >
          </v-select>
        </div>
        <div class="Row Percentaje">
          <v-text-field v-model="EarthquakeRate"> </v-text-field>
        </div>
        <div class="Row Percentaje">
          <v-text-field v-model="WindRate"> </v-text-field>
        </div>
        <div class="Row Percentaje">
          <v-text-field v-model="FloodRate"> </v-text-field>
        </div>
        <div class="Row Percentaje">
          <v-text-field v-model="OtherRate"> </v-text-field>
        </div>
      </div>

      <!--BOTON AÑADIR-->
      <div class="Line ButtonLine">
        <v-btn class="btn" rounded text color="#003D6D" @click="addFields()">
          <v-icon class="mr-2"> mdi-plus-circle </v-icon>
          Add New
        </v-btn>
      </div>

      <!--SEPARADOR-->
      <div class="ExpansionLineTop mt-4 HideOnMovil" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'NonCatTable',
  data() {
    return {
      Earthquake: null,
      Hidro: null,
      Flood: null,
      Other: null,
      EarthquakeRate: null,
      WindRate: null,
      FloodRate: null,
      OtherRate: null,
    };
  },
  computed: {
    ...mapGetters(['catTable']),
  },
};
</script>
<style lang="less" scoped>
/*
Se importan los stilos compartidos por los componentes
del tarifador, controlan:
	- Clase .flex()
	- Contenedor general
*/
@import '~@/assets/style/Subscription/Rate.less';

.Table {
  .flex();
  width: 100%;
  height: auto;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    .Row {
      .flex();
      width: 9%;
      height: 50px;
      justify-content: flex-start;
    }

    .Number {
      width: 3%;
    }
    .Bold {
      font-weight: 600;
    }
    .Percentaje {
      width: 9%;
    }
  }
}
</style>
