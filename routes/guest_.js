var express = require('express')
var app = express()

// SHOW LIST OF GUEST
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM guest ORDER BY id_guest ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/guest', {
					title: 'User Guest ', 
					data: ''
				})
			} else {
				// render to views/guest.ejs template file
				res.render('tampil/guest', {
					title: 'User Guest ', 
					data: rows
				})
			}
		})
	})
})

// SHOW ADD USER FORM
app.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('tampil/guest', {
		title: 'Add New User',
		name: '',
		password: '',
		email: '',	
		no_hp: ''	
	})
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('password', 'Password is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    req.assert('no_hp', 'No Hp is required').notEmpty() 

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var guest = {
			name_guest: req.sanitize('name').escape().trim(),
			pass_guest: req.sanitize('password').escape().trim(),
			email_guest: req.sanitize('email').escape().trim(),
			no_hp_guest: req.sanitize('no_hp').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO guest SET ?', guest, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('/guest_')
					
				
				} else {				
					req.flash('success', 'Data added successfully!')
					res.redirect('/guest_')
				

					
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
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('tampil/guest', { 
            title: 'Add New User',
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            no_hp: req.body.no_hp
        })
    }
})


// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM guest WHERE id_guest = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'User not found with id = ' + req.params.id)
				res.redirect('/guest_')
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				res.render('tampil/edit_guest', {
					title: 'Edit User', 
					//data: rows[0],
					id: rows[0].id_guest,
					name: rows[0].name_guest,
					password: rows[0].pass_guest,
					email: rows[0].email_guest,
					no_hp: rows[0].no_hp_guest					
				})
			}			
		})
	})
})

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('password', 'Password is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()
    req.assert('no_hp', 'A valid No HP is required').notEmpty()  

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var guest = {
			name_guest: req.sanitize('name').escape().trim(),
			pass_guest: req.sanitize('password').escape().trim(),
			email_guest: req.sanitize('email').escape().trim(),
			no_hp_guest: req.sanitize('no_hp').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE guest SET ? WHERE id_guest = ' + req.params.id, guest, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/guest/add.ejs
					res.render('tampil/edit_guest', {
						title: ' User Guets',
						id: req.params.id,
						name: req.body.name,
						password: req.body.password,
						email: req.body.email,
						no_hp: req.body.no_hp
					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/user/add.ejs
					res.redirect('/guest_')
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
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('tampil/edit_guest', { 
            title: 'User Guest',            
			id: req.params.id, 
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			no_hp: req.body.no_hp
        })
    }
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
	var guest = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM guest WHERE id_guest = ' + req.params.id, guest, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				res.redirect('/guest_')
			} else {
				req.flash('success', 'User deleted successfully! id = ' + req.params.id)
				// redirect to users list page
				res.redirect('/guest_')
			}
		})
	})
})

module.exports = app
