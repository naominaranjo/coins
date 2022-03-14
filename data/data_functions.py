from sqlite3 import connect
from data.table import Table
from random import *
data = connect("data.db", isolation_level = None, check_same_thread=False)

users = Table(data, "users", "userID")
flip_book = Table(data,"flipbooks","bookID")


def get_userIDs():
    "retuns a list of usernames"
    return users.get_main_values()

def get_usernames():
    return users.get_field("username")
    #return users.get_value_list("username","?")

def user_exists(username):
    "returns true if user exists"
    return users.value_exists(username,"username")

def userID_exists(userID):
    return users.value_exists(userID,"userID")

def getUsernameByID(userID):
    return users.get_value(userID,"username")

def correct_password(username, password):
    "returns true if username matches password"
    real_password = users.get_value(username, "password")
    return password == real_password

def add_user(username, password):
    "adds a user with username and passsowrd"

    x = randint(0,1000)
    while(userID_exists(str(x))):
        x = randint(0, 1000)

    # while x in user_ID_list:
    #     x = randint(0, 1000)

    # user_ID_list.append(x)
    users.add_values([x, username, password])


def getBookIDs():
    return flip_book.get_main_values()

def getBookNameByID(bookID):
    return flip_book.get_value(bookID, "bookTitle")

def getBook(bookID):
    return flip_book.get_value_list(bookID,"bookTitle")

def bookID_exists(bookID):
    return flip_book.value_exists(bookID, "bookID")

def add_book(title,image_collection,userID):
    "creates a book with the parameters"
    x = randint(0,1000)

    while(bookID_exists(str(x))):
        x = randint(0, 1000)

    flip_book.add_values([title,x,image_collection,userID])

def reset_data():
    "resets the database to empty user and story tables"
    open("data.db", "w").close()
<<<<<<< HEAD
    users.create(["userID", "username", "password"])
    flip_book.create(["bookTitle","bookID","images","userID"])
=======
    users.create(["userID", "username", "password" ])
    flip_book.create(["bookID", "bookTitle", "images", "userID"])
>>>>>>> 75dc07edf3c173b1555c53d2f350f0e03483ec4d
