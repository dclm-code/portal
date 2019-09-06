//AutoComplete JS library
let user = local_store({}, "dclm-user", "get");
app.controller('getUsers', function($http, $scope){
    $scope.autocompletx = function(id, val, options, displaywin){
        opt = str_to_json(options);
        opt['criteria'] = this.Message.receiver;
        $http({
            url: baseUrl + "getUsers",
            method: "GET",
            params: opt,
            headers:{
                Authorization: `Bearer ${user.token}`
            },
            contentType: 'application/json'
        }).then((response) => {
            str = "";
            if (response !== "" && response.data.length !== undefined) {
                response.data.forEach(function(obj) {
                    str += '<li><a onclick="putvalue(&apos;' + id + '&apos;,&apos;' + obj["staff_id"] + " : " + obj["surname"]+", "+ obj["first_name"] + '&apos;,&apos;' + displaywin + '&apos;);"><b>' + obj["first_name"] + "</b>, " + obj["surname"] + " " + obj["first_name"] + '</a></li>';
                });
                if (str !== "") display(displaywin, str);
                else remove_div(displaywin);
            } else {
                remove_div(displaywin);
            }
        }, (err) => {
            let msg = "<b>"+err.statusText+"</b>: <i>"+ err.data.info+"</i>";
            makeToast(msg, {"type":"is-danger", "duration":2000});
        });
    }
});

function putvalue(objid, valux, dwin = null, greyed = false){
    $("#" + objid).val(valux);
    (greyed == true) ? $("#" + objid).attr("disabled", "true"): fh = 0;
    (dwin !== null) ? remove_div(dwin): dwin = 0;
}

function str_to_json(str) {
    json_str = {};
    d_str = str.split(",");
    for (i = 0; i < d_str.length; i++) {
        i_str = d_str[i];
        l_str = i_str.split(":");
        json_str[l_str[0]] = l_str[1];
    }
    return json_str;
}

function display(dwin, strObj) {
    $("#" + dwin)
        .html(strObj)
        .css("display", "block")
        .css("z-index", "9")
        .css("position", "absolute")
        .css("margin-top", "0px")
        .css("margin-left", "2px")
        .css("width", "auto")
        .css("height", "auto")
        .css("padding", "10px")
        .css("border", "1px solid #ddd")
        .css("background-color", "#fff")
        .css("color", "#000");
    $("#" + dwin + " li")
        .css("list-style", "none")
        .css("text-decoration", "none")
        .css("cursor", "pointer")
        .css("padding", "2px");
}

function remove_div(oid) {
    $("#" + oid)
        .html("")
        .css("display", "none")
        .css("position", "absolute")
        .css("margin-top", "0px")
        .css("margin-left", "0px")
        .css("width", "0px")
        .css("height", "0px")
        .css("padding", "none")
        .css("border", "none");
}
