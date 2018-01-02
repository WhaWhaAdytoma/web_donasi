var express = require('express')
var app = express()

// SHOW LIST OF transaksi
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM transaksi ORDER BY id_donasi ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/transaksi', {
					title: 'Transaksi ', 
					data: ''
				})
			} else {
				// render to views/transaksi.ejs template file
				res.render('tampil/transaksi', {
					title: 'Transaksi ', 
					data: rows
				})
			}
		})
	})
})


// SHOW ADD Transaksi FORM
app.get('/add', function(req, res, next){	
	// render to views/Transaksi/add.ejs
	res.render('tampil/transaksi', {
		title: 'Add New Transaksi',
		id_cpg: '',
		id_rek_tujuan: '',
		jum_donasi: '',	
		tanggal: ''	
	})
})

// ADD NEW Transaksi POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('id_cpg', 'id_cpg is required').notEmpty()           //Validate name
	req.assert('id_rek_tujuan', 'Rek_tujuan is required').notEmpty()             //Validate age
    req.assert('jum_donasi', 'A jumlah donasi is required').notEmpty()  //Validate 
    req.assert('tanggal', 'tanggal is required').notEmpty() 

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.Transaksiname = '   a Transaksi    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('Transaksiname').trim(); // returns 'a Transaksi'
		********************************************/
		var transaksi = {
			id_cpg: req.sanitize('id_cpg').escape().trim(),
			id_rek_tujuan: req.sanitize('id_rek_tujuan').escape().trim(),
			jum_donasi: req.sanitize('jum_donasi').escape().trim(),
			tanggal: req.sanitize('tanggal').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO transaksi SET ?', transaksi, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('/transaksi_')
					
				
				} else {				
					req.flash('success', 'Data added successfully!')
					res.redirect('/transaksi_')
				

					
				}
			})
		})
	}
	else {   //Display errors to Transaksi
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 

        res.redirect('/transaksi_')
    }
})


// SHOW EDIT Transaksi FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM transaksi WHERE id_donasi = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if Transaksi not found
			if (rows.length <= 0) {
				req.flash('error', 'Transaksi not found with id = ' + req.params.id)
				res.redirect('/transaksi_')
			}
			else { // if Transaksi found
				// render to views/Transaksi/edit.ejs template file
				res.render('tampil/edit_transaksi', {
					title: 'Edit Transaksi', 
					//data: rows[0],
					id_donasi: rows[0].id_donasi,
					id_cpg: rows[0].id_cpg,
					id_rek_tujuan: rows[0].id_rek_tujuan,
					jum_donasi: rows[0].jum_donasi,
					tanggal: rows[0].tanggal					
				})
			}			
		})
	})
})
	

// EDIT Transaksi POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('id_cpg', 'id_cpg is required').notEmpty()           //Validate name
	req.assert('id_rek_tujuan', 'Rek_tujuan is required').notEmpty()             //Validate age
    req.assert('jum_donasi', 'A jumlah donasi email is required').notEmpty()  //Validate 
    req.assert('tanggal', 'tanggal is required').notEmpty() 

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.Transaksiname = '   a Transaksi    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('Transaksiname').trim(); // returns 'a Transaksi'
		********************************************/
		var transaksi = {
			id_cpg: req.sanitize('id_cpg').escape().trim(),
			id_rek_tujuan: req.sanitize('id_rek_tujuan').escape().trim(),
			jum_donasi: req.sanitize('jum_donasi').escape().trim(),
			tanggal: req.sanitize('tanggal').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE transaksi SET ? WHERE id_donasi = ' + req.params.id, transaksi, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/transaksi/add.ejs
					res.render('tampil/edit_transaksi', {
						title: ' Transaksi ',
						id_donasi: req.params.id_donasi,
						id_cpg: req.body.id_cpg,
						id_rek_tujuan: req.body.id_rek_tujuan,
						jum_donasi: req.body.jum_donasi,
						tanggal: req.body.tanggal
					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/Transaksi/add.ejs
					res.redirect('/transaksi_')
				}
			})
		})
	}
	else {   //Display errors to Transaksi
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('tampil/edit_transaksi', { 
           			    title: ' Edit Transaksi ',
						id_donasi: req.params.id_donasi,
						id_cpg: req.body.id_cpg,
						id_rek_tujuan: req.body.id_rek_tujuan,
						jum_donasi: req.body.jum_donasi,
						tanggal: req.body.tanggal
        })
    }
})

// DELETE Transaksi
app.delete('/delete/(:id)', function(req, res, next) {
	var transaksi = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM transaksi WHERE id_donasi = ' + req.params.id, transaksi, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to Transaksis list page
				res.redirect('/transaksi_')
			} else {
				req.flash('success', 'Transaksi deleted successfully! id = ' + req.params.id)
				// redirect to Transaksis list page
				res.redirect('/transaksi_')
			}
		})
	})
})

module.exports = app
