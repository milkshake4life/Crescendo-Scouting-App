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
        if not ("Stats" in tempPath):
            print("there was a change")
            matchInfoIndex = tempPath.index("Match-Info") + 11
            realPath = tempPath[0: matchInfoIndex] # this is the path to the qual Match, where there was a change in the database
            calculateEverything(realPath)
    else:
        isInitial = False  # Modify the global variable only after the first invocation

def calculateEverything(path):
    methodPath = '/ISR/teams' + path
    result = firebase.get(methodPath, '')

    #Pre Game variables
    totalPregameCount = 0
    startingPositionCounts = [0, 0, 0]

    #Auto variables
    taxiCount = 0
    autoAmpCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}
    autoSpeakerCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}
    autoIntakeCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0}

    totalTaxiCount = 0
    totalAutoAmpCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}
    totalAutoSpeakerCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0} 
    totalAutoIntakeCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0}

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


    #getting data
    for i in result.keys():
        specificPath = methodPath + i
        specificResult = firebase.get(specificPath, '')
        for j in specificResult.keys():
            if(j == "Starting-Position"):
                totalPregameCount = totalPregameCount + 1
                starting_position_value = specificResult[j]
                startingPositionCounts[starting_position_value - 1] = startingPositionCounts[starting_position_value - 1] + 1
            elif(j == "Auto"):
                autoResult = firebase.get(specificPath + '/' + j, '')
                for k in autoResult.keys():
                    auto_result = autoResult[k]
                    if k == "Taxi":
                        taxiValue = auto_result
                        if taxiValue == 1:
                            taxiCount = taxiCount + 1
                            totalTaxiCount = totalTaxiCount + 1
                        else:
                            totalTaxiCount = totalTaxiCount + 1
                    else:
                        auto_result = autoResult[k]
                        actionValue = auto_result.get("Action")
                        intakeValue = auto_result.get("Intake")
                        if actionValue == 1: # Amp made
                            autoAmpCounts[k] = autoAmpCounts[k] + 1
                            totalAutoAmpCounts[k] = totalAutoAmpCounts[k] + 1
                        elif actionValue == 2: # Amp missed
                            totalAutoAmpCounts[k] = totalAutoAmpCounts[k] + 1
                        elif actionValue == 3: # Speaker made
                            autoSpeakerCounts[k] = autoSpeakerCounts[k] + 1
                            totalAutoSpeakerCounts[k] = totalAutoSpeakerCounts[k] + 1
                        elif actionValue == 4: # Speaker missed
                            totalAutoSpeakerCounts[k] = totalAutoSpeakerCounts[k] + 1

                        if intakeValue == 1: # Intake Missed
                            totalAutoIntakeCounts[k] = totalAutoIntakeCounts[k] + 1
                        elif intakeValue == 2: # Intake succesful
                            autoIntakeCounts[k] = autoIntakeCounts[k] + 1
                            totalAutoIntakeCounts[k] = totalAutoIntakeCounts[k] + 1
            elif(j == "Teleop"):
                teleopResult = firebase.get(specificPath + '/' + j, '')
                for k in teleopResult.keys():
                    # print(i)
                    teleop_result = teleopResult[k]
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
                endgameResult = firebase.get(specificPath + '/' + j, '')
                for key, value in endgameResult.items():
                    if key == "Climb":
                        endgameCounts[value - 1] = endgameCounts[value - 1] + 1
                    elif key == "Trap":
                        endgameTrapCounts[value] = endgameTrapCounts[value] + 1
                endgameTotalCounts = endgameTotalCounts + 1
            elif j == "Driving Rating":
                drivingRatingResult = firebase.get(specificPath + '/' + j, '')
                postgameSumDrivingRating = postgameSumDrivingRating + drivingRatingResult
                postgameTotalDrivingRating = postgameTotalDrivingRating + 1



    
    #Calculating the statisitic
    #Pregame

    if totalPregameCount == 0:
        pregamePercentage = [0, 0, 0]
    else:
        pregamePercentage = [int((startingPositionCounts[0] / totalPregameCount)*100), int((startingPositionCounts[1] / totalPregameCount) *100), int((startingPositionCounts[2] / totalPregameCount)*100)]

    #Auto
    autoAmpPercentages = {key: int(autoAmpCounts[key] / totalAutoAmpCounts[key] * 100) if totalAutoAmpCounts[key] != 0 else 0 for key in autoAmpCounts}
    autoSpeakerPercentages = {key: int(autoSpeakerCounts[key] / totalAutoSpeakerCounts[key] * 100) if totalAutoSpeakerCounts[key] != 0 else 0 for key in autoSpeakerCounts}
    autoIntakePercentages = {key: int(autoIntakeCounts[key] / totalAutoIntakeCounts[key] * 100) if totalAutoIntakeCounts[key] != 0 else 0 for key in autoIntakeCounts}
    autoTaxiPercentages = int(taxiCount / totalTaxiCount * 100) if totalTaxiCount != 0 else 0

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

    #Pushing the data
    #Pregame
    statsPath = methodPath[:int(methodPath.index("Match-Info"))]
    for i in range(len(startingPositionCounts)):
        firebase.put(statsPath + 'Stats/Pregame/', StartingPosition[i + 1], data=pregamePercentage[i])
    #Auto
    firebase.put(statsPath + 'Stats/Auto', 'Taxi', autoTaxiPercentages)
    for key, value in autoAmpPercentages.items():
        firebase.put(statsPath + 'Stats/Auto/Amp', key, data=value)
    for key, value in autoSpeakerPercentages.items():
        firebase.put(statsPath + 'Stats/Auto/Speaker', key, data=value)
    for key, value in autoIntakePercentages.items():
        firebase.put(statsPath + 'Stats/Auto/Intake', key, data=value)
    #Teleop
    for i in range(len(teleopPercentage)):
        firebase.put(statsPath + 'Stats/Teleop/', Teleop[i + 1], data=teleopPercentage[i])
    #Endgame
    for i in range(len(endgamePercentage)):
        firebase.put(statsPath + 'Stats/Endgame/Climb', Climb[i + 1], data=endgamePercentage[i])
    for i in range(len(endgameTrapPercentage)):
        firebase.put(statsPath + 'Stats/Endgame/Trap', Trap[i], data=endgameTrapPercentage[i])
    #Post game
    firebase.put(statsPath + 'Stats/Postgame/', "Driving Rating", postgameAverageRating)

# def calculatePreGameStats(path): # done
#     methodPath = '/ISR/teams' + path
#     result = firebase.get(methodPath, '')
#     totalCount = 0

#     #this loop counts all the data in the fir
#     startingPositionCounts = [0, 0, 0]
#     for i in result.keys():
#         specificPath = methodPath + i
#         specificResult = firebase.get(specificPath, '')
#         for j in specificResult.keys():
#             if(j == "Starting-Position"):
#                 totalCount = totalCount + 1
#                 starting_position_value = specificResult[j]
#                 startingPositionCounts[starting_position_value - 1] = startingPositionCounts[starting_position_value - 1] + 1
    
#     #Now we calculate the statisitic
#     if totalCount == 0:
#         percentage = [0, 0, 0]
#     else:
#         percentage = [int((startingPositionCounts[0] / totalCount)*100), int((startingPositionCounts[1] / totalCount) *100), int((startingPositionCounts[2] / totalCount)*100)]


#     #Push to database
#     statsPath = methodPath[:int(methodPath.index("Match-Info"))]
#     for i in range(len(startingPositionCounts)):
#         firebase.put(statsPath + 'Stats/Pregame/', StartingPosition[i + 1], data=percentage[i])


# def calculateAutoStats(path): # done
#     methodPath = '/ISR/teams' + path
#     result = firebase.get(methodPath, '')
#     taxiCount = 0
#     actionAmpCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}
#     actionSpeakerCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}
#     intakeCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0}

#     totalTaxiCount = 0
#     totalActionAmpCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0}
#     totalActionSpeakerCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0, "R": 0} 
#     totalIntakeCounts = {"M1": 0, "M2": 0, "M3": 0, "M4": 0, "M5": 0, "S1": 0, "S2": 0, "S3": 0}

#     for i in result.keys():
#         specificPath = methodPath + i
#         specificResult = firebase.get(specificPath, '')
#         for j in specificResult.keys():
#             if(j == "Auto"):
#                 autoResult = firebase.get(specificPath + '/' + j, '')
#                 for k in autoResult.keys():
#                     auto_result = autoResult[k]
#                     if k == "Taxi":
#                         taxiValue = auto_result
#                         if taxiValue == 1:
#                             taxiCount = taxiCount + 1
#                             totalTaxiCount = totalTaxiCount + 1
#                         else:
#                             totalTaxiCount = totalTaxiCount + 1
#                     else:
#                         auto_result = autoResult[k]
#                         actionValue = auto_result.get("Action")
#                         intakeValue = auto_result.get("Intake")
#                         if actionValue == 1: # Amp made
#                             actionAmpCounts[k] = actionAmpCounts[k] + 1
#                             totalActionAmpCounts[k] = totalActionAmpCounts[k] + 1
#                         elif actionValue == 2: # Amp missed
#                             totalActionAmpCounts[k] = totalActionAmpCounts[k] + 1
#                         elif actionValue == 3: # Speaker made
#                             actionSpeakerCounts[k] = actionSpeakerCounts[k] + 1
#                             totalActionSpeakerCounts[k] = totalActionSpeakerCounts[k] + 1
#                         elif actionValue == 4: # Speaker missed
#                             totalActionSpeakerCounts[k] = totalActionSpeakerCounts[k] + 1

#                         if intakeValue == 1: # Intake Missed
#                             totalIntakeCounts[k] = totalIntakeCounts[k] + 1
#                         elif intakeValue == 2: # Intake succesful
#                             intakeCounts[k] = intakeCounts[k] + 1
#                             totalIntakeCounts[k] = totalIntakeCounts[k] + 1
    
#     #calculate statistics
#     ampPercentages = {key: int(actionAmpCounts[key] / totalActionAmpCounts[key] * 100) if totalActionAmpCounts[key] != 0 else 0 for key in actionAmpCounts}
#     speakerPercentages = {key: int(actionSpeakerCounts[key] / totalActionSpeakerCounts[key] * 100) if totalActionSpeakerCounts[key] != 0 else 0 for key in actionSpeakerCounts}
#     intakePercentages = {key: int(intakeCounts[key] / totalIntakeCounts[key] * 100) if totalIntakeCounts[key] != 0 else 0 for key in intakeCounts}
#     taxiPercentages = int(taxiCount / totalTaxiCount * 100) if totalTaxiCount != 0 else 0

#     # Push to database
#     statsPath = methodPath[:int(methodPath.index("Match-Info"))]
#     firebase.put(statsPath + 'Stats/Auto', 'Taxi', taxiPercentages)
#     for key, value in ampPercentages.items():
#         firebase.put(statsPath + 'Stats/Auto/Amp', key, data=value)
#     for key, value in speakerPercentages.items():
#         firebase.put(statsPath + 'Stats/Auto/Speaker', key, data=value)
#     for key, value in intakePercentages.items():
#         firebase.put(statsPath + 'Stats/Auto/Intake', key, data=value)
    

    
# def calculateTeleopStats(path): # done
#     methodPath = '/ISR/teams' + path
#     result = firebase.get(methodPath, '')
#     totalAmpCount = 0
#     totalIntakeCount = 0
#     totalSpeakerCount = 0
    
#     counts = [0, 0, 0, 0] # index 0 is amp, index 1 is ground, index 2 is source, index 3 is speaker
#     for i in result.keys():
#         specificPath = methodPath + i
#         specificResult = firebase.get(specificPath, '')
#         for j in specificResult.keys():
#             if(j == "Teleop"):
#                 teleopResult = firebase.get(specificPath + '/' + j, '')
#                 for k in teleopResult.keys():
#                     # print(i)
#                     teleop_result = teleopResult[k]
#                     if k == "Amp":
#                         made_value = teleop_result.get('Made')
#                         miss_value = teleop_result.get('Miss')
#                         counts[0] += made_value
#                         totalAmpCount += made_value + miss_value
#                     elif k == "Intake":
#                         ground_value = teleop_result.get('Ground')
#                         source_value = teleop_result.get('Source')
#                         counts[1] += ground_value
#                         counts[2] += source_value
#                         totalIntakeCount += ground_value + source_value
#                     elif k == "Speaker":
#                         made_value = teleop_result.get('Made')
#                         miss_value = teleop_result.get('Miss')
#                         counts[3] += made_value
#                         totalSpeakerCount += made_value + miss_value
        
#     #calculates the stats
#     if(totalAmpCount == 0):
#         ampPercentage = 0
#     else:
#         ampPercentage = int(counts[0]/ totalAmpCount*100 )
#     if(totalIntakeCount == 0):
#         groundPercentage = 0
#         sourcePercentage = 0
#     else:
#         groundPercentage = int(counts[1]/ totalIntakeCount*100 )
#         sourcePercentage = int(counts[2]/ totalIntakeCount*100 )
#     if(totalSpeakerCount == 0):
#         speakerPercentage = 0
#     else:
#         speakerPercentage = int(counts[3]/ totalSpeakerCount*100 )
#     percentage = [ampPercentage, groundPercentage, sourcePercentage, speakerPercentage]

#     #push to database
#     statsPath = methodPath[:int(methodPath.index("Match-Info"))]
#     for i in range(len(percentage)):
#         firebase.put(statsPath + 'Stats/Teleop/', Teleop[i + 1], data=percentage[i])
                    

# def calculateEndGameStats(path):
#     methodPath = '/ISR/teams' + path
#     result = firebase.get(methodPath, '')
#     climbCounts = [0, 0, 0, 0, 0] # index 0 is amp, index 1 is ground, index 2 is source, index 3 is speaker
#     for i in result.keys():
#         specificPath = methodPath + i
#         specificResult = firebase.get(specificPath, '')
#         for j in specificResult.keys():
#             if(j == "Teleop"):

# def calculatePostGameStats(path):





ref.listen(listener)
