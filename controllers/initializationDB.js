const user = require('../models/user')
const position = require('../models/position')
const order = require('../models/order')
const category = require('../models/category')
const orderList = require('../models/orderList')

module.exports.initialilazationAll= ()=>{
user.initialization()
position.initialization()
order.initialization()
category.initialization()
orderList.initialization()
}