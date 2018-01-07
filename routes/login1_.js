var express = require('express')
var app = express()

// SHOW LIST OF admin
app.get('/', function(req, res, next) {
	res.render('tampil/login1', {title: 'Log In '})
})







// Login Validation POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('email_guest', 'Email is required').notEmpty()           //Validate name
	req.assert('pass_guest', 'Password is required').notEmpty()             //Validate age
  
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.adminname = '   a admin    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('adminname').trim(); // returns 'a admin'
		********************************************/
		
		 var email= req.body.email_guest;
  		 var password = req.body.pass_guest;
 		// connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {		

			req.getConnection(function(error, conn) {
				conn.query('SELECT * FROM guest WHERE email_guest = ?',[email],  function(err, rows, fields) {
					if(err) throw err
					
					// if user not found
					if (rows.length <= 0) {
						//jika tidak ada,maka 
						//cek login Admin
							req.getConnection(function(error, conn) {
								conn.query('SELECT * FROM admin WHERE email_admin = ?',[email],  function(err, rows, fields) {
									if(err) throw err
									
									// if user not found
									if (rows.length <= 0) {
										req.flash('error', 'Email does not exits ')
										res.redirect('/login1_')
									}
									else { // if user found
										 if(rows.length >0){
										 	//cek password
										      if(rows[0].pass_admin == password){
										            res.redirect('/admin_')
										      }
										      else{
										        
										            var error_msg = 'Email and Password does not match'
										        	req.flash('error', error_msg)		
													res.redirect('/login1_')
										      }
										    }
									   
										
									}			
								})
							})
					}
					else { // if user found
						 if(rows.length >0){
						 	//cek password
						      if(rows[0].pass_guest == password){
						            res.redirect('/')
						      }
						      else{
						        
						            var error_msg = 'Email and Password does not match'
						        	req.flash('error', error_msg)		
									res.redirect('/login1_')
						      }
						    }
					   /* else{
					    var error_msg = 'Email does not exits'
						        	req.flash('error', error_msg)		
									res.redirect('/login1_')
					    }*/
					
						
					}			
				})
			})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		res.redirect('/campaign1_')
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        /*res.render('tampil/guest', { 
            title: 'Add New User',
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            no_hp: req.body.no_hp
        })*/
    }
})


// SHOW EDIT admin FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if admin not found
			if (rows.length <= 0) {
				req.flash('error', 'admin not found with id = ' + req.params.id)
				res.redirect('/admin_')
			}
			else { // if admin found
				// render to views/admin/edit.ejs template file
				res.render('tampil/edit_admin', {
					title: 'Edit admin', 
					//data: rows[0],
					id: rows[0].id_admin,
					name: rows[0].name_admin,
					password: rows[0].pass_admin,
					email: rows[0].email_admin,
					no_hp: rows[0].no_hp_admin					
				})
			}			
		})
	})
})



module.exports = app
