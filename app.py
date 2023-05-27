from flask import Flask, render_template, jsonify, request

import json
import random
import os

app = Flask(__name__)
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

def get_random_word(length):
    f = open(os.path.join(__location__, 'words/possibilitys.json'))
    list = json.load(f)
    word = list[random.randint(0,len(list))]
    print(word)
    return word

def check_word(word):
    f = open(os.path.join(__location__, 'words/possibilitys.json'))
    list = json.load(f)
    if word in list:
        return 200
    else:
        return 404

@app.route('/')
def main():
    return render_template('index.html')
@app.route('/play')
def play():
    return render_template('play.html')
@app.route('/win')
def win():
    return render_template('win.html')
@app.route('/loose')
def loose():
    return render_template('loose.html')

@app.route('/api')
def api():
    return "Hangman Api, Ver 1.0"


@app.route('/api/word',methods = ['POST'])
def word():
    word = str.upper(get_random_word(5))
    print(word)
    return jsonify(word)

@app.route('/api/check', methods = ["POST"])
def check():
    data = request.data
    result = check_word(json.loads(data))
    return "Hey", result

@app.route('/config')
def config():
    return render_template("config.html")

app.run(debug=True,host='0.0.0.0',port=int(os.environ.get("PORT", 8080)))
