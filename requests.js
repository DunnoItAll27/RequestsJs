
/* Coded By https://github.com/msfpt */

class $request {
    constructor(url, data = { method, params: {}, header: {}, success: (response, status) => { }, error: (error) => { } }) {

        // old compatibility code, now useless
        if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
            this.httpRequest = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) { // IE6
            this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            console.warn("Browser does not support XMLHttpRequest !");
            return false;
        }

        this.url = url;
        this.method = data.method ? data.method : 'GET';
        this.header = data.header;
        this.params = data.params;
        this.success = data.success ? data.success : (response, status) => { };
        this.error = data.error ? data.error : (error) => { };

        if (!this.isValidURL(this.url)) {
            // console.warn("URL is not correct!");
        }

        try {

            this.httpRequest.onreadystatechange = event => {
                if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
                    this.success(this.httpRequest.responseText, this.httpRequest.status);
                }
            };

            this.httpRequest.open(this.method, this.url, true);

            this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            this.httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            this.httpRequest.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            try {
                if (Object.keys(this.header).length > 0) {
                    for (let index = 0; index < Object.keys(this.header).length; index++) {
                        const h_key = Object.keys(this.header)[index];
                        const h_data = this.header[h_key];
                        this.httpRequest.setRequestHeader(h_key, h_data);
                    }
                }
            } catch (error) { }

            try {
                if (Object.keys(this.params).length > 0) {
                    var parameters = [];
                    for (let index = 0; index < Object.keys(this.params).length; index++) {
                        const p_key = Object.keys(this.params)[index];
                        const p_data = this.params[p_key];
                        parameters.push(p_key + '=' + p_data)
                    }
                    this.httpRequest.send(parameters.join('&'));
                }
            } catch (error) {
                this.httpRequest.send(null);
            }

        } catch (error) {
            this.error(error);
        }

        return this
    }
    isValidURL = url => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
}