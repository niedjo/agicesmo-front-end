import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { GoBack } from "../../../Components/GoBack";
import { Tab, Tabs } from "../../../Components/Tabs";
import './requettes.css'
import PrintEchoPelv from "../../impressionData/PrintEchoPelv";
import PrintEchoObsT1 from "../../impressionData/PrintEchoObsT1";
import PrintEchoObsT2 from "../../impressionData/PrintEchoObsT2";
import PrintEchoObsT1T2 from "../../impressionData/PrintEchoObsT1T2";
import PrintEcho2eT from "../../impressionData/PrintEcho2eT";
import PrintLaboratoire from "../../impressionData/PrintLaboratoire";
import PrintConsultation from "../../impressionData/PrintConsultation";
import PrintScreeningMedicale from "../../impressionData/PrintScreeningMedicale";
import PrintAdministration from "../../impressionData/PrintAdministration";
import PrintVaccination from "../../impressionData/PrintVaccination";
import Constant from "../../../Constant";

export default function ParJour(props) {
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    // les usestates des resultats 
    const [Patients, setPatients] = useState([])
    const [Result, setResult] = useState([])
    const [Consultations, setConsultations] = useState([])
    const [Laboratoire, setLaboratoire] = useState([])
    const [Imagerie, setImagerie] = useState([])
    const [Pharmacie, setPharmacie] = useState([])
    const [Soin, setSoin] = useState([])
    const [Dette, setDette] = useState([])
    const [Screening_medicale, setScreening_medicale] = useState([])
    const [Administration, setAdministration] = useState([])
    const [Vaccination, setVaccination] = useState([])
    const [Echo2eT, setEcho2eT] = useState([])

    const [IdPatient, setIdPatient] = useState(false)
    const [Search, setSearch] = useState("1")
    // les usestates des impressions

    const [IsPrintEchoPelv, setIsPrintEchoPelv] = useState(false)
    const [IsPrintEchoObst1, setIsPrintEchoObst1] = useState(false)
    const [IsPrintEchoObst2, setIsPrintEchoObst2] = useState(false)
    const [IsPrintEchoObst12, setIsPrintEchoObst12] = useState(false)
    const [IsPrintEcho2eT, setIsPrintEcho2eT] = useState(false)
    const [IsPrintLaboratoire, setIsPrintLaboratoire] = useState(false)
    const [IsPrintConsultation, setIsPrintConsultation] = useState(false)
    const [IsPrintScreeningMedicale, setIsPrintScreeningMedicale] = useState(false)
    const [IsPrintAdministration, setIsPrintAdministration] = useState(false)
    const [IsprintVaccination, setIsprintVaccination] = useState(false)
    const [objet, setobjet] = useState([])
    
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
                `${Constant.ipUrl}getScreeningMedicale.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setScreening_medicale(body['screening_medicale'])
                // alert("ok")
                console.log("component mounted", Screening_medicale)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

            fetch(
                `${Constant.ipUrl}getPatientInfo.php`,
                {
                    method : "GET",
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setResult(body['informations'])
                setLaboratoire(body['informations1'])
                setImagerie(body['informations2'])
                setPharmacie(body['informations3'])
                setSoin(body['informations4'])
                setDette(body['informations5'])
                setEcho2eT(body['informations6'])
                setConsultations(body['informations7'])
                setAdministration(body['informations10'])
                setVaccination(body['informations11'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        return () => {
            FetchData()    
            setIdPatient(true)
        };
    }, [])


    // les examens en laboratoire

    const [nFS, setNFS] = useState([])
    const [dosage_hormone, setDosage_hormone] = useState([])
    const [ecbu, setEcbu] = useState([])
    const [ecbu_atb, setEcbu_atb] = useState([])
    const [parasitologie, setParasitologie] = useState([])
    const [substrat_biochimie_sanguine, setSubstrat_biochimie_sanguine] = useState([])
    const [hematologie, setHematologie] = useState([])
    const [profile_lipidique, setProfile_lipidique] = useState([])
    const [enzymes_hepathiques, setEnzymes_hepathiques] = useState([])
    const [serologie, setSerologie] = useState([])
    const [bandelette_urinaire, setBandelette_urinaire] = useState([])
    const [pcv, setPcv] = useState([])
    const [innogramme_sanguin, setInnogramme_sanguin] = useState([])
    const [frottis_sanguin, setFrottis_sanguin] = useState([])
    const [ge, setGe] = useState([])
    const [pcv_atb, setPcv_atb] = useState([])
    const [pus_atb, setPus_atb] = useState([])
    const [spermoculture, setSpermoculture] = useState([])
    const [test_grocesse, setTest_grocesse] = useState([])

    useEffect(() => {

        function FetchDate() {
            fetch(
                `${Constant.ipUrl}getExam.php`,
                {
                    method : "GET",
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setNFS(body['nfs'])
                setDosage_hormone(body['dosage_hormone'])
                setEcbu(body['ecbu'])
                setEcbu_atb(body['ecbu_atb'])
                setParasitologie(body['parasitologie'])
                setSubstrat_biochimie_sanguine(body['substrat_biochimie_sanguine'])
                setHematologie(body['hematologie'])
                setProfile_lipidique(body['profile_lipidique'])
                setEnzymes_hepathiques(body['enzymes_hepathiques'])
                setSerologie(body['serologie'])
                setBandelette_urinaire(body['bandelette_urinaire'])
                
                setPcv(body['pcv'])
                setInnogramme_sanguin(body['innogramme_sanguin'])
                setFrottis_sanguin(body['frottis_sanguin'])
                setGe(body['ge'])
                setPcv_atb(body['pcv_atb'])
                setPus_atb(body['pus_atb'])
                setSpermoculture(body['spermoculture'])
                setTest_grocesse(body['test_grocesse'])
                // alert("ok")
                // console.log("component mounted", test_grocesse)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        }

        return () => {
            FetchDate()
        };
    }, [])

    const [SearchValue, setSearchValue] = useState('')
    const [DateSearch, setDateSearch] = useState(new Date().toLocaleDateString())

    const recherche = useRef()
    const daterecherche = useRef()

    const handlclick = (r) => {
        // Result.map((re) => 
        //  re.code_patient === r.code_patient_fi ? 
        //  console.log(re, r)
        // // setIsPrintEchoPelv(true)
        //  : null
        // )

        if (r.type_fiche_imagerie === "Echographie Pelvienne/Endovaginale") {
            for (let i = 0; i < Result.length; i++) {
                if (Result[i].code_patient === r.code_patient_fi) {
                    setIsPrintEchoPelv(true)
                    setobjet([Result[i], r])
                    // console.log(Result[i], r)
                    break
                }
            }
        }

        else if (r.type_fiche_imagerie === "Echographie Obstetricale depistage premier trimestre") {
            for (let i = 0; i < Result.length; i++) {
                if (Result[i].code_patient === r.code_patient_fi) {
                    setIsPrintEchoObst1(true)
                    setobjet([Result[i], r])
                    // console.log(Result[i], r)
                    break
                }
            }
        }
        else if (r.type_fiche_imagerie === "Echographie Obstetricale depistage deuxiemme trimestre") {
            for (let i = 0; i < Result.length; i++) {
                if (Result[i].code_patient === r.code_patient_fi) {
                    setIsPrintEchoObst2(true)
                    setobjet([Result[i], r])
                    // console.log(Result[i], r)
                    break
                }
            }
        }
        else if (r.type_fiche_imagerie === "Echographie Obstetricale depistage deuxiemme et troisieme trimestre") {
            for (let i = 0; i < Result.length; i++) {
                if (Result[i].code_patient === r.code_patient_fi) {
                    setIsPrintEchoObst12(true)
                    setobjet([Result[i], r])
                    // console.log(Result[i], r)
                    break
                }
            }
        }
        else if (r.type_fiche_imagerie === "Échographie 2e trimestre") {
            for (let i = 0; i < Result.length; i++) {
                if (Result[i].code_patient === r.code_patient_echo2eT) {
                    setIsPrintEcho2eT(true)
                    setobjet([Result[i], r])
                    console.log(Result[i], r)
                    break
                }
            }
        }
    }

    const handlclick_laboratoire = (r) => {
        console.log(r.code_patient_lab);
        for (let i = 0; i < Result.length; i++) {
            if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "NFS (Numeration Formule Sanguine)"
                || r.nature_examen === "NFS (Numeration Formule Sanguine)_Partenaires"
            )) {
                for (let j = 0; j < nFS.length; j++) {
                    const element = nFS[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Hormone FSH"
                || r.nature_examen === "Hormone FSH_partenaire"
                || r.nature_examen === "Hormone LH"
                || r.nature_examen === "Hormone LH_partenaire"
                || r.nature_examen === "Hormone PRL"
                || r.nature_examen === "Hormone PRL_partenaire"
                || r.nature_examen === "Hormone PSA"
                || r.nature_examen === "Hormone PSA_partenaire"
                || r.nature_examen === "Hormone TSH"
                || r.nature_examen === "Hormone TSH_partenaire"
            )) {
                for (let j = 0; j < dosage_hormone.length; j++) {
                    const element = dosage_hormone[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "ECBU"
                || r.nature_examen === "ECBU_Partenaires"
            )) {
                for (let j = 0; j < ecbu.length; j++) {
                    const element = ecbu[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "ECBU_ATB"
                || r.nature_examen === "ECBU_ATB_Partenaires"
                || r.nature_examen === "ECBU Antibiogramme"
            )) {
                for (let j = 0; j < ecbu_atb.length; j++) {
                    const element = ecbu_atb[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Selles KOAP"
                || r.nature_examen === "Selles KOAP_Partenaires"
                || r.nature_examen === "RMF"
                || r.nature_examen === "RMF_Partenaires"
            )) {
                for (let j = 0; j < parasitologie.length; j++) {
                    const element = parasitologie[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Urée (Urecemie)"
                || r.nature_examen === "Urée (Urecemie)_Partenaires"
                || r.nature_examen === "Créat (Crétinine)"
                || r.nature_examen === "Créat (Crétinine)_Partenaires"
                || r.nature_examen === "Ac Urique (Acide Urique)"
                || r.nature_examen === "Ac Urique (Acide Urique)_Partenaires"
                || r.nature_examen === "Alb/Sucre Urinaire"
                || r.nature_examen === "Alb/Sucre Urinaire_Partenaires"
                || r.nature_examen === "Glycemie Contrôle"
                || r.nature_examen === "Glycemie Contrôle_Partenaires"
                || r.nature_examen === "Glycemie Première"
            )) {
                for (let j = 0; j < substrat_biochimie_sanguine.length; j++) {
                    const element = substrat_biochimie_sanguine[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Profil Lipidique"
                || r.nature_examen === "Profil Lipidique_Partenaires"
                || r.nature_examen === "Chol T (Cholesterol Total)"
                || r.nature_examen === "Chol T (Cholesterol Total)_Partenaires"
                || r.nature_examen === "LDL"
                || r.nature_examen === "LDL_Partenaires"
                || r.nature_examen === "HDL"
                || r.nature_examen === "HDL_Partenaires"
            )) {
                for (let j = 0; j < profile_lipidique.length; j++) {
                    const element = profile_lipidique[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "ALAT/SGPT"
                || r.nature_examen === "ASAT/SGOT"
                || r.nature_examen === "Transaminases"
                || r.nature_examen === "Transaminases_Partenaires"
            )) {
                for (let j = 0; j < enzymes_hepathiques.length; j++) {
                    const element = enzymes_hepathiques[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "AcHcv"
                || r.nature_examen === "AcHcv_Partenaires"
                || r.nature_examen === "Ag HBS"
                || r.nature_examen === "AgHbs _Partenaires"
                || r.nature_examen === "ASLO"
                || r.nature_examen === "ASLO_Partenaires"
                || r.nature_examen === "CRP"
                || r.nature_examen === "CRP_Partenaires"
                || r.nature_examen === "H Pylori Test"
                || r.nature_examen === "H Pylori Test_Partenaires"
                || r.nature_examen === "Serologie Chlamydiae (IgG/IgM)"
                || r.nature_examen === "Serologie Hepatite B"
                || r.nature_examen === "Serologie Hepatite B_Partenaires"
                || r.nature_examen === "Serologie Hepatite C"
                || r.nature_examen === "Serologie Hepatite C_Partenaires"
                // || r.nature_examen === "Serologie LAV_Partenaires"
                || r.nature_examen === "Serologie Rubeole"
                || r.nature_examen === "Serologie Rubeole_Partenaires"
                || r.nature_examen === "Serologie Toxo IgG et IGM"
                || r.nature_examen === "Serologie Toxo IgG et IGM_Partenaires"
                || r.nature_examen === "Serologie WIDAL"
                || r.nature_examen === "Serologie WIDAL_Partenaires"
                || r.nature_examen === "VIH"
                || r.nature_examen === "VIH_Partenaires"
            )) {
                for (let j = 0; j < serologie.length; j++) {
                    const element = serologie[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Ionogramme complet"
                || r.nature_examen === "Ionogramme complet_Partenaires"
                || r.nature_examen === "Ionogramme simple"
                || r.nature_examen === "Ionogramme simple_Partenaires"
                || r.nature_examen === "K (Potassium)"
                || r.nature_examen === "K (Potassium)_Partenaires"
                || r.nature_examen === "Na (Sodium)"
                || r.nature_examen === "Na (Sodium)_Partenaires"
                || r.nature_examen === "Mg (Magnesium)_Partenaires"
                || r.nature_examen === "Mg (Magnesium)"
                || r.nature_examen === "Ca (Calcium)"
                || r.nature_examen === "Ca (Calcium)_Partenaires"
                || r.nature_examen === "Cl (Chlorure)"
                || r.nature_examen === "Cl (Chlorure)_Partenaires"
            )) {
                for (let j = 0; j < innogramme_sanguin.length; j++) {
                    const element = innogramme_sanguin[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Electrophorese"
                || r.nature_examen === "Electrophorese_Partenaires"
                || r.nature_examen === "Groupe Sanguin Rhesus"
                || r.nature_examen === "Groupe Sanguin Rhesus_Partenaires"
                || r.nature_examen === "VS" 
                || r.nature_examen === "VS_Partenaires" 
            )) {
                for (let j = 0; j < hematologie.length; j++) {
                    const element = hematologie[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "GE"
                || r.nature_examen === "GE_Partenaires"
                || r.nature_examen === "GE_Selles_Widal" 
            )) {
                for (let j = 0; j < ge.length; j++) {
                    const element = ge[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "PCV Simple"
                || r.nature_examen === "PCV Simple_Partenaires"
            )) {
                for (let j = 0; j < pcv.length; j++) {
                    const element = pcv[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "PCV_ATB"
                || r.nature_examen === "PCV avec Antibiogramme_Partenaires"
                || r.nature_examen === "PCV avec Antibiogramme" 
                || r.nature_examen === "PCV_ATB_Partenaires"
            )) {
                for (let j = 0; j < pcv_atb.length; j++) {
                    const element = pcv_atb[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Pus_ATB"
                || r.nature_examen === "Pus_ATB_Partenaires"
            )) {
                for (let j = 0; j < pus_atb.length; j++) {
                    const element = pus_atb[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Spermoculture"
                || r.nature_examen === "Spermoculture_Partenaires"
            )) {
                for (let j = 0; j < spermoculture.length; j++) {
                    const element = spermoculture[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
            else if (Result[i].code_patient === r.code_patient_lab && (
                r.nature_examen === "Test de Grossesse Urinaire"
                || r.nature_examen === "Test de Grossesse Urinaire_Partenaires"
                || r.nature_examen === "Test de Grossesse Sanguin_Partenaires"
                || r.nature_examen === "Test de Grossesse Sanguin"
            )) {
                for (let j = 0; j < test_grocesse.length; j++) {
                    const element = test_grocesse[j];
                    if (element.true_date === r.true_date) {
                        setobjet([Result[i], r, element])
                        console.log(Result[i], r, element)
                        setIsPrintLaboratoire(true)
                        break
                    }
                }
                break
            }
        }
    }

    const handlclick_consultation = (r) => {
        console.log(r.code_patient_cons);
        for (let i = 0; i < Result.length; i++) {
            if (Result[i].code_patient === r.code_patient_cons) {
                setobjet([Result[i], r])
                console.log(Result[i], r)
                setIsPrintConsultation(true)
                break
            }
        }
    }

    const handle_click_screening = (r) => {
        console.log(r.code_patient_sceen);
        for (let i = 0; i < Result.length; i++) {
            if (Result[i].code_patient === r.code_patient_sceen) {
                setobjet([Result[i], r])
                console.log(Result[i], r)
                setIsPrintScreeningMedicale(true)
                break
            }
        }
    }

    const handle_click_administration = (r) => {
        console.log(r.code_patient_admin);
        for (let i = 0; i < Result.length; i++) {
            if (Result[i].code_patient === r.code_patient_admin) {
                setobjet([Result[i], r])
                console.log(Result[i], r)
                setIsPrintAdministration(true)
                break
            }
        }
    }

    const handle_click_vaccination = (r) => {
        console.log(r.code_patient_vacc);
        for (let i = 0; i < Result.length; i++) {
            if (Result[i].code_patient === r.code_patient_vacc) {
                setobjet([Result[i], r])
                console.log(Result[i], r)
                setIsprintVaccination(true)
                break
            }
        }
    }
    
    if (IsPrintEchoPelv) {
        return <PrintEchoPelv arriere = {() => setIsPrintEchoPelv(false)} objet = {objet} />
    }
    if (IsPrintEchoObst1) {
        return <PrintEchoObsT1 arriere = {() => setIsPrintEchoObst1(false)} objet = {objet} />
    }
    if (IsPrintEchoObst2) {
        return <PrintEchoObsT2 arriere = {() => setIsPrintEchoObst2(false)} objet = {objet} />
    }
    if (IsPrintEchoObst12) {
        return <PrintEchoObsT1T2 arriere = {() => setIsPrintEchoObst12(false)} objet = {objet} />
    }
    if (IsPrintEcho2eT) {
        return <PrintEcho2eT arriere = {() => setIsPrintEcho2eT(false)} objet = {objet} />
    }
    if (IsPrintLaboratoire) {
        return <PrintLaboratoire arriere = {() => setIsPrintLaboratoire(false)} objet = {objet} />
    }
    if (IsPrintConsultation) {
        return <PrintConsultation arriere = {() => setIsPrintConsultation(false)} objet = {objet} />
    }
    if (IsPrintScreeningMedicale) {
        return <PrintScreeningMedicale arriere = {() => setIsPrintScreeningMedicale(false)} objet = {objet} />
    }
    if (IsPrintAdministration) {
        return <PrintAdministration arriere = {() => setIsPrintAdministration(false)} objet = {objet} />
    }
    if (IsprintVaccination) {
        return <PrintVaccination arriere = {() => setIsprintVaccination(false)} objet = {objet} />
    }
      

    function OnRequestConnexionClose (props) { 
        const Row1 = []
        const Row2 = []
        const Row3 = []
        const Row4 = []
        const Row5 = []
        const Row6 = []
        const Row7 = []
        const Row8 = [] // les consultations
        const Row9 = [] // les screening medicaux 
        const Row10 = [] // les administrations
        const Row11 = [] // les les vaccinations

        props.row1.forEach((r, key) => {
          // if (produit.name.toLowerCase().indexOf(props.search.toLowerCase()) === -1) {
          //   return
          // }
          const recherche = r.nom_et_prenom.toLowerCase() + r.numtel.toLowerCase() + r.age.toLowerCase() + r.sexe.toLowerCase() + r.raison_de_la_venue.toLowerCase() + r.lieu_de_residence.toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_du_jour).toLocaleDateString()) {
            return
          }
            Row1.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom_et_prenom}</td>
                    <td className="">{new Date(r.date_du_jour).toLocaleDateString()}</td>
                    <td className="">{r.age}</td>
                    <td className="">{r.sexe}</td>
                    {/* <td className="">{r.raison_de_la_venue}</td> */}
                    <td className="">{r.numtel}</td>
                </tr>
            )
        })
        
        props.row2.forEach((r, key) => {
            
          const recherche = r.nom.toLowerCase() + r.nature_examen.toLowerCase() + r.expression_des_resultats.toLowerCase() + r.conclusion.toLowerCase() + r.nom_et_prenom.toLowerCase() + r.quantitee
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (r.status_don === "0") {
            return
          }
          if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_exam).toLocaleDateString()) {
            return
          }
            Row2.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom}</td>
                    <td className="">{new Date(r.date_exam).toLocaleString()}</td>
                    <td className="">{r.nature_examen}</td>
                    <td className="">{r.quantitee}</td>
                    <td className="">{r.expression_des_resultats}</td>
                    <td className="">{r.conclusion}</td>
                    <td className="">{r.nom_et_prenom}</td>
                    <td><button className="btn btn-primary" onClick={() => handlclick_laboratoire(r)}>imprimer</button></td>
                </tr>
            )
        })

        props.row3.forEach((r, key) => {
          const recherche = r.nom.toLowerCase() + r.type_fiche_imagerie.toLowerCase() + r.conclusion.toLowerCase() + r.Autres_elements_de_conclusion.toLowerCase() + r.nom_et_prenom.toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (r.status_don === "0") {
            return
          }
          if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_examen).toLocaleDateString()) {
            return
          }
            Row3.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom}</td>
                    <td className="">{new Date(r.date_examen).toLocaleDateString()}</td>
                    <td className="">{r.type_fiche_imagerie}</td>
                    <td className="">{r.conclusion}</td>
                    <td className="">{r.Autres_elements_de_conclusion}</td>
                    <td className="">{r.nom_et_prenom}</td>
                    <td><button className="btn btn-primary" onClick={() => handlclick(r)}>imprimer</button></td>
                </tr>
            )
        })

        props.row4.forEach((r, key) => {
          const recherche = r.nom.toLowerCase() + r.intrant_retire.toLowerCase() + r.quantitee.toLowerCase() + r.prix.toLowerCase() + r.nom_et_prenom.toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (r.status_don === "0") {
            return
          }
          if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_achat).toLocaleDateString()) {
            return
          }
            Row4.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom}</td>
                    <td className="">{new Date(r.date_achat).toLocaleString()}</td>
                    <td className="">{r.intrant_retire}</td>
                    <td className="">{r.quantitee === "" ? 1 : r.quantitee}</td>
                    <td className="">{r.prix} FCFA</td>
                    <td className="">{r.nom_et_prenom}</td>
                </tr>
            )
        })
        // console.warn('rendue');
        props.row5.forEach((r, key) => {
          const recherche = r.nom.toLowerCase() + r.nature_examen.toLowerCase() + r.quantitee.toLowerCase() + r.prix.toLowerCase() + r.nom_et_prenom.toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (r.status_don === "0") {
            return
          }
          if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_exam).toLocaleDateString()) {
            return
          }
            Row5.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom}</td>
                    <td className="">{new Date(r.date_exam).toLocaleString()}</td>
                    <td className="">{r.nature_examen}</td>
                    <td className="">{r.prix} FCFA</td>
                    <td className="">{r.nom_et_prenom}</td>
                </tr>
            )
        })
        
        props.row6.forEach((r, key) => {
          const recherche = r.nom_et_prenom.toLowerCase() + r.montant_de_dette.toLowerCase() + r.montant_soldee.toLowerCase() + r.nom_personnel.toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (r.status_don === "0") {
            return
          }
          if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_de_dette).toLocaleDateString()) {
            return
          }
            Row6.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom_et_prenom}</td>
                    <td className="">{new Date(r.date_de_dette).toLocaleString()}</td>
                    <td className="">{r.montant_de_dette} FCFA</td>
                    <td className="">{r.montant_soldee} FCFA</td>
                    <td className="">{r.nom_personnel}</td>
                </tr>
            )
        })

        props.row7.forEach((r, key) => {
            r.type_fiche_imagerie = "Échographie 2e trimestre" // on definit le type d'imagerie
            const Autres_elements_de_conclusion = "" //omn dit que les autres elements de conclusion est egale a ""

            const recherche = r.nom.toLowerCase() + r.type_fiche_imagerie.toLowerCase() + r.conclusion.toLowerCase() + Autres_elements_de_conclusion.toLowerCase() + r.nom_et_prenom.toLowerCase()
            if (recherche.indexOf(props.search.toLowerCase()) === -1) {
              return
            }
            if (r.status_don === "0") {
                return
            }
            if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_exam).toLocaleDateString()) {
              return
            }
              Row7.push(
                  <tr align="center" key={key}>
                      <td className="">{r.nom}</td>
                      <td className="">{new Date(r.date_exam).toLocaleDateString()}</td>
                      <td className="">{r.type_fiche_imagerie}</td>
                      <td className="">{r.conclusion}</td>
                      <td className="">{Autres_elements_de_conclusion}</td>
                      <td className="">{r.nom_et_prenom}</td>
                      <td><button className="btn btn-primary" onClick={() => handlclick(r)}>imprimer</button></td>
                  </tr>
              )
        })
        // console.warn('rendue');
        props.row8.forEach((r, key) => {
            const recherche = r.type_de_consultation.toLowerCase() + r.resultat.toLowerCase() + r.nom_et_prenom.toLowerCase() + new Date(r.date_consultation).toLocaleString().toLocaleLowerCase()
            if (recherche.indexOf(props.search.toLowerCase()) === -1) {
              return
            }
            if (r.status_don === "0") {
              return
            }
            if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_consultation).toLocaleDateString()) {
                return
            }
            Row8.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom_et_prenom}</td>
                    <td className="">{new Date(r.date_consultation).toLocaleDateString()}</td>
                    <td className="">{r.type_de_consultation}</td>
                    <td className="">{r.resultat}</td>
                    <td className="">{r.nom_personnel}</td>
                    <td><button className="btn btn-primary" onClick={() => handlclick_consultation(r)}>imprimer</button></td>
                </tr>
            )
        })

        props.row9.forEach((r, key) => {
            const recherche = r.descision_ou_action.toLowerCase() + r.nom.toLowerCase() + new Date(r.date_exam).toLocaleString().toLocaleLowerCase() + r.nom.toLocaleLowerCase() + r.nom_et_prenom.toLocaleLowerCase()
            if (recherche.indexOf(props.search.toLowerCase()) === -1) {
              return
            }
            if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_exam).toLocaleDateString()) {
                return
            }
              Row9.push(
                  <tr align="center" key={key}>
                      <td className="">{r.nom}</td>
                      <td className="">{new Date(r.date_exam).toLocaleDateString()}</td>
                      <td className="">{r.descision_ou_action}</td>
                      <td className="">{r.nom_et_prenom}</td>
                      <td><button className="btn btn-primary" onClick={() => handle_click_screening(r)}>imprimer</button></td>
                  </tr>
              )
            
        })

        props.row10.forEach((r, key) => {

            const recherche = r.nature_du_document.toLowerCase() + r.contenue_du_document.toLowerCase()  + r.nom_et_prenom.toLowerCase() + new Date(r.date_administration).toLocaleString().toLocaleLowerCase()
            if (recherche.indexOf(props.search.toLowerCase()) === -1) {
              return
            }
            if (r.status_don === "0") {
                return
            }
            if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_administration).toLocaleDateString()) {
                return
              }
              Row10.push(
                  <tr align="center" key={key}>
                      <td className="">{r.nom_et_prenom}</td>
                      <td className="">{new Date(r.date_administration).toLocaleDateString()}</td>
                      <td className="">{r.nature_du_document}</td>
                      <td className="">{r.contenue_du_document}</td>
                      <td className="">{r.nom_personnel}</td>
                      <td><button className="btn btn-primary" onClick={() => handle_click_administration(r)}>imprimer</button></td>
                  </tr>
              )
            
        })

        props.row11.forEach((r, key) => {
            const recherche = r.nature_du_vaccin.toLowerCase() + r.observation.toLowerCase()  + r.nom_et_prenom.toLowerCase() + new Date(r.date_exam).toLocaleString().toLocaleLowerCase()
            if (recherche.indexOf(props.search.toLowerCase()) === -1) {
              return
            }
            if (r.status_don === "0") {
                return
            }
            if (new Date(DateSearch).toLocaleDateString() !== new Date(r.date_exam).toLocaleDateString()) {
                return
              }
              Row11.push(
                  <tr align="center" key={key}>
                      <td className="">{r.nom_et_prenom}</td>
                      <td className="">{new Date(r.date_exam).toLocaleDateString()}</td>
                      <td className="">{r.nature_du_vaccin}</td>
                      <td className="">{r.observation}</td>
                      <td className="">{r.nom_personnel}</td>
                      <td><button className="btn btn-primary" onClick={() => handle_click_vaccination(r)}>imprimer</button></td>
                  </tr>
              )
        })
        // console.warn('rendue');
        return (
            props.r1 ?
          <tbody>
            {Row1}
          </tbody>
           :
            props.r2 ?
          <tbody>
            {Row2}
          </tbody>
          :
            props.r3 ?
          <tbody>
            {Row3}
          </tbody>
          :
            props.r4 ?
          <tbody>
            {Row4}
          </tbody>
          :
            props.r5 ?
          <tbody>
            {Row5}
          </tbody>
          :
            props.r7 ?
          <tbody>
            {Row7}
          </tbody>
          : 
            props.r8 ?
          <tbody>
            {Row8}
          </tbody>
          :
            props.r9 ?
           <tbody>
            {Row9}
           </tbody>
          :
            props.r10 ?
           <tbody>
            {Row10}
           </tbody>
          :
            props.r11 ?
           <tbody>
            {Row11}
           </tbody>
          :
          <tbody>
            {Row6}
          </tbody>
        )
    }

    const setOnRequestConnexionClose = () => {
        setSearchValue(recherche.current.value)
        setDateSearch(daterecherche.current.value)
    }
    
    return (
        <div className="Requettes">
            <div style={{display : "flex", alignItems : "center", backgroundColor : "#7ba2db"}}>
                <GoBack handlclick={props.arriere}/>
                <h4>Requettres par jour</h4>
            </div>
            <center style={{backgroundColor : "#7ba2db", paddingTop : 25, paddingBottom : 30, paddingLeft : 120, paddingRight : 20}}>
                <table>
                    <tbody>
                        <tr>
                            <td className="col-md-2"><input type="date" className="form-control" ref={daterecherche}/></td>
                            <td className="col-md-3">Date du Jour de la Requette</td>
                            <td className="col-md-3"><input type="text" placeholder="Objet de la recherche" className="form-control" ref={recherche}/></td>
                            <td className="col-md-2"><button className="btn btn-primary" style={{background : "#054bb3", border : "2px solid blue"}} onClick={setOnRequestConnexionClose}>Rechercher</button></td>
                        </tr>
                    </tbody>
                </table>
            </center>
            <center>
                <Tabs>
                    <Tab title="Frequentations">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date Enregistrement</th>
                                        <th>Age</th>
                                        <th>Sexe</th>
                                        {/* <th>Raison de la venue</th> */}
                                        <th>Numero de telephone</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations} 
                                    row9 = {Screening_medicale}  
                                    row10 = {Administration}
                                    row11 = {Vaccination}
                                    r1={1}
                                    />
                                }
                            </table>
                        </div>
                    </Tab>
                    <Tab title="Consultations">
                    <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date Consultation</th>
                                        <th>Type Consultation</th>
                                        <th>Resultat</th>
                                        <th>Nom de l'operateur</th>
                                        <th>Imprimer</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}
                                    row9 = {Screening_medicale}
                                    row10 = {Administration} 
                                    row11 = {Vaccination} 
                                    r8={1}
                                    />
                                }
                            </table>
                        </div>
                    </Tab>
                    <Tab title="Laboratoire"> 
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de l'examen</th>
                                        <th>Nature de l'examen</th>
                                        <th>Quantitee</th>
                                        <th>Expression des Resultats</th>
                                        <th>Conclusion</th>
                                        <th>Nom de l'operateur</th>
                                        <th>Imprimer</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations} 
                                    row9 = {Screening_medicale} 
                                    row10 = {Administration}
                                    row11 = {Vaccination} 
                                    r2={1}
                                    />
                                }                           
                            </table>
                        </div>
                    </Tab>
                    <Tab title="Imagerie">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de l'examen</th>
                                        <th>Nature de l'examen</th>
                                        <th>Conclusion</th>
                                        <th>Autres elements de conclusion</th>
                                        <th>Nom de l'operateur</th>
                                        <th>Imprimer</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}
                                    row9 = {Screening_medicale}
                                    row10 = {Administration}
                                    row11 = {Vaccination}   
                                    r3={1}
                                    />
                                }                           
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale} 
                                    row10 = {Administration}
                                    row11 = {Vaccination}
                                    r7={1}
                                    />
                                }                             
                                </table>
                        </div>
                    </Tab>
                    <Tab title="Pharmacie">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de l'achat</th>
                                        <th>Intrant Retiree</th>
                                        <th>Quantitee</th>
                                        <th>Prix total</th>
                                        <th>Nom de l'operateur</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale} 
                                    row10 = {Administration}
                                    row11 = {Vaccination}
                                    r4={1}
                                    />
                                }
                                </table>
                        </div>
                    </Tab>
                    <Tab title="Soins">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date du soin</th>
                                        <th>Nature du soin</th>
                                        <th>Prix</th>
                                        <th>Nom de l'operateur</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale}
                                    row10 = {Administration}
                                    row11 = {Vaccination} 
                                    r5={1}
                                    />
                                }                                 
                            </table>
                        </div>
                    </Tab>
                    <Tab title="Dettes">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de dette</th>
                                        <th>Montant de dette</th>
                                        <th>Montant Soldee</th>
                                        <th>Nom de l'operateur</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale}
                                    row10 = {Administration}
                                    row11 = {Vaccination} 
                                    />
                                }
                                </table>
                        </div>
                    </Tab>
                    <Tab title = "Screening">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de d'examen</th>
                                        <th>Descisions / Actions</th>
                                        <th>Nom de l'operateur</th>
                                        <th>Imprimer</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale} 
                                    row10 = {Administration}
                                    row11 = {Vaccination}
                                    r9 = {1} 
                                    />
                                }
                            </table>
                        </div>
                    </Tab>
                    <Tab title = "Administartion">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de l'administration</th>
                                        <th>Nature du document</th>
                                        <th>contenue_du_document</th>
                                        <th>Nom du signataire</th>
                                        <th>Imprimer</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale} 
                                    row10 = {Administration}
                                    row11 = {Vaccination}
                                    r10 = {1} 
                                    />
                                }
                            </table>
                        </div>
                    </Tab>
                    <Tab title = "Vaccinatin">
                        <div style={{paddingLeft : 70, paddingRight : 60}}>
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du patient</th>
                                        <th>Date de Vaccination</th>
                                        <th>Nature du vaccin</th>
                                        <th>Observation</th>
                                        <th>Nom de l'operateur</th>
                                        <th>Imprimer</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClose 
                                    row1 = {Result} 
                                    search={SearchValue} 
                                    row2 = {Laboratoire} 
                                    row3 = {Imagerie} 
                                    row4 = {Pharmacie} 
                                    row5 = {Soin} 
                                    row6 = {Dette} 
                                    row7 = {Echo2eT} 
                                    row8 = {Consultations}  
                                    row9 = {Screening_medicale} 
                                    row10 = {Administration}
                                    row11 = {Vaccination}
                                    r11= {1} 
                                    />
                                }
                            </table>
                        </div>
                    </Tab>
                </Tabs>
            </center>
        </div>
    )
};
