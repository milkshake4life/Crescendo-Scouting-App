import firebase_admin
from firebase_admin import credentials, db
from firebase import firebase
firebase = firebase.FirebaseApplication('https://crescendo-scouting-app-default-rtdb.firebaseio.com/', None)

# Initialize the app with a service account, granting admin privileges
cred = credentials.Certificate('../FIREBASEkey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://crescendo-scouting-app-default-rtdb.firebaseio.com/'
})

# Reference to the database
ref = db.reference('/ISR/teams')

#Dictionaries
StartingPosition = {1: "Amp", 2: "Middle", 3: "Source"}




isInitial = True  # Global variable declaration

def listener(event):
    global isInitial  # Declare isInitial as global within the function
    if not isInitial:    
        tempPath = event.path
        if not ("Stats" in tempPath):
            print("hi")
            matchInfoIndex = tempPath.index("Match-Info") + 11
            realPath = tempPath[0: matchInfoIndex] # this is the path to the qual Match, where there was a change in the database
            calculatePreGameStats(realPath)
    else:
        isInitial = False  # Modify the global variable only after the first invocation

def calculatePreGameStats(path):
    methodPath = '/ISR/teams' + path
    result = firebase.get(methodPath, '')
    totalCount = 0

    #this loop counts all the data in the fir
    startingPositionCounts = [0, 0, 0]
    for i in result.keys():
        specificPath = methodPath + i
        specificResult = firebase.get(specificPath, '')
        for j in specificResult.keys():
            if(j == "Starting-Position"):
                totalCount = totalCount + 1
                starting_position_value = specificResult[j]
                startingPositionCounts[starting_position_value - 1] = startingPositionCounts[starting_position_value - 1] + 1
    
    #Now we calculate the statisitic
    percentage = [(startingPositionCounts[0] / totalCount)*100, (startingPositionCounts[1] / totalCount) *100, (startingPositionCounts[2] / totalCount)*100]


    #Push to database
    statsPath = methodPath[:int(methodPath.index("Match-Info"))]
    for i in range(len(startingPositionCounts)):
        firebase.put(statsPath + 'Stats/Pregame/', StartingPosition[i + 1], data=percentage[i])


# def calculateAutoStats(path):
    
# def calculateTeleopStats(path):

# def calculateEndGameStats(path):

# def calculatePostGameStats(path):





ref.listen(listener)
