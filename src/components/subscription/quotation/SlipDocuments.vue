<template>
  <v-expansion-panels class="ExpansionComponent ExpansionBordered mt-6">
    <v-expansion-panel>
      <!--TITULO DEL ACORDEON-->
      <v-expansion-panel-header
        @click="changeStateExpansive()"
        class="ExpansionTitle"
        expand-icon=""
      >
        Slip Documents
        <div class="ExpansionState HideOnMovil">
          {{ stateExpansiveMessage }}
        </div>
        <template v-slot:actions>
          <v-icon class="iconExpand">
            {{iconExpansive}}
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <!--CUERPO-->
      <v-expansion-panel-content>
        <div class="ExpandContent">
          <!--INPUTS DE ARCHIVOS-->
          <div class="InputsContentFh">
            <div class="InputFileContent">
              <!--LABEL-->
              <label class="InputFileLabel d-flex align-center justify-center">
                <input
                  @change="loadImage($event, 'input1')"
                  class="HideInputFile"
                  type="file"
                />

                <div
                  v-if="fileName1 == ''"
                  class="
                    emptyFileInfo
                    d-flex
                    justify-center
                    align-center
                    flex-column
                  "
                >
                  <p>Upload the <b>Slip 1</b> document</p>
                  <div
                    class="
                      buttonFileOutlined
                      d-flex
                      justify-center
                      align-center
                    "
                  >
                    Upload
                  </div>
                </div>
                <div v-else class="NameFileCont">
                  {{ fileName1 }}
                </div>
              </label>

              <!--BORRAR-->
              <div
                @click="DeleteFile('delete1')"
                class="InputDeletContBtn d-flex justify-center align-center"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
              </div>
            </div>

            <div class="InputFileContent">
              <!--LABEL-->
              <label class="InputFileLabel d-flex align-center justify-center">
                <input
                  @change="loadImage($event, 'input2')"
                  class="HideInputFile"
                  type="file"
                />

                <div
                  v-if="fileName2 == ''"
                  class="
                    emptyFileInfo
                    d-flex
                    justify-center
                    align-center
                    flex-column
                  "
                >
                  <p>Upload the <b>Slip 2</b> document</p>
                  <div
                    class="
                      buttonFileOutlined
                      d-flex
                      justify-center
                      align-center
                    "
                  >
                    Upload
                  </div>
                </div>
                <div v-else class="NameFileCont">
                  {{ fileName2 }}
                </div>
              </label>

              <!--BORRAR-->
              <div
                @click="DeleteFile('delete2')"
                class="InputDeletContBtn d-flex justify-center align-center"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
              </div>
            </div>

            <div class="emptyFileContent d-flex justify-start align-center">
              <v-btn text rounded class="moreButton">
                <v-icon class="mr-2">mdi-plus</v-icon>
                Add document
              </v-btn>
            </div>
            <div class="emptyFileContent HideOnMovil"></div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
//MIXINS
import { stateExpansiveManager } from "@/mixins/subscription.js";
export default {
  name: "SlipDocuments",
  mixins: [stateExpansiveManager],
  data() {
    return {
      //VARIABLES DE LOS ARCHIVOS
      fileName1: "",
      technicalMemory: null,

      fileName2: "",
      soilStudy: null,
    };
  },
};
</script>
<style lang="less" scoped>
//CONTENEDOR DE QUOTATION
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/FilesStyle.less";
</style>
