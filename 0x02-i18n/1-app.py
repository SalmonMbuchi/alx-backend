#!/usr/bin/env python3
"""Basic Babel setup"""
from flask import Flask
from flask_babel import Babel
from pytz import timezone

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """configuration class for flask app"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Config()
