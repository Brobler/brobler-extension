<template>
  <div>
  </div>
</template>

<style lang="scss">
  .backButton {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    color: rgba(#fff, .5);
    font-size: 14px;
    cursor: pointer;
    outline: none;
    transition: .2s;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 15px;
    left: 20px;
    &:hover {
      color: #fff;
    }
    & > img {
      width: 10px;
      margin-right: 5px;
    }
  }

  .crypto {
    height: 600px;
    background-color: #333;
    color: #fff;
    &__container {
      padding: 20px;
      padding-top: 40px;
      height: 100%;
    }
    &__equal {
      margin-top: 20px;
      line-height: 3;
      text-align: center;
    }
  }

  .inputs {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img {
      width: 30px;
      cursor: pointer;
    }
    &__container {
      width: 45%;
      position: relative;
      background-color: #fff;
      border-radius: 5px;
      & > label {
        position: absolute;
        top: 5px;
        left: 10px;
        line-height: 1.5;
        font-size: 12px;
        width: 100%;
        color: #72767D;
        letter-spacing: 0.5px;
        font-weight: bold;
        z-index: 1;
      }
      & > input {
        width: 100%;
        padding: 25px 10px 5px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        border: none;
        background: none;
        position: relative;
        z-index: 2;
      }
    }
  }

  .cryptoOffers {
    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      border-bottom: 2px solid rgba(#80a3b6, .1);
      & > p {
        width: 30%;
        font-weight: bold;
      }
      & > span {
        width: 40%;
      }
      & > button {
        width: 25%;
        -webkit-appearance: none;
        border: none;
        background: #2196f3;
        color: #fff;
        font-weight: bold;
        padding: 10px;
        text-transform: uppercase;
        border-radius: 5px;
        cursor: pointer;
      }
      &:first-child {
        border-radius: 5px;
        background-color: #fff;
        color: #333;
      }
    }
  }

  .prevTrans {
    margin-top: 10px;
    & > p {
      color: rgba(#fff, .5);
      font-size: 14px;
      line-height: 2;
    }
    &__list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      font-size: 16px;
      color: #2196f3;
      & > li {
        cursor: pointer;
        margin-right: 5px;
        & > span {
          color: rgba(#fff, .5);
        }
      }
    }
  }

  .walletAddress {
    width: 100%;
    padding-top: 20px;
    &__block {
      margin-bottom: 10px;
      & > span {
        color: rgba(#fff, .5);
        font-size: 14px;
        line-height: 2;
      }
      & > p {
        font-size: 18px;
        font-weight: bold;
        line-height: 1;
      }
      & > label {
        color: rgba(#fff, .5);
        font-size: 14px;
        line-height: 2;
      }
      & > input {
        width: 100%;
        padding: 10px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        border-radius: 5px;
        border: 2px soild #72767D;
        background: #fff;
        position: relative;
        z-index: 2;
      }
    }
    & > p {
      font-size: 18px;
      font-weight: bold;
    }
    &__check {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      line-height: 2;
      & > label {
        font-size: 12px;
      }
    }
  }

  .confirm {
    padding-top: 20px;
    &__header {
      margin-bottom: 10px;
      line-height: 1.5;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    &__blocks {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    &__block {
      width: 50%;
      margin-bottom: 10px;
      & > p {
        font-size: 14px;
        color: rgba(#fff, .5);
        line-height: 2;
      }
      & > span {
        font-weight: bold;
        line-height: 1;
        font-size: 18px;
      }
    }
    &__address {
      & > p {
        font-size: 14px;
        color: rgba(#fff, .5);
        line-height: 2;
      }
      & > span {
        font-weight: bold;
        font-size: 18px;
        line-height: 1;
      }
    }
  }

  .exchange {
    display: block;
    width: 140px;
    height: 43px;
    margin-top: 20px;
    line-height: 2.5;
    font-size: 16px;
    padding-top: 2px;
    border: none;
    border-radius: 5px;
    background: #2196f3;
    color: #fff;
    cursor: pointer;
    outline: none;
    position: relative;
    & > span {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        width: 20px;
      }
    }
    &__loading {
      cursor: default !important;
    }
    &__big {
      width: 250px;
      display: block;
      height: 43px;
      margin-top: 20px;
      line-height: 2.5;
      font-size: 16px;
      padding-top: 2px;
      border: none;
      border-radius: 5px;
      background: #2196f3;
      color: #fff;
      cursor: pointer;
      outline: none;
      position: relative;
      & > span {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        & > img {
          width: 20px;
        }
      }
    }
    &__error {
      &:before {
        content: 'Something went wrong. Please try again';
        position: absolute;
        top: 110%;
        left: 0;
        color: red;
        font-size: 14px;
        text-align: left;
        white-space: nowrap;
      }
    }
    &__errorConfirm {
      &:before {
        content: 'Please, enter the valid address';
        position: absolute;
        top: 110%;
        left: 0;
        color: red;
        font-size: 14px;
        text-align: left;
        white-space: nowrap;
      }
    }
  }

  .powered {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    & > p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      & > img {
        margin: 0 5px;
      }
      & > span {
        font-weight: bold;
      }
    }
  }

  .tgchat {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    text-decoration: none;
    color: #fff;
    z-index: 5;
    & > img {
      width: 15px;
      margin-right: 5px;
    }
  }
</style>
