from flask import Flask,Blueprint,render_template,request,json,jsonify
import models
import hashlib

Authorization = Blueprint('authorization', __name__,
                          template_folder='templates', static_folder='static')

@Authorization.route('/', methods=['POST', 'GET'])
def authorization():
    if request.method == 'POST':
        rj = request.json
        login_aut = rj['login_aut']
        pass_aut = rj['pass_aut']
        users = models.result_set('Users')
        for i in users:
            print(i['login'],login_aut)
            if i['login'] == login_aut:
                hash_pass_bd = i['passw'][26:]
                hash_pass_form = hashlib.pbkdf2_hmac('sha256', pass_aut.encode('utf-8'), i['passw'][:26], 73852)
                if hash_pass_bd == hash_pass_form:
                    return jsonify({'jjj': 'вы авторизовались', 'login': login_aut, 'passw': str(hash_pass_bd), 'buyer_seller': i['buyer_seller']})
                else:
                    return jsonify({'jjj': 'неверный пароль'})
            # else:
            #     return jsonify({'jjj': 'данный логин не зарегистрированн'})
    if request.method == 'GET':
        return render_template('authorization/authorization.html')


