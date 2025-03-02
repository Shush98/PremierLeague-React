from flask import Flask , jsonify,request, make_response
import numpy as np
import pandas as pd
import mysql.connector
import json
import datetime
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


def serialize_datetime(obj): 
    if isinstance(obj, datetime.datetime): 
        return obj.isoformat() 
    raise TypeError("Type not serializable")

@app.route("/standings")
def standings():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM standings_view;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data


@app.route("/fixtures")
def fixtures():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM fixture_view;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data

@app.route("/topScorerBar")
def topScorerBar():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM leaderboard LIMIT 5;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data

@app.route("/clubData")
def clubData():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("select * from upcoming_fixture_view;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data

@app.route("/playerData")
def playerData():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM player_view;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data

@app.route("/mvData")
def mvData():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM mv_view;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data

@app.route("/UserPost", methods=["GET","POST"])
def UserPost():
    # Get the data from the POST request
    data = request.get_json()
    # print(data["Name"])

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()

    try:
        args = (data["Email"],data["Name"],0)
        result = cursor.callproc('GetLogin',args)

        print(result[2])
        # cursor.execute("insert into users (username,email) values(%s,%s);",(data["Name"],data["Email"]))
    
        connection.commit()

    except mysql.connector.Error as err:
    
        print("Error----------------------------------------------------\n ",err)


    # field_names = [i[0] for i in cursor.description]
    
    connection.close()
    
    return "Success"

@app.route("/comments")
def comments():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()
    cursor.execute("SELECT c.comment_id,c.match_id,c.content,c.isActive,c.Email,u.username as name FROM comments_final c join users u on c.Email = u.email  where c.isActive = 1 order by c.comment_id desc;")

    field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
    results = cursor.fetchall()

    connection.close()

    json_data=[]
    for result in results:
        json_data.append(dict(zip(field_names,result)))
    json_data = json.dumps(json_data, default=serialize_datetime)
    
    
    return json_data


@app.route("/CommentPost", methods=["GET","POST"])
def CommentPost():
    # Get the data from the POST request
    data = request.get_json()
    # print(data["Name"])

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()

    try:
        args = (data['CommentText'],data['EmailID'],data['match_id'],0,'')

        
        result = cursor.callproc('post_comment',args)

        print(result[3],result[4])
        # cursor.execute("insert into users (username,email) values(%s,%s);",(data["Name"],data["Email"]))
    
        connection.commit()

    except mysql.connector.Error as err:
    
        print("Error----------------------------------------------------\n ",err)


    # field_names = [i[0] for i in cursor.description]
    
    connection.close()
    
    return "Success"


@app.route("/CommentDelete", methods=["GET","POST"])
def CommentDelete():
    # Get the data from the POST request
    data = request.get_json()
    # print(data["Name"])

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()

    try:
        args = (data['comment_id'],data['Email'],0,'')

        # print(args)

        result = cursor.callproc('delete_comment',args)

        print(result[2],result[3])
    
        connection.commit()

    except mysql.connector.Error as err:
    
        print("Error----------------------------------------------------\n ",err)


    # field_names = [i[0] for i in cursor.description]
    
    connection.close()
    
    return "Success"


@app.route("/CommentUpdate", methods=["GET","POST"])
def CommentUpdate():
    # Get the data from the POST request
    data = request.get_json()
    # print(data["Name"])

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    cursor = connection.cursor()

    try:
        

        # cursor.execute("delete from comments_final where comment_id = %s;",args)

        args = (data['content'],data['Email'],data['comment_id'],0,'')

        
        result = cursor.callproc('update_comment',args)

        print(result[3],result[4])
    
        connection.commit()

    except mysql.connector.Error as err:
    
        print("Error----------------------------------------------------\n ",err)


    # field_names = [i[0] for i in cursor.description]
    
    connection.close()
    
    return "Success"

@app.route("/UserDelete", methods=["GET","POST"])
def UserDelete():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    data = request.get_json()

    cursor = connection.cursor()

    args = (data['Email'],)
    try:

        cursor.execute("delete from users where email = %s",args)

        connection.commit()

    except mysql.connector.Error as err:
    
        print("Error----------------------------------------------------\n ",err)        

    connection.close()
    
    return "User Deleted"

@app.route("/PlayerRating", methods=["GET","POST"])
def PlayerRating():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    data = request.get_json()

    cursor = connection.cursor()

    args = (data['player_id'],)
    try:

        cursor.execute("select rating_func(Overall) as Rating from ratings_final where player_id = %s;",args)

        field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
        results = cursor.fetchall()

        res = str(results[0][0])

        # json_data=[]
        # for result in results:
        #     json_data.append(dict(zip(field_names,result)))
        # json_data = json.dumps(json_data, default=serialize_datetime)

        # print(json_data)

    except :
    

        # print("Error----------------------------------------------------\n ",err)  
        res = "3"      

    connection.close()
    
    return res

@app.route("/PlayerStyle", methods=["GET","POST"])
def PlayerStyle():

    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0314",
    database="ds5110database"
    )

    data = request.get_json()

    cursor = connection.cursor()

    args = (data['player_id'],)
    try:

        cursor.execute("select playingStyle_func(%s) as Playing_Style;",args)

        field_names = [i[0] for i in cursor.description]
    # Fetch the results of the query
        results = cursor.fetchall()

        res = results[0][0]
        # print(results[0][0])
        # json_data=[]
        # for result in results:
        #     print(result)
        #     json_data.append(dict(zip(field_names,result)))
        # json_data = json.dumps(json_data, default=serialize_datetime)

        # print(json_data)

    except :
    
        # print("Error----------------------------------------------------\n ",err)    
        res = "Not Available"    

    connection.close()
    
    return res





if __name__=="__main__":
    app.run(debug=True)







