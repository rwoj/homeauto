const register = new Rejestr();
export default register;

// rej_first:[],
function Rejestr () {
  this.wyjscia = {
    adres: 16901,
    howMany: 100,
    rej_last: new Array(100).fill(0)
  } 
  this.wySatel = {
    adres: 17100,
    howMany: 40,
    rej_last: new Array(40).fill(0)
  }
  this.wyTemp = {
    adres: 17197,
    howMany: 16,
    rej_last: new Array(16).fill(0), 
    rej_last2: new Array(16).fill(0),
    rej_last3: new Array(16).fill(0)
  }
  this.tempNast = {
    // appName: 'wyTempNast',
    adres: 16387,
    howMany: 10,
    rej_last: new Array(10).fill(0),
  }
  this.getRej = (name) => this[name];
  this.readOdczyt = (name, odczyt) => {
    this[name].rej_last = [...odczyt]
    if (name === 'wyTemp'){
      this.wyTemp.rej_last2 = [...this.wyTemp.rej_last];
      this.wyTemp.rej_last3 = [...this.wyTemp.rej_last2];       
    }
  }
  this.getCurrentState = () => {
    const currentState={
      wyjscia: [],
      wyTemp: [],
      wyTempNast: []
    };
    // uwaga wyTempNast !== tempNast 
    for (let i=0; i<this.wyjscia.howMany; i+=1){
      currentState.wyjscia.push(
          {id: this.wyjscia.adres+i, value: this.wyjscia.rej_last[i]})
    };
    let j=0;
    for (let i=0; i<this.wyTemp.howMany; i+=1){
      currentState.wyTemp.push(
          {id: this.wyTemp.adres+j, value: this.wyTemp.rej_last[i]});
      j+=2;
    };
    j=0;
    for (let i=0; i<this.tempNast.howMany; i+=1){
      currentState.wyTempNast.push(
          {id: this.tempNast.adres+j, value: this.tempNast.rej_last[i]});
      j+=2;
    };
    // console.log(currentState)
    return currentState;
  }
  this.whatChanged = (name, odczyt) => {
    const result=[];
    odczyt.map((x, i)=>{
      if (this[name].rej_last[i]!==x){
        result.push({id: this[name].adres+i, value: x});
      }
    });
    return result
  }
  this.whatChangedTemp = (name, odczyt)=>{
      const result=[];
      let j=0;
      odczyt.map((x, i)=>{
        if (this[name].rej_last[i]!==x
          && (!this[name].rej_last2 || this[name].rej_last2[i] !== x)
          && (!this[name].rej_last3 || this[name].rej_last3[i] !== x))
        {
          result.push({id: this[name].adres+j, value: x})
        }
        j+=2;
      });
      return result;
  }
}

// , adres, rej_last
// export function whatChanged(rej_new, rej ){
//   const result=[];
//   rej_new.map((x, i)=>{
//     if (rej.rej_last[i]!==x){
//       result.push({id: rej.adres+i, value: x});
//     }
//   });
//   return result
// }

// adres, rej_last, rej_last2, rej_last3
// export function whatChangedTemp(rej_new, rej ){
//   const result=[];
//   let j=0;
//   rej_new.map((x, i)=>{
//     if (rej.rej_last[i]!==x
//       && (!rej.rej_last2 || rej.rej_last2[i] !== x)
//       && (!rej.rej_last3 || rej.rej_last3[i] !== x))
//     {
//       result.push({id: rej.adres+j, value: x})
//     }
//     j+=2;
//   });
//   return result;
// }