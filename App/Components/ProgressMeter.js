import React from 'react';
import { View, Text } from 'react-native';

import { AnimatedCircularProgress } from "react-native-circular-progress";

const ProgressMeter = (props) => {
    return (
        <View style={{margin: 30, marginTop:50}}>
            <AnimatedCircularProgress
                size={300}
                width={10}
                fill={props.point}
                tintColor={props.color}
                backgroundColor="#D3D3D3"
                backgroundWidth={20}
                rotation={270}
                arcSweepAngle={180}
                lineCap="round" >
            {() => (
              <>
                <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                  {props.point}
                </Text>
                <Text style={{ fontSize: 26, fontWeight: "bold" }}>{props.title}</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
    );
}

export default ProgressMeter;