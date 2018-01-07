var express = require('express')
var app = express()


app.get('/logout', function(req, res, next) {
		res.render('index', {title: 'Masjid Muslim'})
})
// SHOW LIST OF admin
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM admin ORDER BY id_admin ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/admin', {
					title: ' Data Admin ', 
					data: ''
				})
			} else {
				// render to views/admin.ejs template file
				res.render('tampil/admin', {
					title: ' Data Admin ', 
					data: rows
				})
			}
		})
	})
})

// SHOW ADD admin FORM
app.get('/add', function(req, res, next){	
	// render to views/admin/add.ejs
	res.render('tampil/admin', {
		title: 'Add New admin',
		name: '',
		password: '',
		email: '',	
		no_hp: ''	
	})
})

// ADD NEW admin POST ACTION
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
		req.body.adminname = '   a admin    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('adminname').trim(); // returns 'a admin'
		********************************************/
		var admin = {
			name_admin: req.sanitize('name').escape().trim(),
			pass_admin: req.sanitize('password').escape().trim(),
			email_admin: req.sanitize('email').escape().trim(),
			no_hp_admin: req.sanitize('no_hp').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO admin SET ?', admin, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('/admin_')
				} else {				
					req.flash('success', 'Data added successfully!')				
				    res.redirect('/admin_')
				}
			})
		})
	}
	else {   //Display errors to admin
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('tampil/admin', { 
            title: ' Admin',
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            no_hp: req.body.no_hp
        })
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

// EDIT admin POST ACTION
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
		req.body.adminname = '   a admin    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('adminname').trim(); // returns 'a admin'
		********************************************/
		var admin = {
			name_admin: req.sanitize('name').escape().trim(),
			pass_admin: req.sanitize('password').escape().trim(),
			email_admin: req.sanitize('email').escape().trim(),
			no_hp_admin: req.sanitize('no_hp').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE admin SET ? WHERE id_admin = ' + req.params.id, admin, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/admin/add.ejs
					res.render('tampil/edit_admin', {
						title: ' admin Guets',
						id: req.params.id,
						name: req.body.name,
						password: req.body.password,
						email: req.body.email,
						no_hp: req.body.no_hp
					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/admin/add.ejs
					res.redirect('/admin_')
				}
			})
		})
	}
	else {   //Display errors to admin
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('tampil/edit_admin', { 
            title: 'admin admin',            
			id: req.params.id, 
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			no_hp: req.body.no_hp,
        })
    }
})

// DELETE admin
app.delete('/delete/(:id)', function(req, res, next) {
	var admin = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM admin WHERE id_admin = ' + req.params.id, admin, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to admins list page
				res.redirect('/admin_')
			} else {
				req.flash('success', 'admin deleted successfully! id = ' + req.params.id)
				// redirect to admins list page
				res.redirect('/admin_')
			}
		})
	})
})

module.exports = app
