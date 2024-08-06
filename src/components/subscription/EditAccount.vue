<template>
  <div class="editAccount" v-if="editAccount">
    {{ accountName }}
  </div>
</template>
<script>
export default {
  name: 'editAccount',
  props: {
    editAccount: Boolean,
    accountName: String,
  },
}
</script>
<style lang="less" scoped>
.editAccount {
  width: auto;
  color: #f59607;
  font-weight: 600;
  font-size: 19px;
}
</style>