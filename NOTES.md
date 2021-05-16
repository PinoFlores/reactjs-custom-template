# Table vs Redux

Any table has two options to get data:

- 1.  get data base on pages: `ModelReducer.currentPage`
- 2.  get raw data : `ModelReducer.all`

`ModelReducer.currentPage` point to an object type : {data, pagination}
`ModelReducer.all` point to an array of pages : [{data, pagination}]

**Actions**
`ModelAction.getPage(number, perPage)` dispatch an order to set `ModelReducer.currentPage`
`ModelAction.selectAll()` dispatch an order to set `ModelReducer.all`
