# Flowace Interview Assessment


# Requirements
The requirement was to create a sports scheduling API that manages overlapping schedule conflicts.

## Approach
Used Express to build the APIs, Prisma as the ORM library and MySQL as the database.

Created the following APIs :

1. CreateUser : To create a new user
2. getUserByEmail : Keeping the Email unique, we have used it to uniquely identify users.
3. createSchedule : To create a new schedule if the slot is available
4. getScheduleById : To get all the schedules for a particular User

All the API end points can be found in the routes folder. Also the Postman dump is present in the root directory for ease of access.

### Managing the overlapping schedules

The approach for this is given below: 

```
new_start < existing_end
AND new_end   > existing_start;
```

This condition gives us all the schedules with an overlapping start or end time.
Now we try to avoid this overlap by changing our schedule if possibe.

There are 3 possible cases: 
Case 1: The start and end time of our new schedule completely overlap with the start and end time of an already present schedule
Case 2: The end time of our new schedule overlaps with the start time of an already present schedule
Case 3: The start time of our new schedule overlaps with the end time of an already present schedule

All of these cases are handled in the schedule Controllers.

### Testing

The __tests__ folder contains a few tests to test our APIs.

There are 5 tests: 

1. Creating a new user
2. Creating a duplicate user
3. Creating a new schedule
4. Creating a completely overlapping schedule
5. Creating a partially overlapping schedule


### Workspace Layout

The workspace contains the following folders:
1. __tests__
2. config
3. controllers
4. middleware
5. models
6. prisma
7. routes


The main directory has an app.js containing the app config and a server.js containing the server config and routings.

The routes folder has 3 files
1. Index.js : main routes file that then redirects to respective routes.
2. schedule.js : Containing all the schedule routes
3. user.js : Containing all the user routes

The prisma folder contains the schema.prisma file containing the ORM data.

The models file contains the database schema and a data population sql file.

The middleware is being used to validate tokens and generate them.

The controllers folder contains 3 files:

1. dbController.js : Containing all the prisma ORM commands to perform CRUD operations on the database.
2. schedule.js : Containing all the controllers for the scheduling APIs.
3. user.js : Containing all the controllers for the user APIs.

The __tests__ folder contains a schedule.js file that contains all the jest tests to test the APIs.


### Setup and How to use

Inorder to install the dependencies, use the command ```npm i```

The .env file contains a test JWT token and database URL.
Configure the database url as per your configuration 
The url has the following format: 

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

Alternatively you can change the password for the root user to 'ayushver01' and 
follow without changingg the database url.

Command to alter password: 
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'ayushver01';
```

Inorder to populate the database, the models folder has both the Create and Insert qeuries.

Alternatively we can populate the database using prisma too.
Just use the command 
```
npx prisma db push
```

This creates the schema for you but doesn't insert values into it.

To start the server, use ``` npm run dev ```

The API are jwt authenticated so you can either use the test token present in the .env folder or generate a new one using the generateToken API.

To test the APIs use the following command:
```
npx jest schedule.js
```

.env file:
```
PORT = 3001

JWT_SECRET = "flowacetestsecret"

DATABASE_URL="mysql://root:ayushver01@localhost:3306/flowace"

JWT_PAYLOAD = {
  "sub": "1234567890",
  "name": "Ayush Verma",
  "iat": 1516239022
}

TOKEN = eyJhbGciOiJIUzI1NiJ9.ew.NT_k8ys_ukmEawavg2xZqtjfKhgi4wLAH-CrCcndzH8
```