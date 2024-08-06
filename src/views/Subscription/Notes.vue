<template>
  <div>
    <div class="AppMain d-flex flex-wrap">
      <!--MENU PARA DISPOSITIVOS MOVILES-->
      <div class="SuperiorMenuContent ShowFlexOnMovil">
        <MenuGeneralMovil></MenuGeneralMovil>
      </div>

      <!--CONTENEDOR GENERAL-->
      <div class="GeneralContent FullOnMovil pl-10 pr-10">
        <!--TITULO DE LA PÁGINA-->
        <TitlePage title="Notes"></TitlePage>

        <NotesComponent></NotesComponent>

        <!--ESPACIO EN BLANCO-->
        <WhiteSpace></WhiteSpace>
      </div>
    </div>
  </div>
</template>
<script>
import TitlePage from '@/components/TitlePage.vue';
import MenuGeneralMovil from '@/components/Menu/MenuGeneralMovil.vue';
import WhiteSpace from '@/components/WhiteSpace.vue';
import NotesComponent from '@/components/Notes/NotesComponent.vue';

export default {
  name: 'Home',
  components: {
    TitlePage,
    MenuGeneralMovil,
    WhiteSpace,
    NotesComponent,
  },
};
// export default {
//   name: 'Dashboard',
//   components: {
//     BaseTable
//   },

//   beforeMount () {
//     this.getDashboardInformation(this.monthDefault).then(() => {
//       this.firstLoading = false
//     })
//     this.getApplicationsByStep({ step: 'ACCEPTED', page: 1 })
//   },

//   data () {
//     return {
//       columns,
//       firstLoading: true,
//       chartImg,
//       currentMonthSimple: moment().format('DD MMM YYYY'),
//       applicationStatus,
//       monthDefault: 0
//     }
//   },

//   computed: {
//     ...mapState({
//       dashboard: state => state.dashboard,
//       applications: state => state.applications.accepted.filter((application, i) => (i < 5)),
//       amountApplications: state => state.dashboard.amountApplications
//     }),
//     ...mapGetters([
//       'currentMonth',
//       'getter1Example'
//     ])
//   },
//   methods: {
//     ...mapActions(['getDashboardInformation', 'getApplicationsByStep','action1Example']),
//     ...mapMutations(['setSelectedMonth','mutation1Example']),
//     onChange (event) {
//       this.firstLoading = true
//       const currentValue = document.getElementById('meses').value
//       this.setSelectedMonth(parseInt(currentValue, 10))
//       this.getDashboardInformation(currentValue)
//     },
//     dataTransform (object, element, type) {
//       if (type === 'amount') {
//         return `$ ${parseInt(get(object, element, 0), 10).toLocaleString()}`
//       }
//       if (type === 'date') {
//         return moment(get(object, element, 0)).format('DD MMMM YYYY')
//       }
//       return get(object, element, 0)
//     },
//     findDataTransfrom (object, position, type) {
//       let value
//       if (type === 'amount') {
//         value = object.find(element => element.id === position)
//         return `$ ${parseInt(get(value, type, 0)).toLocaleString()}`
//       }
//       value = object.find(element => element.id === position)
//       return get(value, type, 0)
//     }
//   }
// }
</script>
