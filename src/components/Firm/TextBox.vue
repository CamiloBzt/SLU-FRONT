<template>
  <!--COMPONENTE PARA FIRMAR-->
  <div class="FirmContent">
    <!--EDITOR DE TEXTO-->
    <div class="FirmTextBox">
      <editor-content :editor="editor" />
    </div>
    <!--IMAGEN-->
    <div class="ImageCont">
      <img src="@/assets/logo-slu.png" />
    </div>
    <!--ACCIONES-->
    <div class="ActionsFirm px-2">
      <v-btn icon large class="Btn">
        <v-icon> mdi-format-text </v-icon>
      </v-btn>

      <v-btn icon large class="Btn" :class="{ activeBtn: bold }" @click="activeEditor('bold')">
        <v-icon> mdi-format-bold </v-icon>
      </v-btn>

      <v-btn icon large class="Btn" :class="{ activeBtn: italic }" @click="activeEditor('italic')">
        <v-icon> mdi-format-italic </v-icon>
      </v-btn>

      <v-btn icon large class="Btn" :class="{ activeBtn: underline }" @click="activeEditor('underline')">
        <v-icon> mdi-format-underline </v-icon>
      </v-btn>

      <div class="lineSeparator" />

      <v-btn icon large class="Btn" :class="{ activeBtn: alignCenter }" @click="activeEditor('alignCenter')">
        <v-icon> mdi-format-align-center </v-icon>
      </v-btn>

      <v-btn icon large class="Btn" :class="{ activeBtn: alignJusty }" @click="activeEditor('alignJusty')">
        <v-icon> mdi-format-align-justify </v-icon>
      </v-btn>

      <v-btn icon large class="Btn" :class="{ activeBtn: alignLeft }" @click="activeEditor('alignLeft')">
        <v-icon> mdi-format-align-left </v-icon>
      </v-btn>

      <v-btn class="Btn" icon large :class="{ activeBtn: alignRight }" @click="activeEditor('alignRight')">
        <v-icon> mdi-format-align-right </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
/*
	tip tap y librerias para el editor de firma
*/
import { textActions } from '@/mixins/richEditor.js';
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
export default {
  name: 'FirmComponent',
  components: {
    EditorContent,
  },
  mixins: [textActions],
  props: {
    textFirm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      //firmData guarda el contindo de la firma
      firmData: null,
    };
  },
  watch: {
    /*
		Observa cuando cambia el valor
		del contenido de la firma
  	*/
    // textFirm: function (val){
    // 	this.editor.commands.clearContent()
    // 	this.editor.commands
    // 	.insertContent(val)
    // }
    textFirm(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) return;

      this.editor.commands.setContent(value, false);
    },
  },
  mounted() {
    var vm = this;
    this.editor = new Editor({
      extensions: [
        Document,
        StarterKit,
        Underline,
        Text,
        TextStyle,
        Color,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: this.firmData,
      // GUARDAR EL HTML DE LA FIRMA
      /*
				El metodo this.editor.getHTML()
				obtiene el html generado y lo 
				guarda en la variable content
      */
      onUpdate: () => {
        this.$emit('setFirm', this.editor.getHTML());
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style lang="less" scoped>
.FirmContent {
  width: 100%;
  height: 320px;
  border-radius: 10px;
  border: solid 1px var(--lightColor2);
  overflow: hidden;

  //CAJA DE TEXTO
  .FirmTextBox {
    width: 100%;
    height: 175px;
    overflow: auto;
    padding: 17px 14px 0px 14px;
  }
  ::v-deep .ProseMirror {
    outline: none !important;
    min-height: 157px !important;
    line-height: 10px !important;
  }

  //IMAGEN

  .ImageCont {
    width: 100%;
    height: 100px;
    img {
      height: 100%;
      margin-left: 3px;
    }
  }

  //BOTONES
  .ActionsFirm {
    width: 100%;
    height: 45px;
    border-top: solid 1px var(--lightColor2);
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .Btn {
      margin-right: 5px;
      width: 30px;
      height: 30px;
      i {
        font-size: 20px;
      }
    }

    /*.activeBtn {
		  background: rgba(0,0,0,0.05) !important;
		}*/
  }
}
</style>
