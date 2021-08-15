// 这个文件只对数据库进行增删改查
// 用于处理数据，不关心业务
// 将数据处理进行封装
var fs=require('fs')
var dbPath='./db.json'
// 获取所有学生
exports.find=function(callback){
    // return []
    // 因为readfile是异步函数，所以必须使用回调函数,回调函数的作用只处理异常的情况
    fs.readFile(dbPath,function(err,data){
        if(err){
          return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
    // find(function(err,data){

    // })
    // 回调函数要在路由里传输
}

exports.findById=function(id,callback){
    // callback第二个参数有没有取决于你想要的信息，如果你不希望返回数据则第二个参数就没有
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
          return callback(err)
        }
        var students=JSON.parse(data).students
        var ret=students.find(function(item){
            return item.id==parseInt(id)
         })
         callback(null,ret)
    })
}

// 添加保存学生
exports.save=function(student,callback){
    fs.readFile(dbPath,function(err,data){
        if(err){
          return callback(err)
        }
        var students=JSON.parse(data).students
        // 处理id唯一不重复
        student.id=students[students.length-1].id+1
        // student.id=students,length?
        students.push(student)
        var ret=JSON.stringify({
            students:students
        })
        // 完全覆盖
        fs.writeFile(dbPath,ret,function(err){
            if(err){
                return callback(err)
            }
            // 没错就不传
            callback(null)
        })
    })
}


// 更新学生
exports.updateById=function(student,callback){
    fs.readFile(dbPath,function(err,data){
        if(err){
          return callback(err)
        }
        var students=JSON.parse(data).students
        // 这里要把id统一成数字
        student.id=parseInt(student.id)
        // 获取数组
        // 修改谁就要把谁找出来
        // es6的数组方法
        // 以函数作为形参，若满足item==其中元素，则返回符合条件的元素
        // 记得要return
        // item赋值给stu
       var stu=students.find(function(item){
           return item.id==student.id
        })
        for(var key in student){
            stu[key]=student[key]
        }
        var ret=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,ret,function(err){
            if(err){
                return callback(err)
            }
            // 没错就不传
            callback(null)
        })
    })
}


// 删除学生
exports.deleteById=function(id,callback){
    fs.readFile(dbPath,'utf-8',function(err,data){
        if(err){
          return callback(err)
        }
        var students=JSON.parse(data).students
        var deleteId=students.findIndex(function(item){
            return item.id==parseInt(id)
         })
         students.splice(deleteId,1)
         var ret=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,ret,function(err){
            if(err){
                return callback(err)
            }
            // 没错就不传
            callback(null)
        })
           
    })
    // 删完了要记得保存
}