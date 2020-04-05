```
# 初始化
npm init -y

# 新建入口文件
1、新建src-->app.js
2、package.json增加启动命令
"start:node": "node src/app.js",

# 引入nodemon热启动
npm install nodemon -D

# package.json增加nodemon启动命令
"start": "nodemon src/app.js",

# 配置nodemon.json

# 安装express
npm install express -S

# 安装sequelize-->ORM——对象关系模型
1、安装依赖
npm install mysql2 -S
npm install sequelize -S
npm install sequelize-cli -S
2、初始化
npx sequelize-cli(或sequelize) init
3、创建模型User（model）
npx sequelize-cli(或sequelize) model:generate --name User --attributes name:string
4、数据库创建表
npx sequelize-cli(或sequelize) db:migrate --env=development
```