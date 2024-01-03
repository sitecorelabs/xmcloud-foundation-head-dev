define(["sitecore"], function (Sitecore) {
    try {
        var model = Sitecore.Definitions.Models.ControlModel.extend({
            initialize: function (options) {
                this._super();
                app = this;
                app.set("responseapi", '');

                var pubkey = app.getCookie("key");
                var token = app.getCookie("token");

                if (token && pubkey) {
                    try {

                        var isTokenvalid = verifyToken(token, pubkey);

                        if (isTokenvalid) {
                            app.relativeRedir("ProjectSelection");
                        }

                    } catch (e) {
                        console.log(e);
                    }
                };

                app.RemoveFormAction(app);
                $("#formContent").show();
                $(document)
                    .ajaxStart(function () {
                        $('#login-icon').attr("src", "/sitecore/Shell/client/YourApps/Kajoo/Login/Assets/images/Kajoo_animate.gif");
                    })
                    .ajaxStop(function () {
                        $('#login-icon').attr("src", "/sitecore/Shell/client/YourApps/Kajoo/Login/Assets/images/kajoostandardlogo.png");
                    });
            },
            Auth: function (app) {
                //call apis
                var email = $("#email").val();
                var password = $("#password").val();

                //we clean the response
                app.set("responseapi", "");

                jQuery.ajax({
                    type: "POST",
                    data:
                    {
                        email: email,
                        password: password
                    },
                    data: JSON.stringify({ username: email, password: password }),
                    contentType: "application/json; charset=utf-8",
                    url: authEndpoint,
                    cache: false,
                    success: function (data) {
                        if (data.hasOwnProperty("access_token")) {

                            document.cookie = "token=" + data.access_token;
                            SetPubKey(data.access_token);
                            app.relativeRedir("ProjectSelection")
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (xhr.responseJSON && xhr.responseJSON["message"]) {
                            app.set("responseapi", JSON.parse(xhr.responseJSON["message"]).error_description);
                        }
                        else if (xhr.status === 0) {
                            app.set("responseapi", "Could not connect to Kajoo, please verify your network connection and Kajoo configuration");
                        }
                        else {
                            app.set("responseapi", "Something went worng, could not connect to Kajoo");
                        }
                    }
                });
            },
            RemoveFormAction: function (app) {
                $("form").submit(function (event) {
                    event.preventDefault();

                    // Call Auth
                    app.Auth(app);
                });
            },
            getCookie: function (cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            relativeRedir: function (redir) {
                location.pathname = location.pathname.replace(/(.*)\/[^/]*/, "$1/" + redir);
            }
        });

        var view = Sitecore.Definitions.Views.ControlView.extend({
            initialize: function (options) {
                this._super();
            }
        });

        Sitecore.Factories.createComponent("Login", model, view, ".sc-Login");
    }
    catch (e) {
        location.reload();
    }
});
