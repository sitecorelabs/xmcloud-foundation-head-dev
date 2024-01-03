var acceptField = {};

const SetPubKey = (token) => {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: authorityUrl + "/.well-known/jwks.json",
    async: false,
    success: (data) => {
      var tokenHeader = KJUR.jws.JWS.readSafeJSONString(
        b64utoutf8(token.split(".")[0])
      );
      var key = data.keys.filter((key) => key.kid == tokenHeader.kid);
      var pubKey = `-----BEGIN CERTIFICATE-----${key[0]["x5c"][0]}-----END CERTIFICATE-----`;
      document.cookie = "key=" + pubKey;
    },
    error: (err) => {
      console.log("GetPubKey", err);
    },
  });
};

const verifyToken = (token, pubKey) => {
  var istokenValid = false;

  try {
    var tokenHeader = KJUR.jws.JWS.readSafeJSONString(
      b64utoutf8(token.split(".")[0])
    );
    var tokenBody = KJUR.jws.JWS.readSafeJSONString(
      b64utoutf8(token.split(".")[1])
    );

    acceptField.alg = tokenHeader.alg;
    acceptField.iss = tokenBody.iss;
    acceptField.sub = tokenBody.sub;
    acceptField.aud = tokenBody.aud;

    istokenValid = KJUR.jws.JWS.verify(token, pubKey, acceptField);

    return istokenValid;
  } catch (e) {
    console.log("verifyToken", e);
  }

  return istokenValid;
};

const ensureLoggedInUser = (token, pubKey) =>{
    var isTokenvalid = verifyToken(token, pubKey);
    if (!isTokenvalid) {
        //redirect
        relativeRedirect("Login");
    }

}

const relativeRedirect = (redir) => {
    location.pathname = location.pathname.replace(
        /(.*)\/[^/]*/,
        "$1/" + redir
    );
}
