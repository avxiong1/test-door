define(['jquery', 'jquery-weui', 'weui', 'common'], function ($, JqueryWuei, Weui) {
    var Controller = {
        index: function () {

            $('#formSubmitBtn').click(function () {
                // event.preventDefault();
                Weui.form.validate('#form1', function (error) {
                    console.log(error);
                    if (!error) {
                        setbutton(0);
                        $.ajax({
                            //几个参数需要注意一下
                            type: "POST",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: "/index.php/index/osideentry",//url
                            data: $('#form1').serialize(),
                            success: function (ret) {
                                if (ret.code == 1) {
                                    $.alert({
                                        title: ret.msg,
                                        text: ret.data.nickname + '您好:<br>您入校时间为：' + ret.data.create_time + "<br><div style='color:red;margin-top:5px;'>请将此页面提供给保卫处工作人员作为进校登记凭证</div>",
                                        onOK: function () {
                                            WeixinJSBridge.invoke('closeWindow', {}, function (res) {
                                            });

                                        }
                                    });
                                    GetTime();
                                } else if (ret.code == 0) {
                                    $.alert({
                                        title: '提示',
                                        text: ret.msg,
                                        onOK: function () {
                                            setbutton(1);
                                        }
                                    });
                                }
                                // if(ret.code == 1)
                                //
                            },
                            error: function (error) {
                                console.log(error);
                                alert(JSON.stringify(error))
                                $.alert({
                                    title: '提示',
                                    text: '网络异常,请再次提交！',
                                    onOK: function () {
                                        setbutton(1);
                                    }
                                });
                                // alert("异常！");
                            }
                        });
                    }

                }, {
                    regexp: {
                        IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,

                    }
                });
                return false;
            });
        },
        check: function () {
            $('#formSubmitBtn').click(function () {
                Weui.form.validate('#form1', function (error) {
                    // console.log(error);
                    const phone = $('#form1').serialize().split('=').pop();
                    const userInfo = [{
                        phone: '13864253640',
                        name: '仇阳阳',
                    }, {
                        phone: '17616805580',
                        name: '王昊飏',
                    }, {
                        phone: '15192026967',
                        name: '马少华',
                    }];
                    if (!error) {
                        setbutton(0);
                        if (!!userInfo.find(item => item.phone == phone)) {
                            var alert_text = '<div id="check-alert">';
                            alert_text += '<p>' + userInfo.find(item => item.phone == phone).name + '&nbsp;您好:</p>';
                            alert_text += '<p>' + '您的申请已通过，允许您正常出入</p>';
                            alert_text += '<p>' + '通行日期：' + '<span id="admission_time"></span>' + '</p>';
                            alert_text += '<p>' + '当前时间：' + '<span id="gg-timer"></span></p>';
                            alert_text += '</div>';
                            $.alert({
                                // title: ret.msg,
                                title: "<span id='check-success-title' style='font-weight: bold;color: #0a6332;font-size: 20px'>允许通行</span>",
                                text: alert_text,
                                // text: ret.data.nickname + '您入校时间为：' + ret.data.admission_time + "<br><div style='color:red;margin-top:5px;'>请将此页面提供给保卫处工作人员作为进校登记凭证</div>",
                                onOK: function () {
                                    WeixinJSBridge.invoke('closeWindow', {}, function (res) {
                                    });

                                }
                            });
                        } else {
                            var alert_text = '<div id="check-alert"><br>';
                            alert_text += '<p>' + '未授权' + '</p>';
                            alert_text += '</div>';
                            $.alert({
                                title: "<span id='check-success-title' style='font-weight: bold;color: red;font-size: 20px'>拒绝通行</span>",
                                text: alert_text,
                                onOK: function () {
                                    setbutton(1);
                                }
                            });
                        }
                    }

                }, {
                    regexp: {
                        IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,

                    }
                });
                return false;
            });
        },
        check1: function () {
            $('#formSubmitBtn').click(function () {
                Weui.form.validate('#form1', function (error) {
                    // console.log(error);
                    if (!error) {
                        setbutton(0);
                        if (ret.code == 1) {
                            var alert_text = '<div id="check-alert">';
                            alert_text += '<p>' + ret.data.nickname + '&nbsp;您好:</p>';
                            alert_text += '<p>' + '您的申请已通过，允许您正常出入</p>';
                            alert_text += '<p>' + '通行日期：' + ret.data.admission_time + '</p>';
                            alert_text += '<p>' + '当前时间：' + '<span id="gg-timer"></span></p>';
                            alert_text += '</div>';
                            $.alert({
                                // title: ret.msg,
                                title: "<span id='check-success-title' style='font-weight: bold;color: #0a6332;font-size: 20px'>允许通行</span>",
                                text: alert_text,
                                // text: ret.data.nickname + '您入校时间为：' + ret.data.admission_time + "<br><div style='color:red;margin-top:5px;'>请将此页面提供给保卫处工作人员作为进校登记凭证</div>",
                                onOK: function () {
                                    WeixinJSBridge.invoke('closeWindow', {}, function (res) {
                                    });

                                }
                            });
                        } else if (ret.code == 0) {
                            var alert_text = '<div id="check-alert"><br>';
                            alert_text += '<p>' + ret.msg + '</p>';
                            alert_text += '</div>';
                            $.alert({
                                title: "<span id='check-success-title' style='font-weight: bold;color: red;font-size: 20px'>拒绝通行</span>",
                                text: alert_text,
                                onOK: function () {
                                    setbutton(1);
                                }
                            });
                        }
                    }

                }, {
                    regexp: {
                        IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,

                    }
                });
                return false;
            });
        }



    };
    return Controller;
});

function getCurrentDateRange() {
    // 获取当前日期
    const currentDate = new Date();
    
    // 获取当前的年、月
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // getMonth() 返回的月是从 0 开始的，所以要加 1
    
    // 计算下个月的年、月
    let nextMonth = month + 1;
    let nextYear = year;
    
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    
    // 固定日期为02
    const day = '02';
    
    // 格式化月份
    const formattedCurrentMonth = month < 10 ? `0${month}` : month;
    const formattedNextMonth = nextMonth < 10 ? `0${nextMonth}` : nextMonth;
    
    // 组合成所需的格式
    const startDate = `${year}-${formattedCurrentMonth}-${day}`;
    const endDate = `${nextYear}-${formattedNextMonth}-${day}`;
    
    return `${startDate} ~ ${endDate}`;
}

function GetTime() {
    // console.log(1231);
    var mon, day, now, hour, min, ampm, time, str, tz, end, beg, sec;
    /*
       mon = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                 "Sep", "Oct", "Nov", "Dec");
         */
    mon = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月",
        "九月", "十月", "十一月", "十二月");
    /*
         day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
         */
    day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    now = new Date();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    $("#gg-timer").html(
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "  " + hour + ":" + min + ":" + sec
    );
    $('#admission_time').html(
        getCurrentDateRange()
    );
}

setInterval("GetTime()", 1000);
