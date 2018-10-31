var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var mongoConfig = require('../routes/mongodb/mongoConfig')
var url = mongoConfig.mongoBili.url
var bili = mongoConfig.mongoBili.biliDb
router.get("/getAllMonth/:playordm", function(req,res,next){
    let playordm = req.params.playordm
    MongoClient.connect(url,function(err, db){
        if(err) throw err;
        let bilidb = db.db(bili)
        let query = {}
        let projection = getProject()
        let sortJson = {}
        if(playordm!="all"){
            sortJson[playordm] = -1
        }
        console.log(projection)
        bilidb.collection("allmonth_play_dm").find(query).sort(sortJson)
        .project(projection)
        .limit(10)
        .toArray(function(err,result){
            if(err) throw err;
            // console.log(result);
            if(result){
                // result.
                res.json(result)
            }
            db.close()
        })
    })
})
var getProject = function (playordm){
    let projection = {
        _id: 0,
        tv: 1,
        dm: 1,
        play: 1
    }  
    return projection
}
//EventSource
router.get('/stream', function(req, res, next) {
    console.log(111)
    res.writeHead(200, {
        "Content-Type":"text/event-stream", 
        "Cache-Control":"no-cache", 
        "Connection":"keep-alive",
        "Access-Control-Allow-Origin" : "*"
    });

    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function() {
        res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
        clearInterval(interval);
    }, false);
})

router.get('/getByMonth/:month/:playordm', function(req, res , next){
    let month = req.params.month
    let playordm = req.params.playordm
    MongoClient.connect(url,function(err, db){
        let bilidb = db.db(bili)
        let projection = getProject()
        let query = {
            'month': month
        }
        let sortJson = {}
        if(playordm!="all"){
            sortJson[playordm] = -1
        }
        if(err) throw err;
        console.log(projection)
        bilidb.collection('bymonth_play_dm').find(query).sort(sortJson)
        .project(projection)
        .limit(10).toArray(function(err,result){
            if(err) throw err;
            // console.log(result);
            if(result){
                // result.
                res.json(result)
            }
            db.close()
        })
    })
})
module.exports = router