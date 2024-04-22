import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from "../../../Constant";

const Profile_Lipidique = (props) => {
    
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const CHOLESTEROL_T = useRef(null)
    const TRYCLYCERIDES = useRef(null)
    const HDL = useRef(null)
    const LDL = useRef(null)

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
                        Examen : "PROFILE LIPIDIQUE",
                        CHOLESTEROL_T : CHOLESTEROL_T.current.value,
                        TRYCLYCERIDES : TRYCLYCERIDES.current.value,
                        HDL : HDL.current.value,
                        LDL : LDL.current.value
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
            <h4>{"Profile Lipidique".toLocaleUpperCase()}</h4>  
            <form className='form-group form-group1 col-md-5' onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>CHOLESTEROL T</td>
                        <td><input type="number" className="form-control" ref={CHOLESTEROL_T}/></td>
                    </tr>
                    <tr>
                        <td>TRYCLYCERIDES</td>
                        <td><input type="number" className="form-control" ref={TRYCLYCERIDES}/></td>
                    </tr>
                    <tr>
                        <td>HDL</td>
                        <td><input type="number" className="form-control" ref={HDL}/></td>
                    </tr>
                    <tr>
                        <td>LDL</td>
                        <td><input type="number" className="form-control" ref={LDL}/></td>
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

export default Profile_Lipidique