<template>
  <div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .picker {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: flex-end;
    z-index: 3;
    &__expanded {
      width: 100% !important;
    }
    &__chooser {
      position: relative;
      height: 100%;
      width: 100%;
      padding-bottom: 15px;
      background-color: rgba(#80a3b6, .1);
      border-radius: 0 5px 5px 0; 
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #333;
      font-weight: bold;
      text-transform: uppercase;
      & > img {
        width: 14px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }

  .finder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .finderHead {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-right: 20px;
    border-radius: 5px;
    background-color: #fff;
    &__left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 85%;
      & > input {
        height: 100%;
        width: 100%;
        padding: 15px 5px;
        display: inline-block;
        border: none;
        background: none;
        font-size: 18px;
        &::placeholder {
          color: rgba(#80a3b6, .6);
          font-size: 14px;
        }
      }
      & > img {
        width: 20px;
        opacity: .2;
      }
    }
    &__close {
      width: 15px;
      cursor: pointer;
    }
  }

  .finderList {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    height: 180px;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    overflow: auto;
    z-index: 10;
  }

  .finderListItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgba(#80a3b6, .2);
      transition: .2s;      
    }
    &__logo {
      width: 20px;
      height: 20px;
      background-color: rgba(#333, .6);
      margin-right: 10px;
      border-radius: 5px;
      background-size: cover;
    }
    &__ticker {
      font-weight: bold;
      font-size: 16px;
      margin-right: 10px;
      line-height: 20px;
    }
    &__currency {
      padding-top: 3px;
      line-height: 20px;
      font-size: 14px;
      color: #72767D;
    }
  }
</style>
