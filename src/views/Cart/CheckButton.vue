<template>
    <div>
      <div class="icon-selector" :class="{check: isChecked}" @click="selectItem">
        <img src="../../assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem () {
        this.$emit('checkBtnClick')
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .check {
    background-color: #f00;
    border-color: #f00;
  }
</style>
