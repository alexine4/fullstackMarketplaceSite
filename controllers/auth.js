const bCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const connectionDB =  require('../connection/connectionDB')
const errorHandler = require('../utils/errorHandler')



module.exports.login = async (req, res)=>{

	user.initialization();
	

if(req.body.email){
	const checkEmail =  user.findOne( 'email', req.body.email)
			checkEmail.then((Email)=>{
				
				if(Email !==  true){
				// email already exist 
				const passwordResult = bCrypt.compareSync(req.body.password, Email.dataValues.password)
				if (passwordResult){
					// generate token
					const token = jwt.sign({
						id: Email.dataValues.id,
						username: Email.dataValues.username,
						email: Email.dataValues.email
					},connectionDB.jwt,{expiresIn: "24h"}
					)
					res.status(200).json({
						token: `Bearer ${token}`
					})
				}
				else{
					res.status(401).json({
						message: 'Password do not match'
						})
				}
					
		
					}else{
						// email doesn't exist 
					res.status(409).json({
						message: 'Email doesn\'t exist'
						})
					}
})
} else if (req.body.username){
	const checkUsername=  user.findOne( 'username', req.body.username)
	checkUsername.then((Email)=>{
		if(Email !==  true){
		// Username already exist 
		const passwordResult = bCrypt.compareSync(req.body.password, Email.dataValues.password)
		if (passwordResult){
			// generate token
			const token = jwt.sign({
				id: Email.dataValues.id,
				username: Email.dataValues.username,
				email: Email.dataValues.email
			},connectionDB.jwt,{expiresIn: "24h"}
			)
			res.status(200).json({
				token: `Bearer ${token}`
			})
		}
		else{
			res.status(401).json({
				message: 'Password do not match'
				})
		}
		

			}else{
				// username doesn't exist 
			res.status(404).json({
				message: 'Username doesn\'t exist'
				})
			}
})
}else{
	res.status(404).json({
		message: 'Incorrect input data'
		})
	}
}



module.exports.register = async function(req, res){
	// initialization
	 user.initialization()
	
// check 
const checkUsername =  user.findOne( 'username' , req.body.username )
checkUsername.then((Username)=>{
	
	  if(Username !==  true){
		  // email already exist error
		  res.status(409).json({
			  message: 'Username already exist'
		  })
		  
		  } else if(Username === ''){
			res.status(409).json({
				message: 'Field \'Username\' field cannot be empty '
			})
		}
		else {
		const checkEmail =  user.findOne( 'email', req.body.email)
		checkEmail.then((Email)=>{
			if(Email !==  true){
			// email already exist error
				res.status(409).json({
				message: 'Email already exist'
				})
	
				} else{
				// password gurd
				const salt = bCrypt.genSaltSync(10)
				const password = req.body.password
				  // create new user
				  user.create(
				req.body.username,
				req.body.email,
				bCrypt.hashSync(password,salt)
					 )
				 try {
					 connectionDB.sequelize.sync({alter:true})
					res.status(201).json({					
						message: 'New user created'
						})
					} catch(e){
						errorHandler(res,e)
					}
				}
			})
	  }
  })		
	
		
	}