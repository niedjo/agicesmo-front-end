// penser a creer une table retrait de caisse


import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import '../Achat'
import { NaviguerDansLesCaisses } from "./NaviguerDansLesCaisses";
import Constant from "../../../Constant";

export default function RetraitCaisse(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const [Personnel, setPersonnel] = useState([])
    const [Caisse, setCaisse] = useState()
    const [Dette, setDette] = useState([])
    const [IsNaviguerDansLesCaisses, setIsNaviguerDansLesCaisses] = useState(false)
    const [CounterFetch, setCounterFetch] = useState(1)
    
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
                setPersonnel([])
                body['personnel'].map(p => {
                    if(p.nom_statut === "Administrateur" || p.nom_statut === "Laborentain" || p.nom_statut ===  "Caissier"){
                        setPersonnel(x => [...x, p])
                    }
                })
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
            fetch(
                `${Constant.ipUrl}getCaisse.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                setCaisse(body['caisse'][0].montant_total)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

            fetch(
                `${Constant.ipUrl}getDette.php`,
                {
                    method : "GET"
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
            }
        };
    }, [CounterFetch])

    
    const dateRetrait = useRef()
    const MontantRetiree = useRef()
    const Motif = useRef()
    const Ordonateur = useRef()

    function countDette () {
        let detteTotal = 0
        let element = 0
        for (let i = 0; i < Dette.length; i++) {
            element = parseInt(Dette[i].montant_de_dette);
            detteTotal += element
        }

        return detteTotal
    }
    
    if (IsNaviguerDansLesCaisses) {
        return <NaviguerDansLesCaisses arriere = {() => setIsNaviguerDansLesCaisses(false)}/>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const d = new Date().toLocaleString()
        console.log(
            dateRetrait.current.value, 
            d,
            parseInt(MontantRetiree.current.value), 
            Motif.current.value, 
            parseInt(props.Saver[1])
            // Ordonateur.current.value, 
        )

        try {
            const response = await fetch(
                `${Constant.ipUrl}setRetraitCaisse.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        dateRetrait : (dateRetrait.current.value).toString(),
                        DateActuele : d,
                        MontantRetiree : parseInt(MontantRetiree.current.value),
                        Motif : (Motif.current.value).toString(),
                        idSaver : parseInt(props.Saver[1])
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
            alert("Retrait Effectuee avec succes !")
            setCounterFetch(c => c + 1) 
        }

    
    }

    return(
        <div className="stockjour" style={{height : "200vh"}}>
            <div style={{
                display : "flex", 
                backgroundColor : "#7ba2db", 
                paddingBottom : 55, 
                alignItems : "center", 
                paddingRight : 60,
                }}
            >
                <GoBack handlclick={props.arriere}/>
                
                <h2 style={{color : "#333", textDecoration : "underline", marginLeft : "29%"}}>Retrait de Caisse</h2>
            </div>
            <center style={{paddingTop : 25}}><h5>La somme totale d'argent en caisse est de {Caisse ? parseInt(Caisse) - countDette() : "chargement..."} FCFA</h5></center>
            <center style={{color : "blue", paddingTop : 20, textDecoration : "underline", cursor : "pointer"}} onClick={() => setIsNaviguerDansLesCaisses(true)}> <h6>Naviguer dans les caisses </h6></center>
            <center style={{paddingTop : 20}} className="stockjour">
                <form className="form-group form-group1 col-md-5">
                    <table>
                        <tbody>
                            {/* <tr>
                                <td>Identifiant du patient</td>
                                <td><input type="number" name="" className="form-control" /></td>
                            </tr> */}
                            <tr>
                                <td>Date du Retrait</td>
                                <td><input type="datetime-local" name="" className="form-control" ref={dateRetrait}/></td>
                            </tr>
                            <tr>
                                <td>Montant Retiree</td>
                                <td><input type="number" name="" className="form-control" ref={MontantRetiree}/></td>
                            </tr>
                            <tr>
                                <td>Motif du retrait</td>
                                <td>
                                    <select name="" className="form-control" ref={Motif}>
                                        <option value="Achat">Achat</option>
                                        <option value="Fermeture de caisse quotidienne">Fermeture de caisse quotidienne</option>
                                        <option value="Reconstitution de fonds de caisse">Reconstitution de fonds de caisse</option>
                                        <option value="Versement de salaire">Versement de salaire</option>
                                        <option value="Versement en Banque">Versement en Banque</option>
                                        <option value="Remboursement Client">Remboursement Client</option>
                                        <option value="Prelevement d'especes pour operations divers">Prelevement d'especes pour operations divers</option>
                                        <option value="Retrait exceptionnel">Retrait exceptionnel</option>
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Ordonateur du Retrait</td>
                                <td>
                                    <select name="" className="form-control" ref={Ordonateur}>
                                        {Personnel.map(p =>
                                            <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                            )
                                        } 
                                    </select>
                                </td>
                            </tr> */}
                            <tr>
                                <td><button className="btn btn-danger"  onClick={(e) => {e.preventDefault()}}>Annuler</button></td>
                                <td align="right"><button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </center>
        </div>
    )
};
 