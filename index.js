/*!
 * etag
 * Copyright(c) 2020 Kraivit Mongkhonsakunrit
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */
const db = require('better-sqlite3')
class webin_sqlite { 
    constructor() {
        this.report = [];
      }
    static show_columnname = (path,name)=>{
        const tablename = db(path).pragma("table_info('"+name+"')");
        tablename.map((x)=>{
            this.report.push(x.name) 
        });
        return this.report
    }
}
module.exports = webin_sqlite;