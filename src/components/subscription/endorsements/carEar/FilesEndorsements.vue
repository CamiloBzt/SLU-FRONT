<template>
  <div style="width: 100%">
    <confirmation-modal
      :showConfirmationModal="showConfirmationModal"
      :title="'Are you sure you want to change the file?'"
      @closeConfirmationModal="showConfirmationModal = !showConfirmationModal"
      @confirmAction="confirmLoadImage"
    />

    <v-expansion-panels v-model="ActivePanel" class="ExpansionComponent ExpansionBordered mt-6" :class="[ActiveShadow ? '' : 'RemoveShadow']">
      <v-expansion-panel :disabled="loadingPanel">
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
            <div class="TitleFiles">{{ settings[movementsValue] }} Documents:</div>
            <div class="InputsContentFh">
              <!--INPUTS DE ARCHIVOS-->
              <div class="InputFileContent mb-4" v-for="(item, key) in currentDocs" :key="item.id">
                <!--LABEL-->
                <label class="InputFileLabel d-flex align-center justify-center">
                  <input @change="closeConfirmationModal($event, 'input1', item)" class="HideInputFile" type="file" />

                  <div
                    v-if="item.text == 'Upload the next document'"
                    class="
                      emptyFileInfo
                      d-flex
                      justify-center
                      align-center
                      flex-column
                    "
                  >
                    <p>
                      Upload the <b>{{ item.name }}</b> document
                    </p>
                  </div>
                  <div v-else class="NameFileCont">
                    <div class="FileName">
                      {{ key === 0 ? 'Signature' : 'Support' }}
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
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { stateExpansiveManager } from '@/mixins/subscription.js';
import ConfirmationModal from '@/components/ConfirmationModal';

export default {
  name: 'FilesSubmission',
  mixins: [stateExpansiveManager],
  components: {
    ConfirmationModal,
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
      currentColumnDoc: '',
      settings: {
        0: '',
        1: 'New Insurance Policy',
        2: 'Increase Insurable Risk',
        3: 'Reduction Of Insurable',
        4: 'Movement Without Premium',
        5: 'Change Of Share',
        6: 'Internal Adjustment',
        7: 'Summary',
      },
    };
  },
  props: {
    //DEFINE QUE ESTILOS AÑADIMOS A LOS LINKS
    link1: String,
    link2: String,
    showFileUp: Boolean,
    movementsValue: {
      type: Number | String,
      default: 0,
    },
    endorsementData: {
      type: Array | Object,
      default: {},
    },
    currentDocs: {
      type: Array | Object,
      default: [],
    },
    indexarr: {
      type: String | Number,
    },
  },
  watch: {
    docs(val) {
      console.log(val);
    },
    movementsValue(v) {
      console.log('a', v);
    },
    endorsementData(v) {
      console.log('e', v);
    },
  },
  computed: {
    ...mapGetters([
      'documents',
      'document',
      'accountInformation',
      'subscription_id',
      'nameReference',
      'type',
      'docs',
      'risk_type',
      'downloadDocUrl',
      'endorsementsDocuments',
    ]),
    ActiveShadow: function() {
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
        return 1;
      },
      set() {},
    },
    signature: {
      get() {
        const parent = this.$parent.$parent.$parent.$parent;
        if (!parent.$refs.componente) return '';
        return parent.$refs.componente.signature || '';
      },
    },
    support: {
      get() {
        const parent = this.$parent.$parent.$parent.$parent;
        if (!parent.$refs.componente) return '';
        return parent.$refs.componente.support || '';
      },
    },
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
      'saveMovement',
    ]),
    ...mapMutations(['setLoading', 'addNotification', 'setDocuments']),
    /*
    CARGAMOS Y GUARDAMOS LAS IMAGENES,
    RECIBE POR PARAMETROS EL EVENTO Y EL
    NOMBRE DEL INPUT CON EL QUE TRABAJAREMOS
    */
    loadImage(ev, inputName, item) {
      var vm = this;

      //OBTENEMOS EL NOMBRE DEL ARCHIVO
      const file = ev.target.files[0];
      //const fileName = file.name;
      const fileSize = file.size;
      this.setLoading();
      //OBTENEMOS EL ARCHIVO
      if (fileSize < 30000000) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let blobImage = new Blob([e.target.result]);
          let imageUrl = window.URL.createObjectURL(blobImage);

          if (this.subscription_id != null) {
            this.saveFile(ev.target.files[0], item, inputName);
          } else {
            this.registerIdSubscription({}).finally(() => {
              this.saveFile(ev.target.files[0], item, inputName);
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
          }).finally(() => {
            this.upload({
              file: file,
              path: 'COT_' + this.subscription_id + '/ENDORSEMENTS_FILES/' + this.document,
            })
              .then(async (res) => {
                if (res.error) {
                  this.DeleteFile(inputName, item);
                  throw new Error('Error uploading file');
                }
                item.uri = res.singleUpload.uri;
                item.document = this.document;
                this.setLoading();
                const column = item.key.endsWith('_signature') ? 'signature' : 'support';
                this.$emit('updateDocs', column, item.uri);
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
            }).finally(() => {
              this.upload({
                file: file,
                path: 'COT_' + this.subscription_id + '/ENDORSEMENTS_FILES/' + this.document,
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
          path: 'COT_' + this.subscription_id + '/ENDORSEMENTS_FILES/' + item.doc_s3,
        });
        this.downloadDocument(this.downloadDocUrl);
      }
    },
    async loadDocs() {
      if (this.subscription_id) {
        await this.DocumentsSubscriptionRisk({
          subscription_id: parseInt(this.subscription_id),
          documents: this.documents,
          typeOfRisk: this.accountInformation.typeOfRisk,
        });
        this.$forceUpdate();
      } else {
        await this.setDocuments([]);
        this.$forceUpdate();
      }
    },
    closeConfirmationModal(...args) {
      const doc_s3 = args[2].doc_s3 ? args[2].doc_s3 : args[2].document;
      this.selectedItemData = args;

      if (doc_s3) {
        this.showConfirmationModal = !this.showConfirmationModal;
      } else {
        this.loadImage(this.selectedItemData[0], this.selectedItemData[1], this.selectedItemData[2]);
        this.selectedItemData = [];
      }
    },
    confirmLoadImage() {
      this.loadImage(this.selectedItemData[0], this.selectedItemData[1], this.selectedItemData[2]);
      this.selectedItemData = [];
    },
    isDocument(key) {
      if (key === 0 && this.signature == '') return true;
      if (key === 1 && this.support == '') return true;
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
//ESTILOS GENERALES DEL ACORDEON
@import '~@/assets/style/AccordionStyle.less';
@import '~@/assets/style/FilesStyle.less';
</style>
