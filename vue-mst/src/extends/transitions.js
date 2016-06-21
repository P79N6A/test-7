function getAnimations () {
	var aniMap = {};
	var effects = ['bounce', 'fade', 'zoom', 'slide', 'rotate'];
	var dirs = ['left', 'right', 'up', 'down',''];
	var specEffects = ['flip'];
	var specDirs = ['x','y'];
	var specEffects2 = ['lightSpeed', 'roll'];
	var specDirs2 = [''];

	var others = ['flash', 'jello', 'headShake', 'puls', 'shake', 'rubberBand', 'swing', 'tada', 'wobble', 'hinge'];

	function setAniMap (effects, directions) {
		
		effects.forEach(function(effect) {
			var dirs = directions.slice(0);
			if(effect === 'slide'){dirs.pop();}

			dirs.forEach( function(dir){debugger;
				var o = {}, aniName = VIP.camelize('ani-'+effect+'-'+dir);
				o.enterClass = VIP.camelize(effect+'-in-'+dir);
				o.leaveClass = VIP.camelize(effect+'-out-'+dir);
				o.type = 'animation';
				aniMap[aniName] = o;
			});

		});
	}

	function setOthers(effects){
		effects.forEach(function(effect){
			aniMap[effect] = {enterClass: effect, leaveClass: 'fadeOut'};
		});
	}

	setAniMap(effects, dirs);
	setAniMap(specEffects, specDirs);
	setAniMap(specEffects2, specDirs2);
	setOthers(others);

	return aniMap;
}


export default getAnimations();

