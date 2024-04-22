import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const Frottis_Sanguin = (props) => {
    
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const Polynucleaire_Neutrophile = useRef(null)
    const Polynucleaire_Eosinophile = useRef(null)
    const Polynucleaire_Basophile = useRef(null)
    const Mononucleaire_Monocyte = useRef(null)
    const Mononucleaire_Lymohocytes = useRef(null)

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
                        Examen : "Frottis sanguin",
                        Polynucleaire_Neutrophile : Polynucleaire_Neutrophile.current.value,
                        Polynucleaire_Eosinophile : Polynucleaire_Eosinophile.current.value,
                        Polynucleaire_Basophile : Polynucleaire_Basophile.current.value,
                        Mononucleaire_Monocyte : Mononucleaire_Monocyte.current.value,
                        Mononucleaire_Lymohocytes : Mononucleaire_Lymohocytes.current.value,
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
                        expression_des_resultats : "/",
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Laboratoire"
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
            alert("Examen enregistree avec succes !")
        }
        

    }

  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        <center>
            <h4>FROTTIS SANGUIN</h4>  
            <form className='form-group form-group1 col-md-5' onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>Polynucleaire Neutrophile</td>
                        <td><input type="number" className='form-control' ref={Polynucleaire_Neutrophile} /></td>
                    </tr>
                    <tr>
                        <td>Polynucleaire Eosinophile</td>
                        <td><input type="number" className="form-control" ref={Polynucleaire_Eosinophile}/></td>
                    </tr>
                    <tr>
                        <td>Polynucleaire Basophile</td>
                        <td><input type="number" className="form-control" ref={Polynucleaire_Basophile}/></td>
                    </tr>
                    <tr>
                        <td>Mononucleaire Monocyte</td>
                        <td><input type="number" className="form-control" ref={Mononucleaire_Monocyte}/></td>
                    </tr>
                    <tr>
                        <td>Mononucleaire Lymohocytes</td>
                        <td><input type="number" className="form-control" ref={Mononucleaire_Lymohocytes}/></td>
                    </tr>
                    <tr>
                        <td align='center'><button className="btn btn-danger" onClick={props.arriere}>Annuler</button></td>
                        <td align='right'><input type="submit" value={"Soumettre"} className="btn btn-primary" onClick={handleSubmit}/></td>
                    </tr>
                </table>
            </form>
        </center>
    </div>
  )
}

export default Frottis_Sanguin