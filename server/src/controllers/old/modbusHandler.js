import Modbus from 'jsmodbus';
import net from 'net';
import {readIEEE754LEW, writeIEEE754LEW} from '../../helpers/helpers'
import config from "../../../config"
const options = {
    'host': '192.168.0.100',
    'port': '502'
}
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket);
// const client = modbus.client.tcp.complete(config.modbus).connect()

function tempParser(response) {
    const result = [];   
    for (let i = 0; i < response.length; i+=4) {
      result.push(readIEEE754LEW(response, i, 23, 4).toFixed(1));
      // console.log(ieee754.read(response, i, true, 23, 4))
    }
    return result;
}


export async function readModbusRegistry(adres, howMany){
    return await client.readHoldingRegisters(adres, howMany)
}

export async function readModbusRegistryTemp(adres, howMany){
    const resp = await client.readHoldingRegisters(adres, howMany*2);
    return tempParser(resp.payload);    
}


// async function sprawdzZmianyAndUpdateTemp(rejestr){
//   const resp=await client.readHoldingRegisters(rejestr.adres, rejestr.howMany*2)
//   return resp.payload
// }
// function updateTemp(temperatures, rejestr){
//   // let result=[]
//   let j=0
//   for(let i = 0; i< temperatures.length; i+=1){
//     if (temperatures[i]!==rejestr.rej_last1[i] 
//       && temperatures[i]!==rejestr.rej_last2[i]
//       && temperatures[i]!==rejestr.rej_last3[i]) {
//         r.table(rejestr.table).get(rejestr.adres+j).update({value: temperatures[i]}).run()
//         // console.log(`zmiana ${rejestr.adres+j}: ${temperatures[i]} : ${rejestr.rej_last1[i]} : ${rejestr.rej_last2[i]} : ${rejestr.rej_last3[i]}`)
//       } 
//       j+=2
//   }
// }
// function updateTempNast(temperatures, rejestr){
//   // let result=[]
//   let j=0
//   for(let i = 0; i< temperatures.length; i+=1){
//     if (temperatures[i]!==rejestr.rej_last1[i]) {
//         r.table(rejestr.table).get(rejestr.adres+j).update({value: temperatures[i]}).run()
//         // console.log(`zmiana ${rejestr.adres+j}: ${temperatures[i]} : ${rejestr.rej_last1[i]} : ${rejestr.rej_last2[i]} : ${rejestr.rej_last3[i]}`)
//       } 
//       j+=2
//   }

// }





  // zapisy
//   this.zmienWy = (req, res)=>{
//     const {adres, value} = req.body
//     console.log(adres, value)
//     client.writeSingleRegister(adres, value)
//       .then(response=>res.json({response}))
//       .catch(err=>console.log(err))
//   }
//   this.zmienTemp = (req, res)=>{
//     const {adres, value} = req.body
//     console.log(adres, value)
//     let buf=Buffer.alloc(4)
//     writeIEEE754LEW(buf, value, 0, 23, 4)
//     client.writeMultipleRegisters(adres, buf)
//       .then(response=>{
//         console.log(response)
//         res.json({response})
//       })
//       .catch(err=>console.log(err)) 
//   }
//   this.wyslij = (req, res)=>{
//     let address=16902
//     address=address===16902?16901:16902
//     res.json({nowyAdres: address})
//   }

