import passport from 'passport';
import {Strategy as OpenIDConnectStrategy} from 'passport-openidconnect';
import {db} from "./db.js";

passport.use(new OpenIDConnectStrategy({
        issuer: 'https://accounts.google.com',
        authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenURL: 'https://oauth2.googleapis.com/token',
        userInfoURL: 'https://openidconnect.googleapis.com/v1/userinfo',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: [ 'profile' , 'email']
    },
    function verify(issuer, profile, email, callback) {
        db.query(
            'SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?',
            [issuer, profile.id],
            function (err, results) {
                console.log("issuer: " + issuer);
                if (err) {
                    return callback(err);
                }

                if (results.length === 0) {
                    console.log("No federated credentials found.");
                    console.log("profile: ");
                    console.log(profile);
                    db.query(
                        'INSERT INTO users (username, email, userid) VALUES (?, ?, ?)',
                        [profile.displayName, profile.emails[0].value, profile.id],
                        function (err, insertUserResults) {
                            if (err) {
                                return callback(err);
                            }

                            const userId = insertUserResults.insertId;

                            db.query(
                                'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
                                [userId, issuer, profile.id],
                                function (err) {
                                    if (err) {
                                        return callback(err);
                                    }

                                    const user = {
                                        id: userId,
                                        name: profile.displayName
                                    };
                                    console.log("userId: " + userId)
                                    return callback(null, user);
                                }
                            );
                        }
                    );
                } else {
                    console.log("results: ");
                    console.log(results);
                    const credential = results[0];

                    db.query(
                        'SELECT * FROM users WHERE id = ?',
                        [credential.user_id],
                        function (err, userResults) {
                            if (err) {
                                return callback(err);
                            }

                            if (userResults.length === 0) {
                                return callback(null, false);
                            }

                            const user = userResults[0];
                            return callback(null, user);
                        }
                    );
                }
            }
        );
    }
));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, name: user.displayName });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});