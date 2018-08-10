An Angular application to live test investment strategies. Performance is tracked and evaluated on a remote server and displayed in this application. Results can be made available publicly or under a key to protect intellectual property. Backend investment logic is never exposed, only results and statistics related to performance are displayed. This application is designed such that everything can be controlled from the server including the menus displayed, statistics given, and timescale displayed on the graph.

* [Screenshots](#screenshots)
* [API](#api)
  * [Request and Send Graph Data](#request-and-send-graph-data)
  * [Request and Send Dashboard Data](#request-and-send-dashboard-data)
  * [Email For Key Request](#email-for-key-request)
* [Server Backend](#server-backend)
* [Live Financial Data API Recommendations](#live-financial-data-api-recommendations)
* [Angular Information](#algorithm-monitor)

## Screenshots
<img src="./graph-alg.png" width="80%">
<img src="./dash-alg.png" width="80%">
<img src="./dropdown-alg.png" width="80%">

## API
Two addresses need to be specified under [master/src/app/data.service.ts](https://github.com/VD44/Quantitative-Financial-Strategies-Monitor/blob/master/src/app/data.service.ts). By default they are set to:
```typescript
pollUrl = 'http://localhost:8008/data';
statsUrl = 'http://localhost:8008/stats';
```
### Request and Send Graph Data
First, in order to display a graph and statistics for a specific strategy, this application will send a post request to ```pollUrl``` as such:
```typescript
{
  id : 'abcd1234', // the id of the algorithm that you want to view
  
  key : 'somekey', // the key the user has submitted to the server. '' if no key
  
  options : { // the selected options from the dropdown menus above the graph
    'leverage' : 1.5, // these are examples, you can use whatever names and values you want
    'rebalance' : 'weekly'
  }
}
```

The server should respond as such:
```typescript
{
  status : 200, //this value should be constant
  
  dates : ['2017-01-02', '2017-01-02', ...], // array of date strings following this format
  
  algorithm : [0, 0.006, 0.004, 0.0073, ...], // array with (normalized) data about algorithm performace
  
  benchmark : [0, 0.005, 0.004, 0.0064, ...], // array with (normalized) benchmark data for comparison
  
  benchmark-symbol : 'SPY', // the symbol that represents the benchmark above
  
  options : { // options and parameters to appear in dropdown select menu above graph,
    // selecting an option in the menu sends a new POST request to the server to get 
    // an updated version of the results with these options
    leverage : [1.0, 1.5, 2.0], // these are examples, you can use whatever names and values you want
    rebalance : ['weekly', 'monthly']
  },
  
  defaults : { // the defaults for the above options
    leverage : 1.0,
    rebalance : 'monthly'
  },
  
  stats : { // stats to display under the graph
    returns : 2.13, // these are examples, you can use whatever names and values you want
    alpha : 0.11,
    beta : 0.33,
    sharpe : 1.24,
    drawdown : 0.51
  }
}
```

### Request and Send Dashboard Data
Second, in order to populate the dashboard that displays the available strategies, the application sends a request to ```statsUrl``` expecting to receive a response as such from the server:
```typescript
[
  {
    id : 'abcd1234', // (string) some unique id to identify this strategy
  
    desc : 'Some Description', // (string) simple description to be displayed on dashboard card
  
    stats : { // a json object that returns whatever stats you want to display on the dashboard cards
      alpha : 0.11, // these are just examples, these stats can have any name and value
      beta : 0.29,
      sharpe : 1.2
  }
  ... // an array of x number or strategies following the above example
]
```
### Email for Key Request
In addition, an email can be specified under [master/src/app/data.service.ts](https://github.com/VD44/Quantitative-Financial-Strategies-Monitor/blob/master/src/app/data.service.ts) for others to request keys. This mailto link will appear under the "Request Keys" link. By default set to an empty string:
```typescript
keysEmail = '';
```
## Server Backend
All calculations should take place on a remove server in order to protect intelectual property. It is recommended that performance time series data is stored in a database using SQL, MongoDB, etc for the purpose of security, stability and efficiency.

## Live Financial Data API Recommendations
[Alphavantage](https://www.alphavantage.co/) provides free live data for countless financial instruments across many markets for researchers, engineers, and business professionals. Historical and intraday data is also available using the free api. The API is extremely useful for live testing investment strategies.

# Algorithm Monitor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
