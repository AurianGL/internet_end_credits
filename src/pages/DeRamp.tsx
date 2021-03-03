import React from 'react'
import {Canvas} from '../components';

interface DeRampProps {

}

export const DeRamp: React.FC<DeRampProps> = () => {
    return (
      <div style={{padding: "20px", backgroundColor: 'red'}}>
        <div>DE RAMP</div>
        <Canvas></Canvas>
      </div>
    );
}