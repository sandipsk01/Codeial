const User=require('../models/user');

module.exports.profile=function(req,res){
  User.findById(req.params.id)
  .then((user)=>{
    return res.render('user_profile',{
      title:'User Profile',
      profile_user: user
    });
  });
}


module.exports.update=function(req,res){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user)=>{
      return res.redirect('back');
    });
  }else{
    return res.status(401).send('Unauthorized');
  }
}
//render the sign up page
module.exports.signUp=function(req, res){
    if (req.isAuthenticated()){
      res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}


//render thr sign in page
module.exports.signIn=function(req,res){
  if (req.isAuthenticated()){
    res.redirect('/users/profile');
  }
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
  //   //Steps to authenticate
  //   //find the user
  //   User.findOne({ email: req.body.email })
  // .then((user) => {
  //   if (user) {
  //     if (user.password === req.body.password) {
  //       res.cookie('user_id', user.id);
  //       return res.redirect('/users/profile');
  //     } else {
  //       throw new Error('Password does not match');
  //     }
  //   } else {
  //     throw new Error('User not found');
  //   }
  // })
  // .catch((err) => {
  //   console.log('Error: ', err);
  //   return res.redirect('back');
  // });
    
  return res.redirect('/')
}

module.exports.destroySession = function(req, res){
req.logout(req.user,err=>{
  return res.redirect('/')
})
}