import React, { useState, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import Constant from "../../Constant";

export default function SimpleParcour(props) {
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const [Personnel, setPersonnel] = useState([])

    useEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getPersonnel.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                setPersonnel(body['personnel'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
    
        }

        return () => {
            FetchData()    
        };
    }, [])
    
    return (
        <div style={{background : "#639DFA", height : "200vh"}}>
            <div style={{display : "flex", alignItems : "center"}}>
                <GoBack handlclick={props.arriere}/>
                <h2>Les horaires de travail</h2>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="container" style={{background : "#639DFA"}}>
                <center>
                    <table style={{color : "white", background : "#639DFA"}}>
                        <tr>
                            <th style={{color : "#333"}}><h4>Premiere Periode (08h - 16h)</h4></th>
                        </tr>
                        {
                            Personnel.map((p, key) => 
                                p.periode_de_travail === "0" ?
                                <tr key={key}>
                                    <li style={{fontSize : 19}}> {p.nom_et_prenom}</li>
                                </tr>
                                : null
                            )
                        }
                        <tr>
                            <th style={{color : "#333"}}><h4>Seconde Periode (16h - 23h 59 mn)</h4></th>
                        </tr>
                        {
                            Personnel.map((p, key) => 
                                p.periode_de_travail === "1" ?
                                <tr key={key}>
                                    <li style={{fontSize : 19}}> {p.nom_et_prenom}</li>
                                </tr>
                                : null
                            )
                        }
                        <tr>
                            <th style={{color : "#333"}}><h4>Troisiemme Periode (00h - 08h)</h4></th>
                        </tr>
                        {
                            Personnel.map((p, key) => 
                                p.periode_de_travail === "2" ?
                                <tr key={key}>
                                    <li style={{fontSize : 19}}> {p.nom_et_prenom}</li>
                                </tr>
                                : null
                            )
                        }
                    </table>
                </center>
            </div>
        </div>
    )
};
