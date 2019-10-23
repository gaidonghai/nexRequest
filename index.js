const retryRequest = require('retry-request');

class nexRequest {
    constructor(options) {
        if (!options) options = {};
        this.options = options;

        //Binders:
        this.basic=this.basic.bind(this);
        this.responseObject=this.responseObject.bind(this);
        this.responseBody=this.responseBody.bind(this);
        this.responseHeader=this.responseHeader.bind(this);
    }

    basic(requestOptions) {
        return new Promise((resolve, reject) => {
            //Patch for URL:
            if(requestOptions instanceof URL) requestOptions={url:requestOptions};
            retryRequest(requestOptions, this.options, (err, responseObject, responseBody) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        responseObject,
                        responseBody
                    })
                }
            })
        })
    }

    //shorthand uses
    async responseObject(requestOptions) {
        let result = await this.basic(requestOptions);
        return result.responseObject;
    }

    async responseBody(requestOptions) {
        let result = await this.basic(requestOptions);
        return result.responseBody;
    }

    async responseHeader(requestOptions) {
        let result = await this.basic(requestOptions);
        return result.responseObject.headers;
    }

}

module.exports = nexRequest;
