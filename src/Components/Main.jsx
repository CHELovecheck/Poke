import React from "react";
import Card from './Card';
import Info from './Info';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import {Button} from '@mui/material'


const Main=()=>{
    const [pokeData, setpokeData]=useState([]);
    const [loading, setLoading]=useState(true);
    const [url, setUrl]=useState("https://pokeapi.co/api/v2/pokemon");
    const [nextUrl, setNextUrl]=useState();
    const [prevUrl, setPrevUrl]=useState();
    const[pokemonChosen, setPokemonChosen]=useState(false);
    const [pokeDex, setPokeDex]=useState();

    const [searchPoke, setSearchPoke]=useState(''); //poisk
    const [pokemon, setPokemon]=useState({
        name:"",
        species:"",
        img:"",
        hp:"",
        attack:"",
        defence:"",
        type:"",
    })
    
    const searchPokemon=()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPoke}`).then((response)=>{
            console.log(response);
            setPokemon({
                name:searchPoke,
                species:response.data.species.name,
                img:response.data.sprites.font_default,
                hp:response.data.stats[0].base_stat,
                attack:response.data.stats[1].base_stat,
                defence:response.data.stats[2].base_stat,
                type:response.data.types[0].type.name,
            });
            setPokemonChosen(true)
        })
    }

    const pokeFun=async()=>{
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon=async(res)=>{
        res.map(async(item)=>{
            const result=await axios.get(item.url)
            setpokeData(state=>{
                state=[...state,result.data]
                state.sort((a,b)=>a.id>b.id?1:-1)
                return state;
            })
        })
    }

    useEffect(() => {
        pokeFun()
    },[url])


    return(
        <>
         <div className="header">
        <div className="search-block">

            <input type="text"
             placeholder="Search"
             id="Search"
             onChange={(event)=>{
                setSearchPoke(event.target.value);
             }}
             />

            <Button variant="contained"
            onClick={searchPokemon}
            >Search</Button>

        </div>
      </div>
        <div className="container">
            <div className="left-content">
                <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                <div className="btn-group">

                {prevUrl &&<Button variant="contained" 
                onClick={()=>{
                    setpokeData([])
                    setUrl(prevUrl)
                }}>Pred</Button>}

                <Button variant="contained" onClick={()=>{
                    setpokeData([])
                    setUrl(nextUrl)
                }}>Next</Button>

                </div>
            </div>
            <div className="right-content">
                {!pokemonChosen ? (<Info data={pokeDex}/>):(



                <>
                <h1>{pokemon.name}</h1>
                </>


                )}
            </div>
        </div>
        </>
    )
}
export default Main;
