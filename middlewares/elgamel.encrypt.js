import crypto from 'crypto';
import math from 'mathjs';
const PRIME = 7919;
const PUBLIC_KEY = {}
const PRIVATE_KEY = {}
export function encryptVote(vote , publicKey){
    const alpha = crypto.randomInt(1,PRIME-1);//random value  from feild of PRIME 
    const c1 = math.mod(math.pow(publicKey.g , alpha),PRIME); //c1 = (g^alpha) % q 
    const c2 = math.mod(math.pow(publicKey.h ,alpha)*vote ,PRIME);//h is public key

    return {c1 ,c2}
}

export function generateKey(){
    const g = 3 //generator , primitive root with modulo q = 7
    const s = crypto.randomInt(1,PRIME-1);//private key
    const h = math.mod(math.pow(g,s) , PRIME);//public key


    PUBLIC_KEY.g = g;
    PUBLIC_KEY.h = h;
    PRIVATE_KEY.s = s;
    PUBLIC_KEY.p =PRIME;

    return {PUBLIC_KEY  ,PRIVATE_KEY}
}

export function decryptVote(encryptedVote){

}