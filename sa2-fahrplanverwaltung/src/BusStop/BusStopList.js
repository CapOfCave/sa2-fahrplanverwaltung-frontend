import React, {Component} from 'react'

class BusStopList extends Component{
state = {};
render() {
return (
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
        <tr>
            <td>Schule</td>
            <td><button>Bearbeiten</button></td>
            <td><button>Löschen</button></td>
        </tr>
    </table>
)
}
}
export default BusStopList