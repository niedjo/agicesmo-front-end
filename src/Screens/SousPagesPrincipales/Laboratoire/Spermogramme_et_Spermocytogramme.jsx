import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'

const Spermogramme_et_Spermocytogramme = (props) => {
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    
    const Volume = useRef()
    const PH = useRef()
    const Viscositee = useRef()
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        const response = await fetch(
            "http://localhost/the%20bigest%20developper/projets/AGICESMO/FINAL%20CESMO/API/Enregistrement/setExam.php",
            {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    DateExam : dateExam,
                    Examen : "Spermogramme et Spermocytogramme",
                    Volume : Volume.current.value,
                    PH : PH.current.value,
                    Viscositee : Viscositee.current.value,
                })
            }
        )

        if (!response.ok) {
            alert("probleme d'enregistrement, veillez reessayer")
            throw new Error("il y a une petite erreur")
        }
        alert("Examen enregistree avec succes !")
    }


  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        <center>
            <h4>Spermogramme et Spermocytogramme</h4>
            <form className='form-group form-group1 col-md-8' style={{display : "flex", justifyContent: "space-around", alignItems : "center"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td></td>
                        <td colSpan={2} align='center'><b> SPERMOGRAMME </b></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Delai d'abstinance</td>
                        <td><input type="number" className="form-control" ref={Volume}/></td>
                        <td>Volume</td>
                        <td><input type="number" className="form-control" ref={Volume}/></td>
                    </tr>
                    <tr>
                        <td>PH</td>
                        <td><input type="number" className="form-control"ref={PH} /></td>
                        <td>Viscositee</td>
                        <td><input type="number" className="form-control" ref={Viscositee}/></td>
                    </tr>
                    {/* <tr>
                        <td>Numerotation</td>
                        <td><input type="number" className="form-control" ref={Cocci_Gram_M}/></td>
                        <td>Cellules rondes</td>
                        <td><input type="number" className="form-control" ref={Cocci_Gram_M}/></td>
                    </tr>
                    <tr>
                        <td>Mobilitee a 1h</td>
                        <td><input type="number" className="form-control" ref={Leucocytes}/></td>
                        <td>Progressive </td>
                        <td><input type="number" className="form-control" ref={Cocci_Gram_P}/></td>
                    </tr>
                    <tr>
                        <td>Formes vivantes</td>
                        <td><input type="number" className="form-control" ref={Cellules_Epithelial} /></td>
                        <td>Aglutinas Spontanee </td>
                        <td><input type="number" className="form-control" ref={Bacciles_Gram_M}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan={2} align='center'><b> SPERMOCYTOGRAMME </b></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Formes typiques</td>
                        <td><input type="text" className="form-control" ref={Levures}/></td> 
                        <td>Anomalie de la piece intermediaire</td>
                        <td><input type="text" className="form-control" ref={Bacciles_G_P}/></td>
                    </tr>
                    <tr>
                        <td>Anomalie de la tete</td>
                        <td><input type="text" className="form-control" ref={Polynucleaires}/></td>
                        <td>Anomalie du flagelle</td>
                        <td><input type="text" className="form-control" ref={Cepitheliales}/></td>
                    </tr>
                    <tr>
                        <td colSpan={4}><b>Antibiogrammes</b></td>
                    </tr>
                    <tr>
                        <td>Culture</td>
                        <td><input type="text" className="form-control" ref={Culture}/></td>
                        <td>Sensibles</td>
                        <td><input type="text" className="form-control" ref={Sensibles}/></td>
                    </tr>
                    <tr>
                        <td>Germes Isolees</td>
                        <td><input type="text" className="form-control" ref={Germes_Isolees}/></td>
                        <td>Intermediaires</td>
                        <td><input type="text" className="form-control" ref={Intermediaires}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                        <td>Resistants</td>
                        <td><input type="text" className="form-control" ref={Resistants}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'><h5><b>Conclusion</b></h5></td>
                        <td colSpan={2} align='center'><textarea className='form-control' cols="30" rows="3" ref={conclusion}></textarea></td>
                    </tr> */}
                    <tr>
                        <td colSpan={2} align='center'><b><button className="btn btn-danger" onClick={props.arriere}>Annuler</button></b></td>
                        <td colSpan={2} align='center'><input type="submit" value={"Soumettre"} className="btn btn-primary" onClick={handleSubmit}/></td>
                    </tr>
                </table>
            </form>
        </center>
    </div>
  )
}

export default Spermogramme_et_Spermocytogramme



// Spermogramme_et_Spermocytogramme