import rules from '../Registers/RuleRegister';
import {writeToModbus} from '../Registers/WritesRegister';


export function addRull(){
// add rule to rules.rulesSet
    rules.createNextTriggers();

}
export function verifyRules(){
    const currentDT = new Date();
    if (currentDT.getDay() !== rules.currentDay){
        rules.createNextTriggers();
    }
    const toAction = rules.takeActiveRules();
    toAction.map((activeRule)=>{
        console.log(activeRule)
        // writeToModbus({address: , value: , temp: });
        writeToModbus({address: activeRule.ruleData.address, 
            value: activeRule.ruleData.value, temp: false});
    })
}

