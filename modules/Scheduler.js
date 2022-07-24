const cron = require("node-cron");
const {execute: showTasks} = require("../commands/ShowTasks");
const dotenv = require("dotenv");

class Scheduler {
    static async scheduleJobs() {
         dotenv.config();
         cron.schedule("0 9 * * mon", async () => {
            await showTasks(null, process.env.TASK_CHANNEL_ID);
         });
    }
}

module.exports = Scheduler;