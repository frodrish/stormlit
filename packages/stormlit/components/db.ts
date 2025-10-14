import DS from 'better-sqlite3';
import { fileURLToPath } from 'url';
import {cacheDir, outDir} from "astro:config/server";

function connect(dbFileName: String) {
    let dir;
    if (import.meta.env.PROD) {
        dir = outDir;
    } else {
        dir = cacheDir;
    }

    const path = fileURLToPath(`${dir}${dbFileName}`);
    console.error(path);
    const db = new DS(path);

    db.exec(`CREATE TABLE IF NOT EXISTS queries
                        (
                                id TEXT PRIMARY KEY,
                                sql TEXT NOT NULL
                        );`
    );

    return db;
}

export function insertQuery(dbFileName: String, id: String, sql :String) :String {


    const db = connect(dbFileName);

    const stmt = db.prepare(`INSERT INTO queries (id, sql) VALUES (?, ?)
                                    ON CONFLICT(id) DO UPDATE SET
                                    sql = EXCLUDED.sql;
                                `);
    stmt.run(id, sql);

    const data = db.prepare('SELECT * FROM queries WHERE id = ?').get(id);
    db.close();

    return data;
}

export function getQueries(dbFileName: String) :any[] {
    const db = connect(dbFileName);
    const data = db.prepare('SELECT * FROM queries').all()
    db.close();
    return data;
}
