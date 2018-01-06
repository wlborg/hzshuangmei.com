/*
* @Author: chj
* @FileName:kst_popup.js
* @Date:   2018-01-06 10:54:26
* @Last Modified by:   chj
* @Last Modified time: 2018-01-06 11:46:22
*/
/*  移动版     自定义弹窗邀请框 */
/*
    弹窗显示 时间time参数控制（豪秒）
    setTimeout 设置循环时间（毫秒）
    使用图片和M端弹窗图片一致

使用方法：
1. <script src="{dede:global.cfg_jspath/}/pc/layer/mobile/layer.js"></script> 引入
2. 配置
 */
function popup() {
    //get current page filename
    var target = window.location.href;
    var filename = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0];
    //var timer = null;
    layer.open({
        type: 1,
        anim: 'up',
        shade: 0,
        shadeClose: true,
        className: 'popup',
        time:5,     //弹窗停留时间
        btn: ['立即了解', '稍后了解'],
        no: function(index, layero) {
            //按钮【按钮二】的回调
            layer.close(index);
        },
        yes: function(index, layero) {
            //按钮【按钮三】的回调
            //return false 开启该代码可禁止点击该按钮关闭
            //打开快商通
            window.open("https://ryak66.kuaishang.cn/bs/mim/68948/58194/765150.htm?ref=m_popup&" + target);
            layer.close(index);
        },
        // btnAlign: 'c',
  content: '<img src="//img.hzshuangmei.com/pc/kst/' +filename +'.png'+'"'+'/>',
        end: function() {
            setTimeout(popup, 15000);      //15秒后自动弹窗
        }
    });
}
popup();
