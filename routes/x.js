  if (data) {   
      data.forEach(function(cpg){   
      
      
          
    
      })   
    }         

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
          if (data) {   
            data.forEach(function(cpg){   
            //SELECT sum(jum_donasi) FROM `view_laporan1` WHERE id_cpg=5
            //UPDATE `campaign` SET `income_cpg` = '70000' WHERE `campaign`.`id_cpg` = 5;
            
                
          
            })   
          }  
          
      }
    })
  })
})