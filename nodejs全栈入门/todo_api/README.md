## req.body通过中间件获取
1、npm install body-parser -S

## 发布运维
1、npm install pm2 -g
2、pm2 init
3、后台启动
pm2 start ecosystem.config.js
3、查看
pm2 list
4、重启
pm2 restart id
5、查看日志
pm2 log