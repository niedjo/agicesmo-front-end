
import React, { useRef, useState, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import PrintFacture from "../impressionData/PrintFacture";
import Constant from "../../Constant";

export default function Administration(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const natureExam = [
        {id: "1", nature: "Declaration de naissance", prix: 4500},
        {id: "2", nature: "Certification Medicale", prix: 3000},
        {id: "3", nature: "Certification de Grossesse", prix: 12500},
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
                    if(p.nom_statut === "Administrateur" || p.nom_statut === "Secretaire Medicale" || p.nom_statut ===  "Laborentain"){
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
    const DateExam = useRef()
    const NatureDocument = useRef()
    const qte = useRef()
    const prix = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()
    const contenue = useRef()
    const nomSignataire = useRef()

    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)

    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {[{id : Date.now(), Exam : "Administration", TabNatureExam : [natureExam[NatureDocument.current.value].nature], tab_qte : [1], tab_price : [prix.current.value]}]} 
            patient = {CurrentPatient}
            prix_total = {PrixTotal}
            reglement_client = {Reglement_client}
            reste_a_payer = {Reste_a_payer}
            stock = {[]}
        />
    }

    const handleChange = () => {
        prix.current.value = natureExam[NatureDocument.current.value].prix 
        reste_a_payer.current.value = prix.current.value - reglement_client.current.value
        // alert(natureExam[NatureDocument.current.value].prix)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const d = new Date().toLocaleString()
        console.log(
            parseInt(idPatient.current.value),
            d,
            natureExam[NatureDocument.current.value].nature,
            (prix.current.value).toString(),
            (reglement_client.current.value).toString(),
            (reste_a_payer.current.value).toString(),
            parseInt(props.Saver[1]),
        )
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    
        try {
            const response = await fetch(
                `${Constant.ipUrl}setAdministration.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : dateExam,
                        DateActuele : Date.now(),
                        NatureExam : natureExam[NatureDocument.current.value].nature,
                        qte : (1).toString(),
                        prix : (prix.current.value).toString(),
                        reglement_client : (reglement_client.current.value).toString(),
                        reste_a_payer : (reste_a_payer.current.value).toString(),
                        contenue : "",
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
            alert("Soin Enregistree avec succes !")
    
            Patients.map(p => p.code_patient === idPatient.current.value && setCurrentPatient(p))
            
            setPrixTotal(prix.current.value)
            setReglement_client(reglement_client.current.value)
            setReste_a_payer(reste_a_payer.current.value)
            
            setIsPrintFacture(true)
        }

    }
    
    return(
        <div className="">
            <GoBack handlclick={props.arriere}/>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Administration</h2>
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
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr> */}
                            <tr>
                                <td>Nature du document</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureDocument} onChange={handleChange}>
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
                                <td><input type="number" name="" className="form-control" ref={prix}/></td>
                            </tr>
                            {/* <tr>
                                <td>Contenue du document</td>
                                <td><textarea name="" cols="30" rows="5" className="form-control" ref={contenue}></textarea></td>
                            </tr> */}
                            <tr>
                                <td>Reglement de client</td>
                                <td><input type="number" name="" className="form-control" ref={reglement_client} min={0} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td>Reste a payer</td>
                                <td><input type="number" name="" className="form-control" ref={reste_a_payer} readOnly/></td>
                            </tr>
                            {/* <tr>
                                <td>nom du signataire</td>
                                <td>
                                    <select name="" className="form-control" ref={nomSignataire}>
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
