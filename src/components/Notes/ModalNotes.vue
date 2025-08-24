<template>
  <div v-if="ShowModal" class="ModalNotes d-flex justify-center align-center">
    <div class="NotesCont d-flex justify-center align-start align-content-start flex-wrap">
      <!--BOTON CERRAR-->
      <div @click="HideModal()" class="CloseModalBtn">
        <v-btn class="btn" icon>
          <img class="iconClose" src="@/assets/img/icons/close.png" />
        </v-btn>
      </div>

      <!--REFERENCIA-->
      <div class="RefCont d-flex justify-start align-center">[Ref Number {{ idSubsNotes }}] Notes</div>

      <!--NOTAS-->
      <div class="NotesHistory scrollable d-flex justify-center align-content-start align-start flex-wrap">
        <!--HISTORIAL DE NOTAS-->
        <div v-for="(item, index) in notesArray" :key="index" class="NoteCont d-flex justify-center align-start align-content-start flex-wrap">
          <!--NOMBRE DEL CREADOR DE LAS NOTAS-->
          <div class="NoteCreator">
            <h6>{{ item.user_name }} - {{ item.date }}:</h6>
          </div>

          <!--CONTENIDO DE LAS NOTA-->
          <div class="NoteContent d-flex align-center flex-column">
            <!--NOTAS-->
            <div class="Note">{{ item.description }}</div>

            <!--RESPUESTAS-->
            <div class="Response" v-for="(res, index) in item.arrayResponse" :key="index">
              <!--CREADOR-->
              <div class="NoteCreator">
                <h6>{{ res.user_name }} {{ res.date }}</h6>
              </div>

              <!--NOTA-->
              <div class="Note">{{ res.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ModalNotes",
  props: {
    ShowModal: Boolean,
    idSubsNotes: Number,
  },
  computed: {
    ...mapGetters(["mentionsObject", "notesArray", "subscription_id"]),
  },
  methods: {
    HideModal() {
      this.$emit("HideModal");
    },
  },
};
</script>
<style lang="less" scoped>
.ModalNotes {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40000;
  background: rgba(0, 0, 0, 0.5);

  .NotesCont {
    width: 74%;
    height: 50%;
    background: white;
    border-radius: 5px;
    position: relative;

    //CERRAR NOTA
    .CloseModalBtn {
      width: auto;
      height: auto;
      position: absolute;
      right: -15px;
      top: -15px;
      z-index: 1000;
      border-radius: 5px;
      cursor: pointer;
      .btn {
        width: 30px !important;
        height: 30px !important;
        .iconClose {
          width: 34px;
          height: 34px;
        }
      }
    }

    //REFERENCIA DE LA NOTA
    .RefCont {
      width: 100%;
      height: 50px;
      font-weight: 600;
      font-size: 18px;
      padding: 0px 20px;
    }

    //CONTENEODR DE LAS NOTAS
    .NotesHistory {
      width: 100%;
      height: calc(100% - 50px);
      padding: 0px 20px;
      overflow: auto;

      //NOTA INDIVIDUAL
      .NoteCont {
        width: 100%;
        height: auto;

        //Creador de la nota
        .NoteCreator {
          width: 100%;
          height: auto;
          h6 {
            font-size: 16px;
            font-weight: 600;
            // color:var(--mainColor2);
          }
        }

        //NOTA
        .NoteContent {
          margin-top: 5px;
          width: 100%;
          height: auto;
          border-bottom: solid 1px #d2deed;
          padding-bottom: 12px;
          //NOTAS
          .Note {
            width: 100%;
            font-size: 15px;
          }

          //RESPUESTAS
          .Response {
            width: 100%;
            height: auto;
            padding: 0px 50px;
            margin-top: 5px;

            .NoteCreator {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
