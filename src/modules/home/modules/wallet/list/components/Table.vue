<template>
  <div class="SubscriptionTable mt-5">
    <!--TITULO DE LA TABLA-->
    <div class="TableTitle  d-flex justify-space-between align-center">
      <!--TITULO-->
      Accounts

      <div class="TableControlsCont ShowFlexOnMovil justify-space-between align-center">
        <div @click="moveLeftTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-left</v-icon>
        </div>

        <div @click="moveRightTable()" class="ControlBtn d-flex justify-center align-center">
          <v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>

    <div class="TableContent">
      <!--CABEZA DE LA TABLA-->
      <div class="TableHeadContent  mt-7 d-flex justify-start align-start">
        <!--NOMBRES DE LAS COLUMNAS-->
        <div class="TableHeadName d-flex justify-start align-center row1">
          Ref Number
        </div>
        <div class="TableHeadName d-flex justify-center align-center row2 text-center">
          Insured <br />
          Name
        </div>
        <div class="TableHeadName d-flex justify-center align-center row3 text-center">
          Net premium <br />
          SLU USD
        </div>
        <div class="TableHeadName d-flex justify-center align-center row4 text-center">
          PPW
        </div>
        <div class="TableHeadName d-flex justify-center align-center row5 text-center">
          Clause
        </div>
        <div class="TableHeadName d-flex justify-center align-center row6 text-center">
          Advance notice
        </div>
        <div class="TableHeadName d-flex justify-center align-center row7 text-center">
          Primary notice
        </div>
        <div class="TableHeadName d-flex justify-center align-center row8 text-center">
          Payment <br />
          status
        </div>
        <div class="TableHeadName d-flex justify-center align-center row9 text-center">
          Overdue <br>
          days
        </div>
        <div class="TableHeadName d-flex justify-center align-center row10 text-center">
          Notification <br />
          sent
        </div>
        <div class="TableHeadName d-flex justify-center align-center row11">
          Comments
        </div>
      </div>

      <!--CUERPO DE LA TABLA-->
      <div class="TableBodyContent mt-4">
        <div class="TableContentInner scrollable" ref="tableContentInner">
          <div 
          v-for="(data, index) in dataTable"
          :key="index"
          @mouseleave="showExtraInformation = false"
          class="TableBodyContSn table-line d-flex justify-center text-center align-start">
            <div 
              @mouseenter="openMoreInformation(data.informationExtra.length)" 
              @click="goToPaymentRequest(data.subscriptionId)"
              class="TableBodyTextLink d-flex justify-start  align-center row1"
              >
              {{data.refNumber}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row2">
              {{data.insuredName}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row3">
              {{data.netPremiumSluUsd}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row4">
              {{formatDate(data.ppw)}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row5">
              {{data.clause}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row6">
              {{formatDate(data.advanceNotice)}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row7">
              {{formatDate(data.primaryNotice)}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row8">
              {{data.paymentStatus}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row9">
              {{data.overdueDays}}
            </div>
            <div class="TableBodyText d-flex justify-center text-center align-center row10">
              {{data.notificationSent}}
            </div>
            <div @click="emitShowModal({ref:data.refNumber, walletId:data.walletId})" class="TableBodyText d-flex justify-center align-center row11">
              <img class="image-icon" src="@/assets/img/comment-icon.png" />
            </div>
            <div v-if="showExtraInformation" class="table-line__information-extra">
              <div 
                v-for="(informationExtra, index) in data.informationExtra" 
                :key="index"
                class="information-extra"
                >
                  <b>
                    {{ informationExtra.name }}:
                  </b>
                  <div>
                    {{ informationExtra.value }}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import  {formatDateWallet} from '@/lib/utils'
export default {
  name: 'AppTable',
  data: () => {
    return {
      formatDate:formatDateWallet,
      showExtraInformation: false
    }
  },
  props: {
    dataTable:{
      required: false
    }
  },
  methods: {
    openMoreInformation(informationExtraLenght) {
      if(informationExtraLenght > 0 ) this.showExtraInformation = true
    },
    emitShowModal (ref, walletId) {
      this.$emit('showModal',{ref , walletId})
    },
    //http://localhost:8080/wallet/{subscriptionId}/payment-request
    goToPaymentRequest(subscriptionId){
      this.$router.push(`/wallet/${subscriptionId}/payment-request`)
    }
  }
 
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/Subscription/Table.less';
.row1{
  width: 9% !important;
  padding-left: 15px;
}
.row2{
  width: 10% !important;
}
.row3{
  width: 10% !important;
}
.row4{
  width: 11% !important;
}
.row5{
  width: 6% !important;
}
.row6{
  width: 11% !important;
}
.row7{
  width: 11% !important;
}
.row8{
  width: 8%!important;
}
.row9{
  width: 5% !important;
}
.row10{
  width: 12% !important;
}
.row11{
  width:7% !important;
  cursor: pointer;
  i {
    color: #D2DEED;
  }
}

</style>
