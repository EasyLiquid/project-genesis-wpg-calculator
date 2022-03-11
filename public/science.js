// функция расчёта науки
function calcScience() {
	
	// численность молодых
	let yngs = parseInput('youngs')
	
	// численность пожилых
	let elds = parseInput('elderlies')
	
	// модификатор точности знаний молодых
	let mod1 = parseInput('knowns_modifier1')
	
	// модификатор точности знаний пожилых
	let mod2 = parseInput('knowns_modifier2')
	
	// вывод количества науки
	$('science').value = round((Math.log(yngs) / Math.log(mod1)) + (Math.log(elds) / Math.log(mod2)), 2)
}

// первичное обновление количества науки
calcScience()