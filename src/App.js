import './App.scss'

import {
  Link,
  Route,
  HashRouter as Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { changeCodeName, changeGameCode, changeName, isHost } from './actions'
import { useDispatch, useSelector } from 'react-redux'

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CanvasDraw from "react-canvas-draw";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HdrStrongOutlinedIcon from '@material-ui/icons/HdrStrongOutlined';
import IconButton from '@material-ui/core/IconButton';
import LineWeightOutlinedIcon from '@material-ui/icons/LineWeightOutlined';
import OpacityIcon from '@material-ui/icons/Opacity';
import Radio from '@material-ui/core/Radio';
import ReplayOutlined from '@material-ui/icons/ReplayOutlined';
import Slider from '@material-ui/core/Slider';
import Snackbar from '@material-ui/core/Snackbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import firebase from './config'
import temp2 from './assets/img/temp2.jpg'

/**
 * Todo:
 * 
 * Refactor components to files and move styles to scss
 * Add fetched to localstorage in drawState to handle user refresh 
 * test second game game code problem
 * style in Lobby card
 * Implement clock that can be turned off by Admin
 * 
 * Show user names in Done cards for each drawing/word
 * Maybe put in a training page
 * 
 */

function App() {
  return (
    <div >
      <Router>
        <div className="wapper">
          <Switch>
            <Route exact path="/lobby">
              <LobbyCard />
            </Route>
            <Route exact path="/join">
              <JoinCard />
            </Route>
            <Route exact path="/write">
              <WriteCard />
            </Route>
            <Route exact path="/draw">
              <DrawCard />
            </Route>
            <Route exact path="/done">
              <DoneCard />
            </Route>
            <Route path="/">
              <StartCard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const Canvas = React.forwardRef((props, ref) => {
  const { ready, drawRound } = props
  const [brushRadius, setBrushRadius] = useState(6)
  const [lazyRadius, setLazyRadius] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [color, setColor] = useState('rgba(38, 50, 56, 1)')
  const [index, setIndex] = useState(3)

  const handleRadiusChange = (event, newValue) => {
    setBrushRadius(newValue);
  };
  const handleOpacityChange = (event, newValue) => {
    const newColor = color.replace(/rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/, `rgba$1,${newValue})`);
    setColor(newColor)
    setOpacity(newValue);
  };
  const handleLazyChange = (event, newValue) => {
    setLazyRadius(newValue);
  };
  const handleColorChange = (event, newValue) => {
    setColor(newValue);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: color
      },
      secondary: {
        main: '#9e9e9e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CardActions style={{ display: "flex", justifyContent: 'space-around', justifyContent: 'center' }}>
        <CanvasDraw disabled={ready || !drawRound} ref={ref} hideInterface={ready || !drawRound} brushRadius={brushRadius} brushColor={color} lazyRadius={lazyRadius} />
      </CardActions>

      {(drawRound) && <CardContent style={{ marginBottom: 0, maxWidth: "400px", marginLeft: "auto", marginRight: "auto", padding: 0 }}>
        <div style={{ display: "flex", justifyContent: 'space-around' }}>
          <IconButton color="secondary" onClick={() => ref.current.undo()}>
            <ReplayOutlined />
          </IconButton>
          <IconButton color={(index === 0) ? 'primary' : "secondary"} onClick={() => setIndex(0)} >
            <HdrStrongOutlinedIcon />
          </IconButton>
          <IconButton color={(index === 1) ? 'primary' : "secondary"} onClick={() => setIndex(1)} >
            <LineWeightOutlinedIcon />
          </IconButton>
          <IconButton color={(index === 2) ? 'primary' : "secondary"} onClick={() => setIndex(2)}>
            <OpacityIcon />
          </IconButton>
          <IconButton color={(index === 3) ? 'primary' : "secondary"} onClick={() => setIndex(3)}>
            <ColorLensOutlinedIcon />
          </IconButton>
        </div>

        <CardContent style={{ paddingTop: "0px", paddingBottom: "0px" }}>
          {index === 0 &&
            <Slider style={{ width: "100%" }} value={lazyRadius} onChange={handleLazyChange} aria-labelledby="continuous-slider" min={.5} max={50} step={0.5} />
          }
          {index === 1 &&
            <Slider style={{ width: "100%" }} value={brushRadius} onChange={handleRadiusChange} aria-labelledby="continuous-slider" min={.5} max={25} step={0.5} />
          }
          {index === 2 &&
            <Slider style={{ width: "100%" }} value={opacity} onChange={handleOpacityChange} aria-labelledby="continuous-slider" min={0.1} max={1} step={0.1} />
          }
        </CardContent>

        {index === 3 &&
          <span style={{ padding: "0", display: "flex", justifyContent: 'space-around' }} >

            {["244, 67, 54", "156, 39, 176", "33, 150, 243", "76, 175, 80", "255, 235, 59", "255, 152, 0", "158, 158, 158", "38, 50, 56"].map((elem, index) =>
              <Radio value={`rgba(${elem}, ${opacity})`}
                key={index}
                checked={color === `rgba(${elem}, ${opacity})`}
                onChange={e => setColor(e.target.value)}
                style={{ color: `rgba(${elem}, ${1})` }}
              />)}
          </span>
        }
      </CardContent>
      }
    </ThemeProvider >

  )
})


const StartCard = (props) => {
  const name = useSelector(state => state.name)
  const dispatch = useDispatch()

  return (
    <Container maxWidth="sm" className="container" >
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="300"
        image={temp2}
        title="tmep"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Ritleken
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Tänk viskleken fast med penna och papper (typ). En spelare startar ett rum och resterande spelare joinar mha koden. När spelet börjar ska alla skriva ett ord som nästkommande spelare ska rita. Spelaren efter kommer i sin tur endast se den ritade bilden och ska gissa vad bilden föreställer. Spelet är slut när samtliga spelare har ritat eller skrivit alla ord. Målet med spelet är att startorden håller genom spelet.
        </Typography>
      </CardContent>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Link to="/join"><Button size="small" color="primary" onClick={() => {
          dispatch(isHost(false))
        }}>Joina spel  </Button></Link>
        <Link to="/lobby"> <Button size="small" color="primary" onClick={() => {
          dispatch(isHost(true))
          dispatch(changeGameCode(name.code))
        }
        }>Skapa rum</Button></Link>
      </CardActions>
    </Container>
  )
}

const LobbyCard = (props) => {
  const name = useSelector(state => state.name)
  const isHost = useSelector(state => state.game.isHost)
  const gameCode = useSelector(state => state.game.gameCode)
  const [players, setPlayers] = useState([])
  const [customName, setCustomName] = useState(name.userName)
  const [gameStarted, setGameStarted] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()
  const location = useLocation()
  const [playerObj, setPlayerObj] = useState({})


  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  useEffect(() => {

    if (db) {
      if (isHost) {
        db.set({})
      }
      db.update({
        [`players.${name.code}`]: { ...name, isHost: isHost },
        gameStarted: false
      })
    }
    else {
      history.push('/')
    }


  }, [])


  useEffect(() => {
    if (db) {

      const unsubscribe = firebase
        .firestore()
        .collection('rooms')
        .doc(`${gameCode}`)
        .onSnapshot((snap) => {
          if (location.pathname === "/lobby") {
            if (snap?.data()) {
              if (Object.keys(snap.data()).length) {


                setPlayers(Object.values(snap.data().players))
                setPlayerObj(snap.data().players)
                setGameStarted(snap.data().gameStarted)
              }
            }
          }
        })
      return () => unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let newName = customName !== "" ? customName : `player-${name.code}`
      dispatch(changeName(newName))
      try {
        db.update({
          [`players.${name.code}`]: { ...name, userName: newName, isHost: isHost },
          gameStarted: false
        })
      } catch {
      }
    };
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customName]);

  const setUpGameQueue = () => {
    let len = players.length - 1
    let playerObject = playerObj
    players.forEach((element, i) => {
      let ary = [...players].reverse()
      for (let ii = 0; ii < i + 1; ii++) {
        ary.unshift(ary.pop());
      }
      playerObject[element.code].order = ary.map(elem => elem.code)
      playerObject[element.code].ready = false

    });
    db.update({ round: 0, rounds: len + 1, players: playerObject })
  }


  useEffect(() => {
    if (gameStarted) {
      history.push("/write")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted])

  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Lobby {gameCode}
        </Typography>
        <ul>
          {players.map((elem) => <li key={elem.code}>{elem.userName}</li>)}
        </ul>
      </CardContent>
      <CardActions >
      </CardActions>
      <TextField value={customName} id="outlined-basic" label="Namn" variant="outlined" onChange={(e) => {
        setCustomName(e.target.value)
      }} />
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Link to="/">   <Button size="small" color="primary" onClick={() => {
        }}>Avbryt </Button></Link>
        {isHost && <Button size="small" color="primary" onClick={() => {
          setUpGameQueue()
          db.update({ gameStarted: true })
        }}> Starta  </Button>
        }
      </CardActions>
    </Card>
  )
}


const JoinCard = (props) => {
  const [joinCode, setJoinCode] = useState('')
  const db = firebase.firestore().collection('rooms')
  const dispatch = useDispatch()
  const history = useHistory();
  const [error, setError] = useState(false)
  const joinGame = (params) => {
    if (joinCode === "")
      return

    db.doc(joinCode).get().then(
      doc => {
        if (doc.exists) {
          dispatch(changeGameCode(joinCode))
          history.push("/lobby")
        }
        else {
          setError(true)
        }
      }
    )
  }

  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Joina spel
        </Typography>
      </CardContent>
      <form onSubmit={e => {
        e.preventDefault();
        joinGame()
      }}>
        <CardActions >
          <TextField value={joinCode} id="outlined-basic" label="Anslutningskod" variant="outlined" onChange={(e) => setJoinCode(e.target.value)} />
        </CardActions>
        <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
          <Link to="/"><Button size="small" color="primary" onClick={() => {
          }}>Avbryt </Button></Link>
          <Button size="small" color="primary" type="submit" >
            Hitta spel </Button>
          <Snackbar open={error} autoHideDuration={6000} onClose={() => { setError(false) }}>
            <Alert severity="error">Hittade ingets spel</Alert>
          </Snackbar>
        </CardActions>
      </form>
    </Card >
  )
}


const WriteCard = (props) => {
  // skulle kunna sätta statet i local storage och ha som backup om man råkar uppdatera sidan
  const name = useSelector(state => state.name.code)
  // const nrOfPlayers = useSelector(state => state.game.nrOfPlayers)
  const gameCode = useSelector(state => state.game.gameCode)

  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [nrOfPlayers, setNrOfPlayers] = useState(99)
  const [players, setPlayers] = useState([])
  const [text, setText] = useState("")
  const [round, setRound] = useState(0)
  const [nrOfReady, setNrOfReady] = useState(0)
  const [ready, setReady] = useState(false)
  const history = useHistory();
  const location = useLocation()


  useEffect(() => {

    const unsubscribe = db.onSnapshot((snap) => {
      if (location.pathname === "/write") {
        if (snap.data()) {
          const tempPlayers = snap.data().players
          const tempRound = snap.data().round
          setPlayers(tempPlayers)
          setRound(tempRound)
          setNrOfReady(Object.values(tempPlayers).filter(elem => elem.ready).length)
          setNrOfPlayers(Object.values(tempPlayers).length)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleDone = (e) => {
    e.preventDefault()
    if (text === "") {
      return
    }
    setReady(true)
    const tempPlayer = players[name]
    tempPlayer.ready = true
    tempPlayer[round] = text
    var p = "players";
    var update = {};
    update[p + '.' + name] = tempPlayer;
    db.update(update)
  }

  useEffect(() => {
    if (nrOfReady === nrOfPlayers) {
      if (isHost) {
        const tempPlayers = players
        Object.keys(players).forEach((elem) => tempPlayers[elem].ready = false)
        db.update({ round: round + 1, players: tempPlayers })
      }
      history.push("/draw")
    }
  }, [nrOfReady])

  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3" style={{ marginBottom: 0, textAlign: "center" }}>
          Skriv ditt ord:
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: 'center' }}>
        <form onSubmit={(e) => handleDone(e)} autoComplete="off"> <TextField disabled={ready} id="standard-basic" label="" value={text} onChange={(e) => { setText(e.target.value) }} /></form>
        <br />
      </CardActions>
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ready}
              onChange={(e) => handleDone(e)}
              name="checkedB"
              color="primary"
              disabled={ready}
            />
          }
          label={`Redo (${nrOfReady})`}
        />
      </CardActions>
    </Container>
  )
}

const DrawCard = () => {
  // skulle kunna sätta statet i local storage och ha som backup om man råkar uppdatera sidan
  const name = useSelector(state => state.name.code)
  const gameCode = useSelector(state => state.game.gameCode)
  const ref = useRef("")
  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [players, setPlayers] = useState([])
  const [word, setWord] = useState("")
  const [text, setText] = useState("")
  const [round, setRound] = useState(0)
  const [nrOfReady, setNrOfReady] = useState(0)
  const [nrOfPlayers, setNrOfPlayers] = useState(99)
  const [ready, setReady] = useState(false)
  const [resetRound, setResetRound] = useState(false)
  const [drawRound, setDrawRound] = useState()
  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    if (resetRound === true) {
      setReady(false)
      setNrOfReady(0)
      setText("")


    }
    const unsubscribe = db.onSnapshot((snap) => {
      if (location.pathname === "/draw") {
        if (snap.data()) {
          const tempPlayers = snap.data().players
          const tempRound = snap.data().round
          const tempNrOfPlayers = Object.values(tempPlayers).length
          if (tempRound === tempNrOfPlayers) {
            history.push('/done')
          }
          else {
            setPlayers(tempPlayers)
            setRound(tempRound)
            const tempDrawRound = !!(round % 2 === 0)
            setNrOfReady(Object.values(tempPlayers).filter(elem => elem.ready).length)
            setNrOfPlayers(Object.values(tempPlayers).length)
            const playerOfWord = tempPlayers[name].order[1]
            setDrawRound(tempDrawRound)
            setWord(tempPlayers[playerOfWord][tempRound - 1])
          }
        }
      }
    })
    setResetRound(false)
    return () => unsubscribe()
  }, [resetRound])

  useEffect(() => {
    if (word) {
      if (drawRound) {
        ref.current.clear()
      }
      else {
        const playerOfWord = players[name].order[1]
        ref.current.loadSaveData(players[playerOfWord][round - 1], true)
      }
    }
  }, [drawRound])

  const handleDone = (e) => {
    e.preventDefault()

    if (text === "" && !drawRound) {
      return
    }
    setReady(true)
    const tempPlayer = players[name]
    tempPlayer.ready = true
    tempPlayer[round] = drawRound ? ref.current.getSaveData() : text
    var p = "players";
    var update = {};
    update[p + '.' + name] = tempPlayer;
    db.update(update)
  }

  useEffect(() => {
    if (nrOfReady === nrOfPlayers) {
      if (isHost) {
        db.update({ round: round + 1 })
        const tempPlayers = players
        Object.keys(players).forEach((elem) => tempPlayers[elem].ready = false)
        db.update({ round: round + 1, players: tempPlayers })
      }
      setResetRound(true)
    }
  }, [nrOfReady])
  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
          {drawRound && `Rita ${word}`}
        </Typography>
      </CardContent>
      <Canvas ready={ready} drawRound={drawRound} ref={ref} />
      {!drawRound && <CardActions style={{ display: "flex", justifyContent: 'center' }}>
        <form onSubmit={(e) => handleDone(e)} autoComplete="off"> <TextField disabled={ready} id="standard-basic" label="" value={text} onChange={(e) => { setText(e.target.value) }} /></form>
      </CardActions>
      }
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ready}
              onClick={(e) => handleDone(e)}
              name="checkedB"
              color="primary"
              disabled={ready}
            />
          }
          label={`Redo (${nrOfReady})`}
        />
      </CardActions>
    </Container>
  )
}

const DoneCard = (props) => {
  // const gameCode = 8475
  // const name = 8475
  const gameCode = useSelector(state => state.game.gameCode)
  const name = useSelector(state => state.name.code)

  const [currentName, setCurrentName] = useState(name)
  const db = firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [players, setPlayers] = useState()
  const [orders, setOrders] = useState()
  const dispatch = useDispatch()
  const history = useHistory()

  const ref = useRef()
  useEffect(() => {
    if (!db) {
      history.push('/')
    }
    db.get().then(
      doc => {
        if (doc.exists) {
          setPlayers(doc.data().players);
        }
      }
    )
  }, [])

  useEffect(() => {
    if (players) {
      const tempPlayers = players
      const ary = Object.entries(tempPlayers).map(([key, val]) => { return { key: key, val: val.order.indexOf(currentName) } }).sort((a, b) => a.val > b.val ? 1 : ((b.val > a.val) ? -1 : 0))
      setOrders(ary)
    }
  }, [players, currentName])

  const handleChange = (e, newValue) => {
    setCurrentName(newValue)
  }

  return (
    <Container maxWidth="sm" className="container" style={{ marginTop: "3rem", marginBottom: "3rem", }}>
      <CardContent>
        {players && <div style={{ display: "flex", justifyContent: 'center' }} >
          <Tabs
            onChange={handleChange}
            value={currentName}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            {Object.keys(players).map((elem, index) => <Tab key={index} label={players[elem].userName} value={players[elem].code} />)}
          </Tabs>
        </div>}
      </CardContent>
      {
        orders && orders.map((elem, index) =>
          <div key={index}>{index % 2 === 0
            ?
            // change to typography
            <h2 style={{ textAlign: "center", fontFamily: 'Roboto' }}>{players[elem.key][index]}</h2>
            :
            <div style={{ display: "flex", justifyContent: 'center' }}>
              <CanvasDraw disabled={true} ref={ref} saveData={players[elem.key][index]} loadTimeOffset={0.4} hideInterface={true} style={{ touchAction: "pan-y" }} />
            </div>}
          </div>)
      }
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Link to="/"> <Button size="small" color="primary" onClick={() => {
          if (db) {
            db.delete();
            dispatch(changeCodeName())
          }
        }
        }>Tillbaka</Button></Link>
      </CardActions>
    </Container >
  )
}


export default App;