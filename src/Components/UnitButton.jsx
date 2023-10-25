import "./UnitButton.css"
import React from 'react'


function Button({setUnit}){
    const handleCheckbox = (event) =>{
        if (event.target.checked){
            setUnit("F")
        }else{
            setUnit("C")
        }
    }
    return (
        <>
        
        <label class="switch">
            {/* <h2 className="text">Units</h2> */}
        <input type="checkbox" onClick={handleCheckbox} />
        <span className="slider round"></span>
        </label>
        </>
    );
} 

export default Button;