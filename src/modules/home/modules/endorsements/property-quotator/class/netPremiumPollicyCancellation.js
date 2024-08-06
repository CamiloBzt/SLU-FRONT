import Decimal from '@/lib/decimal'
import numeral from 'numeral';
import { sluShare,  calculateProperty, calculateTotal, calculateNet } from '@/application/class/utils'


function calcularPremiumSluCuentaSinEndosos(premiumSlu, daysResult) {
    const diferenciaFechas = daysResult.initialDays;
    const fechaEfectiva = daysResult.endorsementEffetiveDate;
    const resultado = premiumSlu / diferenciaFechas * (daysResult.movementEndDate - fechaEfectiva);
  
    return resultado;
}


function calcularPremiumSluCuentaEndosada(listendorsement=[], premiumSlu, daysResult, concept) {
    let result = 0;
    
    listendorsement.forEach(oldEndorsement => {
        if (oldEndorsement.report.endorsmentReporData) {
            const endorsmentReporData =  oldEndorsement.report.endorsmentReporData;
            const previousPremiumSlu = endorsmentReporData.premium[concept];

            const previousEffetiveDate = new Date(oldEndorsement.effective_date);
            const effetiveDate = (previousEffetiveDate > daysResult.endorsementEffetiveDate) ? previousEffetiveDate : daysResult.endorsementEffetiveDate;
            const previousExpiryDate = new Date(oldEndorsement.AccountComplete.deductibles.expiryDate);

            const differenceDays = Math.round( (previousExpiryDate.getTime() - effetiveDate.getTime() )/ (1000*60*60*24) );

            const calc = (premiumSlu / daysResult.initialDays) * 
            (daysResult.endormentsDays) - premiumSlu + 
            (previousPremiumSlu / daysResult.initialDays) * differenceDays

            if (isNaN(calc)) {
                console.log('Error',{
                    result:calc,
                    premiumSlu,
                    initialDays:daysResult.initialDays,
                    endormentsDays:daysResult.endormentsDays,
                    previousPremiumSlu,
                    differenceDays,
                });
                console.error('oldEndorsement',oldEndorsement);
                throw new Error('El resultado de uno de los calculos fue NaN')

            }

            result += calc;
        }
        
    });

    return result;
}



/**
 *   tipo de dato para el premium 
 *  @typedef  { object } Premium   // tivModificado
 *  @property  {number} propertyDamage
 *  @property  {number} businessInterruption
 *  @property  {number} stock
 *  @property  {number} businessInterruptionUsd
 *  @property  {number} propertyDamageUsd
 *  @property  {number} stockUsd
*/

/**
 *  fechas agregadas en los calculos 
 *  @typedef  { object } Dates  
 *  @property  {Date} effetiveDate
 *  @property  {Date} expiryDate
 *  @property {Date} endormenteffetiveDate
 *  @property {Dat} movementEndDate
*/

/**
 *  clase para los cálculos de una para una cuenta proportional y non proportional 
 */

 export class  netPremiumPollicyCancellation {
     
    data = {
        damagePremiumSlu:0,
        damageBrokerage:0,
        damageTaxes:0,
        damageEng:0,
        damageFronting:0,
        damageColombia:0,
        damageLTA:0,
        damageOther:0,
        damageNet:0,
        biPremiumSlu:0,
        biBrokerage:0,
        biTaxes:0,
        biEng:0, 
        biFronting:0,
        biColombia:0,
        biLTA:0,
        biOther:0,
        biNet:0,
        totalPremiumSlu:0,
        stocksBrokerage:0,
        stocksTaxes:0,
        stocksEng:0,
        stocksFronting:0,
        stocksColombia:0,
        stocksLTA:0,
        stocksOther:0,
        stocksNet:0,
        sluShareTotal:0,
        brokerageTotal:0,
        taxesTotal:0,
        engTotal:0,
        colombiaTotal:0,
        frontingTotal:0,
        LTATotal:0,
        otherTotal:0,
        netTotal:0,
        //net premium excluding fronting fee
        damageNetPremiumExcludingFronting:0,
        businessInterNetPremiumExcludingFronting:0,
        stockNetPremiumExcludingFronting:0,
        totalNetPremiumExcludingFronting:0,
        //slu premium to be invoiced
        damageSluPremiumToBeInvoiced:0,
        businessInterSluPremiumToBeInvoiced:0,
        stockSluPremiumToBeInvoiced:0,
        totalSluPremiumToBeInvoiced:0
    }

    daysResult = {
        initialDays : 0,
        endormentsDays : 0,
        result:1
    }

    premiumIsEdited = {
        // totalPremium
        premiumDamage:false,
        premiumBi:false,
        premiumStocks:false,

        // premiumSlu
        sluDamage:false,
        sluBi:false,
        sluStocks:false,
    }

    premiumDataEdited = {
        // totalPremium
        premiumDamage:0,
        premiumBi:0,
        premiumStocks:0,

        // premiumSlu
        sluDamage:0,
        sluBi:0,
        sluStocks:0,
    }

     /**
   * @constructor
   * @param {Premium}  premium información del apartado de tiv  premium
   * @param {object}   deductions información de quotation
   * @param {number}   sluLine
   * @param {boolean}  usd tipo de moneda 
   * @param {Dates}    dates
   */
    constructor(premium, deductions, sluLine, usd, dates, listendorsement=[],  options = {}){
        this.premium = premium   
        this.deductions = deductions
        this.sluLine = sluLine
        this.usd = usd
        this.listendorsement = listendorsement

        const effetiveDate = new Date(dates.effetiveDate)
        const expiryDate = new Date(dates.expiryDate)
        const endormenteffetiveDate = new Date(dates.endormenteffetiveDate)
        const movementEndDate = new Date(dates.movementEndDate)
        
        const resultInital  = Math.round( (expiryDate.getTime() - effetiveDate.getTime()) / (1000*60*60*24) ) 
        const resultEndorment = Math.round( (movementEndDate.getTime() - endormenteffetiveDate.getTime() )/ (1000*60*60*24) ) 
        this.daysResult = {
            initialDays: resultInital !== 0 ? resultInital : 1,
            endormentsDays:  resultEndorment !==  0 ? resultEndorment : 1,    
            effetiveDate,
            expiryDate,
            endorsementEffetiveDate: endormenteffetiveDate,
            movementEndDate,
        }

        this.premiumIsEdited = {
            ...this.premiumIsEdited,
            ...options.isEdited,
        }

        this.premiumDataEdited = {
            ...this.premiumDataEdited,
            ...options.dataEdited
        }

    }

    totalPremium(){
        // (((( this.premium.stockMovement * this.premium.stockRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays)
        
        const damageTotalPremium = (this.premiumIsEdited.premiumDamage) 
                                    ? this.premiumDataEdited.premiumDamage 
                                    : (((( this.premium.propertyDamageMovement * this.premium.propertyDamageRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);

        const biTotalPremium = (this.premiumIsEdited.premiumBi) 
                                ? this.premiumDataEdited.premiumBi 
                                : (((( this.premium.businessInterruptionMovement * this.premium.businessInterruptionRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);

        const stockTotalPremium = (this.premiumIsEdited.premiumStocks) 
                                ? this.premiumDataEdited.premiumStocks 
                                : (((( this.premium.stockMovement * this.premium.stockRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);
        
        // const damageTotalPremium =(((( this.premium.propertyDamageMovement * this.premium.propertyDamageRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);
        //const biTotalPremium = (((( this.premium.businessInterruptionMovement * this.premium.businessInterruptionRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);
        // const stockTotalPremium = (((( this.premium.stockMovement * this.premium.stockRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);

        this.totalPremiumResult = {
            damageTotalPremium,
            biTotalPremium,
            stockTotalPremium,
            total: (damageTotalPremium+biTotalPremium+stockTotalPremium),
            damageTotalPremiumUsd: damageTotalPremium / this.deductions.exchangeRate,
            biTotalPremiumUsd: biTotalPremium / this.deductions.exchangeRate,
            stockTotalPremiumUsd: stockTotalPremium / this.deductions.exchangeRate,
            totalUsd: (damageTotalPremium+biTotalPremium+stockTotalPremium) / this.deductions.exchangeRate,
        }

        return this.totalPremiumResult
    }





    
    damagePremiumSlu(){ 
         
        if (this.premiumIsEdited.sluDamage) {

            const edited = (!this.usd  
                ? this.premiumDataEdited.sluDamage 
                : ( this.premiumDataEdited.sluDamage / this.deductions.exchangeRate ) ) || 0;

            this.data.damagePremiumSlu = edited;
            return edited;

        }

        const totalPremium = this.totalPremium()

        const value  =  (!this.usd  
            ? totalPremium.damageTotalPremium 
            : totalPremium.damageTotalPremiumUsd ) || 0

        const premiumSlu = sluShare(this.sluLine,value)
        //this.data.damagePremiumSlu = result
        //return result

        if (this.listendorsement.length === 0) {
            const result = calcularPremiumSluCuentaSinEndosos(premiumSlu, this.daysResult)
            this.data.damagePremiumSlu = result
            return result;
        }
        const concept = !this.usd ? 'propertyDamage' : 'propertyDamageUsd'
        const result = calcularPremiumSluCuentaEndosada(this.listendorsement, premiumSlu, this.daysResult, concept);

        this.data.damagePremiumSlu = result
        return result
    }

    damageBrokerage(){
        const sluShare =  this.damagePremiumSlu()
        const result = calculateProperty(this.deductions.brokerage, sluShare)
      
        this.data.damageBrokerage = result
         return result
    }

    damageTaxes(){
        const sluShare =  this.damagePremiumSlu()
        const result = calculateProperty(this.deductions.taxes , sluShare)
      
        this.data.damageTaxes = result
         return result
    }

    damageEng(){
        const sluShare =  this.damagePremiumSlu()
        const result = calculateProperty(this.deductions.eng , sluShare)
      
        this.data.damageEng = result
         return result
    }

    
    damageFronting(){
         const fronting = this.deductions.fronting || 0;
         const percentage = Decimal.div(fronting, 100);
         const damageEng = this.deductions.deductionType === 'As incurred' ? 0 : this.damageEng();
         const operation = Decimal.sub(this.damagePremiumSlu(), this.damageBrokerage()).sub(damageEng).sub(this.damageTaxes());
         const op = Decimal.mul(operation, numeral((`${percentage}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
         const result = op.toNumber();

         this.data.damageFronting = result
         return result
    }

    
    damageColombia(){
        const sluShare =  this.damagePremiumSlu()
        const result = calculateProperty(this.deductions.premiumReserve , sluShare)
      
        this.data.damageColombia = result
         return result
    }

    damageLTA(){
        const sluShare =  this.damagePremiumSlu()
        const result = calculateProperty(this.deductions.lta , sluShare)
      
        this.data.damageLTA = result
         return result
    }

    damageOther(){
        const sluShare =  this.damagePremiumSlu()
        const result = calculateProperty(this.deductions.others , sluShare)
      
        this.data.damageOther = result
         return result
    }

    biPremiumSlu(){

        if (this.premiumIsEdited.sluBi) {

            const edited = (!this.usd  
                ? this.premiumDataEdited.sluBi 
                : ( this.premiumDataEdited.sluBi / this.deductions.exchangeRate ) ) || 0;

            this.data.biPremiumSlu = edited;
            return edited;

        }

        const totalPremium = this.totalPremium()
        const value  =  !this.usd  
        ? totalPremium.biTotalPremium
        : totalPremium.biTotalPremiumUsd
        
        const premiumSlu = sluShare(this.sluLine,value)


        if (this.listendorsement.length === 0) {
            const result = calcularPremiumSluCuentaSinEndosos(premiumSlu, this.daysResult)
            this.data.biPremiumSlu = result
            return result;
        }
        const concept = !this.usd ? 'businessInterruption' : 'businessInterruptionUsd'
        const result = calcularPremiumSluCuentaEndosada(this.listendorsement, premiumSlu, this.daysResult, concept);


        this.data.biPremiumSlu = result
        return result
    }
    
    biBrokerage(){
        const sluShare =  this.biPremiumSlu()
        const result = calculateProperty(this.deductions.brokerage , sluShare)
      
        this.data.biBrokerage = result
         return result
    }

    biTaxes(){
        const sluShare =  this.biPremiumSlu()
        const result = calculateProperty(this.deductions.taxes , sluShare)
      
        this.data.biTaxes = result
         return result
    }

    biEng(){
        const sluShare =  this.biPremiumSlu()
        const result = calculateProperty(this.deductions.eng , sluShare)
      
        this.data.biEng = result
         return result
    }
    
    biFronting(){
        const fronting = this.deductions.fronting || 0;
        const percentage = Decimal.div(fronting, 100);
        const biEng = this.deductions.deductionType === 'As incurred' ? 0 : this.biEng();
        const operation = Decimal.sub(this.biPremiumSlu(), this.biBrokerage()).sub(biEng).sub(this.biTaxes());
        const op = Decimal.mul(operation, numeral((`${percentage}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
        const result = op.toNumber();
      
        this.data.biFronting = result
         return result
    }

    biColombia(){
        const sluShare =  this.biPremiumSlu()
        const result = calculateProperty(this.deductions.premiumReserve , sluShare)
      
        this.data.biColombia = result
         return result
    }

    biLTA(){
        const sluShare =  this.biPremiumSlu()
        const result = calculateProperty(this.deductions.lta , sluShare)
      
        this.data.biLTA = result
         return result
    }

    biOther(){
        const sluShare =  this.biPremiumSlu()
        const result = calculateProperty(this.deductions.others , sluShare)
      
        this.data.biOther = result
         return result
    }

    stocksPremiumSlu(){

        if (this.premiumIsEdited.sluStocks) {

            const edited = (!this.usd  
                ? this.premiumDataEdited.sluStocks 
                : ( this.premiumDataEdited.sluStocks / this.deductions.exchangeRate ) ) || 0;

            this.data.stocksPremiumSlu = edited;
            return edited;

        }

        const totalPremium = this.totalPremium()
        const value  =  !this.usd  
        ? totalPremium.stockTotalPremium
        : totalPremium.stockTotalPremium
        const premiumSlu = sluShare(this.sluLine,value)


        if (this.listendorsement.length === 0) {
            const result = calcularPremiumSluCuentaSinEndosos(premiumSlu, this.daysResult)
            this.data.damagePremiumSlu = result
            return result;
        }
        const concept = !this.usd ? 'stock' : 'stockUsd'
        const result = calcularPremiumSluCuentaEndosada(this.listendorsement, premiumSlu, this.daysResult, concept);

        
        this.data.stocksPremiumSlu = result
        return result
    }

    stocksBrokerage(){
        const sluShare =  this.stocksPremiumSlu()
        const result = calculateProperty(this.deductions.brokerage , sluShare)
      
        this.data.stocksBrokerage = result
         return result
    }

    stocksTaxes(){
        const sluShare =  this.stocksPremiumSlu()
        const result = calculateProperty(this.deductions.taxes , sluShare)
      
        this.data.stocksTaxes = result
         return result
    }

    stocksEng(){
        const sluShare =  this.stocksPremiumSlu()
        const result = calculateProperty(this.deductions.eng , sluShare)
      
        this.data.stocksEng = result
        return result
    }

    stocksFronting(){
        const fronting = this.deductions.fronting || 0;
        const percentage = Decimal.div(fronting, 100);
        const stocksEng = this.deductions.deductionType === 'As incurred' ? 0 : this.stocksEng();
        const operation = Decimal.sub(this.stocksPremiumSlu(), this.stocksBrokerage()).sub(stocksEng).sub(this.stocksTaxes());
        const op = Decimal.mul(operation, numeral((`${percentage}` || '$0').replace(/[^0-9.]/g, '')).value() || 0);
        const result = op.toNumber();
      
        this.data.stocksFronting = result
        return result
    }

    stocksColombia(){
        const sluShare =  this.stocksPremiumSlu()
        const result = calculateProperty(this.deductions.premiumReserve , sluShare)
      
        this.data.stocksColombia = result
        return result
    }

    stocksLTA(){
        const sluShare =  this.stocksPremiumSlu()
        const result = calculateProperty(this.deductions.lta , sluShare)
      
        this.data.stocksLTA= result
        return result
    }

    stocksOther(){
        const sluShare =  this.stocksPremiumSlu()
        const result = calculateProperty(this.deductions.others , sluShare)
      
        this.data.stocksOther = result
        return result
    }

    //net premium
    damageNet(){
        const result  = calculateNet({
            initialValue: this.damagePremiumSlu(),
            returners:[
                this.damageBrokerage(),
                this.damageTaxes(),
                this.damageLTA(),
                this.damageOther(),
                this.damageFronting()
            ]
        },this.deductions.deductionType , this.damageEng())

        this.data.damageNet = result
        return result
    }

    biNet(){
        const result  = calculateNet({
            initialValue: this.biPremiumSlu(),
            returners:[
                this.biBrokerage(),
                this.biTaxes(),
                this.biLTA(),
                this.biOther(),
                this.biFronting()
            ]
        },this.deductions.deductionType , this.biEng())

        this.data.biNet = result
        return result
    }

    stocksNet(){
        const result  = calculateNet({
            initialValue: this.stocksPremiumSlu(),
            returners:[
                this.stocksBrokerage(),
                this.stocksTaxes(),
                this.stocksLTA(),
                this.stocksOther(),
                this.stocksFronting()
            ]
        },this.deductions.deductionType , this.stocksEng())

        this.data.stocksNet = result
        return result
    }

    //Net premium excluding fronting
    damageNetPremiumExcludingFronting(){
        const result  = calculateNet({
            initialValue: this.damagePremiumSlu(),
            returners:[
                this.damageBrokerage(),
                this.damageTaxes(),
                this.damageLTA(),
                this.damageOther()
            ]
        },this.deductions.deductionType , this.damageEng())

        this.data.damageNetPremiumExcludingFronting = result
        return result
    }

    businessInterNetPremiumExcludingFronting(){
        const result  = calculateNet({
            initialValue: this.biPremiumSlu(),
            returners:[
                this.biBrokerage(),
                this.biTaxes(),
                this.biLTA(),
                this.biOther()
            ]
        },this.deductions.deductionType , this.biEng())

        this.data.businessInterNetPremiumExcludingFronting = result
        return result
    }

    stockNetPremiumExcludingFronting(){
        const result  = calculateNet({
            initialValue: this.stocksPremiumSlu(),
            returners:[
                this.stocksBrokerage(),
                this.stocksTaxes(),
                this.stocksLTA(),
                this.stocksOther()
            ]
        },this.deductions.deductionType , this.stocksEng())

        this.data.stockNetPremiumExcludingFronting = result
        return result
    }

    //SLU Premium to be invoiced

    damageSluPremiumToBeInvoiced(){
        const result  = Decimal.sub(this.damageNet(), this.damageColombia()).toNumber()
        this.data.damageSluPremiumToBeInvoiced = result
        return result
    }

    businessInterSluPremiumToBeInvoiced(){
        const result  = Decimal.sub(this.biNet(), this.biColombia()).toNumber()
        this.data.businessInterSluPremiumToBeInvoiced = result
        return result
    }

    stockSluPremiumToBeInvoiced(){
        const result  = Decimal.sub(this.stocksNet(), this.stocksColombia()).toNumber()
        this.data.stockSluPremiumToBeInvoiced = result
        return result
    }

    //totales
    totalPremiumSlu(){
        const {format , result} = calculateTotal(
            this.damagePremiumSlu(),
            this.biPremiumSlu(),
            this.stocksPremiumSlu(),
        )
        this.data.totalPremiumSlu = result
        return format
    }

    brokerageTotal(){
        const {format , result} = calculateTotal(
            this.damageBrokerage(),
            this.biBrokerage(),
            this.stocksBrokerage(),
        )
        this.data.brokerageTotal = result
        return format
    }

    taxesTotal(){
        const {format , result} = calculateTotal(
            this.damageTaxes(),
            this.biTaxes(),
            this.stocksTaxes(),
        )
        this.data.taxesTotal = result
        return format
    }

    engTotal(){
        const {format , result} = calculateTotal(
            this.damageEng(),
            this.biEng(),
            this.stocksEng(),
        )
        this.data.engTotal = result
        return format
    }

    frontingTotal(){
        const {format , result} = calculateTotal(
            this.damageFronting(),
            this.biFronting(),
            this.stocksFronting(),
        )
        this.data.frontingTotal = result
        return format
    }

    colombiaTotal(){
        const {format , result} = calculateTotal(
            this.damageColombia(),
            this.biColombia(),
            this.stocksColombia(),
        )
        this.data.colombiaTotal = result
        return format
    }

    LTATotal(){
        const {format , result} = calculateTotal(
            this.damageLTA(),
            this.biLTA(),
            this.stocksLTA(),
        )
        this.data.LTATotal = result
        return format
    }

    otherTotal(){
        const {format , result} = calculateTotal(
            this.damageOther(),
            this.biOther(),
            this.stocksOther(),
        )
        this.data.otherTotal = result
        return format
    }

    netTotal(){
       const {format , result} = calculateTotal(
            this.damageNet(),
            this.biNet(),
            this.stocksNet(),
        )
        this.data.netTotal = result
        return format
    }

    totalNetPremiumExcludingFronting(){
        const {format , result} = calculateTotal(
            this.damageNetPremiumExcludingFronting(),
            this.businessInterNetPremiumExcludingFronting(),
            this.stockNetPremiumExcludingFronting(),
        )
        this.data.totalNetPremiumExcludingFronting = result
        return format
    }

    totalSluPremiumToBeInvoiced(){
        const {format , result} = calculateTotal(
            this.damageSluPremiumToBeInvoiced(),
            this.businessInterSluPremiumToBeInvoiced(),
            this.stockSluPremiumToBeInvoiced(),
        )
        this.data.totalSluPremiumToBeInvoiced = result
        return format
    }

    getData(){
        return this.data
    }
}

/**
 * 
 * clase creada para realizar los cálculos de la clase sin tener que correr ejecutar
 * todos uno por uno 
 * @param {object} tivModificado 
 * @param {object} deductions 
 * @param {number} sluLine
 * @param {boolean} usd 
 * @param {Dates} dates
 */

export const netPremiumPollicyCancellationAutoCalcs = async (tivModificado, deductions, sluLine, usd=false, dates, options = {}) => {
    try {
        const netPremium = new netPremiumPollicyCancellation(tivModificado, deductions, sluLine, usd, dates, options);
        
        Object.getOwnPropertyNames (Object.getPrototypeOf (netPremium))
        .filter(propName => (propName !== 'constructor' && typeof netPremium[propName] === 'function'))
        .forEach(async(propName) => await netPremium[propName]());
 
        return netPremium;
    } catch (error) {
        console.log(error)
        const message =  String(error)
        throw new Error(message)
    }
    
}


      /**
       * Ejemplo de uso de netPremiumPollicyCancellation
       * para calculos de endoso  12 
       * 
       * */

      /*
      const tivModificado =  {
        propertyDamageMovement: this.accountComplete.tiv.insurable.propertyDamage,
        businessInterruptionMovement: this.accountComplete.tiv.insurable.businessInterruption,
        stockMovement: this.accountComplete.tiv.insurable.stock,

        propertyDamageRate:this.accountComplete.tiv.premium.propertyDamageRate,
        businessInterruptionRate:this.accountComplete.tiv.premium.businessInterruptionRate,
        stockRate:this.accountComplete.tiv.premium.stockRate,
        stockPercentaje:(this.accountComplete.tiv.premium.stockPercentaje || this.accountComplete.tiv.insurable.porcentaje || 0) /100,
      }

      const dates = {
        effetiveDate:new Date(this.accountComplete.deductibles.inceptionDate).toISOString().substring(0,10),
        expiryDate:new Date(this.accountComplete.deductibles.expiryDate).toISOString().substring(0,10),
        endormenteffetiveDate: new Date (this.effectiveDate),
        movementEndDate:new Date(this.expiryDate),
      }

      const calcTotalPremium = new netPremiumPollicyCancellation(
        tivModificado,
        this.accountComplete.deductibles,
        this.accountComplete.tiv?.boundInsurableProp.sluLine,
        false,
        dates,
        this.listendorsement,
      );

      // Calcula totalPremium
      const totalPremium = calcTotalPremium.totalPremium();

      // Calcula premiumSlu
      const premiumSlu = {
        damagePremiumSlu: calcTotalPremium.damagePremiumSlu(),
        biPremiumSlu: calcTotalPremium.biPremiumSlu(),
        stocksPremiumSlu: calcTotalPremium.stocksPremiumSlu(),
      }

      // Calcula netPremium
      const netPremium = {
        damageNet: calcTotalPremium.damageNet(),
        biNet: calcTotalPremium.biNet(),
        stocksNet: calcTotalPremium.stocksNet(),
      }

      // Imprime los resultados
      console.log({
        totalPremium,
        premiumSlu,
        netPremium,
      });

      */

