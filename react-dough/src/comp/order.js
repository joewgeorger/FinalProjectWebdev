//The ordering dogh component for the user
import React, { Component } from 'react'

class order extends Component {


 
    constructor() {
        super();
        this.state = {
            username: localStorage.getItem('user'),
            dough: "",
            topping: "",
            doughs: [],
            toppings: []
        }

        this.handleChangeDough = this.handleChangeDough.bind(this);
        this.handleChangeTop = this.handleChangeTop.bind(this);
    }


    componentDidMount() {
        fetch('/api/doughs')
            .then(res => res.json())
            .then(doughs => this.setState({ doughs }, () => console.log('Doughs fecthed...', doughs)))
            // this.setState({dough: this.state.doughs[0].dough})
        fetch('/api/toppings')
            .then(res => res.json())
            .then(toppings => this.setState({ toppings }, () => console.log('Customers fecthed...')))
    }

    handleChangeDough(d) {
        this.setState({ dough: d.target.value });
        console.log(this.state.dough);
    }

    handleChangeTop(t) {
        this.setState({ topping: t.target.value });
        console.log('Topping option changed');
    }



    onOrder = () => {

        const {
            username,
            dough,
            topping
        } = this.state;

        fetch('http://localhost:5000/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: username,
                dough: dough,
                topping: topping
            })
        })
        .then(r => r.json())
        .then(json => {
            console.log('json', json)
                this.setState({ error: json.message })
        })

    }

    // console.log()
    // let orderInfo = {
    //     user: 'Bill',
    //     dough: this.state.dough,
    //     topping: this.state.topping
    // };

    // console.log("Order: " + orderInfo);

    // fetch('http://localhost:5000/orders', {
    //     method: 'POST',
    //     headers:{'Content-type':'application/json'},
    //     body: JSON.stringify(orderInfo)
    // }).then(r => r.json()).then(res =>{
    //     if(res){
    //         this.setState({message: 'Your order has been placed!'})
    //     }
    // })

    // }

    render() {
        return (
            <div className='col text-center'>
                <label htmlFor="inputState">Dough: </label>
                <select id="inputDough" className="form-control-sm" onChange={this.handleChangeDough}>
                    {this.state.doughs.map(dough =>
                        <option key={dough.id}>{dough.dough}</option>
                    )}
                </select>
                <br />
                <label htmlFor="inputState">Toppings:</label>
                <select id="inputTop" className="form-control-sm" onChange={this.handleChangeTop}>
                    {this.state.toppings.map(top =>
                        <option key={top.id}>{top.topping}</option>
                    )}
                </select>
                <br />
                <button type="button" className="btn btn-primary" onClick={this.onOrder}>Order</button>
                <br />
                <h6 className="text-success">{this.state.message}</h6>
            </div>
        )
    }
}

export default order
