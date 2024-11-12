# Event RSVP Application Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

## Initial Setup

1. First, start MongoDB service:
```sh
# On Linux/macOS
sudo service mongod start
# OR
sudo systemctl start mongod

# On Windows (run as Administrator)
net start MongoDB
```

2. Set up the client:
```sh
cd client
npm install
cd ..
```

3. Set up the server:
```sh
cd server
npm install
```

4. Initialize the database:
```sh
mongosh init.mongo.js
cd ..
```

## Running the Application

1. Start the server:
```sh
cd server
npm run dev
```

2. In a new terminal, start the client:
```sh
cd client
npm start
```

## Verification Steps

1. MongoDB should be running on `mongodb://localhost:27017`
2. Server API should be accessible at `http://localhost:8080`
3. Client application should be running at `http://localhost:3000`

## Troubleshooting

If MongoDB fails to connect:

1. Verify MongoDB is running:
```sh
mongosh --eval "db.serverStatus()"
```

2. Check MongoDB logs:
```sh
# On Linux/macOS
sudo tail -f /var/log/mongodb/mongod.log

# On Windows
type C:\Program Files\MongoDB\Server\[version]\log\mongod.log
```