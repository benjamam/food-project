/**
 * Created by AdamBenjamin on 6/27/2017.
 */

var baseUri = "https://api.nal.usda.gov/ndb/";
var apiKey = "eoT1E5prJwU28s8oypHzL315ho3p7vWSZ7cA2Zws";

function search(parameter) {
    var format = "format=json";
    var maxResults = "max=10";
    var ds = "ds=Standard Reference";
    var uri = baseUri + "search/?&q=" + parameter + "&api_key=" + apiKey + "&" + format + "&" + maxResults + "&" + ds;
    var posting =
        $.ajax({
            url: uri,
            type: 'post',
            success: function (data) {
                var resultArr = data.list.item;
                $.each(resultArr, function(name,ndbno){
                    //console.log("Name: " + name + " ndbo: " + ndbno);
                });
                console.log(resultArr);
                console.log(resultArr.length);
                $('#results').html('<h3>Results</h3>');
                for(var i=0; i<resultArr.length; i++){
                    var name = resultArr[i].name;
                    var ndbno = resultArr[i].ndbno;
                    console.log("Name: " + name + " ndbo: " + ndbno);
                    var res = (i+1) + ") " + "<button type='button' class='btn btn-link itemResult' onclick='itemLookup(" + ndbno + ");'>" + name + "</button>" +  "<br/>";
                    $('#results').append(res);
                }

            }
        });
}

function itemLookup(ndbno){
    console.log("ndbno selected: " + ndbno);
    var format="format=json";
    var type="type=f";
    var uri = baseUri + "reports/?ndbno=" + ndbno + "&api_key=" + apiKey + "&" + type + "&" + format;
    $.ajax({
        url: uri,
        contentType: 'application/json',
        dataType: 'json',
        type: 'post',
        success: function(data){
            console.log(data);
            var food = data.report.food;
            var name = food.name;
            console.log(food);
            var nutrients = food.nutrients;
            var vitA = "318";
            var energy = "208"; //kcal
            var protein = "203";
            var fat = "204";
            var carb = "205";
            var fiber = "291";
            var sugar = "269";
            var vitC = "401";
            var vitB6 = "415";
            var vitB12 = "418";
            var vitD = "324";
            var relevantMetrics = [energy, carb, protein, fat, sugar, fiber, vitA, vitB6, vitB12, vitC, vitD];
            $('#results').html('<br/><h3>' + name + '</h3>');
            var table = "<table class='table table-inverse'>";
            table += "<tbody>";
            
            for(var i=0; i<nutrients.length; i++){
                //console.log(i + ": " + food.nutrients[i]);
                var curNutr = nutrients[i];
                for(var j=0; j<relevantMetrics.length; j++){
                    if(curNutr.nutrient_id == relevantMetrics[j]){
                        table += "<tr>";
                        table += "<td>" + nutrients[i].name + "</td>";
                        table += "<td>" + nutrients[i].value + "</td>";
                        table += "<td>" + nutrients[i].unit + "</td>";
                        table += "</tr>";    
                    }
                }
                /*if(nutrients[i].nutrient_id == vitA){
                    console.log(nutrients[i].name + ": " + nutrients[i].value);
                    table += "<td>" + nutrients[i].name + "</td>";
                    table += "<td>" + nutrients[i].value + "</td>";
                    table += "<td>" + nutrients[i].unit + "</td>";
                } */
            }
            
            table += "</tbody>";
            table += "</table>";
            $('#results').append(table);
        }
    }) 
}
