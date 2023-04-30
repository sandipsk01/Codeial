module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"Profile Page"
    }); 
}

//render the sign up page
module.exports.signUp=function(req, res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}


//render thr sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create=function(req,res){
    //TODO later
}

module.exports.createSession=function(req,res){
    //TODO later
}