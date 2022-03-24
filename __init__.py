from flask import request, render_template, Flask, redirect, session, url_for
import urllib.request
import json
from os import urandom
from data.data_functions import *

reset_data()

app = Flask(__name__)
debug = True
app.secret_key = urandom(32)

def signed_in(session):
    return 'username' in session.keys() and session['username']

@app.route("/", methods=["GET","POST"])
@app.route("/index", methods=["GET","POST"])
def index():
    if session.get('username') is not None:
        user = session['username']
        return render_template("profile.html", user=user)

    else:

        return render_template("homepage.html")

@app.route("/beep", methods = ["GET","POST"])
def beep():
    return render_template("beep.html")


# @app.route("/profile", methods=["GET"])
# def profile():
#     if "username" not in session:
#         return redirect(url_for("index"))

#     username = session['username']
#     user_id = getIDbyUsername(username)

#     # GET request: display the form
#     if request.method == "GET":
#         searches = db.get_user_searches(user_id)

#         return render_template("profile.html", searches=searches)

@app.route("/register", methods=["GET", "POST"])
def register():
    if "username" in session:
        return redirect(url_for("index"))

    # GET request: display the form
    if request.method == "GET":
        return render_template("register.html")

    if request.method == "POST":

        # POST request: handle the form response and redirect
        username = request.form.get("name", default="")
        password = request.form.get("password", default="")
        password2 = request.form.get("password2", default="")

        error = None

        if password != password2:
            error = "Error: Passwords Must Match"
        
        if error:
            return render_template("register.html", error=error)
        
        if user_exists(username):
            error = "Username already in use"
    
        if error:
            return render_template("register.html", error=error)
        else:
            add_user(username, password)
            print(username)
            print(password)
            return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if "username" in session:
        return redirect(url_for("index"))

    # GET request: display the form
    if request.method == "GET":
        return render_template("login.html")

    if request.method == "POST":

        # POST request: handle the form response and redirect
        username = request.form.get("name", default="")
        password = request.form.get("password", default="")

        error = correct_password(username, password)
        
        if error:
            session['username'] = username
            return redirect(url_for("index"))
        else:
            error = "Incorrect Password"
            return render_template('login.html', error=error)

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    if "username" in session:
        del session["username"]
    return redirect(url_for("index"))

@app.route("/submissions")
def test():
    return render_template("submissions.html")

@app.route("/load")
def loadImages():
    return render_template("render.html")

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()

