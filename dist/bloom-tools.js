$(document).ready(function()
{
	/*
	Pikmin order is: Red, Yellow, Blue, Purple, White, Pink, Gray.
	Mushroom order is same as pikmin order, followed by Fire, Water, Crystal and Electric.
	*/

	let mushroomHealths = [
		[87400, 670600, 2916000], //Red
		[84200, 645800, 2808000], //Yellow
		[84200, 645800, 2808000], //Blue
		[93900, 720300, 3132000], //Purple
		[81000, 621000, 2700000], //White
		[81000, 621000, 2700000], //Pink
		[90700, 695500, 3024000], //Gray
		[0, 3850200, 13662000], //Fire
		[0, 3816700, 13543200], //Water
		[0, 3883600, 13780800], //Crystal
		[0, 3816700, 13543200] //Electric
	];

	// PIKMINS
	let attackPower = [4, 3, 3, 6, 2, 2, 5];
	//let bloomBonus = [0, 1, 2, 3, 4]; //Not needed since index == value!
	let decorBonus = 4;
	let friendshipBonuses = [0, 1, 2, 3, 4, 8, 12, 16, 20];

	let mushroomMatchup = [
		[12, 3, 0, 3, 0, 3, 0, 100, 0, 0, 0],
		[3, 12, 0, 3, 0, 3, 3, 0, 0, 0, 0],
		[0, 3, 12, 3, 0, 3, 3, 0, 100, 0, 0],
		[3, 3, 0, 12, 0, 3, 3, 0, 0, 0, 0],
		[3, 3, 0, 3, 12, 3, 0, 0, 0, 0, 0],
		[3, 3, 3, 3, 0, 12, 0, 0, 0, 0, 0],
		[3, 3, 0, 3, 0, 3, 12, 0, 0, 100, 0],
		[3, 3, 0, 3, 0, 3, 12, 0, 0, 0, 100],
	];

	function secondsToHMS(s)
	{
		let h = Math.floor(s / 3600);
		s -= h * 3600;

		let m = Math.floor(s / 60);
		s -= m * 60;

		s = Math.trunc(s);

		return h + ' hour(s), ' + m + ' minute(s) and ' + s + ' second(s)';
	}

	function getStrength()
	{
		let individualStrength = squadStrength = 0;
		let smallTime = normalTime = largeTime = 0;

		let pikminType = $('#pikminType')[0].selectedIndex;
		let bloomBonus = $('#bloomBonus')[0].selectedIndex;
		let mushroomType = $('#mushroomType')[0].selectedIndex;
		let decorBonus = $('#decorBonus')[0].selectedIndex;
			if(decorBonus == 1)
				decorBonus = 4;

		let friendshipBonus = friendshipBonuses[$('#friendshipBonus')[0].selectedIndex];
		let squadSize = $('#squadSize').val();

		//Special mushroom?
		if(mushroomType > 6)
		{
			//Wrong pikmin selected for special mushroom type
			if(mushroomMatchup[pikminType][mushroomType] != 100)
			{
				//Auto-select correct pikmin type
				if(mushroomType == 7) //Fire?
				{
					pikminType = 0; //Red
				} else if(mushroomType == 8) //Water?
				{
					pikminType = 2; //Blue
				} else //Crystal
				{
					pikminType = 6; //Rock
				}

				$('#pikminType').prop('selectedIndex', pikminType);
			}
		}

		//Squad size must be comprised between 1 and 40
		// if(squadSize < 1 || squadSize > 40)
		// {
		// 	squadSize = 1;
		// 	$('#squadSize').val(squadSize);
		// }

		//Calculate squad strength
		individualStrength = attackPower[pikminType] + bloomBonus + friendshipBonus + decorBonus + mushroomMatchup[pikminType][mushroomType];
		squadStrength = individualStrength * squadSize;
		$('.individual').html(individualStrength);
		$('.squad').html(squadStrength);

		//Calculate Mushroom Time
		smallTime = (mushroomHealths[mushroomType][0] / squadStrength) * 100;
		normalTime = (mushroomHealths[mushroomType][1] / squadStrength) * 100;
		largeTime = (mushroomHealths[mushroomType][2] / squadStrength) * 100;

		$('.smallTime').html(secondsToHMS(smallTime));
		$('.normalTime').html(secondsToHMS(normalTime));
		$('.largeTime').html(secondsToHMS(largeTime));
	}


	$('#mushcalc select, #squadSize').on('change', function()
	{
		getStrength();
	});

	getStrength();

});