var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const cors = require('cors')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const fs = require('fs');
const path = require("path")
const configg=require('./config.js')
var md5 = require('md5');
// let rawdata = fs.readFileSync('./config.json');
// let config = JSON.parse(rawdata);
var connection = mysql.createConnection({
	host     : configg.MYSQL_ADDRESS,
	user     : configg.MYSQL_USERNAME,
	password : configg.MYSQL_PASSWORD,
	database : configg.MYSQL_DATABASE
});
const secretKey=configg.SECRET_KEY
var app = express();
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	cookie: {
		maxAge: 600000,
		secure: true
	},
	saveUninitialized: false,
	resave: false,
	saveUninitialized: true
}));
app.use(cors({
    credentials:true,
    origin: configg.CORS_ORIGIN,
	methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
 	exposedHeaders: ['set-cookie']
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));

app.post('/aktar', function (request, response) {
	const talepEden = request.body.talepEden;
	const projeAdi = request.body.projeAdi;
	const projeSorumlusu = request.body.projeSorumlusu;
	const urunAdi = request.body.urunAdi;
	const urunAciklamasi = request.body.urunAciklamasi;
	const birimFiyat = request.body.birimFiyat;
	const adet = request.body.adet;
	const toplamFiyat = request.body.toplamFiyat;
	const teslimTarihi = request.body.teslimTarihi;
	const link = request.body.link;

	connection.query(
		'INSERT INTO talepler (talepEden,projeAdi,projeSorumlusu,urunAdi,urunAciklama,birimFiyat,adet,toplamFiyat,teslimTarihi,link) VALUES (?,?,?,?,?,?,?,?,?,?)',
		[talepEden, projeAdi, projeSorumlusu, urunAdi, urunAciklamasi, birimFiyat, adet,toplamFiyat, teslimTarihi, link], function (error, results, fields) {
			if (error) throw error;
		})
})

app.post('/kayit', function (request, response) {
	const userName = request.body.username;
	const password =md5(request.body.password);
	const name = request.body.name;
	const yetki = request.body.yetki;
	connection.query(
		'INSERT INTO accounts (username,password,name,yetki) VALUES (?,?,?,?)',
		[userName, password, name, yetki], function (error, results, fields) {
			if (error) {
				response.json({
					errNo: error.errno
				})
			}
			else {
				response.json({
					errNo: 0
				})
			}
		})
})



app.post('/onayla', function (request, response) {
	const id = request.body.id;
	const name = request.body.name;

	connection.query('UPDATE talepler SET onay = 1 , onaylayan = ? WHERE id = ?',[name,id], function (error, results, fields) {
		if (error) throw error;
		response.json({
			results: results,
			err : error
		})
		})
})

app.post('/tamamla', function (request, response) {
	const id = request.body.id;

	connection.query('UPDATE talepler SET durum = 2  WHERE id = ?',[id], function (error, results, fields) {
		if (error) throw error;
		response.json({
			results: results,
			err : error
		})
		})
})

app.post('/durum', function (request, response) {
	const id = request.body.id;
	const durum = request.body.durum;
	connection.query(
		'UPDATE talepler SET durum = '+durum+' WHERE id = '+id, function (error, results, fields) {
			if (error) throw error;
		})
})

app.post('/auth', function (request, response) {
	const username = request.body.userName;
	const password = md5(request.body.password);
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				request.session.save();
				debugger;
                const payload = {
					id: results[0].id,
					name: results[0].name,
					yetki :results[0].yetki
                }
                const token = jwt.sign(payload, md5(secretKey))
                const cookies = new Cookies(request, response);
                cookies.set("userToken", token, {httpOnly: true});
                response.json({
                    error:0,
                    message:"Successful login",
					token: token,
					user : results
                })
			} else {
				request.session.loggedin = false;
                response.json({
                    error:1,
                    message:"Incorrect Username and/or Password!"
				})
			}
		});
	} else {
		request.session.loggedin = false;
        response.json({
            error:2,
            message:"Please enter Username and Password!"
        })
	}
});

app.get('/data', function(request, response) {
	connection.query('SELECT * FROM talepler', function (error, results, fields) {
		console.log(error)
			if (results.length > 0) {
				response.json(results)

			} else {
				request.session.loggedin = false;
                response.json([])
			}
		});
});

app.get('/getir/:username', function (request, response) {
	const username = request.params.username;
	if (username) {
		connection.query('SELECT * FROM accounts WHERE username = ? ', [username], function (error, results, fields) {
			if (results.length > 0) {
				response.json({
					error: 0,
					message: "Successful",
					username: results[0].username,
					name: results[0].name,
					yetki : results[0].yetki
				})
			} else {
				request.session.loggedin = false;
				response.json({
					error: 1,
					message: "Şifre Yanlışd",
					result: results
				})
			}
			response.end();


		});
	}
});

app.post('/sifredegistir', function (request, response) {
	const id = request.body.id;
	const password = md5(request.body.password);
	const newpassword = md5(request.body.newpassword);
	if (id && password && newpassword) {
		connection.query('SELECT * FROM accounts WHERE id = ? AND password = ?', [id, password], function (error, results, fields) {
			if (results.length > 0) {
				connection.query('UPDATE accounts SET password =? WHERE id =?', [newpassword, id], function (error, results, fields) {
					if (error) throw error;
				})
				response.json({
					error: 0,
					message: "Successful",
				})
			} else {
				request.session.loggedin = false;
				response.json({
					error: 1,
					message: "Şifre Yanlış",
					result: results
				})
				// response.send('Incorrect Username and/or Password!');
			}
			// response.end();


		});
	}
});

app.post('/yetkidegistir', function (request, response) {
	const username = request.body.username;
	const yetki = request.body.yetki;
	if (username && yetki) {
		connection.query('SELECT * FROM accounts WHERE username = ? ', [username], function (error, results, fields) {
			if (results.length > 0) {
				connection.query('UPDATE accounts SET yetki = ? WHERE username = ?', [yetki, username], function (error, results, fields) {
					if (error) throw error;
				})
				response.json({
					error: 0,
					message: "Successful",
				})
			} else {
				request.session.loggedin = false;
				response.json({
					error: 1,
					message: "Kullanıcı adı yanlış",
					result: results
				})
			}


		});
	}
});


app.post('/sifresifirla', function (request, response) {
	const username = request.body.username;
	const sifre = md5(configg.DEFAULT_USER_PASSWORD);
	if (username && sifre) {
		connection.query('SELECT * FROM accounts WHERE username = ? ', [username], function (error, results, fields) {
			if (results.length > 0) {
				connection.query('UPDATE accounts SET password = ? WHERE username = ?', [sifre, username], function (error, results, fields) {
					if (error) throw error;
				})
				response.json({
					error: 0,
					message: "Successful",
				})
			} else {
				request.session.loggedin = false;
				response.json({
					error: 1,
					message: "Kullanıcı adı Yanlış",
					result: results
				})
				// response.send('Incorrect Username and/or Password!');
			}
			// response.end();


		});
	}
});


const loginMiddleware = (req, res, next) => {
	const tokenNotParsed = req.headers.authorization;
	const parse = tokenNotParsed.split("Bearer ");
	const token = parse[1];
	if (!token) {
		return res.json({ error: 1 })
	}
	try {
		const verify = jwt.verify(token, md5(secretKey));
		if (verify) {
			req.user = verify;
			next();
		}
		else {
			res.json({ error: 1 })
		}
	}
	catch (err) {
		return res.json({ error: 1 })
	}
};
app.get("/privateApi", loginMiddleware, (req, res) => {
	const user = req.user;
	res.json({ privateData: 'Success' })
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.get("/static/*", (req, res) => {
	 console.log(req.url)
	res.sendFile(path.join(__dirname, "public", req.url));
 })
app.listen(configg.PORT,()=>{
	console.log('3005 de aktif')
		const payload = {
					id: 0,
					name: 'ADMIN',
					yetki :3
                }
	const token = jwt.sign(payload, md5(secretKey))
	console.log(token)
});

function initial() {
	const userName = 'admin';
	const password =md5('admin');
	const name = 'ADMIN';
	const yetki = 3;
	connection.query('SELECT * FROM accounts WHERE yetki = '+3, function (error, results, fields) {
			if (results.length > 0) {
			} else {
				connection.query(
		'INSERT INTO accounts (username,password,name,yetki) VALUES (?,?,?,?)',
		[userName, password, name, yetki], function (error, results, fields) {
			if(!error) console.log('Admin kullanıcısı oluşturuldu!')
		})
			}
		});
}

connection.connect( function () {
	initial();
})
