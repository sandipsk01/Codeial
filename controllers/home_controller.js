const Post = require('../models/post');
const { populate } = require('../models/user');

module.exports.home=function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    
    // Post.find({})
    //     .then((posts)=>{
    //         return res.render('home',{title:"Codeial | Home", posts:posts 
    //     });  
    // });

    //Populate the user of each post
    Post.find({})
    .populate("user")
    .populate({
        path: 'comments',   
        populate: {
            path: 'user'
        }
    })
    .exec()
    .then((posts)=>{
        return res.render('home',{title:"Codeial | Home", posts:posts})
    })
}