{
    // method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    //d.3 populate delete link argument, space is important
                    deletePost($(' .delete-post-button',newPost))
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                        <p>
                    
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                            ${post.content}
                            <br>
                            <small>
                                ${post.user.name}
                            </small>
                        </p>
                        <div class="post-comments">
                            
                                <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="Type here to add comment...">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add Comment">
                                </form>
                            
                    
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                            </div>
                        </div>
                    </li> `)
    }


    //d.method to delete post from DOM
    // d.1 created a function which sends post id to be deleted
    let deletePost= function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                //recieves some data
                success: function(data){
                    $(`#post-${data.data.post_id}`.remove())
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }



    createPost();
}