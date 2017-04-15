var dataid = window.location.search.split('=')[1];
console.log(dataid)
var tel = document.getElementById('tel');
var telSub = document.getElementById('telSub');
//console.log(tel)
tel.oninput = function() {
    //console.log(tel.value.length);
    //console.log(telSub)
    if (tel.value.length == 11) {
        telSub.style.backgroundColor = '#337ab7';
        telSub.onclick = subTel;
    } else {
        telSub.style.backgroundColor = '#9b9794';
        telSub.onclick = null;
    }
}
var temp;
var vcode;
var cellphone;

function subTel() {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(tel.value))) {
        //alert("手机号码有误，请重填");
        layer.open({
            content: '手机号码有误，请重新输入',
            btn: '确定'
        });
        return false;
    }
    clearInterval(temp);
    console.log("req" + "=" + "{cellphone:" + tel.value + "}")
    $.ajax({
        type: 'post',
        url: 'http://www.yixiucar.com/yxapi/invite/sendvc',
        dataType: 'json',
        async: false,
        data: "req" + "=" + "{" + "'cellphone':" + strToJson(tel.value) + "}",
        success: function(data) {
            if (data.requestCode == '-1') {
                alert(data.message);
                layer.open({
                    content: data.message,
                    btn: '确定'
                });
                return false;
            } else {
                if (!data.vcode) {
                    //alert('当日接收邀请码已达上限')
                    layer.open({
                        content: '当日接收邀请码已达上限',
                        btn: '确定'
                    });
                } else {
                    //console.log(data);
                    vcode = data.vcode;
                    cellphone = data.cellphone;
                    //alert('邀请码已发送，请注意查收');
                    layer.open({
                        content: '邀请码已发送，请注意查收',
                        btn: '确定'
                    });
                    countDown()
                }
            }
        }

    })
}
var sub = document.getElementById('sub');
var vCode = document.getElementById('vcode');
//console.log(vcode)
//console.log(sub)
sub.onclick = function() {
        //console.log('111')
        //console.log(vcode)
        //console.log(vcode.value)
        //console.log(vcode.value)
        if (vCode.value == '') {
            //alert('请输入验证码');
            layer.open({
                content: '请输入验证码',
                btn: '确定'
            });
            return false;
        }
        if (vCode.value != vcode) {
            //alert('请输入验证码');
            layer.open({
                content: '验证码不正确，请重新输入',
                btn: '确定'
            });
            return false;
        }
        $.ajax({
            type: 'post',
            url: 'http://www.yixiucar.com/yxapi/invite/regist',
            dataType: 'json',
            async: false,
            data: "req" + "=" + "{" + "'inviteCode':" + strToJson(dataid) + "," + "'cellphone':" + strToJson(cellphone) + "}",
            success: function(data) {
                console.log(data);
            }
        })
    }
    // 转json
function strToJson(str) {
    return "'" + str + "'";
}

function countDown() {
    var num = 59;
    telSub.onclick = null;
    telSub.style.backgroundColor = '#9b9794';
    telSub.innerHTML = num;
    temp = setInterval(function() {
        num--;
        telSub.innerHTML = num;
        if (num == 0) {
            clearInterval(temp);
            telSub.innerHTML = '验证';
            telSub.onclick = subTel;
            telSub.style.backgroundColor = '#337ab7';
        }
    }, 1000)
}
