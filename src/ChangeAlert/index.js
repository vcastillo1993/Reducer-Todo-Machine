import React from "react";
import { withStorageListener } from "./withStorageListener";


function ChangeAlert({show, toggleShow}) {
  if (show) {
    return (
      <div>
        <p>Hubo cambios</p>
        <button onClick={()=>toggleShow(false)}
        >
          Volver ha refrescar
        </button>
      </div>
    )
  } else {
   return null;
  }

}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export { ChangeAlertWithStorageListener };