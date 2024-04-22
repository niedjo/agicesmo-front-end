import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { GoBack } from "../../Components/GoBack";
// import './stock.css'
import BoutonModal from "../../Components/BoutonModal";
import Constant from "../../Constant";

export default function EntreeSortie(props) {

    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();
    
    const [Personnel, setPersonnel] = useState([])
    const [Mouvement, setMouvement] = useState([])  
    const [MouvementActuel, setMouvementActuel] = useState([])
    const [DateActuel, setDateActuel] = useState('')
    const [IsEntree, setIsEntree] = useState(false)

    const [CounterFetch, setCounterFetch] = useState(1)

    useLayoutEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getPersonnel.php`,
                {
                    method : "GET"
                }
                )
            .then(data => data.json())
            .then((body) => {
                setPersonnel(body['personnel'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

            fetch(
                `${Constant.ipUrl}getMouvement.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setMouvement(body['mouvement'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        }

        return () => {
            FetchData()    
        };
    }, [Mouvement])

    useEffect(() => {
        function newDate () {
            return [new Date().toLocaleString(), new Date()]
        }
        return () => {
            setInterval(() => {
                setDateActuel(newDate()[0])
            }, 1000);
        };
    }, [DateActuel])
    
    const responsable = useRef()
    const periode_de_travail = useRef()
    const date_et_heure_entree = useRef()
    const date_et_heure_sortie = useRef()

    function handlechange () {

        periode_de_travail.current.value = responsable.current.value ? parseInt(Personnel[parseInt(responsable.current.value)].periode_de_travail) + 1 : Personnel[0].periode_de_travail

        Mouvement.map( m => 
            (m.nom_et_prenom === Personnel[responsable.current.value].nom_et_prenom && m.date_et_heure_sortie === "") ? 
            setIsEntree(true)  
            : setIsEntree(false)
            
        )

        for (let i = 0; i < Mouvement.length; i++) {
            if (Mouvement[i].nom_et_prenom === Personnel[responsable.current.value].nom_et_prenom && Mouvement[i].date_et_heure_sortie === "") {
                setIsEntree(true)
                setMouvementActuel(Mouvement[i])
                break
            }
        }
            
        console.log(IsEntree, Personnel[responsable.current.value].nom_et_prenom, periode_de_travail.current.value)
        console.log(MouvementActuel)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (IsEntree) {
            console.log(
                IsEntree, 
                parseInt(MouvementActuel.id_mouv), 
                (date_et_heure_sortie.current.value).toString(),
                parseInt(periode_de_travail.current.value) - 1,
                parseInt(Personnel[responsable.current.value].id)
                )

            try {
                const response = await fetch(
                    `${Constant.ipUrl}setMouvement.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            entree : "OUI",
                            MouvementActuel : parseInt(MouvementActuel.id_mouv),
                            date_et_heure_sortie : (date_et_heure_sortie.current.value).toString(),
                            periode_de_travail : parseInt(periode_de_travail.current.value) - 1,
                            idSaver : parseInt(Personnel[responsable.current.value].id),
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
                console.log(error);
            }
            finally {
                alert("Mouvement Enregistree avec succes !")
            }
        }

        else {
            try {
                const response = await fetch(
                    `${Constant.ipUrl}setMouvement.php`,
                    {
                        method : "POST",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            entree : "NON",
                            date_et_heure_entree : (date_et_heure_entree.current.value).toString(),
                            periode_de_travail : parseInt(periode_de_travail.current.value) - 1,
                            idSaver : parseInt(Personnel[responsable.current.value].id), 
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
                console.log(error);
            }
            finally {
                alert("Mouvement Enregistree avec succes !")
            }
        }
        
    }
    

    
    return (
        <div className="stockjour">
            <div style={{
                display : "flex", 
                backgroundColor : "#7ba2db", 
                paddingBottom : 50,
                marginBottom : 60,
                }}
            >
                <GoBack handlclick={props.arriere}/>
                <h1 style={{textDecoration : "underline", paddingTop : 10}}>Les Entrees et sorties</h1>
            </div>
            <center>
                <form className="form-group form-group1 col-md-5">
                    <table>
                        <tr>
                            <td>Nom du personnel</td>
                            <td>
                                <select name="" className="form-control" ref={responsable} onChange={handlechange}>
                                    {Personnel.map((p, key) =>
                                        <option key={key} value={key}>{p.nom_et_prenom}</option>
                                        )
                                    } 
                                </select>
                            </td>
                        </tr>
                        {
                            IsEntree ? 
                            <tr>
                                <td>date et heure de sortie</td>
                                <td><input type="text" className="form-control" readOnly ref={date_et_heure_sortie} value={DateActuel}/></td>
                            </tr> : 
                            <tr>
                                <td>date et heure d'entree</td>
                                <td><input type="text" className="form-control" readOnly ref={date_et_heure_entree} value={DateActuel}/></td>
                            </tr>
                        }
                        <tr>
                            <td>Periode de travail</td>
                            <td><input type="text" className="form-control" readOnly ref={periode_de_travail}
                                // value={periode_de_travail.current.value === "0" ? "1ere periode" : periode_de_travail.current.value === "1" ? "2eme periode" : "3eme periode"}
                            /></td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-danger" onClick={(e) => {e.preventDefault()}}>Annuler</button></td>
                            <td align="right"><button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button></td>
                        </tr>
                    </table>
                </form>
            </center>
        </div>
    )
};
