<template>
  <div>
    <div class="send" v-if="transaction.status === 'waiting'">
      <div class="send__qr">
        <canvas ref="qrCanvas"></canvas>
      </div>
      <div class="send__block">
        <p>Exchange ID</p>
        <span>
          {{ transaction.publicId }}
          <copy :value="transaction.publicId"/>
        </span>
      </div>
      <div class="send__block">
        <p>Status</p>
        <span>{{ transaction.status }}</span>
      </div>
      <div class="send__block">
        <p>You send</p>
        <span>{{ transaction.expectedSendAmount }} {{ transaction.tickerFrom.toUpperCase() }}</span>
      </div>
      <div class="send__block">
        <p>You get</p>
        <span>~{{ transaction.expectedReceiveAmount }} {{ transaction.tickerTo.toUpperCase() }}</span>
      </div>
      <div class="send__block">
        <p>Deposit address</p>
        <span>
          {{ transaction.payinAddress }}
          <copy :value="transaction.payinAddress"/>
        </span>
      </div>
      <div class="send__block">
        <p>Destination address</p>
        <span>
          {{ transaction.payoutAddress }}
          <copy :value="transaction.payoutAddress"/>
        </span>
      </div>
      <div class="send__block" v-if="transaction.payinExtraId">
        <p>Extra Id</p>
        <span>
          {{ transaction.payinExtraId }}
          <copy :value="transaction.payinExtraId"/>
        </span>
      </div>
    </div>

    <div class="send" v-if="transaction.status === 'confirming'">
      <div class="send__flex">
        <div class="send__block">
          <p>Exchange ID</p>
          <span>
            {{ transaction.publicId }}
            <copy :value="transaction.publicId"/>
          </span>
        </div>
        <div class="send__block">
          <p>Status</p>
          <span>{{ transaction.status }}</span>
        </div>
      </div>
      <div class="send__flex">
        <div class="send__block">
          <p>You send</p>
          <span v-if="transaction.amountSend">{{ transaction.amountSend }} {{ transaction.tickerFrom.toUpperCase() }}</span>
          <span v-else>{{ transaction.expectedSendAmount }} {{ transaction.tickerFrom.toUpperCase() }}</span>
        </div>
        <div class="send__block">
          <p>You get</p>
          <span v-if="transaction.amountReceive">{{ transaction.amountReceive }} {{ transaction.tickerFrom.toUpperCase() }}</span>
          <span v-else>~{{ transaction.expectedReceiveAmount }} {{ transaction.tickerTo.toUpperCase() }}</span>
        </div>
      </div>
      <div class="send__block">
        <p>Deposit address</p>
        <span>
          {{ transaction.payinAddress }}
          <copy :value="transaction.payinAddress"/>
        </span>
      </div>
      <div class="send__block">
        <p>Destination address</p>
        <span>
          {{ transaction.payoutAddress }}
          <copy :value="transaction.payoutAddress"/>
        </span>
      </div>
      <div class="send__block" v-if="transaction.payinExtraId">
        <p>Extra Id</p>
        <span>
          {{ transaction.payinExtraId }}
          <copy :value="transaction.payinExtraId"/>
        </span>
      </div>
      <div class="send__block">
        <p>Input transaction hash</p>
        <span>
          {{ transaction.payinHash }}
          <copy :value="transaction.payinHash"/>
        </span>
      </div>
    </div>

    <div class="send" v-if="transaction.status === 'exchanging'">
      <div class="send__flex">
        <div class="send__block">
          <p>Exchange ID</p>
          <span>
            {{ transaction.publicId }}
            <copy :value="transaction.publicId"/>
          </span>
        </div>
        <div class="send__block">
          <p>Status</p>
          <span>{{ transaction.status }}</span>
        </div>
      </div>
      <div class="send__flex">
        <div class="send__block">
          <p>Amount Send</p>
          <span v-if="transaction.amountSend">{{ transaction.amountSend }} {{ transaction.tickerFrom.toUpperCase() }}</span>
          <span v-else>{{ transaction.expectedSendAmount }} {{ transaction.tickerFrom.toUpperCase() }}</span>
        </div>
        <div class="send__block">
          <p>Amount Received</p>
          <span v-if="transaction.amountReceive">{{ transaction.amountReceive }} {{ transaction.tickerFrom.toUpperCase() }}</span>
          <span v-else>~{{ transaction.expectedReceiveAmount }} {{ transaction.tickerTo.toUpperCase() }}</span>
        </div>
      </div>
      <div class="send__block">
        <p>Deposit address</p>
        <span>
          {{ transaction.payinAddress }}
          <copy :value="transaction.payinAddress"/>
        </span>
      </div>
      <div class="send__block">
        <p>Destination address</p>
        <span>
          {{ transaction.payoutAddress }}
          <copy :value="transaction.payoutAddress"/>
        </span>
      </div>
      <div class="send__block" v-if="transaction.payinExtraId">
        <p>Extra Id</p>
        <span>
          {{ transaction.payinExtraId }}
          <copy :value="transaction.payinExtraId"/>
        </span>
      </div>
      <div class="send__block">
        <p>Input transaction hash</p>
        <span>
          {{ transaction.payinHash }}
          <copy :value="transaction.payinHash"/>
        </span>
      </div>
    </div>

    <div class="send" v-if="transaction.status === 'sending' || transaction.status === 'finished'">
      <div class="send__flex">
        <div class="send__block">
          <p>Exchange ID</p>
          <span>
            {{ transaction.publicId }}
            <copy :value="transaction.publicId"/>
          </span>
        </div>
        <div class="send__block">
          <p>Status</p>
          <span>{{ transaction.status }}</span>
        </div>
      </div>
      <div class="send__flex">
        <div class="send__block">
          <p>Amount Send</p>
          <span v-if="transaction.amountSend">{{ transaction.amountSend }} {{ transaction.tickerFrom.toUpperCase() }}</span>
          <span v-else>{{ transaction.expectedSendAmount }} {{ transaction.tickerFrom.toUpperCase() }}</span>
        </div>
        <div class="send__block">
          <p>Amount Received</p>
          <span v-if="transaction.amountReceive">{{ transaction.amountReceive }} {{ transaction.tickerFrom.toUpperCase() }}</span>
          <span v-else>~{{ transaction.expectedReceiveAmount }} {{ transaction.tickerTo.toUpperCase() }}</span>
        </div>
      </div>
      <div class="send__block">
        <p>Deposit address</p>
        <span>
          {{ transaction.payinAddress }}
          <copy :value="transaction.payinAddress"/>
        </span>
      </div>
      <div class="send__block">
        <p>Destination address</p>
        <span>
          {{ transaction.payoutAddress }}
          <copy :value="transaction.payoutAddress"/>
        </span>
      </div>
      <div class="send__block" v-if="transaction.payinExtraId">
        <p>Extra Id</p>
        <span>
          {{ transaction.payinExtraId }}
          <copy :value="transaction.payinExtraId"/>
        </span>
      </div>
      <div class="send__block">
        <p>Input transaction hash</p>
        <span>
          {{ transaction.payinHash }}
          <copy :value="transaction.payinHash"/>
        </span>
      </div>
      <div class="send__block">
        <p>Output transaction hash</p>
        <span>
          {{ transaction.payoutHash }}
          <copy :value="transaction.payoutHash"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import Copy from '@/components/CopyIcon';

export default {
  components: {
    Copy,
  },
  props: {
    transaction: Object
  },
  mounted() {
    this.setQrCode();
  },
  watch: {
    transaction: {
      deep: true,
      handler() {
        this.setQrCode();
      }
    }
  },
  methods: {
    setQrCode() {
      if (this.transaction.status === 'waiting') {
        setTimeout(() => {
          const canva = this.$refs.qrCanvas;
          QRCode.toCanvas(canva, this.transaction.payinAddress);
        }, 500);
      }
    },
  },
}
</script>

<style lang="scss">
  .send {
    position: relative;
    padding-top: 20px;
    &__block {
      margin-bottom: 10px;
      position: relative;
      & > p {
        font-size: 14px;
        color:rgba(#fff, .5);
        line-height: 2;
      }
      & > span {
        font-weight: bold;
        font-size: 18px;
        line-height: 1;
        word-wrap: break-word;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > img {
          width: 20px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    &__notif {
      font-size: 14px;
      line-height: 1.5;
    }
    &__qr {
      width: 200px;
      height: 200px;
      position: absolute;
      top: 20px;
      right: 0;
      background-color: #fff;
      & > canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
    &__flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div {
        width: 50%;
      }
    }
  }
</style>