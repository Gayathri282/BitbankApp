import React from 'react'
import './App.css';
import {CryptoDetails, Cryptocurrencies, Exchanges, Homepage, Navbar, News} from './components'
import { Route,Link, Routes } from 'react-router-dom';
import { Layout,Typography,Space } from 'antd';
function App() {
  return (
    <div className="App">
     <div className='navabr'>
      <Navbar/>
     </div>
     <div className='main'>
      <Layout>
        <div className='routes'>
          {/* <Router> */}
          <Routes>
              <Route exact path='/' element={<Homepage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          {/* </Router> */}
        </div>
      </Layout>
     </div>
     <div className='footer'>
      <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
        BitBank <br/>
        All rights reserved
      </Typography.Title>
      <Space>
        <Link to='/'>Home</Link>
        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        <Link to='/news'>News</Link>
      </Space>
     </div>
    </div>
  );
}

export default App;
