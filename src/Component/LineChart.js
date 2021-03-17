import React, { useEffect, useState } from 'react';
import { Row,Col,Container,Tooltip } from 'reactstrap';
import {Line} from 'react-chartjs-2';
function LineChart(){
    //base chart data before render
     const [chartdata, setChartData]=useState({});
     const [data,setData]=useState([12,38,15,22,30,18,60]);
     const [labal, setLabal]=useState(['Jan', 'Feb','Mar','Apr','May','Jun',
     'Jul']);
     // Hold the data after delete operation perform
     const [chartEntries, setchartEntries] = useState([]);
     const [label, setlableEntries]=useState([]);
     // Hold Average & Delete Value
     const [average, setAverage]=useState(0);
     const [excludedata,setExclude]=useState(0);
     //Prevous data hold before update;
     const[tempdata,setTempdata]=useState(0);
     const[templabel, setTemplabel]=useState(0);
     //Tooltip
     const [tooltipOpen, setTooltipOpen] = useState(false);

     const toggle = () => setTooltipOpen(!tooltipOpen);
 




     const handleDelete = (event) => {
        setTempdata(chartEntries);
        setTemplabel(label);
         if(event.length>0){
            let index=event[0]._index;
            setExclude(chartEntries[index]);
            let newEntries = chartEntries.filter((entry, entryIindex) => entryIindex !== index);
            setchartEntries(newEntries)
            let newlableEntries=label.filter((entry,labalentry)=>labalentry!==index);
            setlableEntries(newlableEntries);
            setAverage(find_average(newEntries));
         }

     }
    const find_average=(array)=>{
        var sum = 0;
        array.forEach(num => {
            sum += num;
        });
        return sum / array.length
    }
    
     const chart =()=>{
         setChartData({
             labels:label,
             datasets:[{
                 label:[
                      "No of Vote"
                 ],
                 data: data,
                 borderColor: [
                     'rgba(255, 99, 132, 1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)',
                     'rgba(255, 103, 74, 1)'
                 ],
                 hoverBackgroundColor:'green',
                 borderWidth:4,
   
             }],

         })
     }

   
   const options={
       responsive:true,
       title:{
          display:true,
          text:'Chartjs Line',
       },
       tooltips:{
             
              },

       scales:{
           xAxes:[{
               display:true,
               scaleLabel:{
                  display:true,
                   labelString:'Month'
               }
           }],
           yAxes:[{
               display:true,
               scaleLabel:{
                   display:true,
                   labelString:'Value'
               }
           }],
       }
   }
const upPrevData=(event)=>{
    setExclude(0);
    setlableEntries(templabel);
    setchartEntries(tempdata);
    setAverage(find_average(tempdata));
}
 useEffect(()=>{ 
    if(chartEntries.length > 0) {
     chart()
    }else{
        setlableEntries(labal);
        setchartEntries(data);
        setAverage(find_average(data));
    }
 },[chartEntries]

 )

    return(
        <Container>
           <Row>
               <Col style={{width:"500px"}} >
            <Line data={chartdata} options={options}  onElementsClick={(e) =>handleDelete(e)}/></Col>
            <Col justify-center style={{padding:"20px"}}>
           <h5 onClick={()=>upPrevData()} id="ExcludeDataMsg">Excluding Data:{excludedata}</h5>
           <Tooltip placement="left" isOpen={tooltipOpen} target="ExcludeDataMsg" toggle={toggle}>
        Click me to Enclude this Data
      </Tooltip>
            <h5>Average of Data:{average}</h5>
            </Col> 
            </Row> 
        </Container>
    )
}

export default LineChart;