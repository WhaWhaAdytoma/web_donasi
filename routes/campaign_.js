var express = require('express')
var app = express()

// SHOW LIST OF campaign
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM campaign ORDER BY id_cpg ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('tampil/campaign', {
					title: ' Data campaign ', 
					data: ''
				})
			} else {
				// render to views/campaign.ejs template file
				res.render('tampil/campaign', {
					title: ' Data campaign ', 
					data: rows
				})
			}
		})
	})
})



// SHOW ADD campaign FORM
app.get('/add', function(req, res, next){	
	// render to views/campaign/add.ejs
	res.render('tampil/campaign', {
		title: 'Add New campaign',
		judul_cpg: '',
		desc_cpg: '',
		foto_cpg: '',	
		start_cpg: '',	
		deadline_cpg: '',
		target_cpg: '',	
		income_cpg: '',
		alamat: '',
		kontak_dkm: ''
		
	})
})

// ADD NEW campaign POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('judul_cpg', 'judul_cpg is required').notEmpty()           
	req.assert('desc_cpg', 'desc_cpg is required').notEmpty()            
    req.assert('foto_cpg', 'foto_cpg is required').notEmpty()  
    req.assert('start_cpg', 'start_cpg is required').notEmpty() 
    req.assert('deadline_cpg', 'deadline_cpg is required').notEmpty()           
	req.assert('target_cpg', 'target_cpg is required').notEmpty()            
    req.assert('income_cpg', 'income_cpg is required').notEmpty()  
    req.assert('alamat', 'alamat is required').notEmpty()
    req.assert('kontak_dkm', 'kontak_dkm is required').notEmpty()

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.campaignname = '   a campaign    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('campaignname').trim(); // returns 'a campaign'
		********************************************/
		var campaign = {
			judul_cpg: req.sanitize('judul_cpg').escape().trim(),
			desc_cpg: req.sanitize('desc_cpg').escape().trim(),
			foto_cpg: req.sanitize('foto_cpg').escape().trim(),	
			start_cpg: req.sanitize('start_cpg').escape().trim(),	
			deadline_cpg: req.sanitize('deadline_cpg').escape().trim(),
			target_cpg: req.sanitize('target_cpg').escape().trim(),	
			income_cpg: req.sanitize('income_cpg').escape().trim(),
			alamat: req.sanitize('alamat').escape().trim(),
			kontak_dkm: req.sanitize('kontak_dkm').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO campaign SET ?', campaign, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.redirect('/campaign_')
				} else {				
					req.flash('success', 'Data added successfully!')				
				    res.redirect('/campaign_')
				}
			})
		})
	}
	else {   //Display errors to campaign
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		 res.redirect('/campaign_')
		
    }
})


// SHOW EDIT campaign FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM campaign WHERE id_cpg = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			// if campaign not found
			if (rows.length <= 0) {
				req.flash('error', 'campaign not found with id = ' + req.params.id)
				res.redirect('/campaign_')
			}
			else { // if campaign found
				// render to views/campaign/edit.ejs template file
				res.render('tampil/edit_campaign', {
					title: 'Edit campaign', 
					//data: rows[0],
					id: rows[0].id_cpg,
					judul_cpg: rows[0].judul_cpg,
					desc_cpg: rows[0].desc_cpg,
					foto_cpg: rows[0].foto_cpg,	
					start_cpg: rows[0].start_cpg,	
					deadline_cpg: rows[0].deadline_cpg,
					target_cpg: rows[0].target_cpg,	
					income_cpg: rows[0].income_cpg,
					alamat: rows[0].alamat,
					kontak_dkm: rows[0].kontak_dkm
						
				})
			}			
		})
	})
})

// EDIT campaign POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('judul_cpg', 'judul_cpg is required').notEmpty()           
	req.assert('desc_cpg', 'desc_cpg is required').notEmpty()            
    req.assert('foto_cpg', 'foto_cpg is required').notEmpty()  
    req.assert('start_cpg', 'start_cpg is required').notEmpty() 
    req.assert('deadline_cpg', 'deadline_cpg is required').notEmpty()           
	req.assert('target_cpg', 'target_cpg is required').notEmpty()            
    req.assert('income_cpg', 'income_cpg is required').notEmpty()  
    req.assert('alamat', 'alamat is required').notEmpty()
    req.assert('kontak_dkm', 'kontak_dkm is required').notEmpty() 

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.campaignname = '   a campaign    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('campaignname').trim(); // returns 'a campaign'
		********************************************/
		var campaign = {
			judul_cpg: req.sanitize('judul_cpg').escape().trim(),
			desc_cpg: req.sanitize('desc_cpg').escape().trim(),
			foto_cpg: req.sanitize('foto_cpg').escape().trim(),	
			start_cpg: req.sanitize('start_cpg').escape().trim(),	
			deadline_cpg: req.sanitize('deadline_cpg').escape().trim(),
			target_cpg: req.sanitize('target_cpg').escape().trim(),	
			income_cpg: req.sanitize('income_cpg').escape().trim(),
			alamat: req.sanitize('alamat').escape().trim(),
			kontak_dkm: req.sanitize('kontak_dkm').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE campaign SET ? WHERE id_cpg = ' + req.params.id, campaign, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/campaign/add.ejs
					res.render('tampil/edit_campaign', {
						title: ' campaign Guets',
						id: req.params.id,
						judul_cpg: req.params.judul_cpg,
						desc_cpg: req.params.desc_cpg,
						foto_cpg: req.params.foto_cpg,	
						start_cpg: req.params.start_cpg,	
						deadline_cpg: req.params.deadline_cpg,
						target_cpg: req.params.target_cpg,	
						income_cpg: req.params.income_cpg,
						alamat: req.params.alamat,
						kontak_dkm: req.params.kontak_dkm
						
					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/campaign/add.ejs
					res.redirect('/campaign_')
				}
			})
		})
	}
	else {   //Display errors to campaign
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('tampil/edit_campaign', { 
            title: 'campaign campaign',            
			id: req.params.id,
			judul_cpg: req.params.judul_cpg,
			desc_cpg: req.params.desc_cpg,
			foto_cpg: req.params.foto_cpg,	
			start_cpg: req.params.start_cpg,	
			deadline_cpg: req.params.deadline_cpg,
			target_cpg: req.params.target_cpg,	
			income_cpg: req.params.income_cpg,
			alamat: req.params.alamat,
			kontak_dkm: req.params.kontak_dkm
        })
    }
})

// DELETE campaign
app.delete('/delete/(:id)', function(req, res, next) {
	var campaign = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM campaign WHERE id_cpg = ' + req.params.id, campaign, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to campaigns list page
				res.redirect('/campaign_')
			} else {
				req.flash('success', 'campaign deleted successfully! id = ' + req.params.id)
				// redirect to campaigns list page
				res.redirect('/campaign_')
			}
		})
	})
})

module.exports = app
