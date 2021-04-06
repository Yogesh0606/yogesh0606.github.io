(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "loc",
            alias: "Location",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "confirmedCasesIndian",
            alias: "Confirmed",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "discharged",
            alias: "Discharged",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deaths",
            alias: "Deaths",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "totalConfirmed",
            alias: "Total",
            dataType: tableau.dataTypeEnum.int
        }
     ];

        var tableSchema = {
            id: "CovidStatewise",
            alias: "India Covid Statewise Details",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {


        $.getJSON("https://api.rootnet.in/covid19-in/stats/latest", function(resp) {
            var feat = resp.statewise,countryVal = "India",
                tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                    tableData.push({
                    
                        "Location" : feat[j].loc,
                        "Confirmed": feat[j].confirmedCasesIndian,
                        "Discharged":feat[j].discharged,                    
                        "Deaths":feat[j].deaths,
                        "Total": feat[j].totalConfirmed
                        
                    });
            } 
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 India Dataset"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();