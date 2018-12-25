let express = require('express');
let app = express();
/*
users:存放所有的用户数据
1、第一次存入数据之后的样子:users = [{username:'wangwei',password:'123456'}]
2、多次[{username:'wangwei',password:'123456'},{username:'malin',password:'123456'}]
*/
let users = [];
console.log(users);
//引入body-parser这个第三方插件
let bodyParser = require('body-parser');//???????
//引入session中间件
//作用是保存登录信息 用来实现 登录、注册、退出功能
let session = require('express-session');
app.use(session({
    resave:true,
    secret:'wangwie',//秘钥
    saveUninitialized:true,//保存未初始化的session
}));
app.use(bodyParser.json());///客户端发送过来的请求体是json
app.use(function (req, res, next) {
    //如果在webpack里配置了代理，那么这些响应头都不要了
    //只允许8080访问
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //服务允许客户端发的方法
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    //服务器允许的请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    //允许客户端把cookie发过来
    res.header('Access-Control-Allow-Credentials', 'true');
    //如果请求的方法是OPTIONS,那么意味着客户端只要响应头，直接结束响应即可
    if (req.method == 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

/*app.use(function sleep(req,res,next){
  setTimeout(next,2000);
});*/

/*引入轮播图*/
let sliders = require('./mock/sliders');
app.get('/api/sliders', function (req, res) {
    res.json(sliders);
});

/*引入课程列表*/
let lessons = require('./mock/lessons');//{hasMore,list}
app.get('/api/lessons', function (req, res) {
    let {type = "", offset = 0, limit = 5} = req.query;
    console.log(type);

    offset = isNaN(offset) ? 0 : parseInt(offset);
    limit = isNaN(limit) ? 0 : parseInt(limit);
    //为什么要转来转去//拷贝原始数据，在这里尽量不要修改初始数据
    let newLessons = JSON.parse(JSON.stringify(lessons));

    //如果type为空，则不过滤课程类型，如果type不为空，则只出现课程类型跟传入的type相同的课程
    newLessons.list = newLessons.list.filter(item => item.type == type || type == "");
    // 0+5  5+5=10 10+5=15 15+5=20
    //如果下一页的起始索引已经大于等于总条数了，则认为已经分页完毕，后面已经没有数据了
    newLessons.hasMore = limit + offset < newLessons.list.length;//20
    //提取指定页的数据
    newLessons.list = newLessons.list.slice(offset, offset + limit);//offset0 0-4
    for (let i = 0; i < newLessons.list.length; i++) {
        let lesson = newLessons.list[i];
        lesson.title = `${offset + i + 1}-${lesson.title}`;
    }
    res.json(newLessons);
});


//////////////////////////////////////////////////////////////////////////////////////


//个人中心页面的后台接口
app.post('/api/reg', function (req, res) {
    let user = req.body;//取得请求体
    let oldUser = users.find(item => item.username === user.username);
    if (oldUser) {
        //两种异常  1.服务器异常  2.业务异常
        res.json({code: 1, error: '用户名重复'})//如果失败有一个error
    } else {
        users.push(user);
        //code = 0 表示一切正常，非0表示失败
        res.json({code: 0, success: '注册成功'})//如果成功有一个data
    }


});

/*用户登录的接口*/
app.post('/api/login',function (req,res) {
    //当我们跳转到这个路径的时候，会执行一个回调函数  其中user会获取到请求体也就是req.body
    let user = req.body;//获得登录的请求体
    //
    let oldUser = users.find(item=>item.username===user.username&&item.password===user.password)
    if(oldUser){
        //如果找到了用户名和密码相同的用户，表示登陆成功，把用户村放入session
        req.session.user = oldUser;
        res.json({code:0,success:"登陆成功",user})
    }else{
        res.json({code:1,error:'用户名或者密码错误'})
    }
});

/*退出接口*/
app.get('/api/logout',function (req,res) {
    //退出等录  没有请求体  不需要post
    req.session.user = null;
    res.json({code:0,success:'退出登录成功'})
});

//验证用户是否登录
app.get('/api/validate',function (req,res) {
    //用户登录  服务器会种植一个cookie
    if(req.session.user){
        res.json({code:0,user:req.session.user})
        // console.log(user);
    }else{
        res.json({code:1,error:'请登录'})
    }

});


app.listen(3000,function () {
    console.log(`http://localhost:3000/api`);
});