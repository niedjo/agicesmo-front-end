import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import '../Achat.css'

export default function Imagerie(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const natureExam = [
        {id : "1", nature : "Echographie Pelvienne / Endovaginale", prix : 15000},
        {id : "2", nature : "Echographie Obstetricale depistage premier trimestre", prix : 20800},
        {id : "3", nature : "Echographie Obstetricale depistage deuxieme trimestre", prix : 20800},
        {id : "4", nature : "Echographie Obstetricale depistage deuxieme et troisieme trimestre", prix : 23800},
    ]

    const [Patients, setPatients] = useState([])
    const [Personnel, setPersonnel] = useState([])

    useEffect(() => {
        function FetchData () {
            fetch(
                'http://localhost/the%20bigest%20developper/projets/AGICESMO/FINAL%20CESMO/API/Enregistrement/getFrequentations.php',
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
                'http://localhost/the%20bigest%20developper/projets/AGICESMO/FINAL%20CESMO/API/Enregistrement/getPersonnel.php',
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
    const DateExam = useRef()
    const NatureExam = useRef()
    const qte = useRef()
    const prix = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()
    const expression_des_resultats = useRef()

    const handleChange = () => {
        prix.current.value = qte.current.value ? natureExam[NatureExam.current.value].prix * parseInt(qte.current.value) : natureExam[NatureExam.current.value].prix * 1
        reste_a_payer.current.value = prix.current.value - reglement_client.current.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const d = new Date().toLocaleString()
        console.log(
            parseInt(idPatient.current.value),
            (DateExam.current.value).toString(),
            d,
            natureExam[NatureExam.current.value].nature,
            (qte.current.value).toString(),
            (prix.current.value).toString(),
            (reglement_client.current.value).toString(),
            (reste_a_payer.current.value).toString(),
            expression_des_resultats.current.value,
            parseInt(props.Saver[1]),
        )
        const response = await fetch(
            'http://localhost/the%20bigest%20developper/projets/AGICESMO/FINAL%20CESMO/API/Enregistrement/setImagerie.php',
            {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    idPatient : parseInt(idPatient.current.value),
                    DateExam : (DateExam.current.value).toString(),
                    DateActuele : d,
                    NatureExam : natureExam[NatureExam.current.value].nature,
                    qte : (qte.current.value).toString(),
                    prix : (prix.current.value).toString(),
                    reglement_client : (reglement_client.current.value).toString(),
                    reste_a_payer : (reste_a_payer.current.value).toString(),
                    expression_des_resultats : expression_des_resultats.current.value,
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
        alert("Imagerie Enregistree avec succes !")
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
                
                <h2 style={{color : "#333", textDecoration : "underline", marginLeft : "33%"}}>Imagerie</h2>
            </div>
            <center style={{paddingTop : 30}}>
                <form className="form-group form-group1 col-md-5">
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
                            <tr>
                                <td>Date de l'operation</td>
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr>
                            <tr>
                                <td>Nature de l'examen</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        {natureExam.map((n, k) => <option key={k} value={k}>{n.nature}</option>)}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Quantite Sollicitee</td>
                                <td><input type="number" name="" className="form-control" ref={qte} onChange={handleChange}/></td>
                            </tr>
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
                            <tr>
                                <td>Expression des resultats</td>
                                <td><textarea name="" cols="30" rows="5" className="form-control" ref={expression_des_resultats}></textarea></td>
                            </tr>
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
 