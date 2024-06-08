import React, { useEffect, useState } from 'react'
import axios from "axios"
import dice1i from "../assets/1.png"
import dice2i from "../assets/2.png"
import dice3i from "../assets/3.png"
import dice4i from "../assets/4.png"
import dice5i from "../assets/5.png"
import dice6i from "../assets/6.png"

const play = () => {
  const [points, setPoints]=useState(5000)
  const [status, setStatus]=useState("DICE GAME")
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(6)
  const [bet, setBet] = useState(0)
  const [error, setError] = useState("")
  const [option, setOption] = useState("")

  useEffect(()=>{
    // axios.get("http://localhost:3001/").
    // then((res)=>setPoints(res.points))

    if(localStorage.getItem("points")){
        setPoints(localStorage.getItem("points"))
    }
  },[])

  const handleClick=async()=>{
    if(bet===0){
        setError("choose bet amount")
    } else if (option === ""){
        setError("choose bet type")
    } else {
        setError("")
      try{
        const res = await axios
        .post("http://localhost:3001/roll-dice", {
          betAmount: parseInt(bet),
          betOption: option,
          playerPoints: points,
        })
        
          setDice1(res.data.number1);
          setDice2(res.data.number2);
          setStatus(res.data.result);
          setPoints(res.data.points);
    } catch(err){
            console.log(err)
        }
    }
  }

  const img =(num)=>{
    switch(num){
      case 1:
        return dice1i
      case 2:
        return dice2i
      case 3:
        return dice3i
      case 4:
        return dice4i
      case 5:
        return dice5i
      case 6:
        return dice6i
      default:
        return dice1i
    }
  }

  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">
      <div className="h-screen w-[320px]">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center font-bold bg-[#111111]">
            <div className="w-[50%] justify-start text-white text-lg items-center p-2">
              7 up 7 down
            </div>
            <div className="w-[50%] flex justify-end p-2 text-white font-light">
              <div className="rounded-lg p-1 px-2 bg-[#1f1f1f]">
                <div className="opacity-100 text-white">Balance : {points}</div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="rounded-lg w-full p-4 tracking-widest font-bold text-3xl flex items-center justify-center text-white bg-gradient-to-br from-teal-600 to-indigo-500">
              {status}
            </div>
          </div>
          <div className="w-full h-[25vh] flex">
            <div className="w-[50%] h-full text-white text-5xl flex items-center justify-center">
              <img src={img(dice1)}/>
            </div>
            <div className="w-[50%] h-full text-white text-5xl flex items-center justify-center">
              <img src={img(dice2)} />
            </div>
          </div>
          <div className="w-full text-white px-5 pb-2">
            Choose the betting amount
          </div>
          <div className="flex justify-between px-4 pb-4">
            <button
              value={100}
              onClick={(e) => setBet(e.target.value)}
              className="text-white rounded-lg bg-gradient-to-br from-red-600 to-orange-600 p-2 px-8 hover:border-2"
            >
              100
            </button>
            <button
              value={200}
              onClick={(e) => setBet(e.target.value)}
              className="text-white rounded-lg bg-gradient-to-br from-red-600 to-orange-600 p-2 px-8 hover:border-2"
            >
              200
            </button>
            <button
              value={500}
              onClick={(e) => setBet(e.target.value)}
              className="text-white rounded-lg bg-gradient-to-br from-red-600 to-orange-600 p-2 px-8 hover:border-2"
            >
              500
            </button>
          </div>
          <div className="w-full text-white px-5 pb-2">
            Choose the betting type
          </div>
          <div className="flex justify-between px-4 pb-4">
            <button
              value={"7_up"}
              onClick={(e) => setOption(e.target.value)}
              className="text-white rounded-lg bg-gradient-to-br from-yellow-600 to-red-600 p-2 px-8 basis-1/3 mr-1 hover:border-2"
            >
              ↑ 7
            </button>
            <button
              value={"7"}
              onClick={(e) => setOption(e.target.value)}
              className="text-white rounded-lg bg-gradient-to-br from-yellow-600 to-red-600 p-2 px-8 basis-1/3 mx-1 hover:border-2"
            >
              7
            </button>
            <button
              value={"7_down"}
              onClick={(e) => setOption(e.target.value)}
              className="text-white rounded-lg bg-gradient-to-br from-yellow-600 to-red-600 p-2 px-8 basis-1/3 ml-1 hover:border-2"
            >
              ↓ 7
            </button>
          </div>
          <div className="w-full p-4 flex flex-col">
            <button
              onClick={() => handleClick()}
              className="bg-gradient-to-br from-green-500 to-teal-700 rounded-lg p-2 w-full text-white text-bold text-3xl"
            >
              PLAY
            </button>
            <span className="text-red-500 mx-2 mt-1 text-sm">{error}</span>
          </div>
          <div className='w-full flex flex-col text-white px-5'>
            <span>Betting Amount : {bet}</span>
            <span>Betting Option : {option}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default play