import requests
from firebase import firebase
import json

firebase = firebase.FirebaseApplication('https://crescendo-scouting-app-default-rtdb.firebaseio.com/', None)
f = open("../key.txt", "r")
eventKey = open("../eventKey.txt", "w")
headers = {'X-TBA-Auth-Key': f.read()}
r = requests.get('https://www.thebluealliance.com/api/v3/event/2024caoc/teams', headers=headers)
x = json.loads(r.text)
# print(x)
# eventKey.write(r.text)
teamNumList = []
for i in range(0, len(x)):
    teamNumList.append(x[i]['team_number'])
teamNumList.sort()
for i in range(0, len(x)):
    # eventKey.write(str(teamNumList[i]) + " - ")
    firebase.put('https://crescendo-scouting-app-default-rtdb.firebaseio.com/Orange-County/teams/' + str(teamNumList[i]) + '/Robot-Info','None', 'None')




