const writes = new WriteRegister();
export default writes;
export const writeToModbus = writes.writeToModbus;

function WriteRegister () {
  this.cycleWrites = []
  this.anyWrites = () => this.cycleWrites.length>0?true:false;
  this.takeCycleWrites = ()=>{
    const result = [...this.cycleWrites];
    this.cycleWrites = [];
    return result;
  }, 
  this.writeToModbus = (someChange)=>{
      this.cycleWrites.push(someChange);
  }
}