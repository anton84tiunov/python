//начало кода
$(function () {
//запускается после загрузки страницы
    $(document).ready(function () {
        $('#name_user').html($.cookie('login'));
//        запускается если пользователь впервые зашол в кабинет
        if ($.cookie('buyer_seller') === 'buyer_seller') {
            $('#buyer_seller_user').html('');
            $('#div_buyer_my_cabinet').css('display', 'none');
            $('#div_buyer_my_cabinet').css('display', 'none');
        }
//        запускается если пользователь в последний раз заходил как покупатель
        if ($.cookie('buyer_seller') === 'buyer') {
            $("input[type='text'], textarea").val("");
            is_buyer();
        }
//        запускается если пользователь в последний раз заходил как продавец
        if ($.cookie('buyer_seller') === 'seller') {
            $("input[type='text'], textarea").val("");
            is_seller();
        }
//        ОБРАБОТЧИКИ НАЖАТИЙ НА КНОПКИ

//        при выборе покупателя
        $("#btn_my_cabinet_buyer").click(function () {
            $("input[type='text'], textarea").val("");
            var json = { buyer_seller_my_cabinet: 'buyer', login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'), service_code: '___+++___' };
            ajax_Post_my_cabinet(json);
        });
//        при выборе продавца
        $("#btn_my_cabinet_seller").click(function () {
            $("input[type='text'], textarea").val("");
            var json = { buyer_seller_my_cabinet: 'seller', login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'), service_code: '___+++___' };
            ajax_Post_my_cabinet(json);
        });

//        при выборе посмотреть историю покупателя
        $("#btn_buyer_history_show").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_buyer_history').css('display', 'block');
        });
//        при выборе закрыть историю покупателя
        $("#btn_buyer_history_hide").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_buyer_history').css('display', 'none');
        });
//        при выборе посмотреть товары продавца
        $("#btn_seller_products_show").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_seller_products').css('display', 'block');
            products_user();
        });
//        при выборе закрыть товары продавца
        $("#btn_seller_products_hide").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_seller_products').css('display', 'none');
        });
//        при выборе посмотреть историю продавца
        $("#btn_seller_history_show").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_seller_history').css('display', 'block');
            history_user();
        });
//        при выборе закрыть историю продавца
        $("#btn_seller_history_hide").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_seller_history').css('display', 'none');
        });
//       при выборе добавить товар продовцом
        $("#btn_seller_put_up").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_seller_put_up').css('display', 'block');
        });
//       при выборе закрыть добавить товар продовцом
        $("#btn_seller_put_up_out").click(function () {
            $("input[type='text'], textarea").val("");
            $('#div_seller_put_up').css('display', 'none');
        });
//       добавляет товар
        $("#btn_add_product").click(function () {
            add_product();
        });
//      функция при выборе покупателя
        function is_buyer(){
            $('#buyer_seller_user').html('покупатель');
            $('#div_seller_products').css('display', 'none');
            $('#div_seller_history').css('display', 'none');
            $('#div_buyer_history').css('display', 'none');
            $('#div_seller_put_up').css('display', 'none');
            $('#div_seller_my_cabinet').css('display', 'none');
            $('#div_buyer_my_cabinet').css('display', 'block');
        }
//      функция при выборе продавца
        function is_seller(){
            $('#buyer_seller_user').html('продавец');
            $('#div_seller_products').css('display', 'none');
            $('#div_seller_history').css('display', 'none');
            $('#div_buyer_history').css('display', 'none');
            $('#div_seller_put_up').css('display', 'none');
            $('#div_buyer_my_cabinet').css('display', 'none');
            $('#div_seller_my_cabinet').css('display', 'block');
        }
// функция которая возвращает массив ключевых слов
        function keywords_product(){
            var json = { buyer_seller_my_cabinet: 'seller', login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'), service_code: '___>>>___' };
            ajax_Post_my_cabinet(json);
        }
//функция для добавления товара продавцом
        function add_product() {
//        массив для сбора ошибок при заполнение формы
            var err = [];
//            проверяет название товара
            if ($('#inp_name_new_product').val().length < 5) {
                $('#inp_name_new_product').css('color', 'red');
                err.push('name < 5');
            } else {
                $('inp_name_new_product').css('color', 'black');
            }
//            проверяет описание товара
            if ($('#inp_description_product').val().length < 5) {
                $('#inp_description_product').css('color', 'red');
                err.push('description < 5');
            } else {
                $('inp_description_product').css('color', 'black');
            }
//            проверяет цену товара
            if ($('#inp_price_product').val().length < 1) {
                $('#inp_price_product').css('color', 'red');
                err.push('price < 5');
            } else {
                $('inp_price_product').css('color', 'black');
            }
//          проверяет массив на пустоту
            if (err.length === 0) {
//              отправляем данные формы на сервер
                var json = {buyer_seller_my_cabinet: $.cookie('buyer_seller'), login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'), service_code: '___===___',
                    name_product_my_cabinet: $('#inp_name_new_product').val(), category_product_my_cabinet: $('#sel_category_product').val(),
                    description_product_my_cabinet: $('#inp_description_product').val(), price_productt_my_cabinet: $('#inp_price_product').val()};
                ajax_Post_my_cabinet(json);
            }
        }
//        функция возвращающая товары
        function products_user(){
            var json = {buyer_seller_my_cabinet: $.cookie('buyer_seller'), login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'), service_code: '___<<<___'};
                ajax_Post_my_cabinet(json);
        }
//        функция возвращающая историю
        function history_user(){
            var json = {buyer_seller_my_cabinet: $.cookie('buyer_seller'), login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'), service_code: '___>>>___'};
                ajax_Post_my_cabinet(json);
        }

//        функция для показа товаров
        function show_products(products){
            $('#div_seller_products').empty();
            if(products.buyer_seller === 'seller'){
                $('#div_seller_products').append(
                "<table id='tab_products_seller'>" +
                    "<tr>" +
                        "<td>id</td>" +
                        "<td>ваш логин</td>" +
                        "<td>название товара</td>" +
                        "<td>категория товара</td>" +
                        "<td>описание товара</td>" +
                        "<td>цена</td>" +
                        "<td>дата</td>" +
                        "<td>изменить товар</td>" +
                    "</tr>" +
                "</table>"
                )
                $.each(products, function( key, value ){
                    if(value.id){
                        $('#tab_products_seller').append(
                        "<tr id='tr__" + key + "'>" +
                            "<td class='td__id'>" + value.id + "</td>" +
                            "<td class='td__login_seller'>" + value.login_seller + "</td>" +
                            "<td class='td__name_product'>" + value.name_product + "</td>" +
                            "<td class='td__category_product'>" + value.category_product + "</td>" +
                            "<td class='td__description_product'>" + value.description_product + "</td>" +
                            "<td class='td__price_product'>" + value.price_product + "</td>" +
                            "<td class='td__date'>" + value.date + "</td>" +
                            "<td><button id='change__" + key + "'>изменить</button><br><button id='apply__" + key + "'>применить</button></td>" +
                        "</tr>"
                        )
                    }
                });
            }
        }
//       обработчик событий динамически созданных элементов  кнопки изменить товар
        $('#div_seller_products').on("click","button",function() {
            var id_spl = $(this).attr("id").split('__');
            var price = $(this).parent().parent().find(".td__price_product");
            var desc = $(this).parent().parent().find(".td__description_product");
            if(id_spl[0] === 'change'){
                var price_product = price.text();
                var description_product = desc.text();
                price.empty();
                desc.empty();
                price.append('<input type="text" class="inp_price__product" value="' + price_product + '">');
                desc.append('<textarea class="inp_desc_product">' + description_product + '</textarea>');

            }
            if(id_spl[0] === 'apply'){
                var new_price_product = price.find(".inp_price__product").val();
                var new_description_product = desc.find(".inp_desc_product").val();
                var json = {buyer_seller_my_cabinet: $.cookie('buyer_seller'), login_my_cabinet: $.cookie('login'), pass_my_cabinet: $.cookie('password'),
                            category_product: $(this).parent().parent().find(".td__category_product").text(), name_product: $(this).parent().parent().find(".td__name_product").text(),
                            new_price_product: new_price_product, new_description_product: new_description_product, num_product: id_spl[1], service_code: '___###___'};
                ajax_Post_my_cabinet(json);

            }

        });
//        функция для показа истории
        function show_history(history){
            $('#div_seller_history').empty();
            if(history.buyer_seller === 'seller'){
                $('#div_seller_history').append(
                "<table id='tab_history_seller'>" +
                    "<tr>" +
                        "<td>id</td>" +
                        "<td>name_product</td>" +
                        "<td>category_product</td>" +
                        "<td>num_product</td>" +
                        "<td>price</td>" +
                        "<td>act</td>" +
                        "<td>act_opponent</td>" +
                        "<td>date</td>" +
                    "</tr>" +
                "</table>"
                )
                $.each(history, function( key, value ){
                    if(value.id){
                        $('#tab_history_seller').append(
                        "<tr>" +
                            "<td>" + value.id + "</td>" +
                            "<td>" + value.name_product + "</td>" +
                            "<td>" + value.category_product + "</td>" +
                            "<td>" + value.num_product + "</td>" +
                            "<td>" + value.price + "</td>" +
                            "<td>" + value.act + "</td>" +
                            "<td>" + value.act_opponent + "</td>" +
                            "<td>" + value.date + "</td>" +
                        "</tr>"
                        )
                    }
                });
            }
        }
//        функция отправляющая на сервер завпрося
        function ajax_Post_my_cabinet(json) {
            $.ajax({
                type: 'POST',
                url: '/cab/',
                data: JSON.stringify(json),
                success: function (data) {
                    console.log(data);
//                    условие если меняем продавец покупатель
                    if (data.service_code === '___+++___'){
                        $.cookie("buyer_seller", data.buyer_seller, { expires: 7, path: '/' });
                        if (data.buyer_seller === "buyer"){
                            is_buyer();
                        }
                         if (data.buyer_seller === "seller"){
                            is_seller();
                        }
                    }
//                    условие если продавец добавляет товар
                    if (data.service_code === '___===___') {
                        alert(data.jjj);
                        if(data.jjj === 'вы успешно добавили товар'){
                            $("input[type='text'], textarea").val("");
                        }
                    }
//                    условие для возврата истории
                    if (data.service_code === '___>>>___') {
                        show_history(data);
                    }
//                    условие для возврата товаров
                    if (data.service_code === '___<<<___') {
                        show_products(data);
                    }
//                    условие для изменения товара
                    if (data.service_code === '___###___') {
                        $("input[type='text'], textarea").val("");
                        $('#div_seller_products').css('display', 'block');
                        products_user();
                        alert(data.jjj);

                    }
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
    });
//    отправка формы для изменения картинки товара
        $('#upload-file-btn').click(function () {
//        переменная содержащая расширение отправляемого файла
        var type_file = $('input[name=file_1]').val().split('.').pop();
//        проверка файла на соответствие заданным форматам
        if( type_file === 'jpg' || type_file === 'png'){
            var form_data = new FormData($('#upload-file')[0]);
            form_data.append('login', $.cookie("login"));
            form_data.append('password', $.cookie("password"));
            $.ajax({
                type: 'POST',
                url: '/cab/add_photo',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    alert(data.jjj);
                },
            });
         }else{
         alert('неверный формат файла');
         }
    });
});


