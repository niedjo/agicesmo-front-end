import React, { Fragment, useRef, useEffect, useState } from "react";
import { GoBack } from "../../Components/GoBack";
import './stock.css'
import BoutonModal from "../../Components/BoutonModal";
import Constant from "../../Constant";

export default function StockGlobale(props) {

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
    
    const Nom_Produit = useRef()
    const qte = useRef()
    const qte2 = useRef()
    const prix = useRef()
    const date_ravitaillemrnt = useRef()
    const date_ravitaillemrnt2 = useRef()
    const date_peremttion = useRef()
    const date_peremttion2 = useRef()

    // les produits a mettre a jour
    
    const Nom_ProduitU = useRef()
    const Nom_Produit2U = useRef()
    const qteU = useRef()
    const qte2U = useRef()
    const prixU = useRef()
    const prix2U = useRef()
    const date_ravitaillemrntU = useRef()
    const date_ravitaillemrnt2U = useRef()
    const date_peremttionU = useRef()
    const date_peremttion2U = useRef()

    const recherche = useRef(null)
    const check = useRef(null)
    const [SearchValue, setSearchValue] = useState('')
    const [Check, setCheck] = useState(false)

    const cmpnt = (
        <Fragment>
            <form method="post" className="form-group">
                <table style={{width : "485px"}}>
                    <tbody>
                        <tr>
                            <td>Nom du produit</td>
                            <td> <input type="text" className="form-control" ref={Nom_Produit}/></td>
                        </tr>
                        <tr>
                            <td>Quantitee rubrique 1</td>
                            <td> <input type="number" className="form-control" ref={qte}/></td>
                        </tr>
                        <tr>
                            <td>Quantitee rubrique 2</td>
                            <td> <input type="number" className="form-control" ref={qte2}/></td>
                        </tr>
                        <tr>
                            <td>Prix Unitaire</td>
                            <td> <input type="number" className="form-control" ref={prix}/></td>
                        </tr>
                        <tr>
                            <td>Date de ravitaillement rubrique 1</td>
                            <td> <input type="datetime-local" className="form-control" ref={date_ravitaillemrnt}/></td>
                        </tr>
                        <tr>
                            <td>Date de ravitaillement rubrique 2</td>
                            <td> <input type="datetime-local" className="form-control" ref={date_ravitaillemrnt2}/></td>
                        </tr>
                        <tr>
                            <td>Date de peremption rubrique 1</td>
                            <td> <input type="date" className="form-control" ref={date_peremttion}/></td>
                        </tr>
                        <tr>
                            <td>Date de peremption rubrique 2</td>
                            <td> <input type="date" className="form-control" ref={date_peremttion2}/></td>
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
        console.log(
            Nom_Produit.current.value, 
            qte.current.value, 
            qte2.current.value, 
            prix.current.value, 
            date_ravitaillemrnt.current.value, 
            date_ravitaillemrnt2.current.value, 
            date_peremttion.current.value, 
            date_peremttion2.current.value, 
            parseInt(props.idSaver)
        )
        // alert(d)

        try {
            const response = await fetch(
                `${Constant.ipUrl}setStock.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        type_stock : "Stock globale",
                        Nom_Produit : Nom_Produit.current.value,
                        qte : (qte.current.value).toString(),
                        qte2 : (qte2.current.value).toString(),
                        prix : (prix.current.value).toString(),
                        date_ravitaillemrnt : (date_ravitaillemrnt.current.value).toString(),
                        date_ravitaillemrnt2 : (date_ravitaillemrnt2.current.value).toString(),
                        date_peremttion : (date_peremttion.current.value).toString(),
                        date_peremttion2 : (date_peremttion2.current.value).toString(),
                        idSaver : parseInt(props.idSaver)
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

    const handleUpdate = async (id, rubrique) => {
        console.log(id, rubrique);
        if (rubrique === 1) {
            console.log(
                rubrique,
                parseInt(id),
                (qteU.current.value).toString(),
                (prixU.current.value).toString(),
                (date_ravitaillemrntU.current.value).toString(),
                (date_peremttionU.current.value).toString(),
            );

            try {
                const response = await fetch(
                    `${Constant.ipUrl}updateStock.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            rubrique : parseInt(rubrique),
                            id : parseInt(id),
                            qte : (qteU.current.value).toString(),
                            prix : (prixU.current.value).toString(),
                            date_ravitaillemrnt : (date_ravitaillemrntU.current.value).toString(),
                            date_peremttion : (date_peremttionU.current.value).toString(),
                        })
                    }
                )
        
                if (!response.ok) {
                    alert("Probleme de mise a jour du produit, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
                
            } catch (error) {
                console.log(error)
            }
            finally {
                alert("Produit mis a jour avec succes !")
                setCount(c => c + 1)
            }
            
        }
        if (rubrique === 2) {
            console.log(
                rubrique,
                parseInt(id),
                (qte2U.current.value).toString(),
                (prix2U.current.value).toString(),
                (date_ravitaillemrnt2U.current.value).toString(),
                (date_peremttion2U.current.value).toString(),
            );

            try {
                const response = await fetch(
                    `${Constant.ipUrl}updateStock.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            rubrique : parseInt(rubrique),
                            id : parseInt(id),
                            qte : (qte2U.current.value).toString(),
                            prix : (prix2U.current.value).toString(),
                            date_ravitaillemrnt : (date_ravitaillemrnt2U.current.value).toString(),
                            date_peremttion : (date_peremttion2U.current.value).toString(),
                        })
                    }
                )
        
                if (!response.ok) {
                    alert("Probleme de mise a jour du produit, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                alert("Produit mis a jour avec succes !")
                setCount(c => c + 1)
            }
        }
    }

    const handleDelete = async (id) => {

        // eslint-disable-next-line no-restricted-globals
        let x = confirm(`voulez-vous vraiment supprimer le produit dont l'ID est : ${id} ?`)
        
        if (x) {

            try {
                const response = await fetch(
                    `${Constant.ipUrl}DeleteStock.php`,
                    {
                        method : "DELETE",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            id_stock : parseInt(id)
                        })
                    }
                )
        
                if (!response.ok) {
                    alert("Probleme de suppression du produit, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
                
            } catch (error) {
                console.log(error)
            }
            finally {
                alert("Produit supprimee avec succes !")
                setCount(c => c + 1)
            }
        }
        else {
            
        }

    }

    function OnRequestConnexionClose (props) { 
        const Row = []
        props.stock.forEach(s => {
          // if (produit.name.toLowerCase().indexOf(props.search.toLowerCase()) === -1) {
          //   return
          // }
          const recherche = s.id_stock.toLowerCase() + s.nom.toLowerCase() + s.quantitee_stock_globale.toLowerCase() + new Date(s.date_entree_stock_globale).toLocaleDateString().toLowerCase() + new Date(s.date_entree_stock_globale2).toLocaleDateString().toLowerCase() + new Date(s.date_peram).toLocaleDateString().toLowerCase() + new Date(s.date_peram2).toLocaleDateString().toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (props.coche && 
            !((jours_entre(new Date(s.date_peram), new Date()) < 30 || jours_entre(new Date(s.date_peram2), new Date()) < 30) 
            || (parseInt(s.quantitee_stock_globale) < 30 || parseInt(s.quantitee_stock_globale2) < 30))) 
          {
            return
          }
          Row.push(
            <>
                <tr align="center">
                    <td rowSpan={2} valign="middle"><b>{s.id_stock}</b></td>
                    <td valign="middle">1</td>
                    <td rowSpan={2} valign="middle">{s.nom}</td>
                    <td valign="middle" className={parseInt(s.quantitee_stock_globale) < 30 ? parseInt(s.quantitee_stock_globale) < 10 ? "very-soon" : "perim" : ""}>{s.quantitee_stock_globale}</td>
                    <td rowSpan={2} valign="middle">{s.prix} FCFA</td>
                    <td valign="middle">{new Date(s.date_entree_stock_globale).toLocaleDateString() + " " + " " + " " + new Date(s.date_entree_stock_globale).toLocaleTimeString()}</td>
                    <td valign="middle" className={jours_entre(new Date(s.date_peram), new Date()) < 30 ? jours_entre(new Date(s.date_peram), new Date()) < 10 ? "very-soon" : "perim" : ""}>{new Date(s.date_peram).toLocaleDateString()}</td>
                    <td valign="middle"><BoutonModal buttonName="Modifier" stylee={1} cmpnt={(
                        <table>
                            {/* <tr>
                                <td>Nom du produit</td>
                                <td> <input type="text" className="form-control" ref={Nom_ProduitU}/></td>
                            </tr> */}
                            <tr>
                                <td>Quantitee rubrique 1</td>
                                <td> <input type="number" className="form-control" ref={qteU}/></td>
                            </tr>
                            <tr>
                                <td>Prix Unitaire</td>
                                <td> <input type="number" className="form-control" ref={prixU}/></td>
                            </tr>
                            <tr>
                                <td>Date de ravitaillement rubrique 1</td>
                                <td> <input type="datetime-local" className="form-control" ref={date_ravitaillemrntU}/></td>
                            </tr>
                            <tr>
                                <td>Date de peremption rubrique 1</td>
                                <td> <input type="date" className="form-control" ref={date_peremttionU}/></td>
                            </tr>
                        </table>
                    )} 
                    
                    handleSubmit = {() => handleUpdate(s.id_stock, 1)}
                    
                    /> 
                    </td>
                    <td rowSpan={2} valign="middle">
                        <button className="btn btn-danger" onClick={() => handleDelete(s.id_stock)}>Supprimer</button>
                    </td>
                </tr>
                <tr align="center">
                    <td valign="middle">2</td>
                    <td valign="middle" className={parseInt(s.quantitee_stock_globale2) < 30 ? parseInt(s.quantitee_stock_globale2) < 10 ? "very-soon" : "perim" : ""}>{s.quantitee_stock_globale2}</td>
                    <td valign="middle">{new Date(s.date_entree_stock_globale2).toLocaleDateString() + " " + " " + " " + new Date(s.date_entree_stock_globale2).toLocaleTimeString()}</td>
                    <td valign="middle" className={jours_entre(new Date(s.date_peram2), new Date()) < 30 ? jours_entre(new Date(s.date_peram2), new Date()) < 10 ? "very-soon" : "perim" : ""}>{new Date(s.date_peram2).toLocaleDateString()}</td>
                    <td valign="middle"><BoutonModal buttonName="Modifier" stylee={1} cmpnt={(
                        <table>
                            {/* <tr>
                                <td>Nom du produit</td>
                                <td> <input type="text" className="form-control" ref={Nom_Produit2U}/></td>
                            </tr> */}
                            <tr>
                                <td>Quantitee rubrique 2</td>
                                <td> <input type="number" className="form-control" ref={qte2U}/></td>
                            </tr>
                            <tr>
                                <td>Prix Unitaire</td>
                                <td> <input type="number" className="form-control" ref={prix2U}/></td>
                            </tr>
                            <tr>
                                <td>Date de ravitaillement rubrique 2</td>
                                <td> <input type="datetime-local" className="form-control" ref={date_ravitaillemrnt2U}/></td>
                            </tr>
                            <tr>
                                <td>Date de peremption  rubrique 2</td>
                                <td> <input type="date" className="form-control" ref={date_peremttion2U}/></td>
                            </tr>
                        </table>
                    )} 
                    
                    handleSubmit = {() => handleUpdate(s.id_stock, 2)}

                    /> 
                    </td>
                </tr>
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

    const setOnRequestConnexionClose = () => {
        setSearchValue(recherche.current.value)
        setCheck(check.current.checked)
    }
      
    return (
        <div className="stockjour">
            <div style={{display : "flex", justifyContent : "space-evenly", paddingTop : "4%", color : "blue"}}>
                <GoBack handlclick={props.arriere}/>
                <center><h2 style={{textDecoration : "underline"}}>Stocks globales du centre</h2></center>
                {/* <button className="btn btn-primary" style={{borderRadius : 50, background : "blue"}}>Entrer des consommables</button> */}
                <BoutonModal buttonName="Entrer des consommables" cmpnt={cmpnt} handleSubmit={handleSubmit}/>
            </div>
            <center>
                <div className="col-md-11" style={{paddingTop : "5%"}}>
                    <div className="col-md-6" style={{display : "flex", justifyContent : "space-between"}}>
                        <input type="search" className="form-control" placeholder="Rechercher un produit" style={{borderColor : "blue"}} ref={recherche}/>
                        <button className="btn btn-primary" style={{marginLeft : "5%"}} onClick={setOnRequestConnexionClose}>Rechercher</button>
                    </div>
                    <div className="col-md-6" style={{display : "flex"}}>
                        <input type="checkbox" style={{borderColor : "blue"}} ref={check} onChange={setOnRequestConnexionClose}/>
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
                                <th colSpan={2} align="center">Actions</th>
                            </tr>
                        </thead>
                        <OnRequestConnexionClose stock = {Stocks} search={SearchValue} coche={Check}/>
                    </table>
                </div>
            </center>
        </div>
    )
}