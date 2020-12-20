<template>
  <div class="copy">
    <img v-if="!copied" @click="copy(value)" class="send__copy" src="@/assets/copy.svg" alt="">    
    <img v-if="copied" class="send__copy" src="@/assets/check.svg" alt="">    
  </div>
</template>

<script>
import copyLib from 'copy-to-clipboard';

export default {
  props: {
    value: String,
  },
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    copy(val) {
      copyLib(val);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    },
  },
}
</script>

<style lang="scss">
  .copy {
    & > img {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      &:first-child {
        cursor: pointer;
      }
    }
  }
</style>
