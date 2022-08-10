const Order = require('../models/order')
const OrderList = require('../models/orderList')
const Position = require('../models/position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res)=>{
	
	try {
	
		await Order.findAll(req.user.id,+req.query.order,+req.query.offset, +req.query.limit,req.query.start,req.query.end)
		.then((orders)=> {
			if(orders === false){
				res.status(200).json([])
			}else{
				res.status(200).json(orders)
			}
			
		})
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.create = async (req, res)=>{
	await Order.findOneByStatus(req.user.id)
	.then((order)=>{
		// if order list clear create first order
		if(order ===false){
			try { 
				Order.create( req.user.id ).then(
					()=>{
						 Order.findOneByStatus(req.user.id).then((order)=>{
							OrderList.create(order.id,+req.body.idPosition,+req.body.quantity)
							.then(()=>res.status(200).json('Order list add'))
						})
						
					}
				)
				
		  } catch (error) {
			  errorHandler(res,error)
		  } 
		}
		// add new order if last order was clouse
		if(order.orderStatus === false){
			try { 
				Order.create( req.user.id )
			  res.status(201).json('New order created')
		  } catch (error) {
			  errorHandler(res,error)
		  } 
		}
		// add new info about order
		if (order.orderStatus === true) {
			OrderList.create(order.id,+req.body.idPosition,+req.body.quantity)
			.then(()=>res.status(200).json('Order list add'))
		}
		
		})


	
}

module.exports.getAllByOrder = (req,res)=>{
	try {
		
		OrderList.findAll(req.params.idOrder)
				.then((orderList)=>{
					if (orderList === false) {
						
						res.status(200).json([])
					}else{
						for (let index = 0; index < orderList.length; index++) {
							Position.findById(orderList[index].dataValues.idPosition)
							.then((position)=>{
								orderList[index].dataValues.name = position.dataValues.name
								if (index === orderList.length -1) {
									res.status(200).json(orderList)
								}
								}
							)}
					}}
				)
							
						
	} catch (error) {
		errorHandler(res.error)
	}
}

module.exports.update = async (req, res)=>{
	try {
		await Order.update( req.user.id , req.params.orderStatus)
		res.status(200).json({message:'Order was close'})
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getActualOrder= async (req,res)=>{

	try {
		await Order.findOneByStatus(req.user.id)
		.then((order)=>{
		if (order === false) {
			res.status(200).json({message:'Order was not exist'})
		}else{
			res.status(200).json(order)
		}})
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getActual = async (req,res)=>{
	try {
		await Order.findOneByStatus(req.user.id)
		.then((order)=>{
			if (order === false) {
				res.status(200).json([])
			}else{
				OrderList.findAll(order.id)
				.then((orderList)=>{
					if (orderList === false) {
						
						res.status(200).json({message:'OrderList is clear'})
					}else{
						for (let index = 0; index < orderList.length; index++) {
							Position.findById(orderList[index].dataValues.idPosition)
							.then((position)=>{
								orderList[index].dataValues.name = position.dataValues.name
								if (index === orderList.length -1) {
									res.status(200).json(orderList)
								}
								}
							)}
						
							
						}
										
				})
				
			}
			
		})
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.updateList= (req,res)=>{
	try {
				 OrderList.updateById( +req.body.idPosition,+req.body.idOrder,+req.body.quantity)
			res.status(200).json('Order list was updated')
		} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.getById = async(req,res)=>{
	try {
		Order.findOneByStatus(req.user.id).then((order)=>{
			res.status(200).json(order)
		})
		
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.remove = async (req, res)=>{
	try {
		await OrderList.remove(req.params.id)
	.then(()=> { 
				res.status(200).json({
				message:'The category was deleted and all positions belonging to it'
		})
	})
		
	} catch (error) {
		errorHandler(res,error)
	}
}