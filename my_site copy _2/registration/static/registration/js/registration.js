

$(function () {
    //начало кода

    $(document).ready(function () {
        //запускается после загрузки страницы
        $("#btn_sub_reg_1").click(function () {
            valid('___reg___');
        });
        $("#btn_sub_reg_2").click(function () {
            var cod_mail_reg = $('#cod_mail_reg').val();
            console.log(cod_mail_reg);
            valid(cod_mail_reg);
        });
        function valid(code_reg) {
            //      массив для записи ошибок
            var err = [];
            //          провкряем данные полей и записываем их ы массив
            if ($('#name_reg').val().length < 2) {
                $('#name_reg').css('color', 'red');
                err.push('name < 2');
            } else {
                $('#name_reg').css('color', 'black');
            }
            if ($('#surname_reg').val().length < 2) {
                $('#surname_reg').css('color', 'red');
                err.push('surname < 2');
            } else {
                $('#surname_reg').css('color', 'black');
            }
            if ($('#date_reg').val().length < 4) {
                $('#date_reg').css('color', 'red');
                err.push('date');
            } else {
                $('#date_reg').css('color', 'black');
            }
            if ($('#email_reg').val().length < 5) {
                $('#email_reg').css('color', 'red');
                err.push('e-mail < 5');
            } else {
                $('#email_reg').css('color', 'black');
            }
            if ($('#login_reg').val().length < 4) {
                $('#login_reg').css('color', 'red');
                err.push('login < 4');
            } else {
                $('#login_reg').css('color', 'black');
            }
            if ($('#pass_reg_1').val().length < 8) {
                $('#pass_reg_1').css('color', 'red');
                err.push('pass < 8');
            } else {
                $('#pass_reg_1').css('color', 'black');
            }
            if ($('#pass_reg_1').val() !== $('#pass_reg_2').val()) {
                $('#pass_reg_2').css('color', 'red');
                err.push('pass != pass');
            } else {
                $('#pass_reg_2').css('color', 'black');
            }
            //          проверяем массив на пустоту
            if (err.length === 0) {
                //              отправляем данные формы на сервер
                ajax_Post_reg($('#name_reg').val(), $('#surname_reg').val(), 'buyer_seller', $('#date_reg').val(), $('#email_reg').val(), $('#login_reg').val(), $('#pass_reg_1').val(), code_reg);
            }
        }

        //конец функции после загрузки страницы
    });

    function ajax_Post_reg(name_reg, surname_reg, buyer_seller_reg, date_reg, email_reg, login_reg, pass_reg_1, code_reg) {

        var json = { name_reg: name_reg, surname_reg: surname_reg, buyer_seller_reg: buyer_seller_reg, date_reg: date_reg, email_reg: email_reg, login_reg: login_reg, pass_reg_1: pass_reg_1, code_reg: code_reg };
        $.ajax({
            type: 'POST',
            url: '/reg/',
            data: JSON.stringify(json),
            success: function (data) {
                alert(data.jjj);
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
