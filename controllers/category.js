const Category = require('../models/category')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll =(req, res)=>{ 
	try {
	 Category.findAll('idUser',req.user.id)
		.then((resault)=> {
			res.status(200).json(resault)
		})
		
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getById = async (req, res)=>{
	try {
		await Category.findAll('id',req.params.id)
		.then((resault)=> {
			res.status(200).json(resault)
		})
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.remove = async (req, res)=>{
	try {
		await Category.remove(req.params.id)
	.then(()=> { 
				res.status(200).json({
				message:'The category was deleted and all positions belonging to it'
		})
	})
		
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.create =async (req, res)=>{
	await Category.findAll('name',req.body.name)
	.then((category)=>{ 
		if (category  !== true) {
			res.status(400).json({
				message: 'Category with this name alryady exists'
			})
			
		}else{
			try {
				Category.create(req.body.name,req.body.description,req.user.id,req.file?req.file.path : '' )
						 res.status(201).json({
					  message: 'New category created'
				  })
			  
		  
			  } catch (error) {
				  errorHandler(res,error)
			  }
		}
	})
	
	
}

module.exports.update = async(req, res)=>{


	try {
		if(req.file){
			const imageSrc = req.file.path
			await Category.update(req.params.id, req.body.name, req.body.description, imageSrc)
			res.status(200).json('Category updated')
		} else{
			await Category.update(req.params.id, req.body.name, req.body.description)
			res.status(200).json('Category updated')
		}
		
	} catch (error) {
		errorHandler(res,error)
	}
}
