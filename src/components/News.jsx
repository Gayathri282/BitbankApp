import React, { useState } from 'react';
import { Spin, Row, Col, Card, Typography, Select, Avatar } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const count = simplified ? 6 : 100;
  const { data: cryptoData } = useGetCryptosQuery(100);
  const [selectedCoin, setSelectedCoin] = useState('');
  const { data: cryptoNews, isLoading } = useGetCryptoNewsQuery({ count });

  if (isLoading) return <Spin size="large" />;

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Row gutter={[24, 24]}>
      {/* {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a crypto'
            optionFilterProp='children'
            onChange={(value) => setSelectedCoin(value)}
            filterOption={filterOption}
            value={selectedCoin}
          >
            <Option value=''>All Currencies</Option>
            {cryptoData?.data?.coins.map((coin) => (
              <Option key={coin.uuid} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )} */}
      {cryptoNews.data.slice(0, count).map((news) => (
        <Col xs={24} sm={12} lg={6} key={news.id}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noopener noreferrer'>
              <div className='news-image-container'>
                <h3>{news.title}</h3><br/>
                <img src={news?.thumbnail} alt='news' style={{ width: '50px', height: '50px' }} />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description }</p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news?.thumbnail} />
                  <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
