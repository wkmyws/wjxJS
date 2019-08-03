// ==UserScript==
// @name         wjxJS
// @namespace    https://github.com/wkmyws/wjxJS
// @version      1.1
// @description  问卷星填写信息，支持input radio checkbox
// @author       wkmyws
// @match        https://www.wjx.*/*
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @updateURL    https://github.com/wkmyws/wjxJS
// @supportURL   https://github.com/wkmyws/wjxJS
// ==/UserScript==


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
        title:".div_title_question",//标题
        type:{
           "input_text":".inputtext",
           "radio":".ulradiocheck",
           "checkbox":".ulradiocheck"
        }
    };
    $(document).ready(function(){
        $(ini.module).each(function(){
            let title=$(this).find(ini.title).text();
            let No=$(this).find(".div_topic_question").text()-0;
            //判断类别
            for(let i=0;i<info.length;i++){//匹配用户信息
                if(info[i][0].test(title)){//匹配到一处信息,判断答题框类型,加break！
                   for(let tp in ini.type){
                       let dom=$(this).find(ini.type[tp])
                       if(dom.length>0){
                           switch(tp){
                               case "input_text":
                                   $("#q"+No).val(info[i][1]);
                                   break;
                               case "radio":
                               case "checkbox":
                                   $(this).find("li").each(function(){
                                       if(info[i].length>=3&&info[i][2].test($(this).text()))$(this).find("a").click()
                                   })
                                   break;
                               default:alert("ini.type中没有匹配"+tp+"的键值");
                           }
                           break;
                       }
                   }
                    break;
                }
            }
        })
    });

})();
