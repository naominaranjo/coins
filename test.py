from data.data_functions import *

reset_data()

add_user("bobb","aaa")
add_user("kjhkjh", "aaa")
add_user("bhhhhobb", "aaa")



#print(get_usernames())
for x in get_usernames(): 
    print(x)


print(user_exists("bobb"))
print(userID_exists("111"))


#print(get_userIDs())

for x in get_userIDs():
    print(x)
    print(userID_exists(x))
    print(getUsernameByID(x))
