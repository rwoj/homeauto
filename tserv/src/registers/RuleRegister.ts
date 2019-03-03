import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./src/dbdata/rules.db');

export interface ruleT { id: number, idLokalu: number, nazwa: string, startT: string, endT: string, 
                  weekday: boolean[], address: number, value: number | string, temp: boolean };
interface triggersT {datetime: any, active: boolean, ruleData: ruleT}; 

class RuleRejestr {
  nextTriggers: triggersT[];
  rulesSet: ruleT[];
  lokaleTempBazowa: {[key: string] : number | string};
  currentDay: number;

  private static _instance: RuleRejestr;
  private constructor (){
    this.nextTriggers = [];
    this.rulesSet = [];
    this.lokaleTempBazowa = {};
    this.currentDay = 0;

    this.repoInit();
  }
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }
  repoInit = ()=>{
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
  addRule = (_rule: ruleT)=>{
    this.rulesSet.push(_rule)  
    // persist in repo
    this.createNextTriggers();
  };
  modifyRule = (_rule: ruleT)=>{
    this.rulesSet = this.rulesSet.map( x => x.idLokalu === _rule.idLokalu && x.id === _rule.id ? _rule : x  )
    // persist in repo
    this.createNextTriggers();
  };
  deleteRule = (_rule: ruleT)=>{
    this.rulesSet = this.rulesSet.filter(x => x.idLokalu !== _rule.idLokalu || x.id !== _rule.id);
    console.log("rule", this.rulesSet, _rule)
    // persist in repo
    this.createNextTriggers();
  };
  createNextTriggers = () => {
    const currentDT = new Date();
    const targetDT = Date.UTC(currentDT.getFullYear(), currentDT.getMonth(), currentDT.getDate());
    const currentDTDay = currentDT.getDay();
    
    this.rulesSet.map((_rule: ruleT)=>{
      const startT = _rule.startT.split(':');
      const endT = _rule.endT.split(':');
      const targetDT1 = targetDT+(parseInt(startT[0], 10)-1)*60*60*1000+parseInt(startT[1],10)*60*1000;
      const targetDT2 = targetDT+(parseInt(endT[0], 10)-1)*60*60*1000+parseInt(endT[1],10)*60*1000;
      
      if (_rule.weekday[currentDTDay]) {
        this.nextTriggers.push({
          // rule start
          datetime: targetDT1, active: true, 
          ruleData: {..._rule} 
        },
        {
          //rule end
          datetime: targetDT2, active: true, 
          ruleData: {
            ..._rule, 
            value: !_rule.temp ? 0 :  this.lokaleTempBazowa[_rule.idLokalu]
          } 
        })
      }    
    })
    this.currentDay = currentDTDay;
  }
  takeActiveRules = () => {
    return this.nextTriggers.filter((x, i) => {
      if (x.active && (x.datetime < Date.now())) {
        this.markNonActive(i);
        return x;
      }
    })
  };
  markNonActive = (index: number): void =>{
    this.nextTriggers[index].active = false;
  };
}

export const rules = RuleRejestr.Instance;

