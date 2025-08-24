<template>
  <div class="InputFileContent">
    <!--LABEL-->
    <label class="InputFileLabel d-flex align-center justify-center">
      <input @change="loadImage($event)" class="HideInputFile" type="file" />
      {{ fileName }}
    </label>

    <!--BORRAR ARCHIVO-->
    <div @click="DeleteFile()" class="InputDeletContBtn d-flex justify-center align-center">
      <v-icon>mdi-trash-can-outline</v-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "FileUpload",
  data() {
    return {
      fileName: "Carga tu documento",
      imageUrl: null,
    };
  },
  methods: {
    /*
		CARGAMOS Y GUARDAMOS LAS IMAGENES
		*/
    loadImage(ev) {
      var vm = this;
      //OBTENEMOS EL NOMBRE DEL ARCHIVO
      const file = ev.target.files[0];
      const fileName = file.name;

      //OBTENEMOS EL ARCHIVO
      const reader = new FileReader();
      reader.onload = (e) => {
        var blobImage = new Blob([e.target.result]);
        var createImageUrl = window.URL.createObjectURL(blobImage);

        //GUARDAMOS LA INFORMACIÓN DEL ARCHIVO
        vm.fileName = fileName;
        vm.imageUrl = createImageUrl;
      };
      reader.readAsDataURL(file);
    },

    /*
		ESTA FUNCION ELIMINA LOS ARCHIVOS QUE YA
		FUERON CARGADOS
		*/
    DeleteFile() {
      this.fileName = "Elige tu archivo";
      this.imageUrl = null;
    },
  },
};
</script>
<style lang="less">
//CONTENEDOR D ELOS INPUTS
.InputFileContent {
  width: 22%;
  height: 170px;
  border-radius: 5px;
  border: dashed 3px grey;
  position: relative;

  //LABEL DE LOS INPUTS
  .InputFileLabel {
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    //OCULTAR EL INPUT
    .HideInputFile {
      display: none;
    }
  }

  //BOTON PARA BORRAR ARCHIVOS
  .InputDeletContBtn {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1000;
    cursor: pointer;
  }
}
</style>
