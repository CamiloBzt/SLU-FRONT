<template>
  <div class="outter-wrapper">
    <v-stepper v-model="e1">
      <div class="endorsement-wrapper">
        <div class="content">
          <v-stepper-items>
            <div class="endorsement-title">Documents</div>
          </v-stepper-items>
          <div class="InputsContentFh">
            <!--INPUTS DE ARCHIVOS-->
            <div
              class="InputFileContent mb-4"
              :class="{ 'drag-border': dragBorder && dragBorderId == item.id }"
              v-for="item in arrayFilesEndorsement"
              :key="item.id"
              @dragenter.prevent="dragIn(item.id)"
              @dragover.prevent="dragIn(item.id)"
              @dragleave.prevent="dragDrop()"
              @drop.prevent="dragDrop($event, 'input1', item, item.id)"
            >
              <!--LABEL-->
              <label class="InputFileLabel d-flex align-center justify-center">
                <!-- <input
                  @change="closeConfirmationModal($event, 'input1', item)"
                  class="HideInputFile"
                  type="file"
                /> -->

                <div v-if="item.text == 'Upload the next document'" class="emptyFileInfo d-flex justify-center align-center flex-column">
                  <p>Upload the <b>test</b> document</p>
                </div>
                <div v-else class="NameFileCont">
                  <div class="FileName">{{ item.document_url }}</div>
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
            <!-- SI ES MENOR QUE EL LIMITE DE ARCHIVOS PERMITIMOS AGREGAR MAS -->
            <div v-if="bigFile" class="InputFileContentUpload mb-4">
              <!--LABEL-->
              <label class="InputFileLabel d-flex align-center justify-center">
                <!-- <input
                  @change="uploadFile($event, arrayFilesNatcat.length + 1)"
                  class="HideInputFile"
                  type="file"
                /> -->

                <div class="NameFileCont">
                  <div class="FileImage">
                    <div class="FileImageText">
                      Document size must be
                      <span class="FileImageSpan">less than 2MB</span>
                    </div>
                    <img class="image" src="@/assets/img/icons/hexagonalwarning.svg" />
                    <button class="buttonFileUpload">Upload File</button>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- SI ES MENOR QUE EL LIMITE DE ARCHIVOS PERMITIMOS AGREGAR MAS -->
        <div v-if="!limit" class="button">
          <input @change="uploadFile($event, arrayFilesNatcat.length + 1)" id="fileUpload" type="file" hidden />
          <v-btn @click="chooseFiles()" class="button__btn" depressed>
            <v-icon> mdi-plus-circle </v-icon>
            Add New Document
          </v-btn>
        </div>
        <!-- <AppMultipleFile
          section=""
          :files="arrayFilesNatcat"
          @removeFile="deleteNatcatDocument($event)"
          @addFile="addFileNatcat($event)"
          @errorFile="errorFileNatcat($event)"
          @fileLoaded="fileLoadedNatcat($event)"
          @setLoading="setLoadingNatcat($event)"
        /> -->
      </div>
    </v-stepper>
  </div>
</template>
<script>
/* services */
import { mapActions, mapGetters, mapMutations } from "vuex";
import AppMultipleFile from "@/application/components/AppMultipleFile";
import {
  getNatcatDocs,
  saveNatcatDocumentBD,
  saveEndorsementDocumentBD,
  uploadNatcatDocumentAWS,
  deleteNatcatDocumentAWSBD,
  getDocsEndorsements,
  getDocEndorsements,
} from "@/components/subscription/submission/services/fileSubmission/natcat-docs.service.js";

export default {
  name: "DocumentsEndorsement",
  components: {
    AppMultipleFile,
  },
  props: {},
  data() {
    return {
      docs: [1, 2, 3],
      //OFA y NATCAT
      arrayFilesEndorsement: [],
      arrayFilesNatcat: [],
      subscription_id: null,
      limit: false,
      bigFile: false,
      e1: 1,
    };
  },
  async beforeMount() {
    this.subscription_id = Number(this.$route.params.id);
  },
  async mounted() {},
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      "registerIdSubscription",
      "updateDataSubscription",
      "savedocumentEndorsement",
      "saveNewDocumentEndorsement",
      "upload",
      "delete",
      "deleteEndorsement",
      "DocumentsSubscriptionRisk",
      "checkSubscriptionStored",
      "getCatalogByDocuments",
      "DownloadDoc",
      "downloadDocument",
    ]),
    ...mapMutations(["setLoading", "addNotification", "setDocuments"]),
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

          if (!isNaN(this.subscription_id)) {
            this.saveFile(file, item, inputName);
          } else {
            // this.registerIdSubscription({}).finally(() => {
            //   this.subscription_id = this.$store.state.subscription_id;
            //   this.saveFile(file, item, inputName);
            // });
            this.setLoading();
            this.addNotification({
              type: "warning",
              text: "Please create the submission before uploading documents.",
            });
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
        ? this.savedocumentEndorsement({
            document_id: item.id,
            subscription_id: this.subscription_id,
            type: datos[1],
            docS3: item.doc_s3,
          }).finally(() => {
            this.upload({
              file: file,
              path: "COT_" + this.subscription_id + "/" + this.type + "/" + this.document,
            })
              .then((res) => {
                res.error ? this.DeleteFile(inputName, item) : (item.uri = res.singleUpload.uri), (item.document = this.document);
                this.setLoading();
              })
              .catch((e) => {
                this.setLoading();
              })
              .finally(async () => {
                if (this.subscription_id) {
                  this.arrayFilesEndorsement.push(
                    await getDocEndorsements({
                      subscription_id: this.subscription_id,
                      filename: fileName,
                    })
                  );
                }
                if (this.arrayFilesEndorsement.length >= 25) {
                  this.limit = true;
                } else {
                  this.limit = false;
                }
              });
          })
        : this.updateDataSubscription({
            reference: "COT-" + this.subscription_id,
          }).finally(() => {
            this.savedocumentEndorsement({
              document_id: item.id,
              subscription_id: this.subscription_id,
              type: datos[1],
              docS3: item.doc_s3,
            }).finally(() => {
              this.upload({
                file: file,
                path: "COT_" + this.subscription_id + "/" + this.type + "/" + this.document,
              })
                .then((res) => {
                  res.error ? this.DeleteFile(inputName, item) : (item.uri = res.singleUpload.uri), (item.document = this.document);
                  this.setLoading();
                })
                .catch((e) => {
                  this.setLoading();
                })
                .finally(async () => {
                  if (this.subscription_id) {
                    this.arrayFilesEndorsement.push(
                      await getDocEndorsements({
                        subscription_id: this.subscription_id,
                        filename: fileName,
                      })
                    );
                  }
                  if (this.arrayFilesEndorsement.length >= 25) {
                    this.limit = true;
                  } else {
                    this.limit = false;
                  }
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
      const doc_s3 = item.id ? item.id : item.document_url;
      if (doc_s3) {
        var vm = this;
        try {
          this.setLoading();
          this.deleteEndorsement(doc_s3)
            .then((res) => {
              if (!res.error) {
                item.text = "Upload the next document";
                item.uri = "";
                item.doc_s3 = "";
                item.document = "";
              }
              this.setLoading();
              this.$emit("deleteImage", {
                imageNumber: inputName,
              });
              vm.$forceUpdate();
            })
            .catch((e) => {
              this.setLoading();
            })
            .finally(async () => {
              if (this.subscription_id) {
                const ind = this.arrayFilesEndorsement.map((e) => e.id).indexOf(item.id);
                this.arrayFilesEndorsement.splice(ind, 1);
              }
              if (this.arrayFilesEndorsement.length >= 25) {
                this.limit = true;
              } else {
                this.limit = false;
              }
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
          path: "COT_" + this.subscription_id + "/" + this.type + "/" + item.doc_s3,
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
    /* Invoca al input con el clic*/
    chooseFiles() {
      document.getElementById("fileUpload").click();
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
        this.bigFile = false;
        const reader = new FileReader();
        reader.readAsText(fileList);

        // Envía la información del archivo
        reader.onload = (e) => {
          this.fileLoadedNatcat({
            id,
            fileName,
            file: fileList,
          });
        };
      } else {
        /* Muestra el mensaje de error */
        const errorMessage = "Document size must be less than 30 MB";
        this.errorFileNatcat({ id, errorMessage });
        this.bigFile = true;
      }
    },
    /*
      Metodos para los documentos OFA
    */
    // Modifica el array de documentos OFA para añadir un nuevo input de tipo file
    addFileOfa() {
      const restantes = 25 - arrayFilesEndorsement.length;
      if (this.arrayFilesEndorsement.length < restantes) {
        const newId = this.arrayFilesEndorsement.length + 1;
        const emptyFile = {
          id: newId,
          fileName: "New Document",
          downloadLink: "#",
          errorMessage: "",
          status: "uploaded",
        };
        this.arrayFilesEndorsement.push(emptyFile);
      }
    },
    // Muestra los mensajes de error para los documentos de tipo OFA
    errorFileOfa({ id, errorMessage }) {
      this.arrayFilesEndorsement = this.arrayFilesEndorsement.map((obj) => {
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
    async fileLoadedOfa({ id, fileName, file }) {
      // file contiene el event.target.files
      this.setLoading();
      this.arrayFilesEndorsement = this.arrayFilesEndorsement.map((obj) => {
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
      this.arrayFilesEndorsement.forEach((e) => {
        if (e.id === id) {
          e.id = resSa.id;
          e.downloadLink = resUp;
        }
      });
      this.setLoading();
    },
    // Muestra el loader
    setLoadingOfa({ id, status }) {
      this.arrayFilesEndorsement = this.arrayFilesEndorsement.map((obj) => {
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
    async deleteOfaDocument({ id }) {
      this.setLoading();
      this.arrayFilesEndorsement = this.arrayFilesEndorsement.filter((e) => {
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
      const restantes = 25 - this.arrayFilesEndorsement.length;
      if (this.arrayFilesNatcat.length + 1 == restantes) {
        this.limit = true;
      }
      if (this.arrayFilesNatcat.length < restantes) {
        const newId = this.arrayFilesNatcat.length + 1;
        const emptyFile = {
          id: newId,
          fileName: "New Document",
          downloadLink: "#",
          errorMessage: "",
          status: "uploaded",
        };
        this.arrayFilesNatcat.push(emptyFile);
      }
    },
    // Muestra los mensajes de error para los documentos de tipo OFA
    errorFileNatcat({ id, errorMessage }) {
      this.arrayFilesNatcat = this.arrayFilesNatcat.map((obj) => {
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
    async fileLoadedNatcat({ id, fileName, file }) {
      this.setLoading();
      // file contiene el event.target.files
      this.arrayFilesNatcat = this.arrayFilesNatcat.map((obj) => {
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
      await this.saveNewDocumentEndorsement({
        type: this.$store.endorsmentType,
        docS3: fileName,
      });
      const resSa = await saveEndorsementDocumentBD({
        subscription_id: this.subscription_id,
        doc_s3: fileName,
      });
      const resUp = await uploadNatcatDocumentAWS({
        file: file,
        path: fileName,
      });
      this.arrayFilesNatcat.forEach((e) => {
        if (e.id === id) {
          e.id = resSa.id;
          e.downloadLink = resUp;
        }
      });
      this.subscription_id = Number(this.$route.params.id);
      if (this.subscription_id) {
        this.arrayFilesEndorsement.push(
          await getDocEndorsements({
            subscription_id: this.subscription_id,
            filename: fileName,
          })
        );
      }
      if (this.arrayFilesEndorsement.length >= 25) {
        this.limit = true;
      } else {
        this.limit = false;
      }
      this.setLoading();
    },
    // Muestra el loader
    setLoadingNatcat({ id, status }) {
      this.arrayFilesNatcat = this.arrayFilesNatcat.map((obj) => {
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
    // Elimina un documento por su id
    async deleteNatcatDocument({ id }) {
      this.setLoading();
      this.arrayFilesNatcat = this.arrayFilesNatcat.filter((e) => {
        return e.id !== id;
      });
      const res = await this.deleteEndorsement(id).finally(async () => {
        if (this.subscription_id) {
          const ind = this.arrayFilesEndorsement.map((e) => e.id).indexOf(id);
          this.arrayFilesEndorsement.splice(ind, 1);
        }
        if (this.arrayFilesEndorsement.length >= 25) {
          this.limit = true;
        } else {
          this.limit = false;
        }
      });
      this.setLoading();
      // this.setLoadiarrayFilesNatcatng();
    },
  },
};
</script>
<style lang="less" scoped>
.InputsContentFh {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 15px;

  .InputFileContent {
    width: 18%;
    height: 180px;
    border-radius: 5px;
    position: relative;
    margin-right: 2%;
    background: #d2deed;

    //LABEL DE LOS INPUTS
    .InputFileLabel {
      width: 100%;
      height: 100%;
      z-index: 0;
      position: absolute;
      border-radius: 5px;
      overflow: hidden;
      left: 0;
      top: 0;
      text-align: center;
      font-weight: bold;
      // cursor: pointer;
      align-content: flex-start !important;
      align-items: flex-start !important;

      //NOMBRE DEL ARCHIVO
      .NameFileCont {
        width: 100%;
        height: 100%;

        .FileName {
          width: 100%;
          height: 40px;
          background: #edf2f8;
          text-align: center;
          word-break: break-all;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .FileImage {
          width: 100%;
          height: calc(100% - 40px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 45px;
          padding-top: 10px;

          .image {
            height: 100%;
          }
        }
      }

      //OCULTAR EL INPUT
      .HideInputFile {
        display: none;
      }
      //CUANDO NO HAY DOCUMENTOS SELECCIONADOS
      .emptyFileInfo {
        width: 100%;
        height: 100%;

        p {
          font-weight: normal;
          width: 95%;
          text-align: center;
          font-size: 15px;
          margin-bottom: 7px;
        }
        //BORRAR
        .buttonFileOutlined {
          display: none;
          width: 65%;
          height: 40px;
          border: solid 1px grey;
          border-radius: 40px;
          font-weight: normal;
        }
      }
    }

    //BOTON PARA BORRAR ARCHIVOS
    .InputDeletContBtn {
      width: 35px;
      height: 35px;
      position: absolute;
      bottom: 7px;
      right: 5px;
      z-index: 1000;
      cursor: pointer;
      background: white;
      border-radius: 35px;
      i {
        font-size: 19px;
        color: #0069ba;
      }
    }

    //BOTON PARA DESCARGAR ARCHIVOS
    .DownloadCont {
      width: 35px;
      height: 35px;
      position: absolute;
      bottom: 7px;
      right: 45px;
      z-index: 1000;
      cursor: pointer;
      background: white;
      border-radius: 35px;
      i {
        font-size: 19px;
        color: #0069ba;
      }
    }
  }
  .InputFileContentUpload {
    width: 18%;
    height: 180px;
    border-radius: 5px;
    border: 2px dashed #ff4f56;
    position: relative;
    margin-right: 2%;
    background: #ffffff;

    //LABEL DE LOS INPUTS
    .InputFileLabel {
      width: 100%;
      height: 100%;
      z-index: 0;
      position: absolute;
      border-radius: 5px;
      overflow: hidden;
      left: 0;
      top: 0;
      text-align: center;
      font-weight: bold;
      // cursor: pointer;
      align-content: flex-start !important;
      align-items: flex-start !important;

      //NOMBRE DEL ARCHIVO
      .NameFileCont {
        width: 100%;
        height: 100%;

        .FileName {
          width: 100%;
          height: 40px;
          background: #ffffff;
          text-align: center;
          word-break: break-all;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .FileImage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 10px;
          .FileImageText {
            color: #ff4f56;
            font-weight: 600;
          }
          .FileImageSpan {
            color: #ff4f56;
            font-weight: 600;
          }
          .image {
            height: 100%;
          }
          .buttonFileUpload {
            margin-top: 10px;
            border: 1px solid #ff4f56;
            border-radius: 5px;
            padding: 5px 15px;
            color: #ff4f56;
            font-weight: 800;
            pointer-events: none;
          }
        }
      }

      //OCULTAR EL INPUT
      .HideInputFile {
        display: none;
      }
      //CUANDO NO HAY DOCUMENTOS SELECCIONADOS
      .emptyFileInfo {
        width: 100%;
        height: 100%;

        p {
          font-weight: normal;
          width: 95%;
          text-align: center;
          font-size: 15px;
          margin-bottom: 7px;
        }
        //BORRAR
        .buttonFileOutlined {
          display: none;
          width: 65%;
          height: 40px;
          border: solid 1px grey;
          border-radius: 40px;
          font-weight: normal;
        }
      }
    }

    //BOTON PARA BORRAR ARCHIVOS
    .InputDeletContBtn {
      width: 35px;
      height: 35px;
      position: absolute;
      bottom: 7px;
      right: 5px;
      z-index: 1000;
      cursor: pointer;
      background: white;
      border-radius: 35px;
      i {
        font-size: 19px;
        color: #0069ba;
      }
    }

    //BOTON PARA DESCARGAR ARCHIVOS
    .DownloadCont {
      width: 35px;
      height: 35px;
      position: absolute;
      bottom: 7px;
      right: 45px;
      z-index: 1000;
      cursor: pointer;
      background: white;
      border-radius: 35px;
      i {
        font-size: 19px;
        color: #0069ba;
      }
    }
  }
}
.InputsContentRow {
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.textarea-stopped-container {
  width: 100%;
  max-height: 160px;
  overflow-x: auto;
}
.textarea-stopped-container-readonly {
  width: 100%;
  max-height: 160px;
  overflow: hidden;
}
.textarea-stopped {
  width: 1000px;
  background-color: #edf2f8;
  border-radius: 10px;
  padding: 10px;
}
.endorsement-title {
  font-weight: 800;
  font-size: 20px;
}
.endorsement-wrapper {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background: white;
  //box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0 20px;
  @media (max-width: 650px) {
    overflow-x: auto !important;
  }
  .content {
    width: 100%;
    height: auto;
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
  .v-btn {
    justify-content: flex-start !important;
    color: #003d6d;
    border-radius: 5px;
  }
}
.table-container {
  margin-top: 30px;
  .title-col {
    width: 10%;
  }
}
.table-col {
  width: 40%;
  .inner-col {
    width: 100%;
  }
}
.table-col-subtitle {
  width: 20%;
  .inner-col {
    width: 100%;
  }
}
.table-title {
  height: 50px;
  color: white;
  font-weight: 800;
  background-color: #547fa9;
  border-radius: 0px;
  margin: 2px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-title-without-bg {
  height: 50px;
  color: rgb(0, 0, 0);
  font-weight: 800;
  border-radius: 6px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.table-title-space {
  height: 50px;
}

.stepper-btn {
  width: 100%;
  height: 40px;
  .blue-btn {
    color: white;
    width: 200px;
    height: 35px;
    background: #003d6d;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: capitalize;
  }
  .clear-btn {
    width: 200px;
    height: 35px;
  }
}

.col-subtitle {
  min-height: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
}
.table-input {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.table-input-heigth {
  height: 50px;
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.blue-input {
  background-color: #dce5fc;
}
.input-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
}
.input-row-center {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.input-col {
  width: 20%;
  display: block;
  margin-right: 30px;
}
.input-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 5px 0;
}
.input-title {
  width: 100%;
}
.inner-title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0;
}
.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.v-stepper__step__step {
  display: none !important;
}

.v-stepper__label {
  color: #547fa9;
  font-weight: 800;
}

.v-application .primary {
  background-color: #586675 !important;
  border-color: #1c2b39 !important;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
  background: rgb(186, 34, 34);
}

.v-stepper__header {
  justify-content: center;
  box-shadow: none;
}

.v-stepper__items {
  width: 100%;
}
.theme--light.v-stepper {
  background: #ffe9e900;
}
.error-message {
  font-size: 12px;
  color: red;
  max-width: 200px;
  transform: translateY(-14px);
}

/*-----*/
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #9e9d9d;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #97b2f9;
  border-radius: 10px;
}

.button {
  width: 32.5%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
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
