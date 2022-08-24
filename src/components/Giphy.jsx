import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "./Loader";

const Giphy = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false);


    useEffect(() =>{

        localStorage.setItem('Recent Search', JSON.stringify(data));
    
       });

   
    useEffect(() => {


        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)

            try {
                
                const results = await axios("https://api5.giphy.com/v1/gifs/trending", {
                    params:{
                        
                        api_key: "7uTptmebRKlreLX5TcQI4ml7GkfW1jUN",
                        limit: 10,
    
                    }
    
                },);

                console.log(results);
                setData(results.data.data)

            } catch (error) {
                setIsError(true)
                console.log(error);
                
            }
           

                
                
                setIsLoading(false)

        }

            fetchData();

    }, []);
    
    const renderGifs = () =>{

        if(isLoading){

            return <Loader />;
        }

        return data.map(el => {
            return (
                    <div key={el.id} className="gif">
                        <img src={el.images.fixed_height.url} />
                    </div>

            )
        
        
            })
        }
    
        const renderError = () => {

            if(isError){

                return (<div className="alert alert-danger alert-dismissible fade show" role="alert">
                    
                    GIFs unavailable, try again.
                </div>)
            }
        }

        const handleSearchChange = event => {
            setSearch(event.target.value);
          };
        
          const handleSubmit = async event => {
            event.preventDefault();
            setIsError(false);
            setIsLoading(true);
        
            try {
              const results = await axios("https://api.gi5phy.com/v1/gifs/search", {
                params: {
                  api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
                  q: search,
                  limit: 10
                }
              });
              setData(results.data.data);
            } catch (err) {
              setIsError(true);
              setTimeout(() => setIsError(false), 4000);
            }
        
            setIsLoading(false);
          };


    return (
     
     <div className="m-2">{renderError()}
     <img src="https://uploadir.com/u/2omdd4id" alt="Logo" className="center"/>
        <div class="input-group justify-content-center">
        <div class="form-outline ">
            <input 
                value={search}
                onChange={handleSearchChange}
                placeholder="Search"
                id="search-input" type="search" class="form-control" />
                        </div>
        <button 
             onClick={handleSubmit}
                id="search-button" type="button" class="btn button">
                 <i className="fas fa-search"></i>
                </button>
                    </div>

        <div className="container gifs">{renderGifs()}</div>
         
        
  <div className="footer">
  <p>©2022 GIPHY Search.</p></div>
         </div>

    );


};

export default Giphy