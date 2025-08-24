<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-7">
    <v-expansion-panel>
      <v-expansion-panel-header @click="changeStateExpansive()" class="ExpansionTitle" expand-icon="">
        <!--Titulo del acordeon-->
        Calculator
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent justify-center">
          <div v-if="show" class="MiniTable">
            <div class="Col">
              <div class="Line">
                <div class="Row Label">Paymente Recived</div>
                <div class="Row">
                  <v-text-field />
                </div>
              </div>

              <div class="Line">
                <div class="Row Label">Rate of Change</div>
                <div class="Row">
                  <v-text-field />
                </div>
              </div>

              <div class="Line">
                <div class="Row Label">Date</div>
                <div class="Row">
                  <v-text-field />
                </div>
              </div>
            </div>

            <div class="Col">
              <div class="Line">
                <div class="Row Label">Estimate Payment</div>
                <div class="Row Medium">
                  <v-text-field />
                </div>
              </div>
              <div class="Line">
                <div class="Row Label">Balance Net Premium USD</div>
                <div class="Row Small">
                  <v-text-field />
                </div>
              </div>
            </div>
          </div>
          <!--Tabla-->
          <div v-if="show" class="Table">
            <div class="Line">
              <div class="Row" />
              <div class="Row" />
              <div class="Row Small" />
              <div class="Row font-weight-bold">Original Currency</div>
              <div class="Row font-weight-bold">USD</div>
              <div class="Row Small" />
              <div class="Row font-weight-bold">Original Currency</div>
              <div class="Row font-weight-bold">USD</div>
            </div>

            <div class="Line">
              <div class="Row Label">SLU Gross Premium</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small" />
              <div class="Row">
                <v-text-field value="100,00.00" />
              </div>
              <div class="Row">
                <v-text-field value="5,263.16" />
              </div>
              <div class="Row Small" />
              <div class="Row">
                <v-text-field value="100,000.00" />
              </div>
              <div class="Row">
                <v-text-field value="5,263.16" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">SLU Gross Premium</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small NoDrop">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="5,000.00" />
              </div>
              <div class="Row">
                <v-text-field value="526.32" />
              </div>
              <div class="Row Small">
                <v-text-field value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="5,000.00" />
              </div>
              <div class="Row">
                <v-text-field value="526.32" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Tax</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small NoDrop">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row Small">
                <v-text-field value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Eng Fee</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small NoDrop">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row Small">
                <v-text-field value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label NoDrop">LTA</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row Small">
                <v-text-field value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Others</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small NoDrop">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row Small">
                <v-text-field value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Fronting Fee</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small NoDrop">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row Small">
                <v-text-field value="20%" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
              <div class="Row">
                <v-text-field value="-" />
              </div>
            </div>

            <div class="Line">
              <div class="Row Label">Net Premium</div>
              <div class="Row">
                <v-text-field />
              </div>
              <div class="Row Small NoDrop">
                <v-text-field :disabled="disabledInputs" value="20%" />
              </div>
              <div class="Row">
                <v-text-field class="Bold" value="95,000.00" />
              </div>
              <div class="Row">
                <v-text-field class="Bold" value="4,736.84" />
              </div>
              <div class="Row Small">
                <v-text-field />
              </div>
              <div class="Row">
                <v-text-field class="Bold" value="95,000.00" />
              </div>
              <div class="Row">
                <v-text-field class="Bold" value="4,736.84" />
              </div>
            </div>

            <!--Boton-->
            <div class="ButtonCont d-flex justify-end align-center">
              <v-btn depressed color="#003D6D" rounded> Load and Messages </v-btn>
            </div>
          </div>

          <!--
            Boton añadir nuevo pago
            (muestra las tablas superiores)
          -->
          <div class="ButtonCont d-flex justify-start align-center">
            <v-btn @click="show = true" depressed color="#003D6D" rounded text>
              <v-icon>mdi-plus-circle</v-icon>
              New Payment
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { stateExpansiveManager } from "@/mixins/subscription.js";
export default {
  name: "CalculatorWallet",
  mixins: [stateExpansiveManager],
  data() {
    return {
      disabledInputs: true,
      show: false,
    };
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
//Clases utiles
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.BorderBottom {
  border-bottom: 1px solid #d2deed;
  margin-bottom: 15px;
}

//Tabla
.Table {
  width: 90%;
  height: auto;
  margin-top: 25px;
  //Hilera de las tablas
  .Line:not(:first-child) {
    margin-top: 15px;
  }
  .Line {
    .flex();
    width: 100%;
    height: 50px;
    justify-content: space-between;

    //Filas
    .Row {
      .flex();
      width: 13.2%;
      height: 100%;
      .Bold {
        font-weight: 600;
        ::v-deep .v-label {
          color: black;
        }
      }
    }

    //Tamaños y estilos de las filas
    .Label {
      color: #547fa9;
      font-size: 14px;
      justify-content: flex-end;
      text-align: right;
    }
    .Small {
      width: 6%;
      text-align: center;
    }
  }
}

//Boton
.ButtonCont {
  width: 100%;
  margin-top: 25px;
  .v-btn {
    text-transform: none;
    color: white;
    width: 217px;
    height: 40px;
    letter-spacing: normal;
  }
  //Variaciones
  .v-btn--text {
    width: 170px;
    color: #003d6d;
    justify-content: space-between;
  }
}

//Estilos de la tabla pequeña
.MiniTable {
  .flex();
  width: 600px;
  height: auto;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  .Col {
    .flex();
    width: 49%;
    height: auto;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;

    .Line {
      .flex();
      width: 100%;
      height: 50px;
      margin-top: 5px;
      justify-content: space-between;

      .Row {
        .flex();
        width: 55%;
        height: 100%;
        justify-content: flex-start;
      }
      .Label {
        .flex();
        width: 40%;
        height: 100%;
        color: #547fa9;
        font-size: 14px;
        justify-content: flex-end;
        text-align: right;
      }
    }
  }
}

//Añade borde continuo a los inputs desactivados
.theme--light.v-text-field::v-deep.v-input--is-disabled .v-input__slot::before {
  -o-border-image: repeating-linear-gradient(to right, #d2deed 0px, #d2deed 2px, transparent 2px, transparent 4px) 1 repeat !important;
  border-image: repeating-linear-gradient(to right, #d2deed 0px, #d2deed 2px, transparent 2px, transparent 4px) 1 repeat !important;
}
.NoDrop {
  cursor: no-drop;
}
</style>
