import axios from "axios";
import { Config } from './config';

export class MDCAPI {
  static getDBVersionByCompany(company_id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${Config.getMDCPath()}/db-versions/by-company/${company_id}`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
