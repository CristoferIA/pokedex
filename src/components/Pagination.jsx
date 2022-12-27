import React, { useEffect, useState } from "react";
import "../../public/css/pagination.css";

const Pagination = ({ pokemon, setInitiaPoke, setFinaPoke, typeSelect }) => {
    const agruparBtn = 5
  const allPokemons = pokemon && Math.ceil(pokemon.length);
  const [maxResult, setMaxResult] = useState(5); // 5, 10, 20, 50
  const totalBtn = Math.ceil(allPokemons / maxResult);
  const totalGroupsBtn = Math.ceil(totalBtn / agruparBtn);
  const [arr, setArr] = useState([]);

  const [pivot, setPivot] = useState(1);
  const [showBtn, setShowBtn] = useState([]);

  useEffect(() => {
    const tem_arr = [];
    for (let i = 1; i <= totalGroupsBtn; i++) {
      let init = i * agruparBtn - agruparBtn + 1;
      let end = i * agruparBtn;
      if (end > totalBtn) {
        end = totalBtn;
      }
      const obj = { group: i, init: init, end: end };
      tem_arr.push(obj);
    }
    setArr(tem_arr);
  }, [pokemon, maxResult]);

  useEffect(() => {
    arr.forEach((obj) => {
      if (pivot >= obj.init && pivot <= obj.end) {
        setInitiaPoke(
          maxResult * pivot - maxResult + 1 < 1
            ? 1
            : maxResult * pivot - maxResult + 1
        );
        setFinaPoke(
          maxResult * pivot > allPokemons ? allPokemons : maxResult * pivot
        );
        const arrBtn = [];
        for (let i = obj.init; i <= obj.end; i++) {
          const color = pivot == i ? "li-active" : "li-block-2";
          arrBtn.push(
            <li
              key={i}
              id={`btn${i}`}
              className={`li-block ${color}`}
              onClick={() => {
                handleSetPivot(i);
              }}
            >
              <b>{i}</b>
            </li>
          );
        }
        setShowBtn(arrBtn);
      }
    });
  }, [pivot, arr, ]);

  useEffect(()=>{handleStart();},[typeSelect])


  const handleSetPivot = (data) => {
    setPivot(data);
  };
  const handleNext = () => {
    if (pivot < totalBtn) {
      setPivot(pivot + 1);
    }
  };
  const handlePrevious = () => {
    if (pivot > 1) {
      setPivot(pivot - 1);
    }
  };

  const handleStart = () => {
    setPivot(1);
  };
  const handleFinish = () => {
    setPivot(totalBtn);
  };
  const handleMaxResult = (e) => {
    setMaxResult(e.target.value);
    handleStart();
  };

  let elementNext;
  let elementPreviou;
  if (arr[arr.length - 1]?.init > pivot) {
    elementNext = (
      <>
        <li className="li-block li-block-2" aria-readonly onClick={handleNext}>
          {">"}
        </li>
        <li className="li-block li-block-2" onClick={handleFinish}>
          {">>"}
        </li>
      </>
    );
  }
  if (arr[0]?.end < pivot) {
    elementPreviou = (
      <>
        <li className="li-block li-block-2" onClick={handleStart}>
          {"<<"}
        </li>
        <li className="li-block li-block-2" onClick={handlePrevious}>
          {"<"}
        </li>
      </>
    );
  }
  return (
    <div className="page">

      <div>
        <label htmlFor="">TOTAL: <span>{allPokemons}</span></label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label htmlFor="page__select">MOSTRAR: </label>
        <select id="page__select" onChange={handleMaxResult}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <ul className="page__ul">
        {elementPreviou}
        &nbsp;
        {showBtn}
        &nbsp;
        {elementNext}
      </ul>
    </div>
  );
};

export default Pagination;
