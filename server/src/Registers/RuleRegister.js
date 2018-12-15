import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./dbdata/rules.db');

const rules = new RuleRejestr();
rules.repoInit(); 
export default rules;

function RuleRejestr () {
  this.nextTriggers = [];
  this.rulesSet = [];
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
      res.map((x) => this.rulesSet.push({
        id: x.id, idLokalu: x.idLokalu, nazwa: x.nazwa, 
        tempNast: x.tempNast, startHr: x.startHr, czasMin: x.czasMin, 
        weekday: [!!x.dni0, !!x.dni1, !!x.dni2, !!x.dni3, !!x.dni4, !!x.dni5, !!x.dni6], 
        address: x.address, value: x.value
      }));
      this.createNextTriggers();
    });
  };
  this.createNextTriggers = () => {
    const currentDT = new Date();
    const currentDTDay = currentDT.getDay();

    this.rulesSet.map((rule)=>{
      if (rule.weekday[currentDTDay]) {
        this.nextTriggers.push({
          datetime: Date.now()+10*1000, active: true, 
          ruleData: {...rule, value: 0} 
        },
        {
          datetime: Date.now()+20*1000, active: true, 
          ruleData: {...rule} 
        }
        )
      }    
    })
    this.currentDay = currentDTDay;
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