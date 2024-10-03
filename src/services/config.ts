
const env = process.env.NODE_ENV || 'development';

export class Config{

    static getMDCPath(){
        if(env == 'development'){
            return 'http://localhost:4000/api';
        }else if(env == 'staging'){
            return 'http://172.19.0.3:4000/api';
        }else{
            return '';
        }
    }
}