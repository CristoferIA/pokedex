import React from "react";
import { useNavigate } from "react-router-dom";
import '../../public/css/headerPoke.css'


const HeaderPoke = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/pokedex')
  }
  return (
    <div className="pokebola">
      <div className="pokebola__red">
        <img src="images/pokedex.png" alt="" onClick={handleClick}/>
        <div className="pokebola__circle">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPoke;
