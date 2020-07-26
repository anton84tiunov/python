from flask import Blueprint,render_template,request,jsonify
import models
import hashlib
import sys
import os
from random import choice
from string import ascii_uppercase
from flask_mail import Message

Registration = Blueprint('registration',__name__, template_folder='templates', static_folder='static')

code_out = {'123': 321}

@Registration.route('/', methods=['POST', 'GET'])
def registration():
    from app import mail
    if request.method == 'POST':
        rj = request.json
        users = models.result_set('Users')
        # словарь для записи совпадений из формы с записями в бд
        err_reg = {'email': 1, 'login': 1}
        # данные из формы
        err_email = rj['email_reg']
        err_login = rj['login_reg']
        # перебираем в цикле совпадения
        for i in users:
            if i['email'] == err_email:
                # если есть совпадения , тогда их записываем
                err_reg['email'] = 0
            if i['login'] == err_login:
                # если есть совпадения , тогда их записываем
                err_reg['login'] = 0
        # проверяем совпадения и отправляем их пользователю
        if err_reg['email'] == 0 and err_reg['login'] == 1:
            return jsonify({'jjj': 'такая почта уже используется'})
        if err_reg['email'] == 1 and err_reg['login'] == 0:
            return jsonify({'jjj': 'такой логин  уже зарегистрирован'})
        if err_reg['email'] == 0 and err_reg['login'] == 0:
            return jsonify({'jjj': 'такой логин и почта уже зарегистрированны'})
        if err_reg['email'] == 1 and err_reg['login'] == 1:
            # проверяем значение code_out на наличие
            if rj['code_reg'] == '___reg___':
                code_out['123'] = ''.join(choice(ascii_uppercase) for i in range(4))
                msg = Message("code",
                              sender="anton84tiu@gmail.com",
                              recipients=[str(rj['email_reg'])],
                              )
                msg.body = 'Ваш код =     '+code_out['123']
                msg.html = '<h1>Ваш код =     '+code_out['123']+'</h1>'
                try:
                    mail.send(msg)
                    return jsonify({'jjj': 'введите код отправленный на вашу почту'})
                except Exception:
                    e = sys.exc_info()[1]
                    print(e.args[0])
                    return jsonify({'jjj': 'ошибка отправки вы указали неверный email и/или отсутствует интернет'})
            else:
                if rj['code_reg'] == code_out['123']:
                # if True:
                    # регистрируем нового пользователя
                    # данные из формы
                    name_reg = rj['name_reg']
                    surname_reg = rj['surname_reg']
                    buyer_seller_reg = rj['buyer_seller_reg']
                    date_reg = rj['date_reg']
                    email_reg = rj['email_reg']
                    login_reg = rj['login_reg']
                    pass_reg_1 = rj['pass_reg_1']
                    # генерация соли
                    salt = os.urandom(26)
                    # генерация хэша пароля
                    key = hashlib.pbkdf2_hmac(
                        'sha256', pass_reg_1.encode('utf-8'), salt, 73852)
                    # сумирование для записи в базу данных
                    storage = salt + key
                    # записываем пользователя в базу данных
                    if models.insert_Users(name_reg, surname_reg, buyer_seller_reg, date_reg, email_reg, login_reg, storage):

                        return jsonify({'jjj': 'вы успешно зарегистрировались'})
                    else:
                        code_out['123'] = '321'
                        return jsonify({'jjj': 'при регистрации произошла ошибкаа'})
                else:
                    return jsonify({'jjj': 'вы ввели неверный код'})
    if request.method == 'GET':
        return render_template('registration/registration.html')


