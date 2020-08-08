'use strict'

const Env = use('Env');
const User = use('App/Models/User');
const hash = require('object-hash');
const Mail = use('Mail');

class RegisterController {

    async index({ request, response, auth, view, session, }) {
        return view.render('auth/register', {title: "Register"});
    }

    async register({ request, response, session, auth }) {
        const { username, email, password } = request.all();

        let token = hash(Math.random().toString(36).substring(2));

        let user = await User.create({
            username: username,
            email: email,
            password: password,
            verify_token: token
        });

        if (user) {
            await Mail.send('emails.verifyAccount', {
                route: Env.get('APP_URL') + '/auth/verify/' + user.id + "/" + token
            }, (message) => {
                message
                    .to(user.email)
                    .from('service@' + Env.get('APP_URL'))
                    .subject('Verify your account')
            });
            session.flash({ message: 'Check your email to verify your account!' });
        }

        return response.redirect('/auth/login', false, 301);
    }

}

module.exports = RegisterController
