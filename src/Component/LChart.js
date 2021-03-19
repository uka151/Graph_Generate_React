import React, { useEffect, useState } from 'react';
import {Line}  from 'react-chartjs-2';
import {Row,Col,Container,Button} from 'reactstrap';
//import { ReactTags } from 'react-tag-input';

const LineChart =()=>{
  // Main ChartData
    const[chartReady,setChartReady]=useState();
    const[chartdata,setChartData]=useState([{Data:14,Month:'Jan'},{Data:35,Month:'Feb'},{Data:40,Month:'Mar'},{Data:5,Month:'Apr'},{Data:60,Month:'May'},{Data:44,Month:'Jun'}])
  // ChartUpdate data
    const[Data,setData]=useState(0);
    const[Label,setLable]=useState("");
  // Average & ExcludeData List
    const[ExcludeData,setExecludeData]=useState([{ Data:'', Label:'' }])

    const chart = () => {
        let d=chartdata.map((item)=>item.Data);
        setData(d);
        let l=chartdata.map((item)=>item.Month);
        setLable(l);
        setChartReady({
            labels: Label,
            datasets: [{
                label: [
                    "No of Vote"
                ],
                data:Data,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 103, 74, 1)'
                ],
                hoverBackgroundColor: 'green',
                borderWidth: 4,

            }],

        })
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Chartjs Line',
        },
        tooltips: {

        },
        scales:{
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }],
        }
    }


    const handleDelete=(event)=>{
        if(event.length>0){
            let index = event[0]._index;
            let d=Data[index];
            let newExeclude = [...ExcludeData, ...[{ Data: Data[index], Label: Label[index] }]];
            setExecludeData(newExeclude.flat())
            let newList=chartdata.filter((entry)=>entry.Data!==d);
            setChartData(newList);
           
        }  
    }
    
    
    const updataDatatoMain=(e)=>{
        let x=e.target.innerText.split(" ");
        let updateList=[...chartdata, ...[{ Data: parseInt(x[0]), Month:x[1] }]];
        setChartData(updateList.flat());
        chartdata.sort((a, b) => a.Month.localeCompare(b.Month));
        setExecludeData(ExcludeData.filter((item)=>item.Label!==x[1]));
        
       
    }
    
    const find_Average =(array)=>{
        let sum = 0;
        array.forEach(num => {
            sum += num;
        });
        return sum / array.length
    }
useEffect(()=>{  
        chart(); 
        const allMonths = ['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        chartdata.sort(function(a,b){
        return allMonths.indexOf(a.Month) - allMonths.indexOf(b.Month);
    });

 })
    
    return(
        <>
        <Container>
            <Row>
                <Col style={{ width: "500px" }} >
                <Line data={chartReady} options={options} onElementsClick={(e) => handleDelete(e)} /></Col>
                <Col justify-center style={{ padding: "20px" }}>
                <h5>Excluding Data:</h5>
                 <p>Please click on data for Enclude:</p>
                    <Row>
                   { ExcludeData.map((item, i) => (
                          <>                           
                            {item.Data!==''?<Button color="secondary" style={{margin:"20px"}} onClick={(e) => updataDatatoMain(e)} >{item.Data} {item.Label}</Button> 
                            :null}        
                            </>
                        ))}
                    </Row>
   
                    <h6>Average:{Data.length>0?find_Average(Data):null}</h6>
                </Col>
            </Row>
        </Container>
        
        
        </>
    )
    }

export default LineChart;