import NetPremiumPROStrategy from "@/application/class/NetPremiumPRO";

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

const netPremiumPRO = async (premium, deductions, boundInsurableProp, usd=false) => {
    try {
        const netPremiumPRO = new NetPremiumPROStrategy(premium, deductions, boundInsurableProp, usd);
        
        Object.getOwnPropertyNames (Object.getPrototypeOf (netPremiumPRO))
        .filter(propName => (propName !== 'constructor' && typeof netPremiumPRO[propName] === 'function'))
        .forEach(async(propName) => await netPremiumPRO[propName]());
 
        return netPremiumPRO;
    } catch (error) {
        console.log(error)
        const message =  String(error)
        throw new Error(message)
    }
    
}

export default netPremiumPRO;