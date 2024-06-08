import React from "react";
import home_dice from "../assets/home_dice.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 h-screen w-full flex items-center justify-center">
      <div className="h-screen border w-[320px] flex items-center ">
        <div className="flex flex-col text-white w-full">
          <div className="text-5xl font-bold w-full text-center">
            7 up 7 down
          </div>
          <div className="w-full my-10 flex justify-center">
            <img src={home_dice} className="w-[60%]"></img>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="bg-blue-700 p-2 rounded-lg px-8"
              onClick={() => navigate("/play")}
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
