import "./App.css";
import mqtt from "mqtt";
import { useEffect,useState,useRef } from "react";

function App() {
  const [date,updateDate] = useState(null);
  const [time,updateTime] = useState(null);
  const [temp,setTemp] = useState('NaN');
  const [humd,setHumd] = useState('NaN');
  const [rain,setRain] = useState(null);
  const [gas,setGas] = useState(null);
  const [flames,setFlames] = useState(null);  
  useEffect(() => {        
    mqtt.connectAsync("wss://aad6-2405-201-2024-b862-2f60-9f1f-19f8-8c78.ngrok-free.app",{host:'192.168.29.18',port:8080,clientId:'123-client',username:'Manav1011',password:'Manav@1011'}).then(client => {      
        client.subscribe("SENSOR_DATA")        
        client.on("message", (topic, message) => {   
          if(topic == "SENSOR_DATA"){            
              const data = JSON.parse(message.toString());              
              if(parseInt(data['rain']) == 1 && parseInt(data['fire']) == 1 && parseInt(data['gas']) == 1){
                document.body.style.backgroundImage = "url('/backgrounds/Sunny.webp')"
              }else if(parseInt(data['rain']) == 0 &&  parseInt(data['fire']) == 1  &&  parseInt(data['gas']) == 1){
                document.body.style.backgroundImage = "url('/backgrounds/3oGRFvAHIY8cDgX1rG.webp')"
              }else if(parseInt(data['fire']) == 0 &&  parseInt(data['gas']) == 1){
                document.body.style.backgroundImage = "url('/backgrounds/fire-78.gif')"
              }
              else if(parseInt(data['gas']) == 0){
                document.body.style.backgroundImage = "url('/backgrounds/MARKET_1.webp')"
              }
              setTemp(data['temp'] && data['temp']);
              setHumd(data['humd'] && data['humd']);
              setRain(data['rain'] && parseInt(data['rain']));
              setFlames(data['fire'] && parseInt(data['fire']))
              setGas(data['gas'] && parseInt(data['gas']))
          }
        });
    }).catch(error => {
        console.log(error);
    })
    setInterval(() => {
      var currentDate = new Date();    
      var dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      // Format the date
      var formattedDate = currentDate.toLocaleDateString("en-US", dateOptions);
      updateDate(formattedDate);
      var timeOptions = { hour: "numeric", minute: "numeric", second: "numeric" };      
      updateTime(currentDate.toLocaleTimeString("en-US", timeOptions))
    },1000)    
  }, []);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col  p-4 m-10 h-full w-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-bold text-xl text-slate-200">Ahmedabad</div>
              <div className="text-sm text-slate-500">{date}</div>
            </div>
            <div>
              <div className="text-sm text-slate-200" >{time}</div>
            </div>
          </div>
          <div className="mt-6 text-6xl self-center inline-flex items-center justify-center  rounded-lg text-indigo-400 h-24 w-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-brightness-alt-high"
              viewBox="0 0 16 16"
            >
            {rain !== 0 ? (<path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4m0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8" />) : (  <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>)}
            </svg>
          </div>
          <div className="flex flex-row items-center justify-center mt-6">
            <div className="font-medium text-4xl text-slate-200">{temp}</div>
            <div className="flex flex-col items-center ml-6">
              <div className="text-slate-200">{rain !== 0 ? 'Sunny' : 'Rainy'}</div>
            </div>
          </div>
          <div className="flex sm:flex-row  flex-col justify-between mt-6">
            <div className="flex my-5 sm:my-0 flex-col items-center">
              <div className="font-medium text-sm text-slate-400">
                Flames Detected
              </div>
              <div className="text-sm text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >             
                {flames !== 0 ? (<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />) : (  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>)}   
                </svg>
              </div>
            </div>
            <div className="flex my-5   sm:my-0 flex-col items-center">
              <div className="font-medium text-sm text-slate-400">Humidity</div>
              <div className="text-sm text-slate-200">{humd}</div>
            </div>
            <div className="flex  my-5 sm:my-0 flex-col items-center">
              <div className="font-medium text-sm text-slate-400">
                Flammable Gas Detected
              </div>
              <div className="text-sm text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  {gas !== 0 ? (<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />) : (  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>)}   
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
