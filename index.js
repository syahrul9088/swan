const fetch = require('node-fetch');
var randomize = require('randomatic')
const readlineSync = require('readline-sync');
var randomProfile = require('random-profile-generator');
var md5 = require('md5');

const functionRegist = (email, fp, reff) => new Promise((resolve, reject) => {
    const bodys = {
        fingerprint: fp,
        referredBy: reff,
        referredAt: 1583387534288,
        email: email,
        metadata: {}
    }

fetch('https://api-production.growsurf.com/api/v2/client/campaign/h2qugt/participant', { 
    method: 'POST', 
    body: JSON.stringify(bodys),
    headers: {
        'Host': 'api-production.growsurf.com',
        'Connection': 'keep-alive',
        'Content-Length': 144,
        'Accept': 'application/json, text/plain, */*',
        'Sec-Fetch-Dest': 'empty',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'https://www.swanbitcoin.com',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Referer': `https://www.swanbitcoin.com/?grsf=${reff}`,
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9'

    }
})
.then(res => res.json())
.then(result => {
    resolve(result);
})
.catch(err => reject(err))
});

(async () => {
    const reff = readlineSync.question('[?] Reff code(ex => 757zbt): ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    console.log("")
    for (var i = 0; i < jumlah; i++){
    try {
        const profile = randomProfile.profile()
        const email = `${profile.firstName}${randomize('0', 5)}@gmail.com`
        const ob = randomize('aA0', 10)
        const fp = md5(ob)
        const regist = await functionRegist(email, fp, reff)
        if(regist.accessToken != ""){
            console.log('[+] Berhasil regist!')
        } else {
            console.log('[!] Gagal regist!')
        }
    } catch (e) {
        console.log(e)
    }
}
})()