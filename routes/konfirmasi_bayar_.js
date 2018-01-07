var express = require('express')
var app = express()

// SHOW LIST OF konfirmasi_bayar
app.get('/(:id)', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM konfirmasi_bayar ORDER BY id_bayar ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/konfirmasi_bayar', {
					title: '  konfirmasi_bayar ', 
					data: ''
				})
			} else {
				// render to views/konfirmasi_bayar.ejs template file
				/*res.render('tampil/konfirmasi_bayar', {
					title: '  konfirmasi_bayar ', 
					data: rows
				})*/
				req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id)
								res.render('tampil/konfirmasi_bayar', {title: 'Masjid Muslim'})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								res.render('tampil/konfirmasi_bayar', {
									title: 'Konfirmasi Bayar', 
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





// ADD NEW   POST ACTION
app.post('/add/(:id)', function(req, res, next){	
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
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO konfirmasi_bayar SET ?', konfirmasi_bayar, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.render('tampil/konfirmasi_bayar', {title: 'Masjid Muslim'})
					
				
				} else {				
					/*req.flash('success', 'Data added successfully!')
					res.redirect('/konfirmasi_bayar_')		*/
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id)
								res.render('tampil/campaign', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								req.flash('success', 'Data added successfully!')
								res.render('tampil/konfirmasi_bayar', {
									title: 'Konfirmasi Bayar', 
										//data: rows,
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
        res.render('tampil/konfirmasi_bayar', {title: 'Masjid Muslim'})
    }
})


// SHOW EDIT   FORM
app.get('/edit/(:id1)/(:id2)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM konfirmasi_bayar WHERE id_bayar = ' + req.params.id1, function(err, rows, fields) {
			if(err) throw err
			
			// if   not found
			if (rows.length <= 0) {
				req.flash('error', '  not found with id = ' + req.params.id1)
				res.render('tampil/konfirmasi_bayar', {title: 'Masjid Muslim'})
			}
			else { // if   found
				// render to views/ /edit.ejs template file
				/*res.render('tampil/edit_konfirmasi_bayar', {
						
				})*/
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id2, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id2)
								res.render('tampil/campaign', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								req.flash('success', 'Data added successfully!')
								res.render('tampil/edit_konfirmasi_bayar', {
									title: 'Edit  konfirmasi Bayar', 
										//data: rows[0],
										id_bayar: rows[0].id_bayar,
										id_donasi: rows[0].id_donasi,
										nama_donatur: rows[0].nama_donatur,
										email_donatur: rows[0].email_donatur,
										no_hp_donatur: rows[0].no_hp_donatur,
										id_rek_tujuan: rows[0].id_rek_tujuan,
										rek_donatur: rows[0].rek_donatur,
										jum_donasi: rows[0].jum_donasi,
										tanggal: rows[0].tanggal,	
										
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

// EDIT   POST ACTION
app.put('/edit/(:id1)/(:id2)', function(req, res, next) {
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
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE konfirmasi_bayar SET ? WHERE id_bayar = ' + req.params.id1, konfirmasi_bayar, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/konfirmasi_bayar/add.ejs
					res.render('tampil/edit_konfirmasi_bayar', {
						title: '   konfirmasi bayar',
						id_bayar: req.params.id_bayar,
						id_donasi: req.body.id_donasi,
						nama_donatur: req.body.nama_donatur,
						email_donatur: req.body.email_donatur,
						no_hp_donatur: req.body.no_hp_donatur,
						id_rek_tujuan: req.body.id_rek_tujuan,
						rek_donatur: req.body.rek_donatur,
						jum_donasi: req.body.jum_donasi,
						tanggal: req.body.tanggal
					})
				} else {
					/*req.flash('success', 'Data updated successfully!')
					
					// render to views/ /add.ejs
					res.redirect('/konfirmasi_bayar_')*/
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id2, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id2)
								res.render('tampil/campaign', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views/admin/edit.ejs template file
								req.flash('success', 'Data updated successfully!')
								res.render('tampil/konfirmasi_bayar', {
									title: 'Konfirmasi Bayar', 
										//data: rows,
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
        res.render('tampil/edit_konfirmasi_bayar', { 
            title: '   konfirmasi bayar',
						id_bayar: req.params.id_bayar,
						id_donasi: req.body.id_donasi,
						nama_donatur: req.body.nama_donatur,
						email_donatur: req.body.email_donatur,
						no_hp_donatur: req.body.no_hp_donatur,
						id_rek_tujuan: req.body.id_rek_tujuan,
						rek_donatur: req.body.rek_donatur,
						jum_donasi: req.body.jum_donasi,
						tanggal: req.body.tanggal
        })
    }
})

// DELETE  
app.delete('/delete/(:id1)/(:id2)', function(req, res, next) {
	var konfirmasi_bayar = { id: req.params.id1 }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM konfirmasi_bayar WHERE id_bayar = ' + req.params.id1, konfirmasi_bayar, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to  s list page
				res.render('tampil/konfirmasi_bayar', {title: 'Masjid Muslim'})
			} else {
				/*req.flash('success', '  deleted successfully! id = ' + req.params.id)
				// redirect to  s list page
				res.redirect('/konfirmasi_bayar_')*/
					req.getConnection(function(error, conn) {
						conn.query('SELECT * FROM admin WHERE id_admin = ' + req.params.id2, function(err, rows2, fields) {
							if(err) throw err
							
							// if admin not found
							if (rows.length <= 0) {
								req.flash('error', 'User not found with id = ' + req.params.id2)
								res.render('tampil/campaign', {
									title: 'Masjid Muslim'
												
								})
							}
							else { // if admin found
								// render to views//edit.ejs template file
								req.flash('success', 'Data deleted successfully!')
								res.render('tampil/konfirmasi_bayar', {
									title: 'Konfirmasi Bayar', 
										//data: rows,
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
