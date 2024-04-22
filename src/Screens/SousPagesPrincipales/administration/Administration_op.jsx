import React, { useRef, useState, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import Constant from "../../../Constant";

export default function Administration(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const [Patients, setPatients] = useState([])
    const [Personnel, setPersonnel] = useState([])
    const [Administration, setAdministration] = useState([])
    const [CurrentPatients, setCurrentPatients] = useState("1")
    const [CurrentExam, setCurrentExam] = useState("")

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
                // console.log("ppp")
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

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        function FetchData () {

            fetch(
                `${Constant.ipUrl}getPatientInfo.php`,
                {
                    method : "GET",
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log("mounted")
                setAdministration([])
                setAdministration(body['informations10'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])


    const idPatient = useRef(null)
    const DateExam = useRef()
    const NatureDocument = useRef()
    // const qte = useRef()
    // const prix = useRef()
    // const reglement_client = useRef()
    // const reste_a_payer = useRef()
    const contenue = useRef()
    const nomSignataire = useRef()

    const handleChange = () => {
        Administration.map(o => o.true_date === NatureDocument.current.value && setCurrentExam(o.nature_du_document))
    }

    const handleChange_Patient = () => {
        setCurrentPatients((idPatient.current.value).toString())
        for (let i = 0; i < Administration.length; i++) {
            const element = Administration[i];
            if (element.code_patient_admin === (idPatient.current.value).toString() && element.status_don === "0") {
                setCurrentExam(element.nature_du_document)
                break
            }
            else {
                setCurrentExam("")
            }
        }
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()

        if (CurrentExam === "") {
            alert(`ce patient n'a pas de Soin a faire`)
            return
        }

        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(NatureDocument.current.value, dateExam);

        try {
            const response = await fetch(
                `${Constant.ipUrl}makeExam.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        newDateExam : (dateExam).toString(),
                        DateExam : NatureDocument.current.value,
                        contenue : contenue.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Administration"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
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
            alert("Administration Enregistree avec succes !")
            
            setCurrentExam("")
        }

    }
    
    return(
        <div style={{background : "whitesmoke", height : "100%"}}>
            <GoBack handlclick={props.arriere}/>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Administration</h2>
                <form className="form-group form-group1 col-md-7" onSubmit={handleSubmit}>
                {/* {CurrentExam} <br />
                {CurrentPatients} */}
                    <table>
                        <tbody>
                            <tr>
                                <td>Identifiant du patient</td>
                                <td>
                                    <select className="form-control" ref={idPatient} onChange={handleChange_Patient}>
                                        {Patients.map(p => <option key={p.code_patient} value={parseInt([p.code_patient])}>{p.nom_et_prenom}</option>)}    
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Date de l'examen</td>
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr>
                            <tr>
                                <td>Nature du document</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureDocument} onChange={handleChange}>
                                        <option value=""></option>
                                        {Administration.map(l => (
                                            (l.code_patient_admin === CurrentPatients && l.status_don === "0") && <option key={l.true_date} value={l.true_date}>{l.nature_du_document}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Contenue du document</td>
                                <td><textarea name="" cols="30" rows="5" className="form-control" ref={contenue}></textarea></td>
                            </tr>
                            <tr>
                                <td>nom du signataire</td>
                                <td>
                                    <select name="" className="form-control" ref={nomSignataire}>
                                        {Personnel.map(p =>
                                            <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                            )
                                        } 
                                    </select>
                                </td>
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
