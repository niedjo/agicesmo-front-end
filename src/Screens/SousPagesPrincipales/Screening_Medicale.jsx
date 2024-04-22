import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import Constant from "../../Constant";

export default function Screening_Medicale(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    const [IsHover1, setIsHover1] = useState(false)
    const [IsHover2, setIsHover2] = useState(false)
    const [IsHover3, setIsHover3] = useState(false)
    const [IsHover4, setIsHover4] = useState(false)

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
    const [CurrentPatients, setCurrentPatients] = useState({})
    const [Personnel, setPersonnel] = useState([])
    const [True_date, setTrue_date] = useState("")
    const [Screening_Medicale, setScreening_Medicale] = useState([])
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
                    if(p.nom_statut === "Administrateur" || p.nom_statut === "Secretaire Medicale" || p.nom_statut ===  "Laborentain"){
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
                setScreening_Medicale([])
                setScreening_Medicale(body['informations9'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

        const idPatient = useRef(null)
        const DateExam = useRef()
        const age = useRef()
        const telephone_personne_a_contacter = useRef()
        const DDR = useRef()
        const Gravida_para = useRef()
        const Autre_histoires_medicales = useRef()
        const alergies = useRef()
        const toxico = useRef()
        const TensionArteriel = useRef()
        const Poids = useRef()
        const taille = useRef()
        const Indice_masse_corporelle = useRef()
        const nbr_enfant_accompagnant = useRef()
        const bilan_lesionnel = useRef()
        const resultatExamBiologique = useRef()
        const responsable = useRef()
        const conclusion = useRef()

    
        // les usestates des antecedents personnels

        const [HTA, setHTA] = useState("NON")
        const [DIABETE, setDIABETE] = useState("NON")
        const [EPILEPSIE, setEPILEPSIE] = useState("NON")
        const [Obstetricale_et_Genicologie, setObstetricale_et_Genicologie] = useState("NON")
        const [CANCER, setCANCER] = useState("NON")
        const [DREPANOCYTOSE, setDREPANOCYTOSE] = useState("NON")
        const [ATHSME, setATHSME] = useState("NON")
        const [VIH, setVIH] = useState("NON")
        const [TUBERCULOSE, setTUBERCULOSE] = useState("NON")
        const [MALADIES_HEMOROIDAIRES, setMALADIES_HEMOROIDAIRES] = useState("NON")
        const [PSYCHIATRIQUE, setPSYCHIATRIQUE] = useState("NON")
        const [CHIRURGICAUX, setCHIRURGICAUX] = useState("NON")
        const [AUTRES, setAUTRES] = useState("NON")
        const [RAS, setRAS] = useState("NON")

        const antecedents_personnels = [
            HTA, DIABETE, EPILEPSIE,
            Obstetricale_et_Genicologie, 
            CANCER, DREPANOCYTOSE, ATHSME, 
            VIH, TUBERCULOSE, MALADIES_HEMOROIDAIRES, 
            PSYCHIATRIQUE, CHIRURGICAUX, AUTRES, RAS
        ]

        // les usestates des problemes de santee actiuels

        const [DIABETE1, setDIABETE1] = useState("NON")
        const [Hypertension, setHypertension] = useState("NON")
        const [Maladie_Cardiaque, setMaladie_Cardiaque] = useState("NON")
        const [Asthme_ou_BPCO , setAsthme_ou_BPCO] = useState("NON")
        const [EPILEPSIE1, setEPILEPSIE1] = useState("NON")
        const [TROUBLES_MENTAL, setTROUBLES_MENTAL] = useState("NON")
        const [Dyspepsie, setDyspepsie] = useState("NON")
        const [VIH1, setVIH1] = useState("NON")
        const [Gale, setGale] = useState("NON")
        const [TUBERCULOSE1, setTUBERCULOSE1] = useState("NON")
        const [IST, setIST] = useState("NON")
        const [AUTRES_MALADIES_CONTAGIEUSES, setAUTRES_MALADIES_CONTAGIEUSES] = useState("NON")
        const [RAS1, setRAS1] = useState("NON")

        const problemes_de_santee_actuels = [
            DIABETE1, Hypertension, Maladie_Cardiaque,
            Asthme_ou_BPCO, 
            EPILEPSIE1, TROUBLES_MENTAL, Dyspepsie, 
            VIH1, Gale, TUBERCULOSE1, 
            IST, AUTRES_MALADIES_CONTAGIEUSES, RAS1
        ]

        // autres usestates 1

        const [Tousse, setTousse] = useState("NON")
        const [Transpiration_nocturne, setTranspiration_nocturne] = useState("NON")
        const [Fievre_persistante, setFievre_persistante] = useState("NON")
        const [Fatigue_ou_perte_appeti, setFatigue_ou_perte_appeti] = useState("NON")
        const [Amaigrissement, setAmaigrissement] = useState("NON")
        const [Contact_avec_un_Tuberculeux, setContact_avec_un_Tuberculeux] = useState("NON")
        const [OMI, setOMI] = useState("NON")

        // les usestates de est actuelement sous traitement de 

        const [Paludisme, setPaludisme] = useState("NON")
        const [VIH3, setVIH3] = useState("NON")
        const [TUBERCULOSE2, setTUBERCULOSE2] = useState("NON")
        const [Diabete2, setDiabete2] = useState("NON")

        const est_actuelement_sous_traitement_de = [
            Paludisme,
            VIH3,
            TUBERCULOSE2,
            Diabete2
        ]

        // autres usestates 2

        const [Examen_entree_anormales, setExamen_entree_anormales] = useState("NON")
        const [Blessures, setBlessures] = useState("NON")
        const [Abus_de_substances, setAbus_de_substances] = useState("NON")
        const [Gale1, setGale1] = useState("NON")
        const [Diarhee, setDiarhee] = useState("NON")
        const [Problemes_dentaires, setProblemes_dentaires] = useState("NON")
        const [Symptomes_de_Tuberculeux, setSymptomes_de_Tuberculeux] = useState("NON")
        const [IST1, setIST1] = useState("NON")
        const [Statut_Nutritionnel_Anormale, setStatut_Nutritionnel_Anormale] = useState("NON")

        // les usestates de descisions / actions

        const [Consultation_Medecin, setConsultation_Medecin] = useState("NON")
        const [Evaluation_et_Counselling, setEvaluation_et_Counselling] = useState("NON")
        const [Isolument_Traitement_Suivi, setIsolument_Traitement_Suivi] = useState("NON")
        const [Consultation_Dentaire, setConsultation_Dentaire] = useState("NON")
        const [Consultation_Ophtamologique, setConsultation_Ophtamologique] = useState("NON")
        const [Consultation_Gynecologique, setConsultation_Gynecologique] = useState("NON")
        const [Consultation_Psychologique, setConsultation_Psychologique] = useState("NON")
        const [Consultation_Psychatrique, setConsultation_Psychatrique] = useState("NON")
        const [Consultation_Asistant_sociale, setConsultation_Asistant_sociale] = useState("NON")
        const [Intervention_du_juge_ou_procureur_necessaire, setIntervention_du_juge_ou_procureur_necessaire] = useState("NON")
        const [Prelevement_deux_Crachats_pour_laboratoire, setPrelevement_deux_Crachats_pour_laboratoire] = useState("NON")

        const descisions_ou_actions = [
            Consultation_Medecin,
            Evaluation_et_Counselling,
            Isolument_Traitement_Suivi,
            Consultation_Dentaire,
            Consultation_Ophtamologique,
            Consultation_Gynecologique,
            Consultation_Psychologique,
            Consultation_Psychatrique,
            Consultation_Asistant_sociale,
            Intervention_du_juge_ou_procureur_necessaire,
            Prelevement_deux_Crachats_pour_laboratoire
        ]

        let date_true = ""

        const handleChange_Patient = () => {

            if(idPatient.current.value === "") return

            setCurrentPatients(Patients[parseInt(idPatient.current.value) - 1])

            for (let i = 0; i < Screening_Medicale.length; i++) {
                const element = Screening_Medicale[i];
                if (element.code_patient_scr === (idPatient.current.value).toString() && element.status_don === "0") {
                    setCurrentExam("Screening medicale")
                    setTrue_date(element.true_date)
                    date_true = element.true_date
                    console.log(True_date);
                    break
                }
                else {
                    setCurrentExam("")
                    setTrue_date("")
                    date_true = ""
                }
            }
            // console.log("true date : " + True_date);
        }

        const handleSubmit = async (e) => {
            e.preventDefault()

            if (CurrentExam === "") {
                alert(`ce patient n'a pas de Screening medicale a faire`)
                return
            }

            // 1
            let problemes_de_santee_actuels_will_go = ''
            problemes_de_santee_actuels.map( a => 
                {
                    if (a !== "NON" && problemes_de_santee_actuels_will_go === '') {
                        problemes_de_santee_actuels_will_go = problemes_de_santee_actuels_will_go + a
                    }
                    else if (a !== "NON") {
                        problemes_de_santee_actuels_will_go = problemes_de_santee_actuels_will_go + ", " + a
                    }
            }
            )

            console.log(problemes_de_santee_actuels_will_go)
            // 2
            let antecedents_personnels_will_go = ''
            antecedents_personnels.map( a => 
                {
                    if (a !== "NON" && antecedents_personnels_will_go === '') {
                    antecedents_personnels_will_go = antecedents_personnels_will_go + a
                    }
                    else if (a !== "NON") {
                    antecedents_personnels_will_go = antecedents_personnels_will_go + ", " + a
                    }
            }
            )

            console.log(antecedents_personnels_will_go)
            
            // 2
            let est_actuelement_sous_traitement_de_will_go = ''
            est_actuelement_sous_traitement_de.map( a => 
                {
                    if (a !== "NON" && est_actuelement_sous_traitement_de_will_go === '') {
                        est_actuelement_sous_traitement_de_will_go = est_actuelement_sous_traitement_de_will_go + a
                    }
                    else if (a !== "NON") {
                        est_actuelement_sous_traitement_de_will_go = est_actuelement_sous_traitement_de_will_go + ", " + a
                    }
            }
            )

            console.log(est_actuelement_sous_traitement_de_will_go)
            
            // 3
            let descisions_ou_actions_will_go = ''
            descisions_ou_actions.map( a => 
                {
                    if (a !== "NON" && descisions_ou_actions_will_go === '') {
                        descisions_ou_actions_will_go = descisions_ou_actions_will_go + a
                    }
                    else if (a !== "NON") {
                        descisions_ou_actions_will_go = descisions_ou_actions_will_go + ", " + a
                    }
            }
            )

            console.log(descisions_ou_actions_will_go)

            console.log(True_date);

            // on envoie les donnees en base

            try {
                const response = await fetch(
                    `${Constant.ipUrl}setScreening_medicale.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            idPatient : parseInt(idPatient.current.value),
                            DateExam : (DateExam.current.value).toString(),
                            True_date : True_date,
                            age : (age.current.value).toString(),
                            telephone_personne_a_contacter : (telephone_personne_a_contacter.current.value).toString(),
                            antecedents_personnels : antecedents_personnels_will_go,
                            problemes_de_santee_actuels : problemes_de_santee_actuels_will_go,
                            Tousse : Tousse,
                            Transpiration_nocturne : Transpiration_nocturne,
                            Fievre_persistante : Fievre_persistante,
                            Fatigue_ou_perte_appeti : Fatigue_ou_perte_appeti,
                            Amaigrissement : Amaigrissement,
                            Contact_avec_un_Tuberculeux : Contact_avec_un_Tuberculeux,
                            OMI : OMI,
                            est_actuelement_sous_traitement_de : est_actuelement_sous_traitement_de_will_go,
                            DDR : (DDR.current.value).toString(),
                            Gravida_para : Gravida_para.current.value,
                            Autre_histoires_medicales : Autre_histoires_medicales.current.value,
                            alergies : alergies.current.value,
                            toxico : toxico.current.value,
                            TensionArteriel : (TensionArteriel.current.value).toString(),
                            Poids : (Poids.current.value).toString(),
                            taille : (taille.current.value).toString(),
                            Indice_masse_corporelle : (Indice_masse_corporelle.current.value).toString(),
                            nbr_enfant_accompagnant : (nbr_enfant_accompagnant.current.value).toString(),
                            bilan_lesionnel : (bilan_lesionnel.current.value).toString(),
                            resultatExamBiologique : (resultatExamBiologique.current.value).toString(),
                            Examen_entree_anormales : Examen_entree_anormales,
                            Blessures : Blessures,
                            Abus_de_substances : Abus_de_substances,
                            Gale1 : Gale1,
                            Diarhee : Diarhee,
                            Problemes_dentaires : Problemes_dentaires,
                            Symptomes_de_Tuberculeux : Symptomes_de_Tuberculeux,
                            IST1 : IST1,
                            Statut_Nutritionnel_Anormale : Statut_Nutritionnel_Anormale,
                            descisions_ou_actions : descisions_ou_actions_will_go,
                            conclusion : conclusion.current.value,
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
                console.log(error)
            }
            finally {
                alert("Screening Medicale Enregistree avec succes !")
            }


            const date = new Date();
            const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
            
            console.log(date_true, dateExam);

            try {
                const response2 = await fetch(
                    `${Constant.ipUrl}makeExam.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            newDateExam : (dateExam).toString(),
                            DateExam : True_date,
                            responsable : parseInt(props.Saver[1]),
                            cesmo : "Screening medicale",
                            resultat : descisions_ou_actions_will_go
                            // penser a mettre a jour le responsable et le nom de l'operateur 
                        })
                    }
                )
                if (!response2.ok) {
                    alert("Probleme d'enregistrement, veillez reesayer")
                    throw new Error("il y a une petit erreur")
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setCurrentExam("")
            }           
        }

    return (
        <div style={{background : "whitesmoke", height : "100%"}}>
            <GoBack handlclick={props.arriere}/>
            <center>
                <b style={{color : "red"}}>{CurrentExam === "" && "ATTENTION ! Ce patient n'a pas de Screening medicale a faire. Ca ne sert a rien d'essayer de l'enregistrer"}</b>
            </center>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Screening Medicale initiale</h2>
                <div className="">
                    <div className="form-group form-group1 col-md-11" style={{display : "flex", justifyContent : "space-around"}}>
                        <form className="col-md-6" onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Identification du patient</td>
                                        <td>
                                            <select className="form-control" ref={idPatient} onChange={handleChange_Patient}>
                                                <option value=""></option>
                                                {Patients.map((p, key) => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date du jour</td>
                                        <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                                    </tr>
                                    <tr>
                                        <td>Age</td>
                                        <td><input type="number" name="" className="form-control" ref={age} value={CurrentPatients.age}/></td>
                                    </tr>
                                    <tr>
                                        <td>Telephone des personnes a contacter</td>
                                        <td><input type="number" name="" className="form-control" ref={telephone_personne_a_contacter} value={CurrentPatients.numtel}/></td>
                                    </tr>
                                    <tr style={{textAlign : "top"}}>
                                        <td style={{}}>Antecedentes Personnels</td>
                                        <td className="supertd1" onMouseOver={() => {setIsHover1(true)}} onMouseOut={() => {setIsHover1(false)}}>

                                                <select className="form-control selectsupertd1" style={{display : IsHover1 ? "none" : ""}}>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <ul className="activeUl" style={{display : IsHover1 ? "" : "none", listStyle : "none", zIndex : 1, transform : "scale(1.3)" , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 }}> {/* , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 */}
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setHTA(HTA === "NON" ? "HTA" : "NON")}}/> HTA </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setDIABETE(DIABETE === "NON" ? "DIABETE" : "NON")}}/> DIABETE </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setEPILEPSIE(EPILEPSIE === "NON" ? "EPILEPSIE" : "NON")}}/> EPILEPSIE</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setObstetricale_et_Genicologie(Obstetricale_et_Genicologie === "NON" ? "Obstetricale_et_Genicologie" : "NON")}}/> Obstetricale et Genicologie</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setCANCER(CANCER === "NON" ? "CANCER" : "NON")}}/> CANCER</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setDREPANOCYTOSE(DREPANOCYTOSE === "NON" ? "DREPANOCYTOSE" : "NON")}}/> DREPANOCYTOSE</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setATHSME(ATHSME === "NON" ? "ATHSME" : "NON")}}/> ATHSME</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setVIH(VIH === "NON" ? "VIH" : "NON")}}/> VIH</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setTUBERCULOSE(TUBERCULOSE === "NON" ? "TUBERCULOSE" : "NON")}}/> TUBERCULOSE</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setMALADIES_HEMOROIDAIRES(MALADIES_HEMOROIDAIRES === "NON" ? "MALADIES_HEMOROIDAIRES" : "NON")}}/> MALADIES HEMOROIDAIRES</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setPSYCHIATRIQUE(PSYCHIATRIQUE === "NON" ? "PSYCHIATRIQUE" : "NON")}}/> PSYCHIATRIQUE </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setCHIRURGICAUX(CHIRURGICAUX === "NON" ? "CHIRURGICAUX" : "NON")}}/> CHIRURGICAUX</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setAUTRES(AUTRES === "NON" ? "AUTRES" : "NON")}}/> AUTRES</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setRAS(RAS === "NON" ? "RAS" : "NON")}}/> RAS</li>
                                                </ul>
                                        </td>
                                    </tr>
                                    <tr style={{textAlign : "top"}}>
                                        <td style={{}}>Probleme (s) de sante actuel (s)</td>
                                        <td className="supertd1" onMouseOver={() => {setIsHover2(true)}} onMouseOut={() => {setIsHover2(false)}}>

                                                <select className="form-control selectsupertd1" style={{display : IsHover2 ? "none" : ""}}>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <ul className="activeUl" style={{display : IsHover2 ? "" : "none", listStyle : "none", zIndex : 1, transform : "scale(1.3)" , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 }}> {/* , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 */}
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setDIABETE1(DIABETE1 === "NON" ? "DIABETE" : "NON")}}/> DIABETE </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setHypertension(Hypertension === "NON" ? "Hypertension" : "NON")}}/> Hypertension </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setMaladie_Cardiaque(Maladie_Cardiaque === "NON" ? "Maladie_Cardiaque" : "NON")}}/> Maladie Cardiaque </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setAsthme_ou_BPCO(Asthme_ou_BPCO === "NON" ? "Asthme / BPCO" : "NON")}}/> Asthme / BPCO </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setEPILEPSIE1(EPILEPSIE1 === "NON" ? "EPILEPSIE" : "NON")}}/> EPILEPSIE</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setTROUBLES_MENTAL(TROUBLES_MENTAL === "NON" ? "TROUBLES_MENTAL" : "NON")}}/> TROUBLES MENTAL</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setDyspepsie(Dyspepsie === "NON" ? "Dyspepsie" : "NON")}}/> Dyspepsie</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setVIH1(VIH1 === "NON" ? "VIH" : "NON")}}/> VIH</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setGale(Gale === "NON" ? "Gale" : "NON")}}/> Gale</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setTUBERCULOSE1(TUBERCULOSE1 === "NON" ? "TUBERCULOSE" : "NON")}}/> TUBERCULOSE</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setIST(IST === "NON" ? "IST" : "NON")}}/> IST</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setAUTRES_MALADIES_CONTAGIEUSES(AUTRES_MALADIES_CONTAGIEUSES === "NON" ? "AUTRES_MALADIES_CONTAGIEUSES" : "NON")}}/> AUTRES MALADIES CONTAGIEUSES</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setRAS1(RAS1 === "NON" ? "RAS" : "NON")}}/> RAS</li>
                                                </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tousse depuis deux (02) semaines</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => setTousse(Tousse === "NON" ? "tousse depuis deux (02) semaines" : "NON")}/></td>
                                    </tr>
                                    <tr>
                                        <td>Transpiration nocturne</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setTranspiration_nocturne(Transpiration_nocturne === "NON" ? "Transpiration nocturne" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Fievre persistante</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setFievre_persistante(Fievre_persistante === "NON" ? "Fievre persistante" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Fatigue / perte d'appeti</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setFatigue_ou_perte_appeti(Fatigue_ou_perte_appeti === "NON" ? "Fatigue / perte d'appeti" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Amaigrissement</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setAmaigrissement(Amaigrissement === "NON" ? "Amaigrissement" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Contact avec un Tuberculeux</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setContact_avec_un_Tuberculeux(Contact_avec_un_Tuberculeux === "NON" ? "Contact_avec_un_Tuberculeux" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Oedeme de Membre  Inferieur (OMI)</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setOMI(OMI === "NON" ? "Oedeme de Membre  Inferieur (OMI)" : "NON")}}/></td>
                                    </tr>
                                    <tr style={{textAlign : "top"}}>
                                        <td style={{}}>Est Actuelement sous traitement de </td>
                                        <td className="supertd1" onMouseOver={() => {setIsHover3(true)}} onMouseOut={() => {setIsHover3(false)}}>

                                                <select className="form-control selectsupertd1" style={{display : IsHover3 ? "none" : ""}}>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <ul className="activeUl" style={{display : IsHover3 ? "" : "none", listStyle : "none", zIndex : 1, transform : "scale(1.3)" , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 }}> {/* , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 */}
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setPaludisme(Paludisme === "NON" ? "Paludisme" : "NON")}}/> Paludisme </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setVIH3(VIH3 === "NON" ? "VIH" : "NON")}}/> VIH</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setTUBERCULOSE2(TUBERCULOSE2 === "NON" ? "TUBERCULOSE" : "NON")}}/> TUBERCULOSE</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setDiabete2(Diabete2 === "NON" ? "Diabete" : "NON")}}/> Diabete</li>
                                                </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date de derniere Regle</td>
                                        <td><input type="date" name="" className="form-control" ref={DDR}/></td>
                                    </tr>
                                    <tr>
                                        <td>Gravida Para</td>
                                        <td><input type="text" name="" className="form-control" ref={Gravida_para}/></td>
                                    </tr>
                                    <tr>
                                        <td>Autre histoires medicales</td>
                                        <td><input type="text" name="" className="form-control" ref={Autre_histoires_medicales}/></td>
                                    </tr>
                                    <tr>
                                        <td>Elements d'allergie</td>
                                        <td><input type="text" name="" className="form-control" ref={alergies}/></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} align="center" style={{paddingTop : 60}}>Autres Observations</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} align="center">Nom de l'Examinateur</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} align="center" style={{paddingTop : 30}}><button className="btn btn-danger" onClick={(e) => {e.preventDefault()}}>Annuler</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <form className="col-md-6">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Profile Toxicologique</td>
                                        <td><input type="text" name="" id="" className="form-control" ref={toxico}/></td>
                                    </tr>
                                    <tr>
                                        <td>Tension Arteriele en CmHg</td>
                                        <td><input type="number" name="" id="" className="form-control" ref={TensionArteriel}/></td>
                                    </tr>
                                    <tr>
                                        <td>Poids en Kg</td>
                                        <td><input type="number" name="" id="" className="form-control" ref={Poids}/></td>
                                    </tr>
                                    <tr>
                                        <td>Taille en cm</td>
                                        <td><input type="number" name="" id="" className="form-control" ref={taille}/></td>
                                    </tr>
                                    <tr>
                                        <td>Indice de masse corporelle</td>
                                        <td><input type="number" name="" id="" className="form-control" ref={Indice_masse_corporelle}/></td>
                                    </tr>
                                    <tr>
                                        <td>Nombres d'enfants accompagnant (ages)</td>
                                        <td><input type="number" name="" id="" className="form-control" ref={nbr_enfant_accompagnant}/></td>
                                    </tr>
                                    <tr>
                                        <td>Bilan Lesionnel</td>
                                        <td><input type="text" name="" id="" className="form-control" ref={bilan_lesionnel}/></td>
                                    </tr>
                                    <tr>
                                        <td>Resultats d'examen biologiques</td>
                                        <td><input type="text" name="" id="" className="form-control" ref={resultatExamBiologique}/></td>
                                    </tr>
                                    <tr>
                                        <td>Examen d'entree anormales </td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setExamen_entree_anormales(Examen_entree_anormales === "NON" ? "Examen d'entree anormales" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Blessures </td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setBlessures(Blessures === "NON" ? "Blessures" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Abus de substances </td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setAbus_de_substances(Abus_de_substances === "NON" ? "Abus de substances" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Gale </td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setGale1(Gale1 === "NON" ? "Gale" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Diarhee</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setDiarhee(Diarhee === "NON" ? "Diarhee" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Problemes dentaires</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setProblemes_dentaires(Problemes_dentaires === "NON" ? "Problemes dentaires" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Symptomes de Tuberculeux</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setSymptomes_de_Tuberculeux(Symptomes_de_Tuberculeux === "NON" ? "Symptomes de Tuberculeux" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>IST</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setIST1(IST1 === "NON" ? "IST" : "NON")}}/></td>
                                    </tr>
                                    <tr>
                                        <td>Statut Nutritionnel Anormale</td>
                                        <td align="center"><input type="checkbox" name="" onChange={() => {setStatut_Nutritionnel_Anormale(Statut_Nutritionnel_Anormale === "NON" ? "Statut Nutritionnel Anormale" : "NON")}}/></td>
                                    </tr>
                                    <tr style={{textAlign : "top"}}>
                                        <td style={{}}>Descisions / Actions</td>
                                        <td className="supertd1" onMouseOver={() => {setIsHover4(true)}} onMouseOut={() => {setIsHover4(false)}}>

                                                <select className="form-control selectsupertd1" style={{display : IsHover4 ? "none" : ""}}>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <ul className="activeUl" style={{display : IsHover4 ? "" : "none", listStyle : "none", zIndex : 1, transform : "scale(1.3)" , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 }}> {/* , width : 200, height : 19, paddingRight : 18, paddingLeft : 23, marginTop : 5 */}
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Medecin(Consultation_Medecin === "NON" ? "Consultation Medecin" : "NON")}}/> Consultation du medecin </li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setEvaluation_et_Counselling(Evaluation_et_Counselling === "NON" ? "Evaluation et Counselling" : "NON")}}/> Evaluation et Counselling</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setIsolument_Traitement_Suivi(Isolument_Traitement_Suivi === "NON" ? "Isolument / Traitement / Suivi" : "NON")}}/> Isolument / Traitement / Suivi</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Dentaire(Consultation_Dentaire === "NON" ? "Consultation Dentaire" : "NON")}}/> Consultation Dentaire</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Ophtamologique(Consultation_Ophtamologique === "NON" ? "Consultation Ophtamologique" : "NON")}}/> Consultation Ophtamologique</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Gynecologique(Consultation_Gynecologique === "NON" ? "Consultation Gynecologique" : "NON")}}/> Consultation Gynecologique</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Psychologique(Consultation_Psychologique === "NON" ? "Consultation Psychologique" : "NON")}}/> Consultation Psychologique</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Psychatrique(Consultation_Psychatrique === "NON" ? "Consultation Psychatrique" : "NON")}}/> Consultation Psychatrique</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setConsultation_Asistant_sociale(Consultation_Asistant_sociale === "NON" ? "Consultation Asistant sociale" : "NON")}}/> Consultation Asistant sociale</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setIntervention_du_juge_ou_procureur_necessaire(Intervention_du_juge_ou_procureur_necessaire === "NON" ? "Intervention du juge ou procureur necessaire" : "NON")}}/> Intervention du juge / procureur necessaire</li>
                                                    <li style={{backgroundColor : "whitesmoke"}} className="col-md-12"><input type="checkbox" name="check" onChange={() => {setPrelevement_deux_Crachats_pour_laboratoire(Prelevement_deux_Crachats_pour_laboratoire === "NON" ? "Prelevement deux (02) Crachats pour laboratoire" : "NON")}}/> Prelevement deux (02) Crachats pour laboratoire</li>
                                                </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} align="center" style={{paddingTop : 70}}><textarea name="" cols="30" rows="2" className="form-control" ref={conclusion}></textarea></td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <select name="" className="form-control" ref={responsable} >
                                            {Personnel.map(p =>
                                                <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                                )
                                            } 
                                        </select>
                                </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} align="center"><button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </center>
        </div>
    )
};
