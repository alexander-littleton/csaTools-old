let data
const alphaNumRegex = /\b([a-zA-Z]+\d+|\d+[a-zA-Z]+)\b/;
const justNumRegex = /\b\d+\b/;
let alphaNumTotal = [0,0,0,0,0];
let justNumTotal = [0,0,0,0,0];
let total = [0,0,0,0,0];
let alphaNumArray = [];
const tableKey = {
	'impressions' : 1,
	'clicks' : 2,
	'cost' : 3,
	'conversions' : 4,
	'conv. value' : 5,
	'roas' : 6,
	'avg. cpc' : 7,
	'aov' : 8
};

const fileParse = function() {
	let input = document.getElementById('openFile').files[0];
	Papa.parse(input, {
		complete: function(results, file) {
			console.log("Parsing complete", results, file);
			data = results["data"];
			cleanData(data);
			numParse(data);
		}
	});
};

const cleanData = function(json) {
	for (let i = 0; i < json.length; i++) {
		for (let x = 0; x < json[i].length; x++) {
			json[i][x] = json[i][x].replace(',', '')			
		}
	}
};

const numParse = function(parsedData) {
	alphaNumTotal = [0,0,0,0,0];
	justNumTotal = [0,0,0,0,0];
	total = [0,0,0,0,0];

	for (let i = 1; i < parsedData.length; i++) {
		const e = parsedData[i][0];
		if (alphaNumRegex.test(e)) {
			let matchTerm = e.match(alphaNumRegex)
			matchTerm.forEach(term => {
				if (alphaNumArray.indexOf(term) == -1) {
					alphaNumArray.push(term)
				};
			});
			for (let y = 1; y < parsedData[i].length; y++) {
				const f = parsedData[i][y];
				alphaNumTotal[y-1]+=parseInt(f, 10);
			};
		} else if (justNumRegex.test(e)) {
			for (let y = 1; y < parsedData[i].length; y++) {
				const f = parsedData[i][y];
				justNumTotal[y-1]+=parseInt(f, 10);
			};
		};
		for (let y = 1; y < parsedData[i].length; y++) {
			const f = parsedData[i][y];
			total[y-1]+=parseInt(f, 10);
		};
	};
	console.log(alphaNumTotal);
	console.log(justNumTotal);
	console.log(total);
	console.log(alphaNumArray)
	addTable();
};

const topTermsAnalysis = function() {
	
}

const addTable = function() {
	const table = document.getElementById('numberTable').rows
	for (let i = 0; i < 8; i++) {
		let t1 = table[1].cells[i+1]
		let t2 = table[2].cells[i+1]
		let t3 = table[3].cells[i+1]
		if (i<5) {
			t1.innerText = alphaNumTotal[i];
			t2.innerText = justNumTotal[i];
			t3.innerText = total[i];
		} else if (i==5){
			t1.innerText = (alphaNumTotal[4]/alphaNumTotal[2]).toFixed(2);
			t2.innerText = (justNumTotal[4]/justNumTotal[2]).toFixed(2);
			t3.innerText = (total[4]/total[2]).toFixed(2);
		} else if (i==6){
			t1.innerText = (alphaNumTotal[2]/alphaNumTotal[1]).toFixed(2);
			t2.innerText = (justNumTotal[2]/justNumTotal[1]).toFixed(2);
			t3.innerText = (total[2]/total[1]).toFixed(2);
		} else {
			t1.innerText = (alphaNumTotal[4]/alphaNumTotal[3]).toFixed(2);
			t2.innerText = (justNumTotal[4]/justNumTotal[3]).toFixed(2);
			t3.innerText = (total[4]/total[3]).toFixed(2);
		};	
	};
};


//possibly done debugging the above
//next up is providing download buttons for just numbers and alphanumeric
const fileDownload = function(params) {
	
}