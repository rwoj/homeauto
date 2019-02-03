import rules from '../Registers/RuleRegister';
import {writeToModbus} from '../Registers/WritesRegister';

export function getAllRules (){
    return rules.rulesSet;
};
export function addRule(data){
    // console.log("add rule :", data);
    rules.addRule(data); 
}
export function modifyRule(data){
    // console.log("zmien regula :",data)
    rules.modifyRule(data); 
}
export function deleteRule(data){
    // console.log("usuń regula:",data)
    rules.deleteRule(data);
}
export function verifyRules(){
    const currentDT = new Date();
    if (currentDT.getDay() !== rules.currentDay){
        rules.createNextTriggers();
    }
    const toAction = rules.takeActiveRules();
    toAction.map((activeRule)=>{
        // console.log("active rule", activeRule)
        writeToModbus({address: activeRule.ruleData.address, 
            value: activeRule.ruleData.value, temp: activeRule.ruleData.temp});
    })
}

