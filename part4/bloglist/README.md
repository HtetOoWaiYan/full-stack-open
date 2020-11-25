## Usage 

Run: **`npm i`** to install the dependencies.

Create **`.env`** file, add your port and [MongoDB Connection String](https://www.mongodb.com/cloud/atlas) like:
```
PORT=your_port_number
SECRET=your_secret_string (can be any string)
MONGODB_URI='your_mongodb_connection_string'
TEST_MONGODB_URI='your_mongodb_connection_string_for_testing'
```

(A guide to setup MongoDB Atlas can be found [here](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db).)

### Availabe commands

Run the app in development mode: **`npm run dev`**

Run tests: **`npm run test`**

Run the linter: **`npm run lint`**

Run the app in test mode: **`npm run start:test`**