// функция расчёта общей стоимости
function calcProduction() {
	
	// численность населения
	let pop = parseInput('population')
	
	// средства труда
	let mean = parseInput('mean_labs')
	
	// модификатор технологий
	let tech = parseInput('technologies')
	
	// модификатор потребления
	let modCons = parseInput('mod_consumption')
	
	// расчёт общей стоимости
	let prod = tech * (mean + (Math.log(pop) / Math.log(modCons)))
	
	// расчёт потребительной стоимости
	let cons = pop * modCons
	
	// вывод общей стоимости
	$('production').value = round(prod, 2)
	
	// вывод потребительной стоимости
	$('consumption').value = round(cons, 2)
	
	// вывод резервной стоимости
	$('reserve').value = round(prod - cons, 2)
}

// функция обновления хода
function nextStep() {
	
	// текущее количество ресурсов
	let res = parseInput('resources')
	
	// общая стоимость
	let prod = parseInput('production')
	
	// расчёт остатка ресурсов
	res -= prod
	
	// вывод остатка ресурсов
	$('resources').value = round(res, 2)
}

// первичное обновление параметров
calcProduction()