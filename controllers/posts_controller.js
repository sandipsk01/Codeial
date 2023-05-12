const Post= require('../models/post');
const Comment = require('../models/comment');
// By Using promise
// module.exports.create = function(req, res){
//     Post.create({
//         content:req.body.content,
//         user: req.user._id
//     })
//     .catch((err)=>{
//         if(err){console.log('error in creating a post'); return;}
//     })
//     .then((post)=>{
//         return res.redirect('back');
//     })
// }


// By using async await
module.exports.create= async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post created"
            })
        }

        req.flash('success','Post published');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err)
        console.log('Error', err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post: req.params.id});

            //d.2 data contains the post id
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message: "Post deleted"
                })
            }

            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You can not delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('Error',err);
        return res.redirect('back');
    }
}

// Old way but its deprecated

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });

// }

// using promise
// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id)
//         .then((post)=>{
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.deleteOne();
//             Comment.deleteMany({post: req.params.id})
//             .then(()=>{
//                 return res.redirect('/');
//             })
//             .catch((err)=>{
//                 return res.redirect('/');
//             })
//         }})
//         .catch((err)=>{
//             return res.redirect('/');
//         });
// } 