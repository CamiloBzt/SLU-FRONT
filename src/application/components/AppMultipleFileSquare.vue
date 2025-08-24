<template>
  <div class="app-multiple-file">
    <div class="app-multiple-file__title">Download</div>
    <div class="app-multiple-file__files" @dragenter.prevent="" @dragover.prevent="" @dragleave.prevent="" @drop.prevent="dragDrop($event)">
      <div v-for="(file, index) in files" :key="index" class="file">
        <!-- Variación para archivos que ya fueron cargados -->
        <div v-if="file.status == 'loaded'" class="file__loaded">
          <div class="name">
            <div class="name__title">
              {{ file.fileName }}
            </div>
            <div class="name__image">
              <img src="@/assets/img/document.png" />
            </div>
          </div>
          <div class="actions">
            <v-btn target="_blank" :href="file.downloadLink" icon>
              <v-icon> mdi-download </v-icon>
            </v-btn>
            <v-btn @click="deleteFile(file.id)" icon>
              <v-icon> mdi-trash-can-outline </v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Variación para archivos que aún no se cargan -->
        <label v-if="file.status == 'uploaded'" class="file__upload">
          <div class="name">Upload the new document</div>
          <!-- <div class="actions">
            <v-btn target="_blank" :href="file.downloadLink" icon>
              <v-icon>  mdi-upload  </v-icon>
            </v-btn>
          </div> -->
          <input @change="uploadFile($event, file.id)" hidden type="file" />
        </label>

        <!-- Variación para mostrar errores -->
        <label v-if="file.status == 'error'" class="file__upload upload--error">
          <div class="name">
            {{ file.errorMessage }}
          </div>
          <!-- <div class="actions">
            <v-btn target="_blank" :href="file.downloadLink" icon>
              <v-icon>  mdi-upload  </v-icon>
            </v-btn>
          </div> -->
          <input @change="uploadFile($event, file.id)" hidden type="file" />
        </label>

        <!-- Variación para mostrar el loader -->
        <div v-if="file.status == 'loading'" class="file__loading">
          <v-progress-circular width="3" indeterminate />
        </div>
      </div>

      <div v-if="addButton" class="button">
        <v-btn @click="addNewDocument" class="button__btn" depressed>
          <v-icon> mdi-plus-circle </v-icon>
          Add New Document
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * El componente recibe por props el array files que puede llevar las siguientes propiedades
 * @param { Number } id - Identificador único del archivo
 * @param { String } fileName - Nombre del archivo que se subio (incluye su extensión)
 * @param { String } downloadLink - Link para descargar el archivo
 * @param { Boolean } status -
 ** loaded - Le indica al componente que el archivo ya fue cargado y muestra la variación con nombre y link de descarga
 ** loading - Le indica al componente que se esta subiendo un documento y muestra el loader
 ** uploaded - Le indica al componente que se termino de subir un archivo
 ** error - Le indica al componente que hay un error y muestra un mensaje de error
 * @param { String } errorMessage - Mensaje de error que se muestra
 **/
export default {
  name: "AppMultipleFile",
  props: {
    section: {
      required: true,
      type: String,
    },
    files: {
      required: true,
      default: [],
      type: Array,
    },
    addButton: {
      default: true,
    },
  },
  methods: {
    /* Sube archivos por medio de drag and drop */
    dragDrop(e) {
      const arrayFiles = Object.values(e.dataTransfer.files);
      let id = this.files.length;
      for (let i = 0; i < arrayFiles.length; i++) {
        id++;
        this.addNewDocument();
        this.uploadFile(arrayFiles[i], id, true);
      }
    },
    /* Elimina un archvivo */
    deleteFile(id) {
      this.$emit("removeFile", {
        id: id,
      });
    },

    /* Añade un nuevo input para poder añadir un nuevo archivo */
    addNewDocument() {
      this.$emit("addFile");
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
        this.$emit("setLoading", {
          id,
          status: true,
        });

        // Envía la información del archivo
        reader.onload = (e) => {
          this.$emit("fileLoaded", {
            id,
            fileName,
            file: fileList,
          });
        };
      } else {
        /* Muestra el mensaje de error */
        const errorMessage = "Document size must be less than 30 MB";
        this.$emit("errorFile", {
          id,
          errorMessage,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.app-multiple-file {
  width: 100%;
  min-height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  &__title {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border-top: solid 1px #d2deed;
    font-weight: 800;
    font-size: 20px;
  }
  &__files {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 1.2%;
    row-gap: 20px;

    .file {
      width: 180px;
      height: 160px;
      display: flex;
      position: relative;
      @media (max-width: 650px) {
        width: 100%;
      }
      // Variación para archivos que ya fueron cargados
      &__loaded {
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 10px;
        overflow: hidden;
        background: #d2deed;
        justify-content: center;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;

        .name {
          width: 100%;
          height: calc(100% - 25px);
          align-items: center;

          &__title {
            width: 100%;
            height: 40px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: 600;
            padding: 0px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          &__image {
            width: 100%;
            height: calc(100% - 40px);
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              height: 100%;
            }
          }
        }
        .actions {
          width: 100%;
          height: 45px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 5px;
          padding-right: 5px;
          position: absolute;
          bottom: 0;
          .v-btn {
            background: white;
          }
          i {
            color: #0069ba;
            font-size: 19px;
          }
        }
      }

      // Variación para archivos que aún no se han cargados
      &__upload {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        padding-left: 10px;
        padding-right: 5px;
        border-radius: 10px;
        background: #d2deed;
        .name {
          width: calc(100% - 40px);
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          @media (max-width: 650px) {
            justify-content: center;
          }
        }
        .actions {
          width: 40px;
          .v-btn {
            background: white;
          }
          i {
            color: #0069ba;
            font-size: 19px;
          }
        }
      }

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
      width: 180px;
      height: 160px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @media (max-width: 650px) {
        width: 100%;
        height: 44px;
      }
      &__btn {
        width: auto;
        height: 44px;
        border-radius: 10px;
        background: transparent;
        justify-content: space-around;
        color: #003d6d;
        letter-spacing: normal;
        i {
          font-size: 24px;
        }
        @media (max-width: 650px) {
          width: 100%;
        }
      }
    }
  }
}
</style>
