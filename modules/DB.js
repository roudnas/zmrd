const fs = require("fs");
const path = require("path");
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const FileManager = require("./FileManager");
const {v4: uuidv4} = require("uuid");

class DB {
    static init() {
        dotenv.config();
        this.seq = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USR,
            process.env.DB_PW,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql'
            }
        )
        this.fileManager = new FileManager();
        this.definitions = {};
        this.syncModels();
    }

    static async syncModels() {
        console.log("Syncing models");
        this.fileManager.load("models", async (model) => {
            if (!model.name) return;
            const def = this.seq.define(model.name, model.schema);
            this.definitions[model.name] = def;
            await def.sync({alter: true});
        })
    }

    static async add(name, data) {
        if (!this.definitions[name])
            return;
        if (!data.id)
            data.id = uuidv4();
        await this.definitions[name].create(data);
    }

    static async getAll(name, conditions = {}) {
        if (!this.definitions[name])
            return;
        return await this.definitions[name].findAll(conditions);
    }

    static async getOne(name, conditions = {}) {
        if (!this.definitions[name])
            return;
        return await this.definitions[name].findOne(conditions);
    }

    static async del(name, conditions = {}) {
        if (!this.definitions[name])
            return;
        return await this.definitions[name].destroy(conditions);
    }
}

module.exports = DB;
