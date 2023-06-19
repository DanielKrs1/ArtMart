const fs = require('fs');
const path = require("path");

const SQL = Object.create(null);

const __sqlqueryFiles = fs.readdirSync(path.join(__dirname, "./queries/"), { withFileTypes: true });
for (const sqlFile of __sqlqueryFiles) {
    if (sqlFile.isFile() && sqlFile.name.endsWith(".sql")) {
        SQL[sqlFile.name.slice(0, 0 - ".sql".length)] = fs.readFileSync(sqlFile.path);
    }
}

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const conn = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000")
});

const runquery = (query, args) => new Promise((res, rej) => {
    conn.execute(query, args, (error, results) => {
        if (error) rej(error);

        res(results);
    });
});

const db = {
    artCategory: {
        async create(categoryName) {
            return await runquery(SQL.create_category, [ categoryName ]);
        },
        async list() {
            return await runquery(SQL.list_categories);
        },
        async fetch(categoryId) {
            return await runquery(SQL.read_category, [ categoryId ]);
        }
    },
    art: {
        async create(artData, categoryId, ownerId, artName) {
            return await runquery(SQL.create_category, [ 
                artData, categoryId, ownerId, artName, ownerId
             ]);
        },
        async setNewOwner(artId, ownerId) {
            return await runquery(SQL.update_art_owner, [ ownerId, ownerId, artId ]);
        },
        async fetch(artId) {
            return await runquery(SQL.read_single_art, [ artId ])
        },
        async listAll() {
            return await runquery(SQL.read_all_art)
        },
        async listByUser(ownerId) {
            return await runquery(SQL.read_user_art, [ ownerId ])
        }
    },
    transactions: {
        async create(fromId, toId, artId) {
            return await runquery(SQL.create_transaction, [ fromId, toId, artId ])
        },
        // should returns a list of any transaction who's fromId or toId == userId
        async listByUser(userId) {
            return await runquery(SQL.read_transactios, [ userId, userId ]);
        }
    },
    user: {
        async create(email) {
            return await runquery(SQL.create_user, [ email ]);
        },
        async listArt(ownerId) {
            return db.art.listByUser(ownerId);
        },
        async getByEmail(email) {
            return await runquery(SQL.read_user, [ email ]);
        }
    },
}

module.exports = db