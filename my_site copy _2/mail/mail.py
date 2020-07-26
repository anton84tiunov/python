from flask import Blueprint,render_template

Mail_1 = Blueprint('mail', __name__,
                          template_folder='templates', static_folder='static')

@Mail_1.route('/')
def mail():
    return render_template('mail/mail.html')


