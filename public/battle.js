// массив id базовых параметров
let baseParams = ['count', 'strong', 'agility', 'speed', 'accuracy', 'armor', 'endurance']

// массив id производных параметров
let addParams = ['modifier', 'evasion', 'hit']

// нападающий отряд
let squad1 = {}

// защищающийся отряд
let squad2 = {}

// функция переключения типа боя
function toggleTypeBattle() {
	
	// если ближний бой
	if ($('type_battle').value === 'melee') {
		
		// перебор элементов
		for (let i = 0; i < 2; i++) {
			
			// показ элементов
			$('melee' + i).hidden = false
			
			// скрытие элементов
			$('ranged' + i).hidden = true
		}
		
		// прерывание функции
		return
	}
	
	// если дальний бой
	if ($('type_battle').value === 'ranged') {
		
		// перебор элементов
		for (let i = 0; i < 2; i++) {
			
			// показ элементов
			$('ranged' + i).hidden = false
			
			// скрытие элементов
			$('melee' + i).hidden = true
		}
	}
}

// функция проверки корректности параметров
function checkParams() {
	
	// перебор базовых параметров
	for (let i = 0; i < baseParams.length; i++) {
		
		// если параметр не введён
		if (isNaN(parseInput(baseParams[i] + 1)) || isNaN(parseInput(baseParams[i] + 2))) {
			
			// сообщение
			alert('Пожалуйста, введите все параметры!')
			
			// возврат true
			return true
		}
	}
}

// функция обновления объекта отряда
function updateSquad() {
	
	// перебор базовых параметров
	baseParams.forEach((item) => {
		
		// параметр нападающего отряда
		squad1[item] = parseInput(item + 1)
		
		// параметр защищающегося отряда
		squad2[item] = parseInput(item + 2)
	})
	
	// модификатор урона нападающего отряда
	$('modifier1').value = calcModifier(squad1, squad2)
	
	// модификатор урона защищающегося отряда
	$('modifier2').value = calcModifier(squad2, squad1)
	
	// шанс уклонения нападающего отряда
	$('evasion1').value = calcEvasion(squad1, squad2)
	
	// шанс уклонения защищающегося отряда
	$('evasion2').value = calcEvasion(squad2, squad1)
	
	// шанс попадания нападающего отряда
	$('hit1').value = calcHit(squad1, squad2)
	
	// шанс попадания защищающегося отряда
	$('hit2').value = calcHit(squad2, squad1)
	
	// перебор производных параметров
	addParams.forEach((item) => {
		
		// параметр нападающего отряда
		squad1[item] = parseInput(item + 1)
		
		// параметр защищающегося отряда
		squad2[item] = parseInput(item + 2)
	})
}

// функция генерации случайных базовых параметров
function randomParams() {
	
	// перебор базовых параметров
	baseParams.forEach((item) => {
		
		// генерация значения для брони
		if (item === 'armor') {
			
			// нападающий отряд
			$(item + 1).value = round(randomNumber(0.01, 0.99), 2)
			
			// защищающийся отряд
			$(item + 2).value = round(randomNumber(0.01, 0.99), 2)
		}
		
		// генерация значения для остальных параметров
		if (item !== 'armor') {
			
			// нападающий отряд
			$(item + 1).value = round(randomNumber(1, 100), 0)
			
			// защищающийся отряд
			$(item + 2).value = round(randomNumber(1, 100), 0)
		}
	})
	
	// плотность стрельбы
	$('density').value = round(randomNumber(0.01, 1), 2)
	
	// обновление объектов отрядов
	updateSquad()
}

// функция перестановки отрядов
function reverseParams() {
	
	// проверка параметров
	if (checkParams()) return
	
	// перебор базовых параметров
	baseParams.forEach((item) => {
		
		// назначение параметра 1
		$(item + 1).value = squad2[item]
		
		// назначение параметра 2
		$(item + 2).value = squad1[item]
	})
	
	// перебор производных параметров
	addParams.forEach((item) => {
		
		// назначение параметра 1
		$(item + 1).value = squad2[item]
		
		// назначение параметра 2
		$(item + 2).value = squad1[item]
	})
	
	// обновление объектов отрядов
	updateSquad()
}

// функция расчёта номинального здоровья отряда
function calcHealth(squad) {
	
	// возврат номинального здоровья отряда
	return (squad.endurance * (1 + squad.armor)) * squad.count
}

// функция расчёта шанса уклонения отряда
function calcEvasion(squad1, squad2) {
	
	// возврат шанса уклонения
	return round(squad1.agility / (squad1.agility + squad2.speed), 2)
}

// функция расчёта шанса попадания отряда
function calcHit(squad1, squad2) {
	
	// возврат шанса попадания
	return round(squad1.accuracy / (squad1.accuracy + squad2.speed), 2)
}

// функция расчёта модификатора атаки
function calcModifier(squad1, squad2) {
	
	// возврат модификатора атаки
	return round((squad1.speed + squad1.agility) / (squad2.speed + squad2.agility), 2)
}

// функция расчёта урона отряда в ближнем бою
function calcDamage1(squad1, squad2) {
	
	// возврат урона
	return Math.round((squad1.strong * squad1.modifier * (1 - squad2.armor)) * squad1.count)
}

// функция расчёта урона отряда в дальнем бою
function calcDamage2(squad1, squad2) {
	
	// возврат урона
	return Math.round(((squad1.strong * (1 - squad2.armor) * squad1.count) / squad2.count) / parseInput('density'))
}

// функция расчёта результатов боя
function battle() {
	
	// проверка параметров
	if (checkParams()) return
	
	// если ближний бой
	if ($('type_battle').value === 'melee') {
		
		// урон
		let damage1 = calcDamage1(squad1, squad2)
		let damage2 = calcDamage1(squad2, squad1)
		
		// бросок на уклонение
		let evasion1 = Math.random() < squad1.evasion ? true : false
		let evasion2 = Math.random() < squad2.evasion ? true : false
		
		// уклонение
		if (evasion1) damage2 = 0
		if (evasion2) damage1 = 0
		
		// оставшееся здоровье
		let health1 = calcHealth(squad1) - damage2
		let health2 = calcHealth(squad2) - damage1
		
		// ограничение урона
		if (health1 < 0) health1 = 0
		if (health2 < 0) health2 = 0
		
		// потерянные юниты
		let lostUnits1 = Math.round(((calcHealth(squad1) - health1) / squad1.endurance) / (1 + squad1.armor))
		let lostUnits2 = Math.round(((calcHealth(squad2) - health2) / squad2.endurance) / (1 + squad2.armor))
		
		// оставшиеся юниты
		let countUnits1 = Math.round((health1 / (1 + squad1.armor)) / squad1.endurance)
		let countUnits2 = Math.round((health2 / (1 + squad2.armor)) / squad2.endurance)
		
		// запись в объект отряда
		squad1.count = countUnits1
		squad2.count = countUnits2
		
		// вывод оставшихся юнитов на страницу
		$('count1').value = countUnits1
		$('count2').value = countUnits2
		
		// вывод отчёта на страницу
		$('report').innerHTML =
			`<h3 class="center">Отчёт</h3>
			<p>Общее здоровье нападающего отряда: ${Math.round(calcHealth(squad1))}
			<br>Общее здоровье защищающегося отряда: ${Math.round(calcHealth(squad2))}</p>
			<p>Общий урон нападающего отряда: ${Math.round(damage1)}
			<br>Общий урон защищающегося отряда: ${Math.round(damage2)}</p>
			<p>Общие потери нападающего отряда: ${lostUnits1}
			<br>Общие потери защищающегося отряда: ${lostUnits2}</p>`
		
		// вывод отчёта об уклонении на страницу
		if (evasion1) $('report').innerHTML += '<p>Нападающий отряд уклонился!</p>'
		if (evasion2) $('report').innerHTML += '<p>Защищающийся отряд уклонился!</p>'
	}
	
	// если дальний бой
	if ($('type_battle').value === 'ranged') {
		
		// урон
		let damage = calcDamage2(squad1, squad2)
		
		// бросок на попадание
		let hit = Math.random() < squad1.hit ? true : false
		
		// промах
		if (!hit) damage = 0
		
		// количество здоровья, на котором сосредоточен урон
		let health1 = Math.round(calcHealth(squad2) * parseInput('density'))
		
		// количество нетронутого здоровья
		let health2 = calcHealth(squad2) - health1
		
		// оставшееся здоровье
		let health = health1 - damage
		
		// ограничение урона
		if (health < 0) health = 0
		
		// общее здоровье отряда
		health2 += health
		
		// потерянные юниты
		let lostUnits = Math.round(((health1 - health) / squad2.endurance) / (1 + squad2.armor))
		
		// оставшиеся юниты
		let countUnits = Math.round((health2 / (1 + squad2.armor)) / squad2.endurance)
		
		// запись в объект отряда
		squad2.count = countUnits
		
		// вывод оставшихся юнитов на страницу
		$('count2').value = countUnits
		
		// вывод отчёта на страницу
		$('report').innerHTML =
			`<h3 class="center">Отчёт</h3>
			<p>Общий урон нападающего отряда: ${Math.round(damage)}</p>
			<p>Общее здоровье защищающегося отряда: ${Math.round(calcHealth(squad2))}</p>
			<p>Общие потери защищающегося отряда: ${lostUnits}</p>`
		
		// вывод отчёта о промахе на страницу
		if (!hit) $('report').innerHTML += '<p>Нападающий отряд промахнулся!</p>'
	}
}