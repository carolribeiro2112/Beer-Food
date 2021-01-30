import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Meal,Category} from '../../types/Meals';



const Foods = () => {
  
  const [foodCategory, setFoodCategory] = useState<Category[]>([])

  const [foodName, setFoodName] = useState<String>("")

  const [input, setInput] = useState<String>("")

  const [food, setFood] = useState<Meal[]>([])

  useEffect(()=>{
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response=> setFoodCategory(response.data.categories))
  },[])

  useEffect(()=>{
    if(foodName !== ""){
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodName}`)
      .then(response=>setFood(response.data.meals))
    } 
  },[foodName])

  useEffect(()=>{
    if(input !== ""){
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then(response=>setFood(response.data.meals))
    } 
  },[input])

 

  return (
    <div className="food-beer-list food-shop">
      <h1>Tipos de pratos</h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input type="text" onChange={(event)=> setInput(event.target.value)} placeholder="Digite a comida..." />
      </p>

      <ul>
        {
          foodCategory !== undefined &&
          foodCategory.map((item:Category)=>(
            <li key={item.idCategory} onClick={()=>setFoodName(item.strCategory)}>{item.strCategory}</li>
          ))
        }
          
      </ul>
      <h2>Tipo selecionado: <strong>{foodName}</strong></h2>
      
      <div className="food-container">
          <div className="food-item">
            {
              food !== null &&
              food.map((item:Meal)=>(
                <div key={item.idMeal}>
                  <img src={item.strMealThumb} />
                  <p>{item.strMeal}</p>
                </div>
              ))
            }
          </div>
      </div>
    </div>
  );
}

export default Foods;