const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const connectionDB = require('../connection/connectionDB')
const User = require('../models/user')



 module.exports =  passport => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: connectionDB.jwt 
	}
		passport.use(
					new JwtStrategy(options, (payload,done)=>{
					const user = User.findByIds(payload.id)
						user.then((datas)=>{
							if(datas !==null){
							 done(null,datas)
						    }
					  else{
					
					  done(null, false)
					  }
					})
				})
			)
}

