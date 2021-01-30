import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IBeer } from '../../types/IBeer';
 
function Beer()  {

  const [beers, setBeers] = useState<IBeer[]>([]);

  const [list, setList] = useState<IBeer[]>([]);

  useEffect(()=>{
    axios.get(`https://api.punkapi.com/v2/beers/?per_page=8`)
      .then(response=>setList(response.data))
  },[])
 
  return (
    <div className="food-beer-list food-shop">
      
      <h1>Tipos de Cerveja</h1>
      <button onClick={()=> setBeers(list)}>Buscar Cerveja</button>
      <div className="beers-list">
        {
          beers !== undefined && 
          beers.map((item:IBeer)=>(
            <div className="beer" key={item.id}>
              <img src={item.image_url} alt="Buzz" />
              <h3>{item.name}</h3>
              <span>{item.tagline}</span>
              <small>{item.description}</small>
            </div>
          ))
        }   
      </div>
    </div>
  );
}

export default Beer;