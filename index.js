// подключение koa
const koa = require('koa')

// подключение koa-router
const router = require('koa-router')()

// подключение koa-static
const serve = require('koa-static')

// подключение модуля файловой системы
const fs = require('fs')

// инициализация koa
const app = new koa()

// номер порта
const PORT = process.env.PORT || 3000

// middleware для статических файлов
app.use(serve(__dirname + '/public'))

// основной маршрут
router.get('/', async (ctx) => {
	
	// тип ответа
	ctx.type = 'html'
	
	// отправка веб-страницы
	ctx.body = await fs.createReadStream('index.html')
})

// middleware для маршрутизации
app.use(router.routes())

// middleware для отлова ошибок
app.use(async (next) => {
	
	// попытка
	try {
		
		// вызов следующей функции
		await next()
		
	// выброс исключения
	} catch(err) {
		
		// статус ответа
		this.status = err.statusCode || err.status || 500
		
		// тело ответа
		this.body = err.message
	}
})

// запуск сервера
app.listen(PORT, () => {
	
	// лог
	console.log(`Запускаю сервер на порте ${PORT}!`)
})