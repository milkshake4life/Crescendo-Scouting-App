import firebase_admin
from firebase_admin import credentials, db

# Initialize the app with a service account, granting admin privileges
cred = credentials.Certificate('../FIREBASEkey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://crescendo-scouting-app-default-rtdb.firebaseio.com/'
})

# Reference to the database
ref = db.reference('/ISR/teams')

isInitial = True  # Global variable declaration

def listener(event):
    global isInitial  # Declare isInitial as global within the function
    if not isInitial:    
        path = event.path
        print(path)
    else:
        isInitial = False  # Modify the global variable only after the first invocation
    


ref.listen(listener)
