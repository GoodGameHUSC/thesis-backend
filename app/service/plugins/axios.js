const axios = require('axios')
const twilloAuthyClient = axios.create({
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Authy-API-Key': 'agT2SmInz6PpciMIogeIp4s5noEtSMba',
    "Content-Type": "application/json"
  },
  'json': true,
  baseURL: 'https://api.authy.com/protected/json/',
})

const requester = axios.create({
  crossDomain: true,
  headers: {
    "Content-Type": "application/json"
  },
  'json': true,
});
export {
  requester,
  twilloAuthyClient
}