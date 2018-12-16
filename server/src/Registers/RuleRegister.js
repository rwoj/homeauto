import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./dbdata/rules.db');

const rules = new RuleRejestr();
rules.repoInit(); 
export default rules;

function RuleRejestr () {
  this.nextTriggers = [];
  this.rulesSet = [];
  this.lokaleTempBazowa = {};
  this.currentDay = 0;
  this.addRule = (rule)=>{
    this.rulesSet = this.rulesSet //+rule 
    // persist in repo
    this.createNextTriggers();
  };
  this.modifyRule = (rule)=>{
    this.rulesSet=this.rulesSet //+modified rule
    // persist in repo
    this.createNextTriggers();
  };
  this.deleteRule = (rule)=>{
    this.rulesSet=this.rulesSet //- delete rule
    // persist in repo
    this.createNextTriggers();
  };
  this.repoInit = ()=>{
    db.all("select * from rules", (err, res) => {
      res.map((x) => {
        if (x.id===0) {
          this.lokaleTempBazowa[x.idLokalu] = x.value;
        } 
        this.rulesSet.push({
          id: x.id, idLokalu: x.idLokalu, nazwa: x.nazwa, 
          startT: x.startT, endT: x.endT, 
          weekday: [!!x.dni0, !!x.dni1, !!x.dni2, !!x.dni3, !!x.dni4, !!x.dni5, !!x.dni6], 
          address: x.address, value: x.value, temp: !!x.temp
        })        
      });
      this.createNextTriggers();
    });
  };
  this.createNextTriggers = () => {
    const currentDT = new Date();
    const targetDT = Date.UTC(currentDT.getFullYear(), currentDT.getMonth(), currentDT.getDate());
    const currentDTDay = currentDT.getDay();
    
    this.rulesSet.map((rule)=>{
      const startT = rule.startT.split(':');
      const endT = rule.endT.split(':');
      const targetDT1 = targetDT+(parseInt(startT[0], 10)-1)*60*60*1000+parseInt(startT[1],10)*60*1000;
      const targetDT2 = targetDT+(parseInt(endT[0], 10)-1)*60*60*1000+parseInt(endT[1],10)*60*1000;
      
      if (rule.weekday[currentDTDay]) {
        this.nextTriggers.push({
          // rule start
          datetime: targetDT1, active: true, 
          ruleData: {...rule} 
        },
        {
          //rule end
          datetime: targetDT2, active: true, 
          ruleData: {
            ...rule, 
            value: !rule.temp?0:this.lokaleTempBazowa[rule.idLokalu]
          } 
        })
      }    
    })
    this.currentDay = currentDTDay;
  }
  this.takeActiveRules = () => {
    return this.nextTriggers.filter((x, i) => {
      if (x.active && (x.datetime < Date.now())) {
        this.markNonActive(i);
        return x;
      }
    })
  }
  this.markNonActive = (index) =>{
    this.nextTriggers[index] = false;
  }
}