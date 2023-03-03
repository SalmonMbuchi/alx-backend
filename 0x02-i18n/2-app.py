#!/usr/bin/env python3
"""Basic Babel setup"""
from flask import Flask, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """configuration class for flask app"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """Determine best match with supported languages"""
    return request.accept_languages.best_match(Config.LANGUAGES)
