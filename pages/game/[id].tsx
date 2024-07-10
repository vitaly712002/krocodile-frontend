import Head from 'next/head';
import styles from '../../styles/Game.module.scss';
import React, { useState } from 'react';
import Paint, { PaintCoords } from '../../components/Canvas/Paint';
import Pallete from '../../components/Canvas/Pallete';
import {Button, Input, Space, Typography} from 'antd';
import { io, Socket } from 'socket.io-client';

export default function Game() {
    const { Title } = Typography;
    const [color, setColor] = React.useState<string>('blue');
    const socketRef = React.useRef<Socket>()
    const canvasRef = React.useRef<HTMLCanvasElement>()
    React.useEffect(() => {
        socketRef.current = io('http://localhost:3030');
        const canvasContext: CanvasRenderingContext2D | null = canvasRef.current?.getContext("2d");
        if(canvasContext) {
            socketRef.current.on('paintReceive', data => {
                const {x, y, dx, dy } = data;
                canvasContext.beginPath();
                canvasContext.moveTo(x, y);
                canvasContext.lineTo(x - dx, y - dy);
                canvasContext.stroke();
                canvasContext.closePath();
            })
            socketRef.current.on('clear_canvas', () => {
                canvasContext.clearRect(0, 0, canvasRef.current?.width||0, canvasRef.current?.height||0);
            })

            socketRef.current.on('change_color', (color) => {
                setColor(color);
                 console.log(color);
            })
        }
        

      
    }, []);

    const onMouseMove = (data: PaintCoords) => {
        if(socketRef) {
            socketRef.current.emit('paintSend', data)
        }
    }

    const onClear = () => {
        if(socketRef) {
            socketRef.current.emit('clear')
        }
    }

    const handleChangeColor = (color: string) => {
        setColor(color);
        if(socketRef) {
            socketRef.current.emit('colorSend', color)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //console.log('Change:', e.target.value);
    };

    

    const { TextArea } = Input;
    return (
        <div className={styles.container}>
            <Head>
                <title>Game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.chat}>
                    <Title level={2}>Чат</Title>
                    <hr />
                    <Space>
                        <div className={styles.chat.item}>
                            <b>Вася пупкин: </b> Сообщение Васи пупкина
                        </div>
                    </Space>
                    <div className={styles.inputWrapper}>
                        <TextArea showCount maxLength={100} onChange={onChange} />
                        <Button style={{width: '100%'}} type="primary">Отправить</Button>
                    </div>
                </div>
                <div className={styles.game}>
                    <div className={styles.paint}>
                      <Paint color={color} onPaint={onMouseMove} onClear={onClear} onInit={canvas => canvasRef.current = canvas}/>
                    </div>
                    <div className={styles.pallete}>
                      <Pallete onChangeColor={handleChangeColor}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
