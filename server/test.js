const obj =  {
    hasMore: true,
    list: [
        {
            id: 1,
            title: 'React全栈架构',
            "video":"http://7xil5b.com1.z0.glb.clouddn.com/zhufengpeixun.mp4",
            poster:"http://www.zhufengpeixun.cn/react/img/react.jpg",
            url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
            price: '¥100.00元',
            type:'react'
        },
        {
            id: 20,
            title: 'Vue从入门到项目实战',
            video:"http://7xil5b.com1.z0.glb.clouddn.com/zhufengpeixun.mp4",
            poster:"http://www.zhufengpeixun.cn/vue/img/vue.png",
            url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
            price: '¥500.00元',
            type:'vue'
        }
    ]
};

const obj1 = JSON.stringify(obj)
console.log(obj1);

console.log(JSON.parse(obj1));
// console.log(JSON.stringify(obj));