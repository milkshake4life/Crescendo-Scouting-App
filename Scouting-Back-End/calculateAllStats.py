import firebase_admin
from firebase_admin import credentials, db

# Initialize the app with a service account, granting admin privileges
cred = credentials.Certificate('../FIREBASEkey.json')  # Change this back to ../FIREBASEkey.json
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://crescendo-scouting-app-default-rtdb.firebaseio.com/'
})

# Reference to the database
ref = db.reference('')
#Dictionaries
StartingPosition = {1: "Amp", 2: "Middle", 3: "Source"}
Teleop = {1: "Amp", 2: "Ground Intake", 3: "Source Intake", 4: "Speaker"}
Climb = {1: "Nothing", 2: "Park", 3: "Single Climb", 4: "Double Climb", 5: "Triple Climb"}
Trap = {0: "0 Trap", 1: "1 Trap", 2: "2 Trap", 3: "3 Trap"}

isInitial = True  # Global variable declaration

def listener(event):
    global isInitial  # Declare isInitial as global within the function
    if not isInitial:
        tempPath = event.path
        print("Event details:")
        print(f"Event path: {tempPath}")
        print(f"Event data: {event.data}")
        if (not ("Stats" in tempPath)) and (not ("Robot-Info" in tempPath)):
            print("there was a change")
            print(tempPath)
            if("Match-Info" in tempPath):
                matchInfoIndex = tempPath.index("Match-Info") + 11
                realPath = tempPath[0: matchInfoIndex]  # this is the path to the qual Match, where there was a change in the database
                calculateEverything(realPath)
    else:
        isInitial = False  # Modify the global variable only after the first invocation

def calculateEverything(path):
    result = db.reference(path).get()

    #Pre Game variables
    totalPregameCount = 0
    startingPositionCounts = [0, 0, 0]

    #Auto variables
    taxiCount = 0
    autoCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}

    totalTaxiCount = 0
    totalAutoCounts = 0

    #Teleop variables

    totalTeleopAmpCount = 0
    totalTeleopIntakeCount = 0
    totalTeleopSpeakerCount = 0
    teleopCounts = [0, 0, 0, 0]# index 0 is amp, index 1 is ground, index 2 is source, index 3 is speaker

    #Endgame variables
    endgameCounts = [0, 0, 0, 0, 0]
    endgameTrapCounts = [0, 0, 0, 0]
    endgameTotalCounts = 0

    #Postgame variables
    postgameSumDrivingRating = 0
    postgameTotalDrivingRating = 0

    postgameDisabledCount = 0
    postgameDefenseCount = 0
    postgameTotalMatches = 0


    #getting data
    for i in result.keys():
        specificPath = path + i
        specificResult = db.reference(specificPath).get()

        for j in specificResult.keys():
            if j == "Starting-Position":
                totalPregameCount += 1
                starting_position_value = specificResult[j]
                startingPositionCounts[starting_position_value - 1] += 1
            elif j == "Auto":
                autoResult = db.reference(specificPath + '/' + j).get()
                for k, auto_result in autoResult.items():
                    if k == "Taxi":
                        taxiValue = auto_result
                        if taxiValue == 1:
                            taxiCount += 1
                    else:
                        actionValue = auto_result.get("Action")
                        if actionValue == 1:  # Made
                            autoCounts[k] += 1
                totalAutoCounts += 1
            elif j == "Teleop":
                teleopResult = db.reference(specificPath + '/' + j).get()
                for k, teleop_result in teleopResult.items():
                    if k == "Amp":
                        made_value = teleop_result.get('Made')
                        miss_value = teleop_result.get('Miss')
                        teleopCounts[0] += made_value
                        totalTeleopAmpCount += made_value + miss_value
                    elif k == "Intake":
                        ground_value = teleop_result.get('Ground')
                        source_value = teleop_result.get('Source')
                        teleopCounts[1] += ground_value
                        teleopCounts[2] += source_value
                        totalTeleopIntakeCount += ground_value + source_value
                    elif k == "Speaker":
                        made_value = teleop_result.get('Made')
                        miss_value = teleop_result.get('Miss')
                        teleopCounts[3] += made_value
                        totalTeleopSpeakerCount += made_value + miss_value
            elif j == "Endgame":
                endgameResult = db.reference(specificPath + '/' + j).get()
                for key, value in endgameResult.items():
                    if key == "Climb":
                        endgameCounts[value - 1] += 1
                    elif key == "Trap":
                        endgameTrapCounts[value] += 1
                endgameTotalCounts += 1
            elif j == "Driving Rating":
                drivingRatingResult = db.reference(specificPath + '/' + j).get()
                postgameSumDrivingRating += drivingRatingResult
                postgameTotalDrivingRating += 1
            elif j == "Defense":
                defenseResult = db.reference(specificPath + '/' + j).get()
                if(defenseResult == 1):
                    postgameDefenseCount += 1
                postgameTotalMatches += 1
            elif j == "Disabled":
                disabledResult = db.reference(specificPath + '/' + j).get()
                if(disabledResult == 1):
                    postgameDisabledCount += 1




    
    #Calculating the statisitic
    #Pregame

    if totalPregameCount == 0:
        pregamePercentage = [0, 0, 0]
    else:
        pregamePercentage = [int((startingPositionCounts[0] / totalPregameCount)*100), int((startingPositionCounts[1] / totalPregameCount) *100), int((startingPositionCounts[2] / totalPregameCount)*100)]

    #Auto
    autoPercentages = {key: int(autoCounts[key] / totalAutoCounts * 100) if totalAutoCounts != 0 else 0 for key in autoCounts}
    autoTaxiPercentages = int(taxiCount / totalAutoCounts * 100) if totalAutoCounts != 0 else 0

    #Teleop
    if(totalTeleopAmpCount == 0):
        teleopAmpPercentage = 0
    else:
        teleopAmpPercentage = int(teleopCounts[0]/ totalTeleopAmpCount*100 )
    if(totalTeleopIntakeCount == 0):
        teleopGroundPercentage = 0
        teleopSourcePercentage = 0
    else:
        teleopGroundPercentage = int(teleopCounts[1]/ totalTeleopIntakeCount*100 )
        teleopSourcePercentage = int(teleopCounts[2]/ totalTeleopIntakeCount*100 )
    if(totalTeleopSpeakerCount == 0):
        teleopSpeakerPercentage = 0
    else:
        teleopSpeakerPercentage = int(teleopCounts[3]/ totalTeleopSpeakerCount*100 )
    teleopPercentage = [teleopAmpPercentage, teleopGroundPercentage, teleopSourcePercentage, teleopSpeakerPercentage]

    #Endgame

    if endgameTotalCounts == 0:
        endgamePercentage = [0, 0, 0, 0, 0]
        endgameTrapPercentage = [0, 0, 0, 0]
    else:
        endgamePercentage = [
            round(endgameCounts[0] / endgameTotalCounts * 100),
            round(endgameCounts[1] / endgameTotalCounts * 100),
            round(endgameCounts[2] / endgameTotalCounts * 100),
            round(endgameCounts[3] / endgameTotalCounts * 100),
            round(endgameCounts[4] / endgameTotalCounts * 100)
        ]
        endgameTrapPercentage = [
            round(endgameTrapCounts[0] / endgameTotalCounts * 100),
            round(endgameTrapCounts[1] / endgameTotalCounts * 100),
            round(endgameTrapCounts[2] / endgameTotalCounts * 100),
            round(endgameTrapCounts[3] / endgameTotalCounts * 100)
        ]
    
    #postgame
    if postgameTotalDrivingRating == 0:
        postgameAverageRating = 0
    else:
        postgameAverageRating = round(postgameSumDrivingRating / postgameTotalDrivingRating)
    if postgameTotalMatches == 0:
        postgameDefensePercent = 0
        postgameDisabledPercent = 0
    else:
        postgameDefensePercent = postgameDefenseCount / postgameTotalMatches * 100
        postgameDisabledPercent = postgameDisabledCount / postgameTotalMatches * 100



    #Pushing the data
    #Pregame
    statsPath = path[:int(path.index("Match-Info"))]

    # Pregame
    for i in range(len(startingPositionCounts)):
        db.reference(statsPath + 'Stats/Percentage/Pregame/' + StartingPosition[i + 1]).set(pregamePercentage[i])
        db.reference(statsPath + 'Stats/Fraction/Pregame/' + StartingPosition[i + 1]).set(startingPositionCounts[i])

    db.reference(statsPath + 'Stats/Fraction/Pregame/Total').set(totalPregameCount)

    # Auto
    db.reference(statsPath + 'Stats/Percentage/Auto').update({'Taxi': autoTaxiPercentages})
    db.reference(statsPath + 'Stats/Fraction/Auto').update({'Taxi': taxiCount})
    db.reference(statsPath + 'Stats/Fraction/Auto').update({'Total': totalAutoCounts})
    for key, value in autoPercentages.items():
        db.reference(statsPath + f'Stats/Percentage/Auto/{key}').set(value)
    for key, value in autoCounts.items():
        db.reference(statsPath + f'Stats/Fraction/Auto/{key}').set(value)

    # Teleop
    for i in range(len(teleopPercentage)):
        db.reference(statsPath + 'Stats/Percentage/Teleop/' + Teleop[i + 1]).set(teleopPercentage[i])
        db.reference(statsPath + 'Stats/Fraction/Teleop/' + Teleop[i + 1]).set(teleopCounts[i])
    db.reference(statsPath + 'Stats/Fraction/Teleop/Amp Total').set(totalTeleopAmpCount)
    db.reference(statsPath + 'Stats/Fraction/Teleop/Speaker Total').set(totalTeleopSpeakerCount)
    db.reference(statsPath + 'Stats/Fraction/Teleop/Intake Total').set(totalTeleopIntakeCount)

    # Endgame
    for i in range(len(endgamePercentage)):
        db.reference(statsPath + 'Stats/Percentage/Endgame/Climb/' + Climb[i + 1]).set(endgamePercentage[i])
        db.reference(statsPath + 'Stats/Fraction/Endgame/Climb/' + Climb[i + 1]).set(endgameCounts[i])
    for i in range(len(endgameTrapPercentage)):
        db.reference(statsPath + 'Stats/Percentage/Endgame/Trap/' + Trap[i]).set(endgameTrapPercentage[i])
        db.reference(statsPath + 'Stats/Fraction/Endgame/Trap/' + Trap[i]).set(endgameTrapCounts[i])
    db.reference(statsPath + 'Stats/Fraction/Endgame/Total/').set(endgameTotalCounts)

    # Post game
    db.reference(statsPath + 'Stats/Percentage/Postgame/Driving Rating').set(postgameAverageRating)
    db.reference(statsPath + 'Stats/Percentage/Postgame/Defense').set(postgameDefensePercent)
    db.reference(statsPath + 'Stats/Percentage/Postgame/Disabled').set(postgameDisabledPercent)
    db.reference(statsPath + 'Stats/Fraction/Postgame/Defense').set(postgameDefenseCount)
    db.reference(statsPath + 'Stats/Fraction/Postgame/Disabled').set(postgameDisabledCount)
    db.reference(statsPath + 'Stats/Fraction/Postgame/Total').set(postgameTotalMatches)




ref.listen(listener)
