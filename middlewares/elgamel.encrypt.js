import crypto from 'crypto';
import {
    mod,
    pow
} from 'mathjs';

export const PRIME = 11;
export const PUBLIC_KEY = {}
export const PRIVATE_KEY = {}
export function encryptVote(vote, publicKey) {
    const alpha = crypto.randomInt(1, PRIME - 1);//random value  from feild of PRIME 
    console.log(alpha)
    const c1 = mod(pow(publicKey.g, alpha), PRIME); //c1 = (g^alpha) % q 
    const c2 = mod(pow(publicKey.h, alpha) * vote, PRIME);//h is public key

    return { c1, c2 }
}

export function generateKey() {
    const g = 3 //generator , primitive root with modulo q = 7
    const s = 3;//private key
    console.log("s:",s)
    const h = mod(pow(g, s) ,PRIME);//public key
    console.log("h:" ,h)


    PUBLIC_KEY.g = g;
    PUBLIC_KEY.h = h;
    PRIVATE_KEY.s = s;
    PUBLIC_KEY.p = PRIME;

    return { PUBLIC_KEY, PRIVATE_KEY }
}




// Shamir's Secret Sharing: Split the private key
export function splitSecret({ s }, n, t, prime) {
    console.log("params :", s, n, t, prime);

    // Generate the coefficients: secret + random coefficients
    const coefficients = [s, ...Array(t - 1).fill().map(() => crypto.randomInt(1, prime - 1))];
    console.log("Coefficients:", coefficients);

    const shares = [];

    // Iterate over the share indices to compute shares
    for (let i = 1; i <= n; i++) {
        let y = 0;

        // Compute y using a loop to evaluate the polynomial
        for (let index = 0; index < coefficients.length; index++) {
            const term = coefficients[index] * Math.pow(i, index); // a_k * x^k
            y += term;
        }

        // Reduce y modulo prime
        y = ((y % prime) + prime) % prime; // Ensure non-negative result
        shares.push([i, y]);
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
// Helper function for modular exponentiation
function modPow(base, exponent, mod) {
    let result = 1;
    base = base % mod;  // In case base is larger than mod

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % mod;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Helper function for modular inverse (using extended Euclidean algorithm)
function invmod(a, m) {
    let m0 = m, x0 = 0, x1 = 1;
    if (m === 1) return 0;
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}

export function decryptVotes(encryptedVotes, partialDecryptions) {
    let tally = 0; // Initialize tally

    // Decrypt each encrypted vote and update the tally
    encryptedVotes.forEach((encrypted) => {
        // Combine the partial decryptions to compute c1
        const combinedC1 = partialDecryptions.reduce((acc, { share }) => {
            return (acc * modPow(Number(encrypted.c1), share[1], PRIME)) % PRIME;
        }, 1); // Starting with 1 as the initial accumulator value

        // Decrypt c2 using the modular inverse of combinedC1
        const decryptedVote = (encrypted.c2 * invmod(combinedC1, PRIME)) % PRIME;

        // Since the decrypted vote should be either 1 or -1, add or subtract it to the tally
        if (decryptedVote == 1) {
            tally += 1; // Add 1 for "Yes"
        } else if (decryptedVote == -1) {
            tally -= 1; // Subtract 1 for "No"
        }
    });

    return tally;
}




generateKey();
export const sharedKeys = splitSecret(PRIVATE_KEY, 5, 3, PRIME);
