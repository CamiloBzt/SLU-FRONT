<template>
  <div>
    <confirmation-modal
      :showConfirmationModal="showConfirmationModal"
      :title="'Are you sure you want to change the file?'"
      @closeConfirmationModal="showConfirmationModal = !showConfirmationModal"
      @confirmAction="confirmLoadImage"
    />

    <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6">
      <v-expansion-panel
        @change="$emit('panel-event')"
        :disabled="loadingPanel"
      >
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header
          @click="changeStateCorrespondence()"
          class="ExpansionTitle"
          expand-icon=""
        >
          Correspondence
          <div class="ExpansionState HideOnMovil">
            {{ stateExpansiveMessageCorr }}
          </div>
          <template v-slot:actions>
            <v-icon class="iconExpand">
              {{ iconExpansiveCorr }}
            </v-icon>
          </template>
        </v-expansion-panel-header>

        <!--CONTENIDO DEL ACORDEON-->
        <v-expansion-panel-content>
          <div class="ExpandContent">
            <!--INPUTS DE ARCHIVOS-->
            <div class="InputsContentFh">
              <div
                class="InputFileContent mb-4"
                :class="{
                  'drag-border': dragBorder && dragBorderId == item.id,
                }"
                v-for="(item, index) in correspondenceDocuments"
                :key="index"
                @dragenter.prevent="dragIn(item.id)"
                @dragover.prevent="dragIn(item.id)"
                @dragleave.prevent="dragDrop()"
                @drop.prevent="dragDrop($event, 'input1', item, item.id)"
              >
                <!--LABEL-->
                <label
                  class="InputFileLabel d-flex align-center justify-center"
                >
                  <input
                    @change="closeConfirmationModal($event, 'input1', item)"
                    class="HideInputFile"
                    type="file"
                  />

                  <div
                    v-if="item.text == 'Upload the next document'"
                    class="emptyFileInfo d-flex justify-center align-center flex-column"
                  >
                    <p>
                      Upload the <b>Correspondence {{ item.value }}</b> document
                    </p>
                  </div>
                  <div v-else class="NameFileCont">
                    <div class="FileName">
                      {{ item.text }}
                    </div>
                    <div class="FileImage">
                      <img class="image" src="@/assets/img/document.png" />
                    </div>
                  </div>
                </label>

                <!--BORRAR-->
                <div
                  @click="DeleteFile(index, item)"
                  class="InputDeletContBtn d-flex justify-center align-center"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </div>

                <!--DESCARGAR-->
                <div
                  class="DownloadCont d-flex justify-center align-center"
                  @click="download(item)"
                >
                  <v-icon> mdi-download </v-icon>
                </div>
              </div>

              <div class="emptyFileContent d-flex justify-start align-center">
                <v-btn
                  text
                  rounded
                  class="moreButton"
                  @click="addCorrespondence()"
                >
                  <v-icon class="mr-2"> mdi-plus-circle </v-icon>
                  Add More Documents
                </v-btn>
              </div>
              <div class="emptyFileContent HideOnMovil"></div>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { stateExpansiveManager } from "@/mixins/subscription.js";
// Components
import ConfirmationModal from "@/components/ConfirmationModal";

export default {
  name: "CarDocuments",
  mixins: [stateExpansiveManager],
  components: {
    ConfirmationModal,
  },
  data() {
    return {
      //VARIABLES DE LOS ARCHIVOS
      fileName1: "",
      technicalMemory: null,
      loadingPanel: false,
      // Modal de confirmacion
      showConfirmationModal: false,
      selectedItemData: [],
      type: "correspondence",
      // Drag & Drop
      dragBorder: false,
      dragBorderId: 0,
    };
  },
  computed: {
    ...mapGetters([
      "correspondenceDocuments",
      "document",
      "subscription_id",
      "nameReference",
      "downloadDocUrl",
    ]),
  },
  async mounted() {
    /* set loadings (data) */
    const lpa = "loadingPanel";

    /* loaders to true */
    this[lpa] = !this[lpa];

    await this.loadDocs();

    this[lpa] = false;
  },
  methods: {
    ...mapActions([
      "setCorrespondenceDocument",
      "registerIdSubscription",
      "updateDataSubscription",
      "save",
      "upload",
      "downloadDocument",
      "delete",
      "CorrespondenceDocumentsSubscription",
      "DownloadDoc",
      "resetCorrespondenceDocuments",
    ]),
    ...mapMutations(["setLoading"]),
    /*
    CARGAMOS Y GUARDAMOS LAS IMAGENES,
    RECIBE POR PARAMETROS EL EVENTO Y EL
    NOMBRE DEL INPUT CON EL QUE TRABAJAREMOS
    */
    loadImage(file, inputName, item) {
      var vm = this;

      //OBTENEMOS EL NOMBRE DEL ARCHIVO
      const fileSize = file.size;
      this.setLoading();
      //OBTENEMOS EL ARCHIVO
      if (fileSize < 30000000) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let blobImage = new Blob([e.target.result]);
          let imageUrl = window.URL.createObjectURL(blobImage);

          if (this.subscription_id != null) {
            this.saveFile(file, item, inputName);
          } else {
            this.setLoading();
            this.addNotification({
              type: "warning",
              text: "Please create the subscription before uploading files.",
            });
            // this.registerIdSubscription({}).finally(() => {
            //   this.saveFile(file, item, inputName);
            // });
          }

          item.text = item.name;
          this.technicalMemory = imageUrl;
        };
        reader.readAsDataURL(file);
      } else {
        this.addNotification({ type: "danger", text: "Max 30 MB" });
        this.setLoading();
      }
    },
    saveFile(file, item, inputName) {
      var vm = this;
      /* GUARDAMOS
          LA INFORMACIÓN DEL ARCHIVO
        */
      var datos = file.name.split(".", 2);
      this.nameReference
        ? this.save({
            document_id: item.id,
            subscription_id: this.subscription_id,
            type: datos[1],
            docS3: item.doc_s3,
          }).finally(() => {
            this.upload({
              file: file,
              path:
                "COT_" +
                this.subscription_id +
                "/" +
                this.type +
                "/" +
                this.document,
            })
              .then((res) => {
                res.error
                  ? this.DeleteFile(item)
                  : (item.uri = res.singleUpload.uri),
                  (item.doc_s3 = this.document);
                this.setLoading();
              })
              .catch((e) => {
                this.setLoading();
              });
          })
        : this.updateDataSubscription({
            reference: "COT-" + this.subscription_id,
          }).finally(() => {
            this.save({
              document_id: item.id,
              subscription_id: this.subscription_id,
              type: datos[1],
              docS3: item.doc_s3,
            }).finally(() => {
              this.upload({
                file: file,
                path:
                  "COT_" +
                  this.subscription_id +
                  "/" +
                  this.type +
                  "/" +
                  this.document,
              })
                .then((res) => {
                  res.error
                    ? this.DeleteFile(item)
                    : (item.uri = res.singleUpload.uri),
                    (item.doc_s3 = this.document);
                  this.setLoading();
                })
                .catch((e) => {
                  this.setLoading();
                });
            });
          });

      vm.$forceUpdate();
    },
    /*
    ESTA FUNCION ELIMINA LOS ARCHIVOS QUE YA
    FUERON CARGADOS, RECIVE POR PARAMETRO EL
    NOMBRE DEL INPUT PARA IDENTIFICAR
    EL ARCHIVO QUE ELIMINAREMOS
    */
    DeleteFile(index, item) {
      if (item.text == "Upload the next document") {
        this.correspondenceDocuments.splice(index, 1);
      } else {
        this.setLoading();
        try {
          this.delete(item.doc_s3)
            .then((res) => {
              res.error
                ? this.setLoading()
                : this.correspondenceDocuments.splice(index, 1);
              this.setLoading();
            })
            .catch((e) => {
              this.setLoading();
            });
        } catch (e) {
          this.setLoading();
          // console.error("Could not be deleted");
        }
      }
    },
    addCorrespondence() {
      var correspondenceDoc = {
        description: "Correspondence Documents",
        id: 21,
        key: "correspondence",
        name: "Correspondence Document",
        text: "Upload the next document",
        value: this.correspondenceDocuments.length + 1,
      };
      this.setCorrespondenceDocument(correspondenceDoc);
    },

    async download(item) {
      if (item.uri) {
        this.downloadDocument(item.uri, item.text);
      } else if (item.doc_s3) {
        await this.DownloadDoc({
          path:
            "COT_" + this.subscription_id + "/" + this.type + "/" + item.doc_s3,
        });
        this.downloadDocument(this.downloadDocUrl);
      }
    },
    async loadDocs() {
      if (this.subscription_id) {
        await this.CorrespondenceDocumentsSubscription({
          subscription_id: parseInt(this.subscription_id),
        });
      } else {
        this.resetCorrespondenceDocuments();
      }
    },
    closeConfirmationModal(...args) {
      const doc_s3 = args[2].doc_s3 ? args[2].doc_s3 : args[2].document;
      this.selectedItemData = args;
      const file = this.selectedItemData[0].target.files
        ? this.selectedItemData[0].target.files[0]
        : this.selectedItemData[0].dataTransfer.files[0];
      this.selectedItemData[0] = file;

      if (doc_s3) {
        this.showConfirmationModal = !this.showConfirmationModal;
      } else {
        this.loadImage(
          file,
          this.selectedItemData[1],
          this.selectedItemData[2]
        );
        this.selectedItemData = [];
      }
    },
    confirmLoadImage() {
      this.loadImage(
        this.selectedItemData[0],
        this.selectedItemData[1],
        this.selectedItemData[2]
      );
      this.selectedItemData = [];
    },
    dragIn(dragBorderId) {
      this.dragBorder = true;
      this.dragBorderId = dragBorderId;
    },
    dragDrop(e, input, item, dragBorderId) {
      this.dragBorder = false;
      this.dragBorderId = dragBorderId ? dragBorderId : 0;

      if (e) {
        this.closeConfirmationModal(e, input, item);
        this.cleanDragData(e);
      }
    },
    cleanDragData(e) {
      if (e.dataTransfer.items) e.dataTransfer.items.clear();
      else e.dataTransfer.clearData();
    },
  },
};
</script>
<style lang="less" scoped>
//ESTILOS GENERALES DEL ACORDEON
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/FilesStyle.less";

.drag-border {
  border: solid 1px var(--lightColor2);
}
</style>
