const startT=["12","49"]
const currentDT = new Date();
const targetDT = Date.UTC(currentDT.getFullYear(), currentDT.getMonth(), currentDT.getDate());

const targetDT1 = targetDT+parseInt(startT[0], 10)*60*60*1000+parseInt(startT[1],10)*60*1000;
  
console.log(startT, targetDT, targetDT1, Date.now())
console.log((Date.now()-targetDT1), 13*60*60+15*60);

