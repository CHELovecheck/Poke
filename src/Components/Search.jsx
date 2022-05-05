import React  from "react";
import {Button} from '@mui/material'
import { useState } from 'react';



function Search(){

const [searchPoke, setSearchPoke]=useState('');

  return (
    <>
      <div className="header">
        <div className="search-block">

            <input type="text"
             placeholder="Search"
             id="Search"
             />

            <Button variant="contained"
            >Search</Button>

        </div>
      </div>
    </>
  );
};
export default Search;
