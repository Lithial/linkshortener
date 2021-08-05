import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, InputLabel, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const LinkShortener = () => {
    const classes = useStyles();
    const [linkSetter, setLinkSetter] = React.useState("");
    const [code, setCode] = React.useState("");
    const [codeList, setCodeList] = React.useState([]);
    const handleSubmit = (e) =>{
        const data = {
            link: linkSetter,
        }
        e.preventDefault();
        fetch('http://localhost:3001/createLink', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCodeList(codeList => [...codeList, data.code])
            })
            .catch((err) => console.log(err))
    }
    const handleTextFieldChange = (e) =>{
        setLinkSetter(e.target.value);
        console.log(e.target.value)
    }
    const handleRedirect = (code) => {
        fetch(`http://localhost:3001/${code}`,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
            redirect: 'follow', // manual, *follow, error
        })
            .catch((e) => console.log(e))
    }
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <InputLabel htmlFor="linkShortenerInput">Link to Shorten</InputLabel>
                <TextField id="linkShortenerInput" label="Standard" value={linkSetter} onChange={handleTextFieldChange} />
                <Button type={"submit"}>
                    Submit
                </Button>
            </form>
            {codeList.map((code, index) => {
                return(
                    <div key={index}>
                        <Typography key={"label"+index} variant={"body2"}>http://localhost:3001/{code}</Typography>
                        <Button key={"btn"+index} href={`http://localhost:3001/${code}`}>{code}</Button>
                    </div>
                )
            })}
        </div>
    );
};

export default LinkShortener;