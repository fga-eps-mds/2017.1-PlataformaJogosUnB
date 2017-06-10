import os
import os.path

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ["sk"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["10.10.10.10", "127.0.0.1", "localhost"]


# E-mail protocol, host and backend configuration for reseting
# superuser passwords.

EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'funbox.pjunb@gmail.com'
EMAIL_HOST_PASSWORD = os.environ["pjunbsmtp"]
DEFAULT_FROM_EMAIL = 'funbox.pjunb@gmail.com'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'


# Application definition

DEFAULT_APPS = [
    'suit',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'django_extensions',
    'webpack_loader',
]

LOCAL_APPS = [
    'core',
    'game',
    'information',
    'media',
]
SITE_ID = 1
SUIT_CONFIG = {
    'ADMIN_NAME': "UnB Games",
}

INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + LOCAL_APPS

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        # 'rest_framework.renderers.TemplateHTMLRenderer',
        # 'rest_framework.renderers.BrowsableAPIRenderer',
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    )
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEST_RUNNER = 'core.tests.pytest_runner.PytestRunner'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'core/templates'),
                 os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'development.sqlite3'),
        # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # 'NAME': 'funbox',
        # 'USER': 'pjunb',
        # 'PASSWORD': os.environ["pjunbdb"],
        # 'HOST': 'localhost',
        # 'PORT': '',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../frontend/public'),
    os.path.join(BASE_DIR, 'public/logo/'),
)
STATIC_ROOT = os.path.join(
    os.path.dirname(__file__),
    '../public/assets',
)

# Media Files

MEDIA_URL = '/public/'

MEDIA_ROOT = os.path.join(
    os.path.dirname(__file__),
    '../public',
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, '../frontend/webpack-stats.json'),
    }
}

# Dev settings, shell plus
SHELL_PLUS_PRE_IMPORTS = [
    ("game.factory", ("GameFactory", "PackageFactory",
                      "PlatformFactory")),
    ("information.factory", ("AwardFactory", "InformationFactory",
                             "DeveloperFactory", "GenreFactory")),
    ("media.factory", ("ImageFactory", "VideoFactory", "SoundtrackFactory")),
    ("core.factory", ("UserFactory")),
    ("game.serializers", ("GameSerializer", "PackageSerializer",
                          "PlatformSerializer")),
    ("information.serializers", ("AwardSerializer", "InformationSerializer",
                                 "DeveloperSerializer", "GenreSerializer")),
    ("media.serializers", ("ImageSerializer", "SoundtrackSerializer",
                           "VideoSerializer")),
]
