<template>
  <div class="app-file">
    <!-- Muestra el archivo -->
    <div v-if="loaded" class="file">
      <!-- Header / Nombre del archivo -->
      <div @click="downloadFile" class="file__header" v-tooltip="'Open'">
        {{ fileName }}
      </div>

      <!-- Body / Icono del archivo -->
      <div class="file__body flex justify-content-center align-items-center">
        <img class="file-icon" src="@/assets/file-icon.svg" />
      </div>

      <!-- Actions / Botones del archivo -->
      <div class="file__actions flex justify-content-end align-items-center">
        <div icon depressed class="button flex justify-content-center align-items-center" @click="downloadFile"
          target="_blank" :href="fileDownloadLink">
          <v-icon> mdi-download </v-icon>
        </div>
      </div>
    </div>

    <!-- Muestra la opción para cargar archivos -->
    <div v-if="!loaded && !error && !loading" class="load-files">
      <label class="load-files__label">
        <p class="file-type-message" v-html="fileTypeMessage" />
        <input @change="clickFile($event)" type="file" class="input-file" :disabled="disabled" />
      </label>
    </div>

    <!-- Muestra errores -->
    <div v-if="error" class="error-files">
      <label class="error-files__label">
        <p class="file-type-message">
          {{ errorMessage }}
        </p>
        <input @change="clickFile($event)" type="file" class="input-file" :disabled="disabled" />
      </label>
    </div>

    <!-- Muestra el loader -->
    <div v-if="loading" class="loading">
      <v-progress-circular :size="50" color="#0069BA" indeterminate></v-progress-circular>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppFile",
  components: {},
  data() {
    return {};
  },
  props: {
    fileId: Number,
    fileName: String,
    loaded: Boolean,
    fileDownloadLink: String,
    error: Boolean,
    errorMessage: String,
    loading: Boolean,
    fileType: String,
    fileTypeMessage: String,
    blockLink: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},

  async beforeMount() { },

  async mounted() { },
  methods: {

    removeFileById() {
      this.$emit("removeFileById", {
        fileId: this.fileId,
      });
    },

    addFile(file) {
      const fileName = file.name;
      const fileSize = file.size;

      // Valida el tamaño del archivo
      if (fileSize < 30000000) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          // Notifica que se termino de cargar el archivo
          this.$emit("loading", {
            id: fileId,
            loaded: false,
            error: false,
            errorMessage: "",
            loading: false,
          });
          // Envía la información del archivo
          this.$emit("loadFile", {
            id: this.fileId,
            fileName,
            fileType: this.fileType,
            file,
            loaded: true,
            error: false,
            errorMessage: "",
          });
        };
        // Notifica que se esta cargando el archivo
        this.$emit("loading", {
          id: this.fileId,
          loaded: false,
          error: false,
          errorMessage: "",
          loading: true,
        });
      } else {
        this.$emit("errors", {
          id: fileId,
          loaded: false,
          error: true,
          errorMessage: "Document size must be less than 30 MB",
        });
      }
    },

    clickFile(event) {
      const input = event.target;
      if (!input.files?.length) {
        return;
      }
      const file = input.files[0]
      console.log('addfileconsole')
      this.addFile(file)
    },

    downloadFile() {
      window.open(this.fileDownloadLink);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.app-file {
  width: 24%;
  max-width: 200px;
  height: 200px;
  padding-bottom: 20px;

  @media (max-width: 900px) {
    width: 30%;
  }

  @media (max-width: 650px) {
    width: 100%;
  }

  // Variación para archivos cargados
  .file {
    width: 100%;
    height: 100%;
    box-shadow: 0px 2px 8px rgba(28, 81, 115, 0.15);
    border-radius: 8px;
    position: relative;

    // Header
    &__header {
      width: 100% !important;
      height: 25%;
      background: #e6ebf5;
      font-size: 16px;
      font-weight: 800;
      color: black;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 10px 5px;
      cursor: pointer;
    }

    // Body
    &__body {
      width: 100%;
      height: 75%;
      background: #D2DEED;
      border-radius: 0 0 8px 8px;

      img {
        margin: auto;
        display: flex;
        padding-top: 12px;
      }
    }

    // Actions
    &__actions {
      width: 40px;
      height: 40px;
      position: absolute;
      bottom: 10px;
      right: 10px;

      .button {
        width: 40px;
        height: 100%;
        box-shadow: 0px 2px 8px rgba(28, 81, 115, 0.15);
        background: white;
        border-radius: 50% !important;
        cursor: pointer;
        display: flex;
        justify-content: center;

        img {
          width: 25px;
        }
      }
    }
  }

  // Variación para cargar archivos
  .load-files {
    width: 100%;
    height: 100%;
    box-shadow: 0px 2px 8px rgba(28, 81, 115, 0.15);
    border-radius: 8px !important;
    position: relative;
    overflow: hidden;

    &__label {
      width: 100% !important;
      height: 100% !important;
      display: inline-block;
      cursor: pointer;
      background: #f6f6f6; //$info-color
      display: flex;
      justify-content: center;
      align-items: center;

      .file-type-message {
        text-align: center;
        padding: 0 10px;
      }

      .input-file {
        display: none;
      }
    }
  }

  // Variación para los errores de los archivos
  .error-files {
    width: 100%;
    height: 100%;
    border: dashed 2px red;
    border-radius: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 15px;
    text-align: center;
    background: #f5f5f5;

    &__label {
      width: 100% !important;
      height: 100% !important;
      display: inline-block;
      cursor: pointer;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;

      .fileTypeMessage {
        text-align: center;
        padding: 0 10px;
        color: red;
      }

      .input-file {
        display: none;
      }
    }
  }

  // Loading
  .loading {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }
}
</style>
