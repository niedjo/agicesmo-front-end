import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../Components/GoBack";
import Constant from "../Constant";


export default function Login(props) {

    const [IsTextInput, setIsTextInput] = useState(false)
    const [IsOk, setIsOk] = useState(false)
    const [Type, setType] = useState('')

    // les hook concernants le login 

    const nom = useRef(null)
    const mdp = useRef(null)
    const [Nom, setNom] = useState('')
    const [Mdp, setMdp] = useState('')
    const [IsSave, setIsSave] = useState(false)
    const [Personnel, setPersonnel] = useState([])

    useEffect(() => {

        function FetchData() {
            fetch(
                `${Constant.ipUrl}getPersonnel.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                setPersonnel([])
                setPersonnel(body['personnel'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
      
        }

        return () => {
            FetchData()
        };
    }, [])
    
    const LoginButton = (props) => {
        const goTo = (c) => {
            setType(c)
            setIsTextInput(!IsTextInput)
        }
        return (
            <div>
                <button className="col-md-3 col-xs-3 col-ls-3 col-lg-3 LoginButton" onClick={() => goTo(props.children)}>
                    {props.children}
                </button><br />
            </div>
        )
    }
    const handleChange = (e) => {
        const rgx = /[a-z\s]/g
        const newNom = (e.target.value).replace(rgx, "")
        setNom(newNom)
    }
    if (IsOk) {
        return (
            <div className="container">
                <center style={{paddingTop : 150}}>
                    <h3>Mr/Mme, {Nom.toUpperCase()} votre compte a ete creee avec succes !</h3>
                    <button className="btn btn-primary" onClick={props.handlclick}>Retourner a la page d'accueil</button>
                </center>
            </div>
        )
    }
    if (IsTextInput) {
        const handleSubmit = async (e) => {
            e.preventDefault()
            if (nom.current.value.length <= 0 || mdp.current.value.length <= 0) {
                alert("veillez remplir tous les champs")
                return
            }

            for (let i = 0; i < Personnel.length; i++) {
                const p = Personnel[i];
                if (p.nom_et_prenom === nom.current.value) {
                    alert("ce nom d'utilisateur existe deja. veillez enregistrer un autre")
                    break
                }
                else {
                    setNom(nom.current.value)
                    setMdp(mdp.current.value)
                    setIsOk(!IsOk)
                    setIsSave(false)


                    try {
                        const response = await fetch(
                            `${Constant.ipUrl}setPersonnel.php`,
                            {
                                method : "POST",
                                headers : {
                                    'Content-Type' : 'application/json'
                                },
                                body : JSON.stringify({
                                    nom : nom.current.value,
                                    password : mdp.current.value,
                                    type_compte : Type,
                                    // returnSecureToken : true
                                })
                            }
                        )
                
                        if (!response.ok) {
                            alert("Erreur d'enregistrement, veillez reesayer")
                            throw new Error("il y a une petite erreur")
                        }
                    } catch (error) {
                        console.log(error)
                    }
        
                    break
                }
            }
            
            
        }
        return (
            <div style={{background : "#c5dbff", height : "100%"}}>
                <GoBack handlclick={() => setIsTextInput(!IsTextInput)}/>
                <br />
                <center style={{marginTop : 120}}>
                    <h3>Creation de compte {Type}</h3><br />
                    <form className="form-group col-md-4 col-xs-4 col-ls-4 col-lg-4" onSubmit={handleSubmit}>
                        <label htmlFor="Nom">Nom d'utilisateur</label><br />
                        <input type="text" className="form-control uppercase" ref={nom} value={Nom} onChange={handleChange} /><br />
                        <label htmlFor="Mdp">MOT DE PASSE</label><br />
                        <input type="password" className="form-control" ref={mdp}/><br />
                        <div style={{display : "flex", justifyContent:"space-around"}}>
                            <button className="btn btn-danger"  onClick={(e) => {e.preventDefault(); setIsTextInput(!IsTextInput)}}>Annuler</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button>
                        </div>
                    </form>
                </center>
            </div>
        )
    }
    return (
        <div style={{background : "#c5dbff", height : "195vh"}}>
            <GoBack handlclick={props.handlclick}/>

            <center style={{marginTop : 80}}>
                <h1>CREER UN COMPTE SUR AGICESMO</h1><br />
                <h4>Quel type de compte souhaitez-vous creer ? </h4> <br /> <br />
                <LoginButton>Administrateur</LoginButton>
                <LoginButton>Caissier</LoginButton>
                <LoginButton>Gestionnaire</LoginButton>
                <LoginButton>Laborentain</LoginButton>
                <LoginButton>Secretaire Medicale</LoginButton>
            </center>
        </div>
    )
}