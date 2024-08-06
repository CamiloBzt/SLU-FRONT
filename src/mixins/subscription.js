//MOSTRAR EL MODAL PARA VERIFICAR CONTRASEÑA
export const showModal = {
  data() {
    return {
      //MUESTRA EL MODAL
      requestPassword: false,
    };
  },
  methods: {
    //MOSTRAR MODAL PARA SOLICITAR CONTRASEÑA
    passwordRequest() {
      this.requestPassword = true;
    },
    //OCULTA EL MODAL
    hideModalPassword() {
      this.requestPassword = false;
    },
  },
};

//MANEJAR EL ESTADO DE LOS ACORDEONES
export const stateExpansiveManager = {
  data() {
    return {
      stateExpansive: false,
      stateExpansiveMessage: 'Show More Information ',
      iconExpansive: 'mdi-plus',

      stateExpansiveSlip: false,
      stateExpansiveMessageSlip: 'Show More Information',
      iconExpansiveSlip: 'mdi-plus',

      stateExpansiveCor: false,
      stateExpansiveMessageCorr: 'Show More Information',
      iconExpansiveCorr: 'mdi-plus',

      stateExpansiveDoc: false,
      stateExpansiveMessageDoc: 'Show More Information',
      iconExpansiveDoc: 'mdi-plus',

      stateSubExpansion:false,
      iconSubExpansion:'mdi-plus'
    };
  },
  methods: {
    changeStateExpansive() {
      this.stateExpansive = !this.stateExpansive;
      if (this.stateExpansive) {
        this.stateExpansiveMessage = 'Show Less Information';
        this.iconExpansive = 'mdi-minus';
      } else {
        this.stateExpansiveMessage = 'Show More Information';
        this.iconExpansive = 'mdi-plus';
      }
    },
    changeStateExpansiveSlip() {
      this.stateExpansiveSlip = !this.stateExpansiveSlip;
      if (this.stateExpansiveSlip) {
        this.stateExpansiveMessageSlip = 'Show Less Information';
        this.iconExpansiveSlip = 'mdi-minus';
      } else {
        this.stateExpansiveMessageSlip = 'Show More Information';
        this.iconExpansiveSlip = 'mdi-plus';
      }
    },
    changeStateCorrespondence() {
      this.stateExpansiveCor = !this.stateExpansiveCor;
      if (this.stateExpansiveCor) {
        this.stateExpansiveMessageCorr = 'Show Less Information';
        this.iconExpansiveCorr = 'mdi-minus';
      } else {
        this.stateExpansiveMessageCorr = 'Show More Information';
        this.iconExpansiveCorr = 'mdi-plus';
      }
    },
    changeStateCorrespondenceDoc() {
      this.stateExpansiveDoc = !this.stateExpansiveDoc;
      if (this.stateExpansiveDoc) {
        this.stateExpansiveMessageDoc = 'Show Less Information';
        this.iconExpansiveDoc = 'mdi-minus';
      } else {
        this.stateExpansiveMessageDoc = 'Show More Information';
        this.iconExpansiveDoc = 'mdi-plus';
      }
    },
    changeSubExpansion(){
      this.stateSubExpansion = !this.stateSubExpansion;
      if (this.stateSubExpansion) {
        this.iconSubExpansion = 'mdi-minus';
      }else{
       this.iconSubExpansion = 'mdi-plus'; 
      }
    }
  },
  /*
    En beforeMount cambiamos el icono y el mensaje en los paneles
    que por default se muestran abiertos
  */
  beforeMount(){
    if(
      this.userPanel=== 0 ||
      this.brokerPanel=== 0 ||
      this.cedentPanel === 0 ||
      this.quoPropPanel === 1 ||
      this.riskAnalysisQuotatorPanel === 1 ||
      this.ClaimReportsPanel === 0
      ){
        this.changeStateExpansive();
      }
  }
};

//MANEJAR LOS FILTROS
export const filtersManager = {
  data() {
    return {
      ShowFilters: false,
    };
  },
  methods: {
    //MOSTRAR EL MODAL DE FILTROS
    filtersAction() {
      this.ShowFilters = !this.ShowFilters;
    },
  },
};

//FUNCIONES PARA EL STEPPER
export const stepper = {
  props: {
    //DEFINE QUE ESTILOS AÑADIMOS A LOS LINKS
    step1: String,
    step2: String,
    step3: String,

    //AÑADE EL NOMBRE DEL PASO EN MÓVILES
    stepMovil1: String,
    stepMovil2: String,
    stepMovil3: String,
  },
};

//OBTENER EL NOMBRE DE LA RUTA
export const getCurrentPathName = {
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};

//CONTROLES DE LAS TABLAS EN MOVILES
export const tableControl = {
  methods:{
    
    sideScroll(direction, speed, distance, step) {
      var container = document.querySelector('.TableContent');
      var scrollAmount = 0;
      var slideTimer = setInterval(function() {
        if (direction == 'left') {
          container.scrollLeft -= step;
        } else {
          container.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    },

    moveRightTable() {
      this.sideScroll('right', 25, 100, 10);
    },
    moveLeftTable() {
      this.sideScroll('left', 25, 100, 10);
    },
  }
}
