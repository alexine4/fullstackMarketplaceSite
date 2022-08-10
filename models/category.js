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
class Category extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await Category.init(
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
				idUser:{
					type:Sequelize.INTEGER,
					allowNull:false
				},
				imageSrc:{
					type:Sequelize.STRING,
					allowNull:true
				}
		
			
		  },
		  { sequelize, modelName: 'category' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

	module.exports.create = (name,description,idUser,imageSrc)=>{
		Category.create(
			{
				name: name,
				description: description,
				idUser: idUser,
				imageSrc:imageSrc
			}
		)
		
	}

	module.exports.findAll = async(table,id)=>{
		if (table === 'id') {
			const  category  = await Category.findOne({
				where:{
					id: id
				}
			})
			if (category == null){
				return true
				}else{ return category}
		} else if(table === 'idUser'){
			const  category = await Category.findAll({
				where:{
					idUser: id
				}
			})
			 return category
		}else if(table === 'name'){
			const  category = await Category.findOne({
				where:{
					name: id
				}
			})
			if (category == null){
				return true
				}else{ return category}
		}
		 else{
			res.status(404).json({
				message:'Input data incorrect'
			})
		}
		
	}

	module.exports.remove =async (id)=>{
		
		await Category.destroy(
			{
				where:{
					id: id
				}
			}
		)
		
	}
	module.exports.update =async (id,name,description,imageSrc)=>{
		if (imageSrc)
		{await Category.update({name: name, description:description , imageSrc:imageSrc},
			{
				where:{
					id: id
				}
			}
		)} else{
			await Category.update({name: name, description:description},
				{
					where:{
						id: id
					}
				}
			)
		}
			
	}