class Config_app(object):
    DEBUG = True

class Config_mail(object):
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_DEBUG = True
    MAIL_USERNAME = "anton84tiu@gmail.com"
    MAIL_DEFAULT_SENDER = "anton84tiu@gmail.com"
    MAIL_PASSWORD = "TESTO12345"