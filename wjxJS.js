// ==UserScript==
// @name         wjxJS
// @namespace    https://github.com/wkmyws/wjxJS
// @version      1.0
// @description  问卷星填写信息，支持input radio checkbox，仅支持电脑端网页
// @author       wkmyws
// @match        https://www.wjx.cn/*
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @updateURL    https://github.com/wkmyws/wjxJS
// @supportURL   https://github.com/wkmyws/wjxJS
// ==/UserScript==

//使用电脑打开问卷（手机端请求桌面版本）

/*
**info 第一个参数:匹配的标题（正则表达式）
**info 第二个参数:对应的填入选项（字符串）
**info 第三个参数:(可选)，当答题框为单选|多选时匹配的选项（正则表达式）
*/

(function() {
    'use strict';
    const info=[
        [/(姓名)|(名字)/,"狗蛋"],
        [/性别/,"男",/男/],
        [/班级/,"软工一班"],
        [/学号/,"08"],
        [/(联系)|(电话)|(手机)/,"12315"],
        [/(QQ)|(qq),"12345"/],
		[/空闲时间/,"周一",/(周一)|(星期一)|(29日)/]
    ];
    const ini={
        module:".div_question",//每个问题模块
        No:".div_topic_question",//题号
        title:".div_title_question"//标题
        //input:"(手动更新,根据class判断类型)id=q1 q2..."
    };
    $(document).ready(function(){
        if($(ini.module).length==0){//未到发布时间
            setInterval(function(){$("#ctl00_ContentPlaceHolder1_JQ1_lbError").find("div").text(new Date().toLocaleTimeString())},1000)
        }else
        $(ini.module).each(function(){
            let title=$(this).find(ini.title).text();
            let No=$(this).find(ini.No).text().replace(/[^\d]*(\d+)[^\d]*/,function(all,num){return num-0})
            //判断类别
            for(let i=0;i<info.length;i++){//匹配用户信息
                if(info[i][0].test(title)){//匹配到一处信息,判断答题框类型,加break！
                    if($("#q"+No).length>0){//input 型
                        $("#q"+No).val(info[i][1])
                        break;
                    }
                    if($(this).find(".ulradiocheck").length>0){//单选框|多选框
                        $(this).find("li").each(function(){
                            if(info[i].length<=2)return;//没有第三个参数则跳过
                            if(info[i][2].test($(this).find("label").html())){//匹配到选项框
                                //$(this).find("input[type='radio']").trigger("click")//单选框
                                //$(this).find("input[type='checkbox']").trigger("click")//多选框
                                 $(this).find("a").trigger("click")
                            }
                        })
                        break;
                    }

                }
            }
        })
    });

})();









