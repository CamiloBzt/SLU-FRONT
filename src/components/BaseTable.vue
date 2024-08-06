<template>
  <div class="Table">
    <!--Cabeza-->
    <div class="Head d-flex justify-space-between align-center">
      <template v-for="(column, index) in columns">
        <div 
        v-if="column.colspan > 0"
        class="HeadText" 
        :class="[column.class]"  
        :key="column.id || index" 
        :colspan="column.colspan">
          {{ column.header }}
        </div>

        <template v-else-if="column.colspan === 0"></template>

        <div 
          v-if="!column.colspan" 
          class="HeadText" 
          :class="[column.class]"
          :key="column.id || index" 
          :colspan="column.colspan">
          {{ column.header }}
        </div>
      </template>
    </div>

    <!--Cuerpo-->
    <div class="Body">
      
      <div v-if="data.length === emptyData || loading">
        <p>No Information</p>
      </div>
      <template 
        v-else 
        v-for="(row, rowIndex) in data"
        >
        <div 
          class="Line"
          :key="composeTrKey(row, rowIndex)" 
          :class="row.name_status === 'Secundario' && row.name_attempt === 'Conectado' ? 'primTable' : 'normalTable'"
          >
          <template v-for="(field, fieldIndex) in columns">
            <div 
              class="BodyContent"
              :class="[field.class]" 
              :key="composeTdKey(row, rowIndex, field, fieldIndex)">
              {{ printFieldData(field, row) }}
              <slot v-if="field.name" :name="field.name" :row="row"></slot>
            </div>
          </template>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import get from 'lodash/get'

export default {
  name: 'BaseTable',

  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean
    },
    pagination: {
      type: Object
    }
  },

  data () {
    return {
      emptyData: 0
    }
  },

  methods: {
    composeTrKey (row, rowIndex) {
      return `${row.id}.${rowIndex}`
    },
    composeTdKey (row, rowIndex, field, fieldIndex) {
      if (row.id && field.id) return `${row.id}.${field.id}`
      if (row.id && !field.id) return `${row.id}.${fieldIndex}`
      if (!row.id && field.id) return `${rowIndex}.${field.id}`
      return `${rowIndex}.${fieldIndex}`
    },
    printFieldData (field, row) {
      if (field.name) return ''
      if (typeof field.accessor === 'function') return field.accessor(row)
      if (typeof field.accessor === 'string') return get(row, field.accessor, '')
      if (field.id) return get(row, field.id, '')
      return ''
    }
  }
}
</script>
<style lang="less" scoped>
.flex{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.Table{
  width: 100%;
  height: auto;

  //Cabeza de la tabla
  .Head{
    width: 100%;
    height: 40px;
    .HeadText{
      .flex();
      height: 100%;
      font-size: 14px;
      color: #547FA9;
    }
  }

  //Cuerpo de las tablas
  .Body{
    width: 100%;
    height: auto;

    .Line{
      .flex();
      justify-content: space-between;
      width: 100%;
      height: 40px;
      border-bottom: solid .5px #CDCDCD;

      .BodyContent{
        .flex();
        height: 100%;
        font-size: 16px;

        @media(max-width: 650px)
        {font-size: 14px;}
      }
    }
  }

  //Largo de las tablas
  .Large{
    width: 57%; 

    @media(max-width: 650px){
      width: 66%;
    }
  }
  .Small{
    width: 20%; 
    justify-content: center !important;
    text-align: center;

    @media(max-width: 650px){
      width: 17%;
    }
  }
}
</style>
