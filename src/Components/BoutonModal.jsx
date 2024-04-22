// Importer React et le plugin modal de Bootstrap
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// Créer un composant qui affiche le bouton pour ouvrir le modal
function BoutonModal(props) {
  // Utiliser un état pour gérer l'ouverture et la fermeture du modal
  const [show, setShow] = useState(false);

  // Créer des fonctions pour ouvrir et fermer le modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {/* Afficher le bouton pour ouvrir le modal */}
      <Button variant={props.variant ? props.variant : "primary"} onClick={handleShow} style={props.stylee ? {} : {borderRadius : 50, background : "blue"}}>
        {props.buttonName}
      </Button>

      {/* Afficher le composant Modal avec ses propriétés */}
      <Modal show={show} onHide={handleClose}>
        {/* Afficher le titre du modal */}
        <Modal.Header closeButton>
          <Modal.Title>{props.buttonName}</Modal.Title>
        </Modal.Header>
        {/* Afficher le contenu du modal */}
        <Modal.Body>
            {/* <h2>Contenu du modal</h2> */}
            {props.cmpnt}
        </Modal.Body>
        {/* Afficher les boutons du modal */}
        <Modal.Footer style={{width : "100%"}}>
          <div style={{display : "flex", justifyContent : "space-evenly", width : "100%"}}>
            <Button variant="danger" onClick={handleClose}> {/* ou secundary*/}
                Fermer
            </Button>
            <Button variant="primary" onClick={props.handleSubmit ? props.handleSubmit : handleClose}> {/* ca doit etre une fonction importee d'ailleur*/}
                Enregistrer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BoutonModal;
