from flask import Flask, render_template, url_for, request, redirect, json,jsonify
import sys
import os
import dependency_injector.containers as di_cnt
import dependency_injector.providers as di_prv
from flask_mail import Mail, Message

from registration.registration import Registration
from authorization.authorization import Authorization
from contacts.contacts import Contacts
from mail.mail import Mail_1
from my_cabinet.my_cabinet import My_cabinet
from category.category import Category
from config import *

app = Flask(__name__)
app.config.from_object(Config_app)
app.config.from_object(Config_mail)
mail = Mail(app)


app.register_blueprint(Registration, url_prefix='/reg')
app.register_blueprint(Authorization, url_prefix='/aut')
app.register_blueprint(Contacts, url_prefix='/con')
app.register_blueprint(Mail_1, url_prefix='/mail')
app.register_blueprint(My_cabinet, url_prefix='/cab')
app.register_blueprint(Category, url_prefix='/cat')


# обработка данных на странице home.html
@app.route('/', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        return 'home post'
    if request.method == 'GET':
        return render_template('home.html')


if __name__ == "__main__":
    app.run(debug=True)





