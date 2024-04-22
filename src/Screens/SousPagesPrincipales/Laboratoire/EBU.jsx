import React from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const EBU = (props) => {

  function top(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // console.log(document.documentElement.scrollTop)
  }
  top();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const date = new Date();
    const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    

    console.log(props.DateExam, dateExam);
    const Da = props.DateExam

    try {
      const response = await fetch(
          `${Constant.ipUrl}makeExam.php`,
          {
              method : "POST",
              headers : {
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify({
                  newDateExam : (dateExam).toString(),
                  DateExam : (Da).toString(),
                  expression_des_resultats : "expression_des_resultats",
                  responsable : "responsable.current.value",
                  nom_operateur : "responsable.current.value",
                  cesmo : "Laboratoire"
                  // penser a mettre a jour le responsable et le nom de l'operateur 
              })
          }
      )
  
      if (!response.ok) {
          alert("probleme d'enregistrement, veillez reessayer")
          throw new Error("il y a une petite erreur")
      }
      console.log(response)
    } catch (error) {
      console.log(error);
    }
    finally {
      alert("Laboratoire Enregistree avec succes !")
    }

}
  
  return (
    <div>
        <GoBack handlclick={props.arriere}/>
        EBU
        <button onClick={handleSubmit}>Soumettre</button>
    </div>
  )
}

export default EBU