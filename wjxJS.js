// ==UserScript==
// @name         问卷星
// @namespace    none
// @version      0.1
// @description  自动填写问卷星
// @author       NAU 煎饼果子
// @match        https://www.wjx.top/*/*.aspx
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if($("div1")==null){setTimeout(function(){location.reload()},100);return;}
    var hash=[
        ["你的名字",/(姓名)|(名字)/],
        ["你的学号",/(学号)/],
        ["你的电话",/(电话)|(联系)/],
        ["你的班级",/(班)/],
        ["你的QQ",/(QQ)|(qq)/],
        ["你所在书院",/(书院)/],
        ["男",/(性别)/]
             ]
    function $(a){return document.getElementById(a)}
    for(var i=1;;i++){
        if($("div"+i)==null)break;
        if(!$("q"+i))continue;//不为<input>类型则跳过
        var tit=$("div"+i).innerHTML;
        for(var j=0;j<hash.length;j++){
            if(hash[j][1].test(tit)){$("q"+i).value=hash[j][0];break;}
        }
    }
    
})();