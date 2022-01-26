"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (profile, callback) => {
    const queryString = "INSERT INTO mysql_db.profiles(name, nick, bornAt, visible, createdAt, updatedAt, email) VALUES (?,?,?,?,?,?,?)";
    db_1.db.query(queryString, [profile.name, profile.nick, profile.bornAt, profile.visible, profile.createdAt, profile.updatedAt, profile.email], (err, result) => {
        if (err)
            callback(err);
        const insertId = result;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (id, callback) => {
    const queryString = "SELECT p FROM mysql_db.profiles AS p WHERE p.id=?";
    db_1.db.query(queryString, id, (err, result) => {
        if (err)
            callback(err);
        const row = result[0];
        const profile = {
            id: row.id,
            name: row.name,
            nick: row.nick,
            bornAt: row.bornAt,
            visible: row.visible,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            email: row.email
        };
        callback(null, profile);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = "SELECT * FROM mysql_db.profiles";
    db_1.db.query(queryString, (err, result) => {
        if (err)
            callback(err);
        const rows = result;
        const profiles = [];
        rows.forEach(row => {
            const profile = {
                id: row.id,
                name: row.name,
                nick: row.nick,
                bornAt: row.bornAt,
                visible: row.visible,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                email: row.email
            };
            profiles.push(profile);
        });
        callback(null, profiles);
    });
};
exports.findAll = findAll;
const update = (profile, callback) => {
    const queryString = "UPDATE mysql_db.profile SET name=?, nick=?, bornAt=?, visible=?, createdAt=?, updatedAt=?, email=? WHERE id=?";
    db_1.db.query(queryString, [profile.name, profile.nick, profile.bornAt, profile.visible, profile.createdAt, profile.updatedAt, profile.email], (err, result) => {
        if (err)
            callback(err);
        callback(null);
    });
};
exports.update = update;
