import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import React from 'react';
import { Button, Typography} from 'antd';

export default function Home() {
  const { Title, Paragraph} = Typography;
  return (
    <div className={styles.container}>
      <Head>
        <title>Krocodile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
       <Title>Krocodile</Title>
       <Paragraph>
         Начни играть с друзьями!
       </Paragraph>
       <Button type="primary">Играть!</Button>
      </div>
    </div>
  );
}
