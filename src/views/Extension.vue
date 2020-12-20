<template>
  <div class="crypto">
    <div class="crypto__container" v-if="step === 0">
      <div class="inputs">
        <div class="inputs__container">
          <label for="from" id="from">You send</label>
          <input @keypress="isNumber($event)" type="text" name="from" v-model="from.value">
          <div
            class="picker"
            :class="{ picker__expanded: expandedLeft }"
          >
            <div class="picker__chooser" @click="expandedLeft = true" v-if="!expandedLeft">
              {{ from.ticker.toUpperCase() }}
              <img src="@/assets/chevron-arrow-down.svg" alt="">
            </div>
            <div class="finder" v-if="expandedLeft">
              <div class="finderHead">
                <div class="finderHead__left">
                  <img src="@/assets/loupe.svg" alt="">
                  <input type="text" placeholder="Type a currency or ticker" v-model="filterFrom" autofocus>
                </div>
                <img @click="expandedLeft = false" class="finderHead__close" src="@/assets/close.svg" alt="">
              </div>
              <div class="finderList" v-if="!filterFrom.length">
                <div class="finderListItem" v-for="(item, index) in fromCurrencies" :key="index" @click="setTickerFrom(item.ticker)">
                  <div class="finderListItem__logo" :style="`background-image: url(${item.image})`"></div>
                  <p class="finderListItem__ticker">{{ item.ticker }}</p>
                  <p class="finderListItem__currency">{{ item.name }}</p>
                </div>
              </div>
              <div class="finderList" v-if="filterFrom.length">
                <div class="finderListItem" v-for="(item, index) in filteredFrom" :key="index" @click="setTickerFrom(item.ticker)">
                  <div class="finderListItem__logo" :style="`background-image: url(${item.image})`"></div>
                  <p class="finderListItem__ticker">{{ item.ticker }}</p>
                  <p class="finderListItem__currency">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img @click="swapCurrencies(from, to)" src="@/assets/swap.svg" alt="">
        <div class="inputs__container">
          <label for="to" id="to">You get</label>
          <input @keypress="isNumber($event)" type="text" name="to" v-model="to.value">
          <div
            class="picker"
            :class="{ picker__expanded: expanded }"
          >
            <div class="picker__chooser" @click="expanded = true" v-if="!expanded">
              {{ to.ticker.toUpperCase() }}
              <img src="@/assets/chevron-arrow-down.svg" alt="">
            </div>
            <div class="finder" v-if="expanded">
              <div class="finderHead">
                <div class="finderHead__left">
                  <img src="@/assets/loupe.svg" alt="">
                  <input type="text" placeholder="Type a currency or ticker" v-model="filterTo" autofocus>
                </div>
                <img @click="expanded = false" class="finderHead__close" src="@/assets/close.svg" alt="">
              </div>
              <div class="finderList" v-if="!filterTo.length">
                <div class="finderListItem" v-for="(item, index) in toCurrencies" :key="index" @click="setTickerTo(item.ticker)">
                  <div class="finderListItem__logo" :style="`background-image: url(${item.image})`"></div>
                  <p class="finderListItem__ticker">{{ item.ticker }}</p>
                  <p class="finderListItem__currency">{{ item.name }}</p>
                </div>
              </div>
              <div class="finderList" v-if="filterTo.length">
                <div class="finderListItem" v-for="(item, index) in filteredTo" :key="index" @click="setTickerTo(item.ticker)">
                  <div class="finderListItem__logo" :style="`background-image: url(${item.image})`"></div>
                  <p class="finderListItem__ticker">{{ item.ticker }}</p>
                  <p class="finderListItem__currency">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="crypto__equal">
        1 {{ from.ticker.toUpperCase() }} ~ {{ forOne }} {{ to.ticker.toUpperCase() }}
      </p>
      <ul class="cryptoOffers">
        <li v-for="(item, index) in offers" :key="index">
          <p>{{ parseFloat(item.amountTo).toFixed(7) }}</p>
          <span>{{ item.provider.toUpperCase() }}</span>
          <button @click="nextStep(item)">Exchange</button>
        </li>
      </ul>

      <div class="prevTrans" v-if="prevArr.length > 0">
        <p>Last exchanges</p>
        <ul class="prevTrans__list">
          <li
            v-for="(id, index) in prevArr"
            :key="index"
            @click="sendAndCheck(id)"
          >
            {{ id }}<span v-if="prevArr.length > 1 && index !== prevArr.length - 1">,</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="crypto__container" v-if="step === 1">
      <button class="backButton" @click="prevStep()">
        <img src="@/assets/left.svg" alt="">
        Back
      </button>
      <div class="walletAddress">
        <div class="walletAddress__block">
          <span>You want to exchange:</span>
          <p>{{ offer.amountFrom }} {{ offer.from.toUpperCase() }}</p>
        </div>
        <div class="walletAddress__block">
          <span>You will get:</span>
          <p>~{{ offer.amountTo }} {{ offer.to.toUpperCase() }}</p>
        </div>
        <div class="walletAddress__block">
          <label for="address">Please, provide the {{ offer.to.toUpperCase() }} address:</label>
          <input type="text" name="address" v-model="address">
        </div>
        <button class="exchange" :class="{ exchange__errorConfirm: error }" @click="goToConfirm()">Next</button>
      </div>
    </div>

    <div class="crypto__container" v-if="step === 2">
      <button class="backButton" @click="prevStep()">
        <img src="@/assets/left.svg" alt="">
        Back
      </button>
      <div class="confirm">
        <div class="confirm__block">
          <p>You send</p>
          <span>{{ from.value }} {{ from.ticker.toUpperCase() }}</span>
        </div>
        <div class="confirm__block">
          <p>You get</p>
          <span>~{{ to.value }} {{ to.ticker.toUpperCase() }}</span>
        </div>
        <div class="confirm__address">
          <p>Your {{ offer.to.toUpperCase() }} address:</p>
          <span>{{ address }}</span>
        </div>
        <button
          :class="{
            exchange__error: error,
            exchange__loading: loading
          }"
          class="exchangse exchange__big"
          @click="createExchange()"
        >
          <span v-if="!loading">Confirm & make payment</span>
          <span v-if="loading"><img src="@/assets/loader.gif" alt=""></span>
        </button>
      </div>
    </div>

    <div class="crypto__container" v-if="step === 4">
      <button class="backButton" @click="step = 0">
        <img src="@/assets/left.svg" alt="">
        Back
      </button>
      <transaction-status :transaction="transaction"/>
    </div>

    <a href="https://t.me/brobler" target="_blank" class="tgchat">
      <img src="@/assets/telegram-plane-brands.svg" alt=""> Telegram
    </a>

    <div class="powered">
      <p>Powered by <img src="/icons/19.png" alt=""> <span>Brobler</span></p>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CurrencyPicker from '@/components/CurrencyPicker'
// eslint-disable-next-line no-unused-vars
import General from '@/components/General'
import TransactionStatus from '@/components/Status';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    TransactionStatus,
  },
  data() {
    return {
      from: {
        value: 0.1,
        ticker: 'btc'
      },
      to: {
        value: 0.1,
        ticker: 'eth'
      },
      step: 0,
      currencies: [],
      BASE_URL: 'https://api.brobler.com/v1',
      forOne: 0,
      expanded: false,
      expandedLeft: false,
      address: '',
      response: {},
      offers: [],
      offer: {},
      prevArr: [],
      transaction: {},
      redraw: 0,
      interval: null,
      fromCurrencies: [],
      toCurrencies: [],
      filterFrom: '',
      filterTo: '',
      filteredTo: [],
      error: false,
      extensionId: '',
      loading: false,
    }
  },
  mounted() {
    this.getAllCurrencies();
    this.getOffer(this.from.ticker, this.to.ticker, this.from.value);
    this.getForOne(this.from.ticker, this.to.ticker);
    chrome.storage.local.get('ids', (res) => {
      this.prevArr = JSON.parse(res.ids);
    });
    chrome.storage.local.get('extensionId', (res) => {
      this.extensionId = res.extensionId;
    });
  },
  watch: {
    from: {
      deep: true,
      handler() {
        this.getForOne(this.from.ticker, this.to.ticker);
        this.getOffer(this.from.ticker, this.to.ticker, this.from.value);
        this.setCurrencies(this.currencies);
      },
    },
    to: {
      deep: true,
      handler() {
        this.getForOne(this.from.ticker, this.to.ticker);
        this.getOffer(this.from.ticker, this.to.ticker, this.from.value);
        this.setCurrencies(this.currencies);
      },
    },
    step() {
      this.expanded = false;
      this.expandedLeft = false;
      this.filterFrom = '';
      this.filter = '';
      this.error = false;
      clearInterval(this.interval);
      if (this.step === 4) {
        this.interval = setInterval(() => {
          this.getTransactionInfo(this.transaction.publicId);
        }, 5000);
      }
    },
    expandedLeft() {
      this.filterFrom = '';
    },
    expanded() {
      this.filter = '';
    },
    filterTo() {
      const arr = this.toCurrencies.slice();
      let result = arr.filter((i) => i.ticker.indexOf(this.filterTo.toLowerCase()) !== -1);
      if (!result.length) {
        result = arr.filter((i) => i.name.indexOf(this.filterTo.toLowerCase()) !== -1);
      }
      this.filteredTo = [...result];
    },
    filterFrom() {
      const arr = this.fromCurrencies.slice();
      let result = arr.filter((i) => i.ticker.indexOf(this.filterFrom.toLowerCase()) !== -1);
      if (!result.length) {
        result = arr.filter((i) => i.name.indexOf(this.filterFrom.toLowerCase()) !== -1);
      }
      this.filteredFrom = [...result];
    },
  },
  methods: {
    goToConfirm() {
      this.error = false;
      if (this.address.length) {
        this.step = 2;
      } else {
        this.error = true;
      }
    },
    redrawing(bool) {
      this.expanded = bool;
    },
    setTickerFrom(ticker) {
      this.$set(this.from, 'ticker', ticker);
      this.expandedLeft = false;
    },
    setTickerTo(ticker) {
      this.$set(this.to, 'ticker', ticker);
      this.expanded = false;
    },
    getForOne(from, to) {
      axios.get(`${this.BASE_URL}/offers?from=${from}&to=${to}&amount=1`)
        .then((res) => {
          this.forOne = res.data[0].amountTo;
        })
    },
    getAllCurrencies() {
      axios.get(`${this.BASE_URL}/currencies`)
        .then((res) => {
          this.currencies = res.data;
        })
    },
    setCurrencies(currencies) {
      const arrFrom = currencies.slice();
      const indexFrom = arrFrom.findIndex((i) => i.ticker === this.to.ticker);
      arrFrom.splice(indexFrom, 1);
      this.fromCurrencies = arrFrom;

      const arr = currencies.slice();
      const index = arr.findIndex((i) => i.ticker === this.from.ticker);
      arr.splice(index, 1);
      this.toCurrencies = arr;
    },
    getOffer(from, to, amount) {
      axios.get(`${this.BASE_URL}/offers?from=${from}&to=${to}&amount=${amount}`)
        .then((res) => {
          this.offers = res.data;
          this.$set(this.to, 'value', parseFloat(res.data[0].amountTo).toFixed(7));
        })
        .catch(() => {
          this.$set(this.to, 'value', 0);
        })
    },
    createExchange() {
      this.error = false;
      const data = {
        tickerFrom: this.offer.from,
        tickerTo: this.offer.to,
        amount: this.offer.amountFrom,
        address: this.address,
        fixed: false,
        provider: this.offer.provider,
        extensionId: this.extensionId,
      };
      if (!this.loading) {
        this.loading = true
        axios.post(`${this.BASE_URL}/exchange`, data)
          .then((res) => {
            this.transaction = res.data;
            this.loading = false;
            this.step = 4;
            this.prevArr.unshift(this.transaction.publicId);
            this.getTransactionInfo(this.transaction.publicId);
            chrome.storage.local.set({'ids': JSON.stringify(this.prevArr)});
          })
          .catch((err) => {
            if (err) {
              this.error = true;
              this.loading = false;
            }
          })
      }
    },
    sendAndCheck(id) {
      this.getTransactionInfo(id);
      this.step = 4;
    },
    getTransactionInfo(id) {
      axios.get(`${this.BASE_URL}/exchange/${id}`)
        .then((res) => {
          this.transaction = res.data;
        })
    },
    swapCurrencies(from, to) {
      this.from = to;
      this.to = from;
    },
    isNumber(event) {
      event = (event) ? event : window.event;
      const charCode = (event.which) ? event.which : event.keyCode;
      if ((event.target.value.indexOf('.') === -1 && charCode === 46) || charCode >= 48 && charCode <= 57) {
        return true;
      } else {
        event.preventDefault();
      }
    },
    nextStep(offer) {
      if (offer) {
        this.offer = offer;
      }
      this.step += 1;
    },
    prevStep() {
      this.step -= 1;
    }
  }
}
</script>
