<template>
  <v-expansion-panels
    v-if="hasRole71or72"
    v-model="activePanel"
    class="ExpansionComponent ExpansionBordered mt-6"
  >
    <v-expansion-panel :disabled="loadingPanel">
      <v-expansion-panel-header class="ExpansionTitle">
        Downloadable Documents
        <template v-slot:actions>
          <v-icon class="iconExpand">mdi-chevron-down</v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <v-expansion-panels
            v-for="(files, group) in groupedFiles"
            :key="group"
            class="ExpansionComponent ExpansionBordered mt-6"
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="ExpansionTitle">
                {{ group }}
                <template v-slot:actions>
                  <v-icon class="iconExpand">mdi-chevron-down</v-icon>
                </template>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <div class="ExpandContent">
                  <div class="InputsContentFh">
                    <div
                      class="InputFileContent mb-4"
                      v-for="file in files"
                      :key="file.id"
                    >
                      <!-- Visual input style, disabled -->
                      <label
                        v-if="file.status === 'loaded'"
                        class="InputFileLabel d-flex align-center justify-center"
                      >
                        <input
                          @change="uploadFile($event, file.id)"
                          class="HideInputFile"
                          type="file"
                          :disabled="!hasRole72"
                        />
                        <div class="NameFileCont">
                          <div class="FileName">{{ file.fileName }}</div>
                          <div class="FileImage">
                            <img
                              class="image"
                              src="@/assets/img/document.png"
                            />
                          </div>
                        </div>
                      </label>

                      <!--BORRAR-->
                      <div
                        v-if="file.status === 'loaded' && hasRole72"
                        @click="deleteFile({ id: file.id })"
                        class="InputDeletContBtn d-flex justify-center align-center"
                      >
                        <v-icon> mdi-trash-can-outline </v-icon>
                      </div>
                      <!--DESCARGAR-->
                      <div
                        v-if="file.status === 'loaded'"
                        class="DownloadCont d-flex justify-center align-center"
                      >
                        <v-btn icon :href="file.downloadLink" target="_blank">
                          <v-icon>mdi-download</v-icon>
                        </v-btn>
                      </div>

                      <!-- Subida pendiente -->
                      <label
                        v-else-if="file.status === 'uploaded'"
                        class="InputFileLabel d-flex align-center justify-center"
                      >
                        <div
                          class="emptyFileInfo d-flex justify-center align-center flex-column"
                        >
                          <p>Upload the document</p>
                        </div>
                        <input
                          hidden
                          type="file"
                          @change="uploadFile($event, file.id)"
                        />
                      </label>

                      <!-- Error -->
                      <label
                        v-else-if="file.status === 'error'"
                        class="file__upload upload--error"
                      >
                        <div class="name">{{ file.errorMessage }}</div>
                        <input
                          hidden
                          type="file"
                          @change="uploadFile($event, file.id)"
                        />
                      </label>

                      <!-- Cargando -->
                      <div
                        v-else-if="file.status === 'loading'"
                        class="file__loading"
                      >
                        <v-progress-circular indeterminate width="3" />
                      </div>
                    </div>
                    <div class="button" v-if="hasRole72">
                      <v-btn
                        @click="addFileToGroup(group)"
                        class="button__btn"
                        depressed
                      >
                        <v-icon> mdi-plus-circle </v-icon>
                        Add New Document
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- Botón cuando no hay ningún archivo agrupado -->
          <div
            class="button"
            v-if="hasRole72 && Object.keys(groupedFiles).length === 0"
          >
            <v-btn
              @click="addFileToGroup('New folder')"
              class="button__btn"
              depressed
            >
              <v-icon> mdi-plus-circle </v-icon>
              Add New Document
            </v-btn>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapMutations } from "vuex";
import {
  deleteOfaDocumentAWSBD,
  getOfaDocs,
  saveOfaDocumentBD,
  uploadOfaDocumentAWS,
} from "../subscription/submission/services/fileSubmission/ofa-docs.service";

export default {
  name: "DownloadableDocuments",
  data() {
    return {
      loadingPanel: false,
      activePanel: 1,
      arrayFiles: [],
      subscription_id: 999999999,
    };
  },
  async beforeMount() {
    /* set loadings (data) */
    const lpa = "loadingPanel";

    /* loaders to true */
    this[lpa] = !this[lpa];
    this.arrayFiles = await getOfaDocs({
      subscription_id: this.subscription_id || "0",
    });

    this[lpa] = false;
  },
  computed: {
    groupedFiles() {
      const groups = {};

      this.arrayFiles.forEach((file) => {
        const [group, ...rest] = file.fileName.split(" - ");
        if (!groups[group]) groups[group] = [];
        groups[group].push({
          ...file,
          fileName: rest.join(" - "),
        });
      });

      // Ordenar alfabéticamente los grupos
      const orderedGroups = Object.keys(groups)
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, key) => {
          acc[key] = groups[key];
          return acc;
        }, {});

      return orderedGroups;
    },
    hasRole72() {
      return this.$store.state.auth.user.roles?.some((r) => r.id === 72);
    },
    hasRole71or72() {
      const roles = this.$store.state.auth.user.roles || [];
      return roles.some((r) => r.id === 71 || r.id === 72);
    },
  },
  methods: {
    ...mapMutations(["setLoading"]),

    // Modifica el array de documentos para añadir un nuevo input de tipo file
    addFileToGroup(group) {
      const newId = this.arrayFiles.length + 1;
      const emptyFile = {
        id: newId,
        fileName: `${group} - New Document.pdf`,
        downloadLink: "#",
        errorMessage: "",
        status: "uploaded",
      };
      this.arrayFiles.push(emptyFile);
    },
    /* Sube un nuevo archivo */
    uploadFile(event, id, multiple = false) {
      let fileList = "";
      if (multiple) {
        fileList = event;
      } else {
        fileList = event.target.files[0];
      }
      const fileName = fileList.name;
      const fileSize = fileList.size;
      if (fileSize < 30000000) {
        const reader = new FileReader();
        reader.readAsText(fileList);

        // Activa el loader
        this.setLoadingFile({
          id,
          status: true,
        });

        // Envía la información del archivo
        reader.onload = (e) => {
          this.fileLoaded({
            id,
            fileName,
            file: fileList,
          });
        };
      } else {
        /* Muestra el mensaje de error */
        const errorMessage = "Document size must be less than 30 MB";
        this.errorFile({
          id,
          errorMessage,
        });
      }
    },
    // Muestra los mensajes de error para los documentos de tipo OFA
    errorFile({ id, errorMessage }) {
      this.arrayFiles = this.arrayFiles.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName: "",
            downloadLink: "#",
            loaded: false,
            error: true,
            errorMessage: errorMessage,
            loading: false,
            uploaded: false,
          };
        }
        return obj;
      });
    },
    // Termina de cargar un archivo y lo muestra al usuario
    async fileLoaded({ id, fileName, file }) {
      // file contiene el event.target.files
      this.setLoading();
      this.arrayFiles = this.arrayFiles.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName,
            downloadLink: "#",
            status: "loaded",
            errorMessage: "",
          };
        }
        return obj;
      });
      const resSa = await saveOfaDocumentBD({
        subscription_id: this.subscription_id,
        doc_s3: fileName,
      });
      const resUp = await uploadOfaDocumentAWS({ file: file, path: fileName });
      this.arrayFiles.forEach((e) => {
        if (e.id === id) {
          e.id = resSa.id;
          e.downloadLink = resUp;
        }
      });
      this.setLoading();
    },
    // Muestra el loader
    setLoadingFile({ id, status }) {
      this.arrayFiles = this.arrayFiles.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName: "",
            downloadLink: "",
            loaded: false,
            error: false,
            errorMessage: "",
            loading: status,
            uploaded: false,
          };
        }
        return obj;
      });
    },
    // Eliminar un archivo por su id
    async deleteFile({ id }) {
      this.setLoading();
      this.arrayFiles = this.arrayFiles.filter((e) => {
        return e.id !== id;
      });
      const res = await deleteOfaDocumentAWSBD({ idDocument: id });
      this.setLoading();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/FilesStyle.less";

.ExpansionComponent {
  z-index: 0;
}

.InputFileContent {
  width: 100% !important;
}

.file {
  height: 50px;
  display: flex;

  // Variación para mostrar errores
  .upload--error {
    padding-left: 10px;
    padding-right: 5px;
    border-radius: 10px;
    border: dashed 1px red;
    background: white;
    .name {
      color: red;
    }
    i {
      color: red;
    }
  }

  // Variación para mostrar el loader
  &__loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #d2deed;
    border-radius: 10px;
  }
}

.button {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &__btn {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background: transparent;
    justify-content: space-around;
    color: #003d6d;
    letter-spacing: normal;
    i {
      font-size: 24px;
    }
  }
}
</style>
