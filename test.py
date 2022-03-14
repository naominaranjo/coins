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

# for x in get_userIDs():
#     print(x)
#     print(userID_exists(x))
#     print(getUsernameByID(x))


add_book("aaaaaa","[aaaa]","111")
add_book("aaaadasdwad", "[aadsdsaaa]", "1131")
add_book("avvvvvs", "[aasvsvsaaa]", "11121")

print(getIDbyUsername("bobb"))
print(correct_password("bobb","aaa"))
print(correct_password("bobb","aaaaa"))

# for x in getBookIDs():
#     print(x)
#     print(bookID_exists(x))
#     print(getBookNameByID(x))
#     print(getBook(x))
#     print(correct_password)

