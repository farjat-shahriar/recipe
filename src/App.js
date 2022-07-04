import { React,useEffect,useRef,useState} from 'react';
import  './App.css';

function App() {
  const inputref = useRef(null);
  const Key_id=  "494b3eff";
  const key_api ='ff79ca701daaeffd9c735e3fa3e3aed0';
  const [ingredientlist, updatedingredientlist] = useState([])
  const [spinner, setspinner] = useState(false)
  useEffect( () => {
    searchbtn("chicken");
        
  },[] )
  const searchbtn=(query)=>{
    setspinner(true);
    let url = `https://api.edamam.com/search?q=${query}&app_id=${ Key_id}&app_key=${ key_api}`;
    fetch(url)

   .then (res=> res.json())
   .then (data=>{
    console.log(data.hits);
    updatedingredientlist(data.hits)
    setspinner(false)
  })
   
    .catch(err=>{console.log("error", err) 
    setspinner(false)
  })
  }
  const search=()=>{
    // console.log("inputref",inputref)
    searchbtn(inputref.current.value);
    inputref.current.value="";
   
  }
  
  return (

       <div className="app">
        <header className='App-header'>
          <div className="search">
           <input type="text"  ref={inputref} />
           <button className="btn"onClick={search}>Search</button>
          </div>
          {spinner&& <p>Loading..</p>}
        
          <div className="wrapper" >
            {ingredientlist.map((item)=>{
              return(
              <div className='ingradient' key={item.recipe.label} >
                <span>{item.recipe.label}</span>
                <img src={item.recipe.image}/>
                <div className="items">
                  
                 {item.recipe.ingredientLines.map((step,index)=>{
                  return<p key={index}>{step}</p>
                })}
                </div>
                
                </div>
              )
            })}
          </div>
        </header>
       </div>
  )
          }
export default App;
