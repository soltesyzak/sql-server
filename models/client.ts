import { Client } from "../types/client"
import { db } from "../db"
import { getTimestamp } from "./timestamp"
import { OkPacket, RowDataPacket } from "mysql2"

export const create = (client: Client, callback: Function) => {
    const queryString = "INSERT INTO mysql_db.clients(name, nick, email, published, born, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?)";
    const timestamp: string = getTimestamp()
    console.log(client)
    db.query(
        queryString,
        [client.name, client.nick, client.email, client.published, client.born, timestamp, timestamp],
        (err, result) => {
            if (err) callback(err);
            const insertId = (<OkPacket> result);
            callback(null, insertId.insertId);
        }
    );
};  

export const findOne = (id: number, callback: Function) => {
    const queryString = "SELECT * FROM mysql_db.clients AS p WHERE p.id=?"

    db.query(
        queryString, id, (err, result) => {
        if (err) callback(err);
        if ((<RowDataPacket> result)[0] === undefined) callback();

        const row = (<RowDataPacket> result)[0];
        const client: Client = {
            id:row.id,
            name: row.name,
            nick: row.nick,
            email: row.email,
            published: row.published,
            born: new Date(row.born).toISOString().slice(0,10),
            createdAt: row.createdAt,
            updatedAt: row.updatedAt
        }
        callback(null, client)
        } 
    );
}

export const findAll = (callback: Function) => {
    const queryString = "SELECT * FROM mysql_db.clients"

    db.query(
        queryString, (err, result) => {
            if (err) callback(err);

            const rows = <RowDataPacket[]> result;
            const clients: Client[] = [];

            rows.forEach(row => {
                const client: Client = {
                    id:row.id,
                    name: row.name,
                    nick: row.nick,
                    email: row.email,
                    published: row.published,
                    born: row.born,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt
                }
                clients.push(client);
            });
            callback(null, clients)
        }
    )
}

export const update = (client: Client, callback: Function) => {
    const queryString = "UPDATE mysql_db.clients SET name=?, nick=?, email=?, published=?, born=?, updatedAt=? WHERE id=?";
    const timestamp: string = getTimestamp()
    
    db.query(
        queryString, [client.name, client.nick, client.email, client.published, client.born, timestamp, client.id], (err, result) => {
            if (err) callback(err)
            callback(null, result)
        }
    )
}

export const deleteOne = (id: number, callback: Function) => {
    console.log("delete")
    const queryString = "DELETE FROM mysql_db.clients WHERE id=?"
    db.query(
        queryString, id, (err, result) => {
            if (err) callback(err);
            const deleted = (<OkPacket> result);
            callback(null, deleted)
        }
    );
}