import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from "../../../Constant";

const Serologie = (props) => {
    
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

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
                        Examen : "Serologie",
                        CRP : CRP.current.value,
                        ASLO : ASLO.current.value,
                        H_Pylori : H_Pylori.current.value,
                        VDRL_TPHA : VDRL_TPHA.current.value,
                        Ag_Hbs : Ag_Hbs.current.value,
                        Ac_HCV : Ac_HCV.current.value,
                        G_Test : G_Test.current.value,
                        HIV : HIV.current.value,
                        CHLAMYDIA : CHLAMYDIA.current.value,
                        TOXOPLASMOSE : TOXOPLASMOSE.current.value,
                        RUBEOLE : RUBEOLE.current.value,
                        WIDAL_FELIX : WIDAL_FELIX.current.value,
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
            console.log(response2);

        } catch (error) {
            console.log(error);
        }
        finally {
            alert("Examen enregistree avec succes !")
        }
        

        // console.log(NatureExam.current.value, dateExam);


    }

    const CRP = useRef(null)
    const ASLO = useRef(null)
    const H_Pylori = useRef(null)
    const VDRL_TPHA = useRef(null)
    const Ag_Hbs = useRef(null)
    const Ac_HCV = useRef(null)
    const G_Test = useRef(null)
    const HIV = useRef(null)
    const CHLAMYDIA = useRef(null)
    const TOXOPLASMOSE = useRef(null)
    const RUBEOLE = useRef(null)
    const WIDAL_FELIX = useRef(null)


  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        <center>
            <h4>SEROLOGIE</h4>
            <form className='form-group form-group1 col-md-5' style={{display : "flex", justifyContent: "space-around"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>CRP</td>
                        <td><input type="text" className="form-control" ref={CRP}/></td>
                    </tr>
                    <tr>
                        <td>ASLO</td>
                        <td><input type="text" className="form-control" ref={ASLO}/></td>
                    </tr>
                    <tr>
                        <td>H-Pylori</td>
                        <td><input type="text" className="form-control" ref={H_Pylori}/></td>
                    </tr>
                    <tr>
                        <td>VDRL/TPHA</td>
                        <td><input type="text" className="form-control" ref={VDRL_TPHA}/></td>
                    </tr>
                    <tr>
                        <td>Ag Hbs</td>
                        <td><input type="text" className="form-control" ref={Ag_Hbs}/></td>
                    </tr>
                    <tr>
                        <td>Ac HCV</td>
                        <td><input type="text" className="form-control" ref={Ac_HCV}/></td>
                    </tr>
                    <tr>
                        <td>G-Test</td>
                        <td><input type="text" className="form-control" ref={G_Test}/></td>
                    </tr>
                    <tr>
                        <td>HIV</td>
                        <td><input type="text" className="form-control" ref={HIV}/></td>
                    </tr>
                    <tr>
                        <td>CHLAMYDIA</td>
                        <td><input type="text" className="form-control" ref={CHLAMYDIA}/></td>
                    </tr>
                    <tr>
                        <td>TOXOPLASMOSE</td>
                        <td><input type="text" className="form-control" ref={TOXOPLASMOSE}/></td>
                    </tr>
                    <tr>
                        <td>RUBEOLE</td>
                        <td><input type="text" className="form-control" ref={RUBEOLE}/></td>
                    </tr>
                    <tr>
                        <td>WIDAL_FELIX</td>
                        <td><input type="text" className="form-control" ref={WIDAL_FELIX}/></td>
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

export default Serologie