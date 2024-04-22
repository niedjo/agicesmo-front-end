import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import '../Achat.css'
import BoutonModal from "../../../Components/BoutonModal";
import Constant from "../../../Constant";

export default function VisualiserDettes(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const [Dette, setDette] = useState([])
    const [AreDettes, setAreDettes] = useState(false)
    const [CounterFetch, setCounterFetch] = useState(1)
    const [SearchValue, setSearchValue] = useState('')
    const recherche = useRef()
    
    useEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getDette.php`,
                {
                    method : "GET",
                }
            )
            .then(data => data.json())
            .then((body) => {
                setDette(body['dette'])
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        }

        return () => {
            if (CounterFetch % 2 !== 0) {
                FetchData()   
                setCounterFetch(c => c + 1) 
                setAreDettes(true)
            }
        };
    }, [CounterFetch])

    function OnRequestConnexionClose (props) { 
        const Row = []
        props.dette.forEach(d => {
          // if (produit.name.toLowerCase().indexOf(props.search.toLowerCase()) === -1) {
          //   return
          // }
          const recherche = d.nom_et_prenom.toLowerCase() + d.montant_soldee.toLowerCase() + d.montant_de_dette.toLowerCase() + d.date_de_dette.toLowerCase() + d.nom_personnel.toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          Row.push(
            <tr align="center" key={d.code_patient_dette}>
                <td>{d.nom_et_prenom}</td>
                <td>{d.date_de_dette}</td>
                <td>{d.montant_de_dette}</td>
                <td>{d.montant_soldee}</td>
                <td>{d.nom_personnel}</td>
                <td>
                    {/* <button className="btn btn-primary"></button> */}
                    <BoutonModal 
                        buttonName="Gerer la dette"
                        cmpnt={(
                            <center>
                                <table className="table" style={{borderColor : "blue"}}>
                                    <tr>
                                        <td>Reference Du Patient</td>
                                        <td>{d.code_patient_dette}</td>
                                    </tr>
                                    <tr>
                                        <td>Nom du Patient</td>
                                        <td>{d.nom_et_prenom}</td>
                                    </tr>
                                    <tr>
                                        <td>Date de Dette</td>
                                        <td>{d.date_de_dette}</td>
                                    </tr>
                                    <tr>
                                        <td>Montant de Dette</td>
                                        <td>{d.montant_de_dette}</td>
                                    </tr>
                                    <tr>
                                        <td>Montant soldee</td>
                                        <td>{d.montant_soldee}</td>
                                    </tr>
                                    <tr>
                                        <td>Date de Paiment</td>
                                        <td><input type="date" className="form-control col-md-4" value={str} style={{border : "1px solid blue"}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Responsable</td>
                                        <td>{d.nom_personnel}</td>
                                    </tr>
                                </table>
                            </center>
                        )}

                        handleSubmit = {() => handleSubmit(d.code_patient_dette, d.montant_de_dette)}
                    />
                </td>
            </tr>
          )
        })
        // console.warn('rendue');
        return (
          <tbody>
            {Row}
          </tbody>
        )
    }

    const setOnRequestConnexionClose = () => {
        setSearchValue(recherche.current.value)
    }

    const handleSubmit = async (id, montant) => {
        console.log(id, montant)

        try {
            const response = await fetch(
                `${Constant.ipUrl}setGestionDette.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        id : parseInt(id),
                        montant : montant,
                        idSaver : parseInt(props.Saver[1]),
                        // returnSecureToken : true
                    })
                }
            )
    
            if (!response.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            alert("Dette Gerree avec succes ! Veiller fermer le modal")
            setCounterFetch(c => c + 1)
        }

    }

    return(
        <div className="stockjour">
            <div style={{
                display : "flex", 
                backgroundColor : "#7ba2db", 
                paddingBottom : 55, 
                alignItems : "center", 
                paddingRight : 60,
                }}
            >
                <GoBack handlclick={props.arriere}/>
                
                <h2 style={{color : "#333", textDecoration : "underline", marginLeft : "23%"}}>Visualisation des Dettes</h2>
            </div>
            <center style={{backgroundColor : "#7ba2db", paddingBottom : 40}}>
                <div 
                    className="col-md-7" 
                    style={{display : "flex", justifyContent : "space-between"}}
                >
                    <input type="search" className="form-control" placeholder="Rechercher une Dette" style={{borderColor : "blue"}} ref={recherche}/>
                    <button className="btn btn-primary" style={{marginLeft : "5%"}} onClick={setOnRequestConnexionClose}>Rechercher</button>
                </div>
            </center>
            <center style={{paddingTop : 10, paddingLeft : 40, paddingRight : 40}}>
                <table className="table table-bordered" style={{borderColor : "blue"}}>
                    <thead>
                        <tr align="center">
                            <th>Nom du Patient</th>
                            <th>Date de Dette</th> {/* on va reflechir entre la premiere et la derniere dette */}
                            <th>Montant de Dette</th>
                            <th>Montant Soldee</th>
                            <th>Responsable</th>
                            <th>Gestion</th>
                        </tr>
                    </thead>
                    {/* on supprime une ligne si le montant de dette est egale a zero */}
                    {AreDettes ? 
                    <OnRequestConnexionClose dette = {Dette} search={SearchValue}/>
                    : "chargement..."}
                </table>
            </center>
        </div>
    )
};
 