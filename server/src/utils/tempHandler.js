export function tempParser(response) {
  const result = [];   
  for (let i = 0; i < response.length; i+=4) {
    // console.log(i, readIEEE754LEW(response, i, 23, 4).toFixed(1));
    result.push(readIEEE754LEW(response, i, 23, 4).toFixed(1));
    // console.log(ieee754.read(response, i, false, 23, 4))
  }
  return result;
}
export function buildTempBuff ( value ){
  let buf = Buffer.alloc(4);
  writeIEEE754LEW(buf, value, 0, 23, 4);
  let btbl = [...buf];
  // // console.log(ieee754.write(buf, value, 0, false, 23, 4), buf);
  return ['0x'+btbl[0].toString(16)+btbl[1].toString(16),
          '0x'+ btbl[2].toString(16)+btbl[3].toString(16)]; 
}   

const readIEEE754LEW = (buffer, offset, mLen, nBytes)=> {
    var e, m,
         eLen = nBytes * 8 - mLen - 1,
         eMax = (1 << eLen) - 1,
         eBias = eMax >> 1,
         nBits = -7,
         i = (nBytes - 2),
         d = -1,
         s = buffer[offset + i]; 
             
     if (i % 2 == 0) { i += 1; };
     e = s & ((1 << (-nBits)) - 1);
     s >>= (-nBits);
     nBits += eLen;   
     for (; nBits > 0; nBits -= 8) {
         e = e * 256 + buffer[offset + i];
         if (i % 2 == 0) { i += 1;
         } else { i -= 3; };
     };
     m = e & ((1 << (-nBits)) - 1);
     e >>= (-nBits);
     nBits += mLen; 
     for (; nBits > 0; nBits -= 8) {
         m = m * 256 + buffer[offset + i];
         if (i % 2 == 0) { i += 1;
         } else { i -= 3;
         };
     };
     if (e === 0) {
       e = 1 - eBias;
     } else if (e === eMax) {
       return m ? NaN : ((s ? -1 : 1) * Infinity);
     } else {
       m = m + Math.pow(2, mLen);
       e = e - eBias;
     }
     return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
   }
   
const writeIEEE754LEW=(buffer, value, offset, mLen, nBytes)=>{
    var e, m, c,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
        i = 1,
        d = 1,
        s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  
    value = Math.abs(value);
  
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
  
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; mLen -= 8) {
        buffer[offset + i] = m & 0xff;
        if (i % 2 == 0) {
            i += 3 * d;
        } else {
            i += -1 * d;
        }
        m /= 256;
    }
  
    e = (e << mLen) | m;
    eLen += mLen;  
    
    for (; eLen > 0; eLen -= 8) {
        buffer[offset + i] = e & 0xff;
        if (i % 2 == 0) {
            i += 3 * d;
        } else {
            i += -1 * d;
        }
        e /= 256;
    }
    
    buffer[offset + i * d] |= s * 128;
  }