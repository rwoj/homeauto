class Registers {
  adres: number; 
  howMany: number;
  rej_last: string[];
  constructor (_adres: number, _howMany: number){
    this.adres = _adres;
    this.howMany = _howMany;
    this.rej_last = new Array(_howMany).fill(0);
  }
  readOdczyt = (odczyt: string[]) => {
    this.rej_last = [...odczyt]
  }
  whatChanged = (odczyt: string[]) => {
    const result: {id: number, value: string}[] = [];
    odczyt.map((x, i)=>{
      if (this.rej_last[i]!==x){
        result.push({id: this.adres+i, value: x});
      }
    });
    return result
  }
}

class RegWyjscia extends Registers {
  private static _instance: RegWyjscia;
  private constructor (){
    super(16901, 100);
  }
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }
}
export const registerWyjscia = RegWyjscia.Instance;

class RegSatel extends Registers {
  private static _instance: RegSatel;
  private constructor (){
    super(17100, 40);
  }
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }
}
export const registerSatel = RegSatel.Instance;

class RegTempNast extends Registers {
  private static _instance: RegTempNast;
  private constructor (){
    super(16387, 10);
  }
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }
}
export const registerTempNast = RegTempNast.Instance;

class RegTemp extends Registers {
  private static _instance: RegTemp;
  rej_last2: string[];
  rej_last3: string[];
  private constructor (){
    super(17197, 16);
    this.rej_last2 = new Array(16).fill(0);
    this.rej_last3 = new Array(16).fill(0);
  }
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }
  readOdczyt = (odczyt: string[]) => {
    this.rej_last = [...odczyt]
    this.rej_last2 = [...this.rej_last];
    this.rej_last3 = [...this.rej_last2];       
  }
  whatChanged = (odczyt: string[]) => {
    const result: {id: number, value: string}[] = [];
    let j:number = 0;
    odczyt.map((x, i)=>{
        if (this.rej_last[i]!==x
          && (!this.rej_last2 || this.rej_last2[i] !== x)
          && (!this.rej_last3 || this.rej_last3[i] !== x))
        {
          result.push({id: this.adres+j, value: x})
        }
        j+=2;
    });
    return result
  }
}
export const registerTemp = RegTemp.Instance;

interface Entries {id: number, value: string}; 
interface CurrentStateT { wyjscia: Entries[], wyTemp: Entries[], wyTempNast: Entries[]};

export const getCurrentState = (): CurrentStateT => {
    const currentState: CurrentStateT={
      wyjscia: [],
      wyTemp: [],
      wyTempNast: []
    };
  for (let i=0; i< registerWyjscia.howMany; i+=1){
      currentState.wyjscia.push(
          {id: registerWyjscia.adres+i, value: registerWyjscia.rej_last[i]})
    };
    let j=0;
    for (let i=0; i<registerTemp.howMany; i+=1){
      currentState.wyTemp.push(
          {id: registerTemp.adres+j, value: registerTemp.rej_last[i]});
      j+=2;
    };
    j=0;
    for (let i=0; i<registerTempNast.howMany; i+=1){
      currentState.wyTempNast.push(
          {id: registerTempNast.adres+j, value: registerTempNast.rej_last[i]});
      j+=2;
    };
    return currentState;
}