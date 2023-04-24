import React from 'react';

class Seekers extends React.Component {
  state = {
    seekers: []
  }

  componentDidMount() {
    fetch('http://127.0.0.1:3000/seekers', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <your_access_token>'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ seekers: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { seekers } = this.state;

    return (
      <div>
        <h1>Seekers</h1>
        <ul>
          {seekers.map(seeker => (
            <li key={seeker.id}>{seeker.full_name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Seekers;


