const Post = require('../models/post');
const User = require('../models/user');
module.exports.home=async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    
    // Post.find({})
    //     .then((posts)=>{
    //         return res.render('home',{title:"Codeial | Home", posts:posts 
    //     });  
    // });

    //Populate the user of each post using promise
    // Post.find({})
    // .populate("user")
    // .populate({
    //     path: 'comments',   
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec()
    // .then((posts)=>{
    //     User.find({})
    //     .then((users)=>{
    //         return res.render('home',{title:"Codeial | Home", posts:posts, all_users:users})
    //     });
    // })

    //Populate the user of each post using async await
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate("user")
        .populate({
            path: 'comments',   
            populate: {
                path: 'user'
            }
        })
    
        let users = await User.find({});

        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users}
        )
    }catch(err){
        console.log('Error',err);
    }
    
}