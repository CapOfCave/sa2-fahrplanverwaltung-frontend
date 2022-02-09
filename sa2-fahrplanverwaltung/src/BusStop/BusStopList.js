import React, {Component} from 'react'

class BusStopList extends Component{
state = {
    busStops: []
};

async componentDidMount(){
    const response = await fetch('http://localhost:8080/busstops/');
    const body = await response.json();
    this.setState({busStops: body})
}
render() {
    const {busStops} = this.state;
return (
    <div>
    <table>
        <tr>
            <th>Name</th>
            <th>Bearbeiten</th>
            <th>Löschen</th>
        </tr>
        <tr>
            <td width="70%">Hauptbahnhof</td>
            <td><button>Bearbeiten</button></td>
            <td><button>Löschen</button></td>
        </tr>
            {busStops.map(busStop => <div key = {busStop.id}>
                <tr>
                <td width="70%">{busStop.name}</td>
                <td><button>Bearbeiten</button></td>
                <td><button>Löschen</button></td>
            </tr>
            </div>)}
    </table>
    <div>
    <h2>BusStops</h2>
    {busStops.map(busStop =>
        <div key={busStop.id}>
          {busStop.name}
        </div>
    )}
  </div>
  </div>
)
}
}
export default BusStopList