<template>
  <div class="ContactInformation d-flex justify-center align-start align-content-start flex-wrap">
    <!--TITULO-->
    <div class="TitleSection adjust-width d-flex justify-start align-center">
      <h4>Weekly Tasks</h4>
    </div>

    <!--CONTENIDO-->

    <div class="ContentDashboard pr-5 pl-5">
      <!--CABECERA-->
      <div class="WeeklyHeaderCont d-flex justify-space-between align-center w-100">
        <h5>June 06 to June 12</h5>

        <div class="WeeklyActions d-flex justify-end align-center">
          <!--RETURN-->
          <v-btn icon class="backBtn">
            <v-tooltip top color="#003D6D">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"> mdi-backup-restore </v-icon>
              </template>

              <span class="white--text">Refresh</span>
            </v-tooltip>
          </v-btn>

          <div class="Controls d-flex justify-center align-center">
            <div class="ControlBtn d-flex justify-center align-center">
              <v-icon>mdi-chevron-left</v-icon>
            </div>
            <div class="ControlBtn d-flex justify-center align-center">
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </div>
        </div>
      </div>

      <div class="lineDivider"></div>
      <!--TAREAS-->
      <v-row class="WeeklyTaskCont w-100">
        <!--LISTAS DE TAREAS-->
        <v-col cols="11" class="TaskItem d-flex justify-start align-center">
          <div class="TaskNumber">
            <div class="number">1</div>
          </div>

          <div class="taskDivider"></div>

          <div class="TaskCheck">
            <div class="check">
              <v-icon>mdi-check</v-icon>
            </div>
          </div>

          <div class="TaskContent">
            <div class="TaskContentInfo">Make the facultative share for the account CP-AB with reference number A-123456789</div>
            <div class="TaskContentAction">
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <!--ACCIONES-->
        <v-col cols="1" class="TaskAction">
          <v-btn class="TaskActionBtn" icon outlined color="var(--lightColor2)">
            <v-icon> mdi-pencil-outline </v-icon>
          </v-btn>
          <v-btn class="TaskActionBtn" icon outlined color="var(--lightColor2)">
            <v-icon> mdi-trash-can-outline </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <div class="lineDivider"></div>

      <!--CREAR TAREA-->
      <div class="WeeklyCreateCont d-flex justify-end align-center w-100">
        <v-btn class="buttonAdd" depressed rounded color="transparent">
          <v-icon class="mr-2" color="var(--lightColor2)"> mdi-plus-circle-outline </v-icon>
          Add task
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "~@/assets/style/Dashboard/General.less";

.adjust-width {
  width: 93% !important;
}

.ContactInformation {
  margin-top: 25px;
}
.ContentDashboard {
  height: 400px;

  .lineDivider {
    width: 100%;
    height: 1px;
    background: var(--lightColor2);
  }
  .WeeklyHeaderCont {
    height: 15%;

    //TITULO
    h5 {
      font-size: 16px;
    }

    .WeeklyActions {
      width: auto;

      .backBtn {
        margin-right: 5px;
      }

      .Controls {
        width: 65px;
        height: 30px;
        border: solid 1px var(--lightColor2);
        border-radius: 5px;

        .ControlBtn {
          width: 47%;
          cursor: pointer;
          i {
            font-size: 22px;
          }
        }
      }
    }
  }

  //LISTA DE TAREAS
  .WeeklyTaskCont {
    height: calc(70% - 17px);
    position: relative;
    overflow-y: auto;
    margin-top: 15px;

    //ACCIONES
    .TaskAction {
      width: 45px;
      height: 90px;
      padding-top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      .TaskActionBtn {
        width: 32px !important;
        height: 32px !important;
        i {
          font-size: 19px;
        }
      }
    }
    //TAREAS
    .TaskItem {
      width: 100%;
      height: 50px;

      .TaskNumber {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .number {
          width: 35px;
          height: 35px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: solid 1px var(--lightColor2);
        }
      }

      .taskDivider {
        width: 1px;
        height: 100%;
        background: var(--lightColor2);
      }

      .TaskCheck {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .check {
          width: 35px;
          height: 35px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: solid 1px var(--lightColor2);

          i {
            font-size: 18px;
          }
        }
      }
      .TaskContent {
        width: calc(100% - 106px);
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 5px;

        .TaskContentInfo {
          width: 90%;
          height: auto;
          font-weight: 500;
          font-size: 15px;
        }

        .TaskContentAction {
          width: 10%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  //CREAR TAREA
  .WeeklyCreateCont {
    height: 15%;
  }
}
</style>
