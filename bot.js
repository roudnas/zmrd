const Zmrd = require('./modules/Zmrd');
const DB = require("./modules/DB");
const Scheduler = require("./modules/Scheduler");

DB.init();
const client = new Zmrd();
client.loadCommands();
client.registerCommands();
client.login();
Scheduler.scheduleJobs();

