class OTP {
  constructor(key){
    this._key = key.split("");
  }

  encrypt(text,bytes = true){
    if(bytes){
      return text.split("").reduce((acc,char,i)=>acc + (char.charCodeAt(0) ^ this._key[i%this._key.length].charCodeAt(0)) + " " ,"")
    }else {
      return text.split("").reduce((acc,char,i)=>acc + String.fromCharCode((char.charCodeAt(0) ^ this._key[i%this._key.length].charCodeAt(0))),"")
    }
    
  }

  decrypt(text) {
    return text.slice(0,-1).split(" ").reduce((acc, char, i)=> acc + String.fromCharCode(parseInt(char) ^ this._key[i%this._key.length].charCodeAt(0)), "" )
  }
}

module.exports = OTP;