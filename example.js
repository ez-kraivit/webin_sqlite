const sqlite = require('../src/webin_sqlite');
sqlite.init('./db/test.db')

const QueryTableAll = async ()=>{
    console.log(await sqlite.QueryTableAll())
}
const QueryTable = async (name)=>{
    console.log(await sqlite.QueryTable(name))
}
const QueryAll = async (name)=>{
    console.log(await sqlite.QueryAll(name))
}
const QueryIndexAll = async(name,select,index,conjunction,oderby)=>{
    console.log(await sqlite.QueryIndexAll(name,select,index,conjunction,oderby))
}
const QueryIndexGet = async(name,select,index,conjunction)=>{
    console.log(await sqlite.QueryIndexGet(name,select,index,conjunction))
}
const QueryCutomerAll =async(data)=>{
    console.log(await sqlite.QueryCutomerAll(data))
}
const QueryCutomerGet =async(data)=>{
    console.log(await sqlite.QueryCutomerGet(data))
}

const InsertTable = async ()=>{
    console.log(await sqlite.InsertTable('history',{"username":"TEXT NOT NULL","detail":"TEXT NOT NULL","note":"TEXT NOT NULL"},true))
    console.log(await sqlite.InsertTable('users',{"username":"TEXT NOT NULL","password":"TEXT NOT NULL","AGE":"INTEGER"},true))
}
const InsertAll = async ()=>{
    const data = [
        {"username":"1112","password":"1112","AGE":20},
        {"username":"1150","password":"1150","AGE":13}
    ]
    console.log(await sqlite.InsertAll('users',data))
}
const InsertIndex = async ()=>{
    const data = {"username":"1191","password":"1191","AGE":13}
    console.log(await sqlite.InsertIndex('users',data))
}

const DeleteTabel = async (name)=>{
    console.log(await sqlite.DeleteTabel(name))
}
const DeleteRowAll = async (name)=>{
    console.log(await sqlite.DeleteRowAll(name))
}
const DeleteIndex = async (name,condition)=>{
    console.log(await sqlite.DeleteIndex(name,condition))
}

const UpdatedIndex = async(name,data,index)=>{
    console.log(await sqlite.UpdatedIndex(name,data,index))
}

// QueryCutomerAll()
// QueryCutomerGet()
// QueryAll('users)
// QueryTable('users')
// QueryTableAll()
// QueryIndexAll('users',['username'],[`id=1`],true,['username'])
// QueryIndexGet('users',['username'],[`id=1`])

// InsertTable()
// InsertIndex()
// InsertAll()

// DeleteRowAll('users')
// DeleteTabel('users')
// DeleteIndex('users',[`username ='1112'`])

// UpdatedIndex('users',{"password":`123123123123`,"AGE":10},[`username = '1150'`])