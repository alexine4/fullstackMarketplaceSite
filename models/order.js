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
class Order extends Sequelize.Model {}


module.exports.initialization = async()=>{
	
	await Order.init(
		  {
			 id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			 },
			 costs: {
				type: Sequelize.FLOAT,
				allowNull: true	
				},
		
				
			idUser:{
					type:Sequelize.INTEGER,
					allowNull:false
				},
			orderStatus:{
				type:Sequelize.BOOLEAN,
					defaultValue: true
			}		
			
		  },
		  { sequelize, modelName: 'order' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

	module.exports.create = async(idUser)=>{
		await Order.create({
			idUser:idUser,
			
		})
		
	}
	module.exports.update = async (idUser,orderStatus)=>{
		if(orderStatus){
			
		await Order.update({orderStatus:orderStatus},{
			where:{idUser:idUser,
				orderStatus: true}
		})
	}

	}

	module.exports.findOneByStatus = async(idUser)=>{

		const order = await Order.findOne({
			where:{ 	idUser:idUser, orderStatus: true
		}
	})
	if (order === null) {
		return false
	} else{
		return order.dataValues
	}

	}

	module.exports.findAll = async (user, id, offset,limit,start,finish)=>{
		const { Op } = require("sequelize");
	if(id){				
		const orders = await Order.findAll({
			where:{
				idUser:user,
				id: id,
			},
		})
		if(orders[0] ===null){
			return false
		}else{
			return orders
		}
	} else if(!start && finish){

		const orders = await Order.findAll({
			where:{
				idUser:user,
				updatedAt:{
					[Op.lte]:finish
				}
			},
			order:[['updatedAt','DESC']],
			offset: offset,
			limit: limit
		})
		if(orders[0] ===null){
			return false
		}else{
			return orders
		}
	}
	else if(start && finish){
		
		const orders = await Order.findAll({
			where:{
				idUser:user,
				updatedAt:{
					[Op.gte]: start,
					[Op.lte]:finish,
				}
			},
			order:[['updatedAt','DESC']],
			offset: offset,
			limit: limit
		})
		if(orders[0] ===null){
			return false
		}else{
			return orders
		}
	}else if (start && !finish){
		const orders = await Order.findAll({
			where:{
				idUser:user,
				updatedAt:{
					[Op.gte]: start,
				}
			},
			order:[['updatedAt','DESC']],
			offset: offset,
			limit: limit
		})
		if(orders[0] ===null){
			return false
		}else{
			return orders
		}
		
	}
	else {
	
		const orders = await Order.findAll({
			where:{
				idUser:user
			},
			order:[['updatedAt','DESC']],
			limit:limit
			})
			
		if(orders[0] ===null){
			return false
		}else{
			return orders
		}
	} 
	
	}