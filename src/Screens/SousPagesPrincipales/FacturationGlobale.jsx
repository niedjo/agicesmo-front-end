import React, { useState, useRef, useEffect } from 'react'
import { GoBack } from '../../Components/GoBack'
import PrintFacture from '../impressionData/PrintFacture'
import Constant from '../../Constant'

const FacturationGlobale = (props) => {

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
    const [Stocks, setStocks] = useState([])
    const [CurrentProduits, setCurrentProduits] = useState([{id : "0", nature : "", prix : 0}])
    const [IsPrintFacture, setIsPrintFacture] = useState(false)

    const heure = new Date().getHours()

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
                // console.log("mounted 2")
                setPatients(body['patients'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
            
            fetch(
                `${Constant.ipUrl}getStock.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setStocks([])

                body['stock'].map( s => {
                    if (heure <= 18 && heure >= 6) {
                        if (parseInt(s.quantitee_stock_jour) > 0 || parseInt(s.quantitee_stock_jour2) > 0) {
                            setStocks(st => [...st, s])
                        }
                    }
                    else {
                        if (parseInt(s.quantitee_stock_garde) > 0 || parseInt(s.quantitee_stock_garde2) > 0) {
                            setStocks(st => [...st, s])
                        }
                    }
                })
                
                setCurrentProduits([{id : "0", nature : "", prix : 0}])

                Stocks.map((s, key) => setCurrentProduits(p => [...p, {
                    id: `${key}`, nature: s.nom, prix: s.prix
                }]))


                
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

        }

        return () => {
            FetchData()    
        };
    }, [heure, Stocks])

    const obj = [
        {
            id : 1, 
            nature : "Laboratoire", 
            tabType : [
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
              , 
            qte : 1
        },
        {
            id : 2, 
            nature : "Pharmacie", 
            tabType : CurrentProduits,
            qte : 1
        },
        {
            id : 3, 
            nature : "Imagerie", 
            tabType : [
                {id: "0", nature: "", prix: 0},
                {id: "1", nature: "Echographie Pelvienne", prix: 7000},
                    // {id: "2", nature: "Echographie Abdominale", prix: 7000},
                    // {id: "3", nature: "Echographie Abdomino-Pelvienne", prix: 12000},
                    // {id: "4", nature: "Echographie Testiculaire", prix: 10000},
                    // {id: "5", nature: "Echographie Renale", prix: 10000},
                {id: "6", nature: "Echographie Obstetricale", prix: 7000},
                // {id: "7", nature: "Echographie Intra-Vaginale", prix: 10000},
                // {id: "8", nature: "Echographie Transvaginale", prix: 10000},
                //     {id: "9", nature: "Echographie du foi", prix: 7000},
                // {id: "10", nature: "Echographie mammaire", prix: 10000}, // echo 2et
                {id: "11", nature: "Echographie Pelvienne_Partenaires", prix: 5000},
                {id: "12", nature: "Echographie Obstetricale_Partenaires", prix: 5000},
                //     {id: "13", nature: "Echographie Abdomino-Pelvienne_Partenaires", prix: 9000},
                // {id: "14", nature: "Echographie Intra-Vaginale_Partenaires_", prix: 8000},
                {id: "15", nature: "Echographie Obstetricale depistage premier trimestre", prix: 9000},
                {id: "16", nature: "Echographie Obstetricale depistage deuxiemme trimestre", prix: 10000},
                {id: "17", nature: "Echographie Obstetricale depistage deuxiemme et troisieme trimestre", prix: 11000},
                {id: "18", nature: "Echographie deuxiemme trimestre", prix: 9000},
              ], 
            qte : 1
        },
        {
            id : 4, 
            nature : "Consultation", 
            tabType : [
            {id : "0", nature : "", prix : 0},
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
            ], 
            qte : 1
        },
        {
            id : 5, 
            nature : "Soins", 
            tabType : [
                {id: "0", nature: "", prix: 0},
                {id: "29", nature: "Accouchement Complexe", prix: 20000},
                {id: "30", nature: "Accouchement Gemelaire", prix: 17000},
                {id: "31", nature: "Accouchement Siège", prix: 15000},
                {id: "32", nature: "Accouchement Simple", prix: 12000},
                {id: "33", nature: "Aspiration U", prix: 25000},
                {id: "34", nature: "Certificats", prix: 1000},
                {id: "35", nature: "Circoncision 1 an ou plus", prix: 7000},
                {id: "36", nature: "Circoncision moins de 1 an", prix: 5000},
                {id: "37", nature: "Circoncision plus de 05 ans", prix: 15000},
                {id: "38", nature: "Curetage", prix: 30000},
                {id: "39", nature: "Hospitalisation", prix: 2500},
                {id: "40", nature: "Incision Complexe", prix: 1500},
                {id: "41", nature: "Incision simple", prix: 700},
                {id: "42", nature: "Injection IM", prix: 500},
                {id: "43", nature: "Injection IV", prix: 500},
                {id: "44", nature: "Observation", prix: 1500},
                {id: "45", nature: "Pansement complexe", prix: 1000},
                {id: "46", nature: "Pansement humide", prix: 700},
                {id: "47", nature: "Pansement simple", prix: 500},
                {id: "48", nature: "Petite chirurgie Complexe", prix: 6000},
                {id: "49", nature: "Petite chirurgie Simple", prix: 3000},
                {id: "50", nature: "Ponction", prix: 2000},
                {id: "51", nature: "Pose perfusion", prix: 500},
                {id: "52", nature: "Prelevement echantillon", prix: 500},
                {id: "53", nature: "Prise Parametres", prix: 100},
                {id: "54", nature: "Surveillance perfusion", prix: 500},
                {id: "55", nature: "Suture Complexe", prix: 2500},
                {id: "56", nature: "Suture simple", prix: 1000},
                {id: "57", nature: "Accouchement Macrosomie", prix: 15000},
                {id: "58", nature: "Dossier Medical", prix: 500},
                {id: "59", nature: "Lavage Oreille", prix: 3150},
                {id: "60", nature: "Tocolyse", prix: 5000},
                {id: "61", nature: "Percer Oreilles", prix: 1000},
                {id: "62", nature: "Chirurgie complexe", prix: 10000},
                {id: "63", nature: "stimulation", prix: 5000},
                {id: "64", nature: "Induction", prix: 5000},
                {id: "65", nature: "Aspiration nouveau né", prix: 1500},
                {id: "66", nature: "Episiotomie", prix: 500},
                {id: "67", nature: "Injection Speciale", prix: 5000},
                {id: "68", nature: "Infiltrations", prix: 10000},
                {id: "69", nature: "Hospitalisations Accouchements", prix: 5000},
                {id: "70", nature: "Soins Noveaux-nés", prix: 2000},
                {id: "71", nature: "Revision Uterine", prix: 3000},
                {id: "72", nature: "Soins Echo_Guidé", prix: 10000},
                {id: "73", nature: "soins Planning Familial", prix: 1000},
                {id: "74", nature: "Percer Oreilles", prix: 1000},
                {id: "75", nature: "K.O", prix: 1500},
                {id: "76", nature: "A.M.I", prix: 300},
                {id: "77", nature: "S.I.F", prix: 800},
                {id: "78", nature: "S.F", prix: 1000},
                {id: "79", nature: "Maturation cervicale", prix: 1500},
                {id: "80", nature: "Preparation cervicale", prix: 1500},
                {id: "81", nature: "Med.1", prix: 2500, "Designation complete du soin": "Hemovigilance"},
                // {id: "82", nature: "Med.2", prix: 0, "Designation complete du soin": "Distribution des Medicaments"},
                {id: "83", nature: "Med.3", prix: 1000, "Designation complete du soin": "Catheter peripherique"},
                {id: "84", nature: "Med.4", prix: 2000, "Designation complete du soin": "Cathéter Central"},
                {id: "85", nature: "Med.5", prix: 2000, "Designation complete du soin": "Perfusions"},
                {id: "86", nature: "Med.6", prix: 500, "Designation complete du soin": "Injection Intramusculaire"},
                {id: "87", nature: "Med.7", prix: 500, "Designation complete du soin": "Injection Sous cutanée"},
                {id: "88", nature: "Med.8", prix: 1000, "Designation complete du soin": "Injection Intraveineuse"},
                {id: "89", nature: "Med.9", prix: 1500, "Designation complete du soin": "Injection Intradermique"},
                {id: "90", nature: "Med.10", prix: 500, "Designation complete du soin": "Entretien Infirmier"},
                // {id: "91", nature: "Med.11", prix: 0, "Designation complete du soin": "Passation de service"},
                {id: "92", nature: "Med.12", prix: 10000, "Designation complete du soin": "Gestion de cas de décès"},
                {id: "93", nature: "Para.1", prix: 100, "Designation complete du soin": "Prise de temperature corporelle"},
                {id: "94", nature: "Para.2", prix: 200, "Designation complete du soin": "Surveillance de la frequece cardiaque"},
                {id: "95", nature: "Para.3", prix: 300, "Designation complete du soin": "Surveillance de la pression Arterielle"},
                {id: "96", nature: "Para.4", prix: 100, "Designation complete du soin": "Surveillance de la Frequence respiratoire"},
                {id: "97", nature: "Para.5", prix: 100, "Designation complete du soin": "Surveillance du Poids"},
                {id: "98", nature: "Para.6", prix: 100, "Designation complete du soin": "Surveillance des Mensurations"},
                {id: "99", nature: "Réa.1", prix: 1000, "Designation complete du soin": "Surveillance de la saturation en Oxygène"},
                {id: "100", nature: "Réa.2", prix: 5000, "Designation complete du soin": "Aspiration Endotrachéale"},
                {id: "101", nature: "Réa.3", prix: 5000, "Designation complete du soin": "Massage Cardique externe chez l'aldulte"},
                {id: "102", nature: "Réa.4", prix: 5000, "Designation complete du soin": "Oxygéno-therapie avec lunettes"},
                // {id: "103", nature: "Réa.5", prix: 0, "Designation complete du soin": "Pose et surveillance d'un pousse seringue électrique"},
                {id: "104", nature: "Réa.6", prix: 3000, "Designation complete du soin": "Reanimation Cardio-respiratoire du Nouveau-né"},
                {id: "105", nature: "Uro.1", prix: 2000, "Designation complete du soin": "Surveillance de la Diurèse"},
                {id: "106", nature: "Uro.2", prix: 2500, "Designation complete du soin": "Pose d'une Sonde Urinaire par voie trans-uretrale"},
                {id: "107", nature: "Uro.3", prix: 1000, "Designation complete du soin": "Pose d'un étui penien chez l'aldulte (peniflow)"},
                {id: "108", nature: "Uro.4", prix: 1500, "Designation complete du soin": "Retrait d'une sonde urinaire"},
                {id: "109", nature: "Urg.1", prix: 1000, "Designation complete du soin": "Determination du score de Glasgow"},
                {id: "110", nature: "Chir.1", prix: 500, "Designation complete du soin": "Réalisation- Surveillance- renouvellement d'un pansement steril sur plaie aigue"},
                {id: "111", nature: "Chir.2", prix: 1000, "Designation complete du soin": "Abbaltion de fils"},
                // {id: "112", nature: "Chir.3", prix: 0, "Designation complete du soin": "Lavage chirurgical des mains"},
                {id: "113", nature: "Chir.4", prix: 500, "Designation complete du soin": "Premier lever"},
                {id: "114", nature: "Chir.5", prix: 1000, "Designation complete du soin": "Pose de Bandage"},
                {id: "115", nature: "Chir.6", prix: 500, "Designation complete du soin": "Pose de Bandage de contention"},
                {id: "116", nature: "Chir.7", prix: 2000, "Designation complete du soin": "Surveillance de personne en Postopératoire"},
                {id: "117", nature: "Hyg.1", prix: 200, "Designation complete du soin": "lavage simple des mains"},
                {id: "118", nature: "Hyg.2", prix: 300, "Designation complete du soin": "Lavage hygiénique ou antiseptique des mains"},
                {id: "119", nature: "Hyg.3", prix: 100, "Designation complete du soin": "Friction Hydro-alcoolique des mains"},
                {id: "120", nature: "Hyg.4", prix: 1000, "Designation complete du soin": "Refection du lit"},
                {id: "121", nature: "Hyg.5", prix: 100, "Designation complete du soin": "Port et retrait du masque facial"},
                {id: "122", nature: "Lab.1", prix: 300, "Designation complete du soin": "Prelèvement veineux"},
                {id: "123", nature: "Lab.2", prix: 500, "Designation complete du soin": "Recueil d'urine"},
                {id: "124", nature: "Nurs.1", prix: 500, "Designation complete du soin": "Installation du patient"},
                {id: "125", nature: "Nurs.2", prix: 1000, "Designation complete du soin": "Aide à la Marche"},
                {id: "126", nature: "Nurs.3", prix: 500, "Designation complete du soin": "Prevention des chuttes"},
                {id: "127", nature: "Nurs.4", prix: 1000, "Designation complete du soin": "Soins d'escarres"},
                {id: "128", nature: "Nurs.5", prix: 2500, "Designation complete du soin": "Gavage"},
                {id: "129", nature: "Nurs.6", prix: 1000, "Designation complete du soin": "Bain de Bouche chez personne alitée"},
                {id: "130", nature: "Nurs.7", prix: 2500, "Designation complete du soin": "Toilette chez patient alité"},
                // {id: "131", nature: "Nurs.8", prix: 0, "Designation complete du soin": "Apport Hydrique journalier chez personne dépendante absolue"},
                {id: "132", nature: "Visc.1", prix: 5000, "Designation complete du soin": "Lavement évacuateur"},
                {id: "133", nature: "Visc.2", prix: 5000, "Designation complete du soin": "Soin d'une stomie digestive laterale"},
                {id: "134", nature: "Gast.1", prix: 2500, "Designation complete du soin": "Pose d'une sonde naso-gastrique"},
                {id: "135", nature: "ORL.1", prix: 4000, "Designation complete du soin": "Lavage d'oreille"},
                {id: "136", nature: "ORL.2", prix: 2500, "Designation complete du soin": "Lavage de Sinus"},
                {id: "137", nature: "Oph.1", prix: 500, "Designation complete du soin": "Instillation de Collyre"},
                {id: "138", nature: "Oph.2", prix: 1000, "Designation complete du soin": "Lavage Occulaire"},
                {id: "139", nature: "Diab.1", prix: 500, "Designation complete du soin": "Mesure de la Glycemie Capillaire"},
                {id: "140", nature: "Diab.2", prix: 500, "Designation complete du soin": "Administration de l'insuline"},
                {id: "141", nature: "Diab.3", prix: 2500, "Designation complete du soin": "Gestion de l'hypoglycemie"},
                {id: "142", nature: "Obst.1", prix: 1500, "Designation complete du soin": "Surveillance menselle de la grosssesse"},
                {id: "143", nature: "Obst.2", prix: 10000, "Designation complete du soin": "Préparation Cervicale de 37 semaines"},
                {id: "144", nature: "Obst.3", prix: 15000, "Designation complete du soin": "pratique de l'accouchement simple"},
                {id: "145", nature: "Obst.4", prix: 20000, "Designation complete du soin": "pratique de l'accouchement complexe"},
                {id: "146", nature: "Obst.5", prix: 35000, "Designation complete du soin": "Pratique de l'accouchement par ventouse"},
                {id: "147", nature: "Obst.6", prix: 19400, "Designation complete du soin": "Kit d'accouchement"},
                {id: "148", nature: "Obst.7", prix: 25000, "Designation complete du soin": "Pratique de l'accouchement Gemellaire"},
                {id: "149", nature: "Obst.8", prix: 2000, "Designation complete du soin": "Revision Uterine Manuelle"},
                {id: "150", nature: "Obst.9", prix: 25000, "Designation complete du soin": "Revision Uterine Instrumentale"},
                {id: "151", nature: "Obst.9", prix: 30000, "Designation complete du soin": "Œuf Claire"},
                {id: "152", nature: "Obst.10", prix: 50000, "Designation complete du soin": "Grossesse Molaire"},
                {id: "153", nature: "Dplacement", prix: 2000, "Designation complete du soin": ""},
              ], 
            qte : 1
        },
        {
            id : 6, 
            nature : "Vaccination", 
            tabType : [
                {id: "0", nature: "", prix: 0},
                {id: "1", nature: "BCG", prix: 100},
                {id: "2", nature: "Rougeole", prix: 100},
                {id: "3", nature: "VAT", prix: 100},
                {id: "4", nature: "DTC", prix: 100},
                {id: "5", nature: "Polio", prix: 100},
              ], 
            qte : 1
        },
        {
            id : 7, 
            nature : "Administration", 
            tabType : [
                {id: "0", nature: "", prix: 0},
                {id: "1", nature: "Declaration de naissance", prix: 4500},
                {id: "2", nature: "Certification Medicale", prix: 3000},
                {id: "3", nature: "Certification de Grossesse", prix: 12500},
              ], 
            qte : 1
        },
        {
            id : 8, 
            nature : "Screening Medicale", 
            tabType : [
                {id: "0", nature: "", prix: 0},
                {id: "1", nature: "Screening Medicale", prix: 16750},
              ], 
            qte : 1
        },
    ]

    // le format c'est {Exam, TabNatureExam, Prix}

    const [Tab_obj_valideted, setTab_obj_valideted] = useState([])
    const [TabType, setTabType] = useState(obj[0].tabType)
    const [TabTypeSelected, setTabTypeSelected] = useState([])
    const [CurrentPrice, setCurrentPrice] = useState(0)
    const [TabCurrentQte, setTabCurrentQte] = useState([])
    const [CurrentQte, setCurrentQte] = useState()
    const [TabCurrentPrice, setTabCurrentPrice] = useState([])
    const [CurrentType, setCurrentType] = useState(obj[0].nature)
    const [CurrentPatient, setCurrentPatient] = useState()
    
    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)

    const idPatient = useRef()
    const nature_key = useRef()
    const nature_selected = useRef()
    const quantitee = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()

    
    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {Tab_obj_valideted} 
            patient = {CurrentPatient}
            prix_total = {PrixTotal}
            reglement_client = {Reglement_client}
            reste_a_payer = {Reste_a_payer}
            stock = {Stocks}
        />
    }


    function somme (tab) {
        let s = 0
        for (let i = 0; i < tab.length; i++) {
            s += parseInt(tab[i])
        }

        return s
    }

    // ATTENTION ! c'est uniquement pour les tableau de nombre de meme tailles !!!
    function somme_2_tab (tab1, tab2) {
        let s = 0
        for (let i = 0; i < tab1.length; i++) {
            s += parseInt(tab1[i]) * parseInt(tab2[i])
        }

        return s
    }

    const handleChange_selected = () => {
        for (let i = 0; i < TabTypeSelected.length; i++) {
            if (TabType[nature_selected.current.value].nature === TabTypeSelected[i]) {
                alert(`${TabType[nature_selected.current.value].nature} deja selectionnee`)
                return
            }
        }

        if (obj[nature_key.current.value].nature === "Pharmacie") {
            setTabTypeSelected(t => [...t, nature_selected.current.value])
            setCurrentPrice(TabType[nature_selected.current.value].prix)
            setTabCurrentPrice(t => [...t, TabType[nature_selected.current.value].prix])
            setTabCurrentQte(qte => [...qte, CurrentQte])
            // setPrixTotal(p => p + parseInt(CurrentQte) * parseInt(TabType[nature_selected.current.value].prix))
            
            setCurrentQte(0)
            quantitee.current.value = 0
        }
        else {
            setTabTypeSelected(t => [...t, TabType[nature_selected.current.value].nature])
            setCurrentPrice(TabType[nature_selected.current.value].prix)
            setTabCurrentPrice(t => [...t, TabType[nature_selected.current.value].prix])
            // setPrixTotal(p => p + parseInt(TabType[nature_selected.current.value].prix))
        }


    }

    const handleChange_Exam = () => {
        setTabTypeSelected([])
        setCurrentPrice(0)
        setTabType(obj[nature_key.current.value].tabType);
        setCurrentType(obj[nature_key.current.value].nature)
        setTabCurrentPrice([])
        setCurrentQte(0)
        setTabCurrentQte([])
    }

    const handlechange_qte = () => {
        setCurrentQte(quantitee.current.value)
    }

    const handleValider = (e) => {
        e.preventDefault()

        setTabTypeSelected([])
        setCurrentPrice(0)

        const id = new Date().getTime()
        for (let i = 0; i < Tab_obj_valideted.length; i++) {
            if (Tab_obj_valideted[i].Exam === CurrentType) {
                alert(`${Tab_obj_valideted[i].Exam} deja Facturee`)
                console.log(Tab_obj_valideted)
                return
            }
        }

        
        const newValideted = Tab_obj_valideted.slice()

        // attention ! on peut aussi unshift

        if (CurrentType === "Pharmacie") {
            setTabCurrentQte(qte => [...qte, CurrentQte])
            newValideted.push({id : id, Exam : CurrentType, TabNatureExam : TabTypeSelected, tab_qte : TabCurrentQte, tab_price : TabCurrentPrice})
            quantitee.current.value = 0
        }
        else {
            newValideted.push({id : id, Exam : CurrentType, TabNatureExam : TabTypeSelected, tab_price : TabCurrentPrice})
        }
        setTab_obj_valideted(newValideted)

        setTabCurrentQte([])
        setCurrentQte(0)
        setTabCurrentPrice([])
        nature_selected.current.value = 0
        

        console.log(Tab_obj_valideted)
    } 

    function countPrixTotal () {
        //  on le reinitialise a 0
        setPrixTotal(0)

        // et on calcule le prix totale
        Tab_obj_valideted.map(t => 
            t.tab_qte 
            ? setPrixTotal(p => p + somme_2_tab(t.tab_qte, t.tab_price))
            : setPrixTotal(p => p + somme(t.tab_price))
        )
    }

    const handleResteAPayer = () => {
        reste_a_payer.current.value = PrixTotal - parseInt(reglement_client.current.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let Tableau_exam_to_send = []
        if (reglement_client.current.value === "") {
            alert("veillez remplir tous les champs s'il vous plait")
            return
        }

        for (let i = 0; i < Tab_obj_valideted.length; i++) {
            let element = Tab_obj_valideted[i]
            switch (element.Exam) {
                case "Pharmacie":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        let miniment = Tableau_exam_to_send[j] - 1;

                        if (
                            parseInt(Stocks[miniment].quantitee_stock_jour) < parseInt(element.tab_qte[j]) 
                            && parseInt(Stocks[miniment].quantitee_stock_garde) < parseInt(element.tab_qte[j]) 
                            && parseInt(Stocks[miniment].quantitee_stock_jour2) < parseInt(element.tab_qte[j]) 
                            && parseInt(Stocks[miniment].quantitee_stock_garde2) < parseInt(element.tab_qte[j])
                        ) 
                        {
                            alert(`impossible d'effectuer l'achat du produit ${Stocks[miniment].nom} : quantitee en stock trop petite `)
                            break    
                        }

                        // on verifie si l'achat est possible et on reduit la quantitee des produits en stock
                        
                        let rubrique = 0
                        let qtestockJourUpdated = parseInt(Stocks[miniment].quantitee_stock_jour) - parseInt(element.tab_qte[j])
                        let qtestockgardeUpdated =  parseInt(Stocks[miniment].quantitee_stock_garde) - parseInt(element.tab_qte[j])
                        if (heure <= 18 && heure >= 6) {
                            
                            // on fait la verification de la quantitee en stock avant de faire n'importe quoi
                            
                            if (parseInt(Stocks[miniment].quantitee_stock_jour) > parseInt(element.tab_qte[j])) {
                                rubrique = 1
                            }
                            else if (parseInt(Stocks[miniment].quantitee_stock_jour2) > parseInt(element.tab_qte[j])) {
                                rubrique = 2
                            }
                            else {
                                alert(`impossible d'effectuer l'achat du produit ${Stocks[miniment].nom} : quantitee en stock trop petite `)
                                break   
                            }

                            try {
                                const response2 = await fetch(
                                    `${Constant.ipUrl}setStock.php`,
                                    {
                                        method : "POST",
                                        headers : {
                                            'Content-Type' : 'application/json'
                                        },
                                        body : JSON.stringify({
                                            type_stock : "Stock jour",
                                            ID : Stocks[miniment].id_stock,
                                            qte : qtestockJourUpdated,
                                            rubrique : rubrique,
                                            date_ravitaillemrnt : Stocks[miniment].date_entree_stock_jour,
                                            idSaver : props.idSaver,
                                            qteUpdated : Stocks[miniment].quantitee_stock_globale
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
                        }
                        else {
                            
                            // on fait la verification de la quantitee en stock avant de faire n'importe quoi
                            
                            if (parseInt(Stocks[miniment].quantitee_stock_garde) > parseInt(element.tab_qte[j])) {
                                rubrique = 1
                            }
                            else if (parseInt(Stocks[miniment].quantitee_stock_garde2) > parseInt(element.tab_qte[j])) {
                                rubrique = 2
                            }
                            else {
                                alert(`impossible d'effectuer l'achat du produit ${Stocks[miniment].nom} : quantitee en stock trop petite `)
                                break   
                            }

                            try {
                                const response2 = await fetch(
                                    `${Constant.ipUrl}setStock.php`,
                                    {
                                        method : "POST",
                                        headers : {
                                            'Content-Type' : 'application/json'
                                        },
                                        body : JSON.stringify({
                                            type_stock : "Stock garde",
                                            ID : Stocks[miniment].id_stock,
                                            rubrique : rubrique,
                                            qte : qtestockgardeUpdated,
                                            date_ravitaillemrnt : Stocks[miniment].date_entree_stock_garde,
                                            idSaver : props.idSaver,
                                            qteUpdated : Stocks[miniment].quantitee_stock_globale
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
                        }

                        // enfin, on fait la contabilitee des produits en stocks si possible 

                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setAchat.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : "",
                                        DateActuele : "",
                                        nomStock : Stocks[miniment].nom,
                                        qte : element.tab_qte[j].toString(),
                                        prix : (parseInt(element.tab_qte[j]) * parseInt(element.tab_price[j])).toString(),
                                        reglement_client : (parseInt(element.tab_qte[j]) * parseInt(element.tab_price[j])).toString(),
                                        reste_a_payer : "0",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                              alert("probleme d'enregistrement, veillez reessayer")
                              throw new Error("il y a un petit problemem")  
                            }
                        } catch (error) {
                            console.log(error)
                        }                        

                    }
                    break;
                
                case "Laboratoire":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];

                        try {
                            let response = await fetch(
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
                                        NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
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
                                throw new Error("il y a un petit problemem")  
                            }
                        } catch (error) {
                            console.log(error)
                        }  
                    }
                    break

                case "Imagerie":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];


                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setImagerie.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : Date.now(),
                                        NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
                                        expression_des_resultats : "",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                                alert("probleme d'enregistrement, veillez reessayer")
                                throw new Error("il y a un petit problemem")  
                              }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    break

                case "Consultation":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];

                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setConsultation.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : "",
                                        DateActuele : Date.now(),
                                        NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
                                        resultat : "",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                                alert("probleme d'enregistrement, veillez reessayer")
                                throw new Error("il y a un petit problemem")  
                              }
                        } catch (error) {
                            console.log(error);
                        }
                        
                    }
                    break

                case "Soins":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];
                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setSoin.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : "",
                                        DateActuele : Date.now(),
                                        NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
                                        responsable : "",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                                alert("probleme d'enregistrement, veillez reessayer")
                                throw new Error("il y a un petit problemem")  
                              }
                        } catch (error) {
                            console.log(error);
                        }
                        
                    }
                    break
                
                case "Vaccination":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];

                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setVaccination.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : Date.now(),
                                        dateRDV : "",
                                        NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
                                        observation : "",
                                        responsable : "",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                                alert("probleme d'enregistrement, veillez reessayer")
                                throw new Error("il y a un petit problemem")  
                              }
                        } catch (error) {
                            console.log(error);
                        }
                        
                    }
                    break
                
                case "Administration":
                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];

                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setAdministration.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : "",
                                        DateActuele : Date.now(),
                                        NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
                                        contenue : "",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                                alert("probleme d'enregistrement, veillez reessayer")
                                throw new Error("il y a un petit problemem")  
                              }
                        } catch (error) {
                            console.log(error);
                        }
                        
                    }
                    break

                case "Screening Medicale":

                    Tableau_exam_to_send = element.TabNatureExam
                    for (let j = 0; j < Tableau_exam_to_send.length; j++) {
                        
                        let miniment = Tableau_exam_to_send[j];


                        try {
                            let response = await fetch(
                                `${Constant.ipUrl}setScreening_medicale_conta.php`,
                                {
                                    method : "POST",
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    },
                                    body : JSON.stringify({
                                        idPatient : parseInt(idPatient.current.value),
                                        DateExam : "",
                                        DateActuele : Date.now(),
                                        // NatureExam : miniment.toString(),
                                        qte : (1).toString(),
                                        prix : (element.tab_price[j]).toString(),
                                        reglement_client : (element.tab_price[j]).toString(),
                                        reste_a_payer : (0).toString(),
                                        contenue : "",
                                        idSaver : parseInt(props.Saver[1]),
                                        // nom_operateur : nom_operateur.current.value,
                                        // returnSecureToken : true
                                    })
                                }
                            )
                            if (!response.ok) {
                                alert("probleme d'enregistrement, veillez reessayer")
                                throw new Error("il y a un petit problemem")  
                            }
                        } catch (error) {
                            console.log(error);
                        }
                        
                    }
                    break

                default:
                    break;
            }
        }

        if (parseInt(reste_a_payer.current.value) !== 0) {
            try {
                let re = await fetch(
                    `${Constant.ipUrl}setDette.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            idPatient : parseInt(idPatient.current.value),
                            reglement_client : reglement_client.current.value,
                            reste_a_payer : reste_a_payer.current.value,
                            idSaver : parseInt(props.Saver[1]),
                            // returnSecureToken : true
                        })
                    }
                )
                if (!re.ok) {
                    alert("probleme d'enregistrement, veillez reessayer")
                    throw new Error("il y a un petit problemem")  
                  }
            } catch (error) {
                console.log(error);
            }
        }


        Patients.map(p => p.code_patient === idPatient.current.value && setCurrentPatient(p))

        // console.log(Tab_obj_valideted)

        // on envoi les donnees
        setReglement_client(reglement_client.current.value)
        setReste_a_payer(reste_a_payer.current.value)
        setIsPrintFacture(true)
    }


  return (
    <div>
        <GoBack handlclick={props.arriere}/>
        <center>
            <form className='form-group form-group1 col-md-10' onMouseOver={countPrixTotal}>
                <table>
                    <tr>
                        <th align="center">Nature </th>
                        <th align="center">Libelle</th>
                        <th align="center">Quantitee</th>
                        <th align="center">Prix unitaire</th>
                    </tr>
                    <tr>
                        <td colSpan={6}><hr /></td>
                    </tr>
                    <tr>
                        <td>Identifiant du patient</td>
                        <td>
                            <select className="form-control" ref={idPatient}>
                                {Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6}><hr /></td>
                    </tr>
                    {
                        Tab_obj_valideted.map((t, key) => {
                            return (
                                <tr key={key}>
                                    <td><b>{t.Exam}</b></td>
                                    <td style={{width : "500px"}}>
                                        {/* on ne travaille que sur les indices des stocks (- 1) et non sur les stocks */}
                                        {
                                            t.Exam === "Pharmacie"
                                            ? t.TabNatureExam.map(t => <div><b>{Stocks[t - 1].nom}</b></div>)
                                            : t.TabNatureExam.map(t => <div><b>{t}</b></div>)
                                        }
                                    </td>
                                    {t.Exam === "Pharmacie" ? <td>{t.tab_qte.map(t => <div><b>{t}</b></div>)}</td> : <td>{t.TabNatureExam.map(t => <div><b>1</b></div>)}</td>}
                                    <td>{t.tab_price.map(t => <div><b>{t} FCFA</b></div>)} </td>
                                    <td><button className="btn btn-danger" 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            const newValideted = Tab_obj_valideted.slice()
                                            const index = newValideted.findIndex((n) => n.id === t.id)
                                            newValideted.splice(index, 1)
                                            setTab_obj_valideted(newValideted)
                                        }}>X</button></td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colSpan={5}><hr /></td>
                    </tr>
                    <tr>
                        <td>{CurrentType}</td>
                        <td>
                            {/* on ne travaille que sur les indices des stocks (- 1) et non sur les stocks */}
                            {   CurrentType === "Pharmacie" 
                                ? TabTypeSelected.map(t => <div>{Stocks[t - 1].nom}</div>)
                                : TabTypeSelected.map(t => <div>{t}</div>)
                            }
                        </td>
                        {CurrentType === "Pharmacie" ? <td>{TabCurrentQte.map(t => <div><b>{t}</b></div>)} <div>{CurrentQte}</div></td> : <td>{TabTypeSelected.map(t => <div>1</div>)}</td> }
                        <td>{TabCurrentPrice.map(t => <div>{t} FCFA</div>)}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}><hr /></td>
                    </tr>
                    <tr>
                        <td>
                            <select className='form-control' ref={nature_key} onChange={handleChange_Exam}>
                                {obj.map((o, key) => {
                                    return <option key={key} value={key}>{o.nature}</option>
                                })}
                            </select>
                        </td>
                        <td style={{width : "500px"}}>
                            <select className='form-control' ref={nature_selected} onChange={handleChange_selected}>
                                {TabType.map((t, key) => {
                                    return <option key={key} value={key} style={{width : "500px"}}>{t.nature}</option>
                                })}
                            </select>
                        </td>
                        {CurrentType === "Pharmacie" && <td><input type="number" className='form-control' ref={quantitee} onChange={handlechange_qte}/></td> }
                        <td><input type="text" className='form-control' value={CurrentPrice}/></td>
                        <td><button className="btn btn-primary" onClick={handleValider}>Valider</button></td>
                    </tr>
                    <tr>
                        <td>Montant Total</td>
                        <td><input type="number" className='form-control' value={PrixTotal} readOnly/></td>
                    </tr>
                    <tr>
                        <td>Reglememt du client</td>
                        <td><input type="number" className='form-control' ref={reglement_client} onChange={handleResteAPayer}/></td>
                    </tr>
                    <tr>
                        <td>Reste a payer</td>
                        <td><input type="number" className='form-control' ref={reste_a_payer} readOnly/></td>
                    </tr>
                    <tr>
                        <td colSpan={5} align='center'><button className="btn btn-primary" onClick={handleSubmit}>Imprimer et soumettre</button></td>
                    </tr>
                </table>
            </form>
        </center>
    </div>
  )
}

export default FacturationGlobale