class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenom: '',
            nom: '',
            email: '',
            telephone: '',
            hidden: '',
            users: JSON.parse(localStorage.getItem('users')) || [],
        };
    }

    // méthodes de cycle de vie
    componentDidMount() {
        this.addUser(this.state.users);
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { users, prenom, nom, email, telephone, hidden } = this.state;

        if (hidden) {
            const usersCopy = [...users];
            const selectedUser = users.find(user => user.id === Number(hidden));
            const userIndex = users.indexOf(selectedUser);
            selectedUser.prenom = prenom;
            selectedUser.nom = nom;
            selectedUser.email = email;
            selectedUser.telephone = telephone;

            usersCopy[userIndex] = selectedUser;

            this.setState({
                users: usersCopy,
                prenom: '',
                nom: '',
                email: '',
                telephone: '',
                hidden: '',
            }, () => {
                this.addUser(this.state.users);
                localStorage.setItem('users', JSON.stringify(this.state.users));
            });

            return;
        }

        const newUser = {
            id: Math.random(),
            prenom,
            nom,
            email,
            telephone,
        };

        this.setState({
            users: [...users, newUser],
            prenom: '',
            nom: '',
            email: '',
            telephone: '',
            hidden: '',
        }, () => {
            this.addUser(this.state.users);
            localStorage.setItem('users', JSON.stringify(this.state.users));
        });
    }

    addUser = (users) => {
        this.setState({
            displayUsers: users.map(user => (
                <tr key={user.id}>
                    <td>{user.prenom}</td>
                    <td>{user.nom}</td>
                    <td>{user.email}</td>
                    <td>{user.telephone}</td>
                    <td>
                        <button className="btn btn-outline-warning me-5"><i className="fa-regular fa-pen-to-square" onClick={() => this.edit(user.id)} style={{ color: "#FFD43B" }}></i>
                        </button>
                        <button className="btn btn-outline-danger"><i className="fa-solid fa-trash text-center" onClick={() => this.deleteUser(user.id)} style={{ color: "#ff0033" }}></i>
                        </button>
                    </td>
                </tr>
            ))
        });
    }

    edit = (id) => {
        const selectedUser = this.state.users.find(user => user.id === id);
        this.setState({
            prenom: selectedUser.prenom,
            nom: selectedUser.nom,
            email: selectedUser.email,
            telephone: selectedUser.telephone,
            hidden: selectedUser.id,
        });
    }

    deleteUser = (id) => {
        this.setState(prevState => {
            const users = prevState.users.filter(user => user.id !== id);
            localStorage.setItem('users', JSON.stringify(users));
            return { users };
        }, () => {
            this.addUser(this.state.users);
        });
    }

    render() {
        const { prenom, nom, email, telephone, hidden } = this.state;
        return (
            <div className="container">
                <h1 className="text-center fs-6 mt-2">Reprendre le jeemaCoder en React</h1>
                <div className="container col-lg-6 offset-lg-6 m-auto">
                    <form id="form" className="shadow p-3 mx-auto my-3" onSubmit={this.handleSubmit}>
                        <div className="mb-3 d-sm-flex">
                            <div>
                                <label htmlFor="prenom" className="form-label">Prénom</label>
                                <input required type="text" className="form-control" id="prenom" value={prenom} onChange={this.handleChange} />
                            </div>
                            <div className="ms-sm-3">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input required type="text" className="form-control" id="nom" value={nom} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="mb-3 d-sm-flex">
                            <div>
                                <label htmlFor="email" className="form-label">Email</label>
                                <input required type="email" className="form-control" id="email" value={email} onChange={this.handleChange} />
                            </div>
                            <div className="ms-sm-3">
                                <label htmlFor="telephone" className="form-label">Téléphone</label>
                                <input required type="tel" className="form-control" id="telephone" value={telephone} onChange={this.handleChange} />
                            </div>
                            <input id="hidden" value={hidden} type="text" hidden />
                        </div>
                        <button id="submit" type="submit" className="btn btn-success w-100">Ajouter</button>
                        {hidden && <button id="edit" type="submit" className="btn btn-warning w-100">Modifier</button>}
                    </form>
                </div>

                <div className="mt-5">
                    <h2 className="text-center mt-3">Utilisateurs</h2>
                    <div className="table-responsive">
                        <table id="table" className="table table-bordered table-hover">
                            <thead>
                                <tr className="border">
                                    <th scope="col">Prénom</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Tél</th>
                                    <th className="text-center" scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {this.state.displayUsers}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }


}

ReactDOM.render(<App/>, document.getElementById('root'));