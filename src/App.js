import { useEffect, useState } from 'react';
import CardList  from './components/card-list/card-list.component';
import SearchBox   from './components/search-box/search-box.component';
import './App.css';


const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    useEffect( () => { //mounting is the first time the component is rendered
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => { return response.json() })
      .then((data) => {setMonsters(data)});
    }, [])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  }

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  return(
    <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox  onSearchHandler={onSearchChange} placeholder='Search Monsters' className= 'monsters-search-box' />
        <CardList monsters= {filteredMonsters}/>
    </div>
  )
}


// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }

//   }

//   onSearchChange = (event) => {
//     console.log(event.target.value)
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField }
//     });
//    }

//   componentDidMount () { //mounting is the first time the component is rendered
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => { return response.json() })
//     .then((data) => {this.setState( { monsters : data } )});
//   }

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     });
//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox  onSearchHandler={onSearchChange} placeholder='Search Monsters' className= 'monsters-search-box' />
//         <CardList monsters= {filteredMonsters}/>
//       </div>
//     );
//     }
// }

export default App;




// pure, impure functions and side effects
