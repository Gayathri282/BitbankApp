import React, { useEffect, useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Col, Row, Spin ,Input} from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import CryptoDetails from './CryptoDetails';

const Cryptocurrencies = ({ simplified }) => {
  let count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Filter the data based on the search term
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update the cryptos state with the filtered data
    setCryptos(filteredData || []);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Spin size="large" />;
console.log(cryptos)
  return (
    <>
      {!simplified && <div className='search-crypto'>
        <Input placeholder='Search here...' onChange={(e) => setSearchTerm(e.target.value)} />
      </div>}
      <Row gutter={[16, 16]} className='crypto-card-container'>
        {cryptos.map((currency) => (
          <Col xs={24} md={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank} ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} />} hoverable>
                <p>Price: {millify(currency.marketCap)}</p>
                <p>Market Cap: {millify(currency.price)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
