// const Comment=require('../models/comment');
// const Post = require('../models/post');
// const commentsMailer = require('../mailers/comments_mailer');
// const queue = require('../config/kue');
// const commentEmailWorker = require('../workers/comment_email_worker');
// // module.exports.create=function(req, res){
//     //name of input is post
//     // Post.findById(req.body.post,function(err,post){
//     //     if(post){
//     //         Comment.create({
//     //             content: req.body.content,
//     //             post: req.body.post,
//     //             user: req.user._id
//     //         }, function(err,comment){
//     //             //handle error
//     //             post.comments.push(comment);
//     //             post.save();

//     //             res.redirect('/');
//     //         });
//     //     }
//     // }); 
// // }


// // module.exports.create=function(req, res){
// //     Post.findById(req.body.post)
// //         .then((post)=>{
// //             Comment.create({
// //                 content: req.body.content,
// //                 post: req.body.post,
// //                 user: req.user._id
// //             })
// //             .then((comment)=>{
// //                 //handle error
// //                 post.comments.push(comment);
// //                 post.save();
    
// //                 res.redirect('/');
// //             });            
// //     })     
// // }

// module.exports.create = async function(req, res){

//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             await post.save();

//             //comment = await comment.populate('user', 'name email').execPopulate();

//             // commentsMailer.newComment(comment);

//             let job = queue.create('emails', comment).save(function(err){
//                 if (err){
//                     console.log('Error in sending to the queue', err);
//                     return;
//                 }
//                 console.log('job enqueued', job.id);

//             })

//             if (req.xhr){
//                 // Similar for comments to fetch the user's id!
                
    
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "Comment created!"
//                 });
//             }

//             req.flash('success', 'Comment published!');

//             res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


// // module.exports.destroy = function(req, res){
//     // Comment.findById(req.params.id, function(err, comment){
//     //     if(comment.user==req.user.id){
//     //         let postId=comment.post;
//     //         comment.remove();
//     //         Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}}, function(err, post){
//     //             return redirect('/');
//     //         })
//     //     }else{
//     //         return res.redirect('/');
//     //     }
//     // });
// // }


// // module.exports.destroy = function(req, res){   
// //     Comment.findById(req.params.id)
// //     .then((comment)=>{
// //         if(comment.user==req.user.id){
// //             let postId=comment.post;
// //             comment.deleteOne();
// //             Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})
// //             .then((post)=>{
// //                 return res.redirect('/');
// //             })
// //             .catch((err)=>{
// //                 return res.redirect('/');
// //             })
// //         }
// //     })
// //     .catch((err)=>{
// //             return res.redirect('/');
// //      });
// // }

// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.deleteOne();

//             let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//             // send the comment id which was deleted back to the views
//             if (req.xhr){
//                 return res.status(200).json({
//                     data: {
//                         comment_id: req.params.id
//                     },
//                     message: "Post deleted"
//                 });
//             }
            
//             req.flash('success', 'Comment deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'Unauthorized');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require("../mailers/comments_mailer");

// module.exports.create = function (req, res) {
//     Post.findById(req.body.post).then((post) => {
//         Comment.create({
//             content: req.body.content,
//             post: req.body.post,
//             user: req.user._id,
//         }).then((comment) => {
//             post.comments.push(comment);
//             post.save();

//             res.redirect('/');
//         });
//     });
// };



// async

module.exports.create = async function (req, res) {
	try {
		let post = await Post.findById(req.body.post);
		if (!post) {
			throw new Error('Post not found');
		}

		let comment = await Comment.create({
			content: req.body.content,
			post: req.body.post,
			user: req.user._id,
		});

		post.comments.push(comment);
		await post.save();

		// mailers
		comment = await comment.populate('user', 'name email');
		commentsMailer.newComment(comment);

		if (req.xhr) {
			// Similar for comments to fetch the user's id!
			// comment = await comment.populate('user', 'name')
			return res.status(200).json({
				data: {
					comment: comment,
				},
				message: 'Post created!',
			});
		}

		req.flash('success', 'Comment published!');
		res.redirect('/');
	} catch (err) {
		req.flash('error', err);
		return;
	}
};



// delete comment

// promise

// module.exports.destroy = function (req, res) {
//     Comment.findById(req.params.id).then((comment) => {
//         if (comment.user == req.user.id) {
//             let postId = comment.post;
//             comment.deleteOne();

//             Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
//                 .then((post) => {
//                     return res.redirect('/');
//                 })
//                 .catch((err) => {
//                     return res.redirect('/');
//                 })
//         }
//     })
//         .catch((err) => {
//             return res.redirect('/');
//         });
// }


// Async
module.exports.destroy = async function (req, res) {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			throw new Error('Comment not found');
		}

		if (comment.user.toString() !== req.user.id) {
			req.flash('error', 'Unauthorized');
			return res.redirect('back');
		}

		const postId = comment.post;
		await comment.deleteOne();
		await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

		if (req.xhr) {
			return res.status(200).json({
				data: {
					comment_id: req.params.id,
				},
				message: 'Comment deleted',
			});
		}

		req.flash('success', 'Comment deleted!');
		res.redirect('back');
	} catch (err) {
		req.flash('error', err.message);
		return;
	}
};