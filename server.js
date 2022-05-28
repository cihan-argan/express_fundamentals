//1.adım express dahil edildi
const express = require('express'); //express i dahil ettik
//7.adım middleware dahil edilecek
const { accessControl, defaultMiddleware } = require('./middleware'); //accesscontrolü middileware.js ten alıyoruz.
/*Bizim middleware fonksiyonlarımız 2 türlü kullanılabiliyor 1.si sadece o route a özgü middleware 2.side uygulama katmanında her routta kullanmak istediğimiz middlewarelerdir.onun için siz bunu uygulama katmanında kullanmak istiyorsanız bu routlarımızdan hemen önce bunu kullanmak zorundasınız bu örnekte biz app.get ten önce kullanacağız. middleware kullanmak için use metodunu kullanıyoruz.içine de dahil ettiğimiz accesControl veriliyor.başka routlarda olursa app.get gibi bir kaç tane daha rout varsa hepsinden önce bir kaç defa kullanabiliriz. her seferinde bu middleware ın çalışması gerekmektedir.*/
// 2.adım express in constructorından bir tane app oluşturduk
//5.adımda veri tabanı olmadığı için users isimli json veriler tutan bir değişken oluşturucaz
const users = [ { id: 1, name: 'Cihan Arğan', place: 'Ankara' }, { id: 2, name: 'Fazıl Say', place: 'Londra' } ];
const app = express();
/*3.adım web server hangi portta çalışacağını belirtmeliyiz.Not boş portları bulmak için cmd de 
*/

const PORT = 5040;

//expresse ait middleware dahil etmeliyiz.
app.use(express.json());

//8.adım middleware kullanımı
//app.use(accessControl); //uygulama kapsamında

/* Uygulama kapsamında middleware kullanıımı bu kadar şimdi rout kapsamında kullanıımı görmek istiyoruz burda ise bir rout daha oluşturucaz (/products).bizim get requestimiz iki  route içinde  uygulama kapsamında yazdığımız middleware çalışacak 
ancak birinde çalışsın diğerinde çalışmasın istiyorsak.. Fakat biz  /users ta kullanılsın istiyorsak app.get(“/users”,accessControl,(req,res,next) diyerek access Controlden geçersen users içindeki kod bloğu çalışsın demiş oluyoruz. Bu durumda middleware bu rout için çalışmış olacak. */

/************************************************************************************************************************ */
//6.adım get request
//http://localhost:5040/users yazarak istek atmış oluruz
app.get('/users', accessControl, defaultMiddleware, (req, res, next) => {
	//res.send('hello express');//text
	//res.send("<h1> Hello Express </h1>");//html
	res.json({
		success: true,
		data: users
	}); //json
});

// app.get('/products', (req, res, next) => {
// 	res.send('Hello Products');
// });
//************************************************************************************************* */
//9.ADIM POST REQUEST Not: Kontrolümüzü Postmanda POST seçerek yapıyoruz.
app.post('/users', (req, res, next) => {
	console.log(req.body); //Burda alıdğımız req.bodyi biz yukardaki verilerimizin arasına kaydetmeliyiz.
	const newdata = req.body;
	users.push(newdata);
	res.json({
		success: true,
		data: users
	});
});

/********************************************************************************************** */
//10.adım PUT  request users/1
app.put('/users/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	for (let i = 0; i < users.length; i++) {
		if (users[i].id === id) {
			users[i] = {
				...users[i], //users içinde gönderilen id ye ait eleman bilgileri gelecek
				...req.body //req body ile güncelenmesi istenen veriler güncellenecek.
			};
		}
	}
	res.json({
		success: true,
		data: users
	});
});

/************************************************************************************** */
//11-Delete request
app.delete('/users/:id', (req, res, next) => {
	const id = parseInt(req.params.id);

	for (let i = 0; i < users.length; i++) {
		if (users[i].id === id) {
			users.splice(i, 1);
		}
	}
	res.json({
		success: true,
		data: users
	});
});
/********************************************************************************************************* */
//4.adım artık bu uygulamanın verdiğimiz portta çalışmasını sağlamalıyız.
app.listen(PORT, () => {
	console.log('Server Started PORT : ' + PORT);
});
//Bu şekilde basit bir şekilde serverımızı oluşturmuş olduk bu serverımızı çalıştırmak için npm run dev diyerek çalıştırıcaz
