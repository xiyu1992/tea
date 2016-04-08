
function playList(){

    $.getJSON('/list/vote/24.json',function(data,textStatus){
        console.log(data);
        var aids = [];
        var data = data.list;
        console.log(data.length);
        function playNull(){
            if(data.length<1){
                $('#score_list').html('暂无视频');
                $('#score_list').css('line-height','800px');
            }
        };
        playNull();
        data.shuffle();
         function coinSort(a,b){
            return b.ctimes - a.ctimes;
        }
        function timeSort(a,b){
            return b.number - a.number;
        }
        function playSort(a,b){
            return b.click - a.click;
        }
        function changeSort(){
            $('.select_blt div').click(function(){
                $('.select_blt div').removeClass('on');
                $(this).addClass('on');
                var changeBtn = parseInt($(this).attr('value'));
                switch (changeBtn){
                    case 0:
                        data= data.sort(coinSort);
                        showData();
                        break;
                    case 1:
                        data.shuffle();
                        showData();
                        break;
                    case 2:
                        data= data.sort(timeSort);
                        showData();
                        break;
                    case 3:
                        data= data.sort(playSort);
                        showData();
                        break;
                }
            });
        }
        changeSort();
        var mission_id= 24;
        var curPage = 0;

        function showData(curPage){
            console.log(typeof curPage);
            console.log( !curPage);
            if(!curPage){curPage=0;}
            $("#score_list").empty();
            playNull();
            var start = curPage*15;
            var pageList = Math.ceil(data.length/15);
            console.log(pageList);
            if (Math.floor(data.length / 15) > 0) {
                $(".change_button").empty();
                if(curPage == 0){
                    $(".change_button").append(
                        '<li class="Previous no wide" ><span aria-hidden="true">上一页</span></li>'
                    );
                }else{
                    var li = $('<li class="Previous wide"><span aria-hidden="true">上一页</span></li>');
                    $(".change_button").append(li);
                    li.click(function(){
                        showData(curPage - 1);
                    });
                }
                var show_max = 5;
//          console.log("一共题目"+question_length)
//          console.log("一共页面数"+total_page)
//          console.log("打算显示数"+page_size)
                if (pageList < show_max) {
                    for (var k = 0; k < pageList; k++) {
                        (function(k){
                            var li = $('<li class="'+(k==curPage?'pree':'')+'"><a>'+ (k + 1) + '</a></li>');
                            $(".change_button").append(li);
                            li.click(function(){
                                showData(k);
                            });
                        })(k);
                    }
                } else {
                    if (curPage < show_max / 2) {
                        for (var k = 0; k < show_max; k++) {
                            (function(k){
                                var li = $('<li class="'+(k==curPage?'pree':'')+'"><a>'+ (k + 1) + '</a></li>');
                                $(".change_button").append(li);
                                li.click(function(){
                                    showData(k);
                                });
                            })(k);
                        }

                    } else if (curPage > (pageList - show_max / 2)) {
                        for (var k = pageList - show_max; k < pageList; k++) {
                            (function(k){
                                var li = $('<li class="'+(k==curPage?'pree':'')+'"><a>'+ (k + 1) + '</a></li>');
                                $(".change_button").append(li);
                                li.click(function(){
                                    showData(k);
                                });
                            })(k);
                        }
                    } else {
                        for (var k = Math.floor(curPage - show_max / 2); k < Math.floor(curPage + show_max / 2); k++) {
                           (function(k){
                                var li = $('<li class="'+(k==curPage?'pree':'')+'"><a>'+ (k + 1) + '</a></li>');
                                $(".change_button").append(li);
                                li.click(function(){
                                    showData(k);
                                });
                            })(k);
                        }
                    }
                }
                if(curPage+1 == pageList){
                    $(".change_button").append(
                        '<li class="Next no wide"><span aria-hidden="true">下一页</span></li>'
                    );
                }else{
                     var li = $('<li class="Next wide" ><span aria-hidden="true">下一页</span></li>');
                    $(".change_button").append(li);
                    li.click(function(){
                        showData(curPage + 1);
                    });
                }
            }
            console.log(curPage);
            for (var i = start; i < data.length && i < start+15 ; i++){
                var scoreWrapper = $('<div class="score_wrapper clearfix" id='+data[i].number+'><a class="score_icon"></a><a class="score_icon"></a><a class="score_icon"></a><a class="score_icon"></a><a class="score_icon"></a></div>');
                var scoreBlock = $('<input type="text" class="vote_value" value="0"/>');

                var tmepBlock = '<div class="tp_zp">' +
                    '<a href="http://www.bilibili.com/video/av'+data[i].aid+'/" target="_blank"><img src="'+data[i].litpic+'" />'+
                    '<div class="t">'+data[i].title+'</div></a>' +
                    '<div class="rate"></div>' +
                    '<div class="pf"><div class="bra">';

                if($.inArray(data[i].aid.toString(), aids) >=0) {
                    tmepBlock += '</div><a aid="'+data[i].aid+'">已评分</a></div></div>';
                    console.log(data[i].aid);

                }else {
                    tmepBlock += '</div><a class="btn" aid="'+data[i].aid+'">评分</a></div></div>';
                };

                var block = $(tmepBlock);
                block.appendTo(".score_list");
                scoreWrapper.appendTo(block.find('.rate'));
                scoreBlock.appendTo(block.find('.bra'));
                (function(scoreWrapper,scoreBlock){


                    scoreWrapper.find("a").hover(
                        function(){
                            if(scoreWrapper.find('a[hasmessagebox="yes"]').length>0){
                                return;
                            }
                            var btn = $(this);
                            var index = btn.index();
                            scoreWrapper.find("a:lt("+(index+1)+")").addClass("on");
                            scoreWrapper.find("a:gt("+(index)+")").removeClass("on");
                        },
                        function(){
                            if(scoreWrapper.find('a[hasmessagebox="yes"]').length>0){
                                return;
                            }
                            var btn = $(this);
                            var index = btn.index();
                            if(index==0){
                                scoreWrapper.find("a").removeClass("on");
                            }
                        }
                    );
                    scoreWrapper.find("a").click(
                        function(){
                            if(scoreWrapper.find('a[hasmessagebox="yes"]').length>0){
                                return;
                            }
                            var btn = $(this);
                            var index = btn.index();
                            scoreWrapper.find("a:lt("+(index+1)+")").addClass("active");
                            scoreWrapper.find("a:gt("+(index)+")").removeClass("active");
                            var rateScore = (index+1)*2;
                            scoreBlock.attr('value',rateScore)
                        }
                    );
                })(scoreWrapper,scoreBlock);
            }

            $(".tp_zp > .pf > .btn").click(function(){
                var sf = this;
                var msgbox = new MessageBox().show(this,'确认对此视频进行评分？','button',function(mobj){
                    $.ajax("http://www.bilibili.com/m/mission_vote?aid="+$(sf).attr("aid")+"&msid="+mission_id+"&vote="+$(sf).parent().find(".vote_value").val(),{
                        success:function(data){
                            switch(data)
                            {
                                case "-1": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'不在可评分时间内',2000,'error'); break;
                                case "-2": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'评分的视频不存在',2000,'error'); break;
                                case "-3": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'您已经对此视频评过分',2000,'error'); break;
                                case "-4": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'您已经对此视频评过分',2000,'error'); break;
                                case "-5": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'评分数量不正确',2000,'error'); break;
                                case "-6": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'请先登录',2000,'error'); break;
                                case "-7": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'您剩余的可评分点数不足',2000,'error'); break;
                                case "0": new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'评分成功',1000,'ok'); $(sf).parent().fadeOut(1000); break;
                                default:new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'未知错误：'+data,2000,'error');
                            }
                        },
                        error:function(){
                            new MessageBox({ Overlap:true,position:mobj.position}).show(sf,'提交失败',2000,'error');
                        }
                    });
                    //addVideo(sf,'ad',$(sf).attr('val'),msgbox.find('.minput').val(),mobj.position);
                });

            });

        }
        showData();

    })
}
playList();