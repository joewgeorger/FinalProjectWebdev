//Getts all orders in db for employee side
import { Component } from "react";


class allOrders extends Component{
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    
    //fetch the orders
    callAPI() {
        fetch('http://localhost:5000/orders/')
            .then(res => res.json())
            .then(orders => this.setState({orders}, () => console.log('Orders fecthed...', orders)));
    }

    componentDidMount(){
        this.callAPI();
    }
    render(){
        return (
            <div>
                <div className='row text-center'>
                <h3>Previous Orders:</h3>
                </div>
                <div className='row text-center'>
                    <ul>
                    {this.state.orders.map(order =>
                        <div className = "p border text-center bg-light" key = {order._id}>{order.user} ordered {order.dough} cookie dough and choose {order.topping} as your topping.</div>)}
                    </ul>
                    
                </div>
        
            </div>
        )
    }
}

export default allOrders