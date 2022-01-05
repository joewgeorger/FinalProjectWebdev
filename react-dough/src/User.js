//user page
import Order from './comp/order'
import Prev from './comp/prev'
import { Redirect, useHistory } from 'react-router';

function User() {
  const history = useHistory()
  //check for authentication and redirect
  console.log(localStorage.getItem('user'));
  if (localStorage.getItem('user') == null) {
    return <Redirect to='/' />
  }
  if (localStorage.getItem('emp') === 'y') {
    return <Redirect to='/emp' />
  }

  function handleClick(event) {
    history.push("/logout")
  }

  return (
    <div>
      <div className="contianer-fluid">
        <div className="row">
          < Order />
          <div className="col text-center">
            <p>
              To the left you can order the cookie dough you want by picking the dough and a toppping. Then it will be shipped to you ot cook.
              Below you can see your previous orders.
          </p>
          </div>
        </div>
      </div>
      <br />
      <div className='contianer-fluid'>
        <Prev />
      </div>
      <button onClick={handleClick} className="btn btn-danger" id="logout" >Logout</button>
    </div>
  );
}

export default User;
