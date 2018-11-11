import {readIEEE754LEW, writeIEEE754LEW} from '../../helpers/helpers';
import ieee754 from "ieee754";

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

  setInterval(()=>buildTempBuff(25), 5000);