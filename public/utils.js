// сокращение DOM
function $(id) {
	
	// возврат элемента
	if (typeof id === 'string') return document.getElementById(id)
}

// функция парсинга числовых полей
function parseInput(id) {
	
	// возврат числа
	if (typeof id === 'string') return parseFloat(document.getElementById(id).value)
}

// функция округления чисел
function round(number, afterComma) {
	
	// возврат округлённого значения
	if (typeof number === 'number' && typeof afterComma === 'number') return parseFloat(number.toFixed(afterComma))
}

// функция генерации случайных чисел
function randomNumber(min, max) {
	
	// возврат случайного числа
	if (typeof min === 'number' && typeof max === 'number') return Math.random() * (max - min) + min
}

// функция переключения меню
function toggleMenu(_number) {
	
	// если число
	if (typeof _number === 'number') {
		
		// перебор блоков
		for (let i = 1; i <= 3; i++) {
			
			// показ целевого блока
			if (i === _number) $('block' + i).hidden = false
			
			// скрытие остальных блоков
			if (i !== _number) $('block' + i).hidden = true
		}
	}
}