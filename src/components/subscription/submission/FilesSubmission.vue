<template>
  <div>
    <confirmation-modal
      :showConfirmationModal="showConfirmationModal"
      :title="'Are you sure you want to change the file?'"
      @closeConfirmationModal="showConfirmationModal = !showConfirmationModal"
      @confirmAction="confirmLoadImage"
    />

    <v-expansion-panels v-model="ActivePanel" class="ExpansionComponent ExpansionBordered mt-6" :class="[ActiveShadow ? '' : 'RemoveShadow']">
      <v-expansion-panel :disabled="loadingPanel" @change="$emit('panel-event')">
        <!--TITULO DEL ACORDEON-->
        <v-expansion-panel-header @click="changeStateCorrespondenceDoc()" class="ExpansionTitle" expand-icon="">
          Documents
          <div v-if="ActiveShadow" class="ExpansionState HideOnMovil">
            {{ stateExpansiveMessageDoc }}
          </div>
          <template v-if="ActiveShadow" v-slot:actions>
            <v-icon class="iconExpand">
              {{ iconExpansiveDoc }}
            </v-icon>
          </template>
        </v-expansion-panel-header>

        <!--CONTENIDO DEL ACORDEON-->
        <v-expansion-panel-content v-if="docs.length > 0">
          <div class="ExpandContent">
            <div class="InputsContentFh">
              <!--INPUTS DE ARCHIVOS-->
              <div
                class="InputFileContent mb-4"
                :class="{ 'drag-border': dragBorder && dragBorderId == item.id }"
                v-for="item in docs"
                :key="item.id"
                @dragenter.prevent="dragIn(item.id)"
                @dragover.prevent="dragIn(item.id)"
                @dragleave.prevent="dragDrop()"
                @drop.prevent="dragDrop($event, 'input1', item, item.id)"
              >
                <!--LABEL-->
                <label class="InputFileLabel d-flex align-center justify-center">
                  <input @change="closeConfirmationModal($event, 'input1', item)" class="HideInputFile" type="file" />

                  <div v-if="item.text == 'Upload the next document'" class="emptyFileInfo d-flex justify-center align-center flex-column">
                    <p>
                      Upload the <b>{{ item.name }}</b> document
                    </p>
                  </div>
                  <div v-else class="NameFileCont">
                    <div class="FileName">
                      {{ item.name }}
                    </div>
                    <div class="FileImage">
                      <img class="image" src="@/assets/img/document.png" />
                    </div>
                  </div>
                </label>
                <!--BORRAR-->
                <div @click="DeleteFile('input1', item)" class="InputDeletContBtn d-flex justify-center align-center">
                  <v-icon> mdi-trash-can-outline </v-icon>
                </div>
                <!--DESCARGAR-->
                <div class="DownloadCont d-flex justify-center align-center" @click="download(item)">
                  <v-icon> mdi-download </v-icon>
                </div>
              </div>
            </div>
            <AppMultipleFile
              section="OFAC"
              :files="arrayFilesOfa"
              @removeFile="deleteOfaDocument($event)"
              @addFile="addFileOfa($event)"
              @errorFile="errorFileOfa($event)"
              @setLoading="setLoadingOfa($event)"
              @fileLoaded="fileLoadedOfa($event)"
            />
            <AppMultipleFile
              section="NATCAT"
              :files="arrayFilesNatcat"
              @removeFile="deleteNatcatDocument($event)"
              @addFile="addFileNatcat($event)"
              @errorFile="errorFileNatcat($event)"
              @fileLoaded="fileLoadedNatcat($event)"
              @setLoading="setLoadingNatcat($event)"
            />
          </div>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-else>
          <div class="ExpandContent">
            <div>You must select a Line of Risk first to view this section.</div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
// Components
import ConfirmationModal from '@/components/ConfirmationModal';
import AppMultipleFile from '@/application/components/AppMultipleFile';
// Services
// import { getOfaDocs } from './services/bound/mock-ofa-docs.service'
// import { getNatcatDocs } from './services/bound/mock-natcat-docs.service.js'
import { getOfaDocs, saveOfaDocumentBD, uploadOfaDocumentAWS, deleteOfaDocumentAWSBD } from './services/fileSubmission/ofa-docs.service';
import { getNatcatDocs, saveNatcatDocumentBD, uploadNatcatDocumentAWS, deleteNatcatDocumentAWSBD } from './services/fileSubmission/natcat-docs.service.js';

export default {
  name: 'FilesSubmission',
  mixins: [stateExpansiveManager],
  components: {
    ConfirmationModal,
    AppMultipleFile,
  },
  data() {
    return {
      /* loaders */
      loadingPanel: false,
      loadingRisks: false,
      loadingBrokers: false,
      loadingCedents: false,
      loadingCountries: false,
      loadingActivities: false,
      loadingCurrencies: false,
      //VARIABLES DE LOS ARCHIVOS
      // Modal de confirmacion
      showConfirmationModal: false,
      selectedItemData: [],
      // Drag & Drop
      dragBorder: false,
      dragBorderId: 0,
      //OFA y NATCAT
      arrayFilesOfa: [],
      arrayFilesNatcat: [],
      // type doc
      type: 'documents',
      // subscription
      subscription_id: null,
    };
  },
  props: {
    //DEFINE QUE ESTILOS AÑADIMOS A LOS LINKS
    link1: String,
    link2: String,
    showFileUp: Boolean,
    subscriptionId: {
      type: Number,
      default: 0,
    },
    typeOfRisk: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters(['documents', 'document', 'accountInformation', 'nameReference', 'docs', 'risk_type', 'downloadDocUrl']),
    ActiveShadow: function () {
      const parent = this.$parent;
      const parentComponentName = parent.$options.name;
      if (parentComponentName == 'v-expansion-panel-content') {
        return false;
      } else {
        return true;
      }
    },
    ActivePanel: {
      get() {
        const parent = this.$parent;
        const parentComponentName = parent.$options.name;
        if (parentComponentName == 'v-expansion-panel-content') return 0;
        else return 1;
      },
      set() {},
    },
  },

  async beforeMount() {
    this.subscription_id = Number(this.$route.params.subscriptionId);
    if (this.subscription_id) {
      this.arrayFilesOfa = await getOfaDocs({
        subscription_id: this.subscription_id || '0',
      });
      this.arrayFilesNatcat = await getNatcatDocs({
        subscription_id: this.subscription_id || '0',
      });
    }
  },

  async mounted() {
    /* set loadings (data) */
    const lpa = 'loadingPanel';

    /* loaders to true */
    this[lpa] = !this[lpa];

    await this.checkSubscriptionStored();
    await this.getCatalogByDocuments({ name: 'documents' });
    await this.loadDocs();

    this[lpa] = false;
  },
  methods: {
    ...mapActions([
      'registerIdSubscription',
      'updateDataSubscription',
      'save',
      'upload',
      'delete',
      'DocumentsSubscriptionRisk',
      'checkSubscriptionStored',
      'getCatalogByDocuments',
      'DownloadDoc',
      'downloadDocument',
    ]),
    ...mapMutations(['setLoading', 'addNotification', 'setDocuments']),
    /*
    CARGAMOS Y GUARDAMOS LAS IMAGENES,
    RECIBE POR PARAMETROS EL EVENTO Y EL
    NOMBRE DEL INPUT CON EL QUE TRABAJAREMOS
    */
    loadImage(file, inputName, item) {
      var vm = this;

      //OBTENEMOS EL NOMBRE DEL ARCHIVO
      //const fileName = file.name;
      const fileSize = file.size;
      this.setLoading();
      //OBTENEMOS EL ARCHIVO
      if (fileSize < 30000000) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let blobImage = new Blob([e.target.result]);
          let imageUrl = window.URL.createObjectURL(blobImage);

          if ( !isNaN(this.subscription_id) ) {
            this.saveFile(file, item, inputName);
          } else {
            this.registerIdSubscription({}).finally(() => {
              this.subscription_id = this.$store.state.subscription_id;
              this.saveFile(file, item, inputName);
            });
          }

          item.text = item.name;
          this.technicalMemory = imageUrl;
        };
        reader.readAsDataURL(file);
      } else {
        this.addNotification({ type: 'danger', text: 'Max 30 MB' });
        this.setLoading();
      }
    },
    saveFile(file, item, inputName) {
      var vm = this;
      /* GUARDAMOS
          LA INFORMACIÓN DEL ARCHIVO
        */
      var datos = file.name.split('.', 2);

      this.nameReference
        ? this.save({
            document_id: item.id,
            subscription_id: this.subscription_id,
            type: datos[1],
            docS3: item.doc_s3,
          }).finally(() => {
            this.upload({
              file: file,
              path: 'COT_' + this.subscription_id + '/' + this.type + '/' + this.document,
            })
              .then((res) => {
                res.error ? this.DeleteFile(inputName, item) : (item.uri = res.singleUpload.uri), (item.document = this.document);
                this.setLoading();
              })
              .catch((e) => {
                this.setLoading();
              });
          })
        : this.updateDataSubscription({
            reference: 'COT-' + this.subscription_id,
          }).finally(() => {
            this.save({
              document_id: item.id,
              subscription_id: this.subscription_id,
              type: datos[1],
              docS3: item.doc_s3,
            }).finally(() => {
              this.upload({
                file: file,
                path: 'COT_' + this.subscription_id + '/' + this.type + '/' + this.document,
              })
                .then((res) => {
                  res.error ? this.DeleteFile(inputName, item) : (item.uri = res.singleUpload.uri), (item.document = this.document);
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
    DeleteFile(inputName, item) {
      const doc_s3 = item.doc_s3 ? item.doc_s3 : item.document;

      if (doc_s3) {
        var vm = this;
        try {
          this.setLoading();
          this.delete(doc_s3)
            .then((res) => {
              if (!res.error) {
                item.text = 'Upload the next document';
                item.uri = '';
                item.doc_s3 = '';
                item.document = '';
              }
              this.setLoading();
              this.$emit('deleteImage', {
                imageNumber: inputName,
              });
              vm.$forceUpdate();
            })
            .catch((e) => {
              this.setLoading();
            });
        } catch (e) {
          this.setLoading();
        }
      }
    },
    async download(item) {
      if (item.uri) {
        this.downloadDocument(item.uri, item.text);
      } else if (item.doc_s3) {
        await this.DownloadDoc({
          path: 'COT_' + this.subscription_id + '/' + this.type + '/' + item.doc_s3,
        });
        this.downloadDocument(this.downloadDocUrl);
      }
    },
    async loadDocs() {
      const data = {
        subscription_id: this.subscription_id,
        documents: this.documents,
        typeOfRisk: this.accountInformation.typeOfRisk,
      };
      if (this.subscription_id) {
        if (this.subscriptionId > 0 && this.typeOfRisk > 0) {
          data.typeOfRisk = this.typeOfRisk;
          await this.DocumentsSubscriptionRisk(data);
          this.$forceUpdate();
        } else {
          await this.DocumentsSubscriptionRisk(data);
          this.$forceUpdate();
        }
      } else {
        this.setDocuments([]);
        this.$forceUpdate();
      }
    },
    closeConfirmationModal(...args) {
      const doc_s3 = args[2].doc_s3 ? args[2].doc_s3 : args[2].document;
      this.selectedItemData = args;
      const file = this.selectedItemData[0].target.files ? this.selectedItemData[0].target.files[0] : this.selectedItemData[0].dataTransfer.files[0];
      this.selectedItemData[0] = file;

      if (doc_s3) {
        this.showConfirmationModal = !this.showConfirmationModal;
      } else {
        this.loadImage(file, this.selectedItemData[1], this.selectedItemData[2]);
        this.selectedItemData = [];
      }
    },
    confirmLoadImage() {
      this.loadImage(this.selectedItemData[0], this.selectedItemData[1], this.selectedItemData[2]);
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

    /* 
      Metodos para los documentos OFA
    */
    // Modifica el array de documentos OFA para añadir un nuevo input de tipo file
    addFileOfa() {
      const newId = this.arrayFilesOfa.length + 1;
      const emptyFile = {
        id: newId,
        fileName: 'New Document',
        downloadLink: '#',
        errorMessage: '',
        status: 'uploaded',
      };
      this.arrayFilesOfa.push(emptyFile);
    },
    // Muestra los mensajes de error para los documentos de tipo OFA
    errorFileOfa({ id, errorMessage }) {
      this.arrayFilesOfa = this.arrayFilesOfa.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName: '',
            downloadLink: '#',
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
    async fileLoadedOfa({ id, fileName, file }) {
      // file contiene el event.target.files
      this.setLoading();
      this.arrayFilesOfa = this.arrayFilesOfa.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName,
            downloadLink: '#',
            status: 'loaded',
            errorMessage: '',
          };
        }
        return obj;
      });
      const resSa = await saveOfaDocumentBD({ subscription_id: this.subscription_id, doc_s3: fileName });
      const resUp = await uploadOfaDocumentAWS({ file: file, path: fileName });
      this.arrayFilesOfa.forEach((e) => {
        if (e.id === id) {
          e.id = resSa.id;
          e.downloadLink = resUp;
        }
      });
      this.setLoading();
    },
    // Muestra el loader
    setLoadingOfa({ id, status }) {
      this.arrayFilesOfa = this.arrayFilesOfa.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName: '',
            downloadLink: '',
            loaded: false,
            error: false,
            errorMessage: '',
            loading: status,
            uploaded: false,
          };
        }
        return obj;
      });
    },
    // Eliminar un archivo por su id
    async deleteOfaDocument({ id }) {
      this.setLoading();
      this.arrayFilesOfa = this.arrayFilesOfa.filter((e) => {
        return e.id !== id;
      });
      const res = await deleteOfaDocumentAWSBD({ idDocument: id });
      this.setLoading();
    },

    /* 
      Metodos para los documentos NATCAT
    */
    // Modifica el array de documentos OFA para añadir un nuevo input de tipo file
    addFileNatcat() {
      const newId = this.arrayFilesNatcat.length + 1;
      const emptyFile = {
        id: newId,
        fileName: 'New Document',
        downloadLink: '#',
        errorMessage: '',
        status: 'uploaded',
      };
      this.arrayFilesNatcat.push(emptyFile);
    },
    // Muestra los mensajes de error para los documentos de tipo OFA
    errorFileNatcat({ id, errorMessage }) {
      this.arrayFilesNatcat = this.arrayFilesNatcat.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName: '',
            downloadLink: '#',
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
    async fileLoadedNatcat({ id, fileName, file }) {
      this.setLoading();
      // file contiene el event.target.files
      this.arrayFilesNatcat = this.arrayFilesNatcat.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName,
            downloadLink: '#',
            status: 'loaded',
            errorMessage: '',
          };
        }
        return obj;
      });
      const resSa = await saveNatcatDocumentBD({ subscription_id: this.subscription_id, doc_s3: fileName });
      const resUp = await uploadNatcatDocumentAWS({ file: file, path: fileName });
      this.arrayFilesNatcat.forEach((e) => {
        if (e.id === id) {
          e.id = resSa.id;
          e.downloadLink = resUp;
        }
      });
      this.setLoading();
    },
    // Muestra el loader
    setLoadingNatcat({ id, status }) {
      this.arrayFilesNatcat = this.arrayFilesNatcat.map((obj) => {
        if (obj.id === id) {
          return {
            id: id,
            fileName: '',
            downloadLink: '',
            loaded: false,
            error: false,
            errorMessage: '',
            loading: status,
            uploaded: false,
          };
        }
        return obj;
      });
    },
    // Elimina un documento por su id
    async deleteNatcatDocument({ id }) {
      this.setLoading();
      this.arrayFilesNatcat = this.arrayFilesNatcat.filter((e) => {
        return e.id !== id;
      });
      const res = await deleteNatcatDocumentAWSBD({ idDocument: id });
      this.setLoading();
    },
  },
  watch: {
    'accountInformation.typeOfRisk': {
      handler(value) {
        this.loadDocs();
      },
    },
  },
};
</script>
<style lang="less" scoped>
//ESTILOS GENERALES DEL ACORDEON
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/FilesStyle.less';
.ExpansionComponent {
  z-index: 0;
}
.drag-border {
  border: solid 1px var(--lightColor2);
}
</style>
