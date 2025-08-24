<template>
  <div class="CreateNoteCont d-flex justify-start align-center">
    <v-btn class="btn" text rounded>
      <v-icon class="mr-2"> mdi-plus-circle </v-icon>
      Add New Note
    </v-btn>
  </div>
</template>
<style lang="less">
//BOTON CREAR NOTA
.CreateNoteCont {
  width: 100%;
  height: 50px;

  .btn {
    border-radius: 5px;
    text-transform: none;
    color: var(--mainColor2);
    font-weight: 500 !important;
    letter-spacing: normal;
  }
}

@media (max-width: 640px) {
  .AddNotesComponent {
    margin-top: 15px;
  }
}
</style>
