import React, { useState, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import { useRef } from "react";
import Constant from "../../../Constant";

export function NaviguerDansLesCaisses(props) {

    const [CaissesInfo, setCaissesInfo] = useState([])
    const [Count, setCount] = useState(1)

    useEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getOperationDeCaisse.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                // body['stock'].map( s => 
                //     {if (parseInt(s.quantitee_stock_globale) <= 0 || jours_entre(new Date(s.date_peram), new Date()) <= 0) {
                //         deleteStock(s.id_stock)
                //     }
                // })
                
                setCaissesInfo(body['caisse'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

        }

        return () => {
            if (Count % 2 !== 0) {
                FetchData()   
                setCount(c => c + 1) 
            }
        };
    }, [Count])

    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const recherche = useRef(null)
    const [SearchValue, setSearchValue] = useState('')

    function OnRequestConnexionClosed (props) { 
        const Row = []
        props.operations.forEach((s, key) => {
            
          const recherche = s.motif.toLowerCase() + s.montant_re.toLowerCase() + s.montant_aj.toLowerCase() + new Date(s.date_et_heure_op).toLocaleDateString().toLowerCase() + s.nom_et_prenom.toLowerCase()
          
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          Row.push(
            <tr align="center" key={key}>
                <td>{new Date(s.date_et_heure_op).toLocaleString()}</td>
                <td className="">{s.motif}</td>
                <td className="">{s.montant_aj}</td>
                <td className="">{s.montant_re}</td>
                <td className="">{s.nom_et_prenom}</td>
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

    const setOnRequestConnexionClosed = () => {
        setSearchValue(recherche.current.value)
    }

    return (
        <div className="stockjour">
            <div>
                <GoBack handlclick={props.arriere}/>
                <center><h2 style={{textDecoration : "underline", color : "blue"}}>Naviguer dans les caisses</h2></center>
            </div>
            <center>
                <div className="col-md-8" style={{paddingTop : "5%", backgroundColor : "aliceblue"}}>
                    <div className="col-md-8" style={{display : "flex", justifyContent : "space-between"}}>
                        <input type="search" className="form-control" placeholder="Rechercher une operation de caisse" style={{borderColor : "blue"}} ref={recherche} onChange={setOnRequestConnexionClosed}/>
                        <button className="btn btn-primary" style={{marginLeft : "5%"}} onClick={setOnRequestConnexionClosed}>Rechercher</button>
                    </div>
                    <div style={{paddingTop : "8%"}}></div>
                    <table className="table table-bordered table-hover" style={{borderColor : "blue", backgroundColor : "white"}}>
                        <thead>
                            <tr align="center">
                                <th>Date et heure de l'operation</th>
                                <th>Motif</th>
                                <th>Montant Ajoutee</th>
                                <th>Montant retiree</th>
                                <th>Responsable</th>
                            </tr>
                        </thead>
                        {
                            <OnRequestConnexionClosed operations = {CaissesInfo} search={SearchValue}/>
                        }
                    </table>
                </div>
            </center>
        </div>
    )
}