import {rules, ruleT} from '../Registers/RuleRegister';
import {writeToModbus} from '../Registers/WritesRegister';

export function getAllRules(): ruleT[]{
    return rules.rulesSet;
};
export function addRule(data: ruleT){
    // console.log("add rule :", data);
    rules.addRule(data); 
};
export function modifyRule(data: ruleT){
    // console.log("zmien regula :",data)
    rules.modifyRule(data); 
};
export function deleteRule(data: ruleT){
    // console.log("usuń regula:",data)
    rules.deleteRule(data);
};
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

