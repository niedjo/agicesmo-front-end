import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import EBU from "./EBU";
import ECBU from "./ECBU";
import Nfs from "./Nfs";
import Dosage_hormone from "./Dosage_hormone";
import ECBU_ATB from "./ECBU_ATB";
import Parasitologie from "./Parasitologie";
import Substrat_biochimie_sanguine from "./Substrat_biochimie_sanguine";
import Hematologie from "./Hematologie";
import Profile_Lipidique from "./Profile_Lipidique";
import Enzymes_Hepathiques from "./Enzymes_Hepathiques";
import Serologie from "./Serologie";
import Bandelette_Urinaire from "./Bandelette_Urinaire";
import PCV from "./PCV";
import Frottis_Sanguin from "./Frottis_Sanguin";
import Innogramme_Sanguin from "./Innogramme_Sanguin";
import GE from "./GE";
import PCV_ATB from "./PCV_ATB";
import Pus_ATB from "./Pus_ATB";
import Spermoculture from "./Spermoculture";
import Spermogramme_et_Spermocytogramme from "./Spermogramme_et_Spermocytogramme";
import Test_Grocesse from "./Test_Grocesse";
import Constant from "../../../Constant";

export default function Laboratoire(props) {
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
    const [CurrentPatients, setCurrentPatients] = useState("1")
    const [CurrentExam, setCurrentExam] = useState("")
    const [Personnel, setPersonnel] = useState([])
    const [Laboratoire, setLaboratoire] = useState([])
    const [ID, setID] = useState("")

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
                setLaboratoire([])
                setLaboratoire(body['informations1'])
                // for (let i = 0; i < body['informations1'].length; i++) {
                //     if (body['informations1'][i].status_don === "0" && body['informations1'][i].code_patient_lab === "1") {
                //         setCurrentExam(body['informations1'][i].nature_examen)
                //         break
                //     }
                //     else {
                //         setCurrentExam("")
                //     }
                    
                // }
                // setCurrentExam(body['informations1'][0].nature_examen)
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])


    const idPatient = useRef(null)
    const nom_operateur = useRef(null)
    const DateExam = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    // const prix = useRef()
    // const reglement_client = useRef()
    // const reste_a_payer = useRef()
    // const expression_des_resultats = useRef()
    // const conclusion = useRef()
    const responsable = useRef()

    const handleChange = () => {
        Laboratoire.map(lab => lab.true_date === NatureExam.current.value && setCurrentExam(lab.nature_examen))
    }

    const handleChange_Patient = () => {
        setCurrentPatients((idPatient.current.value).toString())
        for (let i = 0; i < Laboratoire.length; i++) {
            const element = Laboratoire[i];
            if (element.code_patient_lab === (idPatient.current.value).toString() && element.status_don === "0") {
                setCurrentExam(element.nature_examen)
                break
            }
            else {
                setCurrentExam("")
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setID(NatureExam.current.value)

        if (CurrentExam === "NFS (Numeration Formule Sanguine)" || CurrentExam === "NFS (Numeration Formule Sanguine)_Partenaires") {
            setCurrentExam("")
            setIsNfs(true) 
        }
        else if (
            CurrentExam === "Hormone FSH" 
            || CurrentExam === "Hormone FSH_partenaire"
            || CurrentExam === "Hormone LH"
            || CurrentExam === "Hormone LH_partenaire"
            || CurrentExam === "Hormone PRL"
            || CurrentExam === "Hormone PRL_partenaire"
            || CurrentExam === "Hormone PSA"
            || CurrentExam === "Hormone PSA_partenaire"
            || CurrentExam === "Hormone TSH"
            || CurrentExam === "Hormone TSH_partenaire"
        ) {
            setCurrentExam("")
            setIsDosage_hormone(true) 
            
        }
        else if (
            CurrentExam === "ECBU" 
            || CurrentExam === "ECBU_Partenaires"
        ) {
            setCurrentExam("")
            setIsECBU(true) 
        }
        else if (
            CurrentExam === "ECBU_ATB" 
            || CurrentExam === "ECBU_ATB_Partenaires"
            || CurrentExam === "ECBU Antibiogramme"

        ) {
            setCurrentExam("")
            setIsECBU_ATB(true) 
        }
        else if (
            CurrentExam === "Selles KOAP" 
            || CurrentExam === "Selles KOAP_Partenaires"
            || CurrentExam === "RMF"
            || CurrentExam === "RMF_Partenaires"
        ) {
            setCurrentExam("")
            setIsParasitologie(true)
        }
        else if (
            CurrentExam === "Urée (Urecemie)" 
            || CurrentExam === "Urée (Urecemie)_Partenaires"
            || CurrentExam === "Créat (Crétinine)"
            || CurrentExam === "Créat (Crétinine)_Partenaires"
            || CurrentExam === "Ac Urique (Acide Urique)"
            || CurrentExam === "Ac Urique (Acide Urique)_Partenaires"
            || CurrentExam === "Alb/Sucre Urinaire"
            || CurrentExam === "Alb/Sucre Urinaire_Partenaires"
            || CurrentExam === "Glycemie Contrôle"
            || CurrentExam === "Glycemie Contrôle_Partenaires"
            || CurrentExam === "Glycemie Première"
        ) {
            setCurrentExam("")
            setIsSubstrat_biochimie_sanguine(true)
        }
        else if (
            CurrentExam === "Profil Lipidique" 
            || CurrentExam === "Profil Lipidique_Partenaires"
            || CurrentExam === "Chol T (Cholesterol Total)"
            || CurrentExam === "Chol T (Cholesterol Total)_Partenaires"
            || CurrentExam === "LDL"
            || CurrentExam === "LDL_Partenaires"
            || CurrentExam === "HDL"
            || CurrentExam === "HDL_Partenaires"
        ) {
            setCurrentExam("")
            setIsProfile_Lipidique(true)
        }
        else if (
            CurrentExam === "ALAT/SGPT" 
            || CurrentExam === "ASAT/SGOT"
            || CurrentExam === "Transaminases"
            || CurrentExam === "Transaminases_Partenaires"
        ) {
            setCurrentExam("")
            setIsEnzymes_Hepathiques(true)
        }
        else if (
            CurrentExam === "AcHcv" 
            || CurrentExam === "AcHcv_Partenaires"
            || CurrentExam === "Ag HBS"
            || CurrentExam === "AgHbs _Partenaires"
            || CurrentExam === "ASLO"
            || CurrentExam === "ASLO_Partenaires"
            || CurrentExam === "CRP"
            || CurrentExam === "CRP_Partenaires"
            || CurrentExam === "H Pylori Test"
            || CurrentExam === "H Pylori Test_Partenaires"
            || CurrentExam === "Serologie Chlamydiae (IgG/IgM)"
            || CurrentExam === "Serologie Hepatite B"
            || CurrentExam === "Serologie Hepatite B_Partenaires"
            || CurrentExam === "Serologie Hepatite C"
            || CurrentExam === "Serologie Hepatite C_Partenaires"
            // || CurrentExam === "Serologie LAV_Partenaires"
            || CurrentExam === "Serologie Rubeole"
            || CurrentExam === "Serologie Rubeole_Partenaires"
            || CurrentExam === "Serologie Toxo IgG et IGM"
            || CurrentExam === "Serologie Toxo IgG et IGM_Partenaires"
            || CurrentExam === "Serologie WIDAL"
            || CurrentExam === "Serologie WIDAL_Partenaires"
            || CurrentExam === "VIH"
            || CurrentExam === "VIH_Partenaires"
        ) {
            setCurrentExam("")
            setIsSerologie(true)
        }
        // else if (
        //     // le pcv et la serologie a revoire
        //     CurrentExam === "NFS (Numeration Formule Sanguine)" 
        //     || CurrentExam === "NFS (Numeration Formule Sanguine)_Partenaires"
        // ) {

        // }
        else if (
            CurrentExam === "Ionogramme complet" 
            || CurrentExam === "Ionogramme complet_Partenaires"
            || CurrentExam === "Ionogramme simple"
            || CurrentExam === "Ionogramme simple_Partenaires"
            || CurrentExam === "K (Potassium)"
            || CurrentExam === "K (Potassium)_Partenaires"
            || CurrentExam === "Na (Sodium)"
            || CurrentExam === "Na (Sodium)_Partenaires"
            || CurrentExam === "Mg (Magnesium)_Partenaires"
            || CurrentExam === "Mg (Magnesium)"
            || CurrentExam === "Ca (Calcium)"
            || CurrentExam === "Ca (Calcium)_Partenaires"
            || CurrentExam === "Cl (Chlorure)"
            || CurrentExam === "Cl (Chlorure)_Partenaires"
        ) {
            setCurrentExam("")
            setIsInnogramme_sanguin(true)  
        }
        else if (
            CurrentExam === "Electrophorese" 
            || CurrentExam === "Electrophorese_Partenaires"
            || CurrentExam === "Groupe Sanguin Rhesus"
            || CurrentExam === "Groupe Sanguin Rhesus_Partenaires"
            || CurrentExam === "VS" 
            || CurrentExam === "VS_Partenaires" 
        ) {
            setCurrentExam("")
            setIsHematologie(true)
        }
        else if (
            CurrentExam === "GE" 
            || CurrentExam === "GE_Partenaires"
            || CurrentExam === "GE_Selles_Widal"
        ) {
            setCurrentExam("")
            setIsGE(true)
        }
        else if (
            CurrentExam === "PCV Simple"
            || CurrentExam === "PCV Simple_Partenaires"
            ) {
                setCurrentExam("")
                setIsPCV(true)
            }
            else if (
            CurrentExam === "PCV_ATB" 
            || CurrentExam === "PCV avec Antibiogramme_Partenaires"
            || CurrentExam === "PCV avec Antibiogramme" 
            || CurrentExam === "PCV_ATB_Partenaires"
        ) {
            setCurrentExam("")
            setIsPCV_ATB(true)
        }
        else if (
            CurrentExam === "Pus_ATB" 
            || CurrentExam === "Pus_ATB_Partenaires"
        ) {
            setCurrentExam("")
            setIsPus_ATB(true)
        }
        else if (
            CurrentExam === "Spermoculture" 
            || CurrentExam === "Spermoculture_Partenaires"
        ) {
            setCurrentExam("")
            setIsSpermoculture(true)
        }
        else if (
            CurrentExam === "Test de Grossesse Urinaire" 
            || CurrentExam === "Test de Grossesse Urinaire_Partenaires"
            || CurrentExam === "Test de Grossesse Sanguin_Partenaires"
            || CurrentExam === "Test de Grossesse Sanguin"
        ) {
            setCurrentExam("")
            setIsTest_Grocesse(true)
        }


    }


    // a partir d'ici, on conditionne sur les examens, on les rends et on met a jour les exams a faire 

    const [IsEBU, setIsEBU] = useState(false)
    const [IsECBU, setIsECBU] = useState(false)
    const [IsECBU_ATB, setIsECBU_ATB] = useState(false)
    const [IsNfs, setIsNfs] = useState(false)
    const [IsDosage_hormone, setIsDosage_hormone] = useState(false)
    const [IsParasitologie, setIsParasitologie] = useState(false)
    const [IsSubstrat_biochimie_sanguine, setIsSubstrat_biochimie_sanguine] = useState(false)
    const [IsHematologie, setIsHematologie] = useState(false)
    const [IsProfile_Lipidique, setIsProfile_Lipidique] = useState(false)
    const [IsEnzymes_Hepathiques, setIsEnzymes_Hepathiques] = useState(false)
    const [IsSerologie, setIsSerologie] = useState(false)
    const [IsBandelette_Urinaire, setIsBandelette_Urinaire] = useState(false)
    const [IsPCV, setIsPCV] = useState(false)
    const [IsFrottis_Sanguin, setIsFrottis_Sanguin] = useState(false)
    const [IsInnogramme_sanguin, setIsInnogramme_sanguin] = useState(false)
    const [IsGE, setIsGE] = useState(false)
    const [IsPCV_ATB, setIsPCV_ATB] = useState(false)
    const [IsPus_ATB, setIsPus_ATB] = useState(false)
    const [IsSpermoculture, setIsSpermoculture] = useState(false)
    const [ISSpermogramme_et_Spermocytogramme, setISSpermogramme_et_Spermocytogramme] = useState(false)
    const [IsTest_Grocesse, setIsTest_Grocesse] = useState(false)

    if (IsEBU) {
        return <EBU arriere = {() => setIsEBU(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsECBU) {
        return <ECBU arriere = {() => setIsECBU(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsECBU_ATB) {
        return <ECBU_ATB arriere = {() => setIsECBU_ATB(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsNfs) {
        return <Nfs arriere = {() => setIsNfs(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsDosage_hormone) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Dosage_hormone arriere = {() => setIsDosage_hormone(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsParasitologie) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Parasitologie arriere = {() => setIsParasitologie(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsSubstrat_biochimie_sanguine) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Substrat_biochimie_sanguine arriere = {() => setIsSubstrat_biochimie_sanguine(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsHematologie) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Hematologie arriere = {() => setIsHematologie(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsProfile_Lipidique) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Profile_Lipidique arriere = {() => setIsProfile_Lipidique(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsEnzymes_Hepathiques) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Enzymes_Hepathiques arriere = {() => setIsEnzymes_Hepathiques(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsSerologie) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Serologie arriere = {() => setIsSerologie(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsBandelette_Urinaire) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Bandelette_Urinaire arriere = {() => setIsBandelette_Urinaire(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsPCV) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <PCV arriere = {() => setIsPCV(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsFrottis_Sanguin) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Frottis_Sanguin arriere = {() => setIsFrottis_Sanguin(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsInnogramme_sanguin) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Innogramme_Sanguin arriere = {() => setIsInnogramme_sanguin(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsGE) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <GE arriere = {() => setIsGE(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsPCV_ATB) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <PCV_ATB arriere = {() => setIsPCV_ATB(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsPus_ATB) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Pus_ATB arriere = {() => setIsPus_ATB(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsSpermoculture) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Spermoculture arriere = {() => setIsSpermoculture(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (ISSpermogramme_et_Spermocytogramme) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Spermogramme_et_Spermocytogramme arriere = {() => setISSpermogramme_et_Spermocytogramme(false)} Saver = {props.Saver} DateExam = {ID}/>
    }
    if (IsTest_Grocesse) {
        // eslint-disable-next-line react/jsx-pascal-case
        return <Test_Grocesse arriere = {() => setIsTest_Grocesse(false)} Saver = {props.Saver} DateExam = {ID}/>
    }



    return(
        <div className="stockjour" style={{height : "200vh"}}>
            <GoBack handlclick={props.arriere}/>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Laboratoire</h2>
                {/* {CurrentExam} <br />
                {CurrentPatients} */}
                <form className="form-group form-group1 col-md-5" onSubmit={handleSubmit}>
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
                                <td>Nature de l'examen</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                    <option value=""></option>
                                        {Laboratoire.map(l => (
                                            (l.code_patient_lab === CurrentPatients && l.status_don === "0") && <option key={l.true_date} value={l.true_date}>{l.nature_examen}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Responsable</td>
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
                                <td>nom de l'operateur</td>
                                <td>
                                    <select className="form-control" ref={nom_operateur}>
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
            {/* <button onClick={() => setIsNfs(true)}>Nfs</button>
            <button onClick={() => setIsDosage_hormone(true)}>Dosage d'hormone</button>
            <button onClick={() => setIsECBU(true)}>ECBU</button>
            <button onClick={() => setIsECBU_ATB(true)}>ECBU ATB</button>
            <button onClick={() => setIsParasitologie(true)}>Parasitologie</button>
            <button onClick={() => setIsSubstrat_biochimie_sanguine(true)}>Substrat de biochimie sanguine</button>
            <button onClick={() => setIsProfile_Lipidique(true)}>Profile Lipidique</button>
            <button onClick={() => setIsEnzymes_Hepathiques(true)}>Enzymes_Hepathiques</button>
            <button onClick={() => setIsSerologie(true)}>Serologie</button>
            <button onClick={() => setIsPCV(true)}>PCV</button>
            <button onClick={() => setIsFrottis_Sanguin(true)}>Frottis_Sanguin</button>
            <button onClick={() => setIsInnogramme_sanguin(true)}>innigramme sanguin</button>
            <button onClick={() => setIsHematologie(true)}>hematologie </button>
            <button onClick={() => setIsGE(true)}>GE </button>
            <button onClick={() => setIsPCV_ATB(true)}>PCV ATB </button>
            <button onClick={() => setIsPus_ATB(true)}>Pus ATB </button>
            <button onClick={() => setIsSpermoculture(true)}>Spermoculture</button>
            <button onClick={() => setISSpermogramme_et_Spermocytogramme(true)}>Spermogramme et Spermocytogramme</button>
            <button onClick={() => setIsTest_Grocesse(true)}>test grossesse</button> */}
        </div>
    )
};

 