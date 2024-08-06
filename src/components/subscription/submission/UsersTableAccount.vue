<template>
  <div class="tableCont">
    <!--CABEZA DE LA TABLA-->
    <div class="TableHead">
      <div class="TableRow">Name</div>
      <div class="TableRow">Email</div>
      <div class="TableRow">Contact Number</div>
      <div class="TableRow">Address</div>
      <div class="TableDelete" />
    </div>
    <!--CUERPO DE LA TABLA-->
    <div class="TableContent">
      <div v-for="(item, i) in selectedItems" :key="i" class="RowFull">
        <div class="TableRow">
          {{ item.name }}
        </div>
        <div class="TableRow">
          {{ item.email }}
        </div>
        <div class="TableRow">
          {{ item.phone }}
        </div>
        <div class="TableRow">
          {{ item.address }}
        </div>
        <div @click="$emit('deleteContact', item.id)" class="TableDelete">
          <v-btn icon>
            <v-icon> mdi-trash-can-outline </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UsersTableAccount",
  props: {
    selectedItems: {
      type: Array,
    }
  },
};
</script>
<style lang="less" scoped>
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*Estilos de la tabla*/
.tableCont {
  .flexBox();
  width: 100%;
  height: auto;
  margin-top: 25px;
  align-content: flex-start;
  flex-wrap: wrap;
  .TableHead {
    .flexBox();
    justify-content: space-between;
    width: 100%;
    height: 55px;
    overflow: hidden;
    border-bottom: solid 1px #A8BFD9;
    .TableRow{
      font-weight: bold;
    }
  }
  .TableContent {
    .flexBox();
    justify-content: space-between;
    width: 100%;
    height: auto;
    border-radius: 15px;
    overflow-x: hidden;
    flex-wrap: wrap;

    .RowFull {
      .flexBox();
      justify-content: space-between;
      width: 100%;
      height: 60px;
    }
  }

  .TableRow {
    .flexBox();
    width: 21.5%;
    height: 100%;
  }
  .TableDelete {
    .flexBox();
    width: 10%;
    height: 100%;
  }
}
</style>