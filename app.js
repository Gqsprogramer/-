var express=require('express')
var router=require('./router')
var fs=require('fs')
var bodyParser=require('body-parser')
var app=express()
app.engine('html',require('express-art-template'))
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
// 这里的./指的是相对app.js的相对路径
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 上面两个代码一定要在挂载路由之前
// `中间件`
app.use(router)
app.listen(3000,function(){
    console.log('Server is running...')
})