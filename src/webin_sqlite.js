module.exports = class sqlite {
    constructor(db) {
        this.db
        this.report
        this.status
    }
    /**
     * 
     * @param {String} name 
     * @returns 
     */
    static init(name) {
        try {
            this.status = 'success';
            this.db = require('better-sqlite3')(name)
        } catch (error) {
            this.status = 'failed';
        }
        return ({ "status": this.status, "db": this.db, "transaction_date": new Date() })
    }
    /**
     * 
     * @returns 
     */
    static QueryTableAll = () => new Promise((resolve, reject) => {
        try {
            const tablename = this.db.prepare("SELECT * FROM sqlite_schema").all()
            const ArrayText = []
            tablename.map(async (/** @type {{ name: any; }} */ x) => {
                ArrayText.push(x.name)
            });
            this.report = ArrayText
            this.status = 'success'
        } catch (error) {
            this.report = []
            this.status = 'failed'
        }
        resolve({ "status": this.status, "schemas": this.report, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @returns 
     */
    static QueryTable = (kind = '') => new Promise((resolve, reject) => {
        let tablename = this.db.pragma("table_info('" + kind + "')");
        let ArrayText = []
        tablename.map(async (/** @type {{ name: any; }} */ x) => {
            ArrayText.push(x.name)
        });
        resolve({ "table_info": tablename, "table_columns": ArrayText, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @param {Number} limit 
     * @returns 
     */
    static QueryAll = async (kind = '', limit = 9999) => new Promise((resolve, reject) => {
        try {
            this.status = 'sccuess'
            this.report = this.db.prepare('SELECT * FROM ' + kind + ' LIMIT ' + limit).all()
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        //@ts-ignore
        resolve({ "status": this.status, "querys": this.report, "transaction_date": new Date() })
    });
    /**
     * 
     * @param {String} kind 
     * @param {Array} select 
     * @param {Array} index 
     * @param {Boolean} conjunction 
     * @param {Array} oderby
     * @param {Number} limit 
     * @returns 
     */
    static QueryIndexAll = async (kind = '', select = [], index = [], conjunction = true, oderby = [], limit = 9999) => new Promise((resolve, reject) => {
        try {
            let particle
            (conjunction == true || conjunction == null) ? particle = ' and ' : particle = ' or '
            if (index.length == 0) {
                this.report = this.db.prepare('SELECT ' + select.map((x) => `${x}`).join(", ") + ' FROM  ' + kind + ' LIMIT ' + limit).all()
            } else {
                this.report = this.db.prepare('SELECT ' + select.map((x) => `${x}`).join(", ") + ' FROM ' + kind + ' WHERE ' + index.map((x) => `${x}`).join(particle) + ' ORDER BY ' + oderby.map((x) => `${x}`).join(", ") + ' LIMIT ' + limit).all()
            }
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({ "status": this.status, "querys": this.report, "transaction_date": new Date() })
    });
    /**
     * 
     * @param {String} kind 
     * @param {Array} select 
     * @param {Array} index 
     * @param {Boolean} conjunction 
     * @returns 
     */
    static QueryIndexGet = async (kind = '', select = [], index = [], conjunction = true) => new Promise((resolve, reject) => {
        try {
            let particle;
            (conjunction == true || conjunction == null) ? particle = ' and ' : particle = ' or ';
            this.report = this.db.prepare('SELECT ' + select.map((x) => `${x}`).join(", ") + ' FROM ' + kind + ' WHERE ' + index.map((x) => `${x}`).join(particle)).get()
            if (this.report == undefined) this.report = null;
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({ "status": this.status, "querys": this.report, "transaction_date": new Date() })
    });
    /**
     * 
     * @param {String} data 
     * @returns 
     */
    static QueryCutomerAll = async (data) => new Promise((resolve, reject) => {
        try {
            this.report = this.db.prepare(data).all()
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({ "status": this.status, "querys": this.report, "transaction_date": new Date() })
    });
    /**
     * 
     * @param {String} data 
     * @returns 
     */
    static QueryCutomerGet = async (data) => new Promise((resolve, reject) => {
        try {
            this.report = this.db.prepare(data).get()
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({ "status": this.status, "querys": this.report, "transaction_date": new Date() })
    });
    /**
     * 
     * @param {String} kind 
     * @param {Object} data 
     * @returns 
     */
    static InsertTable = (kind = '', data = {}, timestamp = true) => new Promise((resolve, reject) => {
        try {
            (timestamp == true || timestamp == null || typeof timestamp == 'string') ? timestamp = ["'created_at' TEXT NOT NULL, 'updated_at' TEXT NOT NULL "] : timestamp = ''
            let createtable = "CREATE TABLE IF NOT EXISTS " + kind + " ('id' INTEGER PRIMARY KEY, " + Object.keys(data).map((x) => `'${x}' ${data[x]}`).join(", ") + " , " + timestamp + " );"
            this.report = this.db.exec(createtable);
            this.status = 'sccuess'

        } catch (error) {
            this.status = 'failed'

            this.report = { messagess: "Error" }
        }
        resolve({  "status": this.status,  structure: this.report, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @param {Object} data 
     * @returns 
     */
    static InsertAll = (kind, data) => new Promise((resolve, reject) => {
        const tablename = this.db.pragma("table_info('" + kind + "')");
        const ArrayText = []
        tablename.map(async (x) => {
            if (x.name != 'id' && x.name != 'created_at' && x.name != 'updated_at') {
                ArrayText.push(x.name)
            }
        });
        let InsertManys = this.db.prepare("INSERT INTO " + kind + " ('created_at','updated_at', " + ArrayText.map((x) => `'${x}'`).join(",") + ") VALUES ('" + new Date().toString() + "','" + new Date().toString() + "' , " + ArrayText.map((x) => `?`).join(" , ") + ") ")
        data.map(async (item) => {
            InsertManys.run(
                Object.keys(item).map((x) => `${item[x]}`),
            )
        });
        this.status = 'sccuess'
        resolve({  "status": this.status,  structure: InsertManys, "transaction_date": new Date() })
    })

    /**
     * 
     * @param {String} kind 
     * @param {Object} data 
     * @returns 
     */
    static InsertIndex = (kind, data) => new Promise((resolve, reject) => {
        try {
            const insert = this.db.prepare("INSERT INTO " + kind + " ('created_at','updated_at'," + Object.keys(data).map((x) => `${x}`) + ") VALUES ('" + new Date().toString() + "','" + new Date().toString() + "' ," + Object.keys(data).map((x) => `?`) + ")");
            this.report = insert.run(Object.keys(data).map((x) => `${data[x]}`))
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({  "status": this.status,  structure: this.report, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @returns 
     */
    static DeleteTabel = (kind = '') => new Promise((resolve, reject) => {
        try {
            this.report = this.db.exec('DROP TABLE ' + kind)
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({  "status": this.status,  structure: this.report, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @returns 
     */
    static DeleteRowAll = (kind = '') => new Promise((resolve, reject) => {
        try {
            this.report = this.db.prepare('DELETE FROM ' + kind).run()
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({  "status": this.status,  structure: this.report, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @param {Array} condition 
     * @returns 
     */
    static DeleteIndex = (kind = '', condition = []) => new Promise((resolve, reject) => {
        try {
            this.report = this.db.prepare('DELETE FROM ' + kind + ' WHERE ' + condition.map((x) => `${x}`).join(' AND ')).run()
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({  "status": this.status,  structure: this.report, "transaction_date": new Date() })
    })
    /**
     * 
     * @param {String} kind 
     * @param {Object} data 
     * @param {Array} index 
     * @param {Boolean} index 
     * @returns 
     */
    static UpdatedIndex = (kind = '', data = {}, index = [], conjunction = true) => new Promise((resolve, reject) => {
        try {
            let particle = '';
            (conjunction == true || conjunction == null) ? particle = ' and ' : particle = ' or ';
            let SelectDB = this.db.prepare("UPDATE " + kind + " SET " + Object.keys(data).map((x) => `${x} = ?`).join(' , ')+" , updated_at = '"+new Date()+"' " + " WHERE " + index.map((x) => `${x}`).join(''));
            SelectDB.run(Object.keys(data).map((x) => `${data[x]}`))
            this.report = SelectDB
            this.status = 'sccuess'
        } catch (error) {
            this.status = 'failed'
            this.report = { messagess: "Error" }
        }
        resolve({  "status": this.status,  structure: this.report, "transaction_date": new Date() })
    })
}