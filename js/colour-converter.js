/* 
 Title: Colour Converter
 Author:  RP Development
 Date: October 01,2015
 http://rpdev.lk
 */
 
 
 function convert(id){
		var val = document.getElementById(id).value;
		if(isEmpty(val)){
			document.getElementById(id).value = "Value Cannot Be Empty.";
		}
		else if(!required(val)){
			document.getElementById(id).value = "Value Are Not Valid.";
		}
		else{
			if(id == "hex"){
				var hexVal = "";
				if(val[0] == '#'){
					var splitHex = val.split('#');
					hexVal = splitHex[1];
				}else{
					hexVal = val;
				}
				var hexValArr1 = hexVal.substring(0, hexVal.indexOf("", 2));
				var hexValArr2 = hexVal.substring(2, hexVal.indexOf("", 4));
				var hexValArr3 = hexVal.substring(4, 6);
				var r = hexToDec(hexValArr1);
				var g = hexToDec(hexValArr2);
				var b = hexToDec(hexValArr3);
				document.getElementById('rgb').value = "RGB ("+r+", "+g+", "+b+")";
				if(hexVal[0] <= "8"){
					document.getElementById('hex').style.color = "#ffffff";
					document.getElementById('rgb').style.color = "#ffffff";
					document.getElementById('cmyk').style.color = "#ffffff";
				}else if(hexVal[0] > "8"){
					document.getElementById('hex').style.color = "#000000";
					document.getElementById('rgb').style.color = "#000000";
					document.getElementById('cmyk').style.color = "#000000"
				}
				var c = Math.round(cValue(r,g,b) * 1000) / 1000;
				var m = Math.round(mValue(r,g,b) * 1000) / 1000;
				var y = Math.round(yValue(r,g,b) * 1000) / 1000;
				var k = Math.round(kValue(r,g,b) * 1000) / 1000;
			
				document.getElementById('cmyk').value = "CMYK ("+getNum(c)+", "+getNum(m)+", "+getNum(y) +", "+getNum(k) +")";
				document.body.style.backgroundColor = "#"+hexVal;			
			}else if(id == "rgb"){
				var rgbVal = "";
				if(val[0] == 'r' && val[1] == 'g' && val[2] == 'b'){
					var rgbValCheck = val.split('rgb(');
					var rgbValCheck2 = rgbValCheck[1].split(')');
					rgbVal = rgbValCheck2[0];
				}else if(val[0] == 'R' && val[1] == 'G' && val[2] == 'B'){
					var rgbValCheck = val.split('RGB(');
					var rgbValCheck2 = rgbValCheck[1].split(')');
					rgbVal = rgbValCheck2[0];
				}else{
					rgbVal = val;
				}
				if(!isAplhaNumeric(rgbVal)){
					document.getElementById(id).value = "Values Can Only Have Numeric Characters.";
				}else{
					var valSArr = rgbVal.split(',');
					var hex = "#"+decToHex(valSArr[0])+decToHex(valSArr[1])+decToHex(valSArr[2]);
					document.getElementById('hex').value = hex;
					if(hex[1] <= "8"){
						document.getElementById('hex').style.color = "#ffffff";
						document.getElementById('rgb').style.color = "#ffffff";
						document.getElementById('cmyk').style.color = "#ffffff";
					}else if(hex[1] > "8"){
						document.getElementById('hex').style.color = "#000000";
						document.getElementById('rgb').style.color = "#000000";
						document.getElementById('cmyk').style.color = "#000000"
					};
					document.body.style.backgroundColor = hex;
					var c = Math.round(cValue(valSArr[0],valSArr[1],valSArr[2]) * 1000) / 1000;
					var m = Math.round(mValue(valSArr[0],valSArr[1],valSArr[2]) * 1000) / 1000;
					var y = Math.round(yValue(valSArr[0],valSArr[1],valSArr[2]) * 1000) / 1000;
					var k = Math.round(kValue(valSArr[0],valSArr[1],valSArr[2]) * 1000) / 1000;
					
					document.getElementById('cmyk').value = "CMYK ("+getNum(c)+", "+getNum(m)+", "+getNum(y) +", "+getNum(k) +")";
				}
			}else if(id == "cmyk"){
				var cmykVal = "";
				if(val[0] == 'c' && val[1] == 'm' && val[2] == 'y' && val[3] == 'k'){
					var cmykValCheck = val.split('cmyk(');
					var cmykValCheck2 = cmykValCheck[1].split(')');
					cmykVal = cmykValCheck2[0];
				}else if(val[0] == 'C' && val[1] == 'M' && val[2] == 'Y' && val[3] == 'K'){
					var cmykValCheck = val.split('CMYK(');
					var cmykValCheck2 = cmykValCheck[1].split(')');
					cmykVal = cmykValCheck2[0];
				}else{
					cmykVal = val;
				}
				var valSArr = cmykVal.split(',');
				if(checkDecimal(valSArr[0]) || checkDecimal(valSArr[1]) || checkDecimal(valSArr[2]) || checkDecimal(valSArr[3])){
					document.getElementById(id).value = "Values Should Be Less Than 1.";
				}else{
					var r = Math.round(rValue(valSArr[0], valSArr[3]));
					var g = Math.round(gValue(valSArr[1], valSArr[3]));
					var b = Math.round(bValue(valSArr[2], valSArr[3]));
					var hex = "#"+decToHex(r)+decToHex(g)+decToHex(b);
					document.getElementById('hex').value = hex;
					if(hex[1] <= "8"){
						document.getElementById('hex').style.color = "#ffffff";
						document.getElementById('rgb').style.color = "#ffffff";
						document.getElementById('cmyk').style.color = "#ffffff";
					}else if(hex[1] > "8"){
						document.getElementById('hex').style.color = "#000000";
						document.getElementById('rgb').style.color = "#000000";
						document.getElementById('cmyk').style.color = "#000000"
					};
					document.body.style.backgroundColor = hex;
					document.getElementById('rgb').value = "RGB ("+r+", "+g+", "+b+")";
				}
			}
		}
	}
	function required(val){
		var exp = /^[adefADEFRGBrgbCMYKcmyk0-9,#()]+$/;
		return (val.match(exp))
	}
	function isNumeric(val){
		var exp = /^[0-9]+$/;
		return (val.match(exp))
	}
	function checkDecimal(val){
		return (val > 1 || isNaN(val))
	}
	function isAplhaNumeric(val){
		var exp = /^[0-9,]+$/;
		return (val.match(exp))
	}
	function isEmpty(val) {
	   return (val == "" || val == null || val == " ");
	}
	function getNum(val) {
	   if (isNaN(val)) {
		 return 0;
	   }
	   return val;
	}
	function rValue(c,k){
		return (255 * (1 -c) * (1 - k));
	}
	function gValue(m,k){
		return (255 * (1 -m) * (1 - k));
	}
	function bValue(y,k){
		return (255 * (1 -y) * (1 - k));
	}
	function kValue(r,g,b){
		var r2 = r / 255.0;
		var g2 = g / 255.0;
		var b2 = b / 255.0;
		return (1 - Math.max(r2,g2,b2));
	}
	function cValue(r,g,b){
		var r2 = r / 255.0;
		return ((1 - r2 - kValue(r,g,b)) / (1 - kValue(r,g,b)));
	}
	function mValue(r,g,b){
		var g2 = g / 255.0;
		return ((1 - g2 - kValue(r,g,b)) / (1 - kValue(r,g,b)));
	}
	function yValue(r,g,b){
		var b2 = b / 255.0;
		return ((1 - b2 - kValue(r,g,b)) / (1 - kValue(r,g,b)));
	}
	function hexToDec(num) { 
		return parseInt("0x"+num);
	}
	function decToHex(num) { 
		return (+num).toString(16).toUpperCase(); 
	}