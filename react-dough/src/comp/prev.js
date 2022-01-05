//component for all previous orders from user on there page
import { Component } from "react";


class prev extends Component{
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    
    //fetchs the orders
    callAPI() {
        fetch('http://localhost:5000/orders/uOrders?u=' + localStorage.getItem('user'))
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
                        <div className = "p border text-center bg-light" key = {order._id}>You ordered {order.dough} cookie dough and choose {order.topping} as your topping.</div>)}
                    </ul>
                    
                </div>
        
            </div>
        )
    }
}

export default prev
