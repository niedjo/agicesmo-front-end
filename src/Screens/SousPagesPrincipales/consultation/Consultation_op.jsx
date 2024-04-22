import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import '../Achat.css'
import Constant from "../../../Constant";
// ${Constant.ipUrl}

export default function Consultation(props) {
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
    const [Consultations, setConsultations] = useState([])
    const [CurrentPatients, setCurrentPatients] = useState("1")
    const [CurrentExam, setCurrentExam] = useState("")
    // const [Personnel, setPersonnel] = useState([])

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
                setConsultations([])
                setConsultations(body['informations7'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

    const idPatient = useRef(null)
    const DateExam = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    // const prix = useRef()
    // const reglement_client = useRef()
    // const reste_a_payer = useRef()
    const expression_des_resultats = useRef()
    const responsable = useRef()

    const handleChange = () => {
        Consultations.map(o => o.true_date === NatureExam.current.value && setCurrentExam(o.type_de_consultation))
    }

    const handleChange_Patient = () => {
        setCurrentPatients((idPatient.current.value).toString())
        for (let i = 0; i < Consultations.length; i++) {
            const element = Consultations[i];
            if (element.code_patient_cons === (idPatient.current.value).toString() && element.status_don === "0") {
                setCurrentExam(element.type_de_consultation)
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
            alert(`ce patient n'a pas de consultation`)
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
                        expression_des_resultats : expression_des_resultats.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Consultation"
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
            alert("Consultation Enregistree avec succes !")
            
            setCurrentExam("")
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
                {/* {CurrentExam} <br />
                {CurrentPatients} */}
                <form className="form-group form-group1 col-md-6">
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
                                <td>Date du jour</td>
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr>
                            <tr>
                                <td>Type consultation</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        <option value=""></option>
                                        {Consultations.map(l => (
                                            (l.code_patient_cons === CurrentPatients && l.status_don === "0") && <option key={l.true_date} value={l.true_date}>{l.type_de_consultation}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Expression des resultats</td>
                                <td><textarea cols="30" rows="5" className="form-control" ref={expression_des_resultats}></textarea></td>
                            </tr>
                            <tr>
                                <td>Responsable</td>
                                <td>
                                    <select className="form-control" ref={responsable}>
                                        <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option>
                                        {/* {Personnel.map(p =>
                                            <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                            )
                                        }    */}
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
 