const updateForm = document.querySelector('.form-update-book');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(updateForm);

  const id = window.location.href.split('/update/')[1];

  fetch(`http://localhost:3000/api/book/${id}`, {
    method: 'PUT',
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      window.location = '/book/' + result.id;
    })
    .catch((error) => console.log('Error:', error));
});
