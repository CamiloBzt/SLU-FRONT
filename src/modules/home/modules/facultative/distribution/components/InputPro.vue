<template>
    <div class="input-pro-cont">
      <!--Input Grid-->
      <v-form class="form">
        <div class="input-content">
          <v-text-field
            v-model="limitedInsured"
            label="Limited Insured"
            type="number"
          ></v-text-field>
        </div>
  
        <div class="input-content">
          <v-text-field
            v-model="excess"
            label="Excess"
            type="number"  
          ></v-text-field>
        </div>
  
        <div class="input-content">
          <v-text-field
            v-model="totalPremium"
            label="Total premium"
            type="number"
            
          ></v-text-field>
        </div>
  
        <div class="input-content">
          <v-select
            v-model.trim="activity"
            label="Activity"
            :items="items"
          >
          </v-select>
        </div>
  
        <div class="input-content">
          <v-text-field
            v-model="sluLine"
            label="SLU Line"
            type="number"
           
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
            v-model="sluExposure"
            label="SLU Exposure"
            type="number"
           
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
            v-model="sluPremium"
            label="SLU Premium"
            type="number"
          ></v-text-field>
        </div>
  
        <div class="input-content">
          <v-select
            v-model.trim="country"
            label="Country"
            :items="items"
          >
          </v-select>
        </div>
  
  
        <div class="input-content">
          <v-text-field
            v-model="tivDamage"
            label="Tiv damage"
            type="number"
            
          ></v-text-field>
        </div>

        <div class="input-content">
          <v-text-field
            v-model="tivBi"
            label="Tiv Bi"
            type="number"
            
          ></v-text-field>
        </div> 
         <div class="input-content">
          <v-text-field
            v-model="tivStocks"
            label="Tiv stocks"
            type="number"
            
          ></v-text-field>
        </div>
        <div class="input-content">
          <v-text-field
            v-model="tivTotal"
            label="Tiv total"
            type="number"
          ></v-text-field>
        </div>
      </v-form>
    </div>
  </template>
  <script>
  export default {
    name: "InputPro",  
    data() {
      return {
        items: ["item1","item2","item3","item4"],
        limitedInsured:15000,
        excess:' ',
        totalPremium:255000,
        activity:"Airport",
        sluLine:59.9,
        sluExposure:890000,
        sluPremium:130000,
        country:'MXN',
        tivDamage:' ',
        tivBi:' ',
        tivStocks:' ',
        tivTotal:' ',
      }; 
    },
     computed: {
      
    },
    async beforeMount() {

    }
  };
  </script>
  <style lang="less" scoped>
  .input-pro-cont {
    width: 100%;
    height: auto;
    margin-bottom: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    align-content: flex-start;
  
    //TITULO
    .title-cont {
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-size: 20px;
        color: black;
        font-weight: 600;
      }
  
      @media (max-width: 650px) {
        height: 50px;
        h5 {
          font-size: 16px;
        }
      }
    }
    .form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
  
      @media (max-width: 650px) {
        height: auto;
      }
      .input-content {
        width: 20%;
        height: 70px;
        margin-right: 1%;
        margin-top: -10px;
        @media (max-width: 900px) {
          width: 32%;
        }
        @media (max-width: 650px) {
          width: 100%;
        }
      }
    }
  }
  </style>
  