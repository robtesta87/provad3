function csvJSON(csv){

  var lines=csv.split("\n");
  var result = [];

  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){

    var obj = {};
    var currentline=lines[i].split(",");
    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }
  console.log(result);
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

function JSONtoString(){
  var righe = [];
  console.log("ecocomi");
  d3.csv("http://localhost:9000/prova.csv", function (data2) {
    for (var i = 0; i < data2.length; i++) {
      righe.push(data2[i]);
    }
  });
  console.log("length"+righe.length);
  var stringa="day,scarico,elaborazione";
  for (var i=0;i<righe.length; i++) {
    console.log(righe[i].day);
    stringa=stringa+righe[i].day+","+righe[i].scarico+","+righe[i].elaborazione+"\n";
  }
  return stringa;
}

var stringatot= JSONtoString();
var data= csvJSON(stringatot);
