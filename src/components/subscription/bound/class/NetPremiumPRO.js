/* libs */
import Decimal from "@/lib/decimal";
import numeral from "numeral";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//TODO:factorizar código

/**
 * clase para hacer cálculos de los net premium en usd y original currency
 */

class NetPremiumPROStrategy {
  /**
   *
   * @param {valores de premium del la vuex} premium
   * @param {valores de deductions de la vuex} deductions
   * @param {valores de boundInsurableProp de la vuex} boundInsurableProp
   * @param {ver datos en dólares} usd
   */
  constructor(premium, deductions, boundInsurableProp, usd = false) {
    this.premium = premium;
    this.deductions = deductions;
    this.boundInsurableProp = boundInsurableProp;
    this.usd = usd;
    this.data = {
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
  }

  /// Damage métodos
  damageSluShare() {
    const sluLine = this.boundInsurableProp.sluLine || 0;
    const percentage = Decimal.div(sluLine, 100);
    const value =
      (this.usd
        ? this.premium.propertyDamageUsd
        : this.premium.propertyDamage) || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    //guardado del calculo para enviar a base de datos
    this.data.damageSluShare = op.toNumber();
    return op.toNumber();
  }

  damageBrokerage() {
    const brokerage = this.deductions.brokerage || 0;
    const percentage = Decimal.div(brokerage, 100);
    const value = this.damageSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageBrokerage = op.toNumber();
    return op.toNumber();
  }

  damageTaxes() {
    const taxes = this.deductions.taxes || 0;
    const percentage = Decimal.div(taxes, 100);
    const value = this.damageSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageTaxes = op.toNumber();
    return op.toNumber();
  }

  damageEng() {
    const eng = this.deductions.eng || 0;
    const percentage = Decimal.div(eng, 100);
    const value = this.damageSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageEng = op.toNumber();
    return op.toNumber();
  }

  damageFronting() {
    const fronting = this.deductions.fronting || 0;
    const percentage = Decimal.div(fronting, 100);
    const operation = Decimal.sub(this.damageSluShare(), this.damageBrokerage())
      .sub(this.damageTaxes())
      .sub(this.damageLTA())
      .sub(this.damageOther());
    const op = Decimal.mul(
      operation,
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageFronting = op.toNumber();
    return op.toNumber();
  }

  damageColombia() {
    const premiumReserve = this.deductions.premiumReserve || 0;
    const percentage = Decimal.div(premiumReserve, 100);
    const value = this.damageSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageColombia = op.toNumber();
    return op.toNumber();
  }

  damageLTA() {
    const lta = this.deductions.lta || 0;
    const percentage = Decimal.div(lta, 100);
    const value = this.damageSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageLTA = op.toNumber();
    return op.toNumber();
  }

  damageOther() {
    const others = this.deductions.others || 0;
    const percentage = Decimal.div(others, 100);
    const value = this.damageSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.damageOther = op.toNumber();
    return op.toNumber();
  }

  damageNet() {
    let op;
    if (this.deductions.deductionType == "As incurred") {
      op = Decimal.sub(this.damageSluShare(), this.damageBrokerage())
        .sub(this.damageTaxes())
        .sub(this.damageLTA())
        .sub(this.damageOther());
      this.data.damageNet = op.toNumber();
      return op.toNumber();
    }
    op = Decimal.sub(this.damageSluShare(), this.damageBrokerage())
      .sub(this.damageTaxes())
      .sub(this.damageEng())
      .sub(this.damageLTA())
      .sub(this.damageOther());
    this.data.damageNet = op.toNumber();
    return op.toNumber();
  }

  /// Bi métodos

  biSluShare() {
    const sluLine = this.boundInsurableProp.sluLine || 0;
    const percentage = Decimal.div(sluLine, 100);
    const value =
      (this.usd
        ? this.premium.businessInterruptionUsd
        : this.premium.businessInterruption) || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );
    this.data.biSluShare = op.toNumber();
    return op.toNumber();
  }

  biBrokerage() {
    const brokerage = this.deductions.brokerage || 0;
    const percentage = Decimal.div(brokerage, 100);
    const value = this.biSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.biBrokerage = op.toNumber();
    return op.toNumber();
  }

  biTaxes() {
    const taxes = this.deductions.taxes || 0;
    const percentage = Decimal.div(taxes, 100);
    const value = this.biSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.biTaxes = op.toNumber();
    return op.toNumber();
  }

  biEng() {
    const eng = this.deductions.eng || 0;
    const percentage = Decimal.div(eng, 100);
    const value = this.biSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.biEng = op.toNumber();
    return op.toNumber();
  }

  biColombia() {
    const premiumReserve = this.deductions.premiumReserve || 0;
    const percentage = Decimal.div(premiumReserve, 100);
    const value = this.biSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.biColombia = op.toNumber();
    return op.toNumber();
  }

  biFronting() {
    const fronting = this.deductions.fronting || 0;
    const percentage = Decimal.div(fronting, 100);
    const operation = Decimal.sub(this.biSluShare(), this.biBrokerage())
      .sub(this.biTaxes())
      .sub(this.biLTA())
      .sub(this.biOther());
    const op = Decimal.mul(
      operation,
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );
    this.data.biFronting = op.toNumber();
    return op.toNumber();
  }

  biLTA() {
    const lta = this.deductions.lta || 0;
    const percentage = Decimal.div(lta, 100);
    const value = this.biSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.biLTA = op.toNumber();
    return op.toNumber();
  }

  biOther() {
    const others = this.deductions.others || 0;
    const percentage = Decimal.div(others, 100);
    const value = this.biSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.biOther = op.toNumber();
    return op.toNumber();
  }

  biNet() {
    let op;
    if (this.deductions.deductionType == "As incurred") {
      op = Decimal.sub(this.biSluShare(), this.biBrokerage())
        .sub(this.biTaxes())
        .sub(this.biLTA())
        .sub(this.biOther());
      return op.toNumber();
    }
    op = Decimal.sub(this.biSluShare(), this.biBrokerage())
      .sub(this.biTaxes())
      .sub(this.biEng())
      .sub(this.biLTA())
      .sub(this.biOther());

    this.data.biNet = op.toNumber();
    return op.toNumber();
  }

  //stock métodos
  stocksSluShare() {
    const sluLine = this.boundInsurableProp.sluLine || 0;
    const percentage = Decimal.div(sluLine, 100);
    const value = (this.usd ? this.premium.stockUsd : this.premium.stock) || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksSluShare = op.toNumber();
    return op.toNumber();
  }

  stocksBrokerage() {
    const brokerage = this.deductions.brokerage || 0;
    const percentage = Decimal.div(brokerage, 100);
    const value = this.stocksSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksBrokerage = op.toNumber();
    return op.toNumber();
  }

  stocksTaxes() {
    const taxes = this.deductions.taxes || 0;
    const percentage = Decimal.div(taxes, 100);
    const value = this.stocksSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksTaxes = op.toNumber();
    return op.toNumber();
  }

  stocksEng() {
    const eng = this.deductions.eng || 0;
    const percentage = Decimal.div(eng, 100);
    const value = this.stocksSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksEng = op.toNumber();
    return op.toNumber();
  }

  stocksFronting() {
    const fronting = this.deductions.fronting || 0;
    const percentage = Decimal.div(fronting, 100);
    const operation = Decimal.sub(this.stocksSluShare(), this.stocksBrokerage())
      .sub(this.stocksTaxes())
      .sub(this.stocksLTA())
      .sub(this.stocksOther());
    const op = Decimal.mul(
      operation,
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );
    this.data.stocksFronting = op.toNumber();
    return op.toNumber();
  }

  stocksColombia() {
    const premiumReserve = this.deductions.premiumReserve || 0;
    const percentage = Decimal.div(premiumReserve, 100);
    const value = this.stocksSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksColombia = op.toNumber();
    return op.toNumber();
  }

  stocksLTA() {
    const lta = this.deductions.lta || 0;
    const percentage = Decimal.div(lta, 100);
    const value = this.stocksSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksLTA = op.toNumber();
    return op.toNumber();
  }

  stocksOther() {
    const others = this.deductions.others || 0;
    const percentage = Decimal.div(others, 100);
    const value = this.stocksSluShare() || 0;

    const op = Decimal.mul(
      numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0,
      numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0
    );

    this.data.stocksOther = op.toNumber();
    return op.toNumber();
  }

  stocksNet() {
    let op;
    if (this.deductions.deductionType == "As incurred") {
      op = Decimal.sub(this.stocksSluShare(), this.stocksBrokerage())
        .sub(this.stocksTaxes())
        .sub(this.stocksLTA())
        .sub(this.stocksOther());
      this.data.stocksNet = op.toNumber();
      return op.toNumber();
    }
    op = Decimal.sub(this.stocksSluShare(), this.stocksBrokerage())
      .sub(this.stocksTaxes())
      .sub(this.stocksEng())
      .sub(this.stocksLTA())
      .sub(this.stocksOther());

    this.data.stocksNet = op.toNumber();
    return op.toNumber();
  }

  sluShareTotal() {
    const sum = Decimal.sum(
      this.damageSluShare(),
      this.biSluShare(),
      this.stocksSluShare()
    );

    this.data.sluShareTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  brokerageTotal() {
    const sum = Decimal.sum(
      this.damageBrokerage(),
      this.biBrokerage(),
      this.stocksBrokerage()
    );

    this.data.brokerageTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  taxesTotal() {
    const sum = Decimal.sum(
      this.damageTaxes(),
      this.biTaxes(),
      this.stocksTaxes()
    );

    this.data.taxesTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  engTotal() {
    const sum = Decimal.sum(this.damageEng(), this.biEng(), this.stocksEng());

    this.data.engTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  frontingTotal() {
    const sum = Decimal.sum(
      this.damageFronting(),
      this.biFronting(),
      this.stocksFronting()
    );

    this.data.frontingTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  colombiaTotal() {
    const sum = Decimal.sum(
      this.damageColombia(),
      this.biColombia(),
      this.stocksColombia()
    );

    this.data.colombiaTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  LTATotal() {
    const sum = Decimal.sum(this.damageLTA(), this.biLTA(), this.stocksLTA());

    this.data.LTATotal = sum.toNumber();
    return formatter.format(sum);
  }

  otherTotal() {
    const sum = Decimal.sum(
      this.damageOther(),
      this.biOther(),
      this.stocksOther()
    );

    this.data.otherTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  netTotal() {
    const sum = Decimal.sum(this.damageNet(), this.biNet(), this.stocksNet());

    this.data.netTotal = sum.toNumber();
    return formatter.format(sum.toNumber());
  }

  //apartado de Net premium excluding fronting

  /**
   * regresa Net premium excluding fronting de la parte de damage
   * @returns {number}
   */
  damageNetPremiumExcludingFronting() {
    let op = Decimal.sub(this.damageSluShare(), this.damageBrokerage())
      .sub(this.damageTaxes())
      .sub(this.damageFronting())
      .sub(this.damageLTA())
      .sub(this.damageOther())
      .toNumber();

    if (this.deductions.deductionType === "At inception") {
      op = Decimal.sub(op, this.damageEng()).toNumber();
    }

    this.data.damageNetPremiumExcludingFronting = op;
    return op;
  }

  /**
   * regresa Net premium excluding fronting de la parte de business interruption
   * @returns {number}
   */
  businessInterNetPremiumExcludingFronting() {
    let op = Decimal.sub(this.biSluShare(), this.biBrokerage())
      .sub(this.biTaxes())
      .sub(this.biFronting())
      .sub(this.biLTA())
      .sub(this.biOther())
      .toNumber();

    if (this.deductions.deductionType === "At inception") {
      op = Decimal.sub(op, this.biEng()).toNumber();
    }

    this.data.businessInterNetPremiumExcludingFronting = op;
    return op;
  }

  /**
   * regresa Net premium excluding fronting de la parte de stock
   * @returns {number}
   */
  stockNetPremiumExcludingFronting() {
    let op = Decimal.sub(this.stocksSluShare(), this.stocksBrokerage())
      .sub(this.stocksTaxes())
      .sub(this.stocksFronting())
      .sub(this.stocksLTA())
      .sub(this.stocksOther())
      .toNumber();

    if (this.deductions.deductionType === "At inception") {
      op = Decimal.sub(op, this.stocksEng()).toNumber();
    }

    this.data.stockNetPremiumExcludingFronting = op;
    return op;
  }

  /**
   * regresa la suma de damageNetPremiumExcludingFronting, businessInterNetPremiumExcludingFronting
   * y stockNetPremiumExcludingFronting esto es el total del net premium excluding fronting
   * @returns {string}
   */
  totalNetPremiumExcludingFronting() {
    const sum = Decimal.sum(
      this.damageNetPremiumExcludingFronting(),
      this.businessInterNetPremiumExcludingFronting(),
      this.stockNetPremiumExcludingFronting()
    ).toNumber();

    const value = formatter.format(sum);
    this.data.totalNetPremiumExcludingFronting = sum;
    return value;
  }

  //apartado del SLU premium to be invoiced

  /**
   * regresa el premium to be invoiced de la parte de damage
   * @returns {number}
   */
  damageSluPremiumToBeInvoiced() {
    const op = this.damageNet();
    this.data.damageSluPremiumToBeInvoiced = op;
    return op;
  }

  /**
   * regresa el premium to be invoiced de la parte de business interruption
   * @returns {number}
   */
  businessInterSluPremiumToBeInvoiced() {
    const op = this.biNet();
    this.data.businessInterSluPremiumToBeInvoiced = op;
    return op;
  }

  /**
   * regresa el premium to be invoiced de la parte de business stock
   * @returns {number}
   */
  stockSluPremiumToBeInvoiced() {
    const op = this.stocksNet();

    this.data.stockSluPremiumToBeInvoiced = op;
    return op;
  }

  /**
   * regresa la suma de damageSluPremiumToBeInvoiced, businessInterSluPremiumToBeInvoiced
   * y stockSluPremiumToBeInvoiced. Esto es el total de slu premium to be invoiced
   * @returns {number}
   */
  totalSluPremiumToBeInvoiced() {
    const sum = Decimal.sum(
      this.damageSluPremiumToBeInvoiced(),
      this.businessInterSluPremiumToBeInvoiced(),
      this.stockSluPremiumToBeInvoiced()
    ).toNumber();

    const value = formatter.format(sum);
    this.data.totalSluPremiumToBeInvoiced = sum;
    return value;
  }

  getData() {
    return this.data;
  }
}

export default NetPremiumPROStrategy;
