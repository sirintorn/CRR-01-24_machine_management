import { DB, TABLE_NAMES, TableRecord, TableRecordsSchema } from "../../db/db";

export interface Post extends TableRecord {
    content: string;
}

export class PostSchema extends TableRecordsSchema {
    constructor() {
        super(TABLE_NAMES.Posts);
    }

    getByUser(user_id: string): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            const table = DB<Post>(this.tableName);
            table.select('*')
            .where('created_by', user_id)
            .where('deleted_by', null)
            .then((posts) => {
                resolve(posts);
            }).catch(err => {
                reject(err);
            });
        });
    }
}