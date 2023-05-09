const Comment=require('../models/comment');
const Post = require('../models/post');

module.exports.create=function(req, res){
    //name of input is post
    // Post.findById(req.body.post,function(err,post){
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err,comment){
    //             //handle error
    //             post.comments.push(comment);
    //             post.save();

    //             res.redirect('/');
    //         });
    //     }
    // });  
    Post.findById(req.body.post)
        .then((post)=>{
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then((comment)=>{
                //handle error
                post.comments.push(comment);
                post.save();
    
                res.redirect('/');
            });            
    })     
}


module.exports.destroy = function(req, res){
    // Comment.findById(req.params.id, function(err, comment){
    //     if(comment.user==req.user.id){
    //         let postId=comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}}, function(err, post){
    //             return redirect('/');
    //         })
    //     }else{
    //         return res.redirect('/');
    //     }
    // });
    
    Comment.findById(req.params.id)
    .then((comment)=>{
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})
            .then((post)=>{
                return res.redirect('/');
            })
            .catch((err)=>{
                return res.redirect('/');
            })
        }
    })
    .catch((err)=>{
            return res.redirect('/');
     });
}