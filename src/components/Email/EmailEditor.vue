<template>
  <div
    :class="{ 'drag-border': dragBorder }"
    @dragenter.prevent="dragIn()"
    @dragover.prevent="dragIn()"
    @dragleave.prevent="dragDrop()"
    @drop.prevent="dragDrop($event)"
  >
    <div class="EditorCont">
      <editor-content :editor="editor" />

      <div v-html="userSignature"></div>

      <div class="slu-logo" ref="sluLogoDiv">
        <img src="@/assets/logo-slu.png" />
      </div>
    </div>
    <div class="ExpansionLineTop mt-2"></div>

    <!--BOTONES-->
    <div class="ButtonsContainer d-flex justify-center align-start">
      <label class="FileButton activeBtn colorBtn">
        <div>
          <v-icon>mdi-paperclip</v-icon>
        </div>
        <input
          ref="filesInput"
          @change="getFilesUpload($event)"
          multiple
          type="file"
          name=""
        />
      </label>

      <div class="ButtonsGroup d-flex justify-start align-center">
        <v-btn icon large class="Btn">
          <v-icon>mdi-format-text</v-icon>
        </v-btn>

        <v-btn
          icon
          large
          class="Btn"
          :class="{ activeBtn: bold }"
          @click="activeEditor('bold')"
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn
          icon
          large
          class="Btn"
          :class="{ activeBtn: italic }"
          @click="activeEditor('italic')"
        >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
          icon
          large
          class="Btn"
          :class="{ activeBtn: underline }"
          @click="activeEditor('underline')"
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <div class="lineSeparator"></div>

        <v-btn
          icon
          large
          class="Btn"
          :class="{ activeBtn: alignCenter }"
          @click="activeEditor('alignCenter')"
        >
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          class="Btn"
          :class="{ activeBtn: alignJusty }"
          @click="activeEditor('alignJusty')"
        >
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          class="Btn"
          :class="{ activeBtn: alignLeft }"
          @click="activeEditor('alignLeft')"
        >
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>
        <v-btn
          class="colorBtn"
          icon
          large
          :class="{ activeBtn: alignRight }"
          @click="activeEditor('alignRight')"
        >
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>
      </div>

      <v-btn
        v-if="currentRouteName == 'Quotation non proportional'"
        large
        icon
        class="floatButton colorBtn activeBtn"
        @click="save()"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </div>

    <!--Archivos-->
    <div class="filesUpload d-flex">
      <v-chip
        class="chip"
        v-for="(item, key, index) in filesUpload"
        :key="key"
        close
        large
        close-icon="mdi-delete"
        label
        :disabled="item.disabled"
        @click:close="DeleteFile(index)"
      >
        {{ item.name }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { getCurrentPathName } from "@/mixins/subscription.js";

export default {
  name: "emailEditor",
  components: {
    EditorContent,
  },
  mixins: [getCurrentPathName],
  data() {
    return {
      bold: false,
      italic: false,
      underline: false,
      alignRight: false,
      alignLeft: false,
      alignJusty: false,
      alignCenter: false,
      editor: null,

      /* almacenamiento de archivos */
      filesUpload: [],
      attachmentFiles: [],
      /*
      IMPORTANTE!
      La variables value es la que guarda todo el html que se creagenera para enviar el correo electronico
      */

      // Drag & Drop
      dragBorder: false,
    };
  },
  props: {
    htmlEmail: {
      type: String,
    },
    userSignature: {
      type: String,
      default: "",
    },
    sendMail: {
      type: Object,
    },
    fileUpload: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["subscription_id"]),
    currentFiles: {
      get() {
        return this.filesUpload.length;
      },
    },
  },
  mounted() {
    this.createEditor();
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    ...mapActions(["setEmailTemplate", "attachFile", "deleteAttached"]),
    createEditor() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          Underline,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
        ],
        content: this.htmlEmail,

        // GUARDAR EL HTML DEL CORREO
        onUpdate: () => {
          this.setEmailTemplate({
            description: `${this.editor.getHTML()} ${this.userSignature}`,
          });
        },
      });

      this.setEmailTemplate({
        description: `${this.editor.getHTML()} ${this.userSignature}`,
      });
    },
    activeEditor(typeEvent) {
      switch (typeEvent) {
        case "bold":
          this.bold = !this.bold;
          this.editor.chain().focus().toggleBold().run();
          break;

        case "italic":
          this.italic = !this.italic;
          this.editor.chain().focus().toggleItalic().run();
          break;

        case "underline":
          this.underline = !this.underline;
          this.editor.chain().focus().toggleUnderline().run();
          break;

        case "alignCenter":
          this.alignCenter = !this.alignCenter;
          this.alignJusty = false;
          this.alignRight = false;
          this.alignLeft = false;
          this.editor.chain().focus().setTextAlign("center").run();
          break;

        case "alignJusty":
          this.alignJusty = !this.alignJusty;
          this.alignRight = false;
          this.alignLeft = false;
          this.alignCenter = false;
          this.editor.chain().focus().setTextAlign("justify").run();
          break;

        case "alignRight":
          this.alignRight = !this.alignRight;
          this.alignLeft = false;
          this.alignJusty = false;
          this.alignCenter = false;
          this.editor.chain().focus().setTextAlign("right").run();
          break;

        case "alignLeft":
          this.alignLeft = !this.alignLeft;
          this.alignRight = false;
          this.alignJusty = false;
          this.alignCenter = false;
          this.editor.chain().focus().setTextAlign("left").run();
          break;
      }
    },
    getFilesUpload(event) {
      /*Obtener archivos subidos*/
      const fileData = event.target.files
        ? event.target.files
        : event.dataTransfer.files;

      this.attachmentFiles = [...fileData];
      this.$emit("attachmentFiles", this.attachmentFiles);

      Array.from(fileData).forEach((file) => {
        const fileName = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
          const blobImage = new Blob([e.target.result]);
          const imageUrl = window.URL.createObjectURL(blobImage);

          const filesData = {
            name: fileName,
            url: imageUrl,
            disabled: true,
          };

          this.filesUpload.push(filesData);

          this.saveFiles(file, this.currentFiles - 1);
        };
        reader.readAsDataURL(file);
      });
    },
    async saveFiles(file, index) {
      try {
        const datos = file.name.split(".", 2);
        const filename = `${new Date().getTime().toString()}.${
          datos[datos.length - 1]
        }`;
        const responseFile = await this.attachFile({
          file,
          path: `SUB_${this.subscription_id}/attachedFiles/${filename}`,
          name: filename,
        });

        if (responseFile.error) {
          this.filesUpload[index].uri = responseFile.uri;
          this.DeleteFile(index);
          return;
        }

        this.filesUpload[index].currentName = responseFile.name;
        this.filesUpload[index].disabled = false;
      } catch (e) {
        console.error(e);
      }
    },
    DeleteFile(index) {
      try {
        this.filesUpload.splice(index, 1);

        this.attachmentFiles.splice(index, 1);
        this.$emit("attachmentFiles", this.attachmentFiles);
      } catch (e) {
        console.error("Could not be deleted");
      }
    },
    save() {
      /* save button */
    },

    dragIn() {
      this.dragBorder = true;
    },
    dragDrop(e) {
      this.dragBorder = false;

      if (e) {
        this.getFilesUpload(e);
        this.cleanDragData(e);
      }
    },
    cleanDragData(e) {
      if (e.dataTransfer.items) e.dataTransfer.items.clear();
      else e.dataTransfer.clearData();
    },
  },
  watch: {
    //actualizar el contenido del html del editor
    htmlEmail: function (value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },
};
</script>

<style lang="less">
.ExpansionLineTop {
  background: #547fa9 !important;
}
.ButtonsContainer {
  width: 100%;
  height: 70px;
  margin-top: 5px;
  position: relative;
  overflow-y: auto;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;

  .FileButton {
    width: 47px;
    height: 47px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    cursor: pointer;
    input {
      display: none;
    }
    i {
      color: #003d6d;
    }
  }
  //GRUPO DE BOTONES
  .ButtonsGroup {
    width: auto;
    height: 70%;
    border-radius: 45px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    box-shadow: 4px 4px 6px rgba(10, 63, 102, 0.08);

    //LINEA DIVISORIA
    .lineSeparator {
      width: 0.1px;
      height: 70%;
      border: solid 1px grey;
      margin-left: 10px;
      margin-right: 10px;
    }

    .Btn {
      margin-right: 5px;
    }
    .Btn {
      color: #003d6d !important;
    }
  }
  .floatButton {
    position: absolute;
    right: 0;
    @media (max-width: 650px) {
      position: inherit;
      margin-left: 15px;
    }
  }

  i {
    font-size: 23px !important;
  }
}
.filesUpload {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;

  .chip {
    margin-right: 12px;
    margin-bottom: 7px;
  }
}
.colorBtn {
  color: #003d6d !important;
}
//BOTON ACTIVADO
.activeBtn {
  background: #d2deed !important;
}
//EDITOR STYLE
.EditorCont {
  min-height: 90px;
  .ProseMirror {
    outline: none !important;
    min-height: 90px;
  }

  @media (max-width: 650px) {
    min-height: 120px;
    .ProseMirror {
      min-height: 120px;
    }
  }

  @media screen and (min-width: 1280px) {
    min-height: 200px;
    .ProseMirror {
      min-height: 200px;
    }
  }

  @media screen and (min-width: 1920px) {
    min-height: 300px;
    .ProseMirror {
      min-height: 300px;
    }
  }
  @media screen and (min-width: 3840px) {
    .container {
      width: 3810px;
    }
  }
}

.drag-border {
  border: solid 1px var(--lightColor2);
}

.slu-logo {
  width: 100%;
  height: 100px;

  img {
    height: 100%;
  }
}
</style>
