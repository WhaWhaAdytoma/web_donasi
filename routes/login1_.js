var express = require('express')
var app = express()

// SHOW LIST OF admin
app.get('/', function(req, res, next) {
	res.render('user/user_index', {title: 'Log In '})
})

app.get('/login', function(req, res, next) {
	res.render('tampil/login1', {title: 'Log In '})
})

app.get('/edit', function(req, res, next) {
	res.render('user/edit_login1', {title: 'Log In '})
})


app.get('/beranda/(:id)', function(req, res, next) {
	
	req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM guest WHERE id_guest = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if campaign1 not found
							if (rows2.length <= 0) {
								req.flash('error', ' not found with id = ' + req.params.id)
								res.redirect('/login1_')
							}
							else { // if campaign1 found
								// render to views/campaign1/edit.ejs template file
							
									 res.render('user/user_index', {
											title: 'Program Masjid Muslim', 
											//data: rows[0],
											
											id_guest: rows2[0].id_guest,
											name_guest: rows2[0].name_guest,
											pass_guest: rows2[0].pass_guest,
											email_guest: rows2[0].email_guest,
											no_hp_guest: rows2[0].no_hp_guest					
										})
								
							}			
						})
	})	
})



app.get('/konfirmasi/(:id)', function(req, res, next) {
	
	req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM guest WHERE id_guest = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if campaign1 not found
							if (rows2.length <= 0) {
								req.flash('error', ' not found with id = ' + req.params.id)
								res.redirect('/login1_')
							}
							else { // if campaign1 found
								// render to views/campaign1/edit.ejs template file
							
									 res.render('user/user_konfirmasi_bayar1', {
											title: 'Konfirmasi Bayar', 
											//data: rows[0],
											
											id_guest: rows2[0].id_guest,
											name_guest: rows2[0].name_guest,
											pass_guest: rows2[0].pass_guest,
											email_guest: rows2[0].email_guest,
											no_hp_guest: rows2[0].no_hp_guest					
										})
								
							}			
						})
	})	
})

//user, konfirmasi baya 
app.post('/addKonfirmasi/(:id)', function(req, res, next){	
	req.assert('id_donasi', 'Name is required').notEmpty()           
	req.assert('nama_donatur', 'nama_donatur is required').notEmpty()            
    req.assert('email_donatur', 'email_donatur is required').notEmpty()  
    req.assert('no_hp_donatur', 'no_hp_donatur is required').notEmpty() 
    req.assert('id_rek_tujuan', 'id_rek_tujuan is required').notEmpty()          
	req.assert('rek_donatur', 'rek_donatur is required').notEmpty()            
    req.assert('jum_donasi', 'jum_donasi is required').notEmpty()  
    req.assert('tanggal', 'tanggal is required').notEmpty()

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body. name = '   a      ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize(' name').trim(); // returns 'a  '
		********************************************/
		var konfirmasi_bayar = {
			id_donasi: req.sanitize('id_donasi').escape().trim(),
			nama_donatur: req.sanitize('nama_donatur').escape().trim(),
			email_donatur: req.sanitize('email_donatur').escape().trim(),
			no_hp_donatur: req.sanitize('no_hp_donatur').escape().trim(),
			id_rek_tujuan: req.sanitize('id_rek_tujuan').escape().trim(),
			rek_donatur: req.sanitize('rek_donatur').escape().trim(),
			jum_donasi: req.sanitize('jum_donasi').escape().trim(),
			tanggal: req.sanitize('tanggal').escape().trim()
		}
		var id_donasi = req.sanitize('id_donasi').escape().trim()
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO konfirmasi_bayar SET ?', konfirmasi_bayar, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('user/user_konfirmasi_bayar1')
					
				
				} else {				
					req.flash('success', 'Data added successfully!')
					
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM guest WHERE id_guest = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if campaign1 not found
							if (rows2.length <= 0) {
								req.flash('error', ' not found with id = ' + req.params.id)
								res.redirect('/login1_')
							}
							else { // if campaign1 found
								// render to views/campaign1/edit.ejs template file
							
									 res.render('user/user_konfirmasi_bayar1', {
											title: 'Konfirmasi Bayar', 
											//data: rows[0],
											
											id_guest: rows2[0].id_guest,
											name_guest: rows2[0].name_guest,
											pass_guest: rows2[0].pass_guest,
											email_guest: rows2[0].email_guest,
											no_hp_guest: rows2[0].no_hp_guest					
										})
								
							}			
						})
					})	
						
				}
			})
		})
	}
	else {   //Display errors to  
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.redirect('/konfirmasi_bayar1_')
    }
})

app.get('/program/(:id)', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM campaign ORDER BY id_cpg ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('user/user_index', {
					title: ' Data Campaign ', 
					data: ''
				})
			} else {
				// render to views/campaign1.ejs template file
				req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM guest WHERE id_guest = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if campaign1 not found
							if (rows2.length <= 0) {
								req.flash('error', ' not found with id = ' + req.params.id)
								res.redirect('/login1_')
							}
							else { // if campaign1 found
								// render to views/campaign1/edit.ejs template file
							
									 res.render('user/user_campaign1', {
											title: 'Program Masjid Muslim', 
											//data: rows[0],
											data: rows,
											id_guest: rows2[0].id_guest,
											name_guest: rows2[0].name_guest,
											pass_guest: rows2[0].pass_guest,
											email_guest: rows2[0].email_guest,
											no_hp_guest: rows2[0].no_hp_guest					
										})
								
							}			
						})
					})	
			}
		})
	})
	
})

// SHOW detail campaign1 
app.get('/detail/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM campaign WHERE id_cpg = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if campaign1 not found
			if (rows.length <= 0) {
				req.flash('error', 'campaign1 not found with id = ' + req.params.id)
				res.redirect('/campaign1_')
			}
			else { // if campaign1 found
				// render to views/campaign1/edit.ejs template file
				res.render('tampil/detail_campaign1', {
					title: ' Data Campaign ', 
					data: rows
					
				})
			}			
		})
	})
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
						            //res.redirect('/')
						            res.render('user/user_index', {
											title: 'Masjid Muslim', 
											//data: rows[0],
											id_guest: rows[0].id_guest,
											name_guest: rows[0].name_guest,
											pass_guest: rows[0].pass_guest,
											email_guest: rows[0].email_guest,
											no_hp_guest: rows[0].no_hp_guest					
										})
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
