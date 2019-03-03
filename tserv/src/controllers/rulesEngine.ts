import {rules, RuleT} from '../registers/RuleRegister';
import {writeToModbus} from '../registers/WritesRegister';

export function getAllRules(): RuleT[]{
    return rules.rulesSet;
};
export function addRule(data: RuleT){
    // console.log("add rule :", data);
    rules.addRule(data); 
};
export function modifyRule(data: RuleT){
    // console.log("zmien regula :",data)
    rules.modifyRule(data); 
};
export function deleteRule(data: RuleT){
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

