const Sequelize = require("sequelize");

const InHouseUser = {
	name: 'in_house_user',
	schema: {
		id: {
			type: Sequelize.UUID,
			unique: true,
			primaryKey: true
		},
		user: {
			type: Sequelize.STRING,
			required: true
		}
	}
}

module.exports = InHouseUser;

