import {broadcast} from './clientsCommunication';
import {whatChanged, whatChangedTemp, tempParser} from './readingsHandler';
import register  from '../Registers/StateRegister';

let cycleDone = true;
const cycleWrites=[];

export function writeToModbus(sthToWrite){
    return cycleWrites.push(sthToWrite);
}

function buildWritePromisses(writeRequests){
    let writePromices=[];
    while ((nextWrite = writeRequests.shift()) !== undefined){      
        
//   // zapisy
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
//         writePromices.push(client.writeHoldingRegister...nextWrite...);
    }
    return writePromices;
}
function buildReadPromisses(){

}


export function modbusComm (client, modbusSocket) {
        if (!cycleDone) {
            return
        }
        cycleDone = false
        // let writePromices=buildWritePromisses(cycleWrites);
        // if (writePromises.length > 0 ) {
        //     Promise.all(writePromices)
        // }
        let promises=[];
        promises.push(client.readHoldingRegisters(
            register.wyjscia.adres, register.wyjscia.howMany));
        promises.push(client.readHoldingRegisters(
            register.wySatel.adres, register.wySatel.howMany));
        promises.push(client.readHoldingRegisters(
            register.wyTemp.adres, register.wyTemp.howMany*2));
        promises.push(client.readHoldingRegisters(
            register.tempNast.adres, register.tempNast.howMany*2));

        Promise.all(promises)
            .then(res => {
                // console.log(res[0].response.body._valuesAsArray)
                // console.log(register.wyjscia.adres)
                // console.log(whatChanged(res[0].response.body._valuesAsArray, 
                //              register.wyjscia.adres, register.wyjscia.rej_last))
                // let wyjsciaZmiany = whatChanged(res[0].response.body._valuesAsArray, 
                //     register.wyjscia.adres, register.wyjscia.rej_last);
                // if (wyjsciaZmiany.length>0){
                //     broadcast('wyjscia', wyjsciaZmiany);
                //     register.wyjscia.rej_last=[...res[0].response.body._valuesAsArray];
                // }
                // let wySatelZmiany = whatChanged(res[1].response.body._valuesAsArray,
                //     register.wySatel.adres, register.wySatel.rej_last);
                // if (wySatelZmiany.length>0){
                //     broadcast('wySatel', wySatelZmiany);
                //     register.wySatel.rej_last=[...res[1].response.body._valuesAsArray]; 
                // }
                // console.log(JSON.stringify(res[3].response.body._valuesAsArray))
                // let tempNastZmiany = whatChangedTemp(tempParser(res[3].response.body._valuesAsArray),
                //         register.tempNast.adres, register.tempNast.rej_last, null, null)
                // broadcast('tempNast', 
                //     );
                // register.tempNast.rej_last = [...tempParser(res[2].response.body._valuesAsArray)];
                console.log(res[2].response.body._values.length, 
                    tempParser(res[2].response.body._values))
                // let tempZmiany = whatChangedTemp(tempParser(res[2].response.body._values),
                //                    register.wyTemp.adres, register.wyTemp.rej_last1, register.wyTemp.rej_last2, register.wyTemp.rej_last3);
                // broadcast('wyTemp', 
                    // );
                //     register.wyTemp.rej_last1 = [...tempParser(res[3].response.body._valuesAsArray)];
                //     register.wyTemp.rej_last2 = [...register.wyTemp.rej_last1];
                //     register.wyTemp.rej_last3 = [...register.wyTemp.rej_last2];        

                // console.log(JSON.stringify(res[2].response.body._valuesAsArray));
                // // console.log(res[1].response.body._values)
                // broadcast("dane",res[0].response.body._valuesAsArray )
                cycleDone = true
            })
            .catch(modbusSocket.close)
}

// readModbusRegistry(register.wyjscia.adres, register.wyjscia.howMany)
//         .then(result =>{
//             broadcast('wyjscia', whatChanged(result, register.wyjscia.adres, register.wyjscia.rej_last));
//             register.wyjscia.rej_last=[...result];
//         })
//     readModbusRegistry(register.wySatel.adres, register.wySatel.howMany)
//         .then(result =>{
//             broadcast('wySatel', whatChanged(result, register.wySatel.adres, register.wySatel.rej_last));
//             register.wySatel.rej_last=[...result];
//         })    
//     readModbusRegistryTemp(register.tempNast.adres, register.tempNast.howMany)
//         .then(result =>{
//             broadcast('tempNast', whatChangedTemp(result, register.tempNast.adres, register.tempNast.rej_last, null, null));
//             register.tempNast.rej_last = [...result];
//         })    
//     readModbusRegistryTemp(register.wyTemp.adres, register.wyTemp.howMany)
//         .then(result =>{
//             broadcast('wyTemp', whatChangedTemp(result, register.wyTemp.adres, register.wyTemp.rej_last1, register.wyTemp.rej_last2, register.wyTemp.rej_last2));
//             register.wyTemp.rej_last1 = [...result];
//             register.wyTemp.rej_last2 = [...register.wyTemp.rej_last1];
//             register.wyTemp.rej_last3 = [...register.wyTemp.rej_last2];
//         }) 