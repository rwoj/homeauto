export default {
  wyjscia: {
    name: 'wyjscia',
    adres: 16901,
    howMany: 100,
    rej_first:[],
    rej_last: new Array(100).fill(0)
  },
  wySatel: {
    name: 'wySatel',
    adres: 17100,
    howMany: 40,
    rej_first:[],
    rej_last: new Array(40).fill(0)
  },
  wyTemp: {
    name: 'wyTemp',
    adres: 17197,
    howMany: 16,
    rej_first:[],
    rej_last1: new Array(16).fill(0), 
    rej_last2: new Array(16).fill(0),
    rej_last3: new Array(16).fill(0)
  },
  tempNast: {
    name: 'wyTempNast',
    adres: 16387,
    howMany: 10,
    rej_first:[],
    rej_last: new Array(10).fill(0),
  }
}
  
// this.init = ()=>{
//     this.getInitRegisters();
//   }
//   // ustawienia 
//   this.getInitRegisters=()=>{
//     // rejestr tables must exist
//     for (let i=0; i<this.wyjscia.howMany; i+=1){
//       this.wyjscia.rej_first.push({id: this.wyjscia.adres+i, value: 0})
//     }
//     r.table(this.wyjscia.table).insert(this.wyjscia.rej_first).run()

//     for (let i=0; i<this.wySatel.howMany; i+=1){
//       this.wySatel.rej_first.push({id: this.wySatel.adres+i, value: 0})
//     }
//     r.table(this.wySatel.table).insert(this.wySatel.rej_first).run()
//     let j=0
//     for (let i=0; i<this.wyTemp.howMany; i+=1){
//       this.wyTemp.rej_first.push({id: this.wyTemp.adres+j, value: 0})
//       j+=2
//     }
//     r.table(this.wyTemp.table).insert(this.wyTemp.rej_first).run()
//     j=0
//     for (let i=0; i<this.tempNast.howMany; i+=1){
//       this.tempNast.rej_first.push({id: this.tempNast.adres+j, value: 0})
//       j+=2
//     }
//     r.table(this.tempNast.table).insert(this.tempNast.rej_first).run()
//   }
//   this.getUstawieniaLokali=(req, res)=>{
//     r.table('lokale').orderBy('id').run()
//       .then(lokale=> res.json({ustawienia:{lokale}}))
//       .error((err)=>console.error(err)) 
//   }
//   this.getUstawieniaKonfiguracja=(req, res)=>{
//     getKonfig()
//       .then(result=>res.json({ustawienia: result}))
//   }
//   this.getUstawieniaRejestrOpis=(req, res)=>{
//     r.table('rejestrOpis').orderBy('adres').run()
//       .then(rejestrOpis=> res.json({ustawienia:{rejestrOpis}}))
//       .error((err)=>console.error(err)) 
//   }
