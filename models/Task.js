const Sequelize = require("sequelize");

const Tasks = {
	name: 'tasks',
	schema: {
		id: {
			type: Sequelize.UUID,
			unique: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			required: true
		},
		for: {
			type: Sequelize.STRING
		}
	}
}

module.exports = Tasks;

