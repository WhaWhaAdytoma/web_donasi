var express = require('express')
var app = express()

// SHOW LIST OF rekening
app.get('/(:id)', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM rekening ORDER BY id_rek_tujuan ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/rekening', {
					title: '  rekening ', 
					data: ''
				})
			} else {
				// render to views/rekening.ejs template file
				/*res.render('tampil/rekening', {
					title: '  rekening ', 
					data: rows
				})*/
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id)
								res.render('tampil/rekening', {title: 'Masjid Muslim'})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								res.render('tampil/rekening', {
									title: 'Data Rekening-Masjid Muslim', 
										data: rows,
										id_admin1: rows2[0].id_admin,
										name_admin1: rows2[0].name_admin,
										pass_admin1: rows2[0].pass_admin,
										email_admin1: rows2[0].email_admin,
										no_hp_admin1: rows2[0].no_hp_admin					
								})
							}			
						})
				})
			}
		})
	})
})

		

// SHOW ADD   FORM
app.get('/add', function(req, res, next){	
	// render to views/ /add.ejs
	res.render('tampil/rekening', {
		title: 'Add New  ',
		nama_bank: '',
		nama_rek: '',
		no_rek: ''
	
	})
})

// ADD NEW   POST ACTION
app.post('/add/(:id)', function(req, res, next){	
	req.assert('nama_bank', 'nama_bank is required').notEmpty()           //Validate name
	req.assert('nama_rek', 'nama_rek is required').notEmpty()             //Validate   
    req.assert('no_rek', 'no_rek is required').notEmpty() 

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body. name = '   a      ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize(' name').trim(); // returns 'a  '
		********************************************/
		var rekening = {
			nama_bank: req.sanitize('nama_bank').escape().trim(),
			nama_rek: req.sanitize('nama_rek').escape().trim(),
			no_rek: req.sanitize('no_rek').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO rekening SET ?', rekening, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.render('tampil/rekening', {title: 'Masjid Muslim'})
					
				
				} else {				
					/*req.flash('success', 'Data added successfully!')
					res.render('tampil/rekening', {title: 'Masjid Muslim'})
				*/
				req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id)
								res.render('tampil/rekening', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								req.flash('success', 'Data added successfully!')
								res.render('tampil/rekening', {
									title: 'Data Rekening-Masjid Muslim', 
										
										id_admin1: rows2[0].id_admin,
										name_admin1: rows2[0].name_admin,
										pass_admin1: rows2[0].pass_admin,
										email_admin1: rows2[0].email_admin,
										no_hp_admin1: rows2[0].no_hp_admin					
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
       res.render('tampil/rekening', {title: 'Masjid Muslim'})
    }
})


// SHOW EDIT   FORM
app.get('/edit/(:id1)/(:id2)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM rekening WHERE id_rek_tujuan = ' + req.params.id1, function(err, rows, fields) {
			if(err) throw err
			
			// if  not found
			if (rows.length <= 0) {
				req.flash('error', '  not found with id = ' + req.params.id1)
				res.render('tampil/rekening', {title: 'Masjid Muslim'})
			}
			else { // if   found
				// render to views/ /edit.ejs template file
				/*res.render('tampil/edit_rekening', {
					title: 'Edit  ', 
					//data: rows[0],
					id_rek_tujuan: rows[0].id_rek_tujuan,
					nama_bank: rows[0].nama_bank,
					nama_rek: rows[0].nama_rek,
					no_rek: rows[0].no_rek
									
				})*/
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id2, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id2)
								res.render('tampil/rekening', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								
								res.render('tampil/edit_rekening', {
									title: 'Edit Data Rekening', 
										
										id_admin1: rows2[0].id_admin,
										name_admin1: rows2[0].name_admin,
										pass_admin1: rows2[0].pass_admin,
										email_admin1: rows2[0].email_admin,
										no_hp_admin1: rows2[0].no_hp_admin,

										id_rek_tujuan: rows[0].id_rek_tujuan,
										nama_bank: rows[0].nama_bank,
										nama_rek: rows[0].nama_rek,
										no_rek: rows[0].no_rek
														
								})
							}			
						})
				})
			}			
		})
	})
})

// EDIT   POST ACTION
app.put('/edit/(:id1)/(:id2)', function(req, res, next) {
	req.assert('nama_bank', 'nama_bank is required').notEmpty()           //Validate name
	req.assert('nama_rek', 'nama_rek is required').notEmpty()             //Validate   
    req.assert('no_rek', 'no_rek is required').notEmpty() 


    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body. name = '   a      ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize(' name').trim(); // returns 'a  '
		********************************************/
		var rekening = {
			nama_bank: req.sanitize('nama_bank').escape().trim(),
			nama_rek: req.sanitize('nama_rek').escape().trim(),
			no_rek: req.sanitize('no_rek').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE rekening SET ? WHERE id_rek_tujuan = ' + req.params.id1, rekening, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/rekening/add.ejs
					res.render('tampil/edit_rekening', {
						title: '   Guets',
						id_rek_tujuan: req.params.id_rek_tujuan,
						nama_bank: req.body.nama_bank,
						nama_rek: req.body.nama_rek,
						no_rek: req.body.no_rek
						
					})
				} else {
					/*req.flash('success', 'Data updated successfully!')
					
					// render to views/ /add.ejs
					res.render('tampil/rekening', {title: 'Masjid Muslim'})*/
				req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id2, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id2)
								res.render('tampil/rekening', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								req.flash('success', 'Data updated successfully!')
								res.render('tampil/rekening', {
									title: 'Data Rekening-Masjid Muslim', 
										
										id_admin1: rows2[0].id_admin,
										name_admin1: rows2[0].name_admin,
										pass_admin1: rows2[0].pass_admin,
										email_admin1: rows2[0].email_admin,
										no_hp_admin1: rows2[0].no_hp_admin					
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
        res.render('tampil/edit_rekening', { 
            title: '  rekening',            
						id_rek_tujuan: req.params.id_rek_tujuan,
						nama_bank: req.body.nama_bank,
						nama_rek: req.body.nama_rek,
						no_rek: req.body.no_rek
        })
    }
})

// DELETE  
app.delete('/delete/(:id1)/(:id2)', function(req, res, next) {
	var rekening = { id: req.params.id1 }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM rekening WHERE id_rek_tujuan = ' + req.params.id1, rekening, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to  s list page
				res.render('tampil/rekening', {title: 'Masjid Muslim'})
			} else {
				/*req.flash('success', '  deleted successfully! id = ' + req.params.id1)
				// redirect to  s list page
				res.render('tampil/rekening', {title: 'Masjid Muslim'})*/
				req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id2, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id2)
								res.render('tampil/rekening', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								req.flash('success', 'Data deleted successfully!')
								res.render('tampil/rekening', {
									title: 'Data Rekening-Masjid Muslim', 
										
										id_admin1: rows2[0].id_admin,
										name_admin1: rows2[0].name_admin,
										pass_admin1: rows2[0].pass_admin,
										email_admin1: rows2[0].email_admin,
										no_hp_admin1: rows2[0].no_hp_admin					
								})
							}			
						})
				})
			}
		})
	})
})

module.exports = app
