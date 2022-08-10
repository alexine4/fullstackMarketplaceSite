const Sequelize = require('sequelize')
const Position = require('../models/position')
const connectDB = require('../connection/connectionDB')

const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB,
	{
		dialect: connectDB.typeDB,
	}
	
)
class OrderList extends Sequelize.Model {}


module.exports.initialization = async()=>{
	
	await OrderList.init(
		  {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			 },
			idOrder: {
				type:Sequelize.INTEGER,
				allowNull: false	
				},		
			idPosition: {
				type:Sequelize.INTEGER,
				allowNull: false	
				},
			quantity: {
				type:Sequelize.INTEGER,
				allowNull: false
				},
			cost: {
				type:Sequelize.FLOAT,
				allowNull: false
				},
				

				
		
			
		  },
		  { sequelize, modelName: 'orderList' }
		)
		
		sequelize.sync({alter:true})
		return true
	}
``
module.exports.create = async(idOrder,idPosition,quantity)=>{
	
		const position = await Position.findById(idPosition)
	if (position!==false) {
		const price =  Number(position.dataValues.cost) * Number(quantity)

		const orderList = await OrderList.findOne({where:{idOrder:idOrder,
			idPosition:idPosition}})
			
		
			if (orderList === null) {
				await OrderList.create({
					idOrder:idOrder,
					idPosition:idPosition,
					quantity: quantity,
					cost: price
				}) 
			}else{
				const quant = Number(orderList.dataValues.quantity) + Number(quantity)
				const price =  Number(position.dataValues.cost) * Number(quant)
					OrderList.update({quantity:quant,cost:price},{where:{idOrder:idOrder,
					idPosition:idPosition}})
			}
	}else{
		return false
	}
	}
		


module.exports.updateById = async  (idPosition, idOrder, quantity)=>{
	const position = await Position.findById(idPosition)
	const price =  Number(position.dataValues.cost) * Number(quantity)
	OrderList.update({quantity, cost:price},{where:{idPosition, idOrder}})
}

	module.exports.remove = (idOrder,idPosition)=>{
		OrderList.destroy({
			where:{
				idOrder:idOrder,
				idPosition:idPosition,
			}
		})
	}

	module.exports.findAll =async (idOrder)=>{
		const orderList=	 await OrderList.findAll({where:{idOrder}})
		if (orderList[0] ===null) {
			return false
		}else{
			return orderList
		}
	}

	
	module.exports.remove =async (id)=>{
		
		await OrderList.destroy(
			{
				where:{
					id: id
				}
			}
		)
		
	}