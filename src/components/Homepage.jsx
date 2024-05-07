import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies,News} from '../components'

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);

  console.log("Data:", data);
  console.log("Is Fetching:", isFetching);
  console.log("Error:", error);

  if (isFetching) return <Spin size="large" />;
  // if (error) return <div>Error: {error.message}</div>;
  // if (!data || !data.stats) return console.log("null");
  if (!data) return <Spin size="large" />;



  // const { total, totalCoins, totalMarkets, totalExchanges, totalMarketCap, total24hVolume } = data.stats;
  let globalStats=data?.data?.stats;
  return (
    <div >
      <Title level={2} className='heading' >Global Crypto Stats</Title>
      <Row gutter={[32, 32]} style={{gap:'60px',margin:'auto',textAlign:'center',paddingTop:'30px',width:'100vw'}}>
        <Col xs={24} sm={12} md={6} lg={3} ><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
        <Col xs={24} sm={12} md={6} lg={3}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col xs={24} sm={12} md={6} lg={3}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col xs={24} sm={12} md={6} lg={3}><Statistic title="Total 24hrs Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col xs={24} sm={12} md={6} lg={3}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>

      <div className='home-heading-container' style={{margin:'40px'}}>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified={true}/>

      <div className='home-heading-container' style={{margin:'40px'}}>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified={true}/>
    </div>
  );
};

export default Homepage;
