// window.addEventListener('touchmove', func, { passive: false })
// document.onreadystatechange = subSomething;    　　　 //当页面加载状态改变的时候执行这个方法

// function subSomething()
// {
//     console.log(document.readyState);
//     // if(document.readyState == "complete")            //判断页面加载状态
//     //     alert
// }
 var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒

var hide_arr={
    a_1:["0"],
    student_temp:["0"],
    a_2:["0"],
    a_3:["0"],
    a_4:["0"],
    a_5:["0"],
    a_6:["0"],
    // a_6_1:["0"],
    a_7:["0"],
    a_8:["0"],
    a_10:["0"],
    a_11:["0"],
    a_12:["0"]
}
$("input,textarea").on("blur",function(){
    setTimeout(function(){
        window.scrollTo(0,0);
    },100)
}).on('focus',function(){
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var offsetTop = $(this).offset().top - (clientHeight / 4);
    setTimeout(function(){
        window.scrollTo(0,offsetTop);
    },100)
})
function showmark(){
    $('.weui_mask').show();
    // $('.weui-custom-pop').addClass('weui-dialog-visible');
}
function hidemark(){
    $('.weui_mask').hide();
    // $('.weui-custom-pop').removeClass('weui-dialog-visible');
}
function saveStorage(storagename)
{
    var history={};
    var input = [];
    var textarea = [];
    var input_arr = ['text','tel','hidden','number','password'];
    window.localStorage[storagename]='';
    for(var i=0;i<$('#form1 input').length;i++){
        var type = $($('#form1 input')[i])[0].type;
        // alert(type);
        if(input_arr.indexOf(type) > -1){
            input.push({[type]:$($('#form1 input')[i]).val()})
        }
        if(type =='radio'){
            var checked = $($('#form1 input')[i])[0].checked;
            // console.log(checked);
            // alert($($('#form1 input')[i]).checked)
            input.push({"radio":checked})
        }
        if(type=='checkbox'){
            var checked = $($('#form1 input')[i])[0].checked;
            input.push({"checkbox": checked})
        }
    }

    for(var i=0;i<$('#form1 textarea').length;i++){                
        textarea.push({'textarea':$($('#form1 textarea')[i]).val()})               
    }
    // history = input;
    // console.log(history);
    // alert(JSON.stringify(history));
    history = {input: input ,textarea: textarea};
    window.localStorage[storagename]=JSON.stringify(history)
}


function getStorage(obj,storagename)
{

    var localMsg ;
    var inputMsg = [];
    var textareaMsg = [];
    if(window.localStorage[storagename]){
        localMsg=JSON.parse(window.localStorage[storagename]);
        // console.log(localMsg['input']);
        try {
            inputMsg = localMsg['input'] ? localMsg['input'] :[];
            // console.log('aaaa');
        } catch (error) {
            // console.log('bbb');
            inputMsg = [];
        }

        try {
            textareaMsg = localMsg['textarea'] ? localMsg['textarea'] : [];
        } catch (error) {
            textareaMsg = [];
        }
    }
    // console.log(inputMsg);
    var input_length = Math.min($('#form1 input').length,inputMsg.length);
    var textarea_length = Math.min($('#form1 input').length,textareaMsg.length);

    var input_arr = ['text','tel','hidden','number','password'];
    if(localMsg ){
        for(var i=0;i<input_length;i++){
            var type = $($('#form1 input')[i])[0].type;

                if(input_arr.indexOf(type) > -1){
                    $($('#form1 input')[i]).val(inputMsg[i][type])

                }
                if(type =='radio'){
                    $($('#form1 input')[i]).prop('checked',inputMsg[i].radio)
                }
                if(type =='checkbox'){
                    // $($('#form1 input')[i]).prop('checked',localMsg[realIndex].checkbox)
                    // realIndex++;
                }
            // }

        }

        for(var i=0;i<textarea_length;i++){  
            $($('#form1 textarea')[i]).val(textareaMsg[i].textarea); 
        }

        // displayalldom(obj);
        $("#div_tel").show();

    }
}

function saveFormToStorage(storagename)
{
    // console.log($('#form1').serialize());
    var history=[];
    var input_arr = ['text','tel','hidden','number','password'];
    window.localStorage[storagename]='';
    for(var i=0;i<$('#form1 input').length;i++){
        var item_type = $($('#form1 input')[i])[0].type;
        var item_id = $($('#form1 input')[i])[0].id
        var item_name = $($('#form1 input')[i])[0].name;
        var item_value = $($('#form1 input')[i]).val();
        // console.log(item_id);

        // alert(type);
        if(input_arr.indexOf(item_type) > -1){
             history.push({name:item_name,id:item_id,type:item_type,value:item_value});
        }
        if(item_type =='radio'){

            var checked = $($('#form1 input')[i])[0].checked;
            if(checked)
            {
                history.push({name:item_name,id:item_id,type:item_type,value:item_value});
            }
                
        }


        // if(item_type=='checkbox'){

        //     var checked = $($('#form1 input')[i])[0].checked;

        //      history.push({"checkbox": checked})
        // }
    }

    for(var i=0;i<$('#form1 textarea').length;i++){  
        // console.log($($('#form1 textarea')));
        var item_type = 'textarea';
        var item_id = $($('#form1 textarea')[i])[0].id
        var item_name = $($('#form1 textarea')[i])[0].name;
        var item_value = $($('#form1 textarea')[i]).val();

        // console.log(item_id);             
        history.push({name:item_name,id:item_id,type:item_type,value:item_value});              
    }
    // history = input;
    // console.log(history);
    // alert(JSON.stringify(history));
    // history = {input: input ,textarea: textarea};
    window.localStorage[storagename]=JSON.stringify(history)


}


function getFromStorate(obj,storagename)
{
    var localMsg ;
    // alert(window.localStorage[storagename])
    if(window.localStorage[storagename]){
        localMsg=JSON.parse(window.localStorage[storagename]);
        // if(localMsg[2]){
        //     localMsg[2] = '';
        // }

        // if(localMsg[10]){
        //     localMsg[10] = '';
        // }
        // if(localMsg[11]){
        //     localMsg[11] = '';
        // }
        // if(localMsg[12]){
        //     localMsg[12] = '';
        // }
        // if(localMsg[4]){
        //     localMsg[4] = '';
        // }
    }
    // console.log(inputMsg);
    // 日期清除缓存，默认是昨天
    // localMsg[10] = '';
    // localMsg[11] = '';
    // localMsg[12] = '';
    // console.log(localMsg[4])
    console.log('localMsg')

    var input_arr = ['text','tel','hidden','number','password','textarea'];
    var input_radio_arr = ['row[a_9]'];
    var input_radio_arr1 = ['row[a_6]'];
    var input_radio_arr2 = ['row[a_7]'];
    var input_radio_arr3 = ['row[is_into]'];
    var input_radio_arr4 = ['row[is_nucleic]'];
    if(localMsg && localMsg.length > -1){
        for(var i=0;i<localMsg.length;i++){
            var item_id = localMsg[i].id;
            var item_name = localMsg[i].name;
            var item_type = localMsg[i].type;
            var item_value = localMsg[i].value;

            var dom = item_id ? $("#"+item_id) : $("[name='"+item_name+"']");

            if(input_arr.indexOf(item_type) > -1){
                dom.val(item_value);
            }
            if(item_type =='radio'){
                if(input_radio_arr.indexOf(item_name) == -1 && input_radio_arr1.indexOf(item_name) == -1 && input_radio_arr2.indexOf(item_name) == -1 && input_radio_arr3.indexOf(item_name) == -1 && input_radio_arr4.indexOf(item_name) == -1)
                {
                    if(item_id)
                        dom.prop('checked',true);
                    else
                        $("input:radio[name='"+item_name+"'][value='" +item_value+ "']").prop("checked",true);
                }

                // $($('#form1 input')[i]).prop('checked',inputMsg[i].radio)
            }

        }

        displayalldom(obj);
        $("#div_tel").show();


    }
}


function clearstorage()
{
    localStorage.clear();

}


function displaydom(id,value,is_required)
{
    console.log(id);
    var arr = hide_arr[id];
    // console.log(arr);
    // console.log(value);
    dom = $("#"+id);
    // console.log(arr.indexOf(value));
    if (value == undefined || arr.indexOf(value) > -1 || value == "") {
        dom.hide();
        // dom.find(":input").attr("disabled", true);
        dom.find(":input").attr("required", false);
    }
    else{
        dom.show();
        // dom.find(":input").attr("disabled", false);
        if(is_required == 1)
        {
            dom.find(":input").attr("required", true);
        }
        else{
            dom.find(":input").attr("required", false);
        }
        // alert(dom);
        // if(id == 'a_1')
        // {
        //     group_id = $('input[type=radio][name="group_id"]:checked').val();
        //     a_1_value = $('input[type=radio][name="row[a_1]"]:checked').val();

        //     if(group_id == 1 && a_1_value!=0)
        //     {

        //         $(".student_temp").show();
        //         $(".student_temp").find(":input").attr("required", true);
        //     }
        //     else
        //     {

        //         $(".student_temp").hide();
        //         $(".student_temp").find(":input").attr("required", false);
        //     }
        // }
    }
}

function setbutton(value)
{
    if(value)
    {
        $("#formSubmitBtn").attr("disabled", false);
        $("#formSubmitBtn").removeClass("weui-btn_disabled");
    }
    else
    {
        $("#formSubmitBtn").attr("disabled", true);
        $("#formSubmitBtn").addClass("weui-btn_disabled");
    }
}
function showdom(dom)
{
    dom.show();
    // dom.find(":input").attr("disabled", false);
    dom.find(":input").attr("required", true);
}
function hidedom(dom)
{
    dom.hide();
    // dom.find(":input").attr("disabled", true);
    dom.find(":input").attr("required", false);
}


function displayalldom(obj)
{
    for( let item of obj)
    {
        var value = $('input[type=radio][name="'+item.name+'"]:checked').val();
        if(item.id == 'group_id')
        {
            displaybygroupid(value);
        }
        else
        {
            displaydom(item.id,value,item.is_required);
        }
    }
}

function displaybygroupid(value)
{
    a_1_value = $('input[type=radio][name="row[a_1]"]:checked').val();
    // alert(a_1_value)
    switch (value) {
        case "1":
            showdom($(".student"));
            showdom($(".xuehao"));
            hidedom($(".teacher"));
            $("#tel_lable").html('手机号');
            // if(a_1_value == 0 )
            // {
            //     $(".student_temp").hide();
            //     $(".student_temp").find(":input").attr("required", false);
            // }
            // else{
            //     $(".student_temp").show();
            //     $(".student_temp").find(":input").attr("required", true);
            // }
            $("#tihao").text("8");
            $("#vaccines").text("9");
            break;
        case '2':
            hidedom($(".xuehao"));
            showdom($(".teacher"));
            hidedom($(".student"));
            $("#tel_lable").html('如有教工号填教工号，没有请填手机号');
            // $(".student_temp").hide();
            // $(".student_temp").find(":input").attr("required", false);
            $("#tihao").text("8");
            $("#vaccines").text("9");
            break;
        case '4':
            showdom($(".xuehao"));
            hidedom($(".student"));
            hidedom($(".teacher"));
            $("#tel_lable").html('手机号');
            // $(".student_temp").hide();
            // $(".student_temp").find(":input").attr("required", false);
            $("#tihao").text("7");
            $("#vaccines").text("8");
            break;
        default:
            // $("#tihao").text("6");
            break;
    }
}


function setreadonly()
{
    $('input[type=radio][name="group_id"]').attr("readonly", true);
    $('#nickname').attr("readonly", true);
    $("#tel").attr("readonly", true);
    $("#sid").attr("readonly", true);

}

function h5getaddress(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(ev){
                // alert(ev.coords.latitude + " : " + ev.coords.longitude);
                $("#lat").val(ev.coords.latitude);
                $("#lon").val(ev.coords.longitude);
            },
            function(err){
                // alert(err.code+':'+err.message);
            })
    }else{
    }
}

function getLocation()
{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(ev){
                alert(ev.coords.latitude + " : " + ev.coords.longitude);
                $("#lat").val(ev.coords.latitude);
                $("#lon").val(ev.coords.longitude);
            },
            function(err){
                if(err.code == 1) {
                   alert("Error: Access is denied!");
                }else if( err.code == 2) {
                   alert("Error: Position is unavailable!");
                } else if(err.code == 3) {
                    alert("Error: Position is unavailable!");
                }
            })
    }else{
        alert('不支持');
    }
}

function checkAllowAddress(){
    setInterval(function () {
        var lon = $("#lon").val();
        var lat = $("#lat").val();
        if(lon == "" || lat == ""){
            alert("请允许使用位置");
            window.location.reload();
        }
    },1000)
}


function jishi(){
    var minute,second;//时 分 秒
    minute=second=0;//初始化
    var millisecond=0;//毫秒
    var int;
    var date = new Date();
    //格式化为本地时间格式
    var date1 = date.toLocaleString();
    $("#time").html(date1);
}

function timer(){
    millisecond=millisecond+50;
   if(millisecond>=1000)
   {
    millisecond=0;
    // second=second+1;
   }
//    if(second>=60)
//    {
//     second=0;
//     minute=minute+1;
//    }

//    if(minute>=60)
//    {
//     minute=0;
//     hour=hour+1;
//    }
    // $('#timetext').html(toDub(minute)+':'+toDub(second)+':'+toDub(millisecond/10));
    $('#timetext').html(toDub(millisecond/10));
 }
 function toDub(n){
    return n<10?"0"+n:""+n;
  }
function toMin(n){
    return n<10?"00"+n: n<100 ? "0"+n:""+n;
}