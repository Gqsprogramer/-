// 为了区分模块化，将路由区分出来
var fs=require('fs')
var Student=require('./students')
// module.exports=function(app){

// }
// express提供了一种包装路由的更好的方式
var express=require('express')
const bodyParser = require('body-parser')
// 创建一个新的路由方式
var router=express.Router()
// 把路由挂载到router中
router.get('/students',function(req,res){
    // res.send('hello world!')
    // readfile的第二个参数是可选的，传入utf-8就是告诉它文件以utf-8进行编码
    // 相当于tostring的效果，以后就不用再进行tostring操作了
    // fs.readFile('./db.json','utf-8',function(err,data){
    //     if(err){
    //         return res.status(500).send('Server error!')
    //     }
    //     // console.log(data)
    //     res.render('index.html',{
    //         title:'原神成员管理系统',
    //         fruits:[
    //             '苹果',
    //             '梨子',
    //             '叼毛'
    //         ],
    //         // 手动转成对象的过程很重要，要记住
    //         students:JSON.parse(data).students
    //     })
    // 读取文件已经从外部封装，直接使用即可
        Student.find(function(err,students){
            if(err){
                return res.status(500).send('Server error!')
            }
            res.render('index.html',{
                title:'原神成员管理系统',
                fruits:[
                    '蒙德',
                    '璃月',
                    '稻妻'
                ],
                students:students
            })
        })
})
router.get('/students/new',function(req,res){
    res.render('new.html',{
        title:'添加人物信息'
    })
})
router.post('/students/new',function(req,res){
    // console.log(req.body)
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.redirect('/students')
    })
     // 获取表单数据
    // 处理
    // 保存数据
    // 先读转换成字符串，在转换成对象，再手动添加push数据，然后把对象转换成字符串，最后写入文件
    // 发送响应
})
router.get('/students/edit',function(req,res){
    // console.log(req.query.id)
    // res.render('edit.html',)
    // parseint转成数字
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.render('edit.html',{
            student:student
        })
    })
})
router.post('/students/edit',function(req,res){
    // 获取表单数据
    // 保存数据
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.redirect('/students')
    })
    // 发送响应
})
router.get('/students/delete',function(req,res){
    // 获取删除id
    // 执行删除操作
    // 根据结果发送响应
    // console.log(req.query.id)
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error!')
        }
        res.redirect('/students')
    })
})
// 导出
module.exports=router