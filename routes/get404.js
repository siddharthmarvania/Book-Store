
exports.get404 = function(req, res, next){
    res.status(404).send('Not Found');
};
