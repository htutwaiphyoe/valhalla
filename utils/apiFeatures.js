class APIFeatures {
    constructor(dbQuery, urlQuery) {
        this.dbQuery = dbQuery;
        this.urlQuery = urlQuery;
    }

    search() {
        // if location is provided, make filter for address with mongodb regex
        const location = this.urlQuery.location
            ? {
                  address: {
                      $regex: this.urlQuery.location,
                      $options: "i", // i => case-insensitive
                  },
              }
            : {};

        // chain database query
        this.dbQuery = this.dbQuery.find(location);
        return this;
    }
}

export default APIFeatures;
