
import {broadcast} from './clientsCommunication';
import {rules, RuleT} from '../registers/RuleRegister';
import {writeToModbus} from '../registers/WritesRegister';
import {ODCZYT_REGUL} from '../utils/types';

export function getAllRules(): RuleT[]{
    return rules.rulesSet;
};

export function handleRules(msgKey: string, data: RuleT){
    switch (msgKey) {
        case 'nowaRegula':
            handleRules(msgKey, data);
            rules.addRule(data); 
            broadcast(ODCZYT_REGUL, getAllRules());
            break;
        case 'zmienRegula':
            rules.modifyRule(data); 
            broadcast(ODCZYT_REGUL, getAllRules());
            break;
        case 'usunRegula':
            rules.deleteRule(data);
            broadcast(ODCZYT_REGUL, getAllRules());
            break;
        default:
            console.log("dziwna wiadomość :", msgKey);
    }

}

const verifyRules = ():void => {
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

export function runRulesEngine (){
    verifyRules();    
    setTimeout (runRulesEngine, 2000);
} 
