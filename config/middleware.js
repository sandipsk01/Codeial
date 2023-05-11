// How to use flash
// set up the library connect-flash
// we used it after session
// set up some messages in users-controller
// pass on messages we created middleware
// used that middleware
// access it in template


module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }

    next();
}