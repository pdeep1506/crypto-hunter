import React,{useState,useEffect} from "react";
import { createContext } from "react";

const Crypto = createContext();


const CryptoContext = ({children}) =>{

    const [currency, setcurreny] = useState('INR')
    const [symbol,setsymbol] = useState("₹")

    useEffect(()=>{
        if (currency === "INR") setsymbol("₹");
        else if (currency === "USD") setsymbol("$");
    },[currency])
    return <Crypto.Provider value={{currency,setcurreny,symbol}}>
    
    {children}
    </Crypto.Provider>
}

export const CryptoContextAPI = Crypto
export default CryptoContext