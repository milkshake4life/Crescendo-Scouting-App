import requests
from firebase import firebase
import json

f = open("../key.txt", "r")
eventKey = open("../eventKey.txt", "w")
headers = {'X-TBA-Auth-Key': f.read()}
r = requests.get('https://www.thebluealliance.com/api/v3/event/2023cave/teams', headers=headers)
x = json.loads(r.text)
teamNumList = []
for i in range(0, len(x)):
    teamNumList.append(x[i]["team_number"])
teamNumList.sort()
for i in range(0, len(x)):
    eventKey.write(str(teamNumList[i]) + " - ")



firebase = firebase.FirebaseApplication('https://crescendo-scouting-app-default-rtdb.firebaseio.com/', None)