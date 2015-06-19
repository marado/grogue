/* *************************************************************************
 * ./~ Nah Nah Nah Nah, can't touch this! ./~
 * The actual code, don't touch it if you just want to configure the website
 * To configure, check config.js
 * *************************************************************************/

// basic debug function
function debug(what) {
	if (DEBUG) console.log(what);
}

// dump object debug function
function dump(what) {
	if (DEBUG) console.dir(what);
}

// what do we want to do when the page is loaded?
function init() {
	box(N);
}

// build an nXn square of squares, randomly populate the squares with available links, have an empty default for the rest
// TODO: this was made in a rush, and this is a non-optimal solution. This will be slow, specially if you want to have N*N links. 
function box(n) {
	
	// you want to show more stuff than you have space to. We won't allow that... at least for now.
	if (sites.length > (n*n)) return; 

	// data layer
	var matrix = [];
	for (var site in sites) {
		var randomnumber = Math.floor(Math.random()*n*n);
		debug("randomnumber is " + randomnumber);
		while (matrix[randomnumber] != undefined) {
			randomnumber = Math.floor(Math.random()*n*n);
		}
		matrix[randomnumber]=sites[site];
	}	
	dump(matrix);
	
	// presentation layer
	var html = "";
	var squarewidth = 100/n; 
	for (var x = 0; x < n; x++) {
		html += "<div class='line' style='height:"+squarewidth+"%;'>";
		for (var y = 0; y < n; y++) {
			html += "<div class='square' style='width:"+squarewidth+"%;'>";
			if (matrix[(x)*n+y] != undefined) {
				html += "<a href='"+matrix[(x)*n+y].link+"'><img src='" + matrix[(x)*n+y].image + "' alt='" + matrix[(x)*n+y].alt +"'/></a>";
			} else {
				var color = Math.floor(Math.random()*9)+1; // the empty boxes will have a random shade of gray...
				html += "<div class='empty' onmousedown='init()' style='background-color:#"+color+color+color+color+color+color+";'></div>";
			}
			html += "</div>";
		}
		html += "</div>";
	}

	// do it
	return document.getElementById('container').innerHTML=html;	
}
