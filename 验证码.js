/**
 * Created by Keller、Ruiming on 2017/4/15.
 */
function loginVerify(option){
    this._init(option);
}

loginVerify.prototype = {
    _init: function(option){
        //共享构造函数的属性

    },
    //校验工号
    validateTid: function () {
        var tId = $("#tId").val();
        //$("#Id").val($.trim(tId));
        if (!(tId && tId.length == 5 && !isNaN(tId))) {
            //$("#tId").val("");
            $("#tId").css("border", "1px solid red");
            $('[data-toggle="tooltip0"]').tooltip();
            return false;
        } else {
            $("#tId").css("border", "1px solid #d2d2d2");
            return true;
        }
    },
    //校验密码
    validateTpassword: function () {
        var tPassword = $("#tPassword").val();
        //$("#tPassword").val($.trim(tPassword));
        if (tPassword == "") {
            $('[data-toggle="tooltip1"]').tooltip();
            $("#tPassword").css("border", "1px solid red");
            return false;
        } else {

            $("#tPassword").css("border", "1px solid #d2d2d2");
            return true;
        }
    },
    //校验验证码
    validateVerifycode: function () {
        var verifycode = $("#verifycode").val();
        var isSuccess = true;
        if (!verifycode){
            $("#errorTips").html("请输入验证码");
            return false;
        }
        else {
            $.ajax({
                url: "/apis/signin/verify/" + verifycode,
                success: function (data) {
                    if (!data.success) {
                        $("#errorTips").html(data.msg);
                        isSuccess = false;
                    } else {
                        $("#errorTips").html("");
                        isSuccess = true;
                    }
                    // isSuccess = data.success.value;
                }
            });
            return isSuccess;
        }
    },
    //提交之前对工号，密码，验证码再次进行总的验证
    validate: function () {
        var tId = $("#tId").val();
        var tPassword = $("#tPassword").val();
        console.log(tPassword+"------"+tId);
        if (this.validateTid() && this.validateTpassword() && this.validateVerifycode()) {
            $.ajax({
                type: "post",
                url: "http://hongrm.cn/apis/signin/teacher/login",
                data: "tId=" + tId + "&tPassword=" + tPassword,
                success: function (data) {
                    //var json = JSON.parse(data);
                    //alert(1);
                    if (data.success == true) {
                        alert(1);
                        window.location.href = "http://www.baidu.com";
                    } else {
                        $("#errorTips").html("输入账号或者密码错误！");
                    }
                },
                error: function (err) {
                    console.log(err);
                }

            });
        }
    }

}

/*实例化一个loginVeryfy对象*/
var login = new loginVerify();

$('#verifycode').blur(function () {
    login.validateVerifycode();
});
$('#tId').blur(function () {
    login.validateTid();
});
$('#tPassword').blur(function () {
    login.validateTpassword();
});
$('#sub').click(function () {
    login.validate();
});

$('#refresh').click(function () {
    $(this).attr('src', 'http://hongrm.cn/apis/signin/verify/verifycode.jpg?' + Math.floor(Math.random() * 100));
});