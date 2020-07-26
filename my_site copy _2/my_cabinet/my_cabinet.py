from flask import Flask,Blueprint,render_template,request,json,jsonify,send_from_directory
import models
import json
import os
from PIL import Image
from io import BytesIO

My_cabinet = Blueprint('my_cabinet', __name__,template_folder='templates', static_folder='static')

@My_cabinet.route('/', methods=['POST', 'GET'])
def my_cabinet():
    if request.method == 'POST':
        rj = request.json
        login_my_cabinet = rj['login_my_cabinet']
        hash_pass_form = rj['pass_my_cabinet']
        buyer_seller_my_cabinet = rj['buyer_seller_my_cabinet']
        # users = models.result_set('Users')
        # проверка авторизации
        if models.user_aut(login_my_cabinet,hash_pass_form):
            # условие если меняем продавец покупатель
            if rj['service_code'] == '___+++___':
                if models.update_Users('Users', 'buyer_seller', buyer_seller_my_cabinet, 'login', login_my_cabinet):
                    return jsonify({'jjj': 'вы изменили свой статус', 'service_code': '___+++___', 'buyer_seller': buyer_seller_my_cabinet })
                else:
                    return jsonify({'jjj': 'ошибка бд', 'service_code': '___+++___', 'buyer_seller': buyer_seller_my_cabinet })
                # условие если продавец добавляет товар
            if rj['service_code'] == '___===___':
                if models.insert_product(rj['login_my_cabinet'], rj['name_product_my_cabinet'],
                                         rj['category_product_my_cabinet'], rj['description_product_my_cabinet'],
                                         rj['price_productt_my_cabinet']):
                    return jsonify({'jjj': 'вы успешно добавили товар', 'service_code': '___===___'})
                else:
                    return jsonify({'jjj': 'ошибка бд', 'service_code': '___===___'})
                # условие для возврата истории пользователя
            if rj['service_code'] == '___>>>___':
                user_history = models.result_set("user_" + login_my_cabinet)
                res = {}
                for row in user_history:
                    res[row['id']] = row
                res['service_code'] = '___>>>___'
                res['buyer_seller'] = buyer_seller_my_cabinet
                print(res)
                return res
            # условие для возврата данных товаров
            if rj['service_code'] == '___<<<___':
                user_history = models.result_set_where("products","login_seller = '" + login_my_cabinet + "'")
                res = {}
                for row in user_history:
                    res[row['id']] = row
                res['service_code'] = '___<<<___'
                res['buyer_seller'] = buyer_seller_my_cabinet
                print(res)
                return res
                # условие для изменения товара
            if rj['service_code'] == '___###___':
                print(rj)
                if models.update_product((rj['num_product']), login_my_cabinet, rj['name_product'], rj['category_product'],
                                         rj['new_description_product'], rj['new_price_product']):
                    return jsonify({'jjj': 'заменили', 'service_code': '___###___'})
                else:
                    return jsonify({'jjj': 'не заменили', 'service_code': '___###___'})
        else:
            return jsonify({'jjj': 'ошибка авторизации'})
        return rj
    if request.method == 'GET':
        return render_template('my_cabinet/my_cabinet.html')


@My_cabinet.route('/add_photo', methods=["GET", 'POST'])
def uploadLabel():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        num_product = request.form.get('num_product')
        # проверка авторизации
        if models.user_aut(login,password):
            # проверка принадлежности товара продавцу
            if models.seller_product(login, num_product):
                expansion_photo = ['jpg', 'png']
                file_1 = request.files.get('file_1')
                # проверка расширения файла
                if file_1.filename[file_1.filename.find(".") + 1:] in expansion_photo:
                    img = Image.open(file_1)
                    # изменение размеров картинки
                    h, w = img.size
                    scale = 400 / max(h, w)
                    im_resize = img.resize((int(h * scale), int(w * scale)), Image.ANTIALIAS)
                    if file_1.filename[file_1.filename.find(".") + 1:] == 'png':
                        im_resize.save(".\static\image\product\\" + num_product + '.png')
                    # изменение формата картинки
                    if file_1.filename[file_1.filename.find(".") + 1:] == 'jpg':
                        im_resize.save(".\static\image\product\\" + num_product + '.png', 'png')
                    return {'jjj': 'вы успешно поменяли картинку'}
                else:
                    return {'jjj': 'не поддерживаемый формат'}
            else:
                return {'jjj': 'это не ваш товар'}
        else:
            return {'jjj': 'ошибка авторизации'}

