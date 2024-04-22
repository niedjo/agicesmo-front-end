import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import './Achat.css'
import PrintFacture from "../impressionData/PrintFacture";
import Constant from "../../Constant";

export default function Achat(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const [Patients, setPatients] = useState([])
    const [Stocks, setStocks] = useState([])
    const [IsPrintFacture, setIsPrintFacture] = useState(false)
    const [CurrentPatient, setCurrentPatient] = useState()

    // const [Personnel, setPersonnel] = useState([])
    const heure = new Date().getHours()

    useEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getFrequentations.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setPatients(body['patients'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
            
            // fetch(
            //     '${Constant.ipUrl}getPersonnel.php',
            //     {
            //         method : "GET"
            //     }
            // )
            // .then(data => data.json())
            // .then((body) => {
            //     setPersonnel([])
            //     body['personnel'].map(p => {
            //         if(p.nom_statut === "Administrateur" || p.nom_statut === "Laborentain" || p.nom_statut ===  "Caissier"){
            //             setPersonnel(x => [...x, p])
            //         }
            //     })
            //     // alert("ok")
            //     // console.log("component mounted", Patients)
            // }).catch(error => console.warn("Erreur : il s'agit de : " + error))

            fetch(
                `${Constant.ipUrl}getStock.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setStocks([])

                body['stock'].map( s => {
                    if (heure <= 18 && heure >= 6) {
                        if (parseInt(s.quantitee_stock_jour) > 0) {
                            setStocks(st => [...st, s])
                        }
                    }
                    else {
                        if (parseInt(s.quantitee_stock_garde) > 0) {
                            setStocks(st => [...st, s])
                        }
                    }
                })
                
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

        }

        return () => {
            FetchData()    
        };
    }, [])

    const idPatient = useRef(null)
    // const DateExam = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    const prix = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()

    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)
    
    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {[{id : Date.now(), Exam : "Pharmacie", TabNatureExam : [NatureExam.current.value], tab_qte : [1], tab_price : [Stocks[NatureExam.current.value].prix]}]} 
            patient = {CurrentPatient}
            prix_total = {PrixTotal}
            reglement_client = {Reglement_client}
            reste_a_payer = {Reste_a_payer}
            stock = {Stocks}
        />
    }

    const handleChange = () => {
        prix.current.value = Stocks[NatureExam.current.value].prix
        reste_a_payer.current.value = prix.current.value - reglement_client.current.value
        // alert(Stocks[NatureExam.current.value].nom)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const d = new Date().toLocaleString()
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        let rubrique = 0

        if (
            parseInt(Stocks[NatureExam.current.value].quantitee_stock_jour) < 1 
            && parseInt(Stocks[NatureExam.current.value].quantitee_stock_garde < 1) 
            && parseInt(Stocks[NatureExam.current.value].quantitee_stock_jour2 < 1) 
            && parseInt(Stocks[NatureExam.current.value].quantitee_stock_garde2 < 1)) 
        {
            alert("impossible d'effectuer l'achat' : la quantitee en stock de ce produit est de 0")
            return    
        }

        console.log(
            parseInt(idPatient.current.value),
            d,
            Stocks[NatureExam.current.value].nom,
            (prix.current.value).toString(),
            (reglement_client.current.value).toString(),
            (reste_a_payer.current.value).toString(),
            parseInt(props.Saver[1]),
        )
        try {
            const response = await fetch(
                `${Constant.ipUrl}setAchat.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : dateExam,
                        DateActuele : d,
                        nomStock : Stocks[NatureExam.current.value].nom,
                        qte : (1).toString(),
                        prix : (prix.current.value).toString(),
                        reglement_client : (reglement_client.current.value).toString(),
                        reste_a_payer : (reste_a_payer.current.value).toString(),
                        idSaver : parseInt(props.Saver[1]),
                        // nom_operateur : nom_operateur.current.value,
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

        let qtestockJourUpdated = parseInt(Stocks[NatureExam.current.value].quantitee_stock_jour) - 1
        let qtestockgardeUpdated =  parseInt(Stocks[NatureExam.current.value].quantitee_stock_garde) - 1
        if (heure <= 18 && heure >= 6) {
            
            // on fait la verification de la quantitee en stock avant de faire n'importe quoi
            
            if (parseInt(Stocks[NatureExam.current.value].quantitee_stock_jour) > 1) {
                rubrique = 1
            }
            else if (parseInt(Stocks[NatureExam.current.value].quantitee_stock_jour2) > 1) {
                rubrique = 2
            }
            else {
                alert("impossible d'effectuer l'achat' : la quantitee en stock de ce produit est de 0")
                return
            }

            try {
                const response2 = await fetch(
                    `${Constant.ipUrl}setStock.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            type_stock : "Stock jour",
                            ID : Stocks[NatureExam.current.value].id_stock,
                            qte : qtestockJourUpdated,
                            rubrique : rubrique,
                            date_ravitaillemrnt : Stocks[NatureExam.current.value].date_entree_stock_jour,
                            idSaver : props.idSaver,
                            qteUpdated : Stocks[NatureExam.current.value].quantitee_stock_globale
                            // returnSecureToken : true
                        })
                    }
                )
                if (!response2.ok) {
                    alert("probleme d'enregistrement, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
            } catch (error) {
                console.log(error);
            }

        }
        else {
            
            // on fait la verification de la quantitee en stock avant de faire n'importe quoi
            
            if (parseInt(Stocks[NatureExam.current.value].quantitee_stock_garde) > 1) {
                rubrique = 1
            }
            else if (parseInt(Stocks[NatureExam.current.value].quantitee_stock_garde2) > 1) {
                rubrique = 2
            }
            else {
                alert("impossible d'effectuer' : la quantitee en stock de ce produit est de 0")
                return
            }

            try {
                const response2 = await fetch(
                    `${Constant.ipUrl}setStock.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            type_stock : "Stock garde",
                            ID : Stocks[NatureExam.current.value].id_stock,
                            rubrique : rubrique,
                            qte : qtestockgardeUpdated,
                            date_ravitaillemrnt : Stocks[NatureExam.current.value].date_entree_stock_garde,
                            idSaver : props.idSaver,
                            qteUpdated : Stocks[NatureExam.current.value].quantitee_stock_globale
                            // returnSecureToken : true
                        })
                    }
                )
                if (!response2.ok) {
                    alert("probleme d'enregistrement, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        alert("Achat Effectuee avec succes !")

        Patients.map(p => p.code_patient === idPatient.current.value && setCurrentPatient(p))
        
        setPrixTotal(prix.current.value)
        setReglement_client(reglement_client.current.value)
        setReste_a_payer(reste_a_payer.current.value)
        
        setIsPrintFacture(true)

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
                
                <h2 style={{color : "#333", textDecoration : "underline", marginLeft : "35%"}}>Achat</h2>
            </div>
            <center style={{paddingTop : 30}}>
                <form className="form-group form-group1 col-md-6" onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Identifiant du patient</td>
                                <td>
                                    <select className="form-control" ref={idPatient}>
                                        {Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Date de l'operation</td>
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr> */}
                            <tr>
                                <td>Intrant Retiree</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        {Stocks.map((st, k) => <option key={k} value={k}>{st.nom}</option>)}
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Forme</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam1} onChange={handleChange}>
                                        {Stocks.map((st, k) => <option key={k} value={k}>{st.nom}</option>)}
                                    </select>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td>Unitee de mesure</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam2} onChange={handleChange}>
                                        {Stocks.map((st, k) => <option key={k} value={k}>{st.nom}</option>)}
                                    </select>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td>Unitee de vente</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam3} onChange={handleChange}>
                                        {Stocks.map((st, k) => <option key={k} value={k}>{st.nom}</option>)}
                                    </select>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td>Quantite</td>
                                <td><input type="number" name="" className="form-control" ref={qte} onChange={handleChange} /></td>
                            </tr> */}
                            <tr>
                                <td>Prix</td>
                                <td><input type="number" name="" className="form-control"  ref={prix} readOnly/></td>
                            </tr>
                            <tr>
                                <td>Reglement de client</td> {/* ce qu'il a donnee*/}
                                <td><input type="number" name="" className="form-control"  ref={reglement_client} min={0} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td>Reste a payer</td> {/* ce qui lui reste a payer (sa dette)*/}
                                <td><input type="number" name="" className="form-control" ref={reste_a_payer} readOnly/></td>
                            </tr>
                            {/* <tr>
                                <td>Responsable</td>
                                <td>
                                    <select className="form-control" ref={responsable}>
                                        <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option>
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
 