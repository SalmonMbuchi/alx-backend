#!/usr/bin/env python3
"""Parameterize templates"""
from flask import Flask, request, render_template
from flask_babel import Babel, _


app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """configuration class for flask app"""
    LANGUAGES = ['en', 'fr']


@app.route('/')
def route():
    return render_template('3-index.html')


@babel.localeselector
def get_locale():
    """Determine best match with supported languages"""
    return request.accept_languages.best_match(Config.LANGUAGES)
