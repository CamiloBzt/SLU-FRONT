import Decimal from "@/lib/decimal";
import {
  sluShare,
  calculateProperty,
  calculateTotal,
  calculateNet,
} from "./utils";

/**
 *   tipo de dato para el premium
 *  @typedef  { object } Premium
 *  @property  {number} propertyDamage
 *  @property  {number} businessInterruption
 *  @property  {number} stock
 *  @property  {number} businessInterruptionUsd
 *  @property  {number} propertyDamageUsd
 *  @property  {number} stockUsd
 */

/**
 *  clase para los cálculos de una para una cuenta proportional y non proportional
 */

class NetPremiumNonPro {
  data = {
    damageSluShare: 0,
    damageBrokerage: 0,
    damageTaxes: 0,
    damageEng: 0,
    damageFronting: 0,
    damageColombia: 0,
    damageLTA: 0,
    damageOther: 0,
    damageNet: 0,
    biSluShare: 0,
    biBrokerage: 0,
    biTaxes: 0,
    biEng: 0,
    biFronting: 0,
    biColombia: 0,
    biLTA: 0,
    biOther: 0,
    biNet: 0,
    stocksSluShare: 0,
    stocksBrokerage: 0,
    stocksTaxes: 0,
    stocksEng: 0,
    stocksFronting: 0,
    stocksColombia: 0,
    stocksLTA: 0,
    stocksOther: 0,
    stocksNet: 0,
    sluShareTotal: 0,
    brokerageTotal: 0,
    taxesTotal: 0,
    engTotal: 0,
    colombiaTotal: 0,
    frontingTotal: 0,
    LTATotal: 0,
    otherTotal: 0,
    netTotal: 0,
    //net premium excluding fronting fee
    damageNetPremiumExcludingFronting: 0,
    businessInterNetPremiumExcludingFronting: 0,
    stockNetPremiumExcludingFronting: 0,
    totalNetPremiumExcludingFronting: 0,
    //slu premium to be invoiced
    damageSluPremiumToBeInvoiced: 0,
    businessInterSluPremiumToBeInvoiced: 0,
    stockSluPremiumToBeInvoiced: 0,
    totalSluPremiumToBeInvoiced: 0,
  };

  /**
   * @constructor
   * @param {Premium}  premium información del apartado de tiv  premium
   * @param {object}  deductions información de quotation
   * @param {number}  sluLine
   * @param {boolean}  usd tipo de moneda
   */
  constructor(premium, deductions, sluLine, usd) {
    this.premium = premium;
    this.deductions = deductions;
    this.sluLine = sluLine;
    this.usd = usd;
  }

  damageSluShare() {
    const value =
      (!this.usd
        ? this.premium.propertyDamage
        : this.premium.propertyDamageUsd) || 0;
    const result = sluShare(this.sluLine, value);
    this.data.damageSluShare = result;
    return result;
  }

  damageBrokerage() {
    const sluShare = this.damageSluShare();
    const result = calculateProperty(this.deductions.brokerage, sluShare);

    this.data.damageBrokerage = result;
    return result;
  }

  damageTaxes() {
    const sluShare = this.damageSluShare();
    const result = calculateProperty(this.deductions.taxes, sluShare);

    this.data.damageTaxes = result;
    return result;
  }

  damageEng() {
    const sluShare = this.damageSluShare();
    const result = calculateProperty(this.deductions.eng, sluShare);

    this.data.damageEng = result;
    return result;
  }

  damageFronting() {
    const sluShare = Decimal.sub(this.damageSluShare(), this.damageBrokerage())
      .sub(this.damageTaxes())
      .sub(this.damageLTA())
      .sub(this.damageOther());

    const result = calculateProperty(this.deductions.fronting, sluShare);

    this.data.damageFronting = result;
    return result;
  }

  damageColombia() {
    const sluShare = this.damageSluShare();
    const result = calculateProperty(this.deductions.premiumReserve, sluShare);

    this.data.damageColombia = result;
    return result;
  }

  damageLTA() {
    const sluShare = this.damageSluShare();
    const result = calculateProperty(this.deductions.lta, sluShare);

    this.data.damageLTA = result;
    return result;
  }

  damageOther() {
    const sluShare = this.damageSluShare();
    const result = calculateProperty(this.deductions.others, sluShare);

    this.data.damageOther = result;
    return result;
  }

  biSluShare() {
    const value = !this.usd
      ? this.premium.businessInterruption
      : this.premium.businessInterruptionUsd;
    const result = sluShare(this.sluLine, value);
    this.data.biSluShare = result;
    return result;
  }

  biBrokerage() {
    const sluShare = this.biSluShare();
    const result = calculateProperty(this.deductions.brokerage, sluShare);

    this.data.biBrokerage = result;
    return result;
  }

  biTaxes() {
    const sluShare = this.biSluShare();
    const result = calculateProperty(this.deductions.taxes, sluShare);

    this.data.biTaxes = result;
    return result;
  }

  biEng() {
    const sluShare = this.biSluShare();
    const result = calculateProperty(this.deductions.eng, sluShare);

    this.data.biEng = result;
    return result;
  }

  biFronting() {
    const sluShare = Decimal.sub(this.biSluShare(), this.biBrokerage())
      .sub(this.biTaxes())
      .sub(this.biLTA())
      .sub(this.biOther());
    const result = calculateProperty(this.deductions.fronting, sluShare);

    this.data.biFronting = result;
    return result;
  }

  biColombia() {
    const sluShare = this.biSluShare();
    const result = calculateProperty(this.deductions.premiumReserve, sluShare);

    this.data.biColombia = result;
    return result;
  }

  biLTA() {
    const sluShare = this.biSluShare();
    const result = calculateProperty(this.deductions.lta, sluShare);

    this.data.biLTA = result;
    return result;
  }

  biOther() {
    const sluShare = this.biSluShare();
    const result = calculateProperty(this.deductions.others, sluShare);

    this.data.biOther = result;
    return result;
  }

  stocksSluShare() {
    const value = !this.usd ? this.premium.stock : this.premium.stockUsd;
    const result = sluShare(this.sluLine, value);
    this.data.stocksSluShare = result;
    return result;
  }

  stocksBrokerage() {
    const sluShare = this.stocksSluShare();
    const result = calculateProperty(this.deductions.brokerage, sluShare);

    this.data.stocksBrokerage = result;
    return result;
  }

  stocksTaxes() {
    const sluShare = this.stocksSluShare();
    const result = calculateProperty(this.deductions.taxes, sluShare);

    this.data.stocksTaxes = result;
    return result;
  }

  stocksEng() {
    const sluShare = this.stocksSluShare();
    const result = calculateProperty(this.deductions.eng, sluShare);

    this.data.stocksEng = result;
    return result;
  }

  stocksFronting() {
    const sluShare = Decimal.sub(this.stocksSluShare(), this.stocksBrokerage())
      .sub(this.stocksTaxes())
      .sub(this.stocksLTA())
      .sub(this.stocksOther());
    const result = calculateProperty(this.deductions.fronting, sluShare);

    this.data.stocksFronting = result;
    return result;
  }

  stocksColombia() {
    const sluShare = this.stocksSluShare();
    const result = calculateProperty(this.deductions.premiumReserve, sluShare);

    this.data.stocksColombia = result;
    return result;
  }

  stocksLTA() {
    const sluShare = this.stocksSluShare();
    const result = calculateProperty(this.deductions.lta, sluShare);

    this.data.stocksLTA = result;
    return result;
  }

  stocksOther() {
    const sluShare = this.stocksSluShare();
    const result = calculateProperty(this.deductions.others, sluShare);

    this.data.stocksOther = result;
    return result;
  }

  //net premium
  damageNet() {
    const result = calculateNet(
      {
        initialValue: this.damageSluShare(),
        returners: [
          this.damageBrokerage(),
          this.damageTaxes(),
          this.damageLTA(),
          this.damageOther(),
        ],
      },
      this.deductions.deductionType
    );

    this.data.damageNet = result;
    return result;
  }

  biNet() {
    const result = calculateNet(
      {
        initialValue: this.biSluShare(),
        returners: [
          this.biBrokerage(),
          this.biTaxes(),
          this.biLTA(),
          this.biOther(),
        ],
      },
      this.deductions.deductionType
    );

    this.data.biNet = result;
    return result;
  }

  stocksNet() {
    const result = calculateNet(
      {
        initialValue: this.stocksSluShare(),
        returners: [
          this.stocksBrokerage(),
          this.stocksTaxes(),
          this.stocksLTA(),
          this.stocksOther(),
        ],
      },
      this.deductions.deductionType
    );

    this.data.stocksNet = result;
    return result;
  }

  //Net premium excluding fronting
  damageNetPremiumExcludingFronting() {
    const result = calculateNet(
      {
        initialValue: this.damageSluShare(),
        returners: [
          this.damageBrokerage(),
          this.damageTaxes(),
          this.damageLTA(),
          this.damageOther(),
          this.damageFronting(),
        ],
      },
      this.deductions.deductionType
    );

    this.data.damageNetPremiumExcludingFronting = result;
    return result;
  }

  businessInterNetPremiumExcludingFronting() {
    const result = calculateNet(
      {
        initialValue: this.biSluShare(),
        returners: [
          this.biBrokerage(),
          this.biTaxes(),
          this.biLTA(),
          this.biOther(),
          this.biFronting(),
        ],
      },
      this.deductions.deductionType
    );

    this.data.businessInterNetPremiumExcludingFronting = result;
    return result;
  }

  stockNetPremiumExcludingFronting() {
    const result = calculateNet(
      {
        initialValue: this.stocksSluShare(),
        returners: [
          this.stocksBrokerage(),
          this.stocksTaxes(),
          this.stocksLTA(),
          this.stocksOther(),
          this.stocksFronting(),
        ],
      },
      this.deductions.deductionType
    );

    this.data.stockNetPremiumExcludingFronting = result;
    return result;
  }

  //SLU Premium to be invoiced

  damageSluPremiumToBeInvoiced() {
    const result = Decimal.sub(
      this.damageNet(),
      this.damageColombia()
    ).toNumber();
    this.data.damageSluPremiumToBeInvoiced = result;
    return result;
  }

  businessInterSluPremiumToBeInvoiced() {
    const result = Decimal.sub(this.biNet(), this.biColombia()).toNumber();
    this.data.businessInterSluPremiumToBeInvoiced = result;
    return result;
  }

  stockSluPremiumToBeInvoiced() {
    const result = Decimal.sub(
      this.stocksNet(),
      this.stocksColombia()
    ).toNumber();
    this.data.stockSluPremiumToBeInvoiced = result;
    return result;
  }

  //totales
  sluShareTotal() {
    const { format, result } = calculateTotal(
      this.damageSluShare(),
      this.biSluShare(),
      this.stocksSluShare()
    );
    this.data.sluShareTotal = result;
    return format;
  }

  brokerageTotal() {
    const { format, result } = calculateTotal(
      this.damageBrokerage(),
      this.biBrokerage(),
      this.stocksBrokerage()
    );
    this.data.brokerageTotal = result;
    return format;
  }

  taxesTotal() {
    const { format, result } = calculateTotal(
      this.damageTaxes(),
      this.biTaxes(),
      this.stocksTaxes()
    );
    this.data.taxesTotal = result;
    return format;
  }

  engTotal() {
    const { format, result } = calculateTotal(
      this.damageEng(),
      this.biEng(),
      this.stocksEng()
    );
    this.data.engTotal = result;
    return format;
  }

  frontingTotal() {
    const { format, result } = calculateTotal(
      this.damageFronting(),
      this.biFronting(),
      this.stocksFronting()
    );
    this.data.frontingTotal = result;
    return format;
  }

  colombiaTotal() {
    const { format, result } = calculateTotal(
      this.damageColombia(),
      this.biColombia(),
      this.stocksColombia()
    );
    this.data.colombiaTotal = result;
    return format;
  }

  LTATotal() {
    const { format, result } = calculateTotal(
      this.damageLTA(),
      this.biLTA(),
      this.stocksLTA()
    );
    this.data.LTATotal = result;
    return format;
  }

  otherTotal() {
    const { format, result } = calculateTotal(
      this.damageOther(),
      this.biOther(),
      this.stocksOther()
    );
    this.data.otherTotal = result;
    return format;
  }

  netTotal() {
    const { format, result } = calculateTotal(
      this.damageNet(),
      this.biNet(),
      this.stocksNet()
    );
    this.data.netTotal = result;
    return format;
  }

  totalNetPremiumExcludingFronting() {
    const { format, result } = calculateTotal(
      this.damageNetPremiumExcludingFronting(),
      this.businessInterNetPremiumExcludingFronting(),
      this.stockNetPremiumExcludingFronting()
    );
    this.data.totalNetPremiumExcludingFronting = result;
    return format;
  }

  totalSluPremiumToBeInvoiced() {
    const { format, result } = calculateTotal(
      this.damageSluPremiumToBeInvoiced(),
      this.businessInterSluPremiumToBeInvoiced(),
      this.stockSluPremiumToBeInvoiced()
    );
    this.data.totalSluPremiumToBeInvoiced = result;
    return format;
  }

  getData() {
    return this.data;
  }
}

export default NetPremiumNonPro;
