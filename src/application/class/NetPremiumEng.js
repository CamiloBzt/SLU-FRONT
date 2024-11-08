/**libs*/
import Decimal from "@/lib/decimal";
import { sluShare, calculateProperty, calculateTotal } from "./utils";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 *   tipo de dato para el premium
 *  @typedef  { object } Premium
 *  @property  {number} allRisk
 *  @property  {number} alop
 *  @property  {number} allRiskUsd
 *  @property  {number} alopUsd
 */

/**
* genera todos los cálculos necesarios para net premium eng 
  esta clase es un adaptación para darle para cambiar nombres a los apartado que
  le corresponde a un cuenta engineering
*/
class NetPremiumEng {
  data = {
    allRiskSluShare: 0,
    allRiskBrokerage: 0,
    allRiskTaxes: 0,
    allRiskEng: 0,
    allRiskFronting: 0,
    allRiskColombia: 0,
    allRiskNetSLUExcludingSurveyFees: 0,
    alopSluShare: 0,
    alopBrokerage: 0,
    alopTaxes: 0,
    alopEng: 0,
    alopFronting: 0,
    alopColombia: 0,
    alopNetSLUExcludingSurveyFees: 0,
    sluShareTotal: 0,
    brokerageTotal: 0,
    taxesTotal: 0,
    engTotal: 0,
    colombiaTotal: 0,
    frontingTotal: 0,
    netSLUExcludingSurveyFeesTotal: 0,
  };

  /**
   * @constructor
   * @param {Premium}  premium información del apartado de tiv  premium
   * @param {object}  deductions información de quotation
   * @param {number}  sluLine
   * @param {boolean}  usd tipo de moneda
   */

  constructor(premium, deductions, sluLine, usd) {
    /**
     *  @type {Premium}
     */
    this.premium = premium;
    this.usd = usd;
    this.sluLine = sluLine;
    this.deductions = deductions;
  }

  //Sección de all risk
  allRiskSluShare() {
    const value = !this.usd ? this.premium.allRisk : this.premium.allRiskUsd;
    const result = sluShare(this.sluLine, value);
    this.data.allRiskSluShare = result;
    return result;
  }

  allRiskBrokerage() {
    const sluShare = this.allRiskSluShare();
    const result = calculateProperty(this.deductions.brokerage, sluShare);

    this.data.allRiskBrokerage = result;
    return result;
  }

  allRiskTaxes() {
    const sluShare = this.allRiskSluShare();
    const result = calculateProperty(this.deductions.taxes, sluShare);

    this.data.allRiskTaxes = result;
    return result;
  }

  allRiskEng() {
    const sluShare = this.allRiskSluShare();
    const result = calculateProperty(this.deductions.eng, sluShare);

    this.data.allRiskEng = result;
    return result;
  }
  allRiskLta() {
    const sluShare = this.allRiskSluShare();
    const result = calculateProperty(this.deductions.lta, sluShare);

    this.data.allRiskLta = result;
    return result;
  }
  allRiskOthers() {
    const sluShare = this.allRiskSluShare();
    const result = calculateProperty(this.deductions.others, sluShare);

    this.data.allRiskOthers = result;
    return result;
  }

  allRiskFronting() {
    const value = Decimal.sub(this.allRiskSluShare(), this.allRiskBrokerage())
      .sub(this.allRiskTaxes())
      .sub(this.allRiskLta())
      .sub(this.allRiskOthers())
      .toNumber();
    const result = calculateProperty(this.deductions.fronting, value);
    this.data.allRiskFronting = result;
    return result;
  }
  allRiskColombia() {
    const sluShare = this.allRiskSluShare();
    const result = calculateProperty(this.deductions.premiumReserve, sluShare);

    this.data.allRiskColombia = result;
    return result;
  }

  //Sección de OLAP
  alopSluShare() {
    const value = !this.usd ? this.premium.alop : this.premium.alopUsd;
    const result = sluShare(this.sluLine, value);
    this.data.alopSluShare = result;
    return result;
  }

  alopBrokerage() {
    const sluShare = this.alopSluShare();
    const value = calculateProperty(this.deductions.brokerage, sluShare);
    this.data.alopBrokerage = value;
    return value;
  }

  alopTaxes() {
    const sluShare = this.alopSluShare();
    const value = calculateProperty(this.deductions.taxes, sluShare);
    this.data.alopTaxes = value;
    return value;
  }

  alopEng() {
    const sluShare = this.alopSluShare();
    const value = calculateProperty(this.deductions.eng, sluShare);
    this.data.alopFronting = value;
    return value;
  }

  alopFronting() {
    const value = Decimal.sub(this.alopSluShare(), this.alopBrokerage())
      .sub(this.alopTaxes())
      .toNumber();
    const result = calculateProperty(this.deductions.fronting, value);
    this.data.alopFronting = result;
    return result;
  }

  alopColombia() {
    const sluShare = this.alopSluShare();
    const value = calculateProperty(this.deductions.premiumReserve, sluShare);
    this.data.alopColombia = value;
    return value;
  }

  //Apartado de para calcular las  net to slu excluding survey fee
  alopNetSLUExcludingSurveyFees() {
    const value = Decimal.sub(this.alopSluShare(), this.alopBrokerage())
      .sub(this.alopTaxes())
      .sub(this.alopEng())
      .sub(this.alopFronting())
      .sub(this.alopColombia())
      .toNumber();

    this.data.alopNetSLUExcludingSurveyFees = value;
    return value;
  }

  allRiskNetSLUExcludingSurveyFees() {
    const value = Decimal.sub(
      this.allRiskNetSLU(),
      this.allRiskColombia()
    ).toNumber();

    this.data.allRiskNetSLUExcludingSurveyFees = value;
    return value;
  }

  //suma de totales
  sluShareTotal() {
    const { format, result } = calculateTotal(
      this.allRiskSluShare(),
      this.alopSluShare()
    );

    this.data.sluShareTotal = result;
    return format;
  }

  brokerageTotal() {
    const { format, result } = calculateTotal(
      this.allRiskBrokerage(),
      this.alopBrokerage()
    );
    this.data.brokerageTotal = result;
    return format;
  }

  taxesTotal() {
    const { format, result } = calculateTotal(
      this.allRiskTaxes(),
      this.alopTaxes()
    );
    this.data.taxesTotal = result;
    return format;
  }

  engTotal() {
    const { format, result } = calculateTotal(
      this.allRiskEng(),
      this.alopEng()
    );
    this.data.engTotal = result;
    return format;
  }

  colombiaTotal() {
    const { format, result } = calculateTotal(
      this.allRiskColombia(),
      this.alopColombia()
    );
    this.data.colombiaTotal = result;
    return format;
  }

  frontingTotal() {
    const { format, result } = calculateTotal(
      this.allRiskFronting(),
      this.alopFronting()
    );
    this.data.frontingTotal = result;
    return format;
  }

  netSLUExcludingSurveyFeesTotal() {
    const { format, result } = calculateTotal(
      this.allRiskNetSLUExcludingSurveyFees(),
      this.alopNetSLUExcludingSurveyFees()
    );
    this.data.netSLUExcludingSurveyFeesTotal = result;
    return format;
  }
  allRiskNetSLU() {
    const value = Decimal.sub(this.allRiskSluShare(), this.allRiskBrokerage())
      .sub(this.allRiskTaxes())
      .sub(this.allRiskLta())
      .sub(this.allRiskOthers())
      .toNumber();
    return value;
  }
  alopNetSLU() {
    const value = Decimal.sub(this.alopSluShare(), this.alopBrokerage())
      .sub(this.alopTaxes())
      .sub(this.alopEng())
      .sub(this.alopFronting())
      .toNumber();

    return value;
  }
  netSLUTotal() {
    const { format, result } = calculateTotal(
      this.allRiskNetSLU(),
      this.alopNetSLU()
    );
    return format;
  }
  allRiskNetSLUExcludingFronting() {
    const value = Decimal.sub(this.allRiskSluShare(), this.allRiskBrokerage())
      .sub(this.allRiskTaxes())
      .sub(this.allRiskFronting())
      .sub(this.allRiskLta())
      .sub(this.allRiskOthers())
      .toNumber();
    return value;
  }
  alopNetSLUExcludingFronting() {
    const value = Decimal.sub(this.alopSluShare(), this.alopBrokerage())
      .sub(this.alopTaxes())
      .sub(this.alopEng())
      .toNumber();
    return value;
  }
  netSLUExcludingFrontingTotal() {
    const { format, result } = calculateTotal(
      this.allRiskNetSLUExcludingFronting(),
      this.alopNetSLUExcludingFronting()
    );
    return format;
  }

  getData() {
    return this.data;
  }
}

export default NetPremiumEng;
