#!/usr/bin/env python3
"""Determine best match"""
from flask import Flask, request, render_template
from flask_babel import Babel


class Config(object):
    """configuration class for flask app"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Determine best match with supported languages"""
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index():
    """View function"""
    return render_template('2-index.html')
