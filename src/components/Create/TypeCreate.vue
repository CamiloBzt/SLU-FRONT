<template>
  <div class="NewRenewalComponent d-flex justify-center align-center mt-2">
    <div class="NewRenewalTextContent active left-button">
      <span class="first-letter-underline">
        {{ viewTitle }}
      </span>
    </div>
    <div class="NewRenewalTextContent left-right" @click="setModalCreateCompany()">
      Company
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "TypeCreate",
  props: {
    viewTitle: {
      type: String,
    },
  },
  methods: {
    ...mapMutations(["setModalCreateCompany"]),
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/style/TypeBarStyle.less";

.left-button {
  width: 190px !important;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-left: solid 1px var(--lightColor2);
  border-top: solid 1px var(--lightColor2);
  border-bottom: solid 1px var(--lightColor2) !important;
  // color: white !important;
  background: var(--mainColor2);
  padding: 9px 20px 9px 20px;
  // font-size: 16px !important;
  position: relative;
  cursor: pointer;
  // font-weight: 600 !important;
  display: flex;
  justify-content: center;
  align-items: center;

  .first-letter-underline {
    color: white !important;
    font-size: 16px !important;
    font-weight: 600 !important;
  }
  .first-letter-underline::after {
    content: "";
    position: absolute;
    left: 3.8rem;
    bottom: 0.7rem;
    width: 12px;
    height: 2px;
    background: white;
  }
}

.left-right {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-right: solid 1px var(--lightColor2);
  border-top: solid 1px var(--lightColor2);
  border-bottom: solid 1px var(--lightColor2);
  width: 190px !important;
  padding: 9px 20px 9px 20px;
  font-size: 16px !important;
  background: white;
  position: relative;
  color: #547FA9 !important;
  cursor: pointer;
  font-weight: 600 !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>