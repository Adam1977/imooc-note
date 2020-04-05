// http启动
// const http = require('http')

// const server = http.createServer((req, res) => {
//   res.end('hello')
// })

// server.listen(3000, '127.0.0.1', () => {
//   console.log('server is running')
// })

// express启动
const express = require('express')

const app = express()

const memberRouter = require('./member.router')
const skuRouter = require('./sku.router')

const models = require('../models')

app.get('/create', async (req, res) => {
  let {name} = req.query
  let user = await models.User.create({
    name
  })
  res.json({
    message: '创建成功',
    user
  })
})

app.get('/user/find', async (req, res) => {
  let list = await models.User.findAll()
  res.json({
    list
  })
})

app.get('/user/detail/:id', async (req, res) => {
  let {id} = req.params
  let user = await models.User.findOne({
    where: {
      id
    }
  })
  res.json({
    user
  })
})

// 中间件
// 1、是一个function
// 2、err,req,res,next-->function
function demo_middleware(err, req, res, next) {
  // 1、异常
  // 2、处理业务功能，然后转交控制权---next
  // 3、响应请求--结束响应-->当作路由的处理函数
}

// 加载静态文件static
app.use(express.static('./static', {
  extensions: ['html', 'htm']
}))

// 第一步
function valid_name_middleware(req, res, next) {
  let {name} = req.query
  if (!name) {
    res.json({
      message: '缺少name参数'
    })
  } else {
    next()
  }
}

// 日志
function log_middleware(req, res, next) {
  console.log('请求来了...')
  next()
}

// 注册路由 第二步
app.use(log_middleware)
// app.all('*',  valid_name_middleware)
app.use('/member', memberRouter) // /member/list
app.use('/sku', skuRouter) // /sku/list

// 第三步
app.get('/name', (req, res) => {
  throw new Error('error!!!')
})

// app.use((req, res) => {
//   res.json({
//     name: '张三',
//     method: req.method,
//     path: req.path
//   })
// })
// app.all('*', (req, res) => {
//   res.json({
//     method: req.method,
//     path: req.path
//   })
// })

// app.get('/name/:age', (req, res) => {
//   const {age} = req.params
//   console.log(req.params)
//   res.json({
//     name: '张三',
//     age
//   })
// })

// app.post('/name', (req, res) => {
//   res.json({
//     name: '李四'
//   })
// })

// app.all('/demo', (req, res) => {
//   res.json({
//     method: req.method
//   })
// })

// 路由不存在
function not_found_handler_middleware(req, res, next) {
  res.json({
    message: 'api不存在'
  })
}

// 异常处理，放最后面
function error_handler_middleware(err, req, res, next) {
  if (err) {
    const {message} = err
    res.json({
        message: `${message || '服务器异常'}`
      })
  } else {
  }
}

app.use(error_handler_middleware)
app.use(not_found_handler_middleware)

app.listen(3000, () => {
  console.log('server running')
})