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
        type: 'post',
        success: function(data){
            console.log(data);
        }
    }) 
}
