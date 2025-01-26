import crypto from 'crypto';
import {
    mod,
    pow
} from 'mathjs';

export const PRIME = 7919;
export const PUBLIC_KEY = {}
export const PRIVATE_KEY = {}
export function encryptVote(vote, publicKey) {
    const alpha = crypto.randomInt(1, PRIME - 1);//random value  from feild of PRIME 
    const c1 = mod(pow(publicKey.g, alpha), PRIME); //c1 = (g^alpha) % q 
    const c2 = mod(pow(publicKey.h, alpha) * vote, PRIME);//h is public key

    return { c1, c2 }
}

export function generateKey() {
    const g = 3 //generator , primitive root with modulo q = 7
    const s = crypto.randomInt(1, PRIME - 1);//private key
    const h = mod(pow(g, s), PRIME);//public key


    PUBLIC_KEY.g = g;
    PUBLIC_KEY.h = h;
    PRIVATE_KEY.s = s;
    PUBLIC_KEY.p = PRIME;

    return { PUBLIC_KEY, PRIVATE_KEY }
}



// Shamir's Secret Sharing: Split the private key
export function splitSecret(secret, n, t, prime) {
    const coefficients = [secret, ...Array(t - 1).fill().map(() => crypto.randomInt(1, prime - 1))];
    const shares = [];
    for (let i = 1; i <= n; i++) {
        let y = coefficients.reduce((acc, coeff, index) => acc + coeff * pow(i, index), 0);
        shares.push([i, mod(y, prime)]);
    }
    return shares;
}

// Shamir's Secret Reconstruction
export function reconstructSecret(shares, prime) {
    let secret = 0;
    shares.forEach(([xi, yi]) => {
        let num = 1, den = 1;
        shares.forEach(([xj]) => {
            if (xi !== xj) {
                num *= -xj;
                den *= xi - xj;
            }
        });
        const lagrangeCoeff = mod(num * invmod(den, prime), prime);
        secret = mod(secret + yi * lagrangeCoeff, prime);
    });
    return secret;
}

// Decrypt a vote (collaborative decryption)
export function decryptVote(encrypted, partialDecryptions) {
    const combinedC1 = partialDecryptions.reduce((acc, { share }) => acc * pow(encrypted.c1, share), 1) % PRIME;
    return mod(encrypted.c2 * invmod(combinedC1, PRIME), PRIME);
}