const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017/Stocks';

const insertDocuments = (db, callback) => {
    const collection = db.collection('edx-course-students');

    collection.insert(
        [{ name: 'Bob' }, { name: 'John' }, { name: 'Peter' }],
        (error, result) => {
            if (error) return process.exit(1);
            console.log(JSON.stringify(result.ops, undefined, 2));
            callback(result);
        }
    );
};


MongoClient.connect(url, (err, database) => {
    if (err)
        return console.log('unable to conenct the mongodatabase server');
    console.log('connected to mongodatabase server');

    const db = database.db('Stocks');

    insertDocuments(db, () => {
        console.log('Insert successful');
    });


    // database.collection('testData').insertOne({
    //         text: 'something',
    //         completed: false
    //     }, (err, result) => {
    //         if (err)
    //             return console.log('unable to insert', err);
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     });
    database.close();
});