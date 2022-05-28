const accessControl = (req, res, next) => {
	//console.log('Middleware : Acccess Control');
	const access = true;
	if (!access) {
		res.status(401).json({
			success: false,
			message: 'You are not authorized.'
			//Dediğimizde istek gönderdiğimizde  access false ise burda yolladığımız res.json içindeki çıktıyı alırız. Hatamızı başarılı şekilde aldık next demedi.server.js içine ulaştırmadan middleware içinden döndürmüş olduk.access true olsaydı next() çalışacaktı.
			//Not2: bizim hata dahi alsak status değerimiz 200 OK geliyor ama biz bunu değiştire biliyoruz.res.status().json() diyerek json çıktısından önce status değerimizi biz verebiliriz. status(401) diyerek hataya uygun status gönderebiliriz.
		});
	}
	next();
};
//ana yapısı budur daha sonra ben server.js de kullanacağım için ilk başta burda export etmem gerekiyor.
const defaultMiddleware = (req, res, next) => {
	console.log('Default Middleware');
	next();
};
module.exports = {
	accessControl,
	defaultMiddleware
};
//sonra sever.js içinde kullanıcaz.

//NOT: Eğer next kullanılmasaydı bizim middleware içindeki fonk çalışırdı ama bir response dönemezdi bu yüzden sürekli request sending de takılı kalırdı.
