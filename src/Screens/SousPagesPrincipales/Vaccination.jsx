import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import PrintFacture from "../impressionData/PrintFacture";
import Constant from "../../Constant";

export default function Vaccination(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const natureExam = [
        {id: "1", nature: "BCG", prix: 100},
        {id: "2", nature: "Rougeole", prix: 100},
        {id: "3", nature: "VAT", prix: 100},
        {id: "4", nature: "DTC", prix: 100},
        {id: "5", nature: "Polio", prix: 100},
    ]

    const [Patients, setPatients] = useState([])
    const [Personnel, setPersonnel] = useState([])
    const [IsPrintFacture, setIsPrintFacture] = useState(false)
    const [CurrentPatient, setCurrentPatient] = useState()

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
        }

        return () => {
            FetchData()    
        };
    }, [])

    const idPatient = useRef(null)
    // const DateExam = useRef()
    // const dateRDV = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    const prix = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()
    // const observation = useRef()
    // const responsable = useRef()

    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)

    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {[{id : Date.now(), Exam : "Vaccination", TabNatureExam : [natureExam[NatureExam.current.value].nature], tab_qte : [1], tab_price : [prix.current.value]}]} 
            patient = {CurrentPatient}
            prix_total = {PrixTotal}
            reglement_client = {Reglement_client}
            reste_a_payer = {Reste_a_payer}
            stock = {[]}
        />
    }

    const handleChange = () => {
        prix.current.value = natureExam[NatureExam.current.value].prix
        reste_a_payer.current.value = prix.current.value - reglement_client.current.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const d = new Date().toLocaleString()
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(
            parseInt(idPatient.current.value),
            d,
            natureExam[NatureExam.current.value].nature,
            (prix.current.value).toString(),
            (reglement_client.current.value).toString(),
            (reste_a_payer.current.value).toString(),
            parseInt(props.Saver[1]),
        )

        try {
            const response1 = await fetch(
                `${Constant.ipUrl}setVaccination.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : Date.now(),
                        dateRDV : "",
                        NatureExam : natureExam[NatureExam.current.value].nature,
                        qte : (1).toString(),
                        prix : (prix.current.value).toString(),
                        reglement_client : (reglement_client.current.value).toString(),
                        reste_a_payer : (reste_a_payer.current.value).toString(),
                        observation : "",
                        responsable : "",
                        idSaver : parseInt(props.Saver[1]),
                        // nom_operateur : nom_operateur.current.value,
                        // returnSecureToken : true
                    })
                }
            )
    
            if (!response1.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            alert("Vaccination Enregistree avec succes !")
        }

        for (let i = 0; i < Patients.length; i++) {
            const element = Patients[i];
            if (element.code_patient === idPatient.current.value) {
                setCurrentPatient(element); 
                console.log(element);
            }
            
        }


        setPrixTotal(prix.current.value)
        setReglement_client(reglement_client.current.value)
        setReste_a_payer(reste_a_payer.current.value)

        setIsPrintFacture(true)

        // const response = await fetch(
        //     '${Constant.ipUrl}setRDV.php',
        //     {
        //         method : "POST",
        //         headers : {
        //             'Content-Type' : 'application/json'
        //         },
        //         body : JSON.stringify({
        //             idPatient : parseInt(idPatient.current.value),
        //             DateExam : (DateExam.current.value).toString(),
        //             DateRDV : (dateRDV.current.value).toString(),
        //             motif : "Vaccination",
        //             idSaver : parseInt(props.Saver[1]),
        //             // nom_operateur : nom_operateur.current.value,
        //             // returnSecureToken : true
        //         })
        //     }
        // )

        // if (!response.ok) {
        //     alert("probleme d'enregistrement, veillez reessayer")
        //     throw new Error("il y a une petite erreur")
        // }
        // alert("Rendez-vous programmee avec succes !")
    }
    
    return(
        <div className="">
            <GoBack handlclick={props.arriere}/>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Vaccination</h2>
                <form className="form-group form-group1 col-md-5" onSubmit={handleSubmit}>
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
                                <td>Date de l'examen</td>
                                <td><input type="datetime-local" name="" className="form-control" ref={DateExam}/></td>
                            </tr>
                            <tr>
                                <td>Date de Rendez-vous</td>
                                <td><input type="datetime-local" name="" className="form-control" ref={dateRDV}/></td>
                            </tr> */}
                            <tr>
                                <td>Nature du Vaccin</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        {natureExam.map((n, k) => <option key={k} value={k}>{n.nature}</option>)}
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Quantite Sollicitee</td>
                                <td><input type="number" name="" className="form-control" ref={qte} onChange={handleChange}/></td>
                            </tr> */}
                            <tr>
                                <td>Prix</td>
                                <td><input type="number" name="" className="form-control" ref={prix} readOnly/></td>
                            </tr>
                            <tr>
                                <td>Reglement de client</td> {/* ce qu'il a donnee*/}
                                <td><input type="number" name="" className="form-control" ref={reglement_client} min={0} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td>Reste a payer</td> {/* ce qui lui reste a payer (sa dette)*/}
                                <td><input type="number" name="" className="form-control" ref={reste_a_payer} readOnly/></td>
                            </tr>
                            {/* <tr>
                                <td>Observation</td>
                                <td><textarea name="" cols="30" rows="5" className="form-control" ref={observation}></textarea></td>
                            </tr>
                            <tr>
                                <td>nom de l'operateur</td>
                                <td>
                                    <select name="" className="form-control" ref={responsable}>
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
 