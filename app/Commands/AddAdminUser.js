'use strict';

const Command = use('Command');
const Hash = use('Hash');
const User = use('App/Model/User');

class AddAdminUser extends Command {

  get signature() {
    return 'make:user';
  }

  get description() {
    return 'Tell something helpful about this command';
  }

  * handle(args, options) {
    const email = yield this.ask('Enter an email').print();
    const password = yield this.secure('Enter a password').print();
    const isAdmin = yield this.confirm('Should this user be an admin?').print();

    const props = { email, password: yield Hash.make(password) };

    if (isAdmin) {
      props.is_admin = true;
    }

    try {
      const user = yield User.create(props);

      this.completed('create', `User with the email ${user.email} has been created.`);
    } catch (e) {
      console.log(e);

      this.failed('create', 'There was an error creating this user');
    }

    process.exit();
  }

}

module.exports = AddAdminUser;
