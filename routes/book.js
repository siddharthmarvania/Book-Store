var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema  = mongoose.Schema;
var bookStoreSchema = new Schema({
    title: String,
    author: String,
    description: String
},{collection: 'book-store'});

var bookStore = mongoose.model('bookStore', bookStoreSchema);
router.get('/',function (req,res,next) {
   res.render('home');
});

router.get('/get',function (req,res,next) {
    bookStore.find()
        .then(function(doc) {
            res.render('get', {books:doc});
        });
});
router.get('/add',function(req,res,next){
   res.render('add');
});

router.post('/add',function (req,res,next) {
    //console.log("here");
   var book = {
       title: req.body.title,
       author: req.body.author,
       description: req.body.desc
   };
   var data = new bookStore(book);
   data.save();
   res.redirect('/');
});
router.get('/update',function (req,res,next) {
    res.render('update');
});

router.post('/update',function (req,res,next) {
   var id = req.body.id;
   bookStore.findById(id,function (err,doc) {
      if(err){
          console.error('error, no entry found');
      }
      doc.title = req.body.title;
      doc.author = req.body.author;
      doc.description = req.body.desc;
      doc.save();
   })
    res.redirect('/');
});
router.get('/delete',function (req,res,next) {
    res.render('delete');
});

router.post('/delete',function (req,res,next) {
    var id = req.body.id;
    bookStore.findByIdAndRemove(id).exec();
    res.redirect('/');
});
module.exports = router;