$(document).ready(function()
{
	// MUSHROOMS
	// let mushroomSize = ['Small', 'Normal', 'Large'];
	// let mushroomBrown = [51800, 397400, 1728000]; //Likely extinct, R.I.P

	// let mushroomRed = [87400, 670600, 2916000];
	// let mushroomYellow = [84200, 645800, 2808000];
	// let mushroomBlue = [84200, 645800, 2808000];
	// let mushroomPurple = [93900, 720300, 3132000];
	// let mushroomWhite = [81000, 621000, 2700000];
	// let mushroomPink = [81000, 621000, 2700000];
	// let mushroomGray = [90700, 695500, 3024000];
	// let mushroomFire = [0, 3850200, 13662000];
	// let mushroomWater = [0, 3816700, 13543200];
	// let mushroomCrystal = [0, 3883600, 13780800];

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
		[0, 3883600, 13780800] //Crystal
	];

	// PIKMINS
	let attackPower = [4, 3, 3, 6, 2, 2, 5];
	//let bloomBonus = [0, 1, 2, 3, 4]; //Index == value!

	let decorBonus = 4;
	let friendshipBonuses = [0, 1, 2, 3, 4, 8, 12, 16, 20];

	/*
		Values taken from the Attack Power Infographic v2
		Pikmin order is: Red, Yellow, Blue, Purple, White, Pink, Gray.
		Mushroom order is same as pikmin order, followed by Fire, Water and Crystal.
	*/
	let mushroomMatchup = [
		[12, 3, 0, 3, 0, 3, 0, 100, 0, 0],
		[3, 12, 0, 3, 0, 3, 3, 0, 0, 0],
		[0, 3, 12, 3, 0, 3, 3, 0, 100, 0],
		[3, 3, 0, 12, 0, 3, 3, 0, 0, 0],
		[3, 3, 0, 3, 12, 3, 0, 0, 0, 0],
		[3, 3, 3, 3, 0, 12, 0, 0, 0, 0],
		[3, 3, 0, 3, 0, 3, 12, 0, 0, 100],
	];

	function getStrength()
	{
		let individualStrength = squadStrength = 0;
		
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
		if(squadSize < 1 || squadSize > 40)
		{
			squadSize = 1;
			$('#squadSize').val(squadSize);
		}

		//Calculate squad strength
		individualStrength = attackPower[pikminType] + bloomBonus + friendshipBonus + decorBonus + mushroomMatchup[pikminType][mushroomType];
		squadStrength = individualStrength * squadSize;
		$('.individual').html(individualStrength);
		$('.squad').html(squadStrength);
	}


	$('#mushcalc select, #squadSize').on('change', function()
	{
		getStrength();
	});

	getStrength();

});