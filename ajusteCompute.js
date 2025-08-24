//AdmittedPremiumTable.vue

computed: {
    premiumTotalComputed: {
      get() {
        this.premiumTotal = this.sumTotalPremium();
        return this.premiumTotal;
      },
      set() {},
    },
    sluTotalComputed: {
      get() {
        this.sluTotal = this.sumPremiumSlu();
        return this.sluTotal;
      },
      set() {},
    },
    premiumDamageUSD: {
      get() {
        const item = this.detailValues.find((el) => el.id === 1);
        if (!item || !this.exchangeRate) return 0;
        return Number((item.premiumDamage / this.exchangeRate).toFixed(2));
      },
      set(newValue) {
        const item = this.detailValues.find((el) => el.id === 1);
        if (item && this.exchangeRate) {
          item.premiumDamage = parseFloat(newValue) * this.exchangeRate;
        }
      },
    },

    premiumBiUSD: {
      get() {
        const item = this.detailValues.find((el) => el.id === 1);
        if (!item || !this.exchangeRate) return 0;
        return Number((item.premiumBi / this.exchangeRate).toFixed(2));
      },
      set(newValue) {
        const item = this.detailValues.find((el) => el.id === 1);
        if (item && this.exchangeRate) {
          item.premiumBi = parseFloat(newValue) * this.exchangeRate;
        }
      },
    },

    premiumStocksUSD: {
      get() {
        const item = this.detailValues.find((el) => el.id === 1);
        if (!item || !this.exchangeRate) return 0;
        return Number((item.premiumStocks / this.exchangeRate).toFixed(2));
      },
      set(newValue) {
        const item = this.detailValues.find((el) => el.id === 1);
        if (item && this.exchangeRate) {
          item.premiumStocks = parseFloat(newValue) * this.exchangeRate;
        }
      },
    },

    premiumTotalUSD: {
      get() {
        return (parseFloat(this.premiumDamageUSD || 0) + parseFloat(this.premiumBiUSD || 0) + parseFloat(this.premiumStocksUSD || 0)).toFixed(2);
      },
      set() {},
    },

    sluDamageUSD: {
      get() {
        const item = this.detailValues.find((el) => el.id === 1);
        if (!item || !this.exchangeRate) return 0;
        return Number((item.sluDamage / this.exchangeRate).toFixed(2));
      },
      set(newValue) {
        const item = this.detailValues.find((el) => el.id === 1);
        if (item && this.exchangeRate) {
          item.sluDamage = parseFloat(newValue) * this.exchangeRate;
        }
      },
    },

    sluBiUSD: {
      get() {
        const item = this.detailValues.find((el) => el.id === 1);
        if (!item || !this.exchangeRate) return 0;
        return Number((item.sluBi / this.exchangeRate).toFixed(2));
      },
      set(newValue) {
        const item = this.detailValues.find((el) => el.id === 1);
        if (item && this.exchangeRate) {
          item.sluBi = parseFloat(newValue) * this.exchangeRate;
        }
      },
    },

    sluStocksUSD: {
      get() {
        const item = this.detailValues.find((el) => el.id === 1);
        if (!item || !this.exchangeRate) return 0;
        return Number((item.sluStocks / this.exchangeRate).toFixed(2));
      },
      set(newValue) {
        const item = this.detailValues.find((el) => el.id === 1);
        if (item && this.exchangeRate) {
          item.sluStocks = parseFloat(newValue) * this.exchangeRate;
        }
      },
    },

    sluTotalUSD: {
      get() {
        return (parseFloat(this.sluDamageUSD || 0) + parseFloat(this.sluBiUSD || 0) + parseFloat(this.sluStocksUSD || 0)).toFixed(2);
      },
      set() {},
    },
  },