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

  static getShadesWhereIdsIn(db_version_id: any, ids: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({
        "db_version_id": db_version_id,
        "ids": ids
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Config.getMDCPath()}/product-shade-codes/where-ids-in`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
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

  static getCustomShadesWhereIdsIn(db_version_id: any, ids: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({
        "db_version_id": db_version_id,
        "ids": ids
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Config.getMDCPath()}/custom/product-shade-codes/where-ids-in`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
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
