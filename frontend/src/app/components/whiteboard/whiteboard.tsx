import React, { createRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Button } from 'antd';
import CirclePicker from 'react-color/lib/components/circle/Circle';
import styles from './whiteboard.module.scss';

class Whiteboard extends React.Component {

    state = {
        brushColor: '#000',
    };
    private canvasRef = createRef<any>();

    handleChangeComplete = (color: any) => {
        this.setState({brushColor: color.hex});
    };

    render() {

        return (
            <div className={styles.whiteboard}>

                <CirclePicker
                    className={styles.circlesColors}
                    colors={['#000', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', 'white']}
                    circleSpacing={5}
                    circleSize={14}
                    color={this.state.brushColor}
                    onChangeComplete={this.handleChangeComplete}
                />
                <CanvasDraw
                    className={styles.whiteboardBoard}
                    immediateLoading={true} ref={this.canvasRef} hideGrid={false}
                    catenaryColor={this.state.brushColor} brushRadius={1}
                    brushColor={this.state.brushColor}
                    canvasWidth={'70%'}
                    canvasHeight={'500px'}
                    backgroundColor={'#E0E2DB'}
                />

                <Button className={styles.whiteboardButton}
                    onClick={() => {
                        this.canvasRef.current.clear();
                    }}
                >
                    Clear
                </Button>
            </div>
        )
            ;
    }
}

export { Whiteboard };

