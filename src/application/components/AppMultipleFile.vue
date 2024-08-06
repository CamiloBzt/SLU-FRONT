<template>
  <div class="app-multiple-file mb-4">
    <div v-if="section != ''" class="app-multiple-file__title">
      <v-icon>
        mdi-folder-outline
      </v-icon>
      <b>{{ section }}</b> Documents
    </div>
    <div 
      class="app-multiple-file__files"
      @dragenter.prevent=""
      @dragover.prevent=""
      @dragleave.prevent=""
      @drop.prevent="dragDrop($event)"
    >
      <div 
        v-for="(file, index) in files"
        :key="index"
        class="file"
      >
        <!-- Variación para archivos que ya fueron cargados -->
        <div v-if="file.status == 'loaded'" class="file__loaded">
          <div class="name">
            {{ file.fileName }}
          </div>
          <div class="actions">
            <v-btn target="_blank" :href="file.downloadLink" icon>
              <v-icon>  mdi-download  </v-icon>
            </v-btn>
            <v-btn @click="deleteFile(file.id)" icon>
              <v-icon> mdi-trash-can-outline </v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Variación para archivos que aún no se cargan -->
        <label v-if="file.status == 'uploaded'" class="file__upload">
          <div class="name">
            Upload the new document
          </div>
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
            {{file.errorMessage}}
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

      <div class="button">
        <v-btn 
          @click="addNewDocument" 
          class="button__btn" 
          depressed
        >
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
  name: 'AppMultipleFile',
  props: {
    section: {
      required: true,
      type: String
    },
    files: {
      required: true,
      default: [],
      type: Array
    }
  },
  methods: {
    /* Sube archivos por medio de drag and drop */
    dragDrop(e) {
      const arrayFiles = Object.values(e.dataTransfer.files)
      let id = this.files.length
      for (let i = 0; i < arrayFiles.length; i++) {
        id ++
        this.addNewDocument()
        this.uploadFile(arrayFiles[i], id, true)
      }
    },
    /* Elimina un archvivo */
    deleteFile(id){
      this.$emit('removeFile', {
        id: id
      })
    },

    /* Añade un nuevo input para poder añadir un nuevo archivo */
    addNewDocument(){
      this.$emit('addFile')
    },

    /* Sube un nuevo archivo */
    uploadFile(event, id, multiple=false){
      let fileList = ''
      if(multiple){
        fileList = event 
      } else {
        fileList = event.target.files[0]
      }
      const fileName = fileList.name
      const fileSize = fileList.size
      if (fileSize < 30000000) {
        const reader = new FileReader()
        reader.readAsText(fileList)
        
        // Activa el loader
        this.$emit('setLoading',{
          id,
          status: true
        })
        
        // Envía la información del archivo
        reader.onload = (e) => {
          this.$emit('fileLoaded', {
            id,
            fileName,
            file: fileList,
          })
        }

      } else {
        /* Muestra el mensaje de error */
        const errorMessage = "Document size must be less than 30 MB"
        this.$emit('errorFile',{
          id,
          errorMessage
        })
      } 
    }
  }
}
</script>
<style lang="less" scoped>
.app-multiple-file{
  width: 100%;
  min-height: 100px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 25px;

  &__title{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:10px;
    border-top: solid 1px #D2DEED;
    i{
      color: #0069BA;
    }
  }
  &__files{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap:1.2%;
    row-gap: 20px;

    .file{
      width: 32.5%;
      height: 50px;
      display: flex;

      // Variación para archivos que ya fueron cargados
      &__loaded{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 5px;
        border-radius: 10px;
        background: #D2DEED;
        justify-content: space-between;

        .name{
          width: calc(100% - 90px);
          align-items: center;
          font-weight: bold;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .actions{
          width: 80px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .v-btn{
            background: white;
          }
          i{
            color: #0069BA;
            font-size: 19px;
          }
        }
      }

      // Variación para archivos que aún no se han cargados
      &__upload{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: 10px;
        padding-right: 5px;
        border-radius: 10px;
        background: #D2DEED;
        .name{
          width: calc(100% - 40px);
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .actions{
          width: 40px;
          .v-btn{
            background: white;
          }
          i{
            color: #0069BA;
            font-size: 19px;
          }
        }
      }

      // Variación para mostrar errores
      .upload--error{
        padding-left: 10px;
        padding-right: 5px;
        border-radius: 10px;
        border:dashed 1px red;
        background: white;
        .name{
          color: red;
        }
        i{
          color: red;
        }
      }

      // Variación para mostrar el loader
      &__loading{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #D2DEED;
        border-radius: 10px;
      }

      
    }

    .button{
      width: 32.5%;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
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
      }
    }
  }
}
</style>