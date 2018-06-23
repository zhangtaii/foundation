import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Echarts from 'native-echarts';

export default class EnergyScreen extends React.Component {
  static navigationOptions = {
    title: 'Energy',
  };

  render() {
    const option = {
    title: {
        // text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['Dinning','Kitchen','Living','Master Bed','Bed 1']
    },
    toolbox: {
        // feature: {
        //     saveAsImage: {}
        // }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'Dinning',
            type:'line',
            stack: 'Walts',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'Kitchen',
            type:'line',
            stack: 'Walts',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'Master Bed',
            type:'line',
            stack: 'Walts',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'Living',
            type:'line',
            stack: 'Walts',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'Bed 1',
            type:'line',
            stack: 'Walts',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
    return (
      <ScrollView style={styles.container}>
            <Echarts option={option} height={300} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
