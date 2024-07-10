import React from 'react'
import styles from './index.module.scss';
import { Button } from 'antd';
interface PaintProps {
    color: string;
    onPaint: (data: PaintCoords) => void;
    onInit: (ref: HTMLCanvasElement) => void;
    onClear: (ref: CanvasRenderingContext2D) => void;
}
export type PaintCoords = {
    x: number;
    y: number;
    dx: number;
    dy: number;
}

const Canvas: React.FC<PaintProps> = ({ color, onPaint, onInit, onClear}) => {
    const rootRef = React.useRef<HTMLCanvasElement>(null);

    const handleClear = () => {
        const context: CanvasRenderingContext2D | null = rootRef.current?.getContext("2d");
        if (context) {
            context.clearRect(0, 0, rootRef.current?.width||0, rootRef.current?.height||0);
            onClear(context);
        }
    }
    
    React.useEffect(() => {
        if (rootRef.current) {
            const context: CanvasRenderingContext2D | null = rootRef.current?.getContext("2d");
            if (context) {
            
                onInit(rootRef.current);
                // переменные для рисования
                rootRef.current.width = rootRef.current.clientWidth;
                rootRef.current.height = rootRef.current.clientHeight;
                context.strokeStyle = color;
                context.lineCap = "round";
                context.lineWidth = 8;
                // На любое движение мыши по canvas будет выполнятся эта функция
                rootRef.current.addEventListener('mousemove', (e) => {
                    // в "e"  попадает экземпляр MouseEvent
                    const x = e.offsetX;
                    const y = e.offsetY;
                    const dx = e.movementX;
                    const dy = e.movementY;

                    // Проверяем зажата ли какая-нибудь кнопка мыши
                    // Если да, то рисуем
                    if (e.buttons > 0) {
                        context.beginPath();
                        context.moveTo(x, y);
                        context.lineTo(x - dx, y - dy);
                        context.stroke();
                        context.closePath();
                        onPaint({x, y, dx, dy });
                    }
                })
            }
        }
    }, []);

    React.useEffect(() => {
        if (rootRef.current) {
             const context: CanvasRenderingContext2D | null = rootRef.current?.getContext("2d");
            if (context) {
                context.strokeStyle = color;
                }
            }
    }, [color]);

    return (
        <div className={styles.root}>
            <canvas ref={rootRef} />
             <Button className={styles.clear} onClick={handleClear} type="primary">Clear</Button>
        </div>
        
    )
}

export default Canvas