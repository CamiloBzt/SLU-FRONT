<template>
  <v-expansion-panels
    v-model="activePanel"
    class="ExpansionComponent ExpansionBordered mt-6"
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="ExpansionTitle">
        Downloadable Documents
        <template v-slot:actions>
          <v-icon class="iconExpand">mdi-chevron-down</v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="ExpandContent">
          <div class="InputsContentFh">
            <div
              class="InputFileContent mb-4"
              v-for="file in files"
              :key="file.id"
            >
              <!-- Visual input style, disabled -->
              <label class="InputFileLabel d-flex align-center justify-center">
                <input class="HideInputFile" type="file" disabled />
                <div class="NameFileCont">
                  <div class="FileName">{{ file.name }}</div>
                  <div class="FileImage">
                    <img class="image" src="@/assets/img/document.png" />
                  </div>
                </div>
              </label>

              <!-- Download button -->
              <div
                class="DownloadCont d-flex justify-center align-center"
                @click="download(file)"
              >
                <v-icon>mdi-download</v-icon>
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "DownloadFileCards",
  data() {
    return {
      activePanel: 1,
      files: [
        { id: 1, name: "Terms and Conditions", url: "/documents/terms.pdf" },
        { id: 2, name: "Privacy Policy", url: "/documents/privacy.pdf" },
        { id: 3, name: "User Guide", url: "/documents/guide.pdf" },
      ],
    };
  },
  methods: {
    download(file) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/AccordionStyle.less";
@import "~@/assets/style/FilesStyle.less";

.ExpansionComponent {
  z-index: 0;
}

.InputFileContent {
  width: 100% !important;
}
</style>
