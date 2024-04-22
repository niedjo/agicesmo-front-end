import React from "react";
import '../App.css';

export const Welcome = (props) => {

    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();
    
    return(
        <div className="coucou">
            <div className="content">
                <div className="welcome">
                    <h1>BIENVENUE SUR AGICESMO</h1>
                    <div className="loadmagic"></div>
                </div>
                {/* <!-- <div class="desc">l'application de gestion des centres hospitalieres</div> --> */}
                <center>
                    <button className="ii6"></button>
                </center>
                <div className="compte">
                    <button className="a" onClick={props.handleClick2}>Se connecter</button>
                    {/* <button className="a" onClick={props.handleClick1}>Creer un compte</button> */}
                </div>
                {/* <!-- <div class="by">une solution horizon</div> --> */}
            </div>
        </div>
    )
}