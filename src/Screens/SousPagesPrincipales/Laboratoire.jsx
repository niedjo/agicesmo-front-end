import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import PrintFacture from "../impressionData/PrintFacture";
import Constant from "../../Constant";

export default function Laboratoire(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const natureExam = [
        { id: "", nature: "", prix: 0 },
        { id: "183", nature: "Ac Urique (Acide Urique)", prix: 3000 },
        { id: "229", nature: "Ac Urique (Acide Urique)_Partenaires", prix: 1500 },
        { id: "250", nature: "AcHcv", prix: 3500 },
        { id: "114", nature: "AcHcv_Partenaires", prix: 3000 },
        { id: "252", nature: "Ag HBS", prix: 3500 },
        { id: "115", nature: "AgHbs _Partenaires", prix: 3000 },
                            // { id: "249", nature: "Aiguille Vacutaner", prix: 0 },
        { id: "186", nature: "ALAT/SGPT", prix: 3000 },
// { id: "232", nature: "ALAT_Partenaires", prix: 1500 },
        { id: "253", nature: "Alb/Sucre Urinaire", prix: 500 },
        { id: "116", nature: "Alb/Sucre Urinaire_Partenaires", prix: 500 },
// { id: "106", nature: "AntiBiogrammes sur prélèvements", prix: 7000 },
// { id: "166", nature: "AntiBiogrammes sur prélèvements_Partenaires", prix: 6000 },
        { id: "185", nature: "ASAT/SGOT", prix: 3000 },
// { id: "231", nature: "ASAT_Partenaires", prix: 1500 },
        { id: "97", nature: "ASLO", prix: 2500 },
        { id: "157", nature: "ASLO_Partenaires", prix: 2000 },
                            // { id: "259", nature: "Bilan", prix: 0 },
// { id: "265", nature: "Bilan CESMO (GE + Widal + NFS + CRP)", prix: 11000 },
// { id: "267", nature: "Bilan Fausse Couche (Rech Mycoplasme + Chlamydiae IGG/IGM + Syphilis + ECBU + PCV/ATB + Groupage sanguin/Rhesus + Toxoplasmose + Rubeole)", prix: 55000 },
// { id: "266", nature: "Bilan Hépatites (Hepatite B + Hepatite C + ASAT/ALAT + Echographie Hépatique + Urre/Créat)", prix: 25000 },
// { id: "261", nature: "Bilan infectieux (Widal + H Pylori + Aslo + GE)", prix: 10000 },
// { id: "260", nature: "Bilan IST (PCV/PU + Syphilis + Chlamidiae IGG/IGM + VIH)", prix: 13500 },
// { id: "189", nature: "Bilan Lipidique de base", prix: 6000 },
// { id: "235", nature: "Bilan Lipidique de base_Partenaires", prix: 4000 },
// { id: "264", nature: "Bilan Prénatal usuel (Toxoplasmose + Rubeole + Hepatite B + Hepatite C + PCV + VIH + Bandellete Urinaire + Groupage sanguin/Rhesus + Syphilis + Chlamydiae IGG/IGM + Selles + GE)", prix: 40000 },
// { id: "263", nature: "Bilan Prenuptial (Hepatite B + Hepatite C + VIH + Groupage Sanguin Rhesus + Electrophorèse HB)", prix: 16000 },
// { id: "262", nature: "Bilan Senior (Glycemie + Acide Urique + Calcium + Magnesium Pression Arterielle)", prix: 10000 },
// { id: "98", nature: "BU (COMBI 10)", prix: 1000 },
// { id: "158", nature: "BU (COMBI 10)_Partenaires", prix: 1000 },
        { id: "176", nature: "Ca (Calcium)", prix: 3000 },
        { id: "222", nature: "Ca (Calcium)_Partenaires", prix: 2000 },
        { id: "193", nature: "Chol T (Cholesterol Total)", prix: 3000 },
        { id: "239", nature: "Chol T (Cholesterol Total)_Partenaires", prix: 1500 },
        { id: "180", nature: "Cl (Chlorure)", prix: 3000 },
        { id: "226", nature: "Cl (Chlorure)_Partenaires", prix: 2000 },
// { id: "108", nature: "COPROLOGIE", prix: 1000 },
// { id: "168", nature: "COPROLOGIE_Partenaires", prix: 1000 },
        { id: "182", nature: "Créat (Crétinine)", prix: 3000 },
        { id: "228", nature: "Créat (Crétinine)_Partenaires", prix: 1500 },
        { id: "251", nature: "CRP", prix: 3000 },
        { id: "117", nature: "CRP_Partenaires", prix: 2500 },
                        // { id: "118", nature: "Eau distillée_Partenaires", prix: 0 },
        { id: "56", nature: "ECBU", prix: 3500 },
        { id: "255", nature: "ECBU Antibiogramme", prix: 10000 },
        { id: "101", nature: "ECBU_ATB", prix: 10000 },
        { id: "161", nature: "ECBU_ATB_Partenaires", prix: 7000 },
        { id: "119", nature: "ECBU_Partenaires", prix: 3000 },
        { id: "109", nature: "Electrophorese", prix: 8000 },
        { id: "169", nature: "Electrophorese_Partenaires", prix: 6000 },
// { id: "113", nature: "Formule leucocytaire", prix: 1500 },
// { id: "173", nature: "Formule leucocytaire_Partenaires", prix: 1000 },
                    // { id: "57", nature: "Fuschine", prix: 0 },
                    // { id: "120", nature: "Fuschine_Partenaires", prix: 0 },
        { id: "58", nature: "GE", prix: 1000 },
        { id: "121", nature: "GE_Partenaires", prix: 500 },
        { id: "243", nature: "GE_Selles_Widal", prix: 4000 },
                    // { id: "59", nature: "Giemsa", prix: 0 },
                    // { id: "122", nature: "Giemsa_Partenaires", prix: 0 },
// { id: "184", nature: "Glucose Sanguin_LR", prix: 1000 },
// { id: "230", nature: "Glucose Sanguin_Partenaires", prix: 1000 },
        { id: "61", nature: "Glycemie Contrôle", prix: 2000 },
        { id: "124", nature: "Glycemie Contrôle_Partenaires", prix: 1000 },
        { id: "60", nature: "Glycemie Première", prix: 2000 },
        { id: "123", nature: "Glycemie Première_Partenaires", prix: 1000 },
        { id: "62", nature: "Groupe Sanguin Rhesus", prix: 2500 },
        { id: "125", nature: "Groupe Sanguin Rhesus_Partenaires", prix: 2000 },
        { id: "64", nature: "H Pylori Test", prix: 3000 },
        { id: "126", nature: "H Pylori Test_Partenaires", prix: 2500 },
        { id: "191", nature: "HDL", prix: 3000 },
        { id: "237", nature: "HDL_Partenaires", prix: 1500 },
// { id: "256", nature: "Hemoculture", prix: 12000 },
        { id: "244", nature: "Hormone FSH", prix: 15000 },
        { id: "50", nature: "Hormone FSH_partenaire", prix: 12500 },
        { id: "245", nature: "Hormone LH", prix: 15000 },
        { id: "51", nature: "Hormone LH_partenaire", prix: 12500 },
        { id: "248", nature: "Hormone PRL", prix: 15000 },
        { id: "55", nature: "Hormone PRL_partenaire", prix: 12500 },
        { id: "247", nature: "Hormone PSA", prix: 15000 },
        { id: "53", nature: "Hormone PSA_partenaire", prix: 12500 },
        { id: "246", nature: "Hormone TSH", prix: 10000 },
        { id: "52", nature: "Hormone TSH_partenaire", prix: 12500 },
// { id: "65", nature: "Huile à Imersion", prix: 0 },
                            // { id: "127", nature: "Huile à Imersion_Partenaires", prix: 0 },
// { id: "66", nature: "IgG Chlamydia", prix: 3500 },
// { id: "128", nature: "IgG Chlamydia_Partenaires", prix: 5000 },
// { id: "67", nature: "IgM Chlamydia", prix: 3500 },
// { id: "129", nature: "IgM Chlamydia_Partenaires", prix: 5000 },
// { id: "112", nature: "Inspection Vaginale", prix: 1500 },
// { id: "172", nature: "Inspection Vaginale_Partenaires", prix: 1000 },
        { id: "175", nature: "Ionogramme complet", prix: 12000 },
        { id: "221", nature: "Ionogramme complet_Partenaires", prix: 9000 },
        { id: "174", nature: "Ionogramme simple", prix: 8000 },
        { id: "220", nature: "Ionogramme simple_Partenaires", prix: 6000 },
        { id: "178", nature: "K (Potassium)", prix: 3000 },
        { id: "224", nature: "K (Potassium)_Partenaires", prix: 2000 },
                                // { id: "68", nature: "Lame Porte Objet", prix: 0 },
                                // { id: "130", nature: "Lame Porte Objet_Partenaires", prix: 0 },
                                // { id: "69", nature: "Lamelle Couvre Objet", prix: 0 },
                                // { id: "131", nature: "Lamelle Couvre Objet_Partenaires", prix: 0 },
                                // { id: "70", nature: "Lazarus", prix: 0 },
                                // { id: "132", nature: "Lazarus_Partenaires", prix: 0 },
// { id: "190", nature: "LDH", prix: 3000 },
// { id: "236", nature: "LDH_Partenaires", prix: 1500 },
        { id: "194", nature: "LDL", prix: 6000 },
        { id: "240", nature: "LDL_Partenaires", prix: 4000 },
// { id: "104", nature: "Liquide Epanchement", prix: 10000 },
// { id: "164", nature: "Liquide Epanchement_Partenaires", prix: 8500 },
                                // { id: "71", nature: "Lugol", prix: 0 },
                                // { id: "133", nature: "Lugol_Partenaires", prix: 0 },
        { id: "179", nature: "Mg (Magnesium)", prix: 3000 },
        { id: "225", nature: "Mg (Magnesium)_Partenaires", prix: 2000 },
// { id: "257", nature: "Mycoplasme", prix: 12000 },
        { id: "177", nature: "Na (Sodium)", prix: 3000 },
        { id: "223", nature: "Na (Sodium)_Partenaires", prix: 2000 },
        { id: "72", nature: "NFS (Numeration Formule Sanguine)", prix: 5000 },
        { id: "134", nature: "NFS (Numeration Formule Sanguine)_Partenaires", prix: 2500 },
        { id: "73", nature: "PCV avec Antibiogramme", prix: 11500 },
        { id: "135", nature: "PCV avec Antibiogramme_Partenaires", prix: 7000 },
        { id: "74", nature: "PCV Simple", prix: 3000 },
        { id: "136", nature: "PCV Simple_Partenaires", prix: 2500 },
        { id: "99", nature: "PCV_ATB", prix: 11500 },
        { id: "159", nature: "PCV_ATB_Partenaires", prix: 8000 },
                            // { id: "75", nature: "Pot à selles", prix: 0 },
                            // { id: "137", nature: "Pot à selles_Partenaires", prix: 0 },
                            // { id: "76", nature: "Pot à Urine", prix: 0 },
                            // { id: "138", nature: "Pot à Urine_Partenaires", prix: 0 },
        { id: "188", nature: "Profil Lipidique", prix: 11500 },
        { id: "234", nature: "Profil Lipidique_Partenaires", prix: 9500 },
// { id: "77", nature: "PU", prix: 2000 },
// { id: "100", nature: "PU_ATB", prix: 7000 },
// { id: "160", nature: "PU_ATB_Partenaires", prix: 8000 },
// { id: "139", nature: "PU_Partenaires", prix: 1500 },
        { id: "102", nature: "Pus_ATB", prix: 7000 },
        { id: "162", nature: "Pus_ATB_Partenaires", prix: 6000 },
        { id: "78", nature: "RMF", prix: 1000 },
        { id: "140", nature: "RMF_Partenaires", prix: 1000 },
// { id: "195", nature: "RPR/VDRL", prix: 1500 },
// { id: "241", nature: "RPR/VDRL_Partenaires", prix: 1000 },
// { id: "79", nature: "Saturation Oxygène Sanguin", prix: 1500 },
// { id: "141", nature: "Saturation Oxygène Sanguin_Partenaires", prix: 1000 },
        { id: "80", nature: "Selles KOAP", prix: 500 },
        { id: "142", nature: "Selles KOAP_Partenaires", prix: 500 },
        { id: "268", nature: "Serologie Chlamydiae (IgG/IgM)", prix: 4500 },
        { id: "110", nature: "Serologie Hepatite B", prix: 3500 },
        { id: "170", nature: "Serologie Hepatite B_Partenaires", prix: 3000 },
        { id: "111", nature: "Serologie Hepatite C", prix: 3500 },
        { id: "171", nature: "Serologie Hepatite C_Partenaires", prix: 3000 },
                    // { id: "82", nature: "Serologie LAV", prix: 0 },
                    // { id: "143", nature: "Serologie LAV_Partenaires", prix: 2000 },
        { id: "83", nature: "Serologie Rubeole", prix: 8000 },
        { id: "144", nature: "Serologie Rubeole_Partenaires", prix: 5000 },
        { id: "85", nature: "Serologie Toxo IgG et IGM", prix: 8000 },
        { id: "145", nature: "Serologie Toxo IgG et IGM_Partenaires", prix: 5000 },
        { id: "86", nature: "Serologie WIDAL", prix: 3000 },
        { id: "146", nature: "Serologie WIDAL_Partenaires", prix: 2500 },
        { id: "87", nature: "SKIN-SNIP", prix: 1000 },
        { id: "147", nature: "SKIN-SNIP_Partenaires", prix: 1000 },
        { id: "103", nature: "Spermoculture", prix: 15000 },
        { id: "163", nature: "Spermoculture_Partenaires", prix: 10000 },
// { id: "258", nature: "Spermogramme", prix: 14000 },
// { id: "165", nature: "Spermogramme_Partenaires", prix: 8500 },
// { id: "88", nature: "Syphilis", prix: 3500 },
// { id: "148", nature: "Syphilis_Partenaires", prix: 3000 },
// { id: "89", nature: "Taux HB", prix: 1000 },
// { id: "149", nature: "Taux HB_Partenaires", prix: 1000 },
// { id: "90", nature: "Test COVID SRAS", prix: 3000 },
// { id: "150", nature: "Test COVID SRAS_Partenaires", prix: 2500 },
        { id: "91", nature: "Test de Grossesse Sanguin", prix: 2000 },
        { id: "151", nature: "Test de Grossesse Sanguin_Partenaires", prix: 1500 },
        { id: "92", nature: "Test de Grossesse Urinaire", prix: 1000 },
        { id: "152", nature: "Test de Grossesse Urinaire_Partenaires", prix: 1000 },
// { id: "107", nature: "Test d'Emmel", prix: 1500 },
// { id: "167", nature: "Test d'Emmel_Partenaires", prix: 1000 },
// { id: "192", nature: "TG (Triglycerides)", prix: 3000 },
// { id: "238", nature: "TG (Triglycerides)_Partenaires", prix: 1500 },
// { id: "196", nature: "TPHA", prix: 2000 },
// { id: "242", nature: "TPHA_Partenaires", prix: 1000 },
        { id: "187", nature: "Transaminases", prix: 5000 },
        { id: "233", nature: "Transaminases_Partenaires", prix: 3000 },
                    // { id: "93", nature: "Tube EDTA", prix: 0 },
                    // { id: "153", nature: "Tube EDTA_Partenaires", prix: 0 },
                    // { id: "94", nature: "Tube Sec", prix: 0 },
                    // { id: "154", nature: "Tube Sec_Partenaires", prix: 0 },
        { id: "181", nature: "Urée (Urecemie)", prix: 3000 },
        { id: "227", nature: "Urée (Urecemie)_Partenaires", prix: 1500 },
// { id: "254", nature: "VDRL/TPHA", prix: 3500 },
                    // { id: "96", nature: "Violet Gentiane", prix: 0 },
                    // { id: "156", nature: "Violet Gentiane_Partenaires", prix: 0 },
        { id: "98", nature: "VIH", prix: 3500 },
        { id: "155", nature: "VIH_Partenaires", prix: 3000 },
        { id: "109", nature: "VS", prix: 2500 },
        { id: "159", nature: "VS_Partenaires", prix: 2000 },
                    // { id: "97", nature: "XN 10 Parametres", prix: 3000 },
// { id: "157", nature: "XN 10 Parametres_Partenaires", prix: 2000 }
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
    // const nom_operateur = useRef(null)
    // const DateExam = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    const prix = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()
    // const expression_des_resultats = useRef()
    // const conclusion = useRef()
    // const responsable = useRef()

    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)

    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {[{id : Date.now(), Exam : "Laboratoire", TabNatureExam : [natureExam[NatureExam.current.value].nature], tab_qte : [1], tab_price : [prix.current.value]}]} 
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
            const response = await fetch(
                `${Constant.ipUrl}setLaboratoire.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : "",
                        DateActuele : Date.now(),
                        NatureExam : natureExam[NatureExam.current.value].nature,
                        qte : (1).toString(),
                        prix : (prix.current.value).toString(),
                        reglement_client : (reglement_client.current.value).toString(),
                        reste_a_payer : (reste_a_payer.current.value).toString(),
                        expression_des_resultats : "",
                        conclusion : "",
                        responsable : "",
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
            alert("Laboratoire Enregistree avec succes !")
            Patients.map(p => p.code_patient === idPatient.current.value && setCurrentPatient(p))
            
            setPrixTotal(prix.current.value)
            setReglement_client(reglement_client.current.value)
            setReste_a_payer(reste_a_payer.current.value)
            
            setIsPrintFacture(true)
        }
    }
    return(
        <div className="stockjour" style={{height : "200vh"}}>
            <GoBack handlclick={props.arriere}/>
            <center>
                <h2 style={{color : "blue", textDecoration : "underline"}}>Laboratoire</h2>
                <form className="form-group form-group1 col-md-7">
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
                                <td>Nature de l'examen</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>

                                        {natureExam.map((n, k) => <option key={k} value={k}>{n.nature}</option>)}


                                        {/* <option value="GE">GE</option>
                                        <option value="ECBU">ECBU</option> */}
                                        {/* <option value="VAT">VAT</option>
                                        <option value="DTC">DTC</option>
                                        <option value="Polio">Polio</option> */}
                                        {/* a serieusement augmenter */}
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Quantite</td>
                                <td><input type="number" name="" className="form-control" ref={qte} onChange={handleChange}/></td>
                            </tr> */}
                            <tr>
                                <td>Prix Total</td>
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
                                <td>Expression des resultats</td>
                                <td><textarea name="" cols="30" rows="5" className="form-control" ref={expression_des_resultats}></textarea></td>
                            </tr>
                            <tr>
                                <td>Conclusion</td>
                                <td><textarea name="" cols="30" rows="2" className="form-control" ref={conclusion}></textarea></td>
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
                            </tr> */}
                            {/* <tr>
                                <td>nom de l'operateur</td>
                                <td>
                                    <select className="form-control" ref={nom_operateur}>
                                        <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option> */}
                                        {/* {Personnel.map(p =>
                                            <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                            )
                                        }    */}
                                    {/* </select>
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
 