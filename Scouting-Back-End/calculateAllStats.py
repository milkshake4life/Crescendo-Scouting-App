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
Teleop = {0: "Amp", 1: "Ground Intake", 2: "Source Intake", 3: "Speaker"}




isInitial = True  # Global variable declaration

def listener(event):
    global isInitial  # Declare isInitial as global within the function
    if not isInitial:    
        tempPath = event.path
        if not ("Stats" in tempPath):
            print("there was a change")
            matchInfoIndex = tempPath.index("Match-Info") + 11
            realPath = tempPath[0: matchInfoIndex] # this is the path to the qual Match, where there was a change in the database
            calculatePreGameStats(realPath)
            calculateTeleopStats(realPath)
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
    if totalCount == 0:
        percentage = [0, 0, 0]
    else:
        percentage = [int((startingPositionCounts[0] / totalCount)*100), int((startingPositionCounts[1] / totalCount) *100), int((startingPositionCounts[2] / totalCount)*100)]


    #Push to database
    statsPath = methodPath[:int(methodPath.index("Match-Info"))]
    for i in range(len(startingPositionCounts)):
        firebase.put(statsPath + 'Stats/Pregame/', StartingPosition[i + 1], data=percentage[i])


# def calculateAutoStats(path):
    
def calculateTeleopStats(path):
    methodPath = '/ISR/teams' + path
    result = firebase.get(methodPath, '')
    totalAmpCount = 0
    totalIntakeCount = 0
    totalSpeakerCount = 0
    
    counts = [0, 0, 0, 0] # index 0 is amp, index 1 is ground, index 2 is source, index 3 is speaker
    for i in result.keys():
        specificPath = methodPath + i
        specificResult = firebase.get(specificPath, '')
        for j in specificResult.keys():
            if(j == "Teleop"):
                teleopResult = firebase.get(specificPath + '/' + j, '')
                for i in teleopResult.keys():
                    # print(i)
                    teleop_result = teleopResult[i]
                    if i == "Amp":
                        made_value = teleop_result.get('Made')
                        miss_value = teleop_result.get('Miss')
                        counts[0] += made_value
                        totalAmpCount += made_value + miss_value
                    elif i == "Intake":
                        ground_value = teleop_result.get('Ground')
                        source_value = teleop_result.get('Source')
                        counts[1] += ground_value
                        counts[2] += source_value
                        totalIntakeCount += ground_value + source_value
                    elif i == "Speaker":
                        made_value = teleop_result.get('Made')
                        miss_value = teleop_result.get('Miss')
                        counts[3] += made_value
                        totalSpeakerCount += made_value + miss_value
        
    #calculates the stats
    if(totalAmpCount == 0):
        ampPercentage = 0
    else:
        ampPercentage = int(counts[0]/ totalAmpCount*100 )
    if(totalIntakeCount == 0):
        groundPercentage = 0
        sourcePercentage = 0
    else:
        groundPercentage = int(counts[1]/ totalIntakeCount*100 )
        sourcePercentage = int(counts[2]/ totalIntakeCount*100 )
    if(totalSpeakerCount == 0):
        speakerPercentage = 0
    else:
        speakerPercentage = int(counts[3]/ totalSpeakerCount*100 )
    percentage = [ampPercentage, groundPercentage, sourcePercentage, speakerPercentage]

    #push to database
    statsPath = methodPath[:int(methodPath.index("Match-Info"))]
    for i in range(len(percentage)):
        firebase.put(statsPath + 'Stats/Teleop/', Teleop[i], data=percentage[i])
                    

# def calculateEndGameStats(path):

# def calculatePostGameStats(path):





ref.listen(listener)
