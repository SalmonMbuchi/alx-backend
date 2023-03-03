#!/usr/bin/env python3
"""Basic Flask app"""
from flask import (Flask, render_template)


app = Flask(__name__)

@app.route('/')
def basic_setup():
    """setup a route and a template"""
    return render_template('0-index.html')

