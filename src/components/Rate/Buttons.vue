<template>
  <div class="ButtonsCont d-flex flex-column">
    <v-btn color="#003D6D" class="Btn" outlined rounded> Load </v-btn>
    <v-btn color="#003D6D" class="Btn White" rounded> Exit </v-btn>
  </div>
</template>
<style lang="less" scoped>
.ButtonsCont {
  width: 100%;
  height: 100px;
  align-items: flex-end;
  align-content: space-between;
  justify-content: center;
  border-radius: 5px;
  .Btn {
    border-radius: 5px;
    width: 190px;
    text-transform: none;
    height: 40px;
  }
  .White {
    color: white;
    margin-top: 15px;
  }
}
</style>
