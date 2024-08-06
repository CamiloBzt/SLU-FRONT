<template>
  <div class="NotesCreated">
    <div v-for="(item, index) in notesArray" :key="index" class="NotesCont">
      <!--NOMBRE DEL CREADOR DE LA NOTA-->
      <div class="NoteCreator">
        <h6>
          {{ item.user_name + ' ' + item.date }}
        </h6>
      </div>

      <!--INFORMACIÓN DE LAS NOTA-->
      <div class="NoteContent">
        <!--CONTENIDO DE LA NOTA-->
        <div class="NoteContentSn">
          {{ item.description }}
        </div>

        <!--RESPUESTAS DE LA NOTA-->
        <div
          class="ResNote"
          v-for="(res, index) in item.arrayResponse"
          :key="index"
        >
          <!--USUARIO DE LA RESPUESTA-->
          <div class="resNoteUser">
            <h6>
              {{ res.user_name + ' ' + res.date }}
            </h6>
          </div>

          <!--CONTENIDO DE LA RESPUESTA-->
          <div class="resContent">
            {{ res.description }}
          </div>
        </div>

        <!--FORMULARIO PARA RESPONDER NOTA-->
        <div v-if="item.showRes" class="ResForm">
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
                {{ loading ? 'Loading...' : 'No result' }}
              </div>
            </template>

            <template #item-@="{ item }">
              <div class="user">
                {{ item.name }}
                <span class="dim"> {{ item.lastName }} </span>
              </div>
            </template>
          </Mentionable>
          <div class="sendNote">
            <v-btn small icon class="btnSend" @click="sendResponse(item, text)">
              <v-icon color="#547fa9"> mdi-send </v-icon>
            </v-btn>
          </div>
        </div>

        <!--BOTON RESPONDER NOTA-->
        <div
          v-if="!item.showRes"
          @click="item.showRes = !item.showRes"
          class="respNote d-flex justify-center align-center"
        >
          <v-icon> mdi-chat-outline </v-icon>
        </div>

        <!--BOTON ELIMINAR NOTA-->
        <div
          v-if="!item.showRes"
          @click="btnDeleteNote(item, index)"
          class="DeleteNote d-flex justify-center align-center"
        >
          <v-icon> mdi-trash-can-outline </v-icon>
        </div>

        <!--BOTON CERRAR RESPUESTA-->
        <div
          v-if="item.showRes"
          @click="item.showRes = !item.showRes"
          class="CloseRes d-flex justify-center align-center"
        >
          <v-icon> mdi-close </v-icon>
        </div>
      </div>

      <!--SEPARADOR-->
      <div class="lineNotes"></div>
    </div>
  </div>
</template>
<script>
import VTooltip from 'v-tooltip';
import { Mentionable } from 'vue-mention';
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      text: '',
      items: [],
      loading: false
    }
  },
  components: {
    VTooltip,
    Mentionable,
  },
  computed: {
    ...mapGetters(['mentionsObject', 'notesArray', 'subscription_id', 'user']),
  },
  methods: {
    ...mapActions(['deleteNote', 'usersName', , 'responseNote']),
    ...mapMutations(['setLoading']),
    btnDeleteNote(item, index) {
      if (item.arrayResponse) {
        item.arrayResponse.forEach((value, index2) => {
          this.deleteNote(value.id).finally(() => {
            item.arrayResponse.splice(index2, 1);
          });
        });
      }
      this.setLoading();
      this.deleteNote(item.id).finally(() => {
        this.notesArray.splice(index, 1);
        this.setLoading();
      });
    },
    async sendResponse(item, noteResponse) {
      this.setLoading()
      
      const users_ids = this.items.filter((element, index) => {
        return this.items.indexOf(element) === index;
      })
      
      await this.responseNote({
        description: noteResponse,
        subscription_id: this.subscription_id,
        parent_note_id: item.id,
        users_ids
      })
        .then((res) => {
          if (res) {
            this.text = ''
            this.items = []
          }
          this.setLoading();
          this.$forceUpdate();
        })
        .catch((e) => {
          this.setLoading();
        });
    },
    async loadIssues(searchText = '') {
      this.loading = true;
      await this.usersName({ name: searchText });
      this.loading = false;
    },
    apply(item) {
      this.items.push(item.id)
    }
  },
};
</script>
<style lang="less" scoped>
.NotesCreated {
  width: 100%;
  height: auto;
  .NotesCont {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    //CREADOR DE LA NOTA
    .NoteCreator {
      width: 100%;
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      h6 {
        font-size: 16px;
        font-weight: 600;
      }
    }
    //CONTENIDO DE LAS NOTES
    .NoteContent {
      width: 100%;
      min-height: 37px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      align-content: flex-start;
      position: relative;
      flex-wrap: wrap;

      //INFORMACIÓN DE LAS NOTAS
      .NoteContentSn {
        width: calc(100% - 110px);
        height: 100%;
        font-size: 16px;
        margin-right: 80px;
      }

      //RESPUESTAS DE LAS NOTAS
      .ResNote {
        width: calc(100% - 110px);
        margin-right: 50px;
        height: auto;
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;

        //USUARIO DE LA RESPUESTA
        .resNoteUser {
          width: 100%;
          height: 42px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          h6 {
            font-size: 16px;
            font-weight: 600;
          }
        }

        //RESPUESTA
        .resContent {
          width: 100%;
          min-height: 37px;
        }
      }

      //FORMULARIO PARA RESPONDER NOTA
      .ResForm {
        width: 100%;
        height: 100px;
        margin-top: 15px;
        overflow: hidden;
        border: solid 1px #547fa9;
        border-radius: 15px;

        .mentionable {
          width: 100%;
          height: 65%;
          padding-left: 15px;
          padding-right: 15px;
          padding-top: 5px;
          padding-bottom: 5px;
          textarea {
            width: 100%;
            height: 100%;
            resize: none;
          }
          textarea:focus {
            outline: none;
          }
        }

        .sendNote {
          width: 100%;
          height: 35%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 15px;

          .btnSend {
            i {
              font-size: 17px;
            }
          }
        }
      }

      .respNote {
        width: 37px;
        height: 37px;
        border-radius: 37px;
        background: #edf2f8;
        cursor: pointer;
        position: absolute;
        right: 40px;
        i {
          color: #0069ba;
          font-size: 24px;
        }
      }

      //ELIMINAR NOTA
      .DeleteNote {
        width: 37px;
        height: 37px;
        border-radius: 37px;
        background: #edf2f8;
        cursor: pointer;
        position: absolute;
        right: 0;
        i {
          color: #0069ba;
          font-size: 24px;
        }
      }

      .CloseRes {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        background: #edf2f8;
        cursor: pointer;
        position: absolute;
        right: 0;
        i {
          color: #0069ba;
          font-size: 20px;
        }
      }
    }

    //SEPARADOR
    .lineNotes {
      width: 100%;
      height: 1px;
      margin-top: 5px;
      background: #d2deed;
    }
  }
}
</style>
