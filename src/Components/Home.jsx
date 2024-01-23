import { io } from "socket.io-client"
import { useState } from "react"
import Chat from "./Chat"
import "./home.css"


const socket = io.connect("https://chat-backend-a5zq.onrender.com")

function Home() {

    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = ()=>{
        if(username!=="" && room!==""){
            socket.emit("join_room", room)
            setShowChat(true)
        }else{
            alert("Enter the username and room id!")
        }
    }

  return (
    <div>
        {!showChat?
            (<div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"76svb"}} className="home">
                <div className="d-flex flex-column align-items-center bg-dark text-light mt-3 w-50 p-5 rounded shadow-lg">
                    <h1 className="mb-3">Join A Chat</h1>
                    <input type="text" placeholder="Name" onChange={(e)=> setUsername(e.target.value)} className="w-50 mb-3 form-control" />
                    <input type="text" placeholder="Room ID" onChange={(e)=> setRoom(e.target.value)} className="w-50 mb-3 form-control"/>
                    <button className="btn btn-primary" onClick={joinRoom}>Join The Room</button>
                </div>
            </div>)
            :
           ( <div><Chat username={username} room={room} socket={socket}/></div>)
        }
    </div>
  )
}

export default Home