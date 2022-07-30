# Open chartink backtest links directly into tradview with given date

Note: This only works for desktop browser and only with [chartink](https://chartink.com/)  <--> [tradingview](https://in.tradingview.com/)

## Steps to use this tool


### Step1: Create chartink bookmark

1. create a bookmark in your browser
2. in the URL field past the content of the file [chartinkBookmark.js](https://github.com/himanshumeena/chartink_tradingview_linking/blob/master/chartinkBookmark.js)


![image](https://user-images.githubusercontent.com/20402232/134404234-9cfb04da-c8fb-4389-af7a-1c99a02edb28.png)


3. save the bookmark
4. open any of your chartink scan *example*: [52 WEEK HIGH STOCKS
](https://chartink.com/screener/52-week-high-stocks) and after it loads click the bookmark created in step 2
5. now when you backtest i.e. click on any stock link it will direclty open it in tradingview and will also set the date in the url(which will be used in 2nd bookmark)

![image](https://user-images.githubusercontent.com/20402232/136047373-0d66084b-1165-40d8-b226-54cdbd3241a8.png)


### Step2: Create tradingview bookmark

1. create a bookmark in your browser
2. in the URL field past the content of the file [tradingViewBookmark.js](https://github.com/himanshumeena/chartink_tradingview_linking/blob/master/tradingViewBookmark.js)


3. Now once the tradingview page loads with date in the url click on the bookmart you just created it will automatically set the date to the date in the chartink backtest page date

Note: you need to open the tradingview page using the chartink bookmark we created earlier in step 1 for this bookmark to work since it needs date in the url 


Enjoy !!


For any feedback and suggestions or help you can mail : him.10meena@gmail.com
