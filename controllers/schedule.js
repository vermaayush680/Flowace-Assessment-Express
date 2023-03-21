const { createScheduleDB, getUserbyEmailDB, getSchedulesbyUserIdDB, getSchedulesDB } = require('./dbController');

/* CREATE SCHEDULE */
/* Controller to create a new schedule */
const createSchedule = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log("createSchedule requestBody", requestBody);
        const { email, startTime, endTime, date } = requestBody;

        // Checking if the user is already present or not.
        const isUser = await getUserbyEmailDB(email);
        console.log(isUser);

        // If the user is not present, we cannot add the schedule as the user is not registered
        if(!isUser) throw "No user with this email found";

        const userId = isUser.id;

        // Getting all overlapping schedules for the schedule to be added
        const schedulesList = await getSchedulesbyUserIdDB(userId, startTime, endTime, date);
        let sTime = startTime, eTime = endTime;
        for(const schedule of schedulesList){

            const schSTime = schedule.startTime,schETime = schedule.endTime;

            /* 
            For each overlap, we have 3 cases

            Case 1: The start and end time of our new schedule completely overlap with the start and end time of an already present schedule
            Case 2: The end time of our new schedule overlaps with the start time of an already present schedule
            Case 3: The start time of our new schedule overlaps with the end time of an already present schedule
            */
            if(sTime >= schSTime && eTime <= schETime) throw "Slot not available for booking";
            if(sTime < schSTime && eTime > schSTime) eTime = schSTime;
            if(eTime > schETime && sTime < schETime) sTime = schETime;
            console.log({sTime,eTime});
        }

        // We have resolved the overlap now and can add the new schedule in the database.
        requestBody.userId = userId;
        requestBody.startTime = sTime;
        requestBody.endTime = eTime;
        console.log(requestBody);
        const data = await createScheduleDB(requestBody);
        return res.status(201).json({ message: "schedule created successfully", data:data});
    } catch (err) {
        if (err.message) err = err.message;
        console.log("createSchedule error", err);
        return res.status(500).json({ message:err || "failed to create schedule", data:{}});
    }
}

/* GET SCHEDULE */
/* Controller to get a list of all the schedules for a particular user id */
const getSchedules = async (req, res) => {
    try {
        const requestParams = req.params;
        console.log("getSchedules requestParams", requestParams);
        const { userId } = requestParams; 
        const schedules = await getSchedulesDB(userId);
        if (!schedules || !schedules.length) throw "no schedules found";
        return res.status(200).json({message: "data fetched successfully", data:schedules});
    } catch (error) {
        if (error.message) error = error.message;
        console.log("getSchedules error", error);
        return res.status(500).json({message : error || "failed to fetch data", data: []});
    }
}

module.exports = {
    createSchedule,
    getSchedules
}