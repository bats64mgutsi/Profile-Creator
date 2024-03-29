import { developersApi } from '../../../apis/developers_api';
import { developersService } from '../../../services/developers_service';
import AuthenticatedViewModel from '../authenticated_viewmodel';

/**
 * ViewModel for the profiles view
 */
export default class ProfilesViewModel extends AuthenticatedViewModel {
    constructor() {
        super();

        this.developers = [];
        this.nameFilter = '';

        this.setNameFilter = this.setNameFilter.bind(this);
        this.getFilteredDevelopers = this.getFilteredDevelopers.bind(this);
        this.fetchDevelopers = this.fetchDevelopers.bind(this);
    }

    /**
     * @param {String} filter
     */
    setNameFilter(filter) {
        this.nameFilter = filter;
        this.notifyListeners(this);
    }

    /**
     * @return {Array}
     */
    getFilteredDevelopers() {
        var output = [];
        for (var developerIndex in this.developers) {
            var developer = this.developers[developerIndex];
            var fullName = developer.firstName + developer.lastName;
            if (fullName.toLowerCase().includes(this.nameFilter.toLowerCase()))
                output.push(developer);
        }

        output.reverse();
        return output;
    }

    async onViewMounted() {
        await this.fetchDevelopers();
    }

    /**
     * @return {Array}
     */
    async fetchDevelopers() {
        this.setBusy(true);
        this.notifyListeners(this);

        try {
            // TODO(FIX when done with the view)
            this.developers = await developersService.listDevelopers();
        } catch (e) {
            console.log(e);
            console.trace();
            alert('Error ' + e.message);
        }

        this.setBusy(false);
        this.notifyListeners(this);
    }
}
