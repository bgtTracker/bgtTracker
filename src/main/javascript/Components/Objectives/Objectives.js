import React from "react";
import ObjectivesTable from "./ObjectivesTable.js";
import AuthService from "../../api/AuthService.js";
import clientJson from "../../clientJson.js";

export default function Objectives() {
  const [rows, setRows] = React.useState();
  const [reload, setRealod] = React.useState(false);

  let headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "date", numeric: true, disablePadding: false, label: "End date" },
    { id: "piority", numeric: true, disablePadding: false, label: "Piority" },
    { id: "category", numeric: true, disablePadding: false, label: "Category" }, //?? acount numberic or not
    { id: "Progress", numeric: true, disablePadding: false, label: "Progress" },
    { id: "amount", numeric: true, disablePadding: false, label: "Amount" }
  ];

  React.useEffect(() => {
    fetch("/api/getobjectives", {
      method: "get",
      headers: AuthService.getAuthHeader()
    })
      .then(respone => respone.json())
      .then(respone => {
        if (respone.objectives === undefined) {
          setRows([]);
        } else {
          for (let o of respone.objectives) {
            o["date"] = new Date(o["date"]);
          }
          setRows(respone.objectives);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [reload]);

  const addObjective = toSave => {
    fetch("/api/addobjective", {
      method: "POST",
      body: JSON.stringify(toSave),
      headers: AuthService.getAuthHeader()
    })
      .then(respone => {
        console.log(respone);
        reloadNotifications();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editObjective = toSave => {
    console.log("save");
    fetch("/api/editobjective", {
      method: "PUT",
      body: JSON.stringify(toSave),
      headers: AuthService.getAuthHeader()
    })
      .then(respone => {
        console.log(respone);
        reloadNotifications();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteObjective = id => {
    clientJson({
      method: "DELETE",
      path: "/api/deleteobjective",
      headers: AuthService.getAuthHeader(),
      params: {
        id: id
      }
    })
      .then(response => {
        console.log(response);
        reloadNotifications();
      })
      .catch(e => {
        switch (error.response.status) {
          case 403:
            console.error("403");
            break;
          default:
            console.error(e);
        }
      });
  };

  const reloadNotifications = () => {
    setRealod(!reload);
  };

  return (
    <div>
      {rows === undefined ? (
        <h1>Loding</h1>
      ) : (
        <ObjectivesTable
          details={true}
          rows={rows}
          headCells={headCells}
          addObjective={addObjective}
          editObjective={editObjective}
          deleteObjective={deleteObjective}
          reloadFunc={reloadNotifications}
        />
      )}
    </div>
  );
}
