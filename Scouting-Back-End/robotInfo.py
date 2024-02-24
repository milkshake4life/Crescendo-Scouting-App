import requests
from firebase import firebase
import json

#pushes robotInfo into every team
firebase = firebase.FirebaseApplication('https://crescendo-scouting-app-default-rtdb.firebaseio.com/', None)
f = open("../TBAkey.txt", "r")
headers = {'X-TBA-Auth-Key': f.read()}

eventKey = "2023isde1" #ONLY CHANGE THIS VARIABLE

r = requests.get('https://www.thebluealliance.com/api/v3/event/' + eventKey + '/teams', headers=headers)
x = json.loads(r.text)


teamNumList = []
for i in range(0, len(x)):
    teamNumList.append(x[i]['team_number'])
teamNumList.sort()
for i in range(0, len(x)):
    firebase.put('https://crescendo-scouting-app-default-rtdb.firebaseio.com/ISR/teams/' + str(teamNumList[i]) + '/Robot-Info','None', 'None')




