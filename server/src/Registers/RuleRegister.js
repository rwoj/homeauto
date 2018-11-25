import rulesFileInitial  from '../Registers/rules';

const rules = new RuleRejestr();
rules.createNextTriggers();
export default rules;

function RuleRejestr () {
  this.nextTriggers = [];
  this.rulesSet = rulesFileInitial;
  this.currentDay = 0;
  this.createNextTriggers = () => {
    // const currentDTime = Date.now();
    const currentDT = new Date();
    const currentDTDay = currentDT.getDay();

    this.rulesSet.map((rule)=>{
      if (rule.rule.weekday[currentDTDay]) {
        this.nextTriggers.push({
          datetime: Date.now()+10*1000, active: true, 
          ruleData: {...rule, address: 16517, value: 1} 
        },
        {
          datetime: Date.now()+10*1000, active: true, 
          ruleData: {...rule, address: 16518 , value: 1} 
        },
        {
          datetime: Date.now()+20*1000, active: true, 
          ruleData: {...rule, address: 16518, value: 0} 
        }
        )
      }    
    })
    this.currentDay = currentDTDay;
    console.log(currentDTDay, this.nextTriggers);
    // this.nextTriggers = [
    //   {datetime: Date.now()+10*1000, active: true, id: 1},
    //   {datetime: Date.now()+20*1000, active: true, id: 2},
    //   {datetime: Date.now()+30*1000, active: true, id: 3},
    // ]
  }
  this.markNonActive = (index) =>{
    this.nextTriggers[index] = false;
  }
  this.takeActiveRules = () => {
    return this.nextTriggers.filter((x, i) => {
      if (x.active && x.datetime < Date.now()) {
        this.markNonActive(i);
        return x;
      }
    })
  }
}