/*
 * @Author: chj
 * @FileName:kst_popup.js
 * @Date:   2018-01-06 11:05:43
 * @Last Modified by:   chj
 * @Last Modified time: 2018-01-11 09:07:38
 */
/* PC版   自定义弹窗邀请框 */
/*
    弹窗显示 时间time参数控制（豪秒）
    setTimeout 设置循环时间（毫秒）
    使用图片和M端弹窗图片一致
自定义弹窗图片大小： (600*385)
使用方法：
1. <script src="{dede:global.cfg_jspath/}/pc/layer/layer.js"></script> 引入
2. 配置
 */
function popup() {
    //get current page filename
    var target = window.location.href;
    var filename = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0];
    var timer = null;
    //如果当前页面没有对应弹窗图片，则使用默认的图片default.png
    //判断一个url是否可以访问
    //
    $(function(){
        $.ajax({
    type: 'get',
    cache: true,
    url: 'img.hzshuangmei.com/pc/kst/' + filename + '.png',
    dataType: "jsonp",
    processData: false,
    complete: function (response) {
        console.info(response);
              if(response.status==200) {
            console.log('ifresh!');
      }
      if(response.status==404) {
          console.log('404 error!');
     filename="default";
      }
    }
});
    })
    //不永远关闭弹窗
    var flag = 0;
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shade: 0,
        shadeClose: true,
        anim: 0,
        skin: 'popup',
        area: ['600px', '450px'],
        //time: 6000,
        resize: false,
        btn: ['不再提醒', '稍后再说', '立即咨询'],
        yes: function(index, layero) {
            //按钮【按钮一】的回调
            //$("#layui-layer1").hide();
            //永远关闭弹窗
            flag = 1;
            layer.closeAll();
        },
        btn2: function(index, layero) {
            //按钮【按钮二】的回调
            //$("#layui-layer1").hide();
            //暂时关闭弹窗
            flag = 0;
            layer.close(index);
        },
        btn3: function(index, layero) {
            //按钮【按钮三】的回调
            //return false 开启该代码可禁止点击该按钮关闭
            //打开快商通
            //暂时关闭弹窗
            flag = 0;
            window.open("https://ryak66.kuaishang.cn/bs/im/68948/58194/765150.htm?ref=pc_popup&" + target);
            layer.close(index);
        },
        btnAlign: 'c',
        content: '<img width="600" height="385" src="//img.hzshuangmei.com/pc/kst/' + filename + '.png' + '"' + '/>',
        end: function() {
            if (flag == 1) {
                // 永远关闭弹窗
                window.clearTimeout(timer);
            } else {
                timer = setTimeout(popup, 15000);
            }
        }
    });
}
popup();
