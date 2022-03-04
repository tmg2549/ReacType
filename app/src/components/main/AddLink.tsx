import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext, useState } from 'react';
import StateContext from '../../context/context';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { styleContext } from '../../containers/AppContainer';

function AddLink({ id, onClickHandler }) {
  const { isThemeLight } = useContext(styleContext);
  const [state, dispatch] = useContext(StateContext);

  const handleClick = (id) => {
    dispatch({
      type: 'ADD CHILD',
      payload: {
        type: 'HTML Element',
        typeId: 19,
        childId: id // this is the id of the parent to attach it to
      }
    });
  }

  const handlePageSelect = event => {
    const currComponent = state.components.find(element => element.id === state.canvasFocus.componentId);
    currComponent.children.some(element => {
      if(element.childId === id) {
        const state = JSON.parse(JSON.stringify(element));
        state.childId = id;
        state.attributes.compLink = event.target.value;
        dispatch({type: 'UPDATE ATTRIBUTES', payload: state})
        return true;
      }
    });
  }

  const pagesItems = state.components.filter(comp => state.rootComponents.includes(comp.id));
<<<<<<< HEAD
  const dropDown = [<MenuItem style={{ color: isThemeLight? '#000' : '#fff'}} disabled /*hidden selected*/>Pages</MenuItem>].concat(pagesItems.map(comp => <MenuItem style={{ color: isThemeLight? '#000' : '#fff'}} value={comp.name}>{comp.name}</MenuItem>));

  return (
    <div style={{padding: '1px', float: 'right', display: 'flex' }}>
      <FormControl size='medium' style={ {color: '#008000'/*{display: 'flex', alignItems: 'stretch'}*/} }>
      <InputLabel id='page-select-label' style={ { color:' #008000'} }>Pages</InputLabel>
          <Select 
            // MenuProps={{
            //   anchorOrigin: {
            //     vertical: "bottom",
            //     horizontal: "left"
            //   },
            //   transformOrigin: {
            //     vertical: "top",
            //     horizontal: "left"
            //   },
            //   getContentAnchorEl: null
            // }}
            label='Pages'
            labelId='page-select-label'
=======
  const dropDown = pagesItems.map(comp => <MenuItem style={{ color: 'black' }} value={comp.name}>{comp.name}</MenuItem>);

  return (
    <div style={{padding: '1px', float: 'right', display: 'flex', border: '2px solid red', alignSelf: 'center'}}>
      <FormControl size='medium' style={{display: 'flex'}}>
          {/* <InputLabel style={ { color: isThemeLight? '#fff' : '#000'} }>Pages</InputLabel> */}
          <Select label='pages'
>>>>>>> 6d3fbd545288416cd1e582d188963853b7c08f07
            variant="outlined"
            onMouseDown={onClickHandler}
            onChange={handlePageSelect}
            id="page-select"
<<<<<<< HEAD
            style={ isThemeLight? {/*backgroundColor: '#eef0f1',*/ color: '#000', border: '1px solid black', height: '28px', width: '200px'} : {backgroundColor: 'gray', color: '#fff', border: '1px solid white', height: '28px', width: '200px'}}
=======
            style={ isThemeLight
                    ? {backgroundColor: '#eef0f1', color: '#000', border: '1px solid black', height: '28px', width: '200px'}
                    : {backgroundColor: 'gray', color: '#fff', border: '1px solid white', height: '28px', width: '200px'}}
>>>>>>> 6d3fbd545288416cd1e582d188963853b7c08f07
            >
            {dropDown}
          </Select>
      </FormControl>
    </div>
  );
}

export default AddLink;
