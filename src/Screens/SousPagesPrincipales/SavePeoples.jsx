import React, { useRef, useState } from "react"
import { GoBack } from "../../Components/GoBack"
import './index.css'
import PrintPatient from "../impressionData/PrintPatient"
import Constant from "../../Constant"

export function SavePeoples(props) {
    
    const select = useRef(null)
    const nom_et_prenom = useRef(null)
    const lieu_de_residence = useRef(null)
    const numtel = useRef(null)
    const dateNais = useRef(null)
    const dateDuJour = useRef(null)
    const age = useRef(null)
    const service = useRef(null)
    // const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')

    const [Isconsultation, setIsconsultation] = useState(false)
    const [IsPrint, setIsPrint] = useState(false)
    const [Sexe, setSexe] = useState("Masculin")
    const [Nom, setNom] = useState("")
    const [Date_nais, setDate_nais] = useState("")
    const [Residence, setResidence] = useState("")
    const [Numtel, setNumtel] = useState("")
    const [DateJour, setDateJour] = useState("")
    const [Age, setAge] = useState(0)

    if (IsPrint) {
        return (
            <PrintPatient 
                arriere = {() => setIsPrint(false)} 
                nom_et_prenom = {Nom}
                lieu_de_residence = {Residence}
                numtel = {Numtel}
                dateNais = {Date_nais}
                dateDuJour = {DateJour}
                age = {Age}
                sexe = {Sexe}
            />
        )
    }
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();
    

    // const handleClick = () => {
    //     // console.log(select.current.value)
    //     if (select.current.value === "Consultation") {
    //         setIsconsultation(true)
    //     }
    //     else{
    //         setIsconsultation(false) 
    //     }
    // }

    const handleChange = () => {
        // e.preventDefault()
        // console.log(dateDuJour.current.value, dateNais.current.value)
        let d1 = new Date(new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString() + "-" + new Date().getUTCDate())
        let d2 = new Date(dateNais.current.value)
        let d3 = d1.getTime() - d2.getTime()

        const annee = (d3 / 31536000000)
        age.current.value = annee
        // console.log(annee)
        // console.log(new Date().getUTCDate() + "/" + (parseFloat(new Date().getUTCMonth()) + 1).toString() + "/" + new Date().getUTCFullYear())
        // console.log(d1.toLocaleDateString(), d2.toLocaleDateString())
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(Sexe)

        try {
            const response = await fetch(
                `${Constant.ipUrl}setFrequentation.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        nom_et_prenom : nom_et_prenom.current.value,
                        dateDuJour : dateDuJour.current.value,
                        dateNais : dateNais.current.value,
                        age : age.current.value,
                        sexe : Sexe,
                        lieu_de_residence : lieu_de_residence.current.value,
                        numtel : numtel.current.value,
                        select : "",
                        service : "",
                        idSaver : props.idSaver
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
            alert("patient Enregistree avec succes !")
        }
        
        setNom(nom_et_prenom.current.value)
        setDate_nais(dateNais.current.value)
        setResidence(lieu_de_residence.current.value)
        setAge(age.current.value)
        setDateJour(dateDuJour.current.value)
        setNumtel(numtel.current.value)
        setIsPrint(true)
        handleReset2()
    }

    const handleReset = (e) => {
        e.preventDefault()
        nom_et_prenom.current.value = ""
        dateNais.current.value = ""
        lieu_de_residence.current.value = ""
        numtel.current.value = ""
    }
    const handleReset2 = () => {
        nom_et_prenom.current.value = ""
        dateNais.current.value = ""
        lieu_de_residence.current.value = ""
        numtel.current.value = ""
    }


    
    return (
        <div className="container">
            <GoBack handlclick={props.arriere}/>
            <div className="row">
                <center>
                    <form className="form-group form-group1 col-md-6" name="f1" onSubmit={handleSubmit}>  
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="nom">Nom et prenom</label></td>
                                    <td><input type="text" className="form-control" ref={nom_et_prenom}/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Date du jour</label></td>
                                    <td><input type="date" className="form-control" ref={dateDuJour}/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Date de naissance</label></td>
                                    <td><input type="date" className="form-control" ref={dateNais} onChange={handleChange}/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Age</label></td>
                                    <td><input type="number" className="form-control" readOnly ref={age}/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Sexe</label></td>
                                    <td style={{display : "flex", justifyContent : "space-between"}}><input type="radio" name="sexe" onClick={() => {setSexe("Masculin"); console.log(Sexe)}}/>M <input type="radio" name="sexe" onClick={() => {setSexe("Feminin"); console.log(Sexe)}}/>F</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Lieu de residence</label></td>
                                    <td><input  style={{textTransform : "uppercase"}} type="text" className="form-control" ref={lieu_de_residence}/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Numero de telephone</label></td>
                                    <td><input type="number" className="form-control" ref={numtel}/></td>
                                </tr>
                                {/* <tr>
                                    <td colSpan={2} align="center"><label htmlFor="nom">Raison de la venue</label></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nom">Raison de la venue</label></td>
                                    <td>
                                        <select name="" id="" className="form-control" ref={select} onClick={handleClick}>
                                            <option value="Pharmacie">Pharmacie</option>
                                            <option value="Laboratoire">Laboratoire</option>
                                            <option value="Consultation">Consultation</option>
                                            <option value="Imagerie medicale">Imagerie medicale</option>
                                            <option value="Soins">Soins</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{display : Isconsultation ? "" : "none"}}>
                                    <td><label htmlFor="nom">Services</label></td>
                                    <td>
                                        <select name="" id="" className="form-control" ref={service}>
                                            <option value="Generale">Generale</option>
                                            <option value="Neurologie">Neurologie</option>
                                            <option value="Chirugicale">Chirugicale</option>
                                            <option value="Obstetricale">Obstetricale</option>
                                            <option value="Genicologique">Genicologique</option>
                                            <option value="Pediatrique">Pediatrique</option>
                                            <option value="Prenatale">Prenatale</option>
                                            <option value="Planning Familiale">Planning Familiale</option>
                                            <option value="Infertilitee">Infertilitee</option>
                                            <option value="Suivie">Suivie</option>
                                            <option value="Santee Publique">Santee Publique</option>
                                            <option value="Premiere Prenatale">Premiere Prenatale</option>
                                        </select>
                                    </td>
                                </tr> */}
                                <tr>
                                    <td><button className="btn btn-danger" onClick={handleReset}>Annuler</button></td>
                                    <td align="right"><button className="btn btn-primary" onClick={handleSubmit}>Imprimer et Soumettre</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    {/* <button onClick={() => {setIsPrint(true);}}>imprimerrr</button> */}
                </center>
            </div>
        </div>
    )
}
