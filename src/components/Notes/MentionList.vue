<template>
  <div class="items">
    <button
      class="item"
      :class="{ 'is-selected': index === selectedIndex }"
      v-for="(item, index) in items"
      :key="index"
      @click="selectItem(index)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command({ id: item })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.items {
  position: relative;
  border-radius: 0.25rem;
  background: white;
  color: rgba(black, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0px 10px 20px rgba(0, 0, 0, 0.1),
  ;
}

.item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  padding: 0.2rem 0.5rem;
  font-family: avenir;
  background:transparent;

  &:hover {
    color: grey;
    background: rgba(grey, 0.1);
    cursor: pointer;
  }
}

</style>