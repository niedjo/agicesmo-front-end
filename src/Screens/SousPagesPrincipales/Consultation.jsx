import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import './Achat.css'
import PrintFacture from "../impressionData/PrintFacture";
import Constant from "../../Constant";

export default function Consultation(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const [Patients, setPatients] = useState([])
    const [IsPrintFacture, setIsPrintFacture] = useState(false)
    const [CurrentPatient, setCurrentPatient] = useState()
    // const [Personnel, setPersonnel] = useState([])

    const natureExam = [
        {id : "1", nature : "Generale", prix : 1000},
        {id : "2", nature : "Gynecologique", prix : 2000},
        {id : "3", nature : "Chirurgicale", prix : 5000},
        {id : "4", nature : "Pediatrique", prix : 5000},
        {id : "5", nature : "Prenatales", prix : 1000},
        {id : "6", nature : "Planing Familial", prix : 2000},
        {id : "7", nature : "Infertilitee", prix : 10000},
        {id : "8", nature : "Suivie", prix : 1000},
        {id : "9", nature : "Santee publique", prix : 1000},
        {id : "10", nature : "Pediatrique", prix : 0},
        {id : "10", nature : "Gynecologue", prix : 5000},
    ]

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
    // const responsable = useRef()

    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)

    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {[{id : Date.now(), Exam : "Consultation", TabNatureExam : [natureExam[NatureExam.current.value].nature], tab_qte : [1], tab_price : [prix.current.value]}]} 
            patient = {CurrentPatient}
            prix_total = {PrixTotal}
            reglement_client = {Reglement_client}
            reste_a_payer = {Reste_a_payer}
            stock = {[]}
        />
    }

    

    console.log(Patients);

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
            (prix.current.value).toString(),
            (reglement_client.current.value).toString(),
            (reste_a_payer.current.value).toString(),
            parseInt(props.Saver[1]),
        )

        try {
            const response = await fetch(
                `${Constant.ipUrl}setConsultation.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : dateExam,
                        DateActuele : Date.now(),
                        NatureExam : natureExam[NatureExam.current.value].nom,
                        qte : (1).toString(),
                        prix : (prix.current.value).toString(),
                        reglement_client : (reglement_client.current.value).toString(),
                        reste_a_payer : (reste_a_payer.current.value).toString(),
                        resultat : "",
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
        finally {
            alert("Consultation Effectuee avec succes !")
            Patients.map(p => p.code_patient === idPatient.current.value && setCurrentPatient(p))
            
            setPrixTotal(prix.current.value)
            setReglement_client(reglement_client.current.value)
            setReste_a_payer(reste_a_payer.current.value)
            
            setIsPrintFacture(true)
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
                
                <h2 style={{color : "#333", textDecoration : "underline", marginLeft : "30%"}}>Consultation</h2>
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
                                <td>Date du jour</td>
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr> */}
                            <tr>
                                <td>Type consultation</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        {natureExam.map((n, k) => <option key={k} value={k}>{n.nature}</option>)}
                                    </select>
                                </td>
                            </tr>
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
 