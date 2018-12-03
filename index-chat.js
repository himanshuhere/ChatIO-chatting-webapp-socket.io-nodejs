
	$(function(){
		
            // Connect to socket.io
            var socket = io.connect('http://127.0.0.1:3000');
            // Check for connection
            if(socket !== undefined){
                console.log('Connected to socket...');
            }
		
		
            //// send messsage
            var $messageform = $('#messageform');
            var $message = $('#message');
            var $chat = $('#chat');
            var $messageArea = $('#msgArea');
             var $userFormArea = $('#userFormArea');
              var $userform = $('#userform');
               var $users = $('#users');
                var $username = $('#username');
                var $typingvar = $('#typingvar');

            $messageform.submit(function(e){
            	e.preventDefault();
            	
            	socket.emit('send message', $message.val());
            	$message.val('');
            });
            e.preventDefault();
                
                socket.emit('send message', $message.val());
                $message.val('');

                
            socket.on('new message', function(data){
            	$chat.append('<div class="well"  ><strong>'+data.user+' : </strong>'+data.msg+'</div>');
            });


             $userform.submit(function(e){
            	e.preventDefault();
            	
            	socket.emit('new user', $username.val(), function(data){
            		if(data){
            			$userFormArea.hide();
            			$messageArea.show();
            		}
            	});
            	$username.val('');
            });

             socket.on('get users', function(data){
             	var html = '';
             	for(i = 0; i < data.length; i++){
             		html += '<li class="list-group-item" id="x55">'+data[i]+'</li>'; 
             		}
             		$users.html(html);            	
             });

             $message.addEventListener('keypress', function(){
                  socket.emit('typing..', $username.val());
             });

             socket.on('typing', function(data){
                  $typingvar.innerHTML = '<p><em>'+data +'is typing a message..</p></em>';
             });
	});
	
