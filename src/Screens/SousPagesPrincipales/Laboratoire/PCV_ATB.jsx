import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from "../../../Constant";

const PCV_ATB = (props) => {
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    
    const Macroscopie = useRef()
    const Aspect_des_Leucorhees = useRef()
    const Aspect_du_Col = useRef()
    const PH = useRef()
    const KOH = useRef()
    const Microscopie = useRef()
    const Cocci_Gram_M = useRef()
    const Leucocytes = useRef()
    const Cocci_Gram_P = useRef()
    const Cellules_Epithelial = useRef()
    const Bacciles_Gram_M = useRef()
    const Levures = useRef()
    const Bacciles_G_P = useRef()
    const Polynucleaires = useRef()
    const Trichomonas = useRef()
    const Cepitheliales = useRef()
    const conclusion = useRef()
    const Culture = useRef()
    const Sensibles = useRef()
    const Germes_Isolees = useRef()
    const Intermediaires = useRef()
    const Resistants = useRef()
    const Hematies = useRef()
    const Flore_du_type = useRef()
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        try {
            const response = await fetch(
                `${Constant.ipUrl}setExam.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        DateExam : dateExam,
                        true_date : props.DateExam,
                        Examen : "PCV ATB",
                        Macroscopie : Macroscopie.current.value,
                        Aspect_des_Leucorhees : Aspect_des_Leucorhees.current.value,
                        Aspect_du_Col : Aspect_du_Col.current.value,
                        PH : PH.current.value,
                        KOH : KOH.current.value,
                        Microscopie : Microscopie.current.value,
                        Cocci_Gram_M : Cocci_Gram_M.current.value,
                        Leucocytes : Leucocytes.current.value,
                        Cocci_Gram_P : Cocci_Gram_P.current.value,
                        Hematies : Hematies.current.value,
                        Flore_du_type : Flore_du_type.current.value,
                        Cellules_Epithelial : Cellules_Epithelial.current.value,
                        Bacciles_Gram_M : Bacciles_Gram_M.current.value,
                        Levures : Levures.current.value,
                        Bacciles_G_P : Bacciles_G_P.current.value,
                        Polynucleaires : Polynucleaires.current.value,
                        Trichomonas : Trichomonas.current.value,
                        Cepitheliales : Cepitheliales.current.value,
                        Culture : Culture.current.value,
                        Sensibles : Sensibles.current.value,
    
                        Germes_Isolees : Germes_Isolees.current.value,
                        Intermediaires : Intermediaires.current.value,
                        Resistants : Resistants.current.value,
                        conclusion : conclusion.current.value,
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
                        DateExam : props.DateExam,
                        expression_des_resultats : conclusion.current.value,
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Laboratoire"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )
        } catch (error) {
            console.log(error);
        }
        finally {
            alert("Examen enregistree avec succes !")
        }
        
    }


  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        <center>
            <h4>PCV ATB</h4>
            <form className='form-group form-group1 col-md-8' style={{display : "flex", justifyContent: "space-around", alignItems : "center"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td><b>Macroscopie</b></td>
                        <td>
                            <select className="form-control" ref={Macroscopie}>
                                <option value="Oui">Oui</option>
                                <option value="Non">Non</option>
                            </select>
                        </td>
                        <td>Aspect des Leucorhees</td>
                        <td><input type="number" className="form-control" ref={Aspect_des_Leucorhees}/></td>
                    </tr>
                    <tr>
                        <td>Aspect du Col</td>
                        <td><input type="text" className="form-control" ref={Aspect_du_Col}/></td>
                        <td>KOH</td>
                        <td><input type="text" className="form-control" ref={KOH}/></td>
                    </tr>
                    <tr>
                        <td>PH</td>
                        <td><input type="number" className="form-control"ref={PH} /></td>
                    </tr>
                    <tr>
                        <td><b>Microscopie</b></td>
                        <td>
                            <select className="form-control" ref={Microscopie}>
                                <option value="Oui">Oui</option>
                                <option value="Non">Non</option>
                            </select>
                        </td>
                        <td>Cocci Gram - </td>
                        <td><input type="text" className="form-control" ref={Cocci_Gram_M}/></td>
                        
                    </tr>
                    <tr>
                        <td>Leucocytes</td>
                        <td><input type="text" className="form-control" ref={Leucocytes}/></td>
                        <td>Cocci Gram + </td>
                        <td><input type="text" className="form-control" ref={Cocci_Gram_P}/></td>
                    </tr>
                    <tr>
                        <td>Hematies</td>
                        <td><input type="text" className="form-control" ref={Hematies}/></td>
                        <td>Flore du type</td>
                        <td><input type="text" className="form-control" ref={Flore_du_type}/></td>
                    </tr>
                    {/*  */}
                    <tr>
                        <td>Cellules Epithelial</td>
                        <td><input type="text" className="form-control" ref={Cellules_Epithelial} /></td>
                        <td>Bacciles Gram - </td>
                        <td><input type="text" className="form-control" ref={Bacciles_Gram_M}/></td>
                    </tr>
                    <tr>
                        <td>Levures</td>
                        <td><input type="text" className="form-control" ref={Levures}/></td> 
                        <td>Bacciles G+ </td>
                        <td><input type="text" className="form-control" ref={Bacciles_G_P}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                        <td>Polynucleaires</td>
                        <td><input type="text" className="form-control" ref={Polynucleaires}/></td>
                    </tr>
                    <tr>
                        <td>Trichomonas</td>
                        <td><input type="text" className="form-control" ref={Trichomonas}/></td>
                        
                        <td>Cepitheliales</td>
                        <td><input type="text" className="form-control" ref={Cepitheliales}/></td>
                    </tr>
                    <tr>
                        <td>Culture</td>
                        <td><input type="text" className="form-control" ref={Culture}/></td>
                        <td>Germes Isolees</td>
                        <td><input type="text" className="form-control" ref={Germes_Isolees}/></td>
                    </tr>
                    <tr>
                        <td colSpan={4}><b>Antibiogrammes</b></td>
                    </tr>
                    <tr>
                        <td>Sensibles</td>
                        <td><input type="text" className="form-control" ref={Sensibles}/></td>
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
                    </tr>
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

export default PCV_ATB