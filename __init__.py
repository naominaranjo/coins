from flask import Flask, render_template
import urllib.request
import json
app = Flask(__name__)


@app.route("/")
def main():
    return "aaa"

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()
