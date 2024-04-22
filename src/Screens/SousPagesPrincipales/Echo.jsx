import React, { useRef, useState, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import { Tab, Tabs } from "../../Components/Tabs";
import Constant from "../../Constant";
// import './stock.css'

export function Echo(props) {
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
    const [Imagerie, setImagerie] = useState([])
    const [Personnel, setPersonnel] = useState([])
    const [CurrentPatients, setCurrentPatients] = useState("1")
    const [CurrentExam, setCurrentExam] = useState("")
    const [True_Date, setTrue_Date] = useState("")

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
                setImagerie([])
                setImagerie(body['informations8'])
                
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

    const autres_Trouvailles = useRef(null)
    const conclusion = useRef(null)
    const autresElements_de_conclusion = useRef(null)
    const nom_operateur = useRef(null)
    const autres_Trouvailles1 = useRef(null)
    const conclusion1 = useRef(null)
    const autresElements_de_conclusion1 = useRef(null)
    const nom_operateur1 = useRef(null)
    const autres_Trouvailles2 = useRef(null)
    const conclusion2 = useRef(null)
    const autresElements_de_conclusion2 = useRef(null)
    const nom_operateur2 = useRef(null)
    const autres_Trouvailles3 = useRef(null)
    const conclusion3 = useRef(null)
    const autresElements_de_conclusion3 = useRef(null)
    const nom_operateur3 = useRef(null)
    

    const Nature_exam = useRef(null)
    const [Isecho_pelv, setIsecho_pelv] = useState(false)
    const [IsEcho_Obstetricale_dt1, setIsEcho_Obstetricale_dt1] = useState(false)
    const [IsEcho_Obstetricale_dt2, setIsEcho_Obstetricale_dt2] = useState(false)
    const [IsEcho_Obstetricale_dt12, setIsEcho_Obstetricale_dt12] = useState(false)

    // les references

    const idPatient = useRef(null)
    const prescripteur = useRef(null)
    const dateExamen = useRef(null)
    const dateExamen1 = useRef(null)
    const dateExamen4 = useRef(null)
    const indicateur = useRef(null)
    const indicateur4 = useRef(null)
    const typeMachine = useRef(null)
    const conditionExam = useRef(null)
    const typeSonde = useRef(null)
    const DDR = useRef(null)
    
    const uterusOrientation = useRef(null)
    const uterusOrientation1 = useRef(null)
    const taille = useRef(null)
    const taille1 = useRef(null)
    const myome = useRef(null)
    const simyome_nombre = useRef(null)
    const localisation_et_taille_myome = useRef(null)
    const endometre_echogenecite = useRef(null)
    const endometre_epaisseur = useRef(null)
    const ovaire_gauche_structure = useRef(null)
    const ovaire_gauche_taille = useRef(null)
    const ovaire_gauche_nbr_follecues_entraux = useRef(null)
    const ovaire_droite_structure = useRef(null)
    const ovaire_droite_taille = useRef(null)
    const ovaire_droite_nbr_follecules_entraux = useRef(null)

    const nombre_embryons = useRef(null)
    const mobilitee_spontanee = useRef(null)
    const mobilitee_spontanee1 = useRef(null)
    const mobilitee_spontanee2 = useRef(null)
    const activite_cardiaque = useRef(null)
    const activite_cardiaque1 = useRef(null)
    const activite_cardiaque2 = useRef(null)
    const activite_cardiaque3 = useRef(null)
    const frequence_cardiaque = useRef(null)
    const frequence_cardiaque1 = useRef(null)
    const frequence_cardiaque2 = useRef(null)
    const longueur_cranio_codale = useRef(null)
    const sac_gestationnelle = useRef(null)
    const epaisseur_de_la_clarte_nucale = useRef(null)
    const age_gestationnelle = useRef(null)
    const age_gestationnelle1 = useRef(null)
    const age_gestationnelle2 = useRef(null)
    const date_probable_daccouchement = useRef(null)
    const date_probable_daccouchement1 = useRef(null)
    const date_probable_daccouchement2 = useRef(null)

    const nombreFoetus = useRef(null)
    const diametreBiparietale = useRef(null)
    const diametreBiparietale1 = useRef(null)
    const contour_de_la_boite_cranienne = useRef(null)
    const contour_de_la_boite_cranienne2 = useRef(null)
    const aspect_paroie_abdominale_aterieur = useRef(null)
    const longeur_feomale = useRef(null)
    const DAT = useRef(null)
    const DAT2 = useRef(null)
    const DAT3 = useRef(null)
    const poids_foetale = useRef(null)
    const perimetre_abdominale = useRef(null)
    const volume_amniotique = useRef(null)
    const liquide_amniotique = useRef(null)
    const aspect_du_trophoblaste = useRef(null)
    const presentation_foetale = useRef(null)
    const sexe_du_foetus = useRef(null)
    
    const nombreFoetus1 = useRef(null)
    const nombreFoetus2 = useRef(null)
    const contour_de_la_boite_cranienne1 = useRef(null)
    const aspect_paroie_abdominale_aterieur1 = useRef(null)
    const longeur_feomale1 = useRef(null)
    const DAT1 = useRef(null)
    const poids_foetale1 = useRef(null)
    const perimetre_abdominale1 = useRef(null)
    const volume_amniotique1 = useRef(null)
    const volume_amniotique2 = useRef(null)
    const liquide_amniotique1 = useRef(null)
    const aspect_du_trophoblaste1 = useRef(null)
    const presentation_foetale1 = useRef(null)
    const sexe_du_foetus1 = useRef(null)

    const sinon_preciser = useRef(null)
    const aspect_du_contour_de_la_boite_cranienne = useRef(null)
    const aspect_des_poumons = useRef(null)
    const position_du_coeur = useRef(null)
    const aspect_des_4_cavitee_catdiaque = useRef(null)
    const Equilibre_des_cavitees_thoraciques = useRef(null)
    const position_et_aspect_vessie = useRef(null)
    const position_et_aspect_reins = useRef(null)
    const Presentation_squellete_et_silhouette = useRef(null)
    const Aspect_du_profile_Foetale = useRef(null)
    const Aspect_du_rachis = useRef(null)
    const Presence_des_quatre_membres = useRef(null)
    const Presence_des_trois_segment_de_membres = useRef(null)
    const aspect_et_localisation_du_placenta = useRef(null)
    const Aspect_de_la_ligne_medianne_cranienne = useRef(null)
    const Aspect_des_Ventricules_lateraux = useRef(null)
    const position_et_aspect_de_lestomac = useRef(null)
    const aspect_des_anses_intestinales = useRef(null)
    const presence_et_forme_du_cavum_du_septum_pellucidum = useRef(null)
    
    const idPatient4 = useRef(null)
    const ID = useRef(null)
    const voie_exam = useRef(null)
    const conditionRealisation = useRef(null)
    const type_grossese = useRef(null)
    const membrane = useRef(null)
    const RFC = useRef(null)
    const MAF = useRef(null)
    const AC = useRef(null)
    const LCC = useRef(null)
    const BIP = useRef(null)
    const HC = useRef(null)
    const clarte_nucale = useRef(null)
    const femur = useRef(null)
    const terme = useRef(null)
    const Morphologie_du_pole_Cephalique = useRef(null)
    const abdomen = useRef(null)
    const aspect_des_membres = useRef(null) 
    const localisation_trophoblaste = useRef(null) 
    const aspect_du_trophoblaste2 = useRef(null) 
    const deroulement = useRef(null) 
    const conclusion4 = useRef(null) 

    const handleChange = () => {
        Imagerie.map(o => o.true_date === Nature_exam.current.value && setCurrentExam(o.nature_exam))
    }

    const handleChange_Patient = () => {
        setCurrentPatients((idPatient.current.value).toString())
        // console.log(Imagerie);
        for (let i = 0; i < Imagerie.length; i++) {
            const element = Imagerie[i];
            if (element.code_patient_imagerie === (idPatient.current.value).toString() && element.status_don === "0" && element.nature_exam !== "Echographie deuxiemme trimestre") {
                setCurrentExam(element.nature_exam)
                break
            }
            else {
                setCurrentExam("")
            }
        }
    }

    const handleChange_Patient2 = () => {
        setCurrentPatients((idPatient4.current.value).toString())
        // console.log(Imagerie);
        for (let i = 0; i < Imagerie.length; i++) {
            const element = Imagerie[i];
            if (element.code_patient_imagerie === (idPatient4.current.value).toString() && element.status_don === "0" && element.nature_exam === "Echographie deuxiemme trimestre") {
                setCurrentExam(element.nature_exam)
                setTrue_Date(element.true_date)
                break
            }
            else {
                setCurrentExam("")
            }
        }
    }

    // les echos

    const [nameEcho, setnameEcho] = useState('')

    const handleReset = (e) => {
        e.preventDefault()
    }
    // document.form_principale.scrollTop = 0 
    const handleSubmit = (e) => {

        e.preventDefault()

        if (CurrentExam === "") {
            alert(`ce patient n'a pas d' imagerie a faire`)
            return
        }
        if (
            CurrentExam === "Echographie Pelvienne"
            || CurrentExam === "Echographie Pelvienne_Partenaires"
        ) {
            document.form_principale.style.display = "none"
            document.form_principale.scrollTop = 0
            // console.log(document.form_principale.scrollTop)
            setnameEcho("Echographie Pelvienne/Endovaginale")
            setIsecho_pelv(true)
        }
        if (
            CurrentExam === "Echographie Obstetricale"
            || CurrentExam === "Echographie Obstetricale_Partenaires"
        ) {
            document.form_principale.style.display = "none"
            document.form_principale.scrollTop = 0
            // console.log(document.form_principale.scrollTop)
            setnameEcho("Echographie Obstetricale depistage premier trimestre")
            setIsEcho_Obstetricale_dt1(true)
        }
        if (
            CurrentExam === "Echographie Obstetricale depistage deuxiemme trimestre"
            // || CurrentExam === "Echographie Intra-Vaginale_Partenaires_"
        ) {
            document.form_principale.style.display = "none"
            document.form_principale.scrollTop = 0
            // console.log(document.form_principale.scrollTop)
            setnameEcho("Echographie Obstetricale depistage deuxiemme trimestre")
            setIsEcho_Obstetricale_dt2(true)
        }
        if (
            CurrentExam === "Echographie Obstetricale depistage deuxiemme et troisieme trimestre"
            // || CurrentExam === "Echographie Transvaginale"
        ) {
            document.form_principale.style.display = "none"
            document.form_principale.scrollTop = 0
            // console.log(document.form_principale.scrollTop)
            setnameEcho("Echographie Obstetricale depistage deuxiemme et troisieme trimestre")
            setIsEcho_Obstetricale_dt12(true)
        }


        // switch (Nature_exam.current.value) {
        //     case "Echographie Pelvienne/Endovaginale":
        //         document.form_principale.style.display = "none"
        //         document.form_principale.scrollTop = 0
        //         // console.log(document.form_principale.scrollTop)
        //         setnameEcho("Echographie Pelvienne/Endovaginale")
        //         setIsecho_pelv(true)
        //         break;
        //     case "Echographie Obstetricale depistage premier trimestre":
        //         document.form_principale.style.display = "none"
        //         document.form_principale.scrollTop = 0
        //         // console.log(document.form_principale.scrollTop)
        //         setnameEcho("Echographie Obstetricale depistage premier trimestre")
        //         setIsEcho_Obstetricale_dt1(true)
        //         break;
        //     case "Echographie Obstetricale depistage deuxiemme trimestre":
        //         document.form_principale.style.display = "none"
        //         document.form_principale.scrollTop = 0
        //         // console.log(document.form_principale.scrollTop)
        //         setnameEcho("Echographie Obstetricale depistage deuxiemme trimestre")
        //         setIsEcho_Obstetricale_dt2(true)
        //         break;

        //     case "Echographie Obstetricale depistage deuxiemme et troisieme trimestre":
        //         document.form_principale.style.display = "none"
        //         document.form_principale.scrollTop = 0
        //         // console.log(document.form_principale.scrollTop)
        //         setnameEcho("Echographie Obstetricale depistage deuxiemme et troisieme trimestre")
        //         setIsEcho_Obstetricale_dt12(true)
        //         break;
        
        //     default:
        //         break;
        // }

    }
    
    const submitEchoPelv1 = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${Constant.ipUrl}setEchographie.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        nameEcho : nameEcho,
                        idPatient : parseInt(idPatient.current.value),
                        prescripteur : prescripteur.current.value,
                        dateExamen : (dateExamen1.current.value).toString(),
                        true_date : Nature_exam.current.value,
                        indicateur : indicateur.current.value,
                        typeMachine : typeMachine.current.value,
                        conditionExam : conditionExam.current.value,
                        typeSonde : typeSonde.current.value,
                        DDR : (DDR.current.value).toString(),
                        
                        uterusOrientation : uterusOrientation.current.value,
                        taille : (taille.current.value).toString(),
                        myome : myome.current.value,
                        simyome_nombre : (simyome_nombre.current.value).toString(),
                        localisation_et_taille_myome : localisation_et_taille_myome.current.value,
                        endometre_echogenecite : (endometre_echogenecite.current.value).toString(),
                        endometre_epaisseur : (endometre_epaisseur.current.value).toString(),
                        ovaire_gauche_structure : ovaire_gauche_structure.current.value,
                        ovaire_gauche_taille : (ovaire_gauche_taille.current.value).toString(),
                        ovaire_gauche_nbr_follecues_entraux : (ovaire_gauche_nbr_follecues_entraux.current.value).toString(),
                        ovaire_droite_structure : ovaire_droite_structure.current.value,
                        ovaire_droite_taille : (ovaire_droite_taille.current.value).toString(),
                        ovaire_droite_nbr_follecules_entraux : (ovaire_droite_nbr_follecules_entraux.current.value).toString(),
                        autres_Trouvailles : autres_Trouvailles1.current.value,
                        conclusion : conclusion1.current.value,
                        autresElements_de_conclusion : autresElements_de_conclusion1.current.value,
                        // nom_operateur : nom_operateur.current.value,
                        idSaver : parseInt(props.Saver[1])
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
            alert( nameEcho  + " Enregistree avec succes !")
        }
        
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(Nature_exam.current.value, dateExam);
        
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
                        DateExam : Nature_exam.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Echographie t1t2"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )
            if (!response2.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
    
            document.form_principale.style.display = ""
            setIsecho_pelv(false)
            top()
            setCurrentExam("")
            
        } catch (error) {
            console.log(error);
        }

    }
        
    const submitEcho2 = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${Constant.ipUrl}setEchographie.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        nameEcho : nameEcho,
                        idPatient : parseInt(idPatient.current.value),
                        prescripteur : prescripteur.current.value,
                        dateExamen : (dateExamen1.current.value).toString(),
                        true_date : (Nature_exam.current.value).toString(),
                        indicateur : indicateur.current.value,
                        typeMachine : typeMachine.current.value,
                        conditionExam : conditionExam.current.value,
                        typeSonde : typeSonde.current.value,
                        DDR : (DDR.current.value).toString(),
    
                        uterusOrientation : uterusOrientation1.current.value,
                        taille : (taille1.current.value).toString(),
                        nombre_embryons : nombre_embryons.current.value,
                        mobilitee_spontanee : (mobilitee_spontanee.current.value).toString(),
                        activite_cardiaque : activite_cardiaque.current.value,
                        frequence_cardiaque : (frequence_cardiaque.current.value).toString(),
                        longueur_cranio_codale : (longueur_cranio_codale.current.value).toString(),
                        sac_gestationnelle : sac_gestationnelle.current.value,
                        epaisseur_de_la_clarte_nucale : (epaisseur_de_la_clarte_nucale.current.value).toString(),
                        age_gestationnelle : (age_gestationnelle.current.value).toString(),
                        date_probable_daccouchement : date_probable_daccouchement.current.value.toString(),
                        autres_Trouvailles : autres_Trouvailles2.current.value,
                        conclusion : conclusion2.current.value,
                        autresElements_de_conclusion : autresElements_de_conclusion2.current.value,
                        // nom_operateur : nom_operateur.current.value,
                        idSaver : parseInt(props.Saver[1])
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
            alert(nameEcho  + " Enregistree avec succes !")
        }

        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(Nature_exam.current.value, dateExam);

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
                        DateExam : Nature_exam.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Echographie t1t2"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )
            if (!response2.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            document.form_principale.style.display = ""
            setIsEcho_Obstetricale_dt1(false)
            document.body.scrollTop = 0;
            setCurrentExam("")
        }
        

    }
    
    const submitEcho3 = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${Constant.ipUrl}setEchographie.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        nameEcho : nameEcho,
                        idPatient : parseInt(idPatient.current.value),
                        prescripteur : prescripteur.current.value,
                        dateExamen : (dateExamen1.current.value).toString(),
                        true_date : Nature_exam.current.value,
                        indicateur : indicateur.current.value,
                        typeMachine : typeMachine.current.value,
                        conditionExam : conditionExam.current.value,
                        typeSonde : typeSonde.current.value,
                        DDR : (DDR.current.value).toString(),
    
                        nombreFoetus : nombreFoetus.current.value,
                        mobilitee_spontanee : (mobilitee_spontanee1.current.value).toString(),
                        activite_cardiaque : activite_cardiaque1.current.value,
                        frequence_cardiaque : (frequence_cardiaque1.current.value).toString(),
                        age_gestationnelle : (age_gestationnelle1.current.value).toString(),
                        date_probable_daccouchement : date_probable_daccouchement1.current.value.toString(),
                        
                        diametreBiparietale : diametreBiparietale.current.value.toString(),
                        contour_de_la_boite_cranienne : contour_de_la_boite_cranienne.current.value,
                        aspect_paroie_abdominale_aterieur : aspect_paroie_abdominale_aterieur.current.value,
                        longeur_feomale : longeur_feomale1.current.value.toString(),
                        DAT : DAT1.current.value.toString(),
                        poids_foetale : poids_foetale.current.value.toString(),
                        perimetre_abdominale : perimetre_abdominale.current.value.toString(),
                        volume_amniotique : volume_amniotique.current.value.toString(),
                        liquide_amniotique : liquide_amniotique.current.value.toString(),
                        aspect_du_trophoblaste : aspect_du_trophoblaste.current.value.toString(),
                        presentation_foetale : presentation_foetale.current.value.toString(),
                        sexe_du_foetus : sexe_du_foetus.current.value.toString(),
    
                        
                        autres_Trouvailles : autres_Trouvailles3.current.value,
                        conclusion : conclusion3.current.value,
                        autresElements_de_conclusion : autresElements_de_conclusion3.current.value,
                        // nom_operateur : nom_operateur.current.value,
                        idSaver : parseInt(props.Saver[1])
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
            alert(nameEcho  + " Enregistree avec succes !")
        }

        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(Nature_exam.current.value, dateExam);

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
                        DateExam : Nature_exam.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Echographie t1t2"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )
            if (!response2.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            document.form_principale.style.display = ""
            setIsEcho_Obstetricale_dt2(false)
            setCurrentExam("")
        }
    }


    const submitEcho4 = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${Constant.ipUrl}setEchographie.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        nameEcho : nameEcho,
                        idPatient : parseInt(idPatient.current.value),
                        prescripteur : prescripteur.current.value,
                        dateExamen : (dateExamen1.current.value).toString(),
                        true_date : Nature_exam.current.value,
                        indicateur : indicateur.current.value,
                        typeMachine : typeMachine.current.value,
                        conditionExam : conditionExam.current.value,
                        typeSonde : typeSonde.current.value,
                        DDR : (DDR.current.value).toString(),
    
                        nombreFoetus : nombreFoetus1.current.value,
                        mobilitee_spontanee : (mobilitee_spontanee2.current.value).toString(),
                        activite_cardiaque : activite_cardiaque2.current.value,
                        frequence_cardiaque : (frequence_cardiaque2.current.value).toString(),
                        age_gestationnelle : (age_gestationnelle2.current.value).toString(),
                        date_probable_daccouchement : (date_probable_daccouchement2.current.value).toString(),
                        
                        diametreBiparietale : diametreBiparietale1.current.value.toString(),
                        contour_de_la_boite_cranienne : contour_de_la_boite_cranienne1.current.value,
                        longeur_feomale : (longeur_feomale.current.value).toString(),
                        DAT : (DAT.current.value).toString(),
                        poids_foetale : (poids_foetale1.current.value).toString(),
                        aspect_du_contour_de_la_boite_cranienne : aspect_du_contour_de_la_boite_cranienne.current.value,
                        aspect_des_poumons : aspect_des_poumons.current.value,
                        position_du_coeur : position_du_coeur.current.value,
                        aspect_des_4_cavitee_catdiaque : aspect_des_4_cavitee_catdiaque.current.value,
                        Equilibre_des_cavitees_thoraciques : Equilibre_des_cavitees_thoraciques.current.value,
                        position_et_aspect_vessie : position_et_aspect_vessie.current.value,
                        position_et_aspect_reins : position_et_aspect_reins.current.value,
                        Presentation_squellete_et_silhouette : Presentation_squellete_et_silhouette.current.value,
                        Aspect_du_profile_Foetale : Aspect_du_profile_Foetale.current.value,
                        Aspect_du_rachis : Aspect_du_rachis.current.value,
                        Presence_des_quatre_membres : Presence_des_quatre_membres.current.value,
                        Presence_des_trois_segment_de_membres : Presence_des_trois_segment_de_membres.current.value,
                        volume_amniotique : volume_amniotique1.current.value,
                        volume_amniotique_char : volume_amniotique2.current.value,
                        aspect_du_trophoblaste : aspect_du_trophoblaste1.current.value,
                        presentation_foetale : presentation_foetale1.current.value.toString(),
                        sexe_du_foetus : sexe_du_foetus1.current.value.toString(),
                        Aspect_de_la_ligne_medianne_cranienne : Aspect_de_la_ligne_medianne_cranienne.current.value,
                        Aspect_des_Ventricules_lateraux : Aspect_des_Ventricules_lateraux.current.value,
                        sinon_preciser : sinon_preciser.current.value,
                        position_et_aspect_de_lestomac : position_et_aspect_de_lestomac.current.value,
                        aspect_des_anses_intestinales : aspect_des_anses_intestinales.current.value,
                        aspect_et_localisation_du_placenta : aspect_et_localisation_du_placenta.current.value,
                        presence_et_forme_du_cavum_du_septum_pellucidum : presence_et_forme_du_cavum_du_septum_pellucidum.current.value,
    
                        aspect_paroie_abdominale_aterieur : aspect_paroie_abdominale_aterieur1.current.value,
                        perimetre_abdominale : (perimetre_abdominale1.current.value).toString(),
                    
                
                        autres_Trouvailles : autres_Trouvailles.current.value,
                        conclusion : conclusion.current.value,
                        autresElements_de_conclusion : autresElements_de_conclusion.current.value,
                        // nom_operateur : nom_operateur.current.value,
                        idSaver : parseInt(props.Saver[1])
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
            alert(nameEcho  + " Enregistree avec succes !")
        }

        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(Nature_exam.current.value, dateExam);

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
                        DateExam : Nature_exam.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Echographie t1t2"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )
            if (!response2.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            document.form_principale.style.display = ""
            setIsEcho_Obstetricale_dt12(false)
            document.body.scrollTop = 0;
            setCurrentExam("")
        }
    }


    const submitEcho2eT = async (e) => {
        e.preventDefault()

        if (CurrentExam === "") {
            alert(`ce patient n'a pas d' imagerie a faire`)
            return
        }

        try {
            const response = await fetch(
                `${Constant.ipUrl}setEcho2eT.php`,
                { 
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient4.current.value),
                        ID : (ID.current.value).toString(),
                        dateExamen : (dateExamen4.current.value).toString(),
                        true_date : True_Date,
                        indicateur : indicateur4.current.value,
                        voie_exam : voie_exam.current.value,
                        conditionRealisation : conditionRealisation.current.value,
                        nombreFoetus2 : (nombreFoetus2.current.value).toString(),
                        type_grossese : (type_grossese.current.value).toString(),
    
                        membrane : membrane.current.value,
                        activite_cardiaque3 : (activite_cardiaque3.current.value).toString(),
                        RFC : (RFC.current.value).toString(),
                        MAF : (MAF.current.value).toString(),
                        AC : (AC.current.value).toString(),
                        DAT : DAT2.current.value.toString(),
                        
                        LCC : LCC.current.value.toString(),
                        BIP : (BIP.current.value).toString(),
                        clarte_nucale : (clarte_nucale.current.value).toString(),
                        HC : (HC.current.value).toString(),
                        femur : (femur.current.value).toString(),
                        terme : (terme.current.value).toString(),
                        Morphologie_du_pole_Cephalique : Morphologie_du_pole_Cephalique.current.value,
                        abdomen : abdomen.current.value,
                        aspect_des_membres : aspect_des_membres.current.value,
                        liquide_amniotique1 : liquide_amniotique1.current.value,
                        localisation_trophoblaste : localisation_trophoblaste.current.value,
                        aspect_du_trophoblaste2 : aspect_du_trophoblaste2.current.value,
                        deroulement : deroulement.current.value,
                        conclusion4 : conclusion4.current.value,
                        // nom_operateur : nom_operateur.current.value,
                        idSaver : parseInt(props.Saver[1])
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
            alert("Echographie du 2e trimestre Enregistree avec succes !")
        }
        
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(True_Date, dateExam);

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
                        DateExam : True_Date,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Echographie t1t2"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )
            if (!response2.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setCurrentExam("")
        }

    }

    return (
        <div className=""> {/* il y avait container */}
            {/* <GoBack handlclick={props.arriere}/> */}
            <div style={{
                display : "flex", 
                backgroundColor : "#7ba2db", 
                paddingBottom : 55, 
                alignItems : "center", 
                paddingRight : 60,
                }}
            >
                <GoBack handlclick={props.arriere}/>
                
                <h2 style={{color : "#333", textDecoration : "underline"}}>Les Echographies du premier et second trimestre</h2>
            </div>
            <div className="row">
                <center>
                    <Tabs>
                        <Tab title="Fiche des imageries">
                            <form className="form-group form-group1 col-md-7" name="form_principale" onSubmit={handleSubmit}>
                                {/* {CurrentExam} <br />
                                {CurrentPatients}
                                 */}
                                <table>
                                    <thead style={{textAlign : "center"}}>
                                        <tr>
                                            <th colSpan={2} align="center">IDENTIFICATION DU PATIENT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ID du patient</td>
                                            <td>
                                                <select className="form-control" ref={idPatient} onChange={handleChange_Patient}>
                                                    {Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                                                </select>    
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Prescripteur</td>
                                            <td>
                                                <select className="form-control" ref={prescripteur}>
                                                    {Personnel.map(p =>
                                                        <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                                        )
                                                    }    
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date de l'examen</td>
                                            <td><input type="date" className="form-control" ref={dateExamen1}/></td>
                                        </tr>
                                        <tr>
                                            <td>Indicateur</td>
                                            <td>
                                                <select className="form-control" ref={indicateur}>
                                                    <option value="Hemorragie du poste partum">Hemorragie du poste partum</option>
                                                    <option value="Metroragie">Metroragie</option>
                                                    <option value="Infertilitee">Infertilitee</option>
                                                    <option value="Depistage de Grossesse">Depistage de Grossesse</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nature de l'examen</td>
                                            <td>
                                                <select className="form-control" ref={Nature_exam} onChange={handleChange}>
                                                    <option value=""></option>
                                                    {Imagerie.map(l => 
                                                        (l.code_patient_imagerie === CurrentPatients && l.status_don === "0" && l.nature_exam !== "Echographie deuxiemme trimestre") && <option key={l.true_date} value={l.true_date}>{l.nature_exam}</option>
                                                    )}
                                                    {/* <option value="Echographie Pelvienne/Endovaginale">Echographie Pelvienne/Endovaginale</option>
                                                    <option value="Echographie Obstetricale depistage premier trimestre">Echographie Obstetricale depistage premier trimestre</option>
                                                    <option value="Echographie Obstetricale depistage deuxiemme trimestre">Echographie Obstetricale depistage deuxieme trimestre</option>
                                                    <option value="Echographie Obstetricale depistage deuxiemme et troisieme trimestre">Echographie Obstetricale depistage deuxiemme et troisieme trimestre</option> */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Type de machine</td>
                                            <td>
                                                <select className="form-control" ref={typeMachine}>
                                                    <option value="Sunbright">Sunbright</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Condition de l'examen</td>
                                            <td>
                                                <select className="form-control" ref={conditionExam}>
                                                    <option value="Normale">Normale</option>
                                                    <option value="En Urgence">En Urgence</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Type de sonde</td>
                                            <td>
                                                <select className="form-control" ref={typeSonde}>
                                                    <option value="2,0 MHz">2,0 MHz</option>
                                                    <option value="2,5 MHz">2,5 MHz</option>
                                                    <option value="3,5 MHz">3,5 MHz</option>
                                                    <option value="6,0 MHz">6,0 MHz</option>
                                                    <option value="6,5 MHz">6,5 MHz</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DDR</td>
                                            <td><input type="date" className="form-control" ref={DDR}/></td>
                                        </tr>
                                        <tr>
                                            <td><button className="btn btn-danger" onClick={handleReset}>Annuler</button></td>
                                            <td align="right"><button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <form className="form-group form-group1 col-md-9" style={{display : Isecho_pelv ? "" : "none"}} onSubmit={submitEchoPelv1}>
                                <table>
                                    <thead>
                                        <th style={{textAlign : "center"}} colSpan={2}><h4> Vous avez choisie l'{nameEcho}</h4></th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Uterus : orientation</td>
                                            <td>
                                                <select className="form-control" ref={uterusOrientation}>
                                                    <option value="Anteversee">Anteversee</option>
                                                    <option value="Retroversee">Retroversee</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Taille</td>
                                            <td><input type="number" className="form-control" ref={taille}/></td>
                                        </tr>
                                        <tr>
                                            <td>Myometre</td>
                                            <td>
                                                <select className="form-control" ref={myome}>
                                                    <option value="Homogene">Homogene</option>
                                                    <option value="Heterogene">Heterogene</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Si myome, nombre</td>
                                            <td><input type="number" className="form-control" ref={simyome_nombre}/></td>
                                        </tr>
                                        <tr>
                                            <td>Localisation et taille des myomes</td>
                                            <td><input type="text" className="form-control" ref={localisation_et_taille_myome}/></td>
                                        </tr>
                                        <tr>
                                            <td>Endometre : Echogeneticitee</td>
                                            <td>
                                                <select className="form-control" ref={endometre_echogenecite}>
                                                    <option value="Hypoechogene">Hypoechogene</option>
                                                    <option value="Hyperechogene">Hyperechogene</option>
                                                    <option value="Moyennement Echogene">Moyennement Echogene</option>
                                                    <option value="Anechogene">Anechogene</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Endometre Epaisseur en millimetre</td>
                                            <td><input type="number" className="form-control" ref={endometre_epaisseur}/></td>
                                        </tr>
                                        <tr>
                                            <td>Ovaire gauche : structure</td>
                                            <td align="center">
                                                {/* <div style={{width : 90, display : "flex", justifyContent : "space-between", margin : 10}}><input type="radio" name="Ovaire_gauche_structure" value="Hyperechogene" />Hyperechogene</div>
                                                <div style={{width : 90, display : "flex", justifyContent : "space-between", margin : 10}}><input type="radio" name="Ovaire_gauche_structure" value="Hypoechogene" />Hypoechogene</div>
                                                <div style={{width : 90, display : "flex", justifyContent : "space-between", margin : 10}}><input type="radio" name="Ovaire_gauche_structure" value="Moyennement Echogene" />Moyennement Echogene</div>
                                                <div style={{width : 90, display : "flex", justifyContent : "space-between", margin : 10}}><input type="radio" name="Ovaire_gauche_structure" value="Homogene" />Homogene</div>
                                                <div style={{width : 90, display : "flex", justifyContent : "space-between", margin : 10}}><input type="radio" name="Ovaire_gauche_structure" value="Heterogene" />Heterogene</div>
                                                <div style={{width : 90, display : "flex", justifyContent : "space-between", margin : 10}}><input type="radio" name="Ovaire_gauche_structure" value="Anechogene" />Anechogene</div> */}
                                                <select className="form-control" ref={ovaire_gauche_structure}>
                                                    <option value="Hypoechogene">Hypoechogene</option>
                                                    <option value="Hyperechogene">Hyperechogene</option>
                                                    <option value="Moyennement Echogene">Moyennement Echogene</option>
                                                    <option value="Homogene">Homogene</option>
                                                    <option value="Heterogene">Heterogene</option>
                                                    <option value="Anechogene">Anechogene</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ovaire gauche : taille en mm</td>
                                            <td><input type="number" className="form-control" ref={ovaire_gauche_taille}/></td>
                                        </tr>
                                        <tr>
                                            <td>Ovaire gauche : Nombre de follecules antraux</td>
                                            <td><input type="number" className="form-control" ref={ovaire_gauche_nbr_follecues_entraux}/></td>
                                        </tr>
                                        <tr>
                                            <td>Ovaire Droite : structure</td>
                                            <td>
                                                <select className="form-control" ref={ovaire_droite_structure}>
                                                    <option value="Hypoechogene">Hypoechogene</option>
                                                    <option value="Hyperechogene">Hyperechogene</option>
                                                    <option value="Moyennement Echogene">Moyennement Echogene</option>
                                                    <option value="Homogene">Homogene</option>
                                                    <option value="Heterogene">Heterogene</option>
                                                    <option value="Anechogene">Anechogene</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ovaire droite : taille en mm</td>
                                            <td><input type="number" className="form-control" ref={ovaire_droite_taille}/></td>
                                        </tr>
                                        <tr>
                                            <td>Ovaire droite : Nombre de follecules antraux</td>
                                            <td><input type="number" className="form-control" ref={ovaire_droite_nbr_follecules_entraux}/></td>
                                        </tr>
                                        <tr>
                                            <td>Autres Trouvailles</td>
                                            <td><input type="text" className="form-control" ref={autres_Trouvailles1}/></td>
                                        </tr>
                                        <tr>
                                            <td>Conclusion</td>
                                            <td><textarea cols="30" rows="5" className="form-control" ref={conclusion1}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td>Autres elements de conclusion</td>
                                            <td><input type="text" className="form-control" ref={autresElements_de_conclusion1}/></td>
                                        </tr>
                                        <tr>
                                            <td>Nom de l'operateur</td>
                                            <td>
                                                <select className="form-control" ref={nom_operateur1}>
                                                    <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option>
                                                    {/* {Personnel.map(p =>
                                                        <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                                        )
                                                    }    */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><button className="btn btn-danger" onClick={(e) => {e.preventDefault(); document.form_principale.style.display = ""; setIsecho_pelv(false); console.log(document.form_principale.scrollTop)}}>Annuler</button></td>
                                            <td align="right"><button className="btn btn-primary" onClick={submitEchoPelv1}>Soumettre</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <form className="form-group form-group1 col-md-9" style={{display : IsEcho_Obstetricale_dt1 ? "" : "none"}} onSubmit={submitEcho2}>
                                <table>
                                    <thead>
                                        <th style={{textAlign : "center"}} colSpan={2}> <h4>Vous avez choisie l'{nameEcho}</h4></th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Uterus : orientation</td>
                                            <td>
                                                <select className="form-control" ref={uterusOrientation1}>
                                                    <option value="Anteversee">Anteversee</option>
                                                    <option value="Retroversee">Retroversee</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Taille</td>
                                            <td><input type="number" className="form-control" ref={taille1}/></td>
                                        </tr>
                                        <tr>
                                            <td>Nombre d'embryons</td>
                                            <td><input type="number" className="form-control" ref={nombre_embryons}/></td>
                                        </tr>
                                        <tr>
                                            <td>Mobilitee Spontanee</td>
                                            <td>
                                                <select className="form-control" ref={mobilitee_spontanee}>
                                                    <option value="Detectee">Detectee</option>
                                                    <option value="Non detectee">Non detectee</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Activitee Cardiaque</td>
                                            <td>
                                                <select className="form-control" ref={activite_cardiaque}>
                                                    <option value="Detectee">Detectee</option>
                                                    <option value="Non detectee">Non detectee</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Frequence cardiaque en BMP</td>
                                            <td><input type="number" className="form-control" ref={frequence_cardiaque}/></td>
                                        </tr>
                                        <tr>
                                            <td>Longueur cranio-codale en mm</td>
                                            <td><input type="number" className="form-control" ref={longueur_cranio_codale}/></td>
                                        </tr>
                                        <tr>
                                            <td>Sac gestationnele (GS) taille en mmm</td>
                                            <td><input type="number" className="form-control" ref={sac_gestationnelle}/></td>
                                        </tr>
                                        <tr>
                                            <td>Epaisseur de la clarte nucale en mm</td>
                                            <td><input type="number" className="form-control" ref={epaisseur_de_la_clarte_nucale}/></td>
                                        </tr>
                                        <tr>
                                            <td>Age gestationnel</td>
                                            <td><input type="number" className="form-control" ref={age_gestationnelle}/></td>
                                        </tr>
                                        <tr>
                                            <td>Date probable d'accouchement</td>
                                            <td><input type="date" className="form-control" ref={date_probable_daccouchement}/></td>
                                        </tr>
                                        <tr>
                                            <td>Autres Trouvailles</td>
                                            <td><input type="text" className="form-control" ref={autres_Trouvailles2}/></td>
                                        </tr>
                                        <tr>
                                            <td>Conclusion</td>
                                            <td><textarea cols="30" rows="5" className="form-control" ref={conclusion2}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td>Autres elements de conclusion</td>
                                            <td><input type="text" className="form-control" ref={autresElements_de_conclusion2}/></td>
                                        </tr>
                                        <tr>
                                            <td>Nom de l'operateur</td>
                                            <td>
                                                <select className="form-control" ref={nom_operateur2}>
                                                    <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option>
                                                    {/* {Personnel.map(p =>
                                                        <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                                        )
                                                    }    */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><button className="btn btn-danger" onClick={(e) => {e.preventDefault(); document.form_principale.style.display = ""; setIsEcho_Obstetricale_dt1(false)}}>Annuler</button></td>
                                            <td align="right"><button className="btn btn-primary" onClick={submitEcho2}>Soumettre</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <div className="form-group form-group1 col-md-11" style={{display : IsEcho_Obstetricale_dt2 ? "" : "none"}}>
                                <h4 style={{textAlign : "center"}}>Vous avez choisie l'{nameEcho}</h4>
                                <div style={{display : "flex"}}>
                                    <form className="form-group col-md-6" onSubmit={submitEcho3}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Nombre de foetus</td>
                                                    <td><input type="number" className="form-control" ref={nombreFoetus}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Mobilitee Spontanee</td>
                                                    <td>
                                                        <select className="form-control" ref={mobilitee_spontanee1}>
                                                            <option value="Detectee">Detectee</option>
                                                            <option value="Non detectee">Non detectee</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Age gestationnel</td>
                                                    <td><input type="number" className="form-control" ref={age_gestationnelle1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Date probable d'accouchement</td>
                                                    <td><input type="date" className="form-control" ref={date_probable_daccouchement1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Diametre biparietale en mm</td>
                                                    <td><input type="number" className="form-control" ref={diametreBiparietale}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Contour de la boite craniene (PC) en mm</td>
                                                    <td><input type="number" className="form-control" ref={contour_de_la_boite_cranienne}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect de la paroi abdominale anterieur</td>
                                                    <td><input type="text" className="form-control" ref={aspect_paroie_abdominale_aterieur}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Longueur Femorale (LF) en mm</td>
                                                    <td><input type="number" className="form-control" ref={longeur_feomale1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Diametre Abdomino-Transverse (DAT)</td>
                                                    <td><input type="number" className="form-control" ref={DAT1}/></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Autres Trouvailles</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Conclusion</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Autres Elements de conclusion</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Nom de l'operateur</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center">
                                                        <button className="btn btn-danger" onClick={(e) => {e.preventDefault(); document.form_principale.style.display = ""; setIsEcho_Obstetricale_dt2(false)}}>Annuler</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                    <form className="form-group col-md-6">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{paddingTop : 40}}>Activitee Cardiaque</td>
                                                    <td style={{paddingTop : 40}}>
                                                        <select className="form-control" ref={activite_cardiaque1}>
                                                            <option value="Detectee">Detectee</option>
                                                            <option value="Non detectee">Non detectee</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Frequence cardiaque en BMP</td>
                                                    <td><input type="number" className="form-control" ref={frequence_cardiaque1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Estimation du poids Foetale en gramme</td>
                                                    <td><input type="number" className="form-control" ref={poids_foetale}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Perimetre abdominale en mm</td>
                                                    <td><input type="number" className="form-control" ref={perimetre_abdominale}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Volume Amniotique en mm</td>
                                                    <td><input type="number" className="form-control" ref={volume_amniotique}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Liquide Amniotique</td>
                                                    <td>
                                                        <select className="form-control" ref={liquide_amniotique}>
                                                            <option value="En quantite suffisante">En quantite suffisante</option>
                                                            <option value="En quantite insuffisante">En quantite insuffisante</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect du trophoblaste ou plancenta</td>
                                                    <td><input type="text" className="form-control" ref={aspect_du_trophoblaste}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Presentation Foetale</td>
                                                    <td>
                                                        <select className="form-control" ref={presentation_foetale}>
                                                            <option value="Cephalique">Cephalique</option>
                                                            <option value="Siege">Siege</option>
                                                            <option value="Transverse">Transverse</option>
                                                            <option value="Variable">Variable</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Sexe du foetus</td>
                                                    <td>
                                                        <select className="form-control" ref={sexe_du_foetus}>
                                                            <option value="XX">XX</option>
                                                            <option value="XY">XY</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center"><input type="text" className="form-control" ref={autres_Trouvailles3}/></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center"><textarea cols="20" rows="1" className="form-control" ref={conclusion3}></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center"><input type="text" className="form-control" ref={autresElements_de_conclusion3}/></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center">
                                                        <select className="form-control" ref={nom_operateur}>
                                                            {/* <option value="Mr Niedjo">Mr Niedjo</option>
                                                            <option value="Dr Eric LELE">Dr Eric LELE</option> */}
                                                            <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center">
                                                        <button className="btn btn-primary" onClick={submitEcho3}>Soumettre</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                            <div className="form-group form-group1 col-md-11" style={{display : IsEcho_Obstetricale_dt12 ? "" : "none"}} >
                                <h4 style={{textAlign : "center"}}>Vous avez choisie l'{nameEcho}</h4>
                                <div style={{display : "flex"}}>
                                    <form className="form-group col-md-6" onSubmit={submitEcho4}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Nombre de foetus</td>
                                                    <td><input type="number" className="form-control" ref={nombreFoetus1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Mobilitee Spontanee</td>
                                                    <td>
                                                        <select className="form-control" ref={mobilitee_spontanee2}>
                                                            <option value="Detectee">Detectee</option>
                                                            <option value="Non detectee">Non detectee</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Age gestationnel</td>
                                                    <td><input type="number" className="form-control" ref={age_gestationnelle2}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Date probable d'accouchement</td>
                                                    <td><input type="date" className="form-control" ref={date_probable_daccouchement2}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Diametre biparietale en mm</td>
                                                    <td><input type="number" className="form-control" ref={diametreBiparietale1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Contour de la boite craniene (PC) en mm</td>
                                                    <td><input type="number" className="form-control" ref={contour_de_la_boite_cranienne1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Activitee Cardiaque</td>
                                                    <td>
                                                        <select className="form-control" ref={activite_cardiaque2}>
                                                            <option value="Detectee">Detectee</option>
                                                            <option value="Non detectee">Non detectee</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Frequence cardiaque en BMP</td>
                                                    <td><input type="number" className="form-control" ref={frequence_cardiaque2}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect de la paroi abdominale anterieur</td>
                                                    <td><input type="text" className="form-control" ref={aspect_paroie_abdominale_aterieur1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Si non, preciser</td>
                                                    <td><input type="text" className="form-control" ref={sinon_preciser}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Volume Amniotique en mm</td>
                                                    <td><input type="number" className="form-control" ref={volume_amniotique1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect du trophoblaste ou plancenta</td>
                                                    <td><input type="text" className="form-control" ref={aspect_du_trophoblaste1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Longueur Femorale (LF) en mm</td>
                                                    <td><input type="number" className="form-control" ref={longeur_feomale}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Diametre Abdomino-Transverse (DAT)</td>
                                                    <td><input type="number" className="form-control" ref={DAT}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Estimation du poids Foetale en gramme</td>
                                                    <td><input type="number" className="form-control" ref={poids_foetale1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Perimetre abdominale en mm</td>
                                                    <td><input type="number" className="form-control" ref={perimetre_abdominale1}/></td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect du contour de la boite Cranienne</td>
                                                    <td>
                                                        <select className="form-control" ref={aspect_du_contour_de_la_boite_cranienne}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Position et aspect de l'estomac</td>
                                                    <td>
                                                        <select className="form-control" ref={position_et_aspect_de_lestomac}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect des anses intestinales</td>
                                                    <td>
                                                        <select className="form-control" ref={aspect_des_anses_intestinales}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Autres Trouvailles</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Conclusion</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Autres Elements de conclusion</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 30}}>Nom de l'operateur</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center">
                                                        <button className="btn btn-danger" onClick={(e) => {e.preventDefault(); document.form_principale.style.display = ""; setIsEcho_Obstetricale_dt12(false)}}>Annuler</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                    <form className="form-group col-md-6">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{paddingTop : 30}}>Aspect des poumons</td>
                                                    <td style={{paddingTop : 30}}>
                                                        <select className="form-control" ref={aspect_des_poumons}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Position du coeur</td>
                                                    <td>
                                                        <select className="form-control" ref={position_du_coeur}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect des quatre cavites cardiaque</td>
                                                    <td>
                                                        <select className="form-control" ref={aspect_des_4_cavitee_catdiaque}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Equilibre des cavitees thoraciques</td>
                                                    <td>
                                                        <select className="form-control" ref={Equilibre_des_cavitees_thoraciques}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Position et Aspect de la vessie</td>
                                                    <td>
                                                        <select className="form-control" ref={position_et_aspect_vessie}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Position et Aspect des reins</td>
                                                    <td>
                                                        <select className="form-control" ref={position_et_aspect_reins}>
                                                            <option value="Normaux">Normaux</option>
                                                            <option value="Anormaux">Anormaux</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Presentation squellete et silhouette</td>
                                                    <td>
                                                        <select className="form-control" ref={Presentation_squellete_et_silhouette}>
                                                            <option value="Normales">Normales</option>
                                                            <option value="Anormales">Anormales</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect du profile Foetale</td>
                                                    <td>
                                                        <select className="form-control" ref={Aspect_du_profile_Foetale}>
                                                            <option value="Complet">Complet</option>
                                                            <option value="incomplet">incomplet</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect du rachis</td>
                                                    <td>
                                                        <select className="form-control" ref={Aspect_du_rachis}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Presence des quatre membres</td>
                                                    <td>
                                                        <select className="form-control" ref={Presence_des_quatre_membres}>
                                                            <option value="Oui">Oui</option>
                                                            <option value="Non">Non</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Presence des trois segments de membres</td>
                                                    <td>
                                                        <select className="form-control" ref={Presence_des_trois_segment_de_membres}>
                                                            <option value="Oui">Oui</option>
                                                            <option value="Non">Non</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Volume Amniotique (c'est le liquide amniotique dans la base de donnee)</td>
                                                    <td>
                                                        <select className="form-control" ref={volume_amniotique2}>
                                                            <option value="En quantite suffisante">En quantite suffisante</option>
                                                            <option value="En quantite insuffisante">En quantite insuffisante</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Placenta : aspect et localisation du placenta</td>
                                                    <td>
                                                        <select className="form-control" ref={aspect_et_localisation_du_placenta}>
                                                            <option value=""></option>
                                                            <option value="Insertion corporeale Anter">Insertion corporeale Anter   </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Presentation Foetale</td>
                                                    <td>
                                                        <select className="form-control" ref={presentation_foetale1}>
                                                            <option value="Cephalique">Cephalique</option>
                                                            <option value="Siege">Siege</option>
                                                            <option value="Transverse">Transverse</option>
                                                            <option value="Variable">Variable</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Sexe du foetus</td>
                                                    <td>
                                                        <select className="form-control" ref={sexe_du_foetus1}>
                                                            <option value="XX">XX</option>
                                                            <option value="XY">XY</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect de la ligne medianne cranienne</td>
                                                    <td>
                                                        <select className="form-control" ref={Aspect_de_la_ligne_medianne_cranienne}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Aspect des Ventricules lateraux</td>
                                                    <td>
                                                        <select className="form-control" ref={Aspect_des_Ventricules_lateraux}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Presence et forme du cavum du septum pellucidum</td>
                                                    <td>
                                                        <select className="form-control" ref={presence_et_forme_du_cavum_du_septum_pellucidum}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Anormale">Anormale</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center" style={{paddingTop : 60}}><input type="text" className="form-control" ref={autres_Trouvailles}/></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center"><textarea cols="20" rows="1" className="form-control" ref={conclusion}></textarea></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center"><input type="text" className="form-control" ref={autresElements_de_conclusion}/></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center">
                                                        <select className="form-control" ref={nom_operateur}>
                                                            <option key={props.Saver[1]} value={props.Saver[1]}>{props.Saver[2]}</option>
                                                            {/* <option value="Mr Niedjo">Mr Niedjo</option>
                                                            <option value="Dr Eric LELE">Dr Eric LELE</option> */}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} align="center">
                                                        <button className="btn btn-primary" onClick={submitEcho4}>Soumettre</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </Tab>
                        <Tab title="Echographie 2e T">
                                {/* {CurrentExam} <br />
                                {CurrentPatients}
                                {True_Date} */}
                                <center>
                                    <b style={{color : "red"}}>{CurrentExam === "" && "ATTENTION ! Ce patient n'a pas d'echographie de deuxiemme trimetre a faire. Ca ne sert a rien d'essayer de l'enregistrer"}</b>
                                </center> 
                                <br />
                           <div className="form-group form-group1 col-md-11" style={{display : "flex"}}>
                                <form className="col-md-4" onSubmit={submitEcho2eT}>
                                    <tbody>
                                        <tr>
                                            <td>Identifiant du patient</td>
                                            <td>
                                                <select className="form-control" ref={idPatient4} onChange={handleChange_Patient2}>
                                                    <option value=""></option>
                                                    {Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                                                </select>    
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ID</td>
                                            <td><input type="number" className="form-control" ref={ID}/></td>
                                        </tr>
                                        <tr>
                                            <td>Date de l'examen</td>
                                            <td><input type="date" className="form-control" ref={dateExamen4}/></td>
                                        </tr>
                                        <tr>
                                            <td>Indicateur</td>
                                            <td>
                                                <select className="form-control" ref={indicateur4}>
                                                    <option value="Morphologie du 2e trimestre">Morphologie du 2e trimestre</option>
                                                    <option value="Depistage du 1er trimestre">Depistage du 1er trimestre</option>
                                                    <optgroup label="Urgences">
                                                        <option value="Urgence 1er trimestre">1er trimestre</option>
                                                        <option value="Urgence 2e trimestre">2e trimestre</option>
                                                        <option value="Urgence 3e trimestre">3e trimestre</option>
                                                    </optgroup>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Voie de l'exammen</td>
                                            <td>
                                                <select className="form-control" ref={voie_exam}>
                                                    <option value="Abdominale">Abdominale</option>
                                                    <option value="Transvaginale">Transvaginale</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Conditions de realisation</td>
                                            <td>
                                                <select className="form-control" ref={conditionRealisation}>
                                                    <option value="Normal">Normal</option>
                                                    <option value="Urgent">Urgent</option>
                                                    <option value="En forraire">En forraire</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nombre de foetus</td>
                                            <td>
                                                <select className="form-control" ref={nombreFoetus2}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Type de grossese</td>
                                            <td>
                                                <select className="form-control" ref={type_grossese}>
                                                    <option value="unique">unique</option>
                                                    <option value="multiple">multiple</option>
                                                    <option value="Gemiale">Gemiale</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Membrane</td>
                                            <td><textarea name="" cols="30" rows="2" className="form-control" ref={membrane}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} align="center" style={{paddingTop : 80}}>
                                                <button className="btn btn-danger" onClick={(e) => {e.preventDefault()}}>Annuler</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </form>
                                <form className="col-md-4">
                                    <tbody>
                                        <tr>
                                            <td>Activitee cardiaque</td>
                                            <td>
                                                <select className="form-control" ref={activite_cardiaque3}>
                                                    <option value="Normale et reguliere">Normale et reguliere</option>
                                                    <option value="Presente">Presente</option>
                                                    <option value="Abscente">Abscente</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>RFC</td>
                                            <td><input type="number" name=""className="form-control" ref={RFC}/></td>
                                        </tr>
                                        <tr>
                                            <td>MAF</td>
                                            <td>
                                                <select className="form-control" ref={MAF}>
                                                    <option value="Normale et reguliere">Normale et reguliere</option>
                                                    <option value="Presente">Presente</option>
                                                    <option value="Abscente">Abscente</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AC</td>
                                            <td><input type="number" name=""className="form-control" ref={AC}/></td>
                                        </tr>
                                        <tr>
                                            <td>DAT</td>
                                            <td><input type="number" name=""className="form-control" ref={DAT2}/></td>
                                        </tr>
                                        <tr>
                                            <td>LCC</td>
                                            <td><input type="number" name=""className="form-control" ref={LCC}/></td>
                                        </tr>
                                        <tr>
                                            <td>BIP</td>
                                            <td><input type="number" name=""className="form-control" ref={BIP}/></td>
                                        </tr>
                                        <tr>
                                            <td>Clarte nucale</td>
                                            <td><input type="number" name=""className="form-control" ref={clarte_nucale}/></td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingBottom : 160}}>HC</td>
                                            <td style={{paddingBottom : 160}}><input type="number" name=""className="form-control" ref={HC}/></td>
                                        </tr>
                                    </tbody>
                                </form>
                                <form className="col-md-4">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Femur</td>
                                                <td><input type="number" name=""className="form-control" ref={femur}/></td>
                                            </tr>
                                            <tr>
                                                <td>Terme</td>
                                                <td><input type="number" name=""className="form-control" ref={terme}/></td>
                                            </tr>
                                            <tr>
                                                <td>Morphologie du pole Cephalique</td>
                                                <td><input type="text" name=""className="form-control" ref={Morphologie_du_pole_Cephalique}/></td>
                                            </tr>
                                            <tr>
                                                <td>Abdomen</td>
                                                <td><input type="text" name=""className="form-control" ref={abdomen}/></td>
                                            </tr>
                                            <tr>
                                                <td>Aspect des membres</td>
                                                <td><input type="text" name=""className="form-control" ref={aspect_des_membres}/></td>
                                            </tr>
                                            <tr>
                                                <td>Liquide Amniotique</td>
                                                <td>
                                                    <select className="form-control" ref={liquide_amniotique1}>
                                                        <option value="D'abondance normale">D'abondance normale</option>
                                                        <option value="De forte abondance">De forte abondance</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Localisation du Trophoblaste</td>
                                                <td><input type="text" name=""className="form-control" ref={localisation_trophoblaste}/></td>
                                            </tr>
                                            <tr>
                                                <td>Aspect du Trophoblaste</td>
                                                <td><input type="text" name=""className="form-control" ref={aspect_du_trophoblaste2}/></td>
                                            </tr>
                                            <tr>
                                                <td>Deroulement </td>
                                                <td><input type="text" name=""className="form-control" ref={deroulement}/></td>
                                            </tr>
                                            <tr>
                                                <td>conclusion </td>
                                                <td><textarea name="" cols="30" rows="2" className="form-control" ref={conclusion4}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} align="center" style={{paddingTop : 20}}>
                                                    <button className="btn btn-primary" onClick={submitEcho2eT}>Soumettre</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                           </div>
                        </Tab>
                    </Tabs>
                </center>
            </div>
        </div>
    )
}
