var express = require('express')
var app = express()

// SHOW LIST OF konfirmasi_bayar
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM konfirmasi_bayar ORDER BY id_bayar ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/konfirmasi_bayar1', {
					title: '  konfirmasi_bayar ', 
					data: ''
				})
			} else {
				// render to views/konfirmasi_bayar.ejs template file
				res.render('tampil/konfirmasi_bayar1', {
					title: '  konfirmasi_bayar ', 
					data: rows
				})
			}
		})
	})
})




//SELECT SUM(m1.jum_donasi) FROM konfirmasi_bayar m1 JOIN transaksi m2 ON m1.id_donasi= m2.id_donasi where m2.id_cpg=5

//SELECT m2.id_cpg FROM konfirmasi_bayar m1 JOIN transaksi m2 ON m1.id_donasi= m2.id_donasi where m2.id_donasi=2

// ADD NEW   POST ACTION
app.post('/add', function(req, res, next){	
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
		
				var id_donasi = req.body.id_donasi;
				//conn.query('SELECT * FROM admin WHERE email_admin = ?',[email],  function(err, rows, fields) {

		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO konfirmasi_bayar SET ?', konfirmasi_bayar, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('/konfirmasi_bayar1_')
					
				
				} else {				
					/*req.flash('success', 'Data added successfully!')
					res.redirect('/konfirmasi_bayar1_')	*/
						req.getConnection(function(error, conn) {
							conn.query('SELECT * FROM transaksi WHERE id_donasi = ?',[id_donasi], function(err, rows, fields) {
								//if(err) throw err
								if (err) {
									req.flash('error', err)
									res.render('tampil/konfirmasi_bayar1', {
										title: '  konfirmasi_bayar ', 
										data: ''
									})
								} else {
												
										//UPDATE `campaign` SET `income_cpg` = '70000' WHERE `campaign`.`id_cpg` = 5;
										//conn.query('UPDATE admin SET ? WHERE id_admin = ' + req.params.id1, admin, function(err, result) {
										//'UPDATE `campaign` SET `income_cpg` = ?',[jum],' WHERE `id_cpg` = ?',[id_cpg],
										var id_cpg = rows[0].id_cpg;
										req.getConnection(function(error, conn) {
											conn.query('SELECT sum(jum_donasi) AS jumlah FROM `view_laporan1` WHERE id_cpg = ?',[id_cpg], function(err, rows, fields) {
												//if(err) throw err
												if (err) {
													req.flash('error', err)
													res.render('tampil/konfirmasi_bayar1', {
														title: '  konfirmasi_bayar ', 
														data: ''
													})
												} else {
																
														var jum = rows[0].jumlah;
														req.getConnection(function(error, conn) {
															conn.query('UPDATE campaign SET income_cpg = ?',[jum],' WHERE id_cpg = ?',[id_cpg], function(err, rows, fields) {
																//if(err) throw err
																if (err) {
																	req.flash('error', err)
																	res.render('tampil/konfirmasi_bayar1', {
																		title: '  konfirmasi_bayar ', 
																		data: ''
																	})
																} else {
																		req.flash('success', 'Data added successfully!')
																		res.redirect('/konfirmasi_bayar1_')	
																		
																}
															})
														})	
														
												}
											})
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




module.exports = app

