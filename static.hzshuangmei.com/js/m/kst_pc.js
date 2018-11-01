

        var timer = null
            //  检查dom是否执行完成
        function check() {
            let dom = document.getElementById('div3')
            if(dom) {
                  // 点击稍后咨询按钮隐藏，12秒后出现
                 $(document).on("click","#div23",function(){
                    $("#_ks_ol_inviteWin").attr("id","kReomve");

                 });
                //  清除定时器
                if(!timer) {
                    clearTimeout(timer)
                }
            } else {
                //  自我调用
                timer = setTimeout(check, 0)
            }
        }
        //  首次执行
        check();



