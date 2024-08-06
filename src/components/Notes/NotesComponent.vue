<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6">
    <v-expansion-panel :disabled="loadingPanel"  @change="$emit('panel-event')">
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Notes
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{ iconExpansive }}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CONTENIDO DEL ACORDEON-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <!--NOTAS CREADAS-->
          <NotesCreated />
          <!--
          	BOTON PARA CREAR NOTAS
          -->
          <NoteTextEditor
            v-for="(item, index) in newNoteArray"
            :key="index"
            @NoteValue="GetNoteValue($event)"
          />
          <div class="CreateNoteCont d-flex justify-start align-center">
            <v-btn
              class="btn"
              @click="addNote(newNoteArray.length)"
              text
              rounded
            >
              <v-icon class="mr-2">mdi-plus-circle</v-icon>
              Add New Note
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import NotesCreated from '@/components/Notes/NotesCreated';
import NoteTextEditor from '@/components/Notes/NoteTextEditor';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { stateExpansiveManager } from '@/mixins/subscription.js';
export default {
  name: 'Notes',
  mixins: [stateExpansiveManager],
  components: {
    NotesCreated,
    NoteTextEditor,
  },
  data () {
    return {
      newNoteArray: [],
      loadingPanel: false,
      subscription_id: null
    };
  },
  async mounted () {
    this.subscription_id = Number(this.$route.params?.subscriptionId)
    /* set loadings (data) */
    const lpa = 'loadingPanel';

    /* loaders to true */
    this[lpa] = !this[lpa];

    await this.loadNotes();

    this[lpa] = false;
  },
  methods: {
    ...mapActions(['noteSubscription']),
    ...mapMutations(['setArrayNotes']),
    addNote (value) {
      console.log(this.newNoteArray);
      if ((this.newNoteArray = [] || this.newNoteArray[value - 1].value)) {
        this.newNoteArray.push({
          id: value++,
          value: '',
        });
      }
    },
    async loadNotes () {
      if (this.subscription_id) {
        await this.noteSubscription({ subscription_id: parseInt(this.subscription_id) });
      } else {
        this.setArrayNotes([]);
      }
    },
  },
  computed: {
    ...mapGetters(['mentionsObject', 'notesArray']),
  },
};
</script>
<style lang="less" scoped>
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/FilesStyle.less';
.ExpansionComponent {
  z-index: 0;
}
//BOTON CREAR NOTA
.CreateNoteCont {
  width: 100%;
  height: 50px;
  .btn {
    text-transform: none;
    color: #003d6d;
    font-weight: 500 !important;
    letter-spacing: normal;
  }
}

@media (max-width: 640px) {
  .AddNotesComponent {
    margin-top: 15px;
  }
}
</style>
