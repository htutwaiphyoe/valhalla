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

    filter() {
        const urlQueryCopy = { ...this.urlQuery };
        // remove fields from url query

        const removedFields = ["location", "page", "limit"];
        removedFields.forEach((el) => delete urlQueryCopy[el]);

        // chain database query
        this.dbQuery = this.dbQuery.find(urlQueryCopy);
        return this;
    }

    paginate() {
        // get page
        const page = +this.urlQuery.page || 1;
        // get result per page
        const limit = +this.urlQuery.limit || 10;
        // calculate how many results are skipped
        const skip = limit * (page - 1);

        // chain database query
        this.dbQuery = this.dbQuery.skip(skip).limit(limit);
        return this;
    }
}

export default APIFeatures;
