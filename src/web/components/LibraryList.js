import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import { FormControl } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {remote} from 'electron';
import {library} from '../Data';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  input:{
    display:"none"
  }
}));


export default function LibraryList(props){
  const classes = useStyles();
  const [secondary, setSecondary] = useState(false);
  const [folders, setFolders] = useState(null);
  const setLib = props.setLib;


  useEffect(loadFolders);


  function loadFolders(){
    if (folders === null){
      library.find({}, (error, docs)=>{
        if(!error){
          setFolders(docs);
        }
      });
    }
  }

  function removeFolder(id){
    library.remove({_id:id});
    let index = folders.findIndex(ele => id === ele._id);
    if (index >= 0){
      const copy = folders.slice();
      copy.splice(index, 1);
      setFolders(copy);
    }
  }

  function createList(){
    if (folders == null){
      return null;
    }
    return folders.map(folder => {
      const {name, path, _id} = folder;
      return (
        <ListItem key={_id} button onClick={() => setLib({name: name, path:path})}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={secondary ? path : null}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={()=>removeFolder(_id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }
  
  function addFolder(e){
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled && result.filePaths.length > 0){
        const fullPath = result.filePaths[0];
        const name = fullPath.substr(fullPath.lastIndexOf("\\") + 1);
        library.insert({name: name, path:fullPath}, (error, doc)=>{
          if (!error){
            const copy = folders.slice();
            copy.push(doc);
            setFolders(copy);
          }
        });
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Container>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Show full path"
        />
        <FormControl>
          <IconButton edge="end" onClick={addFolder}>
            <AddIcon />
          </IconButton>
        </FormControl>
      </FormGroup>
      <List className={classes.list}>
        {createList()}
      </List>
    </Container>
  );
}