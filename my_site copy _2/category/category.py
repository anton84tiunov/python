from flask import Blueprint,render_template,request,jsonify
import models

Category = Blueprint('category', __name__,
                          template_folder='templates', static_folder='static')


@Category.route('/', methods=['POST', 'GET'])
def category():
    if request.method == 'POST':
        rj = request.json
        login_my_cabinet = rj['login_my_cabinet']
        hash_pass_form = rj['pass_my_cabinet']
        buyer_seller_my_cabinet = rj['buyer_seller_my_cabinet']
        # users = models.result_set('Users')
        # проверка авторизации
        if models.user_aut(login_my_cabinet, hash_pass_form):
            # условие если передаем товары по категории
            if rj['service_code'] == '___***___':
                products = models.result_set_where("products", "category_product = '" + rj['category_page'] + "'")
                res = {}
                for row in products:
                    res[row['id']] = row
                res['service_code'] = '___***___'
                return res
            else:
                return jsonify({'service_code': '___***___'})
    if request.method == 'GET':
        return render_template('category/category.html')








@Category.route('/sport/')
def sport():
    return render_template('category/sport.html')


@Category.route('/clothing/')
def clothing():
    return render_template('category/clothing.html')


@Category.route('/org_technique/')
def org_technique():
    return render_template('category/org_technique.html')


@Category.route('/for_home/')
def for_home():
    return render_template('category/for_home.html')


@Category.route('/entertainment/')
def entertainment():
    return render_template('category/entertainment.html')


@Category.route('/miscellaneous/')
def miscellaneous():
    return render_template('category/miscellaneous.html')



