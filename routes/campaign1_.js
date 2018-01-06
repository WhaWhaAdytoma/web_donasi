var express = require('express')
var app = express()

// SHOW LIST OF campaign1
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM campaign ORDER BY id_cpg ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/campaign1', {
					title: ' Data Campaign ', 
					data: ''
				})
			} else {
				// render to views/campaign1.ejs template file
				res.render('tampil/campaign1', {
					title: ' Data Campaign ', 
					data: rows
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
				if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('/campaign1_' )
					
				
				} else {				
					req.flash('success', 'Data added successfully!')
					req.getConnection(function(error, conn) {
							conn.query('SELECT m1.tanggal, m1.id_donasi, m2.nama_bank, m2.no_rek, m1.jum_donasi FROM transaksi m1 JOIN rekening m2 ON m1.id_rek_tujuan= m2.id_rek_tujuan order by id_donasi desc limit 1',function(err, rows, fields) {
								//if(err) throw err
								// if  not found
								if (rows.length <= 0) {
									req.flash('error')
									res.redirect('/campaign1_/detail/'+req.sanitize('id_cpg').escape().trim() )
								}
								else { // if  found
									// render to views/admin/edit.ejs template file
									res.render('tampil/donate_campaign1', {
										title: 'Donate', 
										//data: rows[0],
										tanggal: rows[0].tanggal,
										id_donasi: rows[0].id_donasi,
										nama_bank: rows[0].nama_bank,
										no_rek: rows[0].no_rek,	
										jum_donasi: rows[0].jum_donasi				
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

        res.redirect('/campaign1_')
    }
})

module.exports = app
