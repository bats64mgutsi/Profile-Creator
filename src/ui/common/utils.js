import { Company } from './models';

// UI Utilities

/**
 * Displays the selected file from the given input element in the target img element id
 * @param {HTMLInputElement} input
 * @param {String} targetId
 */
export function displayImage(input, targetId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById(targetId).src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Returns {list} with {item} removed.
 * @param {Array} list
 * @param {any} item
 */
export function removeItemFromList(list, item) {
    return list.splice(list.findIndex((itm) => itm === item), 1);
}

/**
 * Returns the company at which the given developer is currently working.
 * 
 * This is the company where the job duration contains the text 'present'.
 * 
 * @param {any} developer
 * @return {Company} or null if there is no company
 */
export function getCurrentOccupation(developer) {
    for (var count in developer.experience) {
        if (developer.experience[count].duration.toLowerCase().includes('present')) {
            return developer.experience[count];
        }
    }

    return null;
}

/**
 * Returns the firstname lastName string of the given developer.
 * @return {String}
 */
export function getDeveloperFullName(developer) {
    return (developer.firstName + ' ' + developer.lastName).trim();
}

/**
 * 
 * @param {String} fileName 
 */
export function getImageUrl(fileName) {
    // return `https://javaprime-week1-api.herokuapp.com/${fileName}`;
    return 'https://lafeber.com/pet-birds/wp-content/uploads/2020/03/macaw-face-px-ara-3695678-300x300.jpg'
}