var express = require('express');
var router = express.Router();



/***************************
 * GET CUSTY.
 *
 * Notes for later:
 * so the place where it ends up is right after the "router.get("
 * and the thing that its pulling is right after "db.get("
 * still figuring out how they work together but... on the right path
 *
 ***************************/
 
router.get('/custy', function(req, res) {
    var db = req.db;
    var collection = db.get('babycrmone');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*******************************
 * post. yea... I said it. post
 *******************************/

router.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.get('babycrmone');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*******************************
 * DELETE
 *******************************/

router.delete('/deletecusty/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('babycrmone');
	var custyToDelete = req.params.id;
	collection.remove({ '_id' : custyToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	});
});





module.exports = router;