$(() => {
    //1.监听游戏规则的点击
    $('.rules').click(() => {
        $('.rule').stop().fadeIn(200)
    })
    //2.监听关闭按钮
    $('.rule .close').click(() => {
        $('.rule').stop().fadeOut(200)
    })
    //3.监听开始游戏按钮点击
    $('.start').click(function () {
        $(this).stop().fadeOut(200)
        //处理进度条
        progressHandler()
        //灰太狼动画方法
        startWolfAnm()
    })
    //4.监听重新开始按钮点击
    $('.reStart').click(function () {
        $('.mask').stop().fadeOut(200)
        progressHandler()
        startWolfAnm()
        $('.score').text(0)
    })

    //定义一个处理进度条方法
    function progressHandler() {
        //重新设置进度条宽度
        $('.progress').css({ width: 180 })
        $('.progress').animate({ width: 0 }, 60000, 'linear', () => {
            $('.mask').stop().fadeIn(200), stopWolfAnm()
        })
    }
    let wolfTimer
    //定义一个处理灰太狼动画方法
    function startWolfAnm() {
        //1.定义两个数组保存所有灰太狼和小灰灰tupian
        let wolf1 = [
            './images/h0.png',
            './images/h1.png',
            './images/h2.png',
            './images/h3.png',
            './images/h4.png',
            './images/h5.png',
            './images/h6.png',
            './images/h7.png',
            './images/h8.png',
            './images/h9.png',
        ]
        let wolf2 = [
            './images/x0.png',
            './images/x1.png',
            './images/x2.png',
            './images/x3.png',
            './images/x4.png',
            './images/x5.png',
            './images/x6.png',
            './images/x7.png',
            './images/x8.png',
            './images/x9.png',
        ]
        //2.定义数组保存所有可能出现的位置
        let arrPos = [
            { left: '100px', top: "115px" },
            { left: '20px', top: "160px" },
            { left: '190px', top: " 142px" },
            { left: '105px', top: "193px" },
            { left: '19px', top: "221px" },
            { left: '202px', top: "212px" },
            { left: '120px', top: "275px" },
            { left: '30px', top: "295px" },
            { left: '209px', top: "297px" },
        ]
        //3.创建一个图片
        let wolfImg = $("<img src='' class='wolfImg'>")
        //随机获取图片位置
        let posIndex = Math.floor(Math.random() * 8)
        //4.设置图片显示位置
        wolfImg.css({
            position: 'absolute',
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        })
        //随机获取图片数组
        let wolfType = Math.round(Math.random()) == 0 ? wolf1 : wolf2
        //5设置图片内容
        window.wolfIndex = 0
        window.wolfIndexEnd = 5
        wolfTimer = setInterval(() => {
            if (wolfIndex > wolfIndexEnd) {
                wolfImg.remove()
                clearInterval(wolfTimer)
                startWolfAnm()
            }
            wolfImg.attr("src", wolfType[wolfIndex])
            wolfIndex++
        }, 200)
        //6.将图片添加到界面上
        $('.container').append(wolfImg)
        //7.调用游戏处理规则的方法
        gameRules(wolfImg)
    }
    //游戏规则
    function gameRules(wolfImg) {
        $(wolfImg).one('click', function () {
            window.wolfIndex = 5
            window.wolfIndexEnd = 9
            //拿到当前图片地址
            let src = $(this).attr('src')
            //根据地址判断是否是灰太狼
            let flag = src.indexOf('h') >= 0
            if (flag) {
                $('.score').text(parseInt($('.score').text()) + 10)
            } else {
                $('.score').text(parseInt($('.score').text()) - 10)
            }
        })
    }
    //停止狼动画
    function stopWolfAnm() {
        $('.wolfImg').remove()
        clearInterval(wolfTimer)
    }
})