const crypto = require('crypto');
const { base } = require('./src/models/erequest.model');

// Chuỗi cần mã hóa
const plaintext = 'Hello, world!';

// Tạo cặp khóa
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem'
//     },
//     privateKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem',
//         cipher: 'aes-256-cbc',
//         passphrase: 'supersecret'
//     }
// });
const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA4t3wADYS0cWTq2rvz1AMM53QYwZ0u4zfFO/YB8AQOGxyzCkl80Ls
XRYU/65KUcB6G+H9D8S5A1cpQl/zs//zEC338wHgepN4Y8/N3XVHckm1T1g9RYgE
I+M68w1rQpV3T39SA4RqYaG5id10ixnVZ/yZzMIABp5FrsPkSRiTRYNgfIJuhb6j
cHqtwWIb3LpVC4EOmYOnc9ocmsDOZZz+QEl+Fs3C/Pd3TAvKVADsRdODPdZlbf+r
69fNRHqCd7zFvZDl1pzLVV/iAVjzJPIl5SV3flOMRXOwG9vYuQ9QIvhYDxGMrjxA
t7vidt2k2O+QUhvvaIWZbG5XI5iF5kRevQIDAQAB
-----END RSA PUBLIC KEY-----`;

const public = Buffer.from(publicKey);
console.log('Public key:', public.toString('base64'));

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-256-CBC,88FB03CFE3D5F22CF9EC695BCB2CDC0D

u+AJV48afan0X/g6QA7Riolf6UaN8vm1qyTieOYUANH5qScJPIWO3kGBYIvUtCwq
AW0zh54+u0XeifBU5XqJIpm77mf7ICbS+XPSLTrJemJAx0RmNjAbj51ejoH7ZWuH
aNU7WclpYKFpp17KtQt8f88uRbwpp4c+trlzr6G2bWY8W6Z62UoKxw3VcdtcHTgX
f1s3ptZTyYZ3wFlGYSt36HWpA0EmLGxTfwJmfarRp0+l3iSNVMeEuAbEmW52V/Da
8Qx2BBk1OnzsmpcKuJF8E4J+HmiGtYPTdoGRlFnmJHUqqgD7mZFXE384vvoMz6/P
RM67B/h+RtPc+bs2w5ubNJL3NSCsUZT0eBiG+FfSmfu9Zqmq5bIfXKKb5cZ59Wue
LIos0MJ8yUr02+cviTiI8ThqxGTaULRgiSJuCEbZ2diBTSfEBOZawfb17MycojYw
kdi9WHNUqIG+tzpKRMP9SHEzed+BSJ1tKR0CEqZQC+KMdprXZwPbfjJbCphAqj3S
tVI0rBdlTWoOggykgc6PBkXe4zw2Uf+//Ocq55BflFq5BIvmJ3RS+8ezSSoy60J3
VUS0ebM/iGgzHhfywLleSrSY6rHeTiex4DlJnms7iCVAO8zFUrNPjdqGPCZtShWM
Jp+hx3uOK31N/rb5iYaYhgoCzzxq49Bvj7XReCBL2kAHtn3B2DD+HK4x2lQAtwYZ
yuvr1OYTsDz/UuX84glr3nuPrCrbwgTePzJR/iQm5bB6+F2bgaNUR7ALe9y7SESo
uqeUJyhXAQAIvauz5r8dn2qNIHBWAfNXE/eNnJs8EDPl83WegoGgU8U+cvMduGJY
aX9vG6LrYh8T0j78+zdbQeIIVVKNqsbjKx4onjX4S/cNoKDwqZpAL6oN/UIYQL5q
BALSpB1BF+JyXQBP6tL6bEMBQ1Juk5W6Xci/ii3ebHkoOKw/kx1rlkTTeOoWQMWH
CjcOkML6sMolwl5KsN1D9ofZ+5idOVlnjfdhWbHn2x6a8n+iBfI6/6tKa/MW2JY1
wiw6F/1ds205/NSYOBf1eyFLKnGLqeJQpo8EsQrfhxlQEeIRLnkBKMKOn6VpQaMD
EfyZ/ifAOct47iffl24S+Pbb2DmkCLt77Rc/Qm+FfVfIDd4BLwPfnbO/EosPuGv4
FWvj82a+Rlr4MF78kksewnZWHVaARj8r1BWoNdiQWapNjW5gCjSQTnc1Sb1YWYEu
XkONjsRl2adUHzN4hn4PzSdZZLEiPdYvsbL6RX5u5AvalPEVJnYaulEVxO1bGzfx
m012XNT12it2Rs+ejdp5Z22+S0JNOPN3egU8Hvp7YygidVCkc5dJD+vALHz4Cf4N
nu9CeadwibLlGhvaDOdH8PnSWH/k3d35iyJ2QslspYqIAjUvdgzVjUsCku+6z90d
VwpBwVi+7lFnckyazk3KN77UPexKU/ipeU+R8Utjv6As2YYCEcQutS9W/tPbfor+
/bWVEeeTSmFH5CG95miBCJed1TMbI/zjJM0u+Lnpx5AdTJeTRmpi7DlVs5e2QWvJ
Kxb7TT9otSb4EYqexUGRfImi8RCiCEFTolA5RX5n/PnidjAH6U0Q0KZ9mVhVWeD9
-----END RSA PRIVATE KEY-----`

console.log('Public key:', publicKey);
console.log('Private key:', privateKey);

// // Mã hóa dữ liệu với public key
// const encryptedData = crypto.publicEncrypt(
//     {
//         key: publicKey,
//         padding: crypto.constants.RSA_PKCS1_PADDING
//     },
//     Buffer.from(plaintext, 'utf-8')
// );

// console.log('Encrypted:', encryptedData.toString('base64'));
const edata = new Buffer.from(`KUtrxkQTGj0WahBdkPXxGdufclYOOq9BRwxaLKZl78EQPYqTRgc2w+8OE/ZImR13vbWJ7CbwlUD/rO4EAr1TKomE3SYhKBPB5psB3zrjg4y0BF3yG2+Wp2xC5CWUnSv/AzRGhnasshcqZuZz9xQqIr3pbSKujSVw0JGOy0BquWC100Mv9EKAsZOJEWAW6C5sjDYajnFFLV2Hn8FLe8Nvf3I/LUv+1zJuAAxiZZ7AAWVJdFfPd2a5puTDVz4dAw/vpJ9VQlSI1WDLwGmHrXhcTxeP7VcTh/abIS6aUx2+jXHdNNrOnQzHneJsTILuVtZTe1KAUxPFrYzQHl/f1MhT+A==`, 'base64');
// Giải mã dữ liệu với private key
const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        passphrase: 'supersecret',
        padding: crypto.constants.RSA_PKCS1_PADDING
    },
    edata
);

console.log('Decrypted:', decryptedData.toString('utf-8'));
