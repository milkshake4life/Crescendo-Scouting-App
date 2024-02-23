import requests
from firebase import firebase
import json

#pushes all qual matches to teams
firebase = firebase.FirebaseApplication('https://crescendo-scouting-app-default-rtdb.firebaseio.com/', None)
f = open("../TBAkey.txt", "r")
headers = {'X-TBA-Auth-Key': f.read()}

eventKey = "2023isde1" #ONLY CHANGE THIS VARIABLE

r = requests.get('https://www.thebluealliance.com/api/v3/event/' + eventKey + '/matches/simple', headers=headers)
x = json.loads(r.text)

blueTeams = []
matchNum = []
redTeams = []

for i in range(0, len(x)):
    if x[i]['comp_level'] == "qm":     
        blueTeams.append(x[i]['alliances']['blue']['team_keys'])
        redTeams.append(x[i]['alliances']['red']['team_keys'])
        matchNum.append(str(x[i]["match_number"]))

for i in range(0, len(blueTeams)):
    for j in range(0, 3):
        firebase.put('https://crescendo-scouting-app-default-rtdb.firebaseio.com/ISR/teams/' + str(blueTeams[i][j].replace("frc", "")) + '/Match-Info/' + matchNum[i], 'None', 'None')
        firebase.put('https://crescendo-scouting-app-default-rtdb.firebaseio.com/ISR/teams/' + str(redTeams[i][j].replace("frc", "")) + '/Match-Info/' + matchNum[i], 'None', 'None')





