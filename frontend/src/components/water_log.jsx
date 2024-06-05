// import Button from "react-bootstrap/Button";
// import Table from "react-bootstrap/Table";
// import "../style/water_log.css";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function WaterLog() {
//   const [waterLog, setWaterLog] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:3000/api/v1/getWaterLog")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           if (Array.isArray(data.data)) {
//             setWaterLog(data.data);
//           } else {
//             console.error(
//               "Invalid data format: data.data is not an array",
//               data
//             );
//           }
//         } else {
//           console.error("Error fetching workout logs:", data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching workout logs:", error);
//       });
//   }, []);


  

//   return (
//     <>
//       <div className="water-log-main-table">
//         <div className="water-log-table-data">
//           <h1 className="text-center text-danger h3 pb-3">Log Water Intake</h1>
//           <Table className="water-logWorkOut">
//             <tbody className="water-log-table-body">
//               <tr className="water-logProperty">
//                 <td className="water-log-table-content">Date</td>
//                 <td colSpan={4}>
//                   <input type="date" name="workoutDate" />
//                 </td>
//               </tr>

//               <tr className="water-logProperty">
//                 <td>
//                   <input
//                     className="water-inp"
//                     type="text"
//                     placeholder="Number of"
//                   />
//                 </td>

//                 <td width={60}>
//                   <select className="mt-1 sel" name="workoutTypeSelect">
//                     <option value="">raheman</option>
//                     <option value="">2</option>
//                     <option value="">3</option>
//                   </select>
//                 </td>
//               </tr>

//               <tr>
//                 <td colSpan={4}>
//                   <Button className="btn1" variant="danger">
//                     Add Water Intake
//                   </Button>{" "}
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </div>
//         {/* waterIntake output */}

  
//         <div className="water-log-table-result">
//           <h1 className="text-center text-danger mt-4 h3 pb-3">
//             Todayapos&;s Water Intake
//           </h1>
//           <Table striped bordered hover className="water-logFoodOutResult">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Quantity</th>
//                 <th>Unit</th>
//               </tr>
//             </thead>
//             <tbody>
//               {waterLog.length > 0 &&
//                 waterLog.map((log) => (
//                   <tr key={log.id}>
//                     <td>{log.Date}</td>
//                     <td>{log.Quantity}</td>
//                     <td>{log.Unit}</td>
                    
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default WaterLog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../style/water_log.css';

function WaterLog() {
    const [waterLogs, setWaterLogs] = useState([]);
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('Glass'); 
    useEffect(() => {
        fetchWaterLogs();
    }, []);

    const fetchWaterLogs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/getWaterLog');
            if (Array.isArray(response.data.data)) {
                setWaterLogs(response.data.data);
            } else {
                setWaterLogs([]);
            }
        } catch (error) {
            console.error('Error fetching water logs:', error);
            setWaterLogs([]);
        }
    };

    const handleAddWaterLog = async () => {
        const newLog = {
            Date:date,
            Quantity:quantity,
            Unit:unit,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/v1/addWaterLog', newLog, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                fetchWaterLogs(); 
                setDate(''); 
                setQuantity('');
                setUnit('Glass');
            } else {
                console.error('Error adding water log:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding water log:', error);
        }
    };

    return (
        <div className="water-log-main-table">
            <div className="water-log-table-data">
                <h1 className="text-center text-danger h3 pb-3">Log Water Intake</h1>
                <Table className="water-logWorkOut">
                    <tbody className="water-log-table-body">
                        <tr className="water-logProperty">
                            <td className="water-log-table-content">Date</td>
                            <td colSpan={4}>
                                <input
                                    type="date"
                                    name="workoutDate"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr className="water-logProperty">
                            <td>
                                <input
                                    className="water-inp"
                                    type="text"
                                    placeholder="Number of"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </td>
                            <td width={60}>
                                <select
                                    className="mt-1 sel"
                                    name="workoutTypeSelect"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                >
                                    <option value="Glass">Glass</option>
                                    <option value="Bottle">Bottle</option>
                                    <option value="Liter">Liter</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <Button className="btn1" variant="danger" onClick={handleAddWaterLog}>
                                    Add Water Intake
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {/* waterIntake output */}
            <div className="water-log-table-result">
                <h1 className="text-center text-danger mt-4 h3 pb-3">Today's Water Intake</h1>
                <Table striped bordered hover className="water-logFoodOutResult">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waterLogs.map((log) => (
                            <tr key={log.id}>
                                <td>{log.Date}</td>
                                <td>{log.Quantity}</td>
                                <td>{log.Unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default WaterLog;

