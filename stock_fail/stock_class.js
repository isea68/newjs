export class stock {
    id="";
    date="";
    stock_name="";
    ticker="";
    open=0;
    close=0;
    high=0;
    low=0;
    volume=0;
    market_cap=0;
    sector="";
    constructor(id, date, stock_name, ticker, open, close, high, low, volume, market_cap, sector) {
        this.id=id;
        this.date=date;
        this.stock_name=stock_name;
        this.ticker=ticker;
        this.open=open;
        this.close=close;
        this.high=high;
        this.low=low;
        this.volume=volume;
        this.market_cap=market_cap;
        this.sector=sector;
    }
}