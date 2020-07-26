//начало кода
$(function () {
//запускается после загрузки страницы
    $(document).ready(function () {
        var locat = location.toString().replace('http://127.0.0.1:5000/cat/', '');
        var loc = locat.substring(0, locat.length - 1);
        var category_page = 'category_' + loc;
        var json = {buyer_seller_my_cabinet: $.cookie('buyer_seller'), login_my_cabinet: $.cookie('login'),
                    pass_my_cabinet: $.cookie('password'), service_code: '___***___', category_page: category_page};
        ajax_Post_category_base(json);

//      функция для показа карточек товара
        function show_category_cards(cards){
            $.each(cards, function (key, value) {
                if (value.id) {
                    $('#div_cards').append(
                        "<div id='card_product'>" +
//                            "<div>" + value.id + "</div>" +
                            "<div>" + value.name_product + "</div>" +
//                            "<div>" + value.login_seller + "</div>" +
//                            "<div>" + value.category_product + "</div>" +
                            "<div>" + value.price_product + "</div>" +
//                            "<div>" + value.description_product + "</div>" +
//                            "<div>" + value.date + "</div>" +
                        "</div>"
                    )
                }
            });
        }



//      функция отправляющая на сервер завпрося
        function ajax_Post_category_base(json) {
            $.ajax({
                type: 'POST',
                url: '/cat/',
                data: JSON.stringify(json),
                success: function (data) {
//                  условие если запрвшиваем товары по категории
                    if (data.service_code === '___***___') {
                       show_category_cards(data);
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
});
