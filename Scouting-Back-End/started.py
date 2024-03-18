import requests
from firebase import firebase
import json

#pushes robotInfo into every team
firebase = firebase.FirebaseApplication('https://crescendo-scouting-app-default-rtdb.firebaseio.com/', None)
firebase.put('https://crescendo-scouting-app-default-rtdb.firebaseio.com/Port-Hueneme/', 'started', 'True')
