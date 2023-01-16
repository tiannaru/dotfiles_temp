import { writeSync } from "fs";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, Component } from "react";
import internal from "stream";

const type_to_props: any = {
  "Grass": { sprite: "grass.png", style: { height: 96, width: 96, position: "absolute", zIndex: 0 } },
  "House": { sprite: "house.png", style: { height: 48, width: 48, position: "absolute", zIndex: 1, marginLeft: 10, marginTop: 20 } },
  "Champion": { sprite: "champion.png", style: { height: 48, width: 48, position: "absolute", zIndex: 1, marginLeft: 10, marginTop: 20 } },
  "Barrack": { sprite: "barrack.png", style: { height: 72, width: 72, position: "absolute", zIndex: 1, marginLeft: 12, marginTop: 12 } },
  "Tower": { sprite: "tower.png", style: { height: 72, width: 72, marginLeft: 12, marginTop: 12, position: "absolute", zIndex: 1 } },
  "Soldier": { sprite: "soldier.png", style: { height: 48, width: 48, position: "absolute", zIndex: 1, marginLeft: 10, marginTop: 20 } },
}

function Thing(props: { left: number, top: number, type: string, ws: WebSocket }) {
  // TODO: this should be a map really
  let style = { ...type_to_props[props.type].style }
  style.left = 48 + props.left * 96
  style.top = 48 + props.top * 96

  function doSmth() {
    const eventType = props.type == "Grass" ? "create" : "delete"
    const notification = JSON.stringify({
      type: "event",
      event: eventType,
      data: JSON.stringify({ type: props.type, col: props.left, row: props.top })
    })
    props.ws.send(notification)
  }
  return (<img src={type_to_props[props.type].sprite} style={style} onClick={doSmth} />);
}

class World extends Component {
  // @ts-ignore
  ws: WebSocket = {}
  constructor(props: any) {
    super(props)
    this.state = { items: [] }
    const worldHeight = 20
    const worldWidth = 20
    const grassMap = Array(worldHeight).fill(Array(worldWidth).fill(1))
  }
  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:8000")
    this.ws.onopen = (event: any) => {
      // is this a workaround or proper react etiquette?
      setTimeout(() => (
        this.ws.send(JSON.stringify({ type: "event", event: "connection", data: "some string or smth" }))
      ), 100)
    }
    this.ws.onmessage = (message: any) => {
      let data = JSON.parse(message.data)
      if (data.type == "info") {
        this.setState({ items: data.data })
      }
      console.log(this.state)
    }
  }

  componentWillUnmount(): void {
    this.ws.close(1000)
  }

  render() {
    return <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      {/* @ts-ignore */}
      {this.state.items?.map((item: any) => (
        <Thing type={item.type} left={item.loc.col} top={item.loc.row} key={`${item.type}:${item.loc.row}-${item.loc.col}`} ws={this.ws} />
      ))}
    </main>
  }
}

function Popup() {
  return <div style={{ position: "absolute", top: 96, left: 96, zIndex: 100 }} className="p-2 bg-yellow-500">
    <p>Create Thing</p>
    <ul>
      <li className="flex my-4 hover:bg-yellow-300"><p>House</p><img className="mx-4" src="house.png"></img></li>
      <li className="flex my-4"><p>Barrack</p><img className="mx-4" src="barrack.png"></img></li>
      <li className="flex my-4"><p>Tower</p><img className="mx-4" src="tower.png"></img></li>
      <li className="flex my-4"><p>Soldier</p><img className="mx-4" src="soldier.png"></img></li>
      <li className="flex my-4"><p>Champion</p><img className="mx-4" src="champion.png"></img></li>
    </ul>
  </div>
}
const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Popup></Popup>
      <World></World>
    </>
  );
};

export default Home;

type TilePosition = {
  top: number;
  left: number;
};

const Tile = ({
  top,
  left,
}: TilePosition) => {
  return (<img src="grass.png" style={{ height: 96, width: 96, position: "absolute", left: 48 + left * 96, top: 48 + top * 96, zIndex: 0 }} />);
};

const House = ({
  top,
  left,
}: TilePosition) => {
  return (<img src="house.png" style={{ height: 48, width: 48, position: "absolute", left: 48 + left * 96, top: 48 + top * 96, marginLeft: 10, marginTop: 20, zIndex: 1 }} />);
};

const Champion = ({
  top,
  left,
}: TilePosition) => {
  return (<img src="champion.png" style={{ height: 48, width: 48, position: "absolute", left: 48 + left * 96, top: 48 + top * 96, marginLeft: 10, marginTop: 20, zIndex: 2 }} />);
};

const Barrack = ({
  top,
  left,
}: TilePosition) => {
  return (<img src="barrack.png" style={{ height: 48, width: 48, position: "absolute", left: 48 + left * 96, top: 48 + top * 96, marginLeft: 10, marginTop: 20, zIndex: 3 }} />);
};

const Soldier = ({
  top,
  left,
}: TilePosition) => {
  return (<img src="soldier.png" style={{ height: 48, width: 48, position: "absolute", left: 48 + left * 96, top: 48 + top * 96, marginLeft: 10, marginTop: 20, zIndex: 4 }} />);
};

const Tower = ({
  top,
  left,
}: TilePosition) => {
  return (<img src="tower.png" style={{ height: 48, width: 48, position: "absolute", left: 48 + left * 96, top: 48 + top * 96, marginLeft: 10, marginTop: 20, zIndex: 5 }} />);
};



  // const houseMap = Array.from({ length: worldHeight }, () => (Array.from({ length: worldWidth }, () => Math.floor(Math.random() * 2))))
  // const championMap = Array.from({ length: worldHeight }, () => (Array.from({ length: worldWidth }, () => Math.floor(Math.random() * 2))))
  // const barrackMap = Array.from({ length: worldHeight }, () => (Array.from({ length: worldWidth }, () => Math.floor(Math.random() * 2))))
  // const soldierMap = Array.from({ length: worldHeight }, () => (Array.from({ length: worldWidth }, () => Math.floor(Math.random() * 2))))
  // const towerMap = Array.from({ length: worldHeight }, () => (Array.from({ length: worldWidth }, () => Math.floor(Math.random() * 2))))



      // {houseMap.map((row: Array<number>, rowIndex: number) => (
      //   row.map((value: number, colIndex: number) => (
      //     value !== 0 && <House key={`${rowIndex}${colIndex}`} top={(rowIndex)} left={(colIndex)} />
      //   ))
      // ))}
      // {grassMap.map((row: Array<number>, rowIndex: number) => (
      //   row.map((value: number, colIndex: number) => (
      //     value !== 0 && <Tile key={`${rowIndex}${colIndex}`} top={(rowIndex)} left={(colIndex)} />
      //   ))
      // ))}
      // {championMap.map((row: Array<number>, rowIndex: number) => (
      //   row.map((value: number, colIndex: number) => (
      //     value !== 0 && <Champion key={`${rowIndex}${colIndex}`} top={(rowIndex)} left={(colIndex)} />
      //   ))
      // ))}
      // {barrackMap.map((row: Array<number>, rowIndex: number) => (
      //   row.map((value: number, colIndex: number) => (
      //     value !== 0 && <Barrack key={`${rowIndex}${colIndex}`} top={(rowIndex)} left={(colIndex)} />
      //   ))
      // ))}
      // {soldierMap.map((row: Array<number>, rowIndex: number) => (
      //   row.map((value: number, colIndex: number) => (
      //     value !== 0 && <Soldier key={`${rowIndex}${colIndex}`} top={(rowIndex)} left={(colIndex)} />
      //   ))
      // ))}
      // {towerMap.map((row: Array<number>, rowIndex: number) => (
      //   row.map((value: number, colIndex: number) => (
      //     value !== 0 && <Tower key={`${rowIndex}${colIndex}`} top={(rowIndex)} left={(colIndex)} />
      //   ))
      // ))}