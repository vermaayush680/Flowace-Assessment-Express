const prisma = require("../config/prisma");

/* GET USER BY EMAIL ID */
const getUserbyEmailDB = async (email) => {
  try {
    console.log("getUserbyemailDB called");
    let date_ob = new Date();
    console.log(date_ob);

    const data = await prisma.User.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email : true
      }
    });
    console.log(data);
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("getUserbyemailDB error", err);
    return [];
  }
}

/* GET ALL USERS */
const getUsersListDB = async (userId) => {
  try {
    console.log("getUsersListDB called");

    const data = await prisma.User.findMany({
      where: {
        user_id: userId,
      },
      orderBy : {
        createdAt: 'desc'
      }
    });
    console.log(data);
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("getUsersListDB error", err);
    return [];
  }
}

/* GET ALL SCHEDULES FOR A USER ID */
const getSchedulesDB = async (userId) => {
  try {
    console.log("getSchedulesDB called");

    const data = await prisma.Sport_Schedule.findMany({
      where: {
        user_id: userId,
      },
      orderBy : [
      {
        date: 'desc'
      },
      {
        startTime: 'desc'
      },
      {
        endTime: 'desc'
      }
      ],
      select: {
        id: true,
        name: true,
        startTime: true,
        endTime: true,
        date: true
      }
    });
    console.log(data);
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("getSchedulesDB error", err);
    return [];
  }
}

/* GET ALL OVERLAPPING SCHEDULES FOR A USER ID  */
const getSchedulesbyUserIdDB = async (userId,sTime,eTime,date) => {
  try {
    console.log("getSchedulesbyUserIdDB called");

    const data = await prisma.Sport_Schedule.findMany({
      where: {
        user_id: userId,
        date: date,
        OR: [
   { startTime: { lte: eTime }, endTime: { gte: sTime } },
   { startTime: { gte: sTime }, endTime: { lte: eTime } },
],
      },
      orderBy:{
        endTime : 'asc',
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        date: true
      }
    });
    console.log(data);
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("getSchedulesbyUserIdDB error", err);
    return [];
  }
}

/* CREATE SCHEDULE */
/* Prisma Controller to create a new schedule */
const createScheduleDB = async (scheduleData) => {
  try {
    console.log("createScheduleDB called");
    let date_ob = new Date();
    console.log(date_ob);

    const result = await prisma.Sport_Schedule.create({
      data: {
        user_id: scheduleData.userId,
        name: scheduleData.name,
        startTime: scheduleData.startTime,
        endTime: scheduleData.endTime,
        date: scheduleData.date,
        createdAt: date_ob,
        updatedAt: date_ob
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("createScheduleDB error", err);
    return [];
  }
}

/* CREATE USER */
/* Prisma Controller to create a new user */
const createUserDB = async (name,email,password) => {
  try {
    console.log("createUserDB called");
    let date_ob = new Date();
    console.log(date_ob);

    const data = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: password,
        createdAt: date_ob,
        updatedAt: date_ob
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    if (err.message) err = err.message;
    console.log("createUserDB error", err);
    return [];
  }
}


module.exports = {
  createScheduleDB,
  createUserDB,
  getUserbyEmailDB,
  getUsersListDB,
  getSchedulesbyUserIdDB,
  getSchedulesDB
}
