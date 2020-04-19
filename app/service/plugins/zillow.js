
import AddressHelper from '../controllers/helper/address_helper';
import { requester } from "./axios";
const xml_parser = require('fast-xml-parser');

export default class Zillow {
  static zwsId = "X1-ZWz1gydy3hcop7_9ljvt";
  static base_url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm'


  /**
   * Get apartment infomation by zillow API
   * @param {String} address 
   */

  static getInformation(address) {
    return new Promise((res, rej) => {

      const addressInfo = AddressHelper.extractAddressElement(address);

      const url = this.base_url + `?&zws-id=${this.zwsId}&address=${addressInfo.address}&citystatezip=${addressInfo.zip_code}`

      requester.get(url)
        .then((response) => {
          try {
            var data = xml_parser.parse(response.data);
            let searchResult = data[Object.keys(data)[0]];
            if (searchResult.response) {
              let results = data[Object.keys(data)[0]].response.results;
              let result = results.result;
              if (Array.isArray(result)) {
                if (result.length == 1) {

                  result = result[0];
                  res(result)
                } else rej(new Error('Unclear input address'))
              }
              else if (typeof result === "object") res(result);
            } else rej(new Error('No exact match found for input address'))

          } catch (e) {
            rej(e)
          }
        })
        .catch((error => {
          console.log(error)
          rej(error);
        }))
    });
  }
}

