const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const os = require('os')
const dbFolder = os.homedir() + '/.chat_dev/'
const dbName = 'localChat.db'

if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder)
}

const db = new sqlite3.Database(dbFolder + dbName)

const initDatabase = () => {
  db.serialize(() => {
    const createMessageTable = `
      CREATE TABLE "message" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "sender_email" TEXT NOT NULL,
        "receiver_email" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "timestamp" TIMESTAMP NOT NULL DEFAULT (strftime('%s', 'now'))
      );
    `

    const createChatListTable = `
      CREATE TABLE "chat_list" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "sender_email" TEXT NOT NULL,
        "receiver_email" TEXT NOT NULL,
        "last_msg" TEXT NOT NULL,
        "timestamp" TIMESTAMP NOT NULL DEFAULT (strftime('%s', 'now'))
      );
    `

    const createContactTable = `
      CREATE TABLE "contact" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "email" TEXT NOT NULL,
        "friend_email" TEXT NOT NULL,
        "remark" TEXT NOT NULL
      );
    `

    db.run(createMessageTable, (err) => {
      if (err) {
        console.error('Error creating messages table:', err.message)
      } else {
        console.log('Messages table created or already exists.')
      }
    })

    db.run(createChatListTable, (err) => {
      if (err) {
        console.error('Error creating chat_list table:', err.message)
      } else {
        console.log('Chat list table created or already exists.')
      }
    })

    db.run(createContactTable, (err) => {
      if (err) {
        console.error('Error creating contact table:', err.message)
      } else {
        console.log('Contact table created or already exists.')
      }
    })
  })
}

//initDatabase()
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map(keysToCamelCase));
      }
    });
  });
};

const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const insertData = (tableName, data) => {
  const snakeCaseData = keysToSnakeCase(data);
  const columns = Object.keys(snakeCaseData).join(', ');
  const placeholders = Object.keys(snakeCaseData).map(() => '?').join(', ');
  const values = Object.values(snakeCaseData);

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  console.log(query);
  return runQuery(query, values);
};

const getData = (tableName, conditions = '') => {
  const query = `SELECT * FROM ${tableName} ${conditions}`;
  console.log(query);
  return executeQuery(query).then((data) => {
    console.log(data)
    return data
  });
};

const updateData = (tableName, data, conditions) => {
  const snakeCaseData = keysToSnakeCase(data);
  const setClause = Object.keys(snakeCaseData).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(snakeCaseData)];

  const conditionKeys = Object.keys(conditions).map(key => `${toSnakeCase(key)} = ?`).join(' AND ');
  const conditionValues = Object.values(conditions);
  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${conditionKeys}`;
  console.log(query)

  return runQuery(query, [...values, ...conditionValues]);
};

const deleteData = (tableName, conditions) => {
  const conditionKeys = Object.keys(conditions).map(key => `${toSnakeCase(key)} = ?`).join(' AND ');
  const conditionValues = Object.values(conditions);
  const query = `DELETE FROM ${tableName} WHERE ${conditionKeys}`;
  return runQuery(query, conditionValues);
};

const toSnakeCase = (str) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (group) => group[1].toUpperCase())
}

const keysToSnakeCase = (obj) => {
  const newObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toSnakeCase(key)] = obj[key]
    }
  }
  return newObj
}

const keysToCamelCase = (obj) => {
  const newObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toCamelCase(key)] = obj[key]
    }
  }
  return newObj
}
export { insertData, deleteData, getData, updateData, initDatabase, db }
// insertData('message', {
//   senderEmail: 'example@example.com',
//   receiverEmail: 'receiver@example.com',
//   content: 'Hello, world!'
// })
// getData('message', 'where sender_email="example@example.com"').then(data=>{
//   console.log(data)
// })
//
