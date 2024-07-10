import '../styles/globals.scss';
import { Layout } from 'antd';

export default function App({ Component, pageProps }) {
    
const { Header, Content, Footer } = Layout;
  return  <Layout style={{ background: '#91caff', minHeight: '100vh' }}>
      <Header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Component {...pageProps} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', marginTop: 'auto', background: '#0958d9' }}>Krocodile</Footer>
    </Layout>;
}