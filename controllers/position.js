const Position = require('../models/position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async (req, res)=>{
	
	try {
		await Position.findByCategory(req.params.idCategory,req.user.id)
		.then((pos)=>{ console.log(pos)
			 res.status(200).json(pos) 
		})
	}catch (error) {
			errorHandler(res,error)
		}
	
}
module.exports.getById = async (req, res)=>{
	
	try {
		await Position.findByUserAndId(req.params.id,req.user.id)
		.then((pos)=>{ console.log(pos)
			 res.status(200).json(pos) 
		})
	}catch (error) {
			errorHandler(res,error)
		}
	
}

module.exports.create = async(req, res)=>{
	
	Position.findByName(req.body.name )
	.then((position)=>{
		if(position === true){
			try {
				Position.create(req.body.name ,req.body.description,req.body.cost,req.body.idCategory ,req.user.id)
				res.status(201).json({					
					message: 'New position created'
					})
			} catch (error) {
				errorHandler(res,error)
			}
		} else{
			res.status(409).json({					
				message: 'Position with this name already exists'
				})
		}
	})
	
}

module.exports.remove = async (req, res)=>{

	try {
		await Position.remove('id',req.params.id)
		res.status(200).json({					
		  message: 'Position deleted'
		  })
  } catch (error) {
	  errorHandler(res,error)
  }
}

module.exports.update = async (req, res)=>{
	
	try {
		await Position.findOneByCategory(req.body.idCategory,req.body.name,req.user.id)
		.then((pos)=>{
			
				Position.update(req.params.id, req.body.name, req.body.description,req.body.cost)
				res.status(200).json(pos)
				
		})
		
  } catch (error) {
	  errorHandler(res,error)
  }
}