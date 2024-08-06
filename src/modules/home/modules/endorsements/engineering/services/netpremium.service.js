import NetPremiumEng from "@/application/class/NetPremiumEng";

/**
 * @template {typeof import('@/application/class/NetPremiumPRO')} T
 * 
 * clase creada para realizar los cálculos de la clase sin tener que correr ejecutar
 * todos uno por uno 
 * @param {object} premium 
 * @param {object} deductions 
 * @param {object} boundInsurableProp 
 * @param {boolean} usd 
 * @returns T
 */

const netPremiumEng = async (premium, deductions, sluLine, usd=false) => {
    try {
        const netPremiumEng = new NetPremiumEng(premium, deductions, sluLine, usd);
        
        Object.getOwnPropertyNames (Object.getPrototypeOf (netPremiumEng))
        .filter(propName => (propName !== 'constructor' && typeof netPremiumEng[propName] === 'function'))
        .forEach(async(propName) => await netPremiumEng[propName]());
 
        return netPremiumEng;
    } catch (error) {
        console.log(error)
        const message =  String(error)
        throw new Error(message)
    }
    
}

export default netPremiumEng;