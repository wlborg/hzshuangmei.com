/*
 * @Author: chj
 * @FileName:kst_popup.js
 * @Date:   2018-01-06 10:54:26
 * @Last Modified by:   chj
 * @Last Modified time: 2018-02-06 14:16:47
 */
/*  移动版     自定义弹窗邀请框 */
/*
    弹窗显示 时间time参数控制（豪秒）
    setTimeout 设置循环时间（毫秒）
自定义弹窗图片大小： (600*385)
使用方法：
1. <script src="{dede:global.cfg_jspath/}/pc/layer/mobile/layer.js"></script> 引入
2. 配置
 */
// function imgNotFound() {
//         var img = $(".popup img").get(0);
//         //默认图片
//         img.src = "//img.hzshuangmei.com/pc/kst/default.png";
//         img.onerror = null;
//     }
function popup() {
    //获取当前页面文件名
    var target = window.location.href;
    var filename = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0];
    //设置对应弹窗图片URL
    var imgurl = 'https://img.hzshuangmei.com/pc/kst/' + filename + '".png"';

    function CheckStatus() {
        $.ajax({
            type: "GET",
            cache: false,
            url: imgurl,
            data: "",
            success: function() {
                return true;
            },
            error: function() {
                filename = "default";
            }
        });
    }
    //检查对应的图片是否存在
    CheckStatus();
    //  console.log('输出的图片名称是:'+filename);
    var popimg = '<img  src="//img.hzshuangmei.com/pc/kst/' + filename + '.png' + '"' + '/>';
    var timer = null;
    //不永远关闭弹窗
    var flag = 0;
    layer.open({
        type: 1,
        anim: 'up',
        shade: 0,
        shadeClose: true,
        className: 'popup',
        time: 12, //弹窗停留时间
        btn: ['立即咨询', '稍后再说'],
        no: function(index, layero) {
            //按钮【稍后了解】的回调
            //暂时关闭弹窗
            flag = 0;
            layer.close(index);
        },
        yes: function(index, layero) {
            //按钮【立即了解】的回调
            //return false 开启该代码可禁止点击该按钮关闭
            //打开快商通
            //永久关闭弹窗
            flag = 1;
            window.open("https://ryak66.kuaishang.cn/bs/mim/68948/58194/765150.htm?ref=m_popup&" + target);
            layer.close(index);
        },
        // content: '<img onerror="imgNotFound();" src="//img.hzshuangmei.com/pc/kst/' +filename +'.png'+'"'+'/>',
        content: popimg,
        end: function() {
            if (flag == 1) {
                // 永远关闭弹窗
                window.clearTimeout(timer);
            } else {
                timer = setTimeout(popup, 15000);
            }
        }
    });
    //创建第三个按钮 “不再提示”
    $(".layui-m-layerbtn").prepend('<span class="never" id="never">不再提醒</span>');
    // "不再提示"按钮绑定点击事件
    $(".layui-m-layerbtn").on('click', "#never", function() {
        //点击之后清除循环定时器
        flag = 1;
        layer.closeAll();
    });
}
popup();
/*  移动端分享  */
//顶部分享按钮配置
var nativeShare = new NativeShare();
var shareUrl = window.location.href;
var shareTitle = document.title;
var shareData = {
    title: shareTitle,
    // desc: '{dede:field.description/}',
    // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
    link: shareUrl,
    icon: 'https://img.hzshuangmei.com/m/kst_logo.png',
    // 不要过于依赖以下两个回调，很多浏览器是不支持的
    success: function() {
        alert('success')
    },
    fail: function() {
        alert('fail')
    }
}
nativeShare.setShareData(shareData)

function call(command) {
    try {
        nativeShare.call(command)
    } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        //   alert(err.message)
        //  如果无法分享，弹窗提示，复制链接，手动分享
        // function manualCopy(){
        //     var link=$('input');
        //       link.value=shareUrl;
        //     link.select();
        //         document.execCommand("copy");
        // }
        //      manualCopy();
        alert("非常抱歉，暂不支持分享");
    }
}
// function setTitle(title) {
//     nativeShare.setShareData({
//         title: title,
//     })
// }
