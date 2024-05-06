import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptosDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { Col, Row, Select, Typography, Spin } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, ThunderboltOutlined, NumberOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser/lib/index';
import LineChart from './LineChart';
import { useEffect } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
// function convertDaysToUnixTime(days) {
//   const secondsInADay = 24 * 60 * 60; // 1 day = 24 hours * 60 minutes * 60 seconds
//   const currentUnixTime = Math.floor(Date.now() / 1000); // Current Unix time in seconds

//   const durationInSeconds = days * secondsInADay; // Convert days to seconds
//   const unixTime = currentUnixTime + durationInSeconds; // Add duration to current Unix time

//   return unixTime;
// }

const CryptoDetails = () => {
    const { coinId } = useParams();
    let [timePeriod, setTimePeriod] = useState();
    const { data: cryptoData, isFetching: isFetchingCryptoDetails } = useGetCryptosDetailsQuery(coinId);
    // timePeriod=convertDaysToUnixTime(parseInt(timePeriod)) 
    const { data: coinHistory, isFetching: isFetchingHistory, refetch: refetchCoinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = cryptoData?.data?.coin;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    useEffect(() => {
      // Refetch coin history when time period changes
      refetchCoinHistory({ coinId, timePeriod });
  }, [timePeriod]);

    if (isFetchingCryptoDetails || isFetchingHistory) return <Spin size="large" />;
    if (!cryptoDetails) return <div>No data available</div>;

    console.log('Crypto Details:', cryptoDetails);
    console.log('Coin History:', coinHistory);
    console.log('Coin time period:', timePeriod);

    const stats = [
        { title: "Price to USD", value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.supply['confirmed'] ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply['total'])}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply['circulating'])}`, icon: <ExclamationCircleOutlined /> },
    ];
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
        {cryptoDetails.name} live price in US Dollars
        View value statistics,market cap & supply
        </p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" value={timePeriod} onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
<LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
<Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
          <Title level={4}>{HTMLReactParser(cryptoDetails.description)}</Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;