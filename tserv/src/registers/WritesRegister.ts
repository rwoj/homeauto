export interface ItemToWrite { address: number, value: string | number , temp: boolean }

class WriteRegister {
  cycleWrites: ItemToWrite []; 
  private static _instance: WriteRegister;
  private constructor (){
    this.cycleWrites = [];
  }
  public static get Instance(){
    return this._instance || (this._instance = new this());
  }
  anyWrites = () => this.cycleWrites.length > 0 ? true : false;
  takeCycleWrites = ()=>{
    const result = [...this.cycleWrites];
    this.cycleWrites = [];
    return result;
  }
  writeToModbus = (someChange: ItemToWrite) => {
      this.cycleWrites.push(someChange);
  }
}

export const writes = WriteRegister.Instance;
export const writeToModbus = writes.writeToModbus;
