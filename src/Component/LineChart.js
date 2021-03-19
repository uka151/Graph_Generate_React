import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Tooltip } from 'reactstrap';
import { Line } from 'react-chartjs-2';
function LineChart() {
    //base chart data before render
    const [chartdata, setChartData] = useState({});
    const [Data,setData]=useState([12, 38, 15, 22, 30, 18, 60]);
    // Hold the data after delete operation perform
    const [chartEntries, setchartEntries] = useState({});
    const [label, setlableEntries] = useState([]);
    // Hold Average & Delete Value
    const [average, setAverage] = useState(0);
    // object of data
    const [excluded, setexcludeD] = useState([{ Data:'', Label:'' }])

    //Tooltip
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const handleDelete = (event) => {
      
        if (event.length > 0) {
            let index = event[0]._index;
            console.log(event);
            let newList = [...excluded, ...[{ Data: chartEntries[index], Label: label[index] }]]
            setexcludeD(newList.flat());
            console.log("new list of execlude after delete data:" + newList);
            let newEntries = chartEntries.filter((entry, entryIindex) => entryIindex !== index);    
            setchartEntries(newEntries) 
            console.log("new list after delete data chartEntry:" + newEntries);   
            let newlableEntries = label.filter((entry, labalentry) => labalentry !== index);
            setlableEntries(newlableEntries);
            setAverage(find_average(newEntries).toFixed(4));
        }
    }
    const find_average = (array) => {
        var sum = 0;
        array.forEach(num => {
            sum += num;
        });
        return sum / array.length
    }

    const chart = () => {
        setChartData({
            labels: label,
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

    
    const upPrevData = (event) => {
        console.log("Update data call" + event);
        const entry = event.target.innerHTML;
        const x = entry.split(" ");
        setlableEntries([...label,
        x[1]
        ]);
        const FilterData = excluded.filter((item) => item.Label !== x[1]);
        setexcludeD(FilterData);
        setchartEntries([...chartEntries, parseInt(x[0])]);
        setAverage(find_average(chartEntries).toFixed(4));
        console.log("Read data from innerHTML:"+ x);
        console.log("Remove data from exclude update list:"+ excluded);
        console.log("Update chart entry data:"+ chartEntries);
        console.log("Update labal of Data:" + label);

    }
    useEffect(() => {
       
        if (chartEntries.length > 0) {
            chart()
        } else {
            const data=[12, 38, 15, 22, 30, 18, 60];
            const labal=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul']
            setlableEntries(labal);
            setchartEntries(data);
            setAverage(find_average(data).toFixed(4));
        }

   
    }, [chartEntries],
    

    )

    return (
        <Container>
            <Row>
                <Col style={{ width: "500px" }} >
                    <Line data={chartdata} options={options} onElementsClick={(e) => handleDelete(e)} /></Col>
                <Col justify-center style={{ padding: "20px" }}>
                    <h5 id="ExcludeDataMsg">Excluding Data:</h5>
                    <Row>
                        {excluded.map((item, i) => (
                            <>
                                <Col>
                                    <h6 onClick={(e) => upPrevData(e)} >{item.Data} {item.Label}</h6></Col>
                            </>
                        ))}
                    </Row>
   
                    <h5>Average of Data:{average}</h5>
                </Col>
            </Row>
        </Container>
    )
}

export default LineChart;