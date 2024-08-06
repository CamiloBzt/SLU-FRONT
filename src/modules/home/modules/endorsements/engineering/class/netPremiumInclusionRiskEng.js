import Decimal from '@/lib/decimal'
import { sluShare,  calculateProperty, calculateTotal, calculateNet } from '@/application/class/utils'

export class netPremiumInclusionRiskEng {
    tivMovement;
    deductibles;
    sluLine;
    totalPremium;
    daysResult;
    data = {
        allRiskPremiumSlu:0,
        allRiskBrokerage:0,
        allRiskTaxes:0,
        allRiskEng:0,
        allRiskFronting:0,
        allRiskColombia:0,
        allRiskNetSLUExcludingSurveyFees:0,
        alopPremiumSlu:0,
        alopBrokerage:0,
        alopTaxes:0,
        alopEng:0,
        alopFronting:0,
        alopColombia:0,
        alopNetSLUExcludingSurveyFees:0,
        totalPremiumSlu:0,
        brokerageTotal:0,
        taxesTotal:0,
        engTotal:0,
        colombiaTotal:0,
        frontingTotal:0,
        netSLUExcludingSurveyFeesTotal:0,
    };

    premiumIsEdited = {
        // totalPremium
        premiumAllRisk:false,
        premiumAlop:false,

        // premiumSlu
        sluAllRisk:false,
        sluAlop:false,
    }

    premiumDataEdited = {
        // totalPremium
        premiumAllRisk:0,
        premiumAlop:0,

        // premiumSlu
        sluAllRisk:0,
        sluAlop:0,
    }

    constructor(tivMovement, deductibles, sluLine, usd=false, dates, options = {}){
    
        this.tivMovement = tivMovement;
        this.deductibles = deductibles;
        this.sluLine = sluLine;
        this.usd = usd;

        const effetiveDate = new Date(dates.effetiveDate)
        const expiryDate = new Date(dates.expiryDate)
        const endormenteffetiveDate = new Date(dates.endormenteffetiveDate)
        const movementEndDate = new Date(dates.movementEndDate)

        const resultInital  = Math.round( (expiryDate.getTime() - effetiveDate.getTime()) / (1000*60*60*24) ) 
        const resultEndorment = Math.round( (movementEndDate.getTime() - endormenteffetiveDate.getTime() )/ (1000*60*60*24) ) 

        this.daysResult = {
            initialDays: resultInital !== 0 ? resultInital : 1,
            endormentsDays:  resultEndorment !==  0 ? resultEndorment : 1,        
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

    calculateTotalPremium() {
         // (((( this.premium.stockMovement * this.premium.stockRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays)

         const allRiskTotalPremium = (this.premiumIsEdited.premiumAllRisk) 
         ? this.premiumDataEdited.premiumAllRisk 
         : (((( this.tivMovement.allRisk * this.tivMovement.allRiskRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);

         const alopTotalPremium = (this.premiumIsEdited.premiumAlop) 
         ? this.premiumDataEdited.premiumAlop 
         : (((( this.tivMovement.alop * this.tivMovement.alopRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);

        //const allRiskTotalPremium = (((( this.tivMovement.allRisk * this.tivMovement.allRiskRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);
        //const alopTotalPremium = (((( this.tivMovement.alop * this.tivMovement.alopRate ) / 1000) / this.daysResult.initialDays)*this.daysResult.endormentsDays);

        const total = Decimal.add(allRiskTotalPremium, alopTotalPremium).toNumber()

        this.totalPremium = {
            allRiskTotalPremium,
            alopTotalPremium,
            total,

            allRiskTotalPremiumUsd: Decimal.div(allRiskTotalPremium, this.deductibles.exchangeRate).toNumber(),
            alopTotalPremiumUsd: Decimal.div(alopTotalPremium, this.deductibles.exchangeRate).toNumber(),
            totalUsd: Decimal.div(total, this.deductibles.exchangeRate).toNumber(),
        }


        return this.totalPremium;
    }

    allRiskPremiumSlu(){

        if (this.premiumIsEdited.sluAllRisk) {

            const edited = (!this.usd  
                ? this.premiumDataEdited.sluAllRisk 
                : ( this.premiumDataEdited.sluAllRisk / this.deductibles.exchangeRate ) ) || 0;

            this.data.allRiskPremiumSlu = edited;
            return edited;

        }

        this.calculateTotalPremium();

        const value  =  !this.usd  
                        ? this.totalPremium.allRiskTotalPremium
                        : this.totalPremium.allRiskTotalPremiumUsd
        const result = sluShare(this.sluLine,value)
        this.data.allRiskPremiumSlu = result
        return result
    }

    allRiskBrokerage(){
        this.calculateTotalPremium();
        
        const sluShare =  this.allRiskPremiumSlu()
        const result = calculateProperty(this.deductibles.brokerage, sluShare)

        this.data.allRiskBrokerage = result
        return result
     }
     
     allRiskTaxes(){
       this.calculateTotalPremium();
       
        const sluShare =  this.allRiskPremiumSlu()
       const result = calculateProperty(this.deductibles.taxes, sluShare)
        
       this.data.allRiskTaxes = result
       return result
     }
  
     allRiskEng(){
        this.calculateTotalPremium();
        
        const sluShare =  this.allRiskPremiumSlu()
        const result = calculateProperty(this.deductibles.eng, sluShare)
        
        this.data.allRiskEng = result
        return result
     }
  
     allRiskFronting(){
        this.calculateTotalPremium();
        
        const sluShare =  this.allRiskPremiumSlu()
        const result = calculateProperty(this.deductibles.fronting, sluShare)
        
        this.data.allRiskFronting = result
        return result
     }
     allRiskColombia(){
        this.calculateTotalPremium();
        
        const sluShare =  this.allRiskPremiumSlu()
        const result = calculateProperty(this.deductibles.premiumReserve, sluShare)
        
        this.data.allRiskColombia = result
        return result
     }
     
     //Sección de OLAP 
     alopPremiumSlu(){

        if (this.premiumIsEdited.sluAlop) {

            const edited = (!this.usd  
                ? this.premiumDataEdited.sluAlop 
                : ( this.premiumDataEdited.sluAlop / this.deductibles.exchangeRate ) ) || 0;

            this.data.alopPremiumSlu = edited;
            return edited;

        }

        this.calculateTotalPremium();

         const value  = !this.usd  
                        ? this.totalPremium.alopTotalPremium
                        : this.totalPremium.alopTotalPremiumUsd
         const result  = sluShare(this.sluLine ,value)
         this.data.alopPremiumSlu = result
         return result
     }
  
     alopBrokerage(){
        this.calculateTotalPremium();

      const sluShare = this.alopPremiumSlu()
      const value = calculateProperty(this.deductibles.brokerage, sluShare)
      this.data.alopBrokerage = value
      return value
     }
  
     alopTaxes(){
        this.calculateTotalPremium();

      const sluShare = this.alopPremiumSlu()
      const value = calculateProperty(this.deductibles.taxes, sluShare)
      this.data.alopTaxes = value
      return value
     }
  
     alopEng(){
        this.calculateTotalPremium();

      const sluShare = this.alopPremiumSlu()
      const value = calculateProperty(this.deductibles.eng, sluShare)

      this.data.alopEng = value
      return value
     }
  
     alopFronting(){
        this.calculateTotalPremium();

      const sluShare = this.alopPremiumSlu()
      const value = calculateProperty(this.deductibles.fronting, sluShare)
      this.data.alopFronting = value
      return value
     }
     
     alopColombia(){
        this.calculateTotalPremium();

      const sluShare = this.alopPremiumSlu()
      const value = calculateProperty(this.deductibles.premiumReserve, sluShare)
      this.data.alopColombia = value
      return value
     }
  
     //Apartado de para calcular las  net to slu excluding survey fee 
     alopNetSLUExcludingSurveyFees(){
      const value = Decimal.sub(
          this.alopPremiumSlu(),
          this.alopBrokerage()
      )
      .sub( this.alopTaxes() )
      .sub( this.alopEng())
      .sub( this.alopFronting())
      .sub( this.alopColombia())
      .toNumber()
  
      this.data.alopNetSLUExcludingSurveyFees = value
      return value
     }
  
     allRiskNetSLUExcludingSurveyFees(){
       const value = Decimal.sub(
          this.allRiskPremiumSlu(), 
          this.allRiskBrokerage())
          .sub( this.allRiskTaxes() )
          .sub( this.allRiskEng() )
          .sub( this.allRiskFronting() )
          .sub( this.allRiskColombia())
          .toNumber()
   
       this.data.allRiskNetSLUExcludingSurveyFees = value
       return value
     }
  
     //suma de totales
     totalPremiumSlu(){
       const {result} = calculateTotal(
          this.allRiskPremiumSlu(),
          this.alopPremiumSlu()
      )
       
      this.data.totalPremiumSlu = result
      return result
     } 
     
     brokerageTotal(){
      const {format , result} = calculateTotal(
          this.allRiskBrokerage(),
          this.alopBrokerage()
      )
      this.data.brokerageTotal = result
      return format
     }
  
     taxesTotal(){
      const {format , result} = calculateTotal(
          this.allRiskTaxes(),
          this.alopTaxes()
      )
      this.data.taxesTotal = result
      return format
     }
  
     engTotal(){
      const {format , result} = calculateTotal(
          this.allRiskEng(),
          this.alopEng()
      )
      this.data.engTotal = result
      return format
     }
  
     colombiaTotal(){
      const {format , result} = calculateTotal(
          this.allRiskColombia(),
          this.alopColombia()
      )
      this.data.colombiaTotal = result
      return format
     }
  
     frontingTotal(){
      const {format , result} = calculateTotal(
          this.allRiskFronting(),
          this.alopFronting()
      )
      this.data.frontingTotal = result
      return format
     }
  
     netSLUExcludingSurveyFeesTotal(){
      const {format , result} = calculateTotal(
          this.allRiskNetSLUExcludingSurveyFees(),
          this.alopNetSLUExcludingSurveyFees()
      )
      this.data.netSLUExcludingSurveyFeesTotal = result
      return format
     }

}


export const netPremiumInclusionRiskAutoCalcs = async (tivModificado, deductions, sluLine, usd=false, dates, options = {}) => {
    try {
        const netPremium = new netPremiumInclusionRiskEng(tivModificado, deductions, sluLine, usd, dates, options);
        
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