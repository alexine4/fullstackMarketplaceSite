const Sequelize = require('sequelize')

const connectDB = require('../connection/connectionDB')

const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB,
	{
		dialect: connectDB.typeDB,
	}
	
)
class User extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await User.init(
		  {
			 id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
		
				
			 },
			username: {
				type: Sequelize.STRING,
				allowNull: false		
				},
				email:{
					type:Sequelize.STRING,
					allowNull:false
				},
				password:{
					type:Sequelize.STRING,
					allowNull:false
				}
				
		
			
		  },
		  { sequelize, modelName: 'user' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

module.exports.create = (username,email,password)=>{
	User.create(
		{
			username: username,
			email: email,
			password: password
		}
	)
	
}




module.exports.findOne = async function (colomnName , colomnValue){
	if (colomnName === 'username'){
		const users = await User.findOne({
			where: {
				username: colomnValue
			}
		 })		
		 if (users == null){
			return true
			}
			return users
		
	}
	else if(colomnName === 'email' ){
		const users = await User.findOne({
			where: {
				email: colomnValue
				}
			 })	
			 if (users == null){
				return true
				}
				return users		
	}	else{
		console.log('Incorrect colomn name');
	}
	
}

module.exports.findByIds = async function (idUser){
	
	const users = await User.findOne({
		where: {
			id: idUser
			}
		 })	
		 return users
				
	
}