import React, { useEffect, useState } from 'react';
//import { Alert } from 'reactstrap';
import {Line} from 'react-chartjs-2';
function LineChart(){
    //Hold Current data before render
     const [chartdata, setChartData]=useState({});
     // Hold tje data after delete operation perform
     const [chartEntries, setchartEntries] = useState([]);
     const [label, setlableEntries]=useState([]);
     // Hold Average & Delete Value
     const [average, setAverage]=useState(0);
     const [excludedata,setExclude]=useState(0);
     //Prevous data hold before update;
     const[tempdata,setTempdata]=useState(0);
     const[templabel, setTemplabel]=useState(0);





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
    function find_average(array) {
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
                 data: chartEntries,
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
function updateData(){
    setChartData(tempdata);
    setchartEntries(templabel);
    setAverage(find_average(tempdata));
}
 useEffect(()=>{ 
    if(chartEntries.length > 0) {
     chart()
    }else{
        let chartEntries = [12,19,15,22,35,18,50];
        let labal=['Jan', 'Feb','Mar','Apr','May','Jun',
        'Jul'];
        setlableEntries(labal);
        setchartEntries(chartEntries);
        setAverage(find_average(chartEntries));

    }
 },[chartEntries]

 
 )

    return(
        <div>
        
            <Line data={chartdata} options={options} width={600} height={300} onElementsClick={(e) =>handleDelete(e)}/>
            <div className="row">
            <div className="col md-6" onClick={()=>updateData()}>Excluding Data:{excludedata}</div>
            <div className="col md-6"> Average of Data:{average}</div>

            <div>{tempdata}</div>
            <div>{templabel}</div>
             </div>  
        
        </div>
    )
}

export default LineChart;