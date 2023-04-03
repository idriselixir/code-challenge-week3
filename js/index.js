// Fetch data from the JSON server
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
  const sidebar = document.querySelector('.sidebar ul');
  sidebar.innerHTML = '';
  //Loop through the data and create a list item for each movie
  data.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.classList.add('film', 'item');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = movie.title;
    listItem.appendChild(link);
    method: 'DELETE'
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Remove the film from the server
      fetch(`http://localhost:3000/films/${movie.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        // Remove the film from the sidebar
        sidebar.removeChild(listItem);
        // Remove the film from the container
        const cardToRemove = document.getElementById(`card-${movie.id}`);
        container.removeChild(cardToRemove);
        if (movie.capacity - movie.tickets_sold <= 0) {
          listItem.classList.add('sold-out');
        }
      })
      .catch(error => console.log(error));
  });
  listItem.appendChild(deleteButton);
    sidebar.appendChild(listItem);
  });
    const container = document.querySelector('.container');
    // Loop through the data and create a card for each movie
    data.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      const image = document.createElement('img');
      image.classList.add('poster');
      image.src = movie.poster;
      image.alt = movie.title;
      card.appendChild(image);
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const title = document.createElement('h5');
      title.classList.add('title');
      title.textContent = movie.title;
      cardBody.appendChild(title);
      const description = document.createElement('p');
      description.classList.add('description');
      description.textContent = movie.description;
      cardBody.appendChild(description);
      const showtime = document.createElement('p');
      showtime.classList.add('showtime');
      showtime.textContent = `Showtime: ${movie.showtime}`;
      cardBody.appendChild(showtime);
      const tickets = document.createElement('p');
      tickets.classList.add('tickets');
      tickets.textContent = `Tickets Available: ${movie.capacity - movie.tickets_sold}`;
      cardBody.appendChild(tickets);
      const button = document.createElement('a');
      button.classList.add('btn');
      button.href = movie.link;
      if (movie.capacity - movie.tickets_sold <= 0) {
        button.textContent = 'Sold Out';
        button.disabled = true; // disable the button
      } else {
        button.textContent = 'Book Now';
        button.addEventListener('click', event => {
          event.preventDefault(); // prevent the default link behavior
          if (movie.tickets_sold >= movie.capacity) {
            // all tickets sold out, disable the button
            button.textContent = 'Sold Out';
            button.disabled = true;
            return;
          }
          // increment the tickets sold for this movie
          movie.tickets_sold++;
          // update the tickets available text
          const ticketsAvailable = movie.capacity - movie.tickets_sold;
          tickets.textContent = `Tickets Available: ${ticketsAvailable > 0 ? ticketsAvailable : 0}`;
        });
      }
      cardBody.appendChild(button);
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  })
  .catch(error => console.log(error));