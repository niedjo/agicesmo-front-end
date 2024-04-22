import React, { Fragment, useState, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import './stock.css'
import BoutonModal from "../../Components/BoutonModal";
import { useRef } from "react";
import Constant from "../../Constant";

export  function StockJour(props) {

    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const [Stocks, setStocks] = useState([])
    const [Count, setCount] = useState(1)


    function jours_entre(date1, date2) {
        const UN_JOUR = 1000 * 60 * 60 * 24; // Le nombre de millisecondes dans une journée
        const difference_ms = date1 - date2; // Calculer la différence en millisecondes
        const difference_jours = Math.round(difference_ms / UN_JOUR); // Convertir en jours et retourner
        return difference_jours;
    }
    useEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getStock.php`,
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
                
                setStocks(body['stock'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

        }

        return () => {
            if (Count % 2 !== 0) {
                FetchData()   
                setCount(c => c + 1) 
            }
        };
    }, [Count])

    const NomEtID = useRef(null)
    const rubrique = useRef(null)
    const qte = useRef(null)
    const date_ravitaillemrnt = useRef(null)

    const recherche = useRef(null)
    const check = useRef(null)
    const [SearchValue, setSearchValue] = useState('')
    const [Check, setCheck] = useState(false)
    
    const cmpnt = (
        <Fragment>
            <form method="post" className="form-group">
                <table>
                    <tbody>
                        <tr>
                            <td>ID et Nom du produit</td>
                            <td>
                                <select className="form-control" ref={NomEtID}>
                                    {
                                        Stocks.map(
                                            (st, k) => <option value={k} key={k}>{st.id_stock} - {st.nom}</option>
                                        )
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Rubrique</td> 
                            <td>
                                <select className="form-control" ref={rubrique}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Quantitee</td> {/* doit avoir une verification sur la qte actuelle*/}
                            <td><input type="number" className="form-control" ref={qte}/></td>
                        </tr>
                        <tr>
                            <td>Date de ravitaillement</td>
                            <td><input type="datetime-local" className="form-control" ref={date_ravitaillemrnt}/></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </Fragment>
    )

    const handleSubmit = async () => {
        // dans la partie gestion des stocks, un stock est geree par un plusieurs 
        // personnel et un personnel peut gerer un ou plusieurs stock
        
        
        // let d = new Date(date_ravitaillemrnt.current.value.toString()).toLocaleDateString()
        // alert(d)
        let qteUpdated = 0
        let qtestockJourUpdated = 0
        if (rubrique.current.value === "1") {
            qteUpdated = parseInt(Stocks[NomEtID.current.value].quantitee_stock_globale) - parseInt(qte.current.value)
            qtestockJourUpdated = Stocks[NomEtID.current.value].quantitee_stock_jour !== "" ? parseInt(qte.current.value) + parseInt(Stocks[NomEtID.current.value].quantitee_stock_jour) : parseInt(qte.current.value)
        }
        else if (rubrique.current.value === "2") {
            qteUpdated = parseInt(Stocks[NomEtID.current.value].quantitee_stock_globale2) - parseInt(qte.current.value)
            qtestockJourUpdated = Stocks[NomEtID.current.value].quantitee_stock_jour2 !== "" ? parseInt(qte.current.value) + parseInt(Stocks[NomEtID.current.value].quantitee_stock_jour2) : parseInt(qte.current.value)
        }
        console.log(
            Stocks[NomEtID.current.value].quantitee_stock_globale,
            Stocks[NomEtID.current.value].id_stock,
            qte.current.value, 
            date_ravitaillemrnt.current.value, 
            parseInt(props.idSaver),
            qteUpdated,
            parseInt(Stocks[NomEtID.current.value].quantitee_stock_jour)
        )
        if (parseInt(Stocks[NomEtID.current.value].quantitee_stock_globale) < parseInt(qte.current.value)) {
            let qte2 = parseInt(Stocks[NomEtID.current.value].quantitee_stock_globale)
            alert("la quantitee inseree (" + qte.current.value + ") est superieur a la quantitee en stock qui est de (" + qte2 + "). Veillez inserer une quantitee inferieur")
        }
        else{

            try {
                const response = await fetch(
                    `${Constant.ipUrl}setStock.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            type_stock : "Stock jour",
                            ID : Stocks[NomEtID.current.value].id_stock,
                            rubrique : rubrique.current.value,
                            qte : qtestockJourUpdated,
                            date_ravitaillemrnt : date_ravitaillemrnt.current.value,
                            idSaver : props.idSaver,
                            qteUpdated : qteUpdated
                            // returnSecureToken : true
                        })
                    }
                )
    
                if (!response.ok) {
                    alert("probleme d'enregistrement, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
            } catch (error) {
               console.log(error) 
            }
            finally {
                alert("Consommable Enregistree avec succes !")
                setCount(c => c + 1)
            }
            
        }

    }

    function OnRequestConnexionClosed (props) { 
        const Row = []
        props.stock.forEach(s => {
            
          const recherche = s.id_stock.toLowerCase() + s.nom.toLowerCase() + s.quantitee_stock_jour.toLowerCase() + s.quantitee_stock_jour2.toLowerCase() + new Date(s.date_entree_stock_jour).toLocaleDateString().toLowerCase() + new Date(s.date_entree_stock_jour2).toLocaleDateString().toLowerCase() + new Date(s.date_peram).toLocaleDateString().toLowerCase() + new Date(s.date_peram2).toLocaleDateString().toLowerCase()
          
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (props.coche && 
                !((jours_entre(new Date(s.date_peram), new Date()) < 30 || jours_entre(new Date(s.date_peram2), new Date()) < 30) 
                || (parseInt(s.quantitee_stock_jour) < 30 || parseInt(s.quantitee_stock_jour2) < 30))) 
          {
            return
          }
          Row.push(
            <>
                {(s.quantitee_stock_jour && s.quantitee_stock_jour2 === "") && 
                <tr align="center">
                    <td valign="middle"><b>{s.id_stock}</b></td>
                    <td valign="middle">1</td>
                    <td valign="middle">{s.nom}</td>
                    <td valign="middle" className={parseInt(s.quantitee_stock_jour) < 30 ? parseInt(s.quantitee_stock_jour) < 10 ? "very-soon" : "perim" : ""}>{s.quantitee_stock_jour}</td>
                    <td valign="middle">{s.prix} FCFA</td>
                    <td valign="middle">{new Date(s.date_entree_stock_jour).toLocaleDateString() + " " + " " + " " + new Date(s.date_entree_stock_jour).toLocaleTimeString()}</td>
                    <td valign="middle" className={jours_entre(new Date(s.date_peram), new Date()) < 30 ? jours_entre(new Date(s.date_peram), new Date()) < 10 ? "very-soon" : "perim" : ""}>{new Date(s.date_peram).toLocaleDateString()}</td>
                </tr>}
                {(s.quantitee_stock_jour2 && s.quantitee_stock_jour === "") && 
                <tr align="center">
                    <td valign="middle"><b>{s.id_stock}</b></td>
                    <td valign="middle">2</td>
                    <td valign="middle" >{s.nom}</td>
                    <td valign="middle" >{s.prix} FCFA</td>
                    <td valign="middle" className={parseInt(s.quantitee_stock_jour2) < 30 ? parseInt(s.quantitee_stock_jour2) < 10 ? "very-soon" : "perim" : ""}>{s.quantitee_stock_jour2}</td>
                    <td valign="middle">{new Date(s.date_entree_stock_jour2).toLocaleDateString() + " " + " " + " " + new Date(s.date_entree_stock_jour2).toLocaleTimeString()}</td>
                    <td valign="middle" className={jours_entre(new Date(s.date_peram2), new Date()) < 30 ? jours_entre(new Date(s.date_peram2), new Date()) < 10 ? "very-soon" : "perim" : ""}>{new Date(s.date_peram2).toLocaleDateString()}</td>
                </tr>}
                {(s.quantitee_stock_jour && s.quantitee_stock_jour2) && 
                <>
                    <tr align="center">
                        <td rowSpan={2} valign="middle"><b>{s.id_stock}</b></td>
                        <td valign="middle">1</td>
                        <td rowSpan={2} valign="middle">{s.nom}</td>
                        <td valign="middle" className={parseInt(s.quantitee_stock_jour) < 30 ? parseInt(s.quantitee_stock_jour) < 10 ? "very-soon" : "perim" : ""}>{s.quantitee_stock_jour}</td>
                        <td rowSpan={2} valign="middle">{s.prix} FCFA</td>
                        <td valign="middle">{new Date(s.date_entree_stock_jour).toLocaleDateString() + " " + " " + " " + new Date(s.date_entree_stock_jour).toLocaleTimeString()}</td>
                        <td valign="middle" className={jours_entre(new Date(s.date_peram), new Date()) < 30 ? jours_entre(new Date(s.date_peram), new Date()) < 10 ? "very-soon" : "perim" : ""}>{new Date(s.date_peram).toLocaleDateString()}</td>
                    </tr>
                    <tr align="center">
                        <td valign="middle">2</td>
                        <td valign="middle" className={parseInt(s.quantitee_stock_jour2) < 30 ? parseInt(s.quantitee_stock_jour2) < 10 ? "very-soon" : "perim" : ""}>{s.quantitee_stock_jour2}</td>
                        <td valign="middle">{new Date(s.date_entree_stock_jour2).toLocaleDateString() + " " + " " + " " + new Date(s.date_entree_stock_jour2).toLocaleTimeString()}</td>
                        <td valign="middle" className={jours_entre(new Date(s.date_peram2), new Date()) < 30 ? jours_entre(new Date(s.date_peram2), new Date()) < 10 ? "very-soon" : "perim" : ""}>{new Date(s.date_peram2).toLocaleDateString()}</td>
                    </tr>
                </>
                }
            </>
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
        setCheck(check.current.checked)
    }
    return (
        <div className="stockjour">
            <div style={{display : "flex", justifyContent : "space-evenly", paddingTop : "4%", color : "blue"}}>
                <GoBack handlclick={props.arriere}/>
                <center><h2 style={{textDecoration : "underline"}}>Stocks pharmacie du jour</h2></center>
                {/* <button className="btn btn-primary" style={{borderRadius : 50, background : "blue"}}>Entrer des consommables</button> */}
                <BoutonModal buttonName="Entrer des consommables" cmpnt={cmpnt} handleSubmit={handleSubmit}/>
            </div>
            <center>
                <div className="col-md-10" style={{paddingTop : "5%"}}>
                    <div className="col-md-7" style={{display : "flex", justifyContent : "space-between"}}>
                        <input type="search" className="form-control" placeholder="Rechercher un produit" style={{borderColor : "blue"}} ref={recherche}/>
                        <button className="btn btn-primary" style={{marginLeft : "5%"}} onClick={setOnRequestConnexionClosed}>Rechercher</button>
                    </div>
                    <div className="col-md-7" style={{display : "flex"}}>
                        <input type="checkbox" style={{borderColor : "blue"}} ref={check} onChange={setOnRequestConnexionClosed}/>
                        <div style={{marginLeft : 10}}>Uniquement ceux pres de la datte de peremption et/ou de tres basses quantitee</div>
                    </div>
                    <div style={{paddingTop : "8%"}}></div>
                    <table className="table table-bordered table-hover" style={{borderColor : "blue", backgroundColor : "white"}}>
                        <thead>
                            <tr align="center">
                                <th>ID du produit</th>
                                <th>Rubrique</th>
                                <th>Nom du produit</th>
                                <th>Quantitee en stock</th>
                                <th>Prix unitaire</th>
                                <th>Date d'entree</th>
                                <th>Date de peremption</th>
                            </tr>
                        </thead>
                        {
                            <OnRequestConnexionClosed stock = {Stocks} search={SearchValue} coche={Check}/>
                        }
                    </table>
                </div>
            </center>
        </div>
    )
}