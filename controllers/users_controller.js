const User=require('../models/user');

module.exports.profile=function(req,res){
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id)
          .then((user) => {
            if (user) {
              return res.render('user_profile', {
                title: "Profile Page",
                user: user
              });
            } else {
              throw new Error('User not found');
            }
          })
          .catch((err) => {
            console.log('Error: ', err);
            return res.redirect('/users/sign-in');
          });
      } else {
        return res.redirect('/users/sign-in');
      }
      
    
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
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back')
    }

    User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return User.create(req.body);
    } else {
      throw new Error('User already exists');
    }
  })
  .then((user) => {
    return res.redirect('/users/sign-in');
  })
  .catch((err) => {
    console.log('Error: ', err);
    return res.redirect('back');
  });

}

module.exports.createSession=function(req,res){
  //Steps to authenticate
  // find the user
    User.findOne({ email: req.body.email })
  .then((user) => {
    if (user) {
      if (user.password === req.body.password) {
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
      } else {
        throw new Error('Password does not match');
      }
    } else {
      throw new Error('User not found');
    }
  })
  .catch((err) => {
    console.log('Error: ', err);
    return res.redirect('back');
  });
}

