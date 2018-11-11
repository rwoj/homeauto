import {readIEEE754LEW, writeIEEE754LEW} from '../helpers/helpers';
import ieee754 from "ieee754";

export function whatChanged(rej_new, adres, rej_last ){
  const result=[];
  rej_new.map((x, i)=>{
    if (rej_last[i]!==x){
      result.push({[adres+i]: x});
    }
  });
  return result
}

export function whatChangedTemp(rej_new, adres, rej_last, rej_last2, rej_last3 ){
  const result=[];
  let j=0;
  rej_new.map((x, i)=>{
    if (rej_last[i]!==x
      && (!rej_last2 || rej_last2[i] !== x)
      && (!rej_last3 || rej_last3[i] !== x)){
      result.push({[adres+j]: x})
    }
    j+=2;
  });
  return result;
}

export function tempParser(response) {
  // console.log(JSON.stringify(response));
  const result = [];   
  for (let i = 0; i < response.length; i+=4) {
    // console.log(i, readIEEE754LEW(response, i, 23, 4).toFixed(1));
    result.push(readIEEE754LEW(response, i, 23, 4).toFixed(1));
    // console.log(ieee754.read(response, i, false, 23, 4))
  }
  return result;
}
export function buildTempBuff ( value ){
  // let result = [];
  let buf = Buffer.alloc(4);
  writeIEEE754LEW(buf, value, 0, 23, 4);
  let btbl = [...buf];
  // btbl.splice(0,2);
  // console.log(buf, btbl);
  // result.push(0);
  // result.push();
  // console.log(result)
  // // console.log(ieee754.write(buf, value, 0, false, 23, 4), buf);
  return [0, '0x'+ btbl[2].toString(16)+btbl[3].toString(16)]; 
}   
