# Webin Sqlite Thailand
[![standard-readme compliant](https://img.shields.io/badge/sqlite-1000-red)](https://github.com/ez-kraivit/webin_sqlite#readme) 
[![standard-readme compliant](https://img.shields.io/badge/webin-thai-blue)](https://github.com/ez-kraivit/webin_sqlite#readme)

คำอธิบายเอกสารนี้ หากท่านเห็นว่าอยากให้มีการพัฒนาและสามารถปรับปรุงได้เลย

เอกสารอันนี้เป็นรูปแบบการ Format ตามความต้องการเพื่อให้ใช้งานได้เหมาะและเรียบง่ายที่สุด โดยจะมีการอัพเดทและพัฒนาในทิศทางการใช้งานให้มากยิ่งขึ้น ซึ่งหากมีอะไรอยากปรับปรุงหรือเพิ่มเติม สามารถเข้ามาร่วมพัฒนาเป็นส่วนหนึ่งร่วมกัน

เหตุผลทำไมต้องออกแบ :

1. ผู้พัฒนา พบว่าต้องการนำไปใช้กับ Lib อื่นในการต่อพวง และก็สะดวกต่อการใช้งานกับ Express and Hapi ตามความต้องการของผู้ออกแบบ
2. ผู้พัฒนา มีเจตนาที่ดีในการพัฒนาระบบ และมุ่งหวังว่าอยากให้ระบบพัฒนาไปในทิศทางที่ใช้งานง่าย
3. ผู้พัฒนา ต้องการสร้างผลงานในมุมมองการต่อยอดและการทำ Lib สำหรับคนไทยและถ่ายทอดต่อไปได้
4. ผู้พัฒนา ต้องการพลังในการพัฒนาระบบร่วมกันโดย ต้องปรับปรุงไปในทิศทางที่ดียิ่งขึ้น

จากการใช้งานแล้ว ยังไม่พบปัญหา ซึ่งการใช้งาน Sqlite ถูกนิยมใช้ร่วมกับ K8s เพียงเพื่อทำงานภายใต้ทีมงานและการทำงานภายใต้บริษัทที่ ทดสอบ Prototype ก่อนนำออกไปสู่ตลาด หรือ Demo ผลิตภัณฑ์ จนไปถึงการทำระบบบน Prod จริง ๆ ขึ้นมาในโครงงาน

## คู่มือการใช้งาน

- [ประวัติ](#ประวัติ)
- [ติดตั้ง](#ติดตั้ง)
- [การใข้งาน](#การใข้งาน)
	- [เพิ่มข้อมูล](#เพิ่มข้อมูล)
	- [ดูข้อมูล](#ดูข้อมูล)
	- [แก้ไขข้อมูล](#แก้ไขข้อมูล)
	- [ลบข้อมูล](#ลบข้อมูล)


## ประวัติ

ผู้พัฒนา กำลังศึกษาชั้นปีที่ 4 แล้วมองเห็นว่าอยากทำฟังก์ชันที่แบ่งปัน ไอเดียและแนวคิดสำหรับผู้ที่ต้องการ การใช้งาน Lib ง่าย ๆ ซึ่งแนวคิดนี้ก็ถูกส่งต่อภายใต้การฝึกงานและสหกิจศึกษาในการทำ DB ด้วยการใช้ Sqlite ผู้พัฒนามองเห็นว่า การสร้างชุดข้อมูล 1 ล้านข้อมูล ใช้เวลาเพียง 20 วินาที ซึ่งลองทำระบบ Trigger และการทำ Realtime พบว่าหากใช้ CPU and Ram SSD ที่เพียงพอ สามารถทำระบบสเกล ผู้ใช้งานจำนวนมหาศาลได้ และผู้พัฒนากำลังทำวิจัยเกี่ยวกับการทำ Multi Sqlite ในการทำ Model AI Or การทำระบบที่ปลั๊กร่วมกับ NoSql ในการโอนย้ายข้อมูล จำนวนมหาศาลได้เช่นกัน ผู้พัฒนาเลยอยากชักชวนว่า การทำระบบด้วย nodejs ในการทำ sqlite การันตีว่าทำสเกลได้ ซึ่งผู้คาดหวังอาจจะต้องพัฒนาหลากหลายแขนงในการทำในเรื่องของ network ร่วมถึงการทำ Big O ด้วยเช่นกัน ขอขอบคุณที่เข้ามาร่วมเป็นส่วนหนึ่ง

> นาย ไกรวิท มงคลสกุลฤทธิ์

~ [Kraivit Mongkhonsakunrit](https://www.facebook.com/Creeksvit)


## ติดตั้ง
This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.
```sh
$ npm i webin_sqlite
```

## การใช้งาน
```sh
$ const sqlite = require('../src/webin_sqlite')
$ sqlite.init('./db/test.db')
```

### เพิ่มข้อมูล
- InsertTable การเพิ่มตาราง
```sh
$ await sqlite.InsertTable('history',{"username":"TEXT NOT NULL","detail":"TEXT NOT NULL","note":"TEXT NOT NULL"},true)
```

- InsertIndex การเพิ่มข้อมูลในตาราง
```sh
$ const data = {"username":"1191","password":"1191","AGE":13}
$ await sqlite.InsertIndex('users',data)
```

- InsertAll การเพิ่มข้อมูลในตารางมากกว่า 1
```sh
$ const data = [
        {"username":"1112","password":"1112","AGE":20},
        {"username":"1150","password":"1150","AGE":13}
    ]
$ await sqlite.InsertAll('users',data)
```

### ดูข้อมูล
- QueryTableAll ดูตารางทั้งหมด
```sh
$ await sqlite.QueryTableAll()
```
ตัวอย่างในการแสดงผล
```sh
{
  status: 'success',
  schemas: [ 'history', 'users' ],
  transaction_date: 2021-03-23T18:02:12.344Z
}
```

- QueryTable ดูข้อมูลในตาราง
```sh
$ await sqlite.QueryTable('users')
```
ตัวอย่างในการแสดงผล
```sh
{
  table_info: [
    {
      cid: 0,
      name: 'id',
      type: 'INTEGER',
      notnull: 0,
      dflt_value: null,
      pk: 1
    },
    {
      cid: 1,
      name: 'username',
      type: 'TEXT',
      notnull: 1,
      dflt_value: null,
      pk: 0
    },
    {
      cid: 2,
      name: 'password',
      type: 'TEXT',
      notnull: 1,
      dflt_value: null,
      pk: 0
    },
    {
      cid: 3,
      name: 'AGE',
      type: 'INTEGER',
      notnull: 0,
      dflt_value: null,
      pk: 0
    },
    {
      cid: 4,
      name: 'created_at',
      type: 'TEXT',
      notnull: 1,
      dflt_value: null,
      pk: 0
    },
    {
      cid: 5,
      name: 'updated_at',
      type: 'TEXT',
      notnull: 1,
      dflt_value: null,
      pk: 0
    }
  ],
  table_columns: [ 'id', 'username', 'password', 'AGE', 'created_at', 'updated_at' ],
  transaction_date: 2021-03-23T18:03:28.588Z
}
```

- QueryAll ดูข้อมูลมากกว่า 1
```sh
$ await sqlite.QueryAll('users')
```

- QueryIndexAll ดูข้อมูลมากกว่า 1 โดยมีเงื่อนไข
```sh
$ await sqlite.QueryIndexAll('users',['username'],[`id=1`],true,['username'])
```

- QueryIndexGet ดูข้อมูล โดยมีเงื่อนไข
```sh
$ await sqlite.QueryIndexGet('users',['username'],[`id=1`])
```

- QueryCutomerGet ดูข้อมูลแบบเขียนรูปแบบเอง
```sh
$ await sqlite.QueryCutomerGet()
```

- QueryCutomerGet ดูข้อมูลแบบเขียนรูปแบบเองมากกว่า 1 
```sh
$ await sqlite.QueryCutomerGet()
```

### แก้ไขข้อมูล
- UpdatedIndex การเพิ่มตาราง (รอพัฒนา)
```sh
$ await sqlite.UpdatedIndex('users',{"password":`123123123123`,"AGE":10},[`username = '1150'`])
```


### ลบข้อมูล
- DeleteRowAll การเพิ่มตาราง
```sh
$ await sqlite.DeleteRowAll('users')
```

- DeleteIndex การเพิ่มข้อมูลในตาราง
```sh
$ await sqlite.DeleteIndex('users',[`username ='1112'`])
```

- DeleteTabel การเพิ่มข้อมูลในตารางมากกว่า 1
```sh
$ await sqlite.DeleteTabel('users')
```

ปล.รออัพเดทข้อมูลอีก ในการพัฒนาระบบ ท่านสามารถเป็นส่วนหนึ่งในการพัฒนาระบบได้เช่นกัน