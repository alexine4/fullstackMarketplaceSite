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
class Position extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		await Position.init(
		  {
			 id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
		
				
			 },
			name: {
				type: Sequelize.STRING,
				allowNull: false		
				},
			description:{
					type:Sequelize.STRING,
					allowNull:false
				},
				cost:{
					type:Sequelize.FLOAT,
					allowNull:false
				},
				idCategory:{
					type:Sequelize.INTEGER,
					allowNull:false
				},
				userCreator:{
					type:Sequelize.STRING,
					allowNull:false
				}
			
				
		
			
		  },
		  { sequelize, modelName: 'position' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

	module.exports.create = (name,description,cost,idCategory,userCreator)=>{
		Position.create(
			{
				name: name,
				description: description,
				cost:cost,
				idCategory: idCategory,
				userCreator:userCreator
			}
		)
		
	}
	module.exports.remove = (colomn,id)=>{
		if (colomn === 'id') {
			Position.destroy(
				{
					where:{
						id: id
					}
				}
			)
		}else if(colomn === 'idCategory'){
			Position.destroy(
				{
					where:{
						idCategory: id
					}
				}
			)
		}else{
			res.status(404).json({
				message:'Input data incorrect'
			})
		}
		
		
	}

	module.exports.findByCategory = async(idCategory, userCreator)=>{
			const  position = await Position.findAll({
			where:{
				idCategory: idCategory,
				userCreator: userCreator
			}
		})
			return position
	}
	
	module.exports.findOneByCategory = async(idCategory,name, userCreator)=>{
		const  position = await Position.findOne({
		where:{
			name:name,
			idCategory: idCategory,
			userCreator: userCreator
		}
	})
		if (position == null){
		return true
		}else{ return position}
}
	module.exports.findById = async(id)=>{
		
		const  position = await Position.findOne({
			where:{
				id: id
			}
		})
		if (position == null){
			return false
			}else{ return position}
	}
	module.exports.findByUserAndId = async(id,user)=>{
		
		const  position = await Position.findOne({
			where:{
				id: id,
				userCreator: user
			}
		})
		if (position == null){
			return false
			}else{ return position}
	}
	module.exports.findById = async(id)=>{
		
		const  position = await Position.findOne({
			where:{
				id: id
			}
		})
		if (position == null){
			return false
			}else{ return position}
	}

	module.exports.update = async(id, name ,description,cost)=>{
		
		
			await Position.update({name: name, description:description, cost:cost},
				{
				where:{
					id: id
				}
			})
	
	
		
	}

	module.exports.findByName = async(name)=>{
		
		const  position = await Position.findOne({
			where:{
				name: name
			}
		})
		if (position == null){
			return true
			}else{ return position}
	}