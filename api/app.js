


var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10; //gen add password+
var jwt = require('jsonwebtoken');
const secret = 'r7hazard_son-2022' //รหัสลับเรา token

app.use(cors())

const mysql = require('mysql2');
const { response } = require('express')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'com'
});



app.get('/g', (req, res) => {
  res.send('Hello World!')
})



app.post('/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    // execute will internally call prepare and query
    if (req.body.Password === req.body.Tmppassword) {
      connection.execute(
        'SELECT * FROM user WHERE Username=?',
        [req.body.Username],
        function (err, user, fields) {
          if (err) {
            res.json({ status: 'error', message: err });
            return
          }
          if (user.length === 0) {
            connection.execute(
              'SELECT * FROM user WHERE Mail=?',
              [req.body.Mail],
              function (err, Mail, fields) {
                if (err) {
                  res.json({ status: 'error', message: err });
                  return
                }
                if (Mail.length === 0) {
                  let tmp = new Date();
                  let text = tmp.toISOString();
                  let text2 = text.split('T')[0]
                  let role = "User"
                  connection.execute(
                    'INSERT INTO user ( Username, Password, Mail, Q1, Q2,date,Role) VALUES (?,?,?,?,?,?,?)',
                    [req.body.Username, hash, req.body.Mail, req.body.Q1, req.body.Q2, text2, role],
                    function (err, results, fields) {
                      if (err) {
                        res.json({ status: 'error', message: err })
                        return
                      }
                      res.json({ status: 'OK', results })
                    }
                  );

                  return
                }
                res.json({ status: 'error', message: 'Mail use already' })
              }
            );

            return
          }
          res.json({ status: 'error', message: 'Username use already' })
        }
      );


    }



    else {
      res.json({ status: 'error', message: 'Password Not Match' })
    }

  });
})





app.post('/login', jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM user WHERE Username=?',
    [req.body.Username],
    function (err, user, fields) {
      if (err) { res.json({ status: 'error', message: err }); return }

      if (user.length == 0) { res.json({ status: 'error', message: 'not found user' }); return }
      bcrypt.compare(req.body.Password, user[0].Password, function (err, isLogin) {
        var token
        if (isLogin) {
          token = jwt.sign({ Username: user[0].Username, date: user[0].date, Role: user[0].Role, Mail: user[0].Mail, Id: user[0].Id }, secret, { expiresIn: '1h' });
        }
        let tmp = new Date();
        let text = tmp.toISOString();
        // let text2 = text.split('T')[0]
        // let role = "User"

        let role = user[0].Role


        let state = isLogin
        console.log(req.body.Username);

        connection.execute(
          "INSERT INTO log (log_username,log_date,log_role,log_valid) VALUES (?,CONVERT_TZ(?,'+00:00','+7:00'),?,?)",
          [req.body.Username, text, role, state],
          function (err, results, fields) {


            if (err) {
              res.json({ status: 'error', message: err, results })
              return
            }
            if (isLogin) {
              // id += 1
              res.json({ status: 'OK', message: 'login success', token, user, results })
            } else {
              // id +=1

              res.json({ status: 'error', message: 'login failed', user, results })
            }
          }
        );

      });


    }
  );

})


app.post('/auth', jsonParser, function (req, res, next) {

  try {
    const token = req.headers.authorization.split(' ')[1] //split front   

    var decoded = jwt.verify(token, secret);
    res.json({ status: "OK", decoded })
    //res.json({decoded})
  } catch (err) {
    res.json({ status: "error", message: err.message })

  }

})




app.post('/auth2', jsonParser,function (req, res, next) {
  // try {
  //   const token = req.headers.authorization.split(' ')[1] //split front   

  //   var decoded = jwt.verify(token, secret);
  //   res.json({ status: "OK", decoded })
  //   //res.json({decoded})
  // } catch (err) {
  //   res.json({ status: "error", message: err.message })

  // }

  let sql = "SELECT * FROM log"
  connection.query(sql, function(error,data){
    if(error){
        throw error;
    }else{
      res.json({title:'Log moniter System',action:'list',log:data})
    }
  }
  )



})




// app.post('/forgot',jsonParser, function (req, res, next) {
//   connection.execute(
//     'SELECT * FROM user WHERE Mail=?',
//     // '๊UPDATE  FROM user SET Password =?',

//     [req.body.Mail],
//     function(err, user, fields) {
//       if(err){ res.json({status : 'error',message: err});  return}

//       if(user.length ==0) {res.json({status : 'error',message: 'not found user'});  return}
//       var c = false

//       }
//   );

// })



// app.post('/forgot2',jsonParser, function (req, res, next) {
//   connection.execute(

//     'UPDATE  FROM user SET Password =?',

//     [req.body.Mail],
//     function(err, user, fields) {
//       if(err){ res.json({status : 'error',message: err});  return}

//       if(user.length ==0) {res.json({status : 'error',message: 'not found user'});  return}
//       var c = false

//       var s =[];
//       s.compare(req.body.Password, user[0].Password, function(err,isLogin) {
//         if(isLogin){ 
//           var token = jwt.sign({ Username: user[0].Username }, secret,{ expiresIn: '1h' });
//           res.json({status: 'OK',message : 'login success',token })

//         }else{
//           res.json({status: 'error',message: 'login failed'})
//         }

//         });


//       }
//   );

// })



// app.post('/reset',jsonParser, function (req, res, next) {
//   const {Password,Mail} = req.body
//   bcrypt.hash(Password,saltRounds,(hash)=>{
//     connection.execute(`UPDATE user SET Password=? WHERE Mail = ?`,[hash,Mail],(err, user)=>{
//       try {
//         res.json({status : 'OK'})
//       } catch {
//         res.status(400).send( `Can't Update your password`)
//       }

//       // if(err){ res.json({status : 'error',message: err});  return}
//       // if(user.length ==0) {res.json({status : 'error',message: 'not found user'});  return}

//       // res.status(200).send("Update Succeeded")
//     })
//   })

//   // bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {


//   // connection.execute(

//   //   '๊UPDATE user SET Password =? WHERE Mail = ?',

//   //   [req.body.Password],[req.body.Mail],
//   //   function(err, user, fields) {
//   //     if(err){ res.json({status : 'error',message: err});  return}

//   //     if(user.length ==0) {res.json({status : 'error',message: 'not found user'});  return}


//   //     // bcrypt.compare(req.body.Password, user[0].Password, function(err,isLogin) {
//   //     //   if(isLogin){ 
//   //         // var token = jwt.sign({ Username: user[0].Username }, secret,{ expiresIn: '1h' });
//   //         // res.json({status: 'OK',message : 'login success',token })

//   //     //   }else{
//   //         // res.json({status: 'error',message: 'login failed'})
//   //     //   }

//   //     //   });
//   //     }
//   // );

// })

app.post("/forgot", jsonParser, function (req, res, next) {
  const { Mail, Q1, Q2 } = req.body
  console.log(Q1, Q2)

  const sql = "SELECT * FROM user WHERE Mail = ? AND Q1 = ? AND Q2 =?"

  connection.query(sql, [Mail, Q1, Q2], (err, result) => {
    if (err) { res.status(404).send({ msg: `Can't update`, err }) }
    else if (result.length === 0) {
      res.status(200).send({ msg: "Not found", result })
    }
    else if (result.length === 1) {
      const token = jwt.sign({ Mail: result[0].Mail, Id: result[0].Id }, secret, { expiresIn: '1h' });




      res.status(200).send({ msg: " found", result, token })
    } else {
      res.status(200).send({ msg: " Problem ", result })
    }

  })

})





app.post("/reset", jsonParser, function (req, res, next) {
  const { Password, Mail, Tmppassword } = req.body

  // if(req.body.Password === req.body.Tmppassword  ){
  let tmp = new Date();
  let text = tmp.toISOString();
  let text2 = text.split('T')[0]

  bcrypt.hash(Password, saltRounds, (err, hash) => {

    const sql = "UPDATE user SET Password=? ,date = ? WHERE Mail = ?"
    connection.query(sql, [hash, text2, Mail], (err, result) => {
      (err) ? res.status(404).send({ msg: `Can't update`, err })
        : res.status(200).send({ msg: "Update Password Succeeded", result })
    })
  }
  )
  // }

  // else{
  //   res.status(404).send({msg:`Password`,err})
  // }


})

















app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})