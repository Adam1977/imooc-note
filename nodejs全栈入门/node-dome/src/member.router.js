const express = require('express')

const router = express.Router()

// 1、路由中间件
router.use((req, res, next) => {
  console.log('middleware from router')
  next()
})

router.get('/list', (req, res) => {
  res.json({
    list: [
      {
        id: 001,
        name: '李四'
      }
    ]
  })
})

function vlaid_login_params(req, res, next) {
  const {name, password} = req.query
  if (!name || !password) {
    res.json({
      message: '参数校验失败'
    })
  } else {
    req.formdata = {
      name,
      password
    }
    next()
  }
}

// 2、单独接口中间件
router.get('/login', [vlaid_login_params/** middleware */], (req, res) => {
  const {formdata} = req
  res.json({
    formdata,
    message: 'success'
  })
})

module.exports = router