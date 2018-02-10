/*
 * @Author: chj
 * @FileName:kst_popup.js
 * @Date:   2018-01-06 11:05:43
 * @Last Modified by:   chj
 * @Last Modified time: 2018-02-10 17:37:54
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
// function imgNotFound() {
//         var img = $(".popup img").get(0);
//         //默认图片
//         img.src = "//img.hzshuangmei.com/pc/kst/default.png";
//         img.onerror = null;
//     }
// function popup() {
//     //get current page filename
//     var target = window.location.href;
//     var filename = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0];
//     var timer = null;
//     //不永远关闭弹窗
//     var flag = 0;
//     layer.open({
//         type: 1,
//         title: false,
//         closeBtn: 0,
//         shade: 0,
//         shadeClose: true,
//         anim: 0,
//         skin: 'popup',
//         area: ['600px', '450px'],
//         time: 12000,
//         resize: false,
//         btn: ['不再提醒', '稍后再说', '立即咨询'],
//         yes: function(index, layero) {
//             //按钮【按钮一】的回调
//             //$("#layui-layer1").hide();
//             //永远关闭弹窗
//             flag = 1;
//             layer.closeAll();
//         },
//         btn2: function(index, layero) {
//             //按钮【按钮二】的回调
//             //$("#layui-layer1").hide();
//             //暂时关闭弹窗
//             flag = 0;
//             layer.close(index);
//         },
//         btn3: function(index, layero) {
//             //按钮【按钮三】的回调
//             //return false 开启该代码可禁止点击该按钮关闭
//             //打开快商通
//             //暂时关闭弹窗
//             flag = 0;
//             window.open("https://ryak66.kuaishang.cn/bs/im/68948/58194/765150.htm?ref=pc_popup&" + target);
//             layer.close(index);
//         },
//         btnAlign: 'c',
//         content: '<img width="600" height="385" onerror="imgNotFound();" src="//img.hzshuangmei.com/pc/kst/' + filename + '.png' + '"' + '/>',
//         end: function() {
//             if (flag == 1) {
//                 // 永远关闭弹窗
//                 window.clearTimeout(timer);
//             } else {
//                 timer = setTimeout(popup, 15000);
//             }
//         }
//     });
// }
// popup();


var popup = {
    function() {
        /*
          页面加载完，只执行一次，用于检测当前页面对应的弹窗图片资源是否存在,
         */
         var target = window.location.href;
        //当前URL的文件名
        var currentFilename = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0];
        //对应的弹窗图片URL
        var currentPopupImg = 'https://img.hzshuangmei.com/pc/kst/' + currentFilename + '.png';
          // 默认的弹窗图片URL
      var defautlPopupImg = 'https://img.hzshuangmei.com/pc/kst/default.png';
        // 图片变量
      var  picContent="";
        var checkPopupImgOnce = function() {
            $.ajax({
                url: currentPopupImg,
                type: 'GET',
                complete: function(response) {
                    if (response.status == 200) {
                        //对应图片存在，不做操作;
                        console.log('对应弹窗图片存在');
                        picContent = currentFilename;
                    } else {
                        //对应图片不存在，调用换图方法;
                        console.log('对应弹窗图片不存在');
                        changePopUpImgSrc();
                    }
                }
            });
        }
        /*
                依据checkPopupImgOnce检测结果，做相应的设置
                如果存在对应图片则不修改。
              如果不存在，则设置为默认的图
         */
        var changePopUpImgSrc = function() {
                picContent=defautlPopupImg;
        }
        var showPopUp = function() {
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
                time: 12000,
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
                content: picContent,
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
    }
}
popup.checkPopupImgOnce();
popup.showPopUp();
