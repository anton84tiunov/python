
$(function () {
    //начало кода

    $(document).ready(function () {
        //запускается после загрузки страницы
        $("#btn_sub_aut").click(function () {
            valid();
        });
        $("#btn_show_coocies_aut").click(function () {
            alert($.cookie('login') + " " + $.cookie('password') + " " + $.cookie('buyer_seller'));
        });
        $("#btn_dell_coocies_aut").click(function () {
            $.cookie("login", null, { expires: 0, path: '/' });
            $.cookie("password", null, { expires: 0, path: '/' });
            $.cookie("buyer_seller", null, { expires: 0, path: '/' });
            alert($.cookie('login') + " " + $.cookie('password') + " " + $.cookie('buyer_seller'));
        });
        function valid() {
            //      массив для записи ошибок
            var err = [];
            //          провкряем данные полей и записываем их ы массив

            if ($('#login_aut').val().length < 4) {
                $('#login_aut').css('color', 'red');
                err.push('login < 4');
            } else {
                $('#login_aut').css('color', 'black');
            }
            if ($('#pass_aut').val().length < 8) {
                $('#pass_aut').css('color', 'red');
                err.push('pass < 8');
            } else {
                $('#pass_aut').css('color', 'black');
            }
            //          проверяем массив на пустоту
            if (err.length === 0) {
                //              отправляем данные формы на сервер
                ajax_Post_aut($('#login_aut').val(), $('#pass_aut').val());
            } else {

            }
        }

        //конец функции после загрузки страницы
    });

    function ajax_Post_aut(login_aut, pass_aut) {

        var json = {login_aut: login_aut, pass_aut: pass_aut };
        $.ajax({
            type: 'POST',
            url: '/aut/',
            data: JSON.stringify(json),
            success: function (data) {
                alert(data.jjj);
                $.cookie("login", data.login.toString(), { expires: 7, path: '/' });
                $.cookie("password", data.passw.toString(), { expires: 7, path: '/' });
                $.cookie("buyer_seller", data.buyer_seller.toString(), { expires: 7, path: '/' });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    }

    //конец кода
});

