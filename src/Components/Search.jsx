import React, { useState } from "react";
import '../Screens/search.css'

export function Search (props){
    const [IshoverSearch, setIshoverSearch] = useState(false)
    const [IsDisplay1, setIsDisplay1] = useState(false)

    // la recheche

    return (
        <div 
            className="col-md-12" 
            style={{
                zIndex : 2, 
                transform : "scale(1)", 
                position : "absolute", 
                marginTop : props.marginTop, 
                marginLeft : "1%"
            }}
        >
            <button className="search" onMouseOver={() => setIshoverSearch(true)} onMouseOut={() => setIshoverSearch(false)}></button>
            <div 
                className="sss box col-md-4" 
                onMouseOver={() => setIshoverSearch(true)} 
                onMouseOut={() => setIshoverSearch(false)} 
                style={{
                    display : IshoverSearch ? "" : "none", 
                    zIndex : 2, 
                    transform : "scale(0.8)", 
                    marginLeft : "60%", 
                    marginTop : "15%",
                    borderRadius : 10,
                    borderColor : "blue",
                    borderWidth : 3,
                    borderStyle : "solid"
                }}
            >

                <div className="libelle"> {/* <i className="i3"></i> */} RECHERCHE</div>
                <button style={{width : 310}} onClick={props.rdv}>Calendrier des rendez – vous</button>
                <button style={{width : 310}} onClick={props.patientinfo}>Information sur un patient</button>
                <button style={{width : 310}} onClick={props.parcaurpersonnel}>Parcours du personnel</button>
                <div className="operation" style={{width : 310}}  onMouseOver={() => {setIsDisplay1(true)}} onMouseOut={() => {setIsDisplay1(false)}}>
                    <div>Requettes <span className={IsDisplay1 ? "r" : "rotate"}></span></div>
                    <button style={{display : IsDisplay1 ? "" : "none"}} onClick={props.parIntervale}>Par intervale</button>
                    <button style={{display : IsDisplay1 ? "" : "none"}} onClick={props.parjour}>Par jour</button>
                </div>
            </div>
        </div>
    )
}