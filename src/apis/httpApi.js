
/**
 * Makes a http GET request to the given URL.
 * 
 * Returns the response as json on success, else an error object is thrown.
 * 
 * @param {String} url
 * @param {Map} headers
 * @param {String} keyToReturn
 */
export async function get(url, keyToReturn, headers = {}) {
    const response = await fetch(url, {
        headers: headers,
    });

    return await _checkForError(response, keyToReturn);
}

/**
 * Makes a http POST request to the given URL.
 * 
 * Returns the response as json on success, else an error object is thrown.
 * 
 * @param {String} url
 * @param {Map} headers
 * @param {any} data
 * @param {String} keyToReturn
 */
export async function post(url, data, keyToReturn, headers = {}) {
    return await _fetchWithData(url, 'POST', data, keyToReturn, headers);
}

/**
 * Makes a http PATCH request to the given URL.
 * 
 * Returns the response as json on success, else an error object is thrown.
 * 
 * @param {String} url
 * @param {Map} headers
 * @param {any} data
 * @param {String} keyToReturn
 */
export async function patch(url, data, keyToReturn, headers = {}) {
    return await _fetchWithData(url, 'PATCH', data, keyToReturn, headers);
}

/**
 * @param {String} url
 * @param {String} method
 * @param {Map} headers
 * @param {any} data
 * @param {String} keyToReturn
 */
async function _fetchWithData(url, method, data, keyToReturn, headers = {}) {
    const response = await fetch(url, {
        method: method,
        headers: headers,
        mode: 'no-cors',
        body: JSON.stringify(data)
    });

    return await _checkForError(response, keyToReturn);
}


/**
 * @param {Response} response
 * @param {String} keyToReturn
 */
async function _checkForError(response, keyToReturn) {
    console.log(await response.text());
    if (response.status === 404)
        throw Error('404- Requested endpoint not found');

    var json = await response.json();
    if (response.status !== 200) {
        var error = Object.assign(new Error(json?.errorMessage), {
            errorMessage: json?.errorMessage,
            status: response.status,
        })
        throw error;
    } else {
        return JSON.parse(json[keyToReturn]);
    }
}