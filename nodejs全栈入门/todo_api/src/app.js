const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// 引入db models
const models = require('../db/models')

app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended: true}))

// 所有错误，status:500
const isErrorStatus = 4000

// 查询任务列表
app.get('/list/:status/:page', async (req, res, next) => {
  // status 1-待办，2-完成，3-删除, 0-全部
  let {status,page} = req.params
  let limit = 10
  let offset = (page-1)*limit
  let where = {}
  if (status != 0) {
    where.status = status
  }
  let list = await models.Todo.findAndCountAll({
    where,
    offset,
    limit
  })
  res.json({
    list,
    message: '列表查询成功'
  })
})

// 创建一个todo
app.post('/create', async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body
    let todo = await models.Todo.create({
      name,
      deadline,
      content
    })
    res.json({
      todo,
      message: '任务创建成功'
    })
  } catch (error) {
    next(error)
  }
})

// 修改一个todo
app.post('/update', async (req, res, next) => {
  try {
    let { name, deadline, content, id, test } = req.body
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
    if (todo) {
      // 执行更新
      todo = await todo.update({
        name,
        deadline,
        content,
        test
      })
      res.json({
        todo
      })
    }
  } catch (error) {
    next(error)
  }
})

// 修改一个todo，删除
app.post('/update_status', async (req, res, next) => {
  try {
    let { status, id } = req.body
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
    if (todo && status != todo.status) {
      // 执行更新
      todo = await todo.update({
        status
      })
      res.json({
        todo
      })
    } else {
      res.json({
        message: '参数有误'
      })
    }
  } catch (error) {
    next(error)
  }
})

// 异常中间件
app.use((err, req, res, next) => {
  if (err) {
    res.json({
      status: isErrorStatus,
      message: err.message
    })
  } else {
    next()
  }
})

app.listen(3000, () => {
  console.log('server is running')
})