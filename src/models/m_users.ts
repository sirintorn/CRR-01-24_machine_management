import CryptoJS from "crypto-js";
import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface User extends TableRecord{
    username: string,
    password_hash: string
}

export class UserSchema extends TableRecordsSchema{
    constructor(){
        super(TABLE_NAMES.Users);
    }

    login(username: string, password: string): Promise<User>{
        return new Promise((resolve, reject) => {
            const pass_hash = CryptoJS.MD5(password).toString(CryptoJS.enc.Utf8);
            const table = DB<User>(this.tableName);
            table.select('*')
            .where('username', username)
            .where('password_hash', pass_hash)
            .first()
            .then((user) => {
                if(user){
                    resolve(user);
                }else{
                    reject('Incorrect username or password.')
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    register(username: string, password: string): Promise<User>{
        return new Promise((resolve, reject) => {
            const table = DB<User>(this.tableName);
            table.select('*')
            .where('username', username)
            .first()
            .then((user) => {
                if(!user){
                    //ถ้ายังไม่มี user นี้อยู่จริง
                    if(password && password.length >= 6 && password.length <= 12){
                        const pass_hash = CryptoJS.MD5(password).toString(CryptoJS.enc.Utf8);
                        let newUser: User = {
                            id: null,
                            username: username,
                            password_hash: pass_hash
                        }
                        this.create(newUser, true).then((vals) => {
                            const id = vals[0].id;
                            newUser.id = id;
                            resolve(newUser);
                        }).catch(err => {
                            reject(err);
                        })
                    }else{
                        reject('Your password must contains 6-12 characters')
                    }
                }else{
                    //ถ้ามี user อยู่ในระบบแล้ว
                    reject('Sorry, this username is already taken.');
                }
            }).catch(err => {
                reject(err);
            });
        })
    }
}