import React from 'react';
import styles from './index.module.scss';
interface PalleteProps {
    onChangeColor: (color: string) => void;
}

const Pallete: React.FC<PalleteProps> = ({onChangeColor}) => {
    const [colors, setColors] = React.useState([]);
    React.useEffect(() => {
        // генерируем палитру
        // в итоге 5^3 цветов = 125
        const colors = [];
        for (var r = 0, max = 4; r <= max; r++) {
            for (var g = 0; g <= max; g++) {
                for (var b = 0; b <= max; b++) {
                    const color = `rgba(${Math.round(r * 255 / max)},${Math.round(g * 255 / max)},${Math.round(b * 255 / max)})`;
                    colors.push(color);
                }
            }
        }
        setColors(colors);
    }, [])
    return (
        <div className={styles.root}>
            {colors.map((color) => <div key={color} onClick={() => {onChangeColor(color)}} className={styles.item} style={{backgroundColor: color}}></div>)}
        </div>
    )
}

export default Pallete