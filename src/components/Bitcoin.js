import React, { useEffect } from 'react';
import { useState } from 'react';
import useInterval from './useInterval';
import "./components.css";

const TIME_INTERVAL = 4000;
function Bitcoin() {
  const [prices, setPrices] = useState(
    {
      data: {},
      time: '',
      isLoading: false,
      isError: false,
    })
  const [symbols] = useState({
    USD: "$",
    EUR: "€",
    GBP: "£",
  })
  const [colors, setColors] = useState([]);


  const getData = (isFirstCall) => {
    setPrices({ ...prices, isLoading: true });

    const api = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    fetch(api, {
      method: 'GET',
    }).then(res => {
      res.json().then(res => {
        if (prices.time !== res.time.updated) {

          setColors([])
          if (!isFirstCall && prices.time === res.time.updated) {
            return;
          }
          if (isFirstCall && prices.time === '') {
            setColors(Array(Object.keys(res.bpi).length).fill("black"))
            setPrices({ ...prices, data: res.bpi, time: res.time.updated });
            return;
          }
          Object.keys(res.bpi).forEach(key => {
            if (res.bpi[key].rate > prices.data[key].rate) {
              setColors(prevState => [...prevState, "green"])
            } else if (res.bpi[key].rate < prices.data[key].rate) {
              setColors(prevState => [...prevState, "red"])
            } else {
              setColors(prevState => [...prevState, "black"])
            }
          })
          setPrices({ ...prices, data: res.bpi, time: res.time.updated });
          return;
        }
        setColors(Array(Object.keys(res.bpi).length).fill("black"))
        setPrices({ ...prices, data: res.bpi, time: res.time.updated });
      }).catch(error => console.error(error), setPrices({ ...prices, isError: true }));
    }).catch(error => console.error(error), setPrices({ ...prices, isError: true }))
  };

  useEffect(() => {
    (async () => {
      await getData(true);
    })();
  }, [])

  useInterval(async () => {
    await getData(false);
  }, TIME_INTERVAL);

  return (
    <div className='bitcoin-parent'>
      <div className='bitcoin-child'>
        {
          prices?.data && Object.keys(prices.data).map((key, index) => {
            return <div className='currency-card' key={index}>
              <p className="tooltip">
                {prices.data[key].code}
                <span className="tooltiptext">{prices.data[key].description}</span>
              </p>
              <p key={key} style={{ color: colors[index] }}>{prices.data[key].rate.substr(0, 6)}{symbols[key]}</p>
            </div>
          })
        }
      </div>
     
    </div>
  );
}


export default Bitcoin;

