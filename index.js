let raund_key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5]

let GOST_S = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 1, 2
]

const GOST = (OT) => {
    let nR = (OT & 0x00000000FFFFFFFF);
    let nL = (OT >> 32);

    let nPos = 0;

    let nF;

    for (let nCycle = 0; nCycle < 32; nCycle++) {
        nF = nR;
        let ns = 0;
        let nVal;
        let nFS = 0;
        if (nCycle > 23) nF = nF + raund_key[7 - nCycle % 8]
        else nF = nF + raund_key[nCycle % 8]

        for (let ni = 7; ni >= 0; ni--) {
            nVal = (nF >> ns) & 0x0F;
            nVal = GOST_S[(7 - ni) * 16 + nVal];
            nFS ^= (nVal << ns);
            ns += 4;
        }

        nF = nFS;

        nF = nF << 11 | nF >> 21

        nF = nF & 4294967295;
        nF ^= nL;
        nL = nR;
        nR = nF;

    }


    let nLR;

    nLR = nR;
    nLR <<= 32;
    nLR |= nL;

    return nLR;
}
console.log(GOST(546));


let a = 127;

console.log(a >> 2)