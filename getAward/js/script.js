$(document).ready(function(){
    //init canvas and event
    fillCanvas();
    eventCanvas();

    //refill the canvas when window resize
    $(window).resize(function() {
        fillCanvas();
    });

    function fillCanvas() {
        var text = '刮我抽奖',
            canvas = $('#canvas'),
            width = canvas.width(),
            height = canvas.height(),
            context = canvas[0].getContext('2d');

        //canvas width and height
        canvas[0].width = width;
        canvas[0].height = height;

        //canvas background-color
        context.fillStyle = '#363f46';
        context.fillRect(0, 0, width, height);

        //canvas text
        context.fillStyle = '#7b868b';
        context.font = '24px "SimHei"';
        context.fillText(text, (width - context.measureText(text).width) / 2, (height + 24) / 2);
        context.textAlign = 'start';
    }

    function eventCanvas() {
        var flag = false,
            radius = 24,
            canvas = $('#canvas'),
            context = canvas[0].getContext('2d');

        canvas.on({
            'mousedown touchstart': eventDown,
            'mousemove touchmove': eventMove,
            'mouseup touchend': eventUp
        });

        function eventDown(e) {
            e.preventDefault();
            flag = true;
        }

        function eventMove(e) {
            e.preventDefault();

            if (!flag) {
                return false;
            }

            var x = getEventPosition(e).pageX - getPosition(canvas[0]).pageX,
                y = getEventPosition(e).pageY - getPosition(canvas[0]).pageY;

            context.globalCompositeOperation = 'destination-out';
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.strokeStyle = 'transparent';
            context.fill();
            context.globalCompositeOperation = 'source-over';
        }

        function eventUp(e) {
            e.preventDefault();
            flag = false;
        }

        /**
         * @feature => get page position of element
         * @param element -> Object (JS)
         * @return Object -> { left => pageX, top => pageY }
         */
        function getPosition(element) {
            var viewX = element.getBoundingClientRect().left,
                viewY = element.getBoundingClientRect().top;

            return {
                pageX: (document.documentElement.scrollLeft || document.body.scrollLeft) + viewX,
                pageY: (document.documentElement.scrollTop || document.body.scrollTop) + viewY
            };
        }

        /**
         * @feature => get position on PC or Mobile
         * @param e => event
         * @returns Object -> { pageX: Number, pageY: Number }
         */
        function getEventPosition(e) {
            var position = { pageX: 0, pageY: 0 };

            if (e.type == 'touchstart' || e.type == 'touchmove' ||
                e.type == 'touchend' || e.type == 'touchcancel') {
                var touchEvent = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                position.pageX = touchEvent.pageX;
                position.pageY = touchEvent.pageY;
            } else {
                position.pageX = e.pageX;
                position.pageY = e.pageY;
            }
            return position;
        }
    }
});


$(document).ready(function(){
    var loginArea = $('#login-div'),
        scratchArea = $('#scratch-area'),
        messageArea = $('#award-message-area'),
        captchaArea = $('#captcha-area');

    loginArea.find('a').attr('href', 'https://account.bilibili.com/login?gourl=' + location.href); //init login href

    scratchArea.one('mousedown touchstart', function() {
        getAward();
    });

    function getAward(captcha) {
        var data = {
                act: 'get_code',
                gift_id: 77 //Gift ID
            },
            awards = { // Award list
                "p1": "《LoveLive》盒蛋一套",
                "p2": "《路人女主养成方法》盒蛋整套",
                "p3": "《LoveLive！》西木野真姬 粘土人",
                "p4": "赫斯提亚手办",
                "p5": "《那年那兔那些事儿》b站限定礼盒",
                "p6": "哔哩哔哩周边大礼包",
                "p7": "没中奖，心疼非洲人"
            };

        if (captcha) {
            data.captcha = captcha;
        }

        $.ajax({
            url: '/widget/ajaxGetGift',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(data) {
                !data ? alert('抱歉，现在无法与服务器通信。') : codeHandler(data);
            },
            error: function() {
                alert('现在无法与服务器通信，请刷新本页后重试。');
            }
        });

        function codeHandler(data) {
            var code = data.code; //console.log(data);
            console.log(data);

            if (code == -2) { //code == -2, 活动已结束
                messageArea.html('活动已经结束，下次记得早点来呦~');
            } else if (code == -3) { //code == -3, 用户没有登录
                //已由 loadLoginInfo 函数处理，这里无需再次处理
            } else if (code == -7) { //code == -7, 需要输入验证码
                captchaArea.find('img').click(function() {
                    $(this).attr('src', 'http://www.bilibili.com/captcha?r=' + Math.random());
                }).attr('src', 'http://www.bilibili.com/captcha?r=' + Math.random());

                captchaArea.removeClass('negative-z-index');

                captchaArea.find('button').click(function() {
                    var value = captchaArea.find('input').val();

                    if (!value) {
                        alert('请输入验证码再提交呦~');
                    } else {
                        captchaArea.addClass('negative-z-index');
                        getAward(value);
                    }
                });
            } else if (code != 0) { //code != 0, 出现异常
                messageArea.html(data.msg);
            } else {
                scratchAward();
            }

            function scratchAward() {
                var aKeys = Object.keys(awards);

                for (var i= 0, len = aKeys.length; i < len; i++) {
                    if (data.item == awards[aKeys[i]]) {
                        messageArea.html(awards[aKeys[i]]);
                        break;
                    }
                }
            }
        }
    }
});

//nav.js 直接调用并运行 loadLoginInfo 函数，无需手动运行
function loadLoginInfo(info) {
    if (info.isLogin != true) {
        $('#black-shadow').removeClass('no-display');
    } else {
        $('#black-shadow').addClass('no-display');
    }
}