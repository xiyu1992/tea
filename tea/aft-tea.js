jQuery(document).ready(function ($) {
        var shade = $('#shade-layer'),
                button = $('#lottery-button'),
                result = $('#result'),
                data = {
                    act: 'get_code',
                    gift_id: 81
                },
                awards = {
                    "p1": "bilibili定制立顿茶包",
                };
       // button.interval = 150;
        button.timeId = -1;
        button.count = 0;
        button.array = [1, 2, 3, 5, 4];
        button.index = 0;
        var flag = 1;
        button.click(function () {
            if (flag == 1) {
                flag=0;
                getGift();
            };
            
        });
        function getGift(captcha) {
            if (captcha) {
                data.captcha = captcha;
            }
            $.ajax({
                url: '/widget/ajaxGetGift',
                type: 'POST',
                data: data,
                dataType: 'json'
            }).done(function (data) {
                switch (data.code) {
                    case -2:  //-2, activity end
                        alert('今日已抽完，下次记得早点来呦~');
                        flag=1
                        break;
                    case -3:  //-3, not login
                        new MessageBox().show(button, '请登录后再抽奖', 2000);
                        flag=1
                        break;
                    case -7:  //-7, need input captcha
                        //no action
                        flag=1
                        break;
                    case 0:   //0, get award
                        successHandler(data);
                        flag=1
                        break;
                    default:  //unknow error
                        alert(data.msg);
                        flag=1
                        break;
                }
            }).fail(function () {
                alert('抱歉，现在无法与服务器通信，请刷新本页后再试~');
            });
        }

        function successHandler(data) {
            var i = 0,
                    item = data.item,
                    card = data.card;
            switch (item) {
                case awards.p1:
                    i = 1;
                    break;
            }
            result
                    .find('.message').html(awards['p' + i])
                    .end()
                    .find('.code').html(card)
                    .end();
            button.dataIndex = i;
            shade.add(result).fadeIn();
            //button.attr('disabled', 'disabled');
            //setTimeout(loop, button.interval);
        }

        shade.click(function () {
            $(this).add(result).fadeOut();
        });
         var shareTxt = "#下午茶大赛# 今天我请下午茶，过来一起聊聊天吧~ 活动时间：2015年11月13日―2015年11月30日。"; //分享文本
                bindShare({ //外部函数
                    url: window.location.href,
                    title: shareTxt,
                    pic: 'http://i2.hdslb.com/u_user/activities/2015tea-time/img/tea_share.jpg',
                    desc: shareTxt,
                    summary: shareTxt,
                    shortTitle: document.title,
                    searchPic: false
                }, '.share_list .share-btn, .share-list .share-btn');

        $(".tea-hover").hover(function() {
            $(this).children('.tea-staples').show();
        }, function() {
           $(this).children('.tea-staples').hide();
        });
})