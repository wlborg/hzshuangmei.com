

        var timer = null
            //  检查dom是否执行完成
        function check() {
            var dom = document.getElementById('div23')
            if(dom) {
                   $("#_ks_ol_inviteWin").css("margin-left","-6.5rem");
                   $("#_ks_ol_inviteWin").css("margin-top","-6.21rem");
                  // 点击稍后咨询按钮隐藏，12秒后出现
                 $(document).on("click","#div23",function(){
                    $("#_ks_ol_inviteWin").attr("id","kReomve");

                 });
                //  清除定时器
                if(!timer) {
                    clearTimeout(timer);
                     TwShow();
                }
            } else {
                //  自我调用
                timer = setTimeout(check, 0)
            }
        }
        //  首次执行
        check();



        var timer2 = null
            //  检查dom是否执行完成
        function check2() {
            var dom = document.getElementById('div1')
            if(dom) {
                  // 点击稍后咨询按钮隐藏，12秒后出现
                 $(document).on("click","#div1",function(){
                    $("#_ks_ol_inviteWin").attr("id","kReomve");

                 });
                //  清除定时器
                if(!timer2) {
                    clearTimeout(timer2);
                    TwShow();
                }
            } else {
                //  自我调用
                timer2 = setTimeout(check2, 0)
            }
        }
        //  首次执行
        check2();
          function TwShow(){
          setTimeout(function(){
            $("#id").attr("id","k_s_ol_inviteWin");
          },12000)
        }
