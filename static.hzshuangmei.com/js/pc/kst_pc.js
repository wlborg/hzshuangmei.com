

        var timer = null
            //  检查dom是否执行完成
        function check() {
            var dom = document.getElementById('div3')
            if(dom) {
                  $("#k_s_ol_inviteWin").css("margin-left","-300px");
                   $("#k_s_ol_inviteWin").css("margin-top","-192.5px");
                  // 点击稍后咨询按钮隐藏，12秒后出现
                 $(document).on("click","#div3",function(){
                    $("#k_s_ol_inviteWin").attr("id","kReomve");
                     TwShow();

                 });
                //  清除定时器
                if(!timer) {
                    clearTimeout(timer);

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
            var dom = document.getElementById('div39')
            if(dom) {
                  // 点击稍后咨询按钮隐藏，12秒后出现
                 $(document).on("click","#div39",function(){
                    $("#k_s_ol_inviteWin").attr("id","kReomve");

                 });
                //  清除定时器
                if(!timer2) {
                    clearTimeout(timer2);
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
            $("#kReomve").attr("id","k_s_ol_inviteWin");
          },12000)
        }

