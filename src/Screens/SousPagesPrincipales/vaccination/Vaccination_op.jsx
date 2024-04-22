import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import Constant from "../../../Constant";

export default function Vaccination(props) {
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
    const [Vaccination, setVaccination] = useState([])
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
                setVaccination([])
                setVaccination(body['informations11'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

    const idPatient = useRef(null)
    const DateExam = useRef()
    const dateRDV = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    // const prix = useRef()
    // const reglement_client = useRef()
    // const reste_a_payer = useRef()
    const observation = useRef()
    const responsable = useRef()

    const handleChange = () => {
        Vaccination.map(o => o.true_date === NatureExam.current.value && setCurrentExam(o.nature_du_vaccin))
    }

    const handleChange_Patient = () => {
        setCurrentPatients((idPatient.current.value).toString())
        // console.log(Vaccination)
        for (let i = 0; i < Vaccination.length; i++) {
            const element = Vaccination[i];
            if (element.code_patient_vacc === (idPatient.current.value).toString() && element.status_don === "0") {
                setCurrentExam(element.nature_du_vaccin)
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
        
        console.log(NatureExam.current.value, dateExam);

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
                        DateExam : NatureExam.current.value,
                        observation : observation.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Vaccination"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
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
            alert("Vaccination Enregistree avec succes !")
        }

        if (dateRDV.current.value !== "") {
            try {
                const response2 = await fetch(
                    `${Constant.ipUrl}setRDV.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            idPatient : parseInt(idPatient.current.value),
                            DateExam : (DateExam.current.value).toString(),
                            DateRDV : (dateRDV.current.value).toString(),
                            motif : "Vaccination",
                            idSaver : parseInt(props.Saver[1]),
                            // nom_operateur : nom_operateur.current.value,
                            // returnSecureToken : true
                        })
                    }
                )
        
                if (!response2.ok) {
                    alert("probleme d'enregistrement, veillez reessayer")
                    throw new Error("il y a une petite erreur")
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                alert("Rendez-vous programmee avec succes !")
                setCurrentExam("")
            }
        }



        
    }
    
    return(
        <div style={{background : "whitesmoke", height : "100%"}}>
            <GoBack handlclick={props.arriere}/>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Vaccination</h2>
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
                                <td><input type="datetime-local" name="" className="form-control" ref={DateExam}/></td>
                            </tr>
                            <tr>
                                <td>Date de Rendez-vous</td>
                                <td><input type="datetime-local" name="" className="form-control" ref={dateRDV}/></td>
                            </tr>
                            <tr>
                                <td>Nature du Vaccin</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        <option value=""></option>
                                        {Vaccination.map((l) => (
                                            (l.code_patient_vacc === CurrentPatients && l.status_don === "0") && <option key={l.true_date} value={l.true_date}>{l.nature_du_vaccin}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
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
 