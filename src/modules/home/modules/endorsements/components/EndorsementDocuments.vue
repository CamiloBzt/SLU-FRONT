<template>
    <div class="endorsement-documents">
        <h2 class="endorsement-title">Documents</h2>
        <div class="drop-zone" @dragover.prevent @drop.prevent="dropFile($event)">
            <div class="documents-list">
                <div v-for="(file, index) in files" :key="index" class="InputFileContent">
                    <label class="InputFileLabel">
                        <div class="NameFileCont">
                            <div class="FileName">{{ file.name ? file.name : 'No name' }}</div>
                            <div class="FileImage">
                                <img class="image" src="@/assets/img/document.png" />
                            </div>
                        </div>
                    </label>
                    <div @click="removeFile(index, file)" class="InputDeletContBtn">
                        <v-icon> mdi-trash-can-outline </v-icon>
                    </div>
                    <!-- <div v-if="file.id" class="DownloadCont" @click="download(item)">
                        <v-icon> mdi-download </v-icon>
                    </div> -->
                </div>
                <div class="InputsContentFh">
                <div  class="InputFileContentUpload">
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
                    <img
                      class="image"
                      src="@/assets/img/icons/hexagonalwarning.svg"
                    />
                    <button class="buttonFileUpload">Upload</button>
                  </div>
                </div>
              </label>
                </div>
                 </div>
            </div>
            
            <div class="button">
                <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileSelect">
          <button 
          class="button"
           @click="$refs.fileInput.click()">
            <v-icon> mdi-plus-circle </v-icon>
            Add New Document
          </button>
        </div>
        </div>
    </div>
</template>


<script>
import EndorsementServices from "../services/endorsement.service"
export default {
    data() {
        return {
            dragging: false,
            files: []
        };
    },
    props: {
        idEndorsement: { type: Number, default: 0 },
        endorsementDocuments: { type: Array, default: () => [] },
        reloadFiles : { type: Function }
    },
    methods: {
        async addFiles(files) {
            if (this.idEndorsement) {
                const newDocuments = await EndorsementServices.updateDocumentsEndorsement({
                    id: this.idEndorsement,
                    files,
                })
                this.files.push(...newDocuments)
            } else {
                this.files.push(...files)
            }
            this.$emit("setEndorsementDocuments", { files: this.files })
            this.reloadFiles()
        },
        removeFile(index, file) {
            this.files.splice(index, 1)
            if (this.idEndorsement) {
                EndorsementServices.updateDocumentEndorsementById(file.id)
            }
            this.$emit("setEndorsementDocuments", { files: this.files })
            this.reloadFiles()
        },
        async handleFileSelect(event) {
            const files = Array.from(event.target.files)
            await this.addFiles(files);
        },
        dropFile(event) {
            const files = Array.from(event.dataTransfer.files)
            this.addFiles(files)
            this.dragging = false
            this.reloadFiles()
        },

    },
    mounted() {
        if(this.endorsementDocuments.length > 0){
            this.files = this.endorsementDocuments
        }
    }
};
</script>

<style scoped lang="less">
.endorsement-documents {
    width: 100%;
    height: auto;
    border-radius: 15px;
    background: white;
    box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
    margin-top: 28px;
    padding: 0 20px;
}

.endorsement-title {
    font-weight: 800;
    font-size: 20px;
}

.drop-zone {
    // border: 2px dashed #ccc;
    padding: 10px;
    text-align: center;
}

.drop-zone input[type="file"] {
    display: none;
}

.drop-zone .button{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: 800;
  background-color: white;
  outline:none;
  border: none;
  box-shadow:none !important;
  margin-top: 10px;
  color: #003d6d;
  i{
    color: #003d6d;
    margin-right: 30px;
  }
  &hover{
    background-color:white
  }
  &__btn{
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background: transparent;
    justify-content: space-around;
    color: #003D6D;
    letter-spacing: normal;
    i{
      font-size:24px;
    }
    button{
      font-size:24px;
    }
  }
}

.documents-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
}

.InputFileContent {
    width: 19%;
    min-height: 180px;
    border-radius: 15px;
    position: relative;
    background: #d2deed;
}

.InputFileLabel {
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
    border-radius: 15px;
    overflow: hidden;
    left: 0;
    top: 0;
    text-align: center;
    font-weight: bold;
    align-content: flex-start !important;
    align-items: flex-start !important;

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
            font-size: 18px;
            font-weight: 800;
        }

        .FileImage {
            width: 100%;
            height: calc(100% - 40px);
            display: flex;
            justify-content: center;
            align-items: center;
            // padding-bottom: 45px;
            padding-top: 10px;

            .image {
                height: 100%;
            }
        }
    }
}

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
.InputsContentFh {
    width: 19%;
    min-height: 180px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;

  .InputFileContent {
    width: 18%;
    height: 180px;
    border-radius: 15px;
    position: relative;
    margin-right: 2%;
    background: #d2deed;

    //LABEL DE LOS INPUTS
    .InputFileLabel {
      width: 100%;
      height: 100%;
      z-index: 0;
      position: absolute;
      border-radius: 15px;
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
    width: 100%;
    height: 180px;
    border-radius: 15px;
    border: 2px dashed #ff4f56;
    position: relative;
    margin-right: 2%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    //LABEL DE LOS INPUTS
    .InputFileLabel {
      width: 100%;
      height: 100%;
      z-index: 0;
      position: absolute;
      border-radius: 15px;
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
        display: flex;
        align-items: center;
        justify-content: center;
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
          padding: 10px;
          .FileImageText {
            color: #ff4f56;
            font-weight: 600;
            font-size: 18px;
          }
          .FileImageSpan {
            color: #ff4f56;
            font-weight: 700;
            font-size: 18px;
          }
          .image {
            margin-top: 5px;
            height: 30px;
          }
          .buttonFileUpload {
            width: 80%;
            margin-top: 30px;
            border: 1px solid #ff4f56;
            border-radius: 24px;
            padding: 5px 15px;
            color: #ff4f56;
            font-weight: 800;
            pointer-events: none;
            background-color: #fff !important;
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
  border-radius: 15px;
  background: white;
  box-shadow: 8px 8px 12px rgba(10, 63, 102, 0.15);
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
  border-radius: 6px;
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

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(
    .v-stepper__step--complete
  ):not(.v-stepper__step--error)
  .v-stepper__step__step {
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
</style>