import {broadcast} from './clientsCommunication';
import {whatChanged, whatChangedTemp, tempParser, buildTempBuff} from './readingsHandler';
import register  from '../Registers/StateRegister';

const cycleWrites=[];

// {address: 16517, value: 0, temp: false}
// {address: 16401, value: 0, temp: true}
export function writeToModbus(sthToWrite){
    return cycleWrites.push(sthToWrite);
}

function buildWritePromisses(writeRequests, client){
    let writePromises=[];
    writeRequests.map((x)=>{
        if (x.temp) {
            writePromises.push(client.writeRegisters(
                x.address, buildTempBuff(x.value)));
        } else {
            writePromises.push(client.writeRegister(
                x.address, (x.value)%2))
        }
    })
    return writePromises;
}
    
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


export function modbusPooling(client) {
    if (cycleWrites.length>0){
        let writePromises = buildWritePromisses(cycleWrites, client);
        Promise.all(writePromises)
            .then(res=>console.log("heja", res))
            .catch(console.error)
    }

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
        .then(handleModbusResult)
        .catch(console.error)
}

function handleModbusResult (res){
    
    let wyjsciaZmiany = whatChanged(res[0].data, 
        register.wyjscia.adres, register.wyjscia.rej_last);
    if (wyjsciaZmiany.length>0){
        broadcast('wyjscia', wyjsciaZmiany);
        register.wyjscia.rej_last=[...res[0].data];
    }
    let wySatelZmiany = whatChanged(res[1].data,
        register.wySatel.adres, register.wySatel.rej_last);
    if (wySatelZmiany.length>0){
        broadcast('wySatel', wySatelZmiany);
        register.wySatel.rej_last=[...res[1].data]; 
    }
    let tempZmiany = whatChangedTemp(tempParser(res[2].buffer),
        register.wyTemp.adres, register.wyTemp.rej_last1, 
        register.wyTemp.rej_last2, register.wyTemp.rej_last3);
    if (tempZmiany.length>0){
        broadcast('wyTemp', tempZmiany );
    }
    register.wyTemp.rej_last1 = [...tempParser(res[2].buffer)];
    register.wyTemp.rej_last2 = [...register.wyTemp.rej_last1];
    register.wyTemp.rej_last3 = [...register.wyTemp.rej_last2];       
    
    let tempNastZmiany = whatChangedTemp(tempParser(res[3].buffer),
        register.tempNast.adres, register.tempNast.rej_last);
    if(tempNastZmiany.length>0){
        broadcast('wyTempNast', tempNastZmiany); 
    }
    register.tempNast.rej_last = [...tempParser(res[3].buffer)]; 
}

export function getCurrentState () {
    const currentState={
      [register.wyjscia.name]: [],
    //   [register.wySatel.name]: [],
      [register.wyTemp.name]: [],
      [register.tempNast.name]: []
    };
    for (let i=0; i<register.wyjscia.howMany; i+=1){
      currentState[register.wyjscia.name].push(
          {id: register.wyjscia.adres+i, value: register.wyjscia.rej_last[i]})
    };
    // for (let i=0; i<register.wySatel.howMany; i+=1){
    //   currentState[register.wySatel.name].push(
    //       {id: register.wySatel.adres+i, value: register.wyjscia.rej_last[i]})
    // };
    let j=0;
    for (let i=0; i<register.wyTemp.howMany; i+=1){
      currentState[register.wyTemp.name].push(
          {id: register.wyTemp.adres+j, value: register.wyTemp.rej_last1[i]});
      j+=2;
    };
    j=0;
    for (let i=0; i<register.tempNast.howMany; i+=1){
      currentState[register.tempNast.name].push(
          {id: register.tempNast.adres+j, value: register.tempNast.rej_last[i]});
      j+=2;
    };
    return currentState;
  }