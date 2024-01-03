define(["sitecore"], function (Sitecore) {
    try {
        var myVar;

        var model = Sitecore.Definitions.Models.ControlModel.extend({
            initialize: function (options) {
                this._super();
                app = this;
                app.set("listProjects", "");
                app.set("userInformation", "");

                var token = app.getCookie("token");
                var pubkey = app.getCookie("key");
                ensureLoggedInUser(token, pubkey);

                if (!isInstanceRegistered) {
                    $('#main').hide();
                    $('#instance-name-warning').hide();
                    $('#set-instance-name').show();
                } else {
                    $('#set-instance-name').hide();
                }


                app.GetUser(app, token);
                //app.GetUserProjects(app, token);
                $("#refreshButton").click(function () {
                    app.GetUser(app, token);
                });

                $("#logoutKajoo").click(function () {
                    //we clean the cookie and redirect to Login Page
                    document.cookie = "token=";
                    app.relativeRedir("Login");
                });

                $("#importbutton").click(function () {
                    //First we check if is any Project selected
                    if ($("input[name=rGroup]:checked").val()) {
                        //TODO: Here we show the Loading
                        $(".loading").show();
                        $("#loadingNew").show();

                        myVar = window.setInterval(function () {
                            app.GetLogMessage($("input[name=rGroup]:checked").val());
                        }, 500);

                        app.CreateJssBuildCommand($("input[name=rGroup]:checked").val());
                    } else {
                        $("#modalAlertContent").text("You have to select one project.");
                        $("#modalAlert").modal("show");
                    }
                });

                $("#btn_cancel").click(function () {
                    $(".close-modal").click();
                });

                $("#submit-instance-registration").click(function () {
                    let instanceName = $("#instance-name").val();
                    let hostname = $("#instance-hostname").val();
                    let jssApiKey = $("#instance-jss-api-key").val();
                    let contentApiKey = $("#instance-content-api-key").val();
                    let gqlEndpoint = $("#instance-gql-endpoint").val();

                    let re = /^[a-zA-Z0-9\-\_\./]{1,260}$/;
                    if (re.test(instanceName)) {
                        var data = { instanceName, hostname, jssApiKey, contentApiKey, gqlEndpoint };
                        app.registerInstance(data);
                    } else {
                        if (instanceName.length < 1) {
                            $('#instance-name-warning').text("A name is required");
                        }
                        else if (instanceName.length > 260) {
                            $('#instance-name-warning').text("This name is too long");
                        } else {
                            $('#instance-name-warning').text("The name must only contain alphanumeric characters, periods, slashes (/), dashes (-) and underscores (_)");
                        }
                        $('#instance-name-warning').show();
                    }

                });

                $("#submit-instance-reregistration").click(function () {
                    let instanceName = $("#instance-new-name").val();
                    let hostname = $("#instance-new-hostname").val();
                    let jssApiKey = $("#instance-new-jss-api-key").val();
                    let contentApiKey = $("#instance-new-content-api-key").val();
                    let gqlEndpoint = $("#instance-new-gql-endpoint").val();

                    let re = /^[a-zA-Z0-9\-\_\./]{1,260}$/;
                    if (re.test(instanceName)) {
                        var data = { instanceName, hostname, jssApiKey, contentApiKey, gqlEndpoint };
                        app.refreshInstanceRegistration(data);
                    } else {
                        if (instanceName.length < 1) {
                            $('#instance-new-name-warning').text("A name is required");
                        }
                        else if (instanceName.length > 260) {
                            $('#instance-new-name-warning').text("This name is too long");
                        } else {
                            $('#instance-new-name-warning').text("The name must only contain alphanumeric characters, periods, slashes (/), dashes (-) and underscores (_)");
                        }
                        $('#instance-new-name-warning').show();
                    }
                });

            },
            GetUser: function (app, token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    if (decodedToken.hasOwnProperty("https://kajoo.ca/user_metadata")) {
                        app.set(
                            "userName",
                            `${decodedToken["https://kajoo.ca/user_metadata"].fname.slice(
                                0,
                                1
                            ) +
                            decodedToken["https://kajoo.ca/user_metadata"].lname.slice(0, 1)
                            }`
                        );
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            GetUserProjects: function (app, token) {
                jQuery.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    url: getUserProjectsEndPoint,
                    cache: false,
                    headers: { Authorization: `Bearer ${token}` },
                    success: function (data) {
                        app.set("listProjects", data.results);
                    },
                    error: function (data) {
                        if (data.responseJSON.message == "jwt expired") {
                            $("#modalAlertContent").text("Authorization has expired");
                            $("#modalAlert").modal("show");
                            document.cookie = "token=";

                            app.relativeRedir("Login");
                        } else {
                            $("#modalAlertContent").text(
                                "Unknown Error, redirecting to login"
                            );
                            $("#modalAlert").modal("show");
                            document.cookie = "token=";

                            app.relativeRedir("Login");
                        }
                    },
                });
            },
            getCookie: function (cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            relativeRedir: function (redir) {
                location.pathname = location.pathname.replace(
                    /(.*)\/[^/]*/,
                    "$1/" + redir
                );
            },
            importFromDirectory: function (projectId, nameOfComponent, action) {
                var model = {
                    ProjectId: projectId,
                    Name: nameOfComponent,
                    Action: action,
                };
                $(".close-modal").click();
                jQuery.ajax({
                    url: "/api/import/ImportServiceApi/ImportPackage",
                    type: "POST",
                    data: model,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.Name !== "") {
                            app.createUrlLink(data.Url);
                            $("#modalAlertContent").text(data.Message);
                            $("#modalAlert").modal("show");
                        }
                    },
                    error: function (data) {
                        $("#modalAlertContent").text("Import Failed");
                        $("#modalAlert").modal("show");
                        clearInterval(myVar);
                        $("#importingTextDiv")[0].innerHTML = "";
                    },
                    complete: function (data) {
                        if (data.responseJSON.Id !== "") {
                            $("#modalRadioButtons").hide();
                        }
                        $(".loading").hide();
                        $("#loadingNew").hide();
                        clearInterval(myVar);
                        $("#importingTextDiv")[0].innerHTML = "";
                    },
                });
            },
            createUrlLink: function (url) {
                $("#modalUrlContent").empty();
                html =
                    `<a href="${url}" target="_blank">` +
                    "Click here to open in Experience Editor" +
                    "</a><br/>";
                $("#modalUrlContent").append(html);
            },
            GetLogMessage: function (projectId) {
                var model = { ProjectId: projectId };
                jQuery.ajax({
                    url: "/api/import/ImportServiceApi/GetLogMessage",
                    type: "POST",
                    data: model,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        var hasAlareadyMessage = false;

                        $("#importingTextDiv")
                            .children("div")
                            .each(function () {
                                if (this.innerHTML.includes(data)) {
                                    hasAlareadyMessage = true;
                                }
                            });

                        if (hasAlareadyMessage == false) {
                            $("#importingTextDiv").find("span").remove();

                            //we insert the new msg
                            if (data !== "") {
                                $(".saving:last-child").append("<div class='check'></div>");
                                $("#importingTextDiv").append(
                                    "<div class='saving'>" +
                                    data +
                                    "<span>.</span><span>.</span><span>.</span></div>"
                                );
                            }
                        }
                    },
                    error: function (data) {
                        clearInterval(myVar);
                        $("#importingTextDiv")[0].innerHTML = "";
                    },
                });
            },
            CreateJssBuildCommand: function (projectId, action) {
                var model = { ProjectId: projectId, Action: action };
                $(".close-modal").click();

                jQuery.ajax({
                    url: "/api/import/ImportServiceApi/CreateJssBuildCommand",
                    type: "POST",
                    data: model,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        //we need to check if the project exist, if yes we show the modalRadioButtons
                        $("#modalAlertContent").text(data.Message);
                        $("#modalAlert").modal("show");
                        if (data.Name === "") {
                            $(".loading").hide();
                            $("#loadingNew").hide();
                            clearInterval(myVar);
                            $("#modalRadioButtons").show();
                        }
                    },
                    error: function (data) {
                        $("#modalAlertContent").text("Import Failed");
                        $("#modalAlert").modal("show");
                        clearInterval(myVar);
                        $("#importingTextDiv")[0].innerHTML = "";
                    },
                    complete: function (data) {
                        if (data.responseJSON.Id !== "") {
                            $("#modalRadioButtons").hide();
                        }
                        if (data.responseJSON.Name !== "") {
                            if (typeof data.responseJSON.Name !== "undefined") {
                                app.importFromDirectory(
                                    projectId,
                                    data.responseJSON.Name,
                                    action
                                );
                            }
                        }
                    },
                });
            },
            registerInstance: function (registrationData) {
                $('#set-instance-name').hide();
                var token = app.getCookie("token");
                $(".loading").show();
                jQuery.ajax({
                    url: "/api/kajoo/instance/Register",
                    headers: { Authorization: `Bearer ${token}` },
                    type: "POST",
                    data: registrationData,
                    dataType: "json",
                    cache: false,
                    success: function (data) { },
                    error: function (data) { },
                    complete: function (data) {
                        if (data.responseJSON.Id !== "") {
                            window.location.reload();
                            // $('#main').show();
                            // $(".loading").hide();
                        }
                    },
                });
            },
            refreshInstanceRegistration: function (registrationData) {
                $('#set-instance-name').hide();
                var token = app.getCookie("token");
                $(".loading").show();
                jQuery.ajax({
                    url: "/api/kajoo/instance/Reregister",
                    headers: { Authorization: `Bearer ${token}` },
                    type: "POST",
                    data: registrationData,
                    dataType: "json",
                    cache: false,
                    success: function (data) { },
                    error: function (data) { },
                    complete: function (data) {
                        if (data.responseJSON.Id !== "") {
                            window.location.reload();
                        }
                    },
                });
            }
        });

        var view = Sitecore.Definitions.Views.ControlView.extend({
            initialize: function (options) {
                this._super();
            },
        });

        Sitecore.Factories.createComponent(
            "ProjectSelection",
            model,
            view,
            ".sc-ProjectSelection"
        );
    } catch (e) {
        location.reload();
    }
});
