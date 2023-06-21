var CreditModel = require("../models/credit");
var express = require('express');
var router = express.Router();


router.get('/', function(req, res){  
  CreditModel.find({}, function(err, credits) {
		if (err) {
			return next(err);
		} else {
			return res.status(200).json(credits);
		}
	})
});

router.post('/', function(req, res, next){
  var credit = new CreditModel();
	console.log(req.body);
	credit.name = req.body.name;
	credit.duration = req.body.duration;
	credit.maximal = req.body.maximal;
  credit.isCorporate = req.body.isCorporate;
  credit.interest = req.body.interest;
	credit.save(function(err) {
		if (err) {
			return next(err);
		} else {
			return res.status(201).send({"message" : "Successfully saved"});
		}
	});
});

router.delete('/:id', function(req, res, next){
  CreditModel.remove({_id:req.params.id}, function(){
    res.json(req.params.id)
  })
  
}); 

router.get('/:id', function(req, res){
  CreditModel.findById(req.params.id, function(err, credits) {
		if (err) {
			return next(err);
		} else {
			return res.status(200).json(credits);
		}
	})
});

router.put('/:id', function(req, res){
	CreditModel.findById(req.params.id, function (err, credit) {
		if (err) {
			return next(err);
		} else {
			credit.name = req.body.name;
			credit.duration = req.body.duration;
			credit.maximal = req.body.maximal;
			credit.isCorporate = req.body.isCorporate;
			credit.interest = req.body.interest;

			credit.save(function(err) {
				if (err) {
					return next(err);
				} else {
					return res.status(201).send({"message" : "Successfully saved"});
				}
			});
		}
	});
})

// /100/200/300?username=sss&lastname=petrosyan
// router.get('/:a/:b/:c')

// req.params.a // 100
// req.params.b // 200
// req.params.c // 300
// req.query.username // sss
// req.query.lastname // petrosyan

module.exports = router;
