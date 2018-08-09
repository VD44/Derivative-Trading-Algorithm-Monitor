Angular application to monitor investment strategy performance calculated on a remote server. Results can be made available publicly or under a key to protect intellectual privacy. Backend logic related to strategies is never exposed in either case, only results and statistics related to performance over time are displayed.

Two addresses need to be specified under [master/src/app/data.service.ts](https://github.com/VD44/Quantitative-Financial-Strategies-Monitor/blob/master/src/app/data.service.ts). By default they are set to:
```typescript
pollUrl = 'http://localhost:8008/data';
statsUrl = 'http://localhost:8008/stats';
```

First, in order to display a graph and statistics for a specific strategy this application will send a post request to ```pollUrl``` as such:
```typescript
{
  id : 'abcd1234', // the id to identify the you want to view
  
  key : 'somekey', // the key the user has submitted to the server. '' if no key
  
  options : { // the selected options from the dropdown menus above the graph
    'leverage' : 1.5, // these are examples, you can use whatever names and values you want
    'rebalance' : 'weekly'
  }
}
```

And expects to recieve a response as such:
```typescript
{
  status : 200, //this value should be constant
  
  dates : ['2017-01-02', '2017-01-02', ...], // array of date strings following this format
  
  algorithm : [0, 0.006, 0.004, 0.0073, ...], // array with (normalized) data about the algorithms performace over time
  
  benchmark : [0, 0.005, 0.004, 0.0064, ...], // array with (normalized) benchmark data for comparison to algorithm
  
  benchmark-symbol : 'SPY', // the symbol that represents the benchmark above
  
  options : { // options and parameters to appear in dropdown select menu above graph,
    // selecting an option in the menu sends a new POST request to the server to get 
    // an update version of the results with these options
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
    beta : 0.34,
    sharpe : 1.24,
    drawdown : 0.51
  }
}
```


Second, in order to populate the dashboard that displays the available strategies a get request will be sent to ```statsUrl``` expecting to receive a response as such:
```typescript
[
  {
    id : 'abcd1234', // (string) some unique id to identify this strategy
  
    desc : 'Some Description', // (string) simple description to be displayed on dashboard card
  
    stats : { // a json object that returns whatever stats you want to display on the dashboard cards
      alpha : 0.11, // these are just examples, these stats can
      beta : 0.29, // have whatever names and values you wish to display
      sharpe : 1.2
  }
  ... // an array of x number or strategies following the above example
]
```

All calculations take place on a remove server as to protect intelectual privacy. It is recommended that performance time series data is stored in a database using SQL, MongoDB, etc for the purpose of security, stability and effeciency.

In addition, an email can be specified under [master/src/app/data.service.ts](https://github.com/VD44/Quantitative-Financial-Strategies-Monitor/blob/master/src/app/data.service.ts) for others to request keys. By default set to:
```typescript
keysEmail = 'algo.keys@gmail.com';
```
## Screenshots
<img src="./graph-alg.png" width="80%">
<img src="./dash-alg.png" width="80%">
<img src="./dropdown-alg.png" width="80%">

# AlgMonitor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
