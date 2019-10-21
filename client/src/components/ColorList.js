import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "./utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      props.updateColors(props.colors.map(color => {
        if(color.id === colorToEdit.id){
          return colorToEdit
        }else 
          return color
      }));
    })
    .catch(err=>{
      console.log('error found',err)
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res=>{
      props.updateColors(props.colors.filter(data=> data.id !== color.id))
    })
    // make a delete request to delete this color
  };

  const handleChange = e => {
    console.log(e.target.name)
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  }
  const handleChangeHex = e => {
    setNewColor({
      ...newColor,
      code:{[e.target.name]: e.target.value}
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/api/colors`, newColor)
    .then(res=>{
      console.log(res)
      props.updateColors(res.data)
      setNewColor(initialColor)
    })
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleSubmit}>
        <input type='text' name='color' value={newColor.color} placeholder='color' onChange={handleChange}/>
        <input type='text' name='hex' value={newColor.code.hex} placeholder='hex' onChange={handleChangeHex}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ColorList;
