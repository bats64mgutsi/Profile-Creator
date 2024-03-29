import { BaseViewModel } from '../../../mvvm';
import { authenticationService } from '../../../services/authentication_service'

/**
 * ViewModel for the LoginVew
 */
export default class LoginViewModel extends BaseViewModel {
    constructor() {
        super();
        this.email = '';
        this.password = '';

        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.canLogin = this.canLogin.bind(this);
        this.login = this.login.bind(this);
    }

    setEmail(email) {
        this.email = email;
        console.log(this.email)
        this.notifyListeners(this);
    }

    setPassword(password) {
        this.password = password;
        console.log(this.email)
        this.notifyListeners(this);
    }

    /**
     * Returns true if the user given data is ready for authentication.
     */
    canLogin() {
        return (this.email.length > 0) && (this.password.length > 0)
    }

    /**
     * Authenticates the user.
     * 
     * TODO(Batandwa)
     */
    async login(history) {
        console.log('Now logging in');
        this.setBusy(true);
        this.notifyListeners(this);

        try {
            await authenticationService.signInWithEmailAndPassword(this.email, this.password);
            console.log('Getting profiles logging in');
            history.push('/profiles');
        } catch (e) {
            console.log(e);
            console.trace();
            alert('Error ' + e.message);
        }

        this.setBusy(false)
        this.notifyListeners(this);
    }
}