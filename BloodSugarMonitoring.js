import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-moment';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register the necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    annotationPlugin
);

const data = {
    labels: [
        "01-11-23 00:02", "01-11-23 00:07", "01-11-23 00:12", "01-11-23 00:17", "01-11-23 00:22",
        "01-11-23 00:27", "01-11-23 00:32", "01-11-23 00:37", "01-11-23 00:42", "01-11-23 00:47",
        "01-11-23 00:52", "01-11-23 00:57", "01-11-23 01:02", "01-11-23 01:07", "01-11-23 01:12",
        "01-11-23 01:17", "01-11-23 01:22", "01-11-23 01:27"
    ],
    datasets: [{
        label: 'Glucose Value (mg/dL)',
        data: [
            65, 68, 65, 67, 66, 100, 120, 110, 130, 140, 125, 135, 145, 115, 138, 105, 190, 196
        ],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

const options = {
    animation: false,  // Disable animations
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'minute',
                parser: 'MM-DD-YY HH:mm',
                tooltipFormat: 'll HH:mm'
            },
            title: {
                display: true,
                text: 'Time'
            }
        },
        y: {
            beginAtZero: true,
            suggestedMax: 300,
            title: {
                display: true,
                text: 'Glucose Level (mg/dL)'
            }
        }
    },
    plugins: {
        annotation: {
            annotations: {
                low: {
                    type: 'box',
                    yMin: 0,
                    yMax: 70,
                    backgroundColor: 'rgba(255, 99, 132, 0.3)',
                },
                normal: {
                    type: 'box',
                    yMin: 70,
                    yMax: 140,
                    backgroundColor: 'rgba(75, 192, 192, 0.3)',
                },
                high: {
                    type: 'box',
                    yMin: 140,
                    yMax: 180,
                    backgroundColor: 'rgba(255, 206, 86, 0.3)',
                },
                veryHigh: {
                    type: 'box',
                    yMin: 180,
                    yMax: 300,
                    backgroundColor: 'rgba(255, 159, 64, 0.3)',
                }
            }
        }
    }
};

const BloodSugarMonitoring = () => {
    const chartRef = useRef();

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Blood Sugar Monitoring</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter details here..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i className="fas fa-search"></i> {/* Search icon */}
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Recent Patient</h5>
                            <div className="row">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div className="col-12 col-md-4" key={index}>
                                        <div className="card text-center" style={{ width: '100%', marginBottom: '20px' }}>
                                            <div className="card-body">
                                                <i className="fas fa-user fa-3x"></i>
                                                <p className="card-text">Patient Name {index + 1}</p>
                                                <button className="btn btn-info">See Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                   
                    <div className="card mt-4">
                        <div className="card-header">
                            <h4> Glucose Trends Value </h4>
                        </div>
                        <div className="card-body">
                            <Line ref={chartRef} data={data} options={options} />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default BloodSugarMonitoring;
