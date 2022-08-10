const Sequelize = require('sequelize')

const nameDB = 'simpleMarket'
exports.nameDB = nameDB

const loginDB = 'root'
exports.loginDB = loginDB

const passwordDB = '01010203'
exports.passwordDB = passwordDB

const typeDB = 'mysql'
exports.typeDB = typeDB

	const sequelize = new Sequelize(
		nameDB,
		loginDB,
		passwordDB,
		{
			dialect: typeDB,
		}
		
	)
	
exports.sequelize = sequelize

const jwt = 'jwt-key'
exports.jwt = jwt