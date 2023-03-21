/* API TESTS */

const dotenv = require("dotenv");
const request = require('supertest');

/* Importing the app */
const app = require('../server');

describe('Testing APIs', () => {

  let token = process.env.TOKEN;
  let email = "ww2@ww.ww";

  /* Test to create a new user successfully */
  test('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user/create')
      .send({name:"Ayush",email:email,password:"1345fds234"})
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.data).toEqual(typeof {});
  });

  /* Test to create a duplicate user */
  test('should fail to create duplicate user', async () => {
    const res = await request(app)
      .post('/api/user/create')
      .send({name:"Ayush",email:email,password:"1345fds234"})
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toEqual(500);
    expect(typeof res.body.data).toEqual(typeof {});
  });

  /* Test to create a new Schedule successfully */
  test('should create a new schedule', async () => {
    const res = await request(app)
      .post('/api/sport-schedule/create')
      .send({name:"Ayush",email:email,startTime:"02:00",endTime:"03:30",date:"2023-03-21"})
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.data).toEqual(typeof {});
    expect(res.body.data.endTime).toEqual("03:30");
  });

  /* Test to create a duplicate schedule */
  test('should fail to create duplicate schedule', async () => {
    const res = await request(app)
      .post('/api/sport-schedule/create')
      .send({name:"Ayush",email:email,startTime:"02:00",endTime:"03:30",date:"2023-03-21"})
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toEqual(500);
    expect(typeof res.body.data).toEqual(typeof {});
  });

  /* Test to create an overlapping schedule */
  test('should adjust endTime for schedule', async () => {
    const res = await request(app)
      .post('/api/sport-schedule/create')
      .send({name:"Ayush",email:email,startTime:"01:00",endTime:"03:30",date:"2023-03-21"})
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.data).toEqual(typeof {});
    expect(res.body.data.endTime).toEqual("02:00");
  });
});

